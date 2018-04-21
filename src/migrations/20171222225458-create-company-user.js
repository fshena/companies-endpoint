module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('company_user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        company_id: {
            type: Sequelize.INTEGER(15),
        },
        user_id: {
            type: Sequelize.INTEGER(15),
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
    down: queryInterface => queryInterface.dropTable('company_user')
};
