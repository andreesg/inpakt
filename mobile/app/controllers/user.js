window.UserController = {};

// View for user/index.html
UserController["index"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=index]",
  compiledTemplate: "",

  initialize: function() {
    _.bindAll(this, 'render', 'appendItem', 'onMessage'); // bind scope of this within functions

    // compile template so that it can be used later
    this.compiledTemplate = _.template( $(this.template).html() );

    this.render();

    // setup the model collection
    this.collection = new UserCollection();
    this.collection.on('add', this.appendItem);
    this.collection.on('reset', this.render);

    // after editing the model, view should update
    window.addEventListener("message", this.onMessage, false);

    // load model collection from server
    this.collection.fetch();

    // 'tap' event can be used after this
    this.$el.hammer();

    // setup navigation bar
    steroids.view.navigationBar.show("User Index");

    var rightButton = new steroids.buttons.NavigationBarButton();
    rightButton.title = "Add";
    rightButton.onTap = function() {
      view = new steroids.views.WebView("/views/user/new.html");
      steroids.modal.show(view);
    };
    steroids.view.navigationBar.setButtons({right: [rightButton]});

    return this;
  },

  render: function() {
    this.$el.html( this.compiledTemplate );
    return this;
  },

  appendItem: function(item) {
    $("ul", this.$el).append("<li class='topcoat-list__item item' id='"+item.get('user_id')+"'>"+item.get('name')+"</li>");
  },

  events: {
    "tap li": "open"
  },

  open: function(event) {
    view = new steroids.views.WebView("/views/user/show.html?id="+$(event.target).attr("id"));
    steroids.layers.push(view);
  },

  onMessage: function(e) {
    var data = JSON.parse(e.data);
    if (data.msg === "refresh") {
      this.collection.reset([]);
      this.collection.fetch();
    }
  }

});

