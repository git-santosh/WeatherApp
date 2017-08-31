const express = require('express');
const path = require('path');
const Layouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config({path:'.env'});
mongoose.connect(process.env.dbURL);
mongoose.Promise = global.Promise;
mongoose.connection.on('error',(err) =>{
   console.log(`mongoDB Error :  ${err.message} \n Please start mongoDB server `);
});

//view engine set-up 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(Layouts);
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.set('port',process.env.PORT || 3000);

let siteName =   'Accurate Weather';

app.use((req,res,next)=>{
    res.locals.siteName = siteName;
    res.locals.watherURL = process.env.watherURL;
    res.locals.APPID = process.env.APPID;
    next();
})
//route define
const index = require('./routes/index');

app.use('/',index);

//catch 404 and forward to error handle
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


//Error Handler
app.use((error,req,res,next) =>{
    
    res.locals.message = error.message;
    res.locals.status = error.status;
    res.locals.error = app.get('env') === 'development' ? error : {};
    // render the error page
    res.status(error.status || 500);
    res.render('errors');
});

app.listen(app.get('port'),function(){
    console.log('Listening on port :'+app.get('port'));
})