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

module.exports = {
    createProductAndProductCategory
}