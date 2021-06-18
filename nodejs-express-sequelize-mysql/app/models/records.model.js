module.exports = (sequelize, Sequelize) => {
    const Records = sequelize.define("records", {
        // school_id: { type: Sequelize.INTEGER },
        URL_CtP: { type: Sequelize.STRING },
        School_Name: { type: Sequelize.STRING },
        City: { type: Sequelize.STRING },
        State: { type: Sequelize.STRING },
        Zip: { type: Sequelize.INTEGER },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    } );
    return Records;
    
};