const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'postgres',
    database: 'booking_hotel',
    host:'localhost',
    password: 'postgres',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/login', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT * FROM master_login', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }

            res.status(200).send(result.rows);
       })
   })
});

app.listen(4000,'0.0.0.0', function () {
    console.log('Server is running.. on Port 4000');
});