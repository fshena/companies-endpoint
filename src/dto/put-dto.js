const objMapper = require('object-mapper');

/**
 * Create a valid company object structure
 * in order to store it in the database.
 * @param {Object} company
 * @return {*}
 */
module.exports = (company) => {
    const src = {
        name: 'name',
        description: 'description',
        telephone: 'telephone',
        email: 'email',
        logo: 'logo',
        'location.latitude': 'latitude',
        'location.longitude': 'longitude',
        'address.street': 'street',
        'address.number': 'number',
        'address.city': 'city',
        'address.country': 'country',
    };
    return objMapper(company, src);
};
