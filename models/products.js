module.exports = (sequelize, DataTypes) => {
    const getFindAllProductsUsingCategoriesOption = (data) => {
        const {mainCategoryId, subCategoryId, offset} = data;
        const selectOption = {
            include: {
                as: 'p',
                model: products,
                attributes: [],
                required: true,
                raw: true
            },
        }
        const attributes = [
            'productId',
            'mainCategoryId',
            'subCategoryId',
            [sequelize.col('p.brandId'), 'brandId'],
            [sequelize.col('p.name'), 'name'],
            [sequelize.col('p.shipInfo'),'shipInfo'],
            [sequelize.col('p.price'), 'price'],
            [sequelize.col('p.discountPercent'), 'discountPercent'],
            [sequelize.col('p.like'), 'like'],
            [sequelize.col('p.createdAt'), 'createdAt'],
            [sequelize.col('p.updatedAt'), 'updatedAt']
        ]
        const where = {
            mainCategoryId,
            subCategoryId
        }
        return (start) => {
            if (start === undefined) {
                return selectOption
            }
            return {
                ...selectOption,
                raw: true,
                nest: false,
                attributes,
                where,
                offset: start,
                limit: start + Number(offset)
            }
        }
    }

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

    products.addNewProduct = async (db, data) => {
        const filterProductData = (data) => {
            const filteredData = Object.entries(data).filter((element) => {
                const [key, value] = element;
                return key !== 'mainCategoryId' && key !== 'subCategoryId'
            })
            return Object.fromEntries(filteredData);
        }

        const setCategoryData = (data, productId) => {
            return {
                productId,
                mainCategoryId: data.mainCategoryId,
                subCategoryId: data.subCategoryId
            }
        }

        return await db.sequelize.transaction(async (t) => {
            const productCategoryModel = db.productsCategory;

            const productData = filterProductData(data);
            const product = await products.create(productData, {transaction: t});

            const categoryData = setCategoryData(data, product.get('id'));
            await productCategoryModel.create(categoryData, {transaction: t});

            return product.get({plain: true});
        }).catch((err) => {
            return err;
        })
    }

    products.findAllProductsUsingCategories = async (db, data) => {
        const getOption = getFindAllProductsUsingCategoriesOption(data);
        const {getPageCount, getPageStartLocation} = require('../utils/page');
        const {pageIndex, offset} = data;

        const result = await db.sequelize.transaction(async (t) => {
            const totalCount = await db.productsCategory.count({...getOption(), transaction: t});
            const pageCount = getPageCount(totalCount, Number(offset));
            const start = getPageStartLocation(Number(pageIndex), Number(offset));
            const productList = await db.productsCategory.findAll({...getOption(start)})
            .catch((err) => {
                return err;
            })
            return [productList, pageCount];
        })
        return result;
    }

    products.getProductDetailByProductId = async (productId) => {
        return await products.findByPk(productId);
    }

    products.updateProductInformation = async (data, productId) => {
        const result = await products.update(data, {where: {id: productId}}).catch((err) => {
            return err;
        })
        return result;
    }

    products.deleteProductByProductId = async (productsCategory, productId) => {
        return await sequelize.transaction(async (t) => {
            await productsCategory.destroy({where: {productId}, transaction: t}).catch((err) => {
                return err
            });
            return await products.destroy({where: {id: productId}, transaction: t}).catch((err) => {
                return err
            });
        }).catch((err) => {
            return err;
        })
    }

    return products;
}
