(function() {
    'use strict';
    angular
        .module('talks')
        .factory('TalksForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
//Add new properties to the angular-formly array properties in public/modules/module-name/services/module-name.form.client.service.js
//Then add new columns for the new properties in the HTML table in public/modules/module-name/views/list-module-name.client.view.html
            //  LAST_NAME: {type: String},
            {
                key: 'LAST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'LAST_NAME:',
                    disabled: disabled
                }
            },
            //FIRST_NAME: {type: String},
            {
                key: 'FIRST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'FIRST_NAME:',
                    disabled: disabled
                }
            },
            //Original_Walk: {type: String},
            {
                key: 'Original_Walk',
                type: 'input',
                templateOptions: {
                    label: 'Original_Walk:',
                    disabled: disabled
                }
            },
            //Walk_Number: {type:String},
            {
                key: 'Walk_Number',
                type: 'input',
                templateOptions: {
                    label: 'Walk_Number:',
                    disabled: disabled
                }
            },
            //Talk: {type:String},
            {
                key: 'Talk',
                type: 'input',
                templateOptions: {
                    label: 'Talk:',
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
