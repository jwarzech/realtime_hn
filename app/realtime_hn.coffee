window.RealtimeHN =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    new RealtimeHN.Router()
    Backbone.history.start()
    
$(document).ready ->
  RealtimeHN.init()

# Router
class RealtimeHN.Router extends Backbone.Router
  routes:
    '' : 'index'
    
  index: ->
    indexView = new RealtimeHN.IndexView(model: null)
    $('#content').html(indexView.render().el)
    
# Models
class RealtimeHN.Comment extends Backbone.Model
  
# Collections
class RealtimeHN.Comments extends Backbone.Collection
  model: RealtimeHN.Comment
  url: '/comments'
  
  comparator: (comment) ->
    -comment.get("id")
    
# Views
class RealtimeHN.IndexView extends Backbone.View
  events:
    'change #url' : 'fetchComments'
    
  fetchComments: (event) =>
    url = $(event.target).val()
    comments = new RealtimeHN.Comments()    
    commentsView = new RealtimeHN.CommentsView(collection: comments, url)
    $("#content").append(commentsView.render().el)
    
  render: =>
    $(@el).html _.template($('#url-template').html())
    return this

class RealtimeHN.CommentsView extends Backbone.View
  initialize: (collection, url) ->
    super(collection)
    @url = url
    @collection.bind('reset', @render)
    @collection.bind('add', @renderComment)
    @collection.fetch
      data:
        url: @url
    
  updateComments: =>
    new_comments = new RealtimeHN.Comments() 
    new_comments.fetch
      data:
        url: @url
        last_id: @collection.first().id
      success: @newComments
      
  newComments: (comments, response) =>
    comments.each (item) =>
      @collection.add(item)
  
  render: =>
    $(@el).html _.template($('#comments-template').html())
    
    unless @collection.length == 0  
      @collection.each (item) =>
        commentView = new RealtimeHN.CommentView(model: item)
        $(@el).find('ul').append(commentView.render().el)
    
    # Poll every 1 minute to keep up to date
    setInterval(@updateComments, 60000)
    return this
    
  renderComment: (comment) =>
    commentView = new RealtimeHN.CommentView(model: comment)
    $(@el).find('ul').prepend(commentView.render().el)
    $(@el).find('li').first().effect('highlight', {}, 1000)
    
class RealtimeHN.CommentView extends Backbone.View
  tagName: 'li'
  
  render: =>
    $(@el).html(_.template($('#comment-template').html())(@model.toJSON()))
    return this