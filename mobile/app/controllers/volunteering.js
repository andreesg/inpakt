window.VolunteeringController = {};

// View for volunteering/index.html
VolunteeringController["index"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=index]",
  compiledTemplate: "",
  map: null,
  markers: null,

  initialize: function() {

    _.bindAll(this, 'render', 'appendItem', 'onMessage','addMarker', 'initMap','onLocationError','onLocationFound'); // bind scope of this within functions
    this.collection = new VolunteeringCollection();

    // compile template so that it can be used later
    this.compiledTemplate = _.template( $(this.template).html() );
    this.renderSkeleton();

    this.initMap();

    // setup the model collection
    this.collection.on('add', this.appendItem);
    this.collection.on('reset', this.render);

    // after editing the model, view should update
    window.addEventListener("message", this.onMessage, false);

    // load model collection from server
    this.collection.fetch({reset:true});

    // 'tap' event can be used after this
    this.$el.hammer();

    // setup navigation bar
    steroids.view.navigationBar.show("INPAKT");

    return this;
  },



  /* MAP SPECIFIC */

  initMap: function() {
    this.map = L.map('map');

    L.tileLayer.grayscale('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Inpakt',
            maxZoom: 14, minZoom: 2
    }).addTo(this.map);
   

    this.map.on('locationfound', this.onLocationFound);
    this.map.on('locationerror', this.onLocationError);

    this.map.locate({setView: true, maxZoom: 16});
    },

  onLocationFound: function(e) {
    var radius = e.accuracy / 2;

    /*
    L.marker(e.latlng).addTo(this.map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
    */
  },

  onLocationError: function(e) {
      alert(e.message);
  },


  // receives a model
  addMarker: function(data) {

    var myIcon = L.icon({
      iconUrl: '/img/marker@2x.png',
      iconRetinaUrl: '/img/marker@2x.png',
      iconSize: [33, 32]
    });

    console.log(data);
    this.markers.push(data.get('latlng'));

    var latlng = L.latLng(data.get('latlng')[0], data.get('latlng')[1]);
    var marker = L.marker(latlng, {icon:myIcon}).addTo(this.map);
    
    // todo: use underscore template

    //var popupContent = "<div> <h3>" + data.get('name') + " </h3><button> " + data.get('npo')['name'] + "</p> <p class='bb-popuplink topcoat-button' data-id=" + data.get('id') + "> View Details </button></div>";

    //marker.bindPopup(popupContent).openPopup();
    

    console.log(this.map);

  },  

  /* END MAP SPECIFIC */

  renderSkeleton: function() {
    this.$el.html( this.compiledTemplate );
    this.$opp_container = $("#opp_index_container");

    return this;
  },


  render: function() {
    var that = this;
    
    console.log("rendering");
    console.log(this.collection);
    
    if(this.collection.length > 0) {

      // reset markers
      this.markers = [];

      // add markers
      console.log("entrou");
      var i = 0;
      $("#list-opportunities").append("<div class='row'></div>");
      this.collection.each(function(index) {
        that.addMarker(index);
        that.appendItem(index);
        if ((i+1) % 4 == 0) {
          $("#list-opportunities").append("</div><div class='row'>");
        }
        i++;
      });
      $("#list-opportunities").append("</div>");

      // map doesn't make event propagation, need to call this
      this.map.on('popupopen', function() {  
        $('.bb-popuplink').hammer().on('tap', function(e) {
          console.log("clicked");
        });
      });

      // bounds

      var bounds = L.latLngBounds(this.markers);
      console.log(bounds);
      console.log("fitting bounds");

      //this.map.fitBounds(bounds);


      // render list
    }
    
    return this;
  },

  appendItem: function(item) {
    console.log("APPEND!");

    $("#list-opportunities").append("<div class='small-3 columns bb-popuplink' style='line-height:10px;' data-id='"+item.get('id')+"'><img src='/img/imgs/"+item.get('id')+".png' data-id='"+item.get('id')+"'></img><div style='margin-top:10px;' data-id='"+item.get('id')+"'><span style='font-size:8px;' data-id='"+item.get('id')+"'>"+item.get('name')+"</span><br>-<br><span style='font-size:8px;' data-id='"+item.get('id')+"'>"+item.get('volunteersRegistered')+" / "+item.get('volunteersNeeded')+"</span></div></div>"); 
  },

  events: {
    //"tap li": "open",
    "tap .bb-popuplink" : "open"
  },

  open: function(event) {
    console.log("OPEN");
    console.log($(event.target));
    view = new steroids.views.WebView("/views/volunteering/show.html?id=" + $(event.target).attr("data-id"));
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


// View for volunteering/show.html
VolunteeringController["show"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=show]",
  compiledTemplate: "",

  initialize: function() {
    _.bindAll(this, 'render', 'onMessage'); // bind scope of this within functions

    this.compiledTemplate = _.template( $(this.template).html() )

    this.model = new Volunteering({id: steroids.view.params.id});

    this.model.bind('change', this.render, this);

    // after editing the model, view needs to be updated
    window.addEventListener("message", this.onMessage, false);

    this.model.fetch();

    // setup navigation bar
    steroids.view.navigationBar.show("Volunteering Show");

    return this;
  },

  render: function() {
    console.log(this.model.attributes);
    this.$el.html(this.compiledTemplate({model: this.model}));
    return this;
  },

  onMessage: function(e) {
    var data = JSON.parse(e.data);
    if (data.msg === "refresh") this.model.fetch();
  }

});



// View for volunteering/edit.html
VolunteeringController["edit"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=edit]",

  initialize: function() {
    _.bindAll(this, 'render', 'save', 'close', 'afterSave'); // bind scope of this within functions

    this.model = new Volunteering({volunteering_id: steroids.view.params.id});

    this.model.fetch({success: this.render});

    // setup navigation bar
    steroids.view.navigationBar.show("Volunteering Edit");

    // 'tap' event can be used after this
    this.$el.hammer();

    return this;
  },

  render: function() {
    this.$el.html( _.template( $(this.template).html(), this.model.attributes ) );
    return this;
  },

  events: {
    "tap a#updateButton": "save",
    "tap a#closeButton": "close"
  },

  close: function() {
    steroids.modal.hide();
  },

  save: function() {
    this.model.save({
      name: this.$el.find("input#name").val(),
      description: this.$el.find("input#description").val()
    }, {
      success: this.afterSave
    });
  },

  afterSave: function() {
    window.postMessage(JSON.stringify({msg: "refresh"}));
    this.close();
  }

});


// View for volunteering/new.html
VolunteeringController["new"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=new]",

  initialize: function() {
    _.bindAll(this, 'render', 'save', 'close', 'afterSave'); // bind scope of this within functions

    this.model = new Volunteering({description: "", name: ""});

    // setup navigation bar
    steroids.view.navigationBar.show("Volunteering New");

    // 'tap' event can be used after this
    this.$el.hammer();

    this.render();

    return this;
  },

  render: function() {
    this.$el.html( _.template( $(this.template).html(), this.model.attributes ) );
    return this;
  },

  events: {
    "tap a#createButton": "save",
    "tap a#closeButton": "close"
  },

  close: function() {
    steroids.modal.hide();
  },

  save: function() {
    this.model.save({
      name: this.$el.find("input#name").val(),
      description: this.$el.find("input#description").val()
    }, {
      success: this.afterSave
    });
  },

  afterSave: function() {
    window.postMessage(JSON.stringify({msg: "refresh"}));
    this.close();
  }

});


