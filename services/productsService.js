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

const createNewProuct = async (db, data) => {
    const productData = filterProductData(data);

    const result = await db.sequelize.transaction(async (t) => {
        const productModel = db.products;
        const productCategoryModel = db.productsCategory;

        const product = await productModel.create(productData, {transaction: t});

        const categoryData = setCategoryData(data, product.dataValues.id);

        const productCategory = await productCategoryModel.create(categoryData, {transaction: t});

        return product.dataValues;
    }).catch((err) => {
        return err;
    })
    return result;
}

module.exports = {
    createNewProuct
}
