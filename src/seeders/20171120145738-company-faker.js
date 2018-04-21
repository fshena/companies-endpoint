const faker = require('faker');

module.exports = {
    up: (queryInterface) => {
        const companies = [];
        for (let i = 0; i < 100; i++) {
            companies.push({
                name: faker.company.companyName(),
                description: faker.lorem.paragraph(),
                telephone: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                logo: faker.image.business(),
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude(),
                street: faker.address.streetName(),
                number: faker.random.number(),
                city: faker.address.city(),
                country: faker.address.country(),
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            });
        }
        return queryInterface.bulkInsert('company', companies, {});
    },
    down: queryInterface => queryInterface.bulkDelete('company', null, {}),
};
