module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1qaz!QAZ",
    DB: "onlinegym",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };