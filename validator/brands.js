const { body, validationResult } = require('express-validator');
const {StatusCodes} = require("http-status-codes");

const hasValidBrandId = [
    body('id').isAscii()
]

const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: errors.array()});
    }
    next();
}

module.exports = {
    hasValidBrandId,
    checkValidationResult
}