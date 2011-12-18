(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.RealtimeHN = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
      new RealtimeHN.Router();
      return Backbone.history.start();
    }
  };
  $(document).ready(function() {
    return RealtimeHN.init();
  });
  RealtimeHN.Router = (function() {
    __extends(Router, Backbone.Router);
    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }
    Router.prototype.routes = {
      '': 'index'
    };
    Router.prototype.index = function() {
      var indexView;
      indexView = new RealtimeHN.IndexView({
        model: null
      });
      return $('#content').html(indexView.render().el);
    };
    return Router;
  })();
  RealtimeHN.IndexView = (function() {
    __extends(IndexView, Backbone.View);
    function IndexView() {
      this.render = __bind(this.render, this);
      IndexView.__super__.constructor.apply(this, arguments);
    }
    IndexView.prototype.events = {
      'change #url': 'fetchComments'
    };
    IndexView.prototype.fetchComments = function() {
      return console.log('Fetch Comments');
    };
    IndexView.prototype.render = function() {
      $(this.el).html(_.template($('#url-template').html()));
      return this;
    };
    return IndexView;
  })();
}).call(this);
