'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','$window', '$resource',
	function($scope, Authentication, $window, $resource) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        var allTheData = [];
        var countOfTheData = 1;
        var allTheDataPost;

		$scope.refreshCommunityDataFromExcel = function () {
			var reader = new FileReader();
			var file = document.querySelector('input[type=file]').files[0];
			if ( file.name) {
				var name = file.name;
			} else {
				return;
			}
//            var xlsFile = $window.XLSX.readFile(name);

			var data;
			reader.onloadend = function () {
				data = reader.result;
				var workbook = $window.XLSX.read(data, {type: 'binary'});

				/* DO SOMETHING WITH workbook HERE */
				var first_sheet_name = workbook.SheetNames[0];
				/* Get worksheet */
				var worksheet = workbook.Sheets[first_sheet_name];

				var headerIs = [];
				//var address_of_cell = 'A';
				var oddStuff = $window.XLSX.utils.sheet_to_json(worksheet);
                allTheData = oddStuff
				var nowWholeList = $resource('/community-raw-members?count=99999&page=1');
				var answer = nowWholeList.get(function() {
					console.log(answer);
                    var holeList = $resource('/community-raw-members/', null,
                        {
                            'set': {method: 'POST'}
                        });
                    allTheDataPost = holeList;
                    countOfTheData = 0;
                    allTheDataPost.set(allTheData[countOfTheData]).$promise.then(successSent,failSent);

                     //   for (var j = 0; j < oddStuff.length; j++) {
                     //       holeList.set(oddStuff[j]);
                     //   }

				});






			};

			//reader.re
			reader.readAsBinaryString(file);

		}

        var successSent = function() {
            if (countOfTheData < allTheData.length) {
                countOfTheData++;
                allTheDataPost.set(allTheData[countOfTheData]).$promise.then(successSent,failSent);
            }
        }
        var failSent = function (err) {
            console.log(err);
        }


	}
]);
