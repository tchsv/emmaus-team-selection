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
            if (file.name) {
                var name = file.name;
            } else {
                return;
            }
//            var xlsFile = $window.XLSX.readFile(name);
            removeCurrentData();
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
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    var holeList = $resource('/community-raw-members/', null,
                        {
                            'set': {method: 'POST'}
                        });
                    allTheDataPost = holeList;
                    countOfTheData = 0;
                    var adjData = adjustTheColumns(allTheData[countOfTheData]);
                    allTheDataPost.set(adjData).$promise.then(successSent, failSent);

                    //   for (var j = 0; j < oddStuff.length; j++) {
                    //       holeList.set(oddStuff[j]);
                    //   }

                });


            };

            //reader.re
            reader.readAsBinaryString(file);

        }

        var adjustmentList = {
            'MS': 'M_S',
            'p72hr': 'p72_hr',
            'Clnup': 'ClnUp'
        };
        /**
         * Read the row of Data.
         * If row has column key that needs to be translated then
         * create new key/value and delete old.
         * @param rowOfData
         */
        var adjustTheColumns = function (rowOfData) {
            if (rowOfData) {
                var keys = Object.keys(adjustmentList);
                for (var i = 0; i < keys.length; i++) {
                    var rowOfDataKeys = Object.keys(rowOfData);
                    if (rowOfDataKeys.indexOf(keys[i]) > -1) {
                        rowOfData[adjustmentList[keys[i]]] = rowOfData[keys[i]];
                        delete rowOfData[keys[i]];
                    }
                }
            }
            return rowOfData;
        }
        var successSent = function () {
            if (countOfTheData < allTheData.length) {
                countOfTheData++;
                var adjData = adjustTheColumns(allTheData[countOfTheData]);
                allTheDataPost.set(adjData).$promise.then(successSent, failSent);
            }
        }
        var failSent = function (err) {
            console.log(err);
        }

        var localOldDataResource;
        var localOldData = [];
        var localOldDataCount = 0;
        var localOldDataLength = 0;
        var removeCurrentData = function() {
            var nowRawList = $resource('/community-raw-members?count=99999&page=1');
            var answer = nowRawList.get(function () {
                localOldDataResource = $resource('/community-raw-members/:id',{id:'@id'})
                localOldData = answer.results;;
                localOldDataLength = localOldData.length;
                localOldDataCount = 0
                removeSuccess();
            });
        };

        var removeSuccess = function() {
            if (localOldDataCount <= localOldDataLength) {
                localOldDataResource.delete({id: localOldData[localOldDataCount++]._id}).$promise.then(removeSuccess,removeFail);
            }
        };

        var removeFail = function(err) {
            console.log("Failed:" + err);
        };

    }]);
