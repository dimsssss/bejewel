const createNewProuct = async (db, data) => {
    const result = await db.products.addNewProduct(db, data);
    return result;
}

const findProductForCategory = async (db, data) => {
    const productModel = db.products;
    const [productList, pageCount] = await productModel.findAllProductsUsingCategories(db, data);
    const {pageIndex, offset} = data;
    const products = productList.map((product) => { return product.get({plain: true}) })
    return {
        products,
        pageCount,
        pageIndex,
        offset
    }
}

module.exports = {
    createNewProuct,
    findProductForCategory
}
