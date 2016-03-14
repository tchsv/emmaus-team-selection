'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Team member Schema
 */
var TeamMemberSchema;
TeamMemberSchema=new Schema({
	COMBO_KEY: {type: String},
	Selected: {type: Boolean},
	LAST_NAME: {type: String},
	FIRST_NAME: {type: String},
	AC: {type: String},
	PHONE: {type: String},
	STREET_ADDRESS: {type: String},
	CITY: {type: String},
	ST: {type: String},
	ZIP: {type: String},
	Original_Walk: {type: String},
	L_D: {type: String},
	S_D: {type: String},
	A_L_D: {type: String},
	A_S_D: {type: String},
	Mu: {type: String},
	A_T_L: {type: String},
	T_L: {type: String},
	Agape: {type: String},
	M_S: {type: String},
	Ref: {type: String},
	p72_hr: {type: String},
	Hous: {type: String},
	Cnd_Lite: {type: String},
	Clo: {type: String},
	Ent: {type: String},
	S_Pray: {type: String},
	Spo_Hr: {type: String},
	Wor: {type: String},
	Goph: {type: String},
	ClnUp: {type: String},
	PP_Tech: {type: String},

	PER: {type: String},
	PRI: {type: String},
	PHB: {type: String},
	PIE: {type: String},
	S: {type: String},
	CA: {type: String},
	DISC: {type: String},
	CW: {type: String},
	BC: {type: String},
	P: {type: String},
	FD: {type: String},
	PG: {type: String},
	OG: {type: String},
	SG: {type: String},
	JG: {type: String},
	MG: {type: String},
	sL_D: {type: Boolean},
	sS_D: {type: Boolean},
	sA_L_D: {type: Boolean},
	sA_S_D: {type: Boolean},
	sMu: {type: Boolean},
	sA_T_L: {type: Boolean},
	sT_L: {type: Boolean},
	sAgape: {type: Boolean},
	sM_S: {type: Boolean},
	sRef: {type: Boolean},
	sp72_hr: {type: Boolean},
	sHous: {type: Boolean},
	sCnd_Lite: {type: Boolean},
	sClo: {type: Boolean},
	sEnt: {type: Boolean},
	sS_Pray: {type: Boolean},
	sSpo_Hr: {type: Boolean},
	sWor: {type: Boolean},
	sGoph: {type: Boolean},
	sClnUp: {type: Boolean},
	sPP_Tech: {type: Boolean},

	sPER: {type: String},
	sPRI: {type: Boolean},
	sPHB: {type: Boolean},
	sPIE: {type: Boolean},
	sS: {type: Boolean},
	sCA: {type: Boolean},
	sDISC: {type: Boolean},
	sCW: {type: Boolean},
	sBC: {type: Boolean},
	sP: {type: Boolean},
	sFD: {type: Boolean},
    sPG: {type: Boolean},
    sOG: {type: Boolean},
    sSG: {type: Boolean},
    sJG: {type: Boolean},
    sMG: {type: Boolean},
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('TeamMember', TeamMemberSchema);
