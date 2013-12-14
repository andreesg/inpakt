// The contents of individual model .js files will be concatenated into dist/models.js
(function(window){

  // // Example of StackMob REST configuration:
  var baseURL = "http://in.dev/api/v1/npos"

  // single model
  window.User = Backbone.Model.extend({
    idAttribute: "user_id", // you might need to change/remove this here and in app/controllers/user.js
    url: function() {
      if (this.isNew()) {
        return baseURL
      } else {
        return baseURL+"/"+this.id // use id suffix if model has id
      }
    },
  });

  // model collection
  window.UserCollection = Backbone.Collection.extend({
    model: User,
    url: baseURL,
  });


})(window);
