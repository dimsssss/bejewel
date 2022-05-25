module.exports = (sequelize, DataTypes) => {
    const subCategory = sequelize.define('subCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mainCategoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'mainCategory',
                key: 'id',
            }
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
        tableName: 'sub_category'
    });

    return subCategory;
}
