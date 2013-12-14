// The contents of individual model .js files will be concatenated into dist/models.js
(function(window){

  // // Example of StackMob REST configuration:
  var baseURL = "http://in.dev/api/v1/volunteering-opportunities"

  // single model
  window.Volunteering = Backbone.Model.extend({
    idAttribute: "id", // you might need to change/remove this here and in app/controllers/volunteering.js
    url: function() {
      if (this.isNew()) {
        return baseURL
      } else {
        return baseURL+"/"+this.id // use id suffix if model has id
      }
    }
  });

  // model collection
  window.VolunteeringCollection = Backbone.Collection.extend({
    model: Volunteering,
    url: baseURL,

    parse: function(resp) {
      console.log("parse resp");
      console.log(resp);
      if(resp['volunteering_opportunities'])
        return resp['volunteering_opportunities'];
    }
  });


})(window);
