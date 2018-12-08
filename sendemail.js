
const nodemailer = require('nodemailer');

const sendEmail = function(options, data, res, callback){
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
        if (error) handleError(error,res);        
        callback(response);
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

module.exports = sendEmail;