const express = require('express');
const router = express.Router();
const { hasValidBody, hasValidCategoryIds } = require('../validator/products');
const { checkValidationResult } = require('../validator/validationResultWrapper');
const { createProductAndProductCategory, getProductsForCategory } = require('../controllers/productsController');

router.post('/', hasValidBody, checkValidationResult, createProductAndProductCategory);
router.get('/', hasValidCategoryIds, checkValidationResult, getProductsForCategory);


module.exports = router;
