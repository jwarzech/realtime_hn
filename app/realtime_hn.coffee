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
    comments = new RealtimeHN.Comments()    
    commentsView = new RealtimeHN.CommentsView(collection: comments)
    $("#content").append(commentsView.render().el)
    
    comments.fetch
      data:
        url: $(event.target).val()
    
  render: =>
    $(@el).html _.template($('#url-template').html())
    return this

class RealtimeHN.CommentsView extends Backbone.View
  initialize: ->
    @collection.bind('reset', @render)
  
  render: =>
    $(@el).html _.template($('#comments-template').html())
    
    @collection.each (item) =>
      commentView = new RealtimeHN.CommentView(model: item)
      $(@el).append(commentView.render().el)
    return this
    
class RealtimeHN.CommentView extends Backbone.View
  render: =>
    $(@el).html _.template($('#comment-template').html())(@model.toJSON())
    return this