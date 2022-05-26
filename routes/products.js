const express = require('express');
const router = express.Router();
const { hasValidBody, hasValidCategoryIds, hasValidProductId } = require('../validator/products');
const { checkValidationResult } = require('../validator/validationResultWrapper');
const { createProductAndProductCategory, getProductsForCategory, getProductDetail } = require('../controllers/productsController');

router.post('/', hasValidBody, checkValidationResult, createProductAndProductCategory);
router.get('/', hasValidCategoryIds, checkValidationResult, getProductsForCategory);
router.get('/:productId', hasValidProductId, checkValidationResult, getProductDetail);

module.exports = router;
