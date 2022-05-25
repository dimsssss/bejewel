const registerNewCategories = async (db, data) => {
    const mainCategoryName = data.mainCategoryName;
    const subCategoryName = data.subCategoryName

    const result = await db.sequelize.transaction(async (t) => {
        const mainCategoryModel = db.mainCategory;
        const subCategoryModel = db.subCategory;

        const mainCategory = await mainCategoryModel.create({name: mainCategoryName}, {transaction: t});
        const mainCategoryId = mainCategory.dataValues.id;
        const subCategory = await subCategoryModel.create({mainCategoryId, name: subCategoryName}, {transaction: t});

        return [mainCategory.dataValues, subCategory.dataValues]
    }).catch((err) => {
        return err;
    });

    return result;
}

module.exports = {
    registerNewCategories
}