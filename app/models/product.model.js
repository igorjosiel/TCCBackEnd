module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        barcode: {
            type: Sequelize.STRING
        },
    });

    return Product;
}