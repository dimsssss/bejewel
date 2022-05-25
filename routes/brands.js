const express = require('express');
const router = express.Router();
const { hasValidBrandId } = require('../validator/brands')
const {checkValidationResult} = require('../validator/validationResultWrapper')
const { createBrand } = require('../controllers/brands')

router.post('/', hasValidBrandId, checkValidationResult, createBrand);

module.exports = router;
