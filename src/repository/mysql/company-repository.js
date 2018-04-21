const { object: objHelper }   = require('@localleague/helpers');
const { Op }                  = require('sequelize');

const { query: { maxLimit } } = require('../../config/api-config');
const models                  = require('../../models');
const getCompanyDto           = require('../../dto/get-dto');

/**
 * Get specific company entry.
 * @param {{companyId: numeric, fields: array}} payload
 * @return {Promise<Array<Model>>}
 */
exports.getCompanyById = (payload) => {
    const sqlQuery = {
        where: {
            [Op.and]: {
                id: payload.companyId,
            },
        },
        raw: true,
    };
    if (payload.fields) {
        // get the mysql field names corresponding to the fields in the request
        sqlQuery.attributes = objHelper.getDbFieldsNames(
            getCompanyDto.getMap(),
            payload.fields.split(',')
        );
    }
    return models.Company.findOne(sqlQuery);
};

/**
 * Get all companies.
 * @param {Object} req
 * @return {Promise<Array<Model>>}
 */
exports.getAllCompanies = (req) => {
    const limit = parseInt(req.query.limit, 10) || maxLimit;
    const sqlQuery = {
        limit,
        offset: parseInt(req.query.offset, 10) * limit || 0,
        order: [
            [
                req.query.sort || models.Company.attributes.name,
                req.query.order || 'ASC',
            ],
        ],
        raw: true,
    };
    if (req.params.fields) {
        // get the mysql field names corresponding to the fields in the request
        sqlQuery.attributes = objHelper.getDbFieldsNames(
            getCompanyDto.getMap(),
            req.params.fields.split(',')
        );
    }
    return models.Company.findAndCountAll(sqlQuery);
};

/**
 * Create new company entry if the company doesn't already exist.
 * @param {Object} newCompany
 * @return {Promise<Model, created>}
 */
exports.createCompany = (newCompany) => {
    const conditions = {
        where: {
            [Op.and]: {
                email: newCompany.email,
            },
        },
        defaults: newCompany,
    };
    return models.Company.findOrCreate(conditions);
};

/**
 * Update company entry.
 * @param {integer} id
 * @param {Object} updateCompany
 * @return {Promise}
 */
exports.updateCompany = (id, updateCompany) => models.Company.update(updateCompany, {
    where: {
        [Op.and]: {
            id,
        },
    },
});

/**
 * Delete specific company entry.
 * @param {integer} id
 * @return {Promise}
 */
exports.deleteCompany = id => models.Company.destroy({
    where: {
        [Op.and]: {
            id,
        },
    },
});
