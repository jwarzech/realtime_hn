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
  RealtimeHN.Comment = (function() {
    __extends(Comment, Backbone.Model);
    function Comment() {
      Comment.__super__.constructor.apply(this, arguments);
    }
    return Comment;
  })();
  RealtimeHN.Comments = (function() {
    __extends(Comments, Backbone.Collection);
    function Comments() {
      Comments.__super__.constructor.apply(this, arguments);
    }
    Comments.prototype.model = RealtimeHN.Comment;
    Comments.prototype.url = '/comments';
    return Comments;
  })();
  RealtimeHN.IndexView = (function() {
    __extends(IndexView, Backbone.View);
    function IndexView() {
      this.render = __bind(this.render, this);
      this.fetchComments = __bind(this.fetchComments, this);
      IndexView.__super__.constructor.apply(this, arguments);
    }
    IndexView.prototype.events = {
      'change #url': 'fetchComments'
    };
    IndexView.prototype.fetchComments = function(event) {
      var comments, commentsView;
      comments = new RealtimeHN.Comments();
      commentsView = new RealtimeHN.CommentsView({
        collection: comments
      });
      $("#content").append(commentsView.render().el);
      return comments.fetch({
        data: {
          url: $(event.target).val()
        }
      });
    };
    IndexView.prototype.render = function() {
      $(this.el).html(_.template($('#url-template').html()));
      return this;
    };
    return IndexView;
  })();
  RealtimeHN.CommentsView = (function() {
    __extends(CommentsView, Backbone.View);
    function CommentsView() {
      this.render = __bind(this.render, this);
      CommentsView.__super__.constructor.apply(this, arguments);
    }
    CommentsView.prototype.initialize = function() {
      return this.collection.bind('reset', this.render);
    };
    CommentsView.prototype.render = function() {
      $(this.el).html(_.template($('#comments-template').html()));
      this.collection.each(__bind(function(item) {
        var commentView;
        commentView = new RealtimeHN.CommentView({
          model: item
        });
        return $(this.el).append(commentView.render().el);
      }, this));
      return this;
    };
    return CommentsView;
  })();
  RealtimeHN.CommentView = (function() {
    __extends(CommentView, Backbone.View);
    function CommentView() {
      this.render = __bind(this.render, this);
      CommentView.__super__.constructor.apply(this, arguments);
    }
    CommentView.prototype.render = function() {
      $(this.el).html(_.template($('#comment-template').html())(this.model.toJSON()));
      return this;
    };
    return CommentView;
  })();
}).call(this);
