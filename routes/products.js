const express = require('express');
const router = express.Router();
const { hasValidBody } = require('../validator/products');
const { checkValidationResult } = require('../validator/validationResultWrapper');
const { createProductAndProductCategory } = require('../controllers/productsController');

router.post('/', hasValidBody, checkValidationResult, createProductAndProductCategory);

module.exports = router;
