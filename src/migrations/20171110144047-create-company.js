

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('company', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        telephone: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        logo: {
            type: Sequelize.STRING(500),
            allowNull: true,
            defaultValue: null,
        },
        latitude: {
            type: Sequelize.DECIMAL(10, 8),
            allowNull: true,
            defaultValue: null,
        },
        longitude: {
            type: Sequelize.DECIMAL(11, 8),
            allowNull: true,
            defaultValue: null,
        },
        street: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER(15),
            allowNull: false,
        },
        city: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        country: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }),
    down: queryInterface => queryInterface.dropTable('company'),
};
