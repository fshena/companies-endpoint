const objMapper             = require('object-mapper');
const extract               = require('extract');
const { object: objHelper } = require('@localleague/helpers');

const mapping = {
    id: 'id',
    name: 'name',
    description: 'description',
    telephone: 'telephone',
    email: 'email',
    logo: 'logo',
    latitude: 'location.latitude',
    longitude: 'location.longitude',
    street: 'address.street',
    number: 'address.number',
    city: 'address.city',
    country: 'address.country',
    is_active: 'isActive',
};

module.exports = {
    getMap: () => mapping,

    /**
     * The Company's json structure that will be returned in the response.
     * @param {Object} company
     * @param {boolean} reverse
     * @return {*}
     */
    map: (company, reverse = false) => {
        // only map requested fields in order to avoid empty nested fields
        const mapFields = extract(mapping, Object.keys(company));
        const src = reverse ? objHelper.reverse(mapFields) : mapFields;
        return objMapper(company, src);
    },
};
