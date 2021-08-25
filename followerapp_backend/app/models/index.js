const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const { dialect } = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        // deprecated:
        // operatorsAliases: false,
        // To stop giving SQL logs on console
        // logging: false,
        define: {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }   
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.follower_app_control = require("./follower_app_control.model.js")(sequelize, Sequelize);
module.exports = db;
