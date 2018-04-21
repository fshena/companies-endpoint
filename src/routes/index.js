const queryMiddleware  = require('../middleware/query-middleware');
const fieldsMiddleware = require('../middleware/fields-middleware');
const companies        = require('../controllers/company-controller');

module.exports = (server) => {
    server.get(
        { path: '/companies', name: 'getCompanies' },
        queryMiddleware,
        fieldsMiddleware,
        companies.get
    );
    server.get(
        { path: '/companies/:id([0-9]+)', name: 'getCompaniesById' },
        queryMiddleware,
        fieldsMiddleware,
        companies.getById
    );
    server.post(
        { path: '/companies', name: 'postCompanies' },
        companies.post
    );
    server.put(
        { path: '/companies/:id([0-9]+)', name: 'putCompanies' },
        companies.put
    );
    server.del(
        { path: '/companies/:id([0-9]+)', name: 'deleteCompanies' },
        companies.delete
    );
    server.get(
        { path: '/companies/swagger.json', name: 'docsCompanies' },
        companies.docs
    );
};
