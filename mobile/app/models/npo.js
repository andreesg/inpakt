// The contents of individual model .js files will be concatenated into dist/models.js
(function(window){

  var baseURL = "http://in.dev/api/v1/npos";

  // single model
  window.Npo = Backbone.Model.extend({
    idAttribute: "id", // you might need to change/remove this here and in app/controllers/npo.js
    
    url: function() {
      if (this.isNew()) {
        return baseURL;
      } else {
        return baseURL + "/" + this.id;
      }
    },

  });

  // model collection
  window.NpoCollection = Backbone.Collection.extend({
    model: Npo,
    url: baseURL,

    parse: function(resp) {
      if(resp.npos) {
        return resp.npos;
      }
    }
  });


})(window);
