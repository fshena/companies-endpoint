const { db }             = require('@localleague/database');
const companyModel       = require('./company-model');
const companyUserModel   = require('./company_user-model');
const companyLeagueModel = require('./company_league-model');

const models = [
    companyModel,
    companyUserModel,
    companyLeagueModel,
];

module.exports = db.loadModels(models);
