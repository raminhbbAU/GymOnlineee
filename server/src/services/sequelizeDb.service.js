const Sequelize = require("sequelize");
const dbConfig = require('../config/db.config.js')
const initModels = require('../models/init-models.js')


class sequelizeDb {

    constructor(){
        this.initialization();
    }


    async initialization(){
        try {
            
            console.log("db initialization");
            
            this.sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
                host: dbConfig.HOST,
                dialect: dbConfig.dialect,
                operatorsAliases: false,
              
                pool: {
                  max: dbConfig.pool.max,
                  min: dbConfig.pool.min,
                  acquire: dbConfig.pool.acquire,
                  idle: dbConfig.pool.idle
                }
              });

            
              console.log("Initial models");
              this.models = initModels(this.sequelize);        


              this.sequelize.authenticate()
              .then( ()=> {
                console.info('Connection has been established successfully.');

                console.log("Sync sequelize");
                this.sequelize.sync({
                    logging:true
                });
  
              })
              .catch( (error) => {
                  console.error('ERROR - Unable to connect to the database:', err);
              })
              
       
        } catch (error) {
            console.log(error);
        }
    }

}


class Singleton {
    constructor() {
        if (!Singleton.instance){
            Singleton.instance = new sequelizeDb();
        }
    }

    getInstance(){
        return Singleton.instance;
    }

}

module.exports = Singleton