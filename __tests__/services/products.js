describe('상품 서비스 테스트', () => {
    const productService = require('../../services/productsService');

    it('클라이언트에서 넘어온 데이터를 상품 아이디와 그외 수정할 정보로 나눈다', () => {
        const clientInput = {
            "id": 1,
            "brandId": "bejewel",
            "name": "순금목걸이",
            "shipInfo": "TODAY",
            "price": 20000,
            "discountPercent": 1,
            "discountAmount": 1000,
            "color": "WHITE",
            "baseMetal": "GOLD",
            "shape": "RING",
            "gemstone": "DIAMOND",
            "like": null
        }

        const productResult = {
            "brandId": "bejewel",
            "name": "순금목걸이",
            "shipInfo": "TODAY",
            "price": 20000,
            "discountPercent": 1,
            "discountAmount": 1000,
            "color": "WHITE",
            "baseMetal": "GOLD",
            "shape": "RING",
            "gemstone": "DIAMOND",
            "like": null
        }

        const productIdResult = 1;

        const [productInformation, productId] = productService.splitProductIdAndProeductInformation(clientInput);
        expect(productInformation).toEqual(productResult);
        expect(productId).toEqual(productIdResult);
        expect(typeof productId).toEqual('number');
    })
});