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
    Comments.prototype.comparator = function(comment) {
      return -comment.get("id");
    };
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
      var comments, commentsView, url;
      url = $(event.target).val();
      comments = new RealtimeHN.Comments();
      commentsView = new RealtimeHN.CommentsView({
        collection: comments
      }, url);
      return $("#content").append(commentsView.render().el);
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
      this.renderComment = __bind(this.renderComment, this);
      this.render = __bind(this.render, this);
      this.newComments = __bind(this.newComments, this);
      this.updateComments = __bind(this.updateComments, this);
      CommentsView.__super__.constructor.apply(this, arguments);
    }
    CommentsView.prototype.initialize = function(collection, url) {
      CommentsView.__super__.initialize.call(this, collection);
      this.url = url;
      this.collection.bind('reset', this.render);
      this.collection.bind('add', this.renderComment);
      return this.collection.fetch({
        data: {
          url: this.url
        }
      });
    };
    CommentsView.prototype.updateComments = function() {
      var new_comments;
      new_comments = new RealtimeHN.Comments();
      return new_comments.fetch({
        data: {
          url: this.url,
          last_id: this.collection.first().id
        },
        success: this.newComments
      });
    };
    CommentsView.prototype.newComments = function(comments, response) {
      return comments.each(__bind(function(item) {
        return this.collection.add(item);
      }, this));
    };
    CommentsView.prototype.render = function() {
      $(this.el).html(_.template($('#comments-template').html()));
      if (this.collection.length !== 0) {
        this.collection.each(__bind(function(item) {
          var commentView;
          commentView = new RealtimeHN.CommentView({
            model: item
          });
          return $(this.el).find('ul').append(commentView.render().el);
        }, this));
      }
      setInterval(this.updateComments, 60000);
      return this;
    };
    CommentsView.prototype.renderComment = function(comment) {
      var commentView;
      commentView = new RealtimeHN.CommentView({
        model: comment
      });
      $(this.el).find('ul').prepend(commentView.render().el);
      return $(this.el).find('li').first().effect('highlight', {}, 1000);
    };
    return CommentsView;
  })();
  RealtimeHN.CommentView = (function() {
    __extends(CommentView, Backbone.View);
    function CommentView() {
      this.render = __bind(this.render, this);
      CommentView.__super__.constructor.apply(this, arguments);
    }
    CommentView.prototype.tagName = 'li';
    CommentView.prototype.className = 'comment';
    CommentView.prototype.render = function() {
      $(this.el).html(_.template($('#comment-template').html())(this.model.toJSON()));
      return this;
    };
    return CommentView;
  })();
}).call(this);
