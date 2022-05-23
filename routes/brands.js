const express = require('express');
const router = express.Router();
const { hasValidBrandId, checkValidationResult } = require('../validator/brands')
const { createBrand } = require('../controllers/brands')

router.post('/', hasValidBrandId, checkValidationResult, createBrand);

module.exports = router;
