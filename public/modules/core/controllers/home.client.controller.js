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
        var adjList = {
            'LASTNAME':'LAST_NAME', 'FIRST NAME':'FIRST_NAME',
            'PHONE #':'PHONE','STREET ADDRESS':'STREET_ADDRESS',
            'ORIGINAL WALK #':'Original_Walk','L.D.':'L_D','S.D.':'S_D','A.S.D.':'A_S_D',
            'A.L.D.':'A_L_D',
            'Mu.':'Mu',
            'A.T.L.':'A_T_L',
            'BC':'BC','T.L.':'T_L','MS':'M_S','Ref.':'Ref','72 hr.':'p72_hr',
            'Hous.':'Hous','Cnd. Lite':'Cnd_Lite','Clo.':'Clo','Wor.':'Wor','Fo.Up':'Fo_Up','S. Pray':'S_Pray',
            'Spo. Hr.':'Spo_Hr','Ent.':'Ent','PP Tech':'PP_Tech'
            
        };
        var committeeList = ['L_D',  'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L', 'Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'Clnup', 'PP_Tech'];
        var talkList = [ 'PER', 'MG', 'PG', 'OG', 'SG', 'JG',  'PRI', 'FD', 'PHB', 'PIE', 'S', 'CA', 'DISC', 'CW', 'BC'];

        // var adjustmentList = {
        //     'MS': 'M_S',
        //     'p7 2hr': 'p72_hr',
        //     'Clnup': 'ClnUp'
        // };
        /**
         * Read the row of Data.
         * If row has column key that needs to be translated then
         * create new key/value and delete old.
         * @param rowOfData
         */
        var adjustTheColumns = function (rowOfData) {
            if (rowOfData) {
                var keys = Object.keys(adjList);
                for (var i = 0; i < keys.length; i++) {
                    var rowOfDataKeys = Object.keys(rowOfData);
                    if (rowOfDataKeys.indexOf(keys[i]) > -1) {
                        rowOfData[adjList[keys[i]]] = rowOfData[keys[i]];
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
                if (localOldData[localOldDataCount++]._id) {
                    localOldDataResource.delete({id: localOldData[localOldDataCount++]._id}).$promise.then(removeSuccess, removeFail);
                } else {
                    console.log('not there');
                }
            }
        };

        var removeFail = function(err) {
            console.log("Failed:" + err);
        };

    }]);
