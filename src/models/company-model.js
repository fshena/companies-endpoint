module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('Company', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                is: ['^[a-zA-Z0-9-_ ]+$', 'i'],
                len: [3, 100],
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        telephone: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                isNumeric: true,
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        logo: {
            type: DataTypes.STRING(500),
            allowNull: true,
            defaultValue: null,
            validate: {
                is: [
                    '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)',
                    'i'],
            },
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -90,
                max: 90,
            },
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -180,
                max: 180,
            },
        },
        street: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                is: ['^[a-zA-Z ]+$', 'i'],
                len: [3, 100],
                notEmpty: true,
            },
        },
        number: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            validate: {
                isNumeric: true,
                notEmpty: true,
            },
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                is: ['^[a-zA-Z ]+$', 'i'],
                len: [3, 100],
                notEmpty: true,
            },
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                is: ['^[a-zA-Z ]+$', 'i'],
                len: [3, 100],
                notEmpty: true,
            },
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                isBoolean: true,
                notEmpty: true,
            },
        },
    }, {
        freezeTableName: true,
        tableName: 'company',
        underscored: true,
    });
    return company;
};
