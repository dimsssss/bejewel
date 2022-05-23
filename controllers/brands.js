const {StatusCodes} = require('http-status-codes')

const createBrand = async (req, res, next) => {
    const model = req.app.get('db').brands;
    const brand = req.body;
    const result = await model.createBrand(brand);

    if (result.errors.length > 0) {
        const message = result.errors[0].message
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message});
    }
    return res.status(StatusCodes.CREATED).send(result.dataValues);
}

module.exports = {
    createBrand
}