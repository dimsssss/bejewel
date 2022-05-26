const productsService = require('../services/productsService');

const createProductAndProductCategory = async (req, res, next) => {
    const db = req.app.get('db');
    const data = req.body;
    const result = await productsService.createNewProuct(db, data);

    if (result.hasOwnProperty('errors')) {
        return res.status(500).send({message: result.errors})
    }

    return res.status(201).send(result);
}

const getProductsForCategory = async (req, res, next) => {
    const db = req.app.get('db');
    const data = req.query;

    const result = await productsService.findProductForCategory(db, data);

    if (result.hasOwnProperty('errors')) {
        return res.status(500).send({message: result.errors})
    }

    return res.status(200).send(result);
}

const getProductDetail = async (req, res, next) => {
    const db = req.app.get('db');
    const productId = Number(req.params['productId']);
    const result = await db.products.getProductDetailByProductId(productId);

    if (result.hasOwnProperty('errors')) {
        return res.status(500).send(result.errors[0]);
    }
    return res.status(200).send(result);
}

module.exports = {
    createProductAndProductCategory,
    getProductsForCategory,
    getProductDetail
}
