

const createNewProuct = async (db, data) => {
    const result = await db.products.addNewProduct(db, data);
    return result;
}

const findProductForCategory = async (db, data) => {
    const productModel = db.products;
    const {mainCategoryId, subCategoryId} = data;

    const products = await productModel.findAllProductsUsingCategories(db, mainCategoryId, subCategoryId);
    return products.map((product) => {
        return product.get({plain: true})
    })
}

module.exports = {
    createNewProuct,
    findProductForCategory
}
