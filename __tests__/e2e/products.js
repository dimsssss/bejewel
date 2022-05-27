describe('products 통합테스트', () => {
    const request = require('supertest');
    const app = require('../../app');
    const db = require('../../models');

    app.set('db', db);

    it('상품 정보가 저장되어야 하고 저장된 정보를 body에 반환해야 한다 ', async function () {
        await request(app)
            .post('/products')
            .send({
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
            })
            .expect(201)
            .expect((res) => {
                const result = res.body;
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
            })
    });
})