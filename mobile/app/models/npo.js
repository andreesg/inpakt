// The contents of individual model .js files will be concatenated into dist/models.js
(function(window){

  alert("Configure your model.js file in app/models/npo.js");

  // // Example of StackMob REST configuration:
  // var baseURL = "http://api.stackmob.com/npo"
  // var defaultHeaders = {
  //   "X-StackMob-API-Key-<STACKMOB API KEY HERE>": "1",
  //   "Accept": "application/vnd.stackmob+json; version=0"
  // }


  // support for writing custom headers per model
  var originalSync = Backbone.sync,
      setHeadersSync = function(method, model, options) {
        options.beforeSend = function (xhr) {
          for (var key in defaultHeaders){
            if (defaultHeaders.hasOwnProperty(key)) {
              xhr.setRequestHeader(key, defaultHeaders[key]);
            };
          };
        };
        originalSync(method, model, options); // call the original sync
      }

  // single model
  window.Npo = Backbone.Model.extend({
    idAttribute: "npo_id", // you might need to change/remove this here and in app/controllers/npo.js
    url: function() {
      if (this.isNew()) {
        return baseURL
      } else {
        return baseURL+"/"+this.id // use id suffix if model has id
      }
    },
    // override sync to set default headers for this model
    sync: setHeadersSync
  });

  // model collection
  window.NpoCollection = Backbone.Collection.extend({
    model: Npo,
    url: baseURL,
    sync: setHeadersSync
  });


})(window);
