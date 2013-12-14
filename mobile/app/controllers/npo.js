window.NpoController = {};

// View for npo/index.html
NpoController["index"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=index]",
  compiledTemplate: "",

  initialize: function() {

    console.log("NPO CONTROLLER");
    _.bindAll(this, 'render', 'appendItem', 'onMessage'); // bind scope of this within functions

    // compile template so that it can be used later
    this.compiledTemplate = _.template( $(this.template).html() );

    //this.render();

    // setup the model collection
    this.collection = new NpoCollection();
    this.collection.on('add', this.appendItem);
    this.collection.on('reset', this.render);

    // after editing the model, view should update
    window.addEventListener("message", this.onMessage, false);

    // load model collection from server
    this.collection.fetch({reset:true});

    // 'tap' event can be used after this
    this.$el.hammer();

    // setup navigation bar
    steroids.view.navigationBar.show("Organizations");

    /*
    var rightButton = new steroids.buttons.NavigationBarButton();
    rightButton.title = "Add";
    rightButton.onTap = function() {
      view = new steroids.views.WebView("/views/npo/new.html");
      steroids.modal.show(view);
    };
    steroids.view.navigationBar.setButtons({right: [rightButton]});
    */

    return this;
  },

  render: function() {

    var that = this;

    this.$el.html( this.compiledTemplate );

    this.collection.each(function(index) {
      console.log(index);
      that.appendItem(index);
    });

    return this;
  },

  appendItem: function(item) {
    $("ul", this.$el).append("<li class='topcoat-list__item item' id='"+item.get('id')+"'>"+item.get('shortName')+"</li>");
  },

  events: {
    "tap li": "open"
  },

  open: function(event) {
    view = new steroids.views.WebView("/views/npo/show.html?id="+$(event.target).attr("id"));
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


// View for npo/show.html
NpoController["show"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=show]",
  compiledTemplate: "",

  initialize: function() {
    _.bindAll(this, 'render', 'onMessage', 'button'); // bind scope of this within functions

    this.compiledTemplate = _.template( $(this.template).html() )

    console.log(steroids.view.params.id);
    this.model = new Npo({id: steroids.view.params.id});

    this.model.bind('change', this.render, this);

    // after editing the model, view needs to be updated
    window.addEventListener("message", this.onMessage, false);

    this.model.fetch();

    // setup navigation bar
    steroids.view.navigationBar.show("Opportunity");

    /*
    var rightButton = new steroids.buttons.NavigationBarButton();
    rightButton.title = "Edit";
    rightButton.onTap = function() {
      view = new steroids.views.WebView("/views/npo/edit.html?id="+steroids.view.params.id);
      steroids.modal.show(view);
    };
    steroids.view.navigationBar.setButtons({right: [rightButton]});
    */

    return this;
  },

  render: function() {
    var that = this;
    steroids.view.navigationBar.show(this.model.get('npo').shortName);
    this.$el.html( this.compiledTemplate(this.model.get('npo')) );
    this.renderOpportunities(this.model.get('npo').opportunities);
    
    $("#opps_list li").click(function (event) {
      that.open(event);
    });
    return this;
  },

  events: {
    "tap li": "open"
  },

  open: function(event) {
    /*TODO

    Open web view with opportunity

    */
  },

  renderOpportunities: function(opps) {
    for (var i = 0; i < opps.length; i++) {
      this.appendItem(opps[i]);
    };
  },

  button: function(event) {
    console.log("BUTTON");
    alert("BTN!");
  },

  appendItem: function(item) {
    $("ul", this.$el).append("<li class='topcoat-list__item item' id='"+item.id+"'>"+item.name+"</li>");
  },

  onMessage: function(e) {
    var data = JSON.parse(e.data);
    if (data.msg === "refresh") this.model.fetch();
  }

});

