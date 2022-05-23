module.exports = (sequelize, DataTypes) => {
    const brands = sequelize.define('brands', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        createdAt: {
            type: "TIMESTAMP",
            allowNull: true,
        },
        updatedAt: {
            type: "TIMESTAMP",
            allowNull: true
        },
    }, {
        freezeTableName: true
    });

    brands.createBrand = async (brand) => {
        const result = await brands.create(brand).catch((err) => {
            return err;
        })
        return result;
    }

    return brands;
}
