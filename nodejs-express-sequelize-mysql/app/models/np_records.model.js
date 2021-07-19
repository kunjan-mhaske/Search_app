module.exports = (sequelize, Sequelize) => {
    const NpRecords = sequelize.define("np_records", {
        //id: { type: Sequelize.INTEGER },
        np_name: { type: Sequelize.STRING },
        city: { type: Sequelize.STRING },
        state: { type: Sequelize.STRING },
        zip: { type: Sequelize.INTEGER },
        cause: { type: Sequelize.STRING },
        ethnic: { type: Sequelize.STRING },
        url_ctp: { type: Sequelize.STRING },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    } );
    return NpRecords;
    
};

