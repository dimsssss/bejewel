describe("카테고리 통합 테스트", () => {
    const db = require('../../models/index');
    const {registerNewCategories} = require('../../services/categoryService');

    it('카테고리들이 저장되어야 한다', async function () {
        const inputData = require('./category.json').createNewCategory.inputData;
        const result = await registerNewCategories(db, inputData);

        expect(result.mainCategory.id).toBeGreaterThan(0);
        expect(result.mainCategory.name).toEqual(inputData.mainCategoryName);
        expect(result.subCategory.id).toBeGreaterThan(0);
        expect(result.subCategory.name).toEqual(inputData.subCategoryName);
    });
})