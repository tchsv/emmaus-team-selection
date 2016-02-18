'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Community raw member Schema
 */
var CommunityRawMemberSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Community raw member name',
		trim: true
	},
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
	Mu: {type: String},
	A_L_T: {type: String},
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
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('CommunityRawMember', CommunityRawMemberSchema);
