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
    
# Views
class RealtimeHN.IndexView extends Backbone.View
  events:
    'change #url' : 'fetchComments'
    
  fetchComments: ->
    console.log 'Fetch Comments'
    
  render: =>
    $(@el).html _.template($('#url-template').html())
    return this

