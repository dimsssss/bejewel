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

const updateProductDetail = async (req, res, next) => {
    if (Object.keys(req.body).length <= 1) {
        return res.status(400).send({message: 'good'})
    }

    const db = req.app.get('db');
    const [productInfomation, id] = productsService.splitProductIdAndProeductInformation(req.body);
    const result = await db.products.updateProductInformation(productInfomation, id);

    if (result.hasOwnProperty('errors')) {
        return res.status(500).send({errors: result.errors[0]});
    }

    return res.status(200).send(result);
}

const deleteProduct = async (req, res, next) => {
    const products = req.app.get('db').products;
    const productsCategory = req.app.get('db').productsCategory;
    const productId = Number(req.params['productId']);
    const result = products.deleteProductByProductId(productsCategory, productId);

    if (result.hasOwnProperty('errors')) {
        return res.status(500).send({errors: result.errors[0]});
    }

    return res.status(200).send(result);
}

module.exports = {
    createProductAndProductCategory,
    getProductsForCategory,
    getProductDetail,
    updateProductDetail,
    deleteProduct
}
