const express = require('express');
const router = express.Router();
const { hasValidCategoryNames } = require('../validator/category');
const { checkValidationResult } = require('../validator/validationResultWrapper');
const { createNewCategories } = require('../controllers/category');

router.post('/', hasValidCategoryNames, checkValidationResult, createNewCategories);

module.exports = router;
