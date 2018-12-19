const functions = require('firebase-functions');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const sendEmail = require('./sendemail');


// Avoid CORS problems
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, DELETE, OPTIONS")
    next();
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const user =  process.env.USER_DB;
const password = process.env.PASS;
const host = process.env.HOST;
const port = process.env.DB_PORT;
const dbName = process.env.DB;

let smtpConfig = {
    host: process.env.SERVER_SMTP,
    port: process.env.PORT_SMTP,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
};


const url = `mongodb://${user}:${password}@${host}:${port}/${dbName}`;

const client = new MongoClient(url,{ useNewUrlParser: true });

exports.api = functions.https.onRequest((request, response) => {    
    
    //response.send("Hello from Firebase! " + request.path);
    client.connect((error) => {
        if (error) {
            console.error(error);
            return process.exit(1)
        }

        const db = client.db('curriculum');
        
        switch (request.path){
            case '/portfolio':                
                return findPortfolioDoc(db,(docs) => {                                    
                    response.send(docs);                
                });
            case '/experience':                
                return findExperienceDoc(db,(docs) => {                                    
                    response.send(docs);                
                });
            case '/education':                
                return findEducationDoc(db,(docs) => {                                    
                    response.send(docs);                
                });
            case '/about':                
                return findAboutDoc(db,(doc) => {                                    
                    response.send(doc);                
                });
            case '/contact-form':
                if (request.method === 'POST'){
                    sendEmail(smtpConfig,request.body,response,(result)=>{                                                  
                        response.status(200).send(result);
                    });   
                }
        }
    });


    
});

const findPortfolioDoc = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('projects');
    // Find some documents
    var cursor = collection.find({active: true});
    cursor.sort({order: 1});
    
    cursor.toArray(function(err, docs) {
      //assert.equal(err, null); 
      if (err) console.error(err);     
      callback(docs);
    });
  }

  const findExperienceDoc = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('experience');
    var cursor = collection.find({active: true});
    cursor.sort({order: 1});
    // Find some documents
    cursor.toArray(function(err, docs) {
      //assert.equal(err, null); 
      if (err) console.error(err);     
      callback(docs);
    });
  }

  const findAboutDoc = function(db, callback) {    
    const collection = db.collection('about');
    var cursor = collection.find({});        
    cursor.next(function(err, doc) {      
      if (err) console.error(err);     
      callback(doc);
    });
  }

  const findEducationDoc = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('education');
    var cursor = collection.find({active: true});
    cursor.sort({order: 1});
    // Find some documents
    cursor.toArray(function(err, docs) {
      //assert.equal(err, null); 
      if (err) console.error(err);     
      callback(docs);
    });
  }