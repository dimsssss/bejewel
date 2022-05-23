module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            brandId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'brands',
                    key: 'id',
                }
            },
            name: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            shipInfo: {
                type: Sequelize.DataTypes.ENUM,
                values: ['TODAY', 'NORMAL'],
                defaultValue: 'TODAY'
            },
            price: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            discountPercent: {
                type: Sequelize.DataTypes.INTEGER
            },
            discountAmount: {
                type: Sequelize.DataTypes.INTEGER
            },
            color: {
                type: Sequelize.DataTypes.ENUM,
                values: ['WHITE', 'BLACK'],
                defaultValue: 'WHITE'
            },
            baseMetal: {
                type: Sequelize.DataTypes.ENUM,
                values: ['GOLD', 'SILVER'],
                defaultValue: 'GOLD'
            },
            shape: {
                type: Sequelize.DataTypes.ENUM,
                values: ['RING', 'NECKLACE'],
                defaultValue: 'RING'
            },
            gemstone: {
                type: Sequelize.DataTypes.ENUM,
                values: ['DIAMOND', 'PERL', 'NATURAL'],
                defaultValue: 'NATURAL'
            },
            like: {
                type: Sequelize.DataTypes.INTEGER
            },
            createdAt: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updatedAt: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
                allowNull: false,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('products');
    }
};
