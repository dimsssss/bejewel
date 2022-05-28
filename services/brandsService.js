const createNewBrand = async (brands, brand) => {
    const result = await brands.createBrand(brand);
    return result;
}

module.exports = {
    createNewBrand
}
