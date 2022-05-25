const {body, query} = require('express-validator');

const hasValidBody = [
    body('brandId').isAscii(),
    body('name').isString(),
    body('shipInfo').isIn(['TODAY', 'NORMAL']),
    body('price').isInt({min:1}),
    body('discountPercent').isInt({min:0, max:100}),
    body('discountAmount').isInt({min:0}),
    body('color').isString(),
    body('baseMetal').isIn(['GOLD', 'SILVER']),
    body('shape').isIn(['RING', 'NECKLACE']),
    body('gemstone').isIn(['DIAMOND', 'PERL', 'NATURAL']),
    body('mainCategoryId').isInt({min:1}),
    body('subCategoryId').isInt({min:1})
]

const hasValidCategoryIds = [
    query('mainCategoryId').isInt({min:1}),
    query('subCategoryId').isInt({min:1}),
]

module.exports = {
    hasValidBody,
    hasValidCategoryIds
}
