const {validationResult} = require("express-validator");
const {StatusCodes} = require("http-status-codes");

const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: errors.array()});
    }
    next();
}

module.exports = {
    checkValidationResult
}