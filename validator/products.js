const {body, query, param} = require('express-validator');

const hasValidBody = [
    body('brandId').isAscii(),
    body('name').isString(),
    body('shipInfo').isIn(['TODAY', 'NORMAL']),
    body('price').isInt({min:1}),
    body('discountPercent').isInt({min:0, max:100}),
    body('discountAmount').isInt({min:0}),
    body('color').isIn(['WHITE', 'BLACK']),
    body('baseMetal').isIn(['GOLD', 'SILVER']),
    body('shape').isIn(['RING', 'NECKLACE']),
    body('gemstone').isIn(['DIAMOND', 'PERL', 'NATURAL']),
    body('mainCategoryId').isInt({min:1}),
    body('subCategoryId').isInt({min:1})
]

const hasValidCategoryIds = [
    query('mainCategoryId').isInt({min:1}),
    query('subCategoryId').isInt({min:1}),
    query('pageIndex').isInt({min:1}),
    query('offset').isInt({min:1}),
]

const hasValidProductId = [
    param('productId').isInt({min:1})
]

const hasValidProductDetail = [
    body('id').isInt({min: 1}),
    body('brandId').optional().isString(),
    body('name').optional().isString(),
    body('shipInfo').optional().isIn(['TODAY', 'NORMAL']),
    body('price').optional().isInt({min:1}),
    body('discountPercent').optional().isInt({min:1}),
    body('discountAmount').optional().isInt({min:1}),
    body('color').optional().isIn(['WHITE', 'BLACK']),
    body('baseMetal').optional().isIn(['GOLD', 'SILVER']),
    body('shape').optional().isIn(['RING', 'NECKLACE']),
    body('gemstone').optional().isIn(['DIAMOND', 'PERL', 'NATURAL']),
    body('like').optional().isInt({min: 1}),
]

module.exports = {
    hasValidBody,
    hasValidCategoryIds,
    hasValidProductId,
    hasValidProductDetail
}
