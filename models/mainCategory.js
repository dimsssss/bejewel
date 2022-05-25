module.exports = (sequelize, DataTypes) => {
    const mainCategory = sequelize.define('mainCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: "TIMESTAMP",
            allowNull: true,
        },
        updatedAt: {
            type: "TIMESTAMP",
            allowNull: true
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'main_category'
    });

    return mainCategory;
}
