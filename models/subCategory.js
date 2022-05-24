module.exports = (sequelize, DataTypes) => {
    const subCategory = sequelize.define('sub_category', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        mainCategoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'main_category',
                key: 'id',
            }
        },
        name: {
            type: DataTypes.STRING,
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

    return subCategory;
}
