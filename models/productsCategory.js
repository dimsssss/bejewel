module.exports = (sequelize, DataTypes) => {
    const productsCategory = sequelize.define('productsCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            }
        },
        mainCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'mainCategory',
                key: 'id',
            }
        },
        subCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subCategory',
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
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'products_category'
    });

    return productsCategory;
}
