const pg        = require('pg');
const express   = require('express');
var bodyParser = require('body-parser');
const app       = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
    console.log('Start');
   
    var id = JSON.stringify(req.body);
    if (req.body.queryResult.action == "login-user")
    {
        var username = req.body.queryResult.parameters.user_name;
        console.log(username);
           pool.connect(function (err, client, done) {
           if (err) {
               console.log("Can not connect to the DB" + err);
           }
           client.query("SELECT count(*) FROM master_login where user_name ='"+username+"'", function (err, result) {
                done();
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
               else {
                   if(result>0)
                   {
                    res.json({
                        fulfillmentText : 'Login Reponse',
                        fulfillmentMessages :[
                            {
                                "text":{
                                    "text":[
                                        "Please enter your 6  Digit PIN to authenticate"
                                    ]
                                }
                            }
                        ],
                        source :'chatbottest'
                    });
                   }
                   else{
                    res.json({
                        fulfillmentText : 'Login Reponse',
                        fulfillmentMessages :[
                            {
                                "text":{
                                    "text":[
                                        "Kindly check your username entered"
                                    ]
                                }
                            }
                        ],
                        source :'chatbottest'
                    });
                   }
                  
              }
           });
           });
 }
     else if (req.body.queryResult.action == "input-login-auth")
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
               else {
                res.json({
                    fulfillmentText : 'Authentication Reponse',
                    fulfillmentMessages :[{"text":{"text":[req.body.queryResult.fulfillmentText]}}],
                    source :'chatbottest'
                });  
              }
           });
           });
 }
    else
        {
            res.json({
                    fulfillmentText : 'fallback Reponse',
                    fulfillmentMessages :[{"text":{"text":[req.body.queryResult.fulfillmentText]}}],
                    source :'chatbottest'
                });
        }
    
});
app.set( 'port', (process.env.PORT || 5000 ));
app.listen(app.get('port'));
