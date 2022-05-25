const { body } = require('express-validator');

const hasValidBrandId = [
    body('id').isAscii()
]



module.exports = {
    hasValidBrandId
}