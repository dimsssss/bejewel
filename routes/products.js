const express = require('express');
const router = express.Router();
const { hasValidBody, hasValidCategoryIds, hasValidProductId, hasValidProductDetail } = require('../validator/products');
const { checkValidationResult } = require('../validator/validationResultWrapper');
const { createProductAndProductCategory, getProductsForCategory, getProductDetail, updateProductDetail } = require('../controllers/productsController');

router.patch('/', hasValidProductDetail, checkValidationResult, updateProductDetail);
router.post('/', hasValidBody, checkValidationResult, createProductAndProductCategory);
router.get('/', hasValidCategoryIds, checkValidationResult, getProductsForCategory);
router.get('/:productId', hasValidProductId, checkValidationResult, getProductDetail);

module.exports = router;
