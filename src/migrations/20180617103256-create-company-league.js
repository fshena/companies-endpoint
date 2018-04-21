module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('company_league', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        company_id: {
            type: Sequelize.INTEGER,
        },
        league_id: {
            type: Sequelize.INTEGER,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: queryInterface => queryInterface.dropTable('CompanyLeagues')
};
