module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("requests", {
        client: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Request;
}