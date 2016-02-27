(function() {
    'use strict';
    angular
        .module('talks')
        .factory('TalksForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
//Add new properties to the angular-formly array properties in public/modules/module-name/services/module-name.form.client.service.js
//Then add new columns for the new properties in the HTML table in public/modules/module-name/views/list-module-name.client.view.html
  					key: 'name',
  					type: 'input',
  					templateOptions: {
  			      label: 'Name:',
  						disabled: disabled
  			    }
  				}

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();
