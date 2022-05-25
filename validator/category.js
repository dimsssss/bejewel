const {body} = require('express-validator');

const hasValidCategoryNames = [
    body('mainCategoryName').isAscii(),
    body('subCategoryName').isAscii(),
]

module.exports = {
    hasValidCategoryNames,
}
