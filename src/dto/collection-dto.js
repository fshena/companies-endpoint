const companyDto = require('./get-dto');

/**
 * The Company entity collection structure that
 * will be returned in the response.
 * @param {Object[]} companies
 * @return {*}
 */
module.exports = (companies) => {
    const companiesDto = [];
    // Remove results fields that should not be in the response.
    companies.forEach((company, index) => {
        companiesDto[index] = companyDto.map(company);
    });
    return companiesDto;
};
