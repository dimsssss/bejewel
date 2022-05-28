describe('상품 통합테스트', () => {
    const db = require('../../models/index');
    const {createNewProuct, findProductForCategory, } = require('../../services/productsService');

    it('카테고리 아이디에 맞는 상품들을 가져온다', async function () {
        // given
        await db.sequelize.transaction(async (t) => {
            const sampleData = require('./data.json').findByCategory.inputData;
            await db.brands.create({id:"bejewel"});
            const productsResultSet = await db.products.bulkCreate(sampleData, {transaction: t});
            const productCategorySample = productsResultSet.map((product) => {
                const productId = product.get({plain: true}).id;
                return {
                    productId,
                    mainCategoryId: 1,
                    subCategoryId: 1
                }
            })
            await db.mainCategory.create({name: 'test'}, {transaction: t});
            await db.subCategory.create({name: 'success'}, {transaction: t});
            // 상품 아이디와 카테고리아이디를 매칭
            await db.productsCategory.bulkCreate(productCategorySample, {transaction: t});
        })


        //when
        const result = await findProductForCategory(db, {
            mainCategoryId: 1,
            subCategoryId: 1,
            pageIndex: 1,
            offset: 5
        });
        // then
        const sampleData = require('./data.json').findByCategory.inputData;
        result.productList.forEach((product, index) => {
            expect(product.productId).toBeGreaterThan(0);
            expect(product.mainCategoryId).toEqual(sampleData[index].mainCategoryId);
            expect(product.subCategoryId).toEqual(sampleData[index].subCategoryId);
            expect(product.brandId).toEqual(sampleData[index].brandId);
            expect(product.name).toEqual(sampleData[index].name);
            expect(product.shipInfo).toEqual(sampleData[index].shipInfo);
            expect(product.price).toEqual(sampleData[index].price);
            expect(product.discountPercent).toEqual(sampleData[index].discountPercent);
            expect(product.like).toEqual(sampleData[index].like);
        })


        expect(result.pageIndex).toEqual(1);
        expect(result.offset).toEqual(5);
        expect(result.pageCount).toEqual(1);
    });

    it('상품과 상품_카테고리가 저장되어야 한다', async function () {
        const inputData = require('./data.json').createProduct.inputData;

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

        const productsCategoryResult = resultSet.get({plain: true});

        expect(productsCategoryResult).not.toBeUndefined();
        expect(productsCategoryResult.id).toBeGreaterThan(0);
        expect(productsCategoryResult.productId).toEqual(result.id);
        expect(productsCategoryResult.mainCategoryId).toEqual(inputData.mainCategoryId);
        expect(productsCategoryResult.subCategoryId).toEqual(inputData.subCategoryId);
    });

    it('상품 정보가 수정되어야 한다', async function () {
        const sampleData = require('./data.json').updateProduct;
        const productId = await db.sequelize.transaction(async (t) => {
            const createResultSet = await db.products.create(sampleData.inputData, {transaction: t});
            const result = createResultSet.get({plain:true});
            await db.products.update(sampleData.resultData, {where: {id:result.id}, transaction: t});
            return result.id;
        })

        const resultSet = await db.products.findOne({where: {id: productId}});

        expect(sampleData.resultData.name).toEqual(resultSet.dataValues.name);
        expect(sampleData.resultData.shipInfo).toEqual(resultSet.dataValues.shipInfo);
        expect(sampleData.resultData.price).toEqual(resultSet.dataValues.price);
        expect(sampleData.resultData.discountPercent).toEqual(resultSet.dataValues.discountPercent);
        expect(sampleData.resultData.discountAmount).toEqual(resultSet.dataValues.discountAmount);

    });

    it('상품 전체(상세) 정보를 가져온다', async function () {
        const inputData = require('./data.json').getProductDetail.inputData;
        const product = await db.products.create(inputData);

        const resultSet = await db.products.getProductDetailByProductId(product.dataValues.id);
        const result = resultSet.get({plain: true});

        for (const key in inputData) {
            expect(inputData[key]).toEqual(result[key]);
        }
    });

    it('특정 상품을 삭제한다', async function () {
        // given
        const inputData = require('./data.json').createProduct.inputData;
        const result = await createNewProuct(db, inputData);
        const productId = result.id;
        // when
        await db.products.deleteProductByProductId(db.productsCategory, productId);

        const productCatgory = await db.productsCategory.findAll({where: {productId}});
        const product = await db.products.findAll({where: {id: productId}});
        // then
        expect(productCatgory).toEqual([]);
        expect(product).toEqual([]);
    });
})