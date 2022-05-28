const {StatusCodes} = require('http-status-codes')
const {createNewBrand} = require('../services/brandsService');

const createBrand = async (req, res, next) => {
    const model = req.app.get('db').brands;
    const brand = req.body;
    const result = await createNewBrand(model, brand);

    if (result.hasOwnProperty('errors')) {
        const message = result.errors[0].message
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message});
    }
    return res.status(StatusCodes.CREATED).send(result.dataValues);
}

module.exports = {
    createBrand
}