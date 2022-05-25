module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sub_category', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            mainCategoryId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'main_category',
                    key: 'id',
                }
            },
            name: {
                type: Sequelize.DataTypes.STRING
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
        }, {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('sub_category');
    }
};
