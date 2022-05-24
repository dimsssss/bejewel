module.exports = (sequelize, DataTypes) => {
    const productCategory = sequelize.define('products_category', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        mainCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'main_category',
                key: 'id',
            }
        },
        subCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sub_category',
                key: 'id',
            }
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
        freezeTableName: true
    });

    return productCategory;
}
