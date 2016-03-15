(function() {
    'use strict';

    angular
        .module('team-members')
        .factory('TeamMembersForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
            { key: 'COMBO_KEY',
                type: 'input',
                templateOptions: {
                    label: 'Selected:',
                    disabled: disabled
                }},
            { key: 'Selected',
                type: 'input',
                templateOptions: {
                    label: 'Selected:',
                    disabled: disabled
                }},
            { key: 'LAST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'Last Name:',
                    disabled: disabled
                }},
            { key: '    FIRST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'First Name:',
                    disabled: disabled
                }},
            { key: 'AC',
                type: 'input',
                templateOptions: {
                    label: 'AC:',
                    disabled: disabled
                }},
            { key: 'PHONE',
                type: 'input',
                templateOptions: {
                    label: 'Phone:',
                    disabled: disabled
                }},
            { key: 'STREET_ADDRESS',
                type: 'input',
                templateOptions: {
                    label: 'Street Address:',
                    disabled: disabled
                }},
            { key: 'CITY',
                type: 'input',
                templateOptions: {
                    label: 'City:',
                    disabled: disabled
                }},
            { key: 'ST',
                type: 'input',
                templateOptions: {
                    label: 'ST:',
                    disabled: disabled
                }},
            { key: 'ZIP',
                type: 'input',
                templateOptions: {
                    label: 'Zip:',
                    disabled: disabled
                }},
            { key: 'Original_Walk',
                type: 'input',
                templateOptions: {
                    label: 'Original Walk:',
                    disabled: disabled
                }},
            { key: 'L_D',
                type: 'input',
                templateOptions: {
                    label: 'Lay Dir:',
                    disabled: disabled
                }},
            { key: 'S_D',
                type: 'input',
                templateOptions: {
                    label: 'Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'A_L_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'A_S_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'Mu',
                type: 'input',
                templateOptions: {
                    label: 'Music:',
                    disabled: disabled
                }},
            { key: 'A_T_L',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'T_L',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'Agape',
                type: 'input',
                templateOptions: {
                    label: 'Agape:',
                    disabled: disabled
                }},
            { key: 'M_S',
                type: 'input',
                templateOptions: {
                    label: 'M S:',
                    disabled: disabled
                }},
            { key: 'Ref',
                type: 'input',
                templateOptions: {
                    label: 'Refreshments:',
                    disabled: disabled
                }},
            { key: 'p72_hr',
                type: 'input',
                templateOptions: {
                    label: '72hr:',
                    disabled: disabled
                }},
            { key: 'Hous',
                type: 'input',
                templateOptions: {
                    label: 'Housing:',
                    disabled: disabled
                }},
            { key: 'Cnd_Lite',
                type: 'input',
                templateOptions: {
                    label: 'Candle Light:',
                    disabled: disabled
                }},
            { key: 'Clo',
                type: 'input',
                templateOptions: {
                    label: 'Closing:',
                    disabled: disabled
                }},
            { key: 'Ent',
                type: 'input',
                templateOptions: {
                    label: 'Entertainment:',
                    disabled: disabled
                }},
            { key: 'S_Pray',
                type: 'input',
                templateOptions: {
                    label: 'Speakers Prayer Chap:',
                    disabled: disabled
                }},
            { key: 'Spo_Hr',
                type: 'input',
                templateOptions: {
                    label: 'Sponsers Hour:',
                    disabled: disabled
                }},
            { key: 'Wor',
                type: 'input',
                templateOptions: {
                    label: 'Worship:',
                    disabled: disabled
                }},
            { key: 'Goph',
                type: 'input',
                templateOptions: {
                    label: 'Goph:',
                    disabled: disabled
                }},
            { key: 'ClnUp',
                type: 'input',
                templateOptions: {
                    label: 'Clean Up:',
                    disabled: disabled
                }},
            { key: 'PP_Tech',
                type: 'input',
                templateOptions: {
                    label: 'Tech:',
                    disabled: disabled
                }},
            { key: 'PER',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PRI',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PHB',
                type: 'input',
                templateOptions: {
                    label: 'Presithood of Beleivers:',
                    disabled: disabled
                }},
            { key: 'PIE',
                type: 'input',
                templateOptions: {
                    label: 'Life of Piety:',
                    disabled: disabled
                }},
            { key: 'S',
                type: 'input',
                templateOptions: {
                    label: 'S:',
                    disabled: disabled
                }},
            { key: 'CA',
                type: 'input',
                templateOptions: {
                    label: 'CA:',
                    disabled: disabled
                }},
            { key: 'DISC',
                type: 'input',
                templateOptions: {
                    label: 'DISC:',
                    disabled: disabled
                }},
            { key: 'CW',
                type: 'input',
                templateOptions: {
                    label: 'CW:',
                    disabled: disabled
                }},
            { key: 'BC',
                type: 'input',
                templateOptions: {
                    label: 'BC:',
                    disabled: disabled
                }},
            { key: 'P',
                type: 'input',
                templateOptions: {
                    label: 'P:',
                    disabled: disabled
                }},
            { key: 'FD',
                type: 'input',
                templateOptions: {
                    label: 'FD:',
                    disabled: disabled
                }},
            { key: 'PG',
                type: 'input',
                templateOptions: {
                    label: 'PG:',
                    disabled: disabled
                }},
            { key: 'OG',
                type: 'input',
                templateOptions: {
                    label: 'OG:',
                    disabled: disabled
                }},
            { key: 'SG',
                type: 'input',
                templateOptions: {
                    label: 'SC:',
                    disabled: disabled
                }},
            { key: 'JG',
                type: 'input',
                templateOptions: {
                    label: 'JG:',
                    disabled: disabled
                }},
            { key: 'MG',
                type: 'input',
                templateOptions: {
                    label: 'MG:',
                    disabled: disabled
                }},

            { key: 'sL_D',
                type: 'input',
                templateOptions: {
                    label: 'Lay Dir:',
                    disabled: disabled
                }},
            { key: 'sS_D',
                type: 'input',
                templateOptions: {
                    label: 'Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'sA_L_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'sA_S_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'sMu',
                type: 'input',
                templateOptions: {
                    label: 'Music:',
                    disabled: disabled
                }},
            { key: 'sA_T_L',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'sT_L',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'sAgape',
                type: 'input',
                templateOptions: {
                    label: 'Agape:',
                    disabled: disabled
                }},
            { key: 'sM_S',
                type: 'input',
                templateOptions: {
                    label: 'M S:',
                    disabled: disabled
                }},
            { key: 'sRef',
                type: 'input',
                templateOptions: {
                    label: 'Refreshments:',
                    disabled: disabled
                }},
            { key: 'sp72_hr',
                type: 'input',
                templateOptions: {
                    label: '72hr:',
                    disabled: disabled
                }},
            { key: 'sHous',
                type: 'input',
                templateOptions: {
                    label: 'Housing:',
                    disabled: disabled
                }},
            { key: 'sCnd_Lite',
                type: 'input',
                templateOptions: {
                    label: 'Candle Light:',
                    disabled: disabled
                }},
            { key: 'sClo',
                type: 'input',
                templateOptions: {
                    label: 'Closing:',
                    disabled: disabled
                }},
            { key: 'sEnt',
                type: 'input',
                templateOptions: {
                    label: 'Entertainment:',
                    disabled: disabled
                }},
            { key: 'sS_Pray',
                type: 'input',
                templateOptions: {
                    label: 'Speakers Prayer Chap:',
                    disabled: disabled
                }},
            { key: 'sSpo_Hr',
                type: 'input',
                templateOptions: {
                    label: 'Sponsers Hour:',
                    disabled: disabled
                }},
            { key: 'sWor',
                type: 'input',
                templateOptions: {
                    label: 'Worship:',
                    disabled: disabled
                }},
            { key: 'sGoph',
                type: 'input',
                templateOptions: {
                    label: 'Goph:',
                    disabled: disabled
                }},
            { key: 'sClnUp',
                type: 'input',
                templateOptions: {
                    label: 'Clean Up:',
                    disabled: disabled
                }},
            { key: 'sPP_Tech',
                type: 'input',
                templateOptions: {
                    label: 'Tech:',
                    disabled: disabled
                }},
            { key: 'sPER',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'sPRI',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'sPHB',
                type: 'input',
                templateOptions: {
                    label: 'Presithood of Beleivers:',
                    disabled: disabled
                }},
            { key: 'sPIE',
                type: 'input',
                templateOptions: {
                    label: 'Life of Piety:',
                    disabled: disabled
                }},
            { key: 'sS',
                type: 'input',
                templateOptions: {
                    label: 'S:',
                    disabled: disabled
                }},
            { key: 'sCA',
                type: 'input',
                templateOptions: {
                    label: 'CA:',
                    disabled: disabled
                }},
            { key: 'sDISC',
                type: 'input',
                templateOptions: {
                    label: 'DISC:',
                    disabled: disabled
                }},
            { key: 'sCW',
                type: 'input',
                templateOptions: {
                    label: 'CW:',
                    disabled: disabled
                }},
            { key: 'sBC',
                type: 'input',
                templateOptions: {
                    label: 'BC:',
                    disabled: disabled
                }},
            { key: 'sP',
                type: 'input',
                templateOptions: {
                    label: 'P:',
                    disabled: disabled
                }},
            { key: 'sFD',
                type: 'input',
                templateOptions: {
                    label: 'FD:',
                    disabled: disabled
                }},
            { key: 'sPG',
                type: 'input',
                templateOptions: {
                    label: 'PG:',
                    disabled: disabled
                }},
            { key: 'sOG',
                type: 'input',
                templateOptions: {
                    label: 'OG:',
                    disabled: disabled
                }},
            { key: 'sSG',
                type: 'input',
                templateOptions: {
                    label: 'SC:',
                    disabled: disabled
                }},
            { key: 'sJG',
                type: 'input',
                templateOptions: {
                    label: 'JG:',
                    disabled: disabled
                }},
            { key: 'sMG',
                type: 'input',
                templateOptions: {
                    label: 'MG:',
                    disabled: disabled
                }},
            { key: 'sMBH',
                type: 'input',
                templateOptions: {
                    label: 'MBH:',
                    disabled: disabled
                }},
            { key: 'sMCR',
                type: 'input',
                templateOptions: {
                    label: 'MCR:',
                    disabled: disabled
                }}



        ];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();
