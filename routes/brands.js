const express = require('express');
const router = express.Router();
const { validateCreateBrandBody, checkValidationResult } = require('../validator/brands')
const { createBrand } = require('../controllers/brands')

router.post('/', validateCreateBrandBody, checkValidationResult, async (req, res, next) => {
    return await createBrand(req, res, next);
});

module.exports = router;
