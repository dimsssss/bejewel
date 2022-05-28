const createNewProuct = async (db, data) => {
    const result = await db.products.addNewProduct(db, data);
    return result;
}

const findProductForCategory = async (db, data) => {
    const productModel = db.products;
    const [productList, pageCount] = await productModel.findAllProductsUsingCategories(db, data);
    const {pageIndex, offset} = data;
    return {
        productList,
        pageCount,
        pageIndex,
        offset
    }
}

const splitProductIdAndProeductInformation = (data) => {
    const productInformation = Object.entries(data).filter((element) => {
        const [key, value] = element;
        return key !== 'id';
    })
    return [Object.fromEntries(productInformation), Number(data.id)];
}

module.exports = {
    createNewProuct,
    findProductForCategory,
    splitProductIdAndProeductInformation
}
