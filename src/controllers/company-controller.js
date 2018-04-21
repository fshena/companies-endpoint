const { paginationLinks }     = require('@localleague/helpers');
const httpStatus              = require('http-status-codes');
const yaml                    = require('yamljs');

const { query: { maxLimit } } = require('../config/api-config');
const companyMySqlRepository  = require('../repository/mysql/company-repository');
const errorController         = require('./error-controller');
const getCompanyDto           = require('../dto/get-dto');
const postCompanyDto          = require('../dto/post-dto');
const putCompanyDto           = require('../dto/put-dto');
const companyCollectionDto    = require('../dto/collection-dto');

/**
 * Query database for using company id.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.getById = (req, res, next) => {
    const sendResponse = (company) => {
        const status = company ? httpStatus.OK : httpStatus.NOT_FOUND;
        res.status(status);
        if (status === httpStatus.NOT_FOUND) {
            return res.json();
        }
        return res.json(getCompanyDto.map(company));
    };
    companyMySqlRepository
        .getCompanyById({ companyId: req.params.id, fields: req.params.fields })
        .then(sendResponse)
        .catch(errors => errorController(errors, next));
};

/**
 * Get all company form the database.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.get = (req, res, next) => {
    const sendResponse = (companies) => {
        res.set({
            Link: paginationLinks(req, companies.count, maxLimit),
            'X-Total-Count': companies.count,
        });
        res.status(httpStatus.OK);
        res.json(companyCollectionDto(companies.rows));
    };
    companyMySqlRepository
        .getAllCompanies(req)
        .then(sendResponse)
        .catch(errors => errorController(errors, next));
};

/**
 * Save companies in the database.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.post = (req, res, next) => {
    const sendResponse = (company, created) => {
        const createdCompany = company.get({ plain: true });
        let status = httpStatus.CREATED;
        // If no new company was created because it already exists.
        if (!created && createdCompany) {
            status = httpStatus.NOT_MODIFIED;
        }
        // The link where to find the new company or the existing one.
        const location = `${req.route.path}/${createdCompany.id}`;
        res.header('Content-Location', location);
        res.status(status);
        res.json();
    };
    companyMySqlRepository
        .createCompany(postCompanyDto(req.body))
        .spread(sendResponse)
        .then(errors => errorController(errors, next));
};

/**
 * Update companies data.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.put = (req, res, next) => {
    const sendResponse = (updated) => {
        const status = updated[0] > 0 ? httpStatus.NO_CONTENT : httpStatus.NOT_FOUND;
        res.status(status);
        res.json();
    };
    companyMySqlRepository
        .updateCompany(req.params.id, putCompanyDto(req.body))
        .then(sendResponse)
        .catch(errors => errorController(errors, next));
};

/**
 * Delete company from the database.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.delete = (req, res, next) => {
    const sendResponse = (deleted) => {
        // Send different status if record for deletion exists or not.
        const status = deleted ? httpStatus.NO_CONTENT : httpStatus.NOT_FOUND;
        res.status(status);
        res.json();
    };
    companyMySqlRepository
        .deleteCompany(req.params.id)
        .then(sendResponse)
        .catch(errors => errorController(errors, next));
};

/**
 * Send a json representation of the swagger file.
 * @param {Object} req
 * @param {Object} res
 */
exports.docs = (req, res) => {
    const nativeObj = yaml.load(`${__dirname}/../../docs/swagger.yaml`);
    res.json(nativeObj);
};
