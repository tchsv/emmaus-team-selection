'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','$window', '$resource',
	function($scope, Authentication, $window, $resource) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


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

				var nowWholeList = $resource('/community-members?count=99999&page=1');
				var answer = nowWholeList.get(function() {
					console.log(answer);
                    if ( answer.total === 0 ) {

                    }
                    else {
                        for (var i = 0; i < answer.total; i++) {

                            /**
                             * Now check for each row....  search the worksheet the the First and Last name....
                             * @type {Array}
                             */
                            var currentRow = answer.results[i];
                            for (var j = 0; j < oddStuff.length; j++) {
                                if (currentRow.LastName.trim() == oddStuff[j].LastName.trim()) {
                                    if (currentRow.FirstName.trim() == oddStuff[j].FirstName.trim()) {
                                        var newRow = oddStuff[j];
                                        var update = false;
                                        var keys = Object.keys(newRow);
                                        for (var k = 0; k < keys.length; k++) {
                                            var nR = newRow[keys[k]];
                                            nR = nR.trim();
                                            var cR = currentRow[keys[k]];
                                            if (cR) {
                                                cR = cR.trim();
                                            }
                                            if (nR != cR) {
                                                currentRow[keys[k]] = nR;
                                                update = true;
                                            }
                                        }
                                        if (update) {
                                            console.log("updated row:" + JSON.stringify(currentRow));
                                            if (!currentRow.Room_Mate1) {
                                                currentRow.Room_Mate1 = null;
                                            }
                                            if (!currentRow.Room_Mate2) {
                                                currentRow.Room_Mate2 = null;
                                            }
                                            if (!currentRow.Room_Mate3) {
                                                currentRow.Room_Mate3 = null;
                                            }
                                            var holeList = $resource('/pilgrims/' + currentRow._id, null,
                                                {
                                                    'update': {method: 'PUT'}
                                                });
                                            holeList.update(currentRow);

                                        }
                                    }
                                }
                            }
                        }
                    }
				});






			};

			//reader.re
			reader.readAsBinaryString(file);

		}





	}
]);
