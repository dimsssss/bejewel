describe('상품 통합테스트', () => {
    const db = require('../../models/index');
    const {createNewProuct} = require('../../services/productsService');

    it('상품 정보와 상품 카테고리 정보가 저장되어야 한다', async function () {
        const inputData = {
            "brandId": "bejewel",
            "name": "목걸이",
            "shipInfo": "TODAY",
            "price": 10000,
            "discountPercent": 2,
            "discountAmount": 1000,
            "color": "WHITE",
            "baseMetal": "GOLD",
            "shape": "RING",
            "gemstone": "DIAMOND",
            "mainCategoryId": 1,
            "subCategoryId": 1
        }

        const result = await createNewProuct(db, inputData);

        expect(result.id).toBeGreaterThan(0);
        expect(result.name).toString('목걸이');
        expect(result.shipInfo).toString('TODAY');
        expect(result.price).toEqual(10000);
        expect(result.discountPercent).toEqual(2);
        expect(result.discountAmount).toEqual(1000);
        expect(result.color).toEqual('WHITE');
        expect(result.baseMetal).toEqual('GOLD');
        expect(result.shape).toEqual('RING');
        expect(result.gemstone).toEqual('DIAMOND');

        const resultSet = await db.productsCategory.findOne({
            where: {
                productId: result.id,
                mainCategoryId: inputData.mainCategoryId,
                subCategoryId: inputData.subCategoryId
            }
        })

        const productsCategoryResult = resultSet.get({plain:true});

        expect(productsCategoryResult).not.toBeUndefined();
        expect(productsCategoryResult.id).toBeGreaterThan(0);
        expect(productsCategoryResult.productId).toEqual(result.id);
        expect(productsCategoryResult.mainCategoryId).toEqual(inputData.mainCategoryId);
        expect(productsCategoryResult.subCategoryId).toEqual(inputData.subCategoryId);
    });
})