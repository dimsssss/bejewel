const {registerNewCategories} = require('../services/categoryService');

const createNewCategories = async (req, res, next) => {
    const db = req.app.get('db');
    const categories = req.body;

    const result = await registerNewCategories(db, categories);

    if (result.hasOwnProperty('errors')) {
        return res.status(500).send(result.errors[0]);
    }

    return res.status(201).send(result);
}

module.exports = {
    createNewCategories
}
