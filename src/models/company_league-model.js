
module.exports = (sequelize, DataTypes) => {
    const CompanyLeague = sequelize.define('CompanyLeague', {
        company_id: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        league_id: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'company_league',
        underscored: true,
    });
    return CompanyLeague;
};
