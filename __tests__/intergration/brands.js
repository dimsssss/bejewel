describe('브랜드 통합테스트', () => {
    const db = require('../../models/index');
    const {createNewBrand} = require('../../services/brandsService');

    it('브랜드가 생성되어야 한다.', async function () {
        const inputData = require('./brands.json').createNewBrand.inputData;
        const result = await createNewBrand(db.brands, inputData);

        expect(result.id).toEqual(inputData.id);
    });
})