
module.exports = (sequelize, DataTypes) => {
    const companyUser = sequelize.define('CompanyUser', {
        company_id: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'company_user',
        underscored: true,
    });
    return companyUser;
};
