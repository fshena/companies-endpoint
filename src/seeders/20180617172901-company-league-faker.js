const faker = require('faker');

module.exports = {
    up: (queryInterface) => {
        const relations = [];
        for (let i = 0; i < 100; i++) {
            relations.push({
                company_id: faker.random.number({ min: 1, max: 100 }),
                league_id: faker.random.number({ min: 1, max: 100 }),
                is_active: faker.random.boolean(),
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            });
        }
        return queryInterface.bulkInsert('company_league', relations, {});
    },
    down: queryInterface => queryInterface.bulkDelete('company_league'),
};
