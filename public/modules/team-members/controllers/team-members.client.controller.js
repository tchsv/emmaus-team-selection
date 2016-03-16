'use strict';

// Team members controller
angular.module('team-members').controller('TeamMembersController', ['$scope', '$q', '$resource', '$stateParams', '$location', 'Authentication', 'TeamMembers', 'TableSettings', 'TeamMembersForm',
    function ($scope, $q, $resource, $stateParams, $location, Authentication, TeamMembers, TableSettings, TeamMembersForm) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(TeamMembers);
        $scope.teamMember = {};

        $scope.setFormFields = function (disabled) {
            $scope.formFields = TeamMembersForm.getFormFields(disabled);
        };


        // Create new Team member
        $scope.create = function () {
            var teamMember = new TeamMembers($scope.teamMember);

            // Redirect after save
            teamMember.$save(function (response) {
                $location.path('team-members/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Team member
        $scope.remove = function (teamMember) {

            if (teamMember) {
                teamMember = TeamMembers.get({teamMemberId: teamMember._id}, function () {
                    teamMember.$remove();
                    $scope.tableParams.reload();
                });

            } else {
                $scope.teamMember.$remove(function () {
                    $location.path('teamMembers');
                });
            }

        };

        // Update existing Team member
        $scope.update = function () {
            var teamMember = $scope.teamMember;

            teamMember.$update(function () {
                $location.path('team-members/' + teamMember._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.toViewTeamMember = function () {
            $scope.teamMember = TeamMembers.get({teamMemberId: $stateParams.teamMemberId});
            $scope.setFormFields(true);
        };

        $scope.toEditTeamMember = function () {
            $scope.teamMember = TeamMembers.get({teamMemberId: $stateParams.teamMemberId});
            $scope.setFormFields(false);
        };

//var title for output FirstName LastName OrgWalk totalWalks confRoom Talks (prioty or 4th day)
        var committeeList = ['L_D', 'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L', 'Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'ClnUp', 'PP_Tech','P'];
        var frontHallList = ['L_D', 'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L'];
        var backHallList = ['Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'ClnUp', 'PP_Tech','P'];
        //var selectFrontHallList = ['sL_D', 'sS_D', 'sA_S_D', 'sA_L_D', 'sA_T_L', 'sT_L', 'sMCR'];
        var selectFrontHallList = ['sL_D', 'sS_D', 'sA_S_D','sA_S_Da','sA_S_De', 'sA_L_D','sA_L_Da','sA_L_De', 'sA_T_L','sA_T_La','sA_T_Le', 'sT_L','sT_La','sT_Le', 'sMCR'];
        var selectBackHallList = ['sMu', 'sPP_Tech', 'sAgape', 'sM_S', 'sRef', 'sp72_hr', 'sHous', 'sCnd_Lite', 'sClo', 'sWor', 'sFo_Up', 'sS_Pray', 'sSpo_Hr', 'sEnt', 'sGoph', 'sClnUp', 'sMBH', 'sP'];
        var selectFrontHallTitle = {'sL_D':'Lay Director', 'sS_D':'Spirtual Director', 'sA_S_D':'Asst. Spirtual Director'
            ,'sA_S_Da':'Alternate','sA_S_De':'Extra', 'sA_L_D':'Asst. Lay Director','sA_L_Da':'Alternate','sA_L_De':'Extra'
            , 'sA_T_L':'Asst. Table Leader','sA_T_La':'Alternate','sA_T_Le':'Extra', 'sT_L':'Table Leader','sT_La':'Alternate','sT_Le':'Extra', 'sMCR':'Conf Rm Extra'};
        var talkList = ['PER', 'MG', 'PG', 'OG', 'SG', 'JG', 'PRI', 'FD', 'PHB', 'PIE', 'S', 'CA', 'DISC', 'CW', 'BC'];
        var selectedTalkList = ['sPER', 'sMG', 'sPG', 'sOG', 'sSG', 'sJG', 'sPRI', 'sFD', 'sPHB', 'sPIE', 'sS', 'sCA', 'sDISC', 'sCW', 'sBC'];
        var selectedTalkTitle = {'sPER':'Perseverance', 'sMG':'Means', 'sPG':'Prevenient', 'sOG':'Obstacles', 'sSG':'Sanctifying', 'sJG':'Justifying'
            , 'sPRI':'Priority', 'sFD':'Forth Day', 'sPHB':'Priesthood', 'sPIE':'Piety'
            , 'sS':'Study', 'sCA':'Christian Action', 'sDISC':'Discipleship', 'sCW':'Chg Our World', 'sBC':'Body Of Christ'};

        var testRow = ['FIRS'];

        var generateRowHeader = function () {
            var rowData = {};
            rowData.TeamAssignment = ' ';
            rowData.FIRST_NAME = ' ';
            rowData.LAST_NAME = ' ';
            rowData.PHONE = ' ';
            rowData.CITY = ' ';
            rowData.Original_Walk = ' ';
            rowData.totalWalks = ' ';
            rowData.ServiceRecord = ' ';
            var headerArray = Object.keys(rowData);
            return headerArray;
        };
        var generateRowEspecial = function (firstColumn) {
            var rowData = {};
            rowData.TeamAssignment = firstColumn;
            rowData.FIRST_NAME = ' ';
            rowData.LAST_NAME = ' ';
            rowData.PHONE = ' ';
            rowData.CITY = ' ';
            rowData.Original_Walk = ' ';
            rowData.totalWalks = ' ';
            rowData.ServiceRecord = ' ';
            return rowData;
        };
        var getIsChairOrTalk = function(teamRow) {
            for ( var jjj in selectedTalkList ) {
                if (teamRow[selectedTalkList[jjj]]) {
                    return selectedTalkTitle[selectedTalkList[jjj]];
                }
            }
            return ' ';
        }

        $scope.createTeamSelectionForm = function (tableData) {
            var deferred = $q.defer();

            var nowCommunityList = $resource('/team-members?count=99999&page=1&sorting%5BLAST_NAME%5D=asc');
            nowCommunityList.get().$promise.then(function (teamDataResource) {
                var teamData = teamDataResource.results;
                var teamDataCSV = [];
                var headerArray = generateRowHeader();
                teamDataCSV.push(headerArray);
                for (var pos = 0; pos < selectFrontHallList.length; pos++) {
                    var currentPos = selectFrontHallList[pos];
                    var subHeaderArray = generateRowEspecial(selectFrontHallTitle[currentPos]);
                    teamDataCSV.push(subHeaderArray);
                    for (var i = 0; i < teamData.length; i++) {
                        if (teamData[i][currentPos]) {
                            var rowData = {};
                            rowData.TeamAssignment = getIsChairOrTalk(teamData[i]);
                            rowData.FIRST_NAME = teamData[i].FIRST_NAME;
                            rowData.LAST_NAME = teamData[i].LAST_NAME;
                            rowData.PHONE = teamData[i].AC + '-' + teamData[i].PHONE;
                            rowData.CITY = teamData[i].CITY;
                            rowData.Original_Walk = teamData[i].Original_Walk;
                            rowData.totalWalks = $scope.backHallCount(teamData[i]) + $scope.frontHallCount(teamData[i]);
                            rowData.ServiceRecord = karensSpecialTwo(frontHallList, teamData[i]) + ' ' + karensSpecialTwo(backHallList, teamData[i]);
                            teamDataCSV.push(rowData);
                        }
                    }
                }
                for (var pos = 0; pos < selectBackHallList.length; pos++) {
                    var currentPos = selectBackHallList[pos];
                    var subHeaderArray = generateRowEspecial(currentPos);
                    teamDataCSV.push(subHeaderArray);
                    for (var i = 0; i < teamData.length; i++) {
                        if (teamData[i][currentPos]) {
                            var rowData = {};
                            rowData.TeamAssignment = getIsChairOrTalk(teamData[i]);
                            rowData.FIRST_NAME = teamData[i].FIRST_NAME;
                            rowData.LAST_NAME = teamData[i].LAST_NAME;
                            rowData.PHONE = teamData[i].AC + '-' + teamData[i].PHONE;
                            rowData.CITY = teamData[i].CITY;
                            rowData.Original_Walk = teamData[i].Original_Walk;
                            rowData.totalWalks = $scope.backHallCount(teamData[i]) + $scope.frontHallCount(teamData[i]);
                            rowData.ServiceRecord = karensSpecialTwo(frontHallList, teamData[i]) + '; ' + karensSpecialTwo(backHallList, teamData[i]);
                            teamDataCSV.push(rowData);
                        }
                    }
                }
                deferred.resolve(teamDataCSV);
            });

            return deferred.promise;

        };
        $scope.cvsMe = function (tableData) {
            var deferred = $q.defer();

            var nowCommunityList = $resource('/team-members?count=99999&page=1&sorting%5BLAST_NAME%5D=asc');
            nowCommunityList.get().$promise.then(function (teamDataResource) {
                var teamData = teamDataResource.results;
                var teamDataCSV = [];
                var pushHeaders = true;
                for (var i = 0; i < teamData.length; i++) {
                    var rowData = {};
                    rowData.FIRST_NAME = teamData[i].FIRST_NAME;
                    rowData.LAST_NAME = teamData[i].LAST_NAME;
                    rowData.PHONE = teamData[i].AC + '-' + teamData[i].PHONE;
                    rowData.CITY = teamData[i].CITY;
                    rowData.Original_Walk = teamData[i].Original_Walk;
                    rowData.totalWalks = $scope.backHallCount(teamData[i]) + $scope.frontHallCount(teamData[i]);
                    rowData.ConfRoom = karensSpecialTwo(frontHallList, teamData[i]);
                    rowData.BackHall = karensSpecialTwo(backHallList, teamData[i]);
                    for (var j = 0; j < frontHallList.length; j++) {
                        rowData[frontHallList[j]] = teamData[i][frontHallList[j]] ? karensSpecialThree(frontHallList[j], teamData[i][frontHallList[j]], 3) : '-';
                    }
                    rowData['PRI'] = teamData[i]['PRI'] ? teamData[i]['PRI'] : '-';
                    rowData['FD'] = teamData[i]['FD'] ? teamData[i]['FD'] : '-';
                    if (pushHeaders) {
                        var headerArray = Object.keys(rowData);
                        teamDataCSV.push(headerArray);
                        pushHeaders = false;
                    }
                    teamDataCSV.push(rowData);
                }
                deferred.resolve(teamDataCSV);
            });

            return deferred.promise;
        };

        var karensSpecialTwo = function (frontBackList, data) {
            var summaryAnswer = "";
            for (var j = 0; j < frontBackList.length; j++) {
                summaryAnswer += data[frontBackList[j]] ? karensSpecialThree(frontBackList[j], data[frontBackList[j]], 2) + ',' : '';
            }
            return summaryAnswer;
        };

        var karensSpecialThree = function (label, data, number) {
            var dataCount = data.split('-').length;
            if (dataCount > number) {
                return label + '(' + dataCount + ')';
            }
            else {
                return label + '-' + data + ' ';
            }
        };

        $scope.backHallCount = function (thisPerson) {

            var keys = Object.keys(thisPerson);
            var overAllCount = 0;
            for (var i = 0; i < backHallList.length; i++) {
                if (keys.indexOf(backHallList[i]) > -1) {
                    var colValue = thisPerson[backHallList[i]];
                    var arrayColValue = colValue.split('-');
                    overAllCount += arrayColValue.length;
                }
            }
            return overAllCount;
        };
        $scope.frontHallCount = function (thisPerson) {

            var keys = Object.keys(thisPerson);
            var overAllCount = 0;
            for (var i = 0; i < frontHallList.length; i++) {
                if (keys.indexOf(frontHallList[i]) > -1) {
                    var colValue = thisPerson[frontHallList[i]];
                    var arrayColValue = colValue.split('-');
                    overAllCount += arrayColValue.length;
                }
            }
            return overAllCount;
        };
        $scope.talkCount = function (thisPerson) {

            var keys = Object.keys(thisPerson);
            var overAllCount = 0;
            for (var i = 0; i < talkList.length; i++) {
                if (keys.indexOf(talkList[i]) > -1) {
                    var colValue = thisPerson[talkList[i]];
                    var arrayColValue = colValue.split('-');
                    overAllCount += arrayColValue.length;
                }
            }
            return overAllCount;
        };

        $scope.selectedForTeam = function (thisPerson) {
            console.log("checkbox");
            var communityMember = thisPerson;
            TeamMembers.update({communityMemberId: thisPerson._id}, thisPerson);

        };

        $scope.selectedForUpdate = function (thisPerson) {
            TeamMembers.update({communityMemberId: thisPerson._id}, thisPerson);

        };


    }

]);
