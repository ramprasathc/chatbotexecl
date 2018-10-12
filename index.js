const pg = require('pg');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const XLSX = require('xlsx');

const config = {
    user: 'mvurcmhguiswwo',
    database: 'dea0q0vpb3s6rg',
    host: 'ec2-54-227-243-210.compute-1.amazonaws.com',
    password: '15e0fc883769a385a54e06cc51d7bd84754f7971d1929a7b87f63d365b456f62',
    port: 5432,
    ssl: true,
    sslfactory: 'org.postgresql.ssl.NonValidatingFactory'
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);
app.post('/excel', (req, res, next) => {
            var id = JSON.stringify(req.body);
            if (req.body.queryResult.action == "helper-excel")
            //    if ('helper-excel' == "helper-excel")
            {
                var project_name = req.body.queryResult.parameters.project_name;
                var helper_details = req.body.queryResult.parameters.helper_details;
                var Period_Quarter = req.body.queryResult.parameters.Period_Quarter;
                var owners = req.body.queryResult.parameters.owners;
                var PeriodHashMap = new Map([
                    ['Quarter1', 'April18-May18-Jun18'],
                    ['Quarter2', 'Jul18-Aug18-Sep18'],
                    ['Quarter3', 'Oct18-Nov18-Dec18'],
                    ['Quarter4', 'Jan19-Feb19-Mar19'],
                    ['Jan', 'Jan19'],
                    ['Feb', 'Feb19'],
                    ['Mar', 'Mar19'],
                    ['Apr', 'April18'],
                    ['May', 'May18'],
                    ['Jun', 'Jun18'],
                    ['Jul', 'Jul18'],
                    ['Aug', 'Aug18'],
                    ['Sep', 'Sep18'],
                    ['Oct', 'Oct18'],
                    ['Nov', 'Nov18'],
                    ['Dec', 'Dec18'],
                ]);
                //var project_name  = 'Trafigura';
                //var  owners = 'Sujat';
                //var  helper_details= 'Projection';
                //var Period_Quarter = 'Jan';
                console.log(project_name + '-' + helper_details + '-' + Period_Quarter + '-' + owners);
                var workbook = XLSX.readFile('Table_details.xlsx')
                var sheet_name_list = workbook.SheetNames;
                 var periods = PeriodHashMap.get(Period_Quarter);

                var periodArray = [];
                if (periods.search('-') != (-1)) {
                    periodArray = periods.split('-');
                }
                else {
                    periodArray = periods.split('-');
                }

                if (helper_details === "HeadCount") {

                    var HeadCountData = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]], { raw: true }));
                    var sumValueOwnPrj = 0;
                    var sumValueOwnOPrj = 0;
                    var sumValueOOwnOPrj = 0;
                    var sumValue;
                    var actualValue;
                    if (owners.length === 0) {
                        actualValue = project_name + ' Project ';
                    }
                    else {
                        actualValue = owners + "'s " + project_name + ' Project ';

                    }
                    for (var i = 0; i < HeadCountData.length; i++) {
                        var row = JSON.parse(JSON.stringify(HeadCountData[i]));
                        console.log(row.ProjectName);

                        if (row.Owner === owners) {

                            if (row.ProjectName === project_name) {
                                for (var j = 0; j < periodArray.length; j++) {
                                    console.log('Proj - ' + row.Owner + ' - ' + periodArray[j] + ' - ' + row[periodArray[j]]);
                                    sumValueOwnPrj = Number(sumValueOwnPrj) + Number(row[periodArray[j]]);
                                }
                            }
                            else {
                                for (var j = 0; j < periodArray.length; j++) {
                                    console.log('Proj - ' + row.Owner + ' - ' + periodArray[j] + ' - ' + row[periodArray[j]]);
                                    sumValueOwnOPrj = Number(sumValueOwnOPrj) + Number(row[periodArray[j]]);
                                }
                            }
                        }
                        else {

                            if(row.ProjectName === project_name)
                  {
                     for(var j =0; j<periodArray.length;j++){
                           console.log('Proj - '+row.Owner+' - '+periodArray[j] +' - '+row[periodArray[j]] );
                             sumValueOwnPrj = Number(sumValueOwnPrj)+ Number(row[periodArray[j]]);
                       }             
                  }
                  else
                  {
                     for(var j =0; j<periodArray.length;j++){
                          console.log('Proj - '+row.Owner+' - '+periodArray[j] +' - '+row[periodArray[j]] );
                             sumValueOwnOPrj = Number(sumValueOwnOPrj)+ Number(row[periodArray[j]]);
                       } 
                  }


                        }

                    }
                       sumValue =sumValueOwnPrj+' - '+sumValueOwnOPrj+' - '+sumValueOOwnOPrj;
                      console.log(sumValue);

                     var resultText = actualValue + helper_details + ' for this ' + Period_Quarter + ' is ' + sumValueOwnPrj;
                        console.log(resultText);

                        res.json({
                            fulfillmentText: resultText,
                            fulfillmentMessages: [{
                                "text": {
                                    "text": [
                                        resultText
                                    ]
                                }
                            }],
                            source: 'chatbottest'
                        });

                }
                    else {



                        var data = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { raw: true }));
                        var sumValueOwnPrj = 0;
                        var sumValueOwnOPrj = 0;
                        var sumValueOOwnOPrj = 0;
                        var sumValue;
                        var actualValue;
                        if (owners.length === 0) {
                            actualValue = project_name + ' Project ';
                        }
                        else {
                            actualValue = owners + "'s " + project_name + ' Project ';

                        }
                        for (var i = 0; i < data.length; i++) {
                            var row = JSON.parse(JSON.stringify(data[i]));
                            console.log(row.ProjectName);

                            if (row.Owner === owners) {

                                if (row.ProjectName === project_name) {
                                    for (var j = 0; j < periodArray.length; j++) {
                                        console.log('Proj - ' + row.Owner + ' - ' + periodArray[j] + ' - ' + row[periodArray[j]]);
                                        sumValueOwnPrj = Number(sumValueOwnPrj) + Number(row[periodArray[j]]);
                                    }
                                }
                                else {
                                    for (var j = 0; j < periodArray.length; j++) {
                                        console.log('Proj - ' + row.Owner + ' - ' + periodArray[j] + ' - ' + row[periodArray[j]]);
                                        sumValueOwnOPrj = Number(sumValueOwnOPrj) + Number(row[periodArray[j]]);
                                    }
                                }
                            }
                            else {

                                if(row.ProjectName === project_name)
                  {
                     for(var j =0; j<periodArray.length;j++){
                           console.log('Proj - '+row.Owner+' - '+periodArray[j] +' - '+row[periodArray[j]] );
                             sumValueOwnPrj = Number(sumValueOwnPrj)+ Number(row[periodArray[j]]);
                       }             
                  }
                  else
                  {
                     for(var j =0; j<periodArray.length;j++){
                          console.log('Proj - '+row.Owner+' - '+periodArray[j] +' - '+row[periodArray[j]] );
                             sumValueOwnOPrj = Number(sumValueOwnOPrj)+ Number(row[periodArray[j]]);
                       } 
                  }


                            }

                        }

                        var resultText = actualValue + helper_details + ' for this ' + Period_Quarter + ' is ' + sumValueOwnPrj;
                        console.log(resultText);

                        res.json({
                            fulfillmentText: resultText,
                            fulfillmentMessages: [{
                                "text": {
                                    "text": [
                                        resultText
                                    ]
                                }
                            }],
                            source: 'chatbottest'
                        });


                    }
                }


            }); app.post('/login', (req, res, next) => {
            console.log('Start');


            var id = JSON.stringify(req.body);
            if (req.body.queryResult.action == "login-user") {
                var username = req.body.queryResult.parameters.user_name;
                var sqlquery = "SELECT user_name FROM master_login where user_name ='" + username + "';";

                console.log(sqlquery);
                pool.connect(function(err, client, done) {
                    if (err) {
                        console.log("Can not connect to the DB" + err);
                    }
                    client.query(sqlquery, function(err, result) {
                        done();
                        if (err) {
                            console.log(err);
                            res.status(400).send(err);
                        }
                        else {
                            console.log(result);
                            if (result.rowCount > 0) {
                                res.json({
                                    fulfillmentText: 'Login Reponse',
                                    fulfillmentMessages: [{
                                        "text": {
                                            "text": [
                                                "Please enter your 6  Digit PIN to authenticate"
                                            ]
                                        }
                                    }],
                                    source: 'chatbottest'
                                });
                            }
                            else {
                                res.json({
                                    fulfillmentText: 'Login Reponse',
                                    fulfillmentMessages: [{
                                        "text": {
                                            "text": [
                                                "Kindly check your username entered"
                                            ]
                                        }
                                    }],
                                    source: 'chatbottest'
                                });
                            }

                        }
                    });
                });
            }
            else if (req.body.queryResult.action == "login-user-authenticate") {
                var param = req.body.queryResult.outputContexts[0];
                console.log(param);
                var username = param.user_name;
                console.log(username);
                var password = req.body.queryResult.parameters.pass_word;
                if (password.length = 6) {
                    var sqlquery = "SELECT user_name FROM master_login where user_name ='" + username + "' and password = '" + password + "';";
                    console.log(sqlquery);
                    pool.connect(function(err, client, done) {
                        if (err) {
                            console.log("Can not connect to the DB" + err);
                        }
                        client.query(sqlquery, function(err, result) {
                            done();
                            if (err) {
                                console.log(err);
                                res.status(400).send(err);
                            }
                            else {
                                res.json({
                                    fulfillmentText: 'Authentication Reponse',
                                    fulfillmentMessages: [{ "text": { "text": ["Your Connected To Mignon Successfully, How Can I help you?"] } }],
                                    source: 'chatbottest'
                                });
                            }
                        });
                    });
                }
                else {
                    res.json({
                        fulfillmentText: 'Authentication Fallback Reponse',
                        fulfillmentMessages: [{ "text": { "text": ["Incorrect Pin , Kindly check and Re-Enter your 6 Digit PIN"] } }],
                        source: 'chatbottest'
                    });

                }

            }
            else {
                res.json({
                    fulfillmentText: 'fallback Reponse',
                    fulfillmentMessages: [{ "text": { "text": [req.body.queryResult.fulfillmentText] } }],
                    source: 'chatbottest'
                });
            }

        }); app.set('port', (process.env.PORT || 5000)); app.listen(app.get('port'));

