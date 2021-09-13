const express = require('express');
const app = express();
const db = require('./src/models/sequlizeDb.js')


// setup the Express middlware
require('./src/services/middleware.service.js')(app);


// setup the api
app.use('/api/v1',require('./src/routes/route.v1.js'))




// set port, listen for requests
const PORT = process.env.PORT || 3001;


// sync sequelize
db.sequelize.sync({
  logging: false
}).then(() => {
  app.listen(PORT, () => {
    console.log(db)
    console.log(`Server is running on port ${PORT}.`);
  });
}).catch((error) => {
    console.error('ERROR - Unable to connect to the database:', err);
});







// var config = {
//     server: '127.0.0.1', //server: 'RAMINHBB-PC\\RAMINHBB_SQL2017',
//     database: 'EmployeeSystem',
//     user: 'sa',
//     password: 'who',
//     port: 1433,
//     options: {
//         encrypt: true,
//         trustServerCertificate: true
//     }
// };


// app.post('/create',(req,res) => {

//     sql.connect(config, function (err) {
    
//         if (err) {
//             console.log(err);
//             return 0;
//         }
            
//         // create Request object
//         var request = new sql.Request();
//         request.input("name",sql.VarChar,req.body.name)   
//         request.input("age",sql.Int,req.body.age)   
//         request.input("country",sql.VarChar,req.body.country)   
//         request.input("position",sql.VarChar,req.body.position)   
//         request.input("wage",sql.Int,req.body.wage)   


//         let SQLMessage = 'INSERT INTO Tbl_employee(name,age,country,position,wage)values(@name,@age,@country,@position,@wage)';

//         request.query(SQLMessage).then(function (err, result){
//             res.json("value inserted");
//         }).catch( function(err){
//             console.log(err);
//         });

//     });

// })

// app.get('/employees',(req,res) => {

//     sql.connect(config, function (err) {
    
//         if (err) {
//             console.log(err);
//             return 0;
//         }
            
//         // create Request object
//         var request = new sql.Request();
//         let SQLMessage = 'SELECT * FROM Tbl_employee';

//         request.query(SQLMessage, function (err, result){
//             console.log(result);
//             res.send(result);
//         });

//     });

// })

