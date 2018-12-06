require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const nodemailer = require('nodemailer');



// Avoid CORS problems
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, DELETE, OPTIONS")
    next();
});



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/cv'));

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

client.connect((error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    }

    console.log('Database connected')

    const db = client.db('curriculum');
    
    app.get('/api/data',(req,res) => {                
        try{
            findDocuments(db,(docs) => {                
                res.send(docs);                
            });
        }catch(e){
            handleError(e,res);
        }    
    });

    /*
    curl -H "Content-Type: application/json" -X POST -d '{"firstname": "Javier", "lastname":"Sánchez","email":"jsanchez@portear.com","message":"Lorem ipsum","subject":"Contacto currículo Javier Sánchez"}'  "http://localhost:8080/contact-form"
    */

    app.post('/contact-form',(req,res) => {
        try{            
            sendEmail(smtpConfig,req.body,(result)=>{                
                res.send(result.message);
            });
        }catch(e){
            handleError(e,res);
        }
    });
   


    app.get('/*', function(req,res) {    
        res.sendFile(path.join(__dirname+'/dist/cv/index.html'));
    });    
    
    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);    
});

const sendEmail = function(options, data, callback){
    let transporter = nodemailer.createTransport(options);
    // setup e-mail data 
    var mailData = {
        from: options.auth.user, // sender address
        to: options.auth.user, // list of receivers
        subject: data.subject, // Subject line        
        html: data.message // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailData, function(error, response){
        if(error){
            callback(error);
        }else{                        
            callback("Message sent: " + response);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('projects');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      //assert.equal(err, null); 
      if (err) console.error(err);     
      callback(docs);
    });
  }


function handleError(err, response) {  
    response.status(500);  
    response.send(
      "<html><head><title>Internal Server Error!</title></head><body><pre>"
      + JSON.stringify(err, null, 2) + "</pre></body></pre>"
    );
  }