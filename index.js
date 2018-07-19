const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'mvurcmhguiswwo',
    database: 'dea0q0vpb3s6rg',
    host:'ec2-54-227-243-210.compute-1.amazonaws.com',
    password: '15e0fc883769a385a54e06cc51d7bd84754f7971d1929a7b87f63d365b456f62',
    port: 5432,
    ssl:true,
    sslfactory:'org.postgresql.ssl.NonValidatingFactory'
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.post('/login', (req, res, next) => {
     //   if (req.body.queryResult.parameters == "login")
    if(true)
        {
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
                res.json({
                    fulfillmentText : 'Default Reponse',
                    fulfillmentMessages :[{"text":{"text":[req.body.queryResult.parameters]}}],
                    source :'chatbottest'
                });
                   // res.status(200).send(result.rows);
           });
           });
      }
    else
        {
            res.json({
                    fulfillmentText : 'Default Reponse',
                    fulfillmentMessages :[{"text":{"text":['chatbot']}}],
                    source :'chatbottest'
                });
        }
});
app.set( 'port', (process.env.PORT || 5000 ));
app.listen(app.get('port'));
