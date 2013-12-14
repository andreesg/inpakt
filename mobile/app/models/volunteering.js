// The contents of individual model .js files will be concatenated into dist/models.js
(function(window){

  // // Example of StackMob REST configuration:
  var baseURL = "http://0.0.0.0:8000/api/v1/volunteering-opportunities"

  // single model
  window.Volunteering = Backbone.Model.extend({
    idAttribute: "id", // you might need to change/remove this here and in app/controllers/volunteering.js
    url: function() {
      if (this.isNew()) {
        return baseURL
      } else {
        return baseURL+"/"+this.id // use id suffix if model has id
      }
    },

    parse: function(resp) {
      if(resp['volunteering-opportunity'])
        return resp['volunteering-opportunity'];
    }

  });

  // model collection
  window.VolunteeringCollection = Backbone.Collection.extend({
    model: Volunteering,
    url: baseURL,

    parse: function(resp) {
      if(resp['volunteering-opportunities'])
        return resp['volunteering-opportunities'];
    }
  });


})(window);
