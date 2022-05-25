module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        brandId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'brands',
                key: 'id',
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipInfo: {
            type: DataTypes.ENUM,
            values: ['TODAY', 'NORMAL'],
            defaultValue: 'TODAY'
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discountPercent: {
            type: DataTypes.INTEGER
        },
        discountAmount: {
            type: DataTypes.INTEGER
        },
        color: {
            type: DataTypes.ENUM,
            values: ['WHITE', 'BLACK'],
            defaultValue: 'WHITE'
        },
        baseMetal: {
            type: DataTypes.ENUM,
            values: ['GOLD', 'SILVER'],
            defaultValue: 'GOLD'
        },
        shape: {
            type: DataTypes.ENUM,
            values: ['RING', 'NECKLACE'],
            defaultValue: 'RING'
        },
        gemstone: {
            type: DataTypes.ENUM,
            values: ['DIAMOND', 'PERL', 'NATURAL'],
            defaultValue: 'NATURAL'
        },
        like: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: "TIMESTAMP",
            allowNull: false,
        },
        updatedAt: {
            type: "TIMESTAMP",
            allowNull: false,
        }

    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: true
    });

    products.associate = (db) => {
        const productsCategory = db.productsCategory;
        products.hasOne(productsCategory, {as: 'pc', sourceKey: 'id', foreignKey: 'productId'})
    }

    products.findAllProductsUsingCategories = async (db, mainCategoryId, subCategoryId) => {
        return await products.findAll({
            attributes: ['id', 'brandId', 'name', 'shipInfo', 'price', 'discountPercent', 'discountAmount', 'color',
                'baseMetal', 'shape', 'gemstone', 'like', 'createdAt', 'updatedAt'],
            include: {
                as: 'pc',
                model: db.productsCategory,
                nested: true,
                required: true,
                flat: true,
                attributes: ['mainCategoryId', 'subCategoryId'],
                where: {
                    mainCategoryId,
                    subCategoryId
                },
            }
        }).catch((err) => {
            return err;
        })
    }

    return products;
}
