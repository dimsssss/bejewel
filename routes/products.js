const express = require('express');
const router = express.Router();
const { hasValidBody, hasValidCategoryIds, hasValidProductId, hasValidProductDetail } = require('../validator/products');
const { checkValidationResult } = require('../validator/validationResultWrapper');
const { createProductAndProductCategory, getProductsForCategory, getProductDetail, updateProductDetail, deleteProduct} = require('../controllers/productsController');

router.patch('/', hasValidProductDetail, checkValidationResult, updateProductDetail);
router.post('/', hasValidBody, checkValidationResult, createProductAndProductCategory);
router.get('/', hasValidCategoryIds, checkValidationResult, getProductsForCategory);
router.get('/:productId', hasValidProductId, checkValidationResult, getProductDetail);
router.delete('/:productId', hasValidProductId, checkValidationResult, deleteProduct);

module.exports = router;
