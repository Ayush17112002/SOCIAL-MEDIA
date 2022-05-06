const express = require('express');
const routes = require('./routes/index.js');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static());

//assigning the router to be used 
app.use('/',routes);

app.set('view engine','ejs');
app.set('views', path.join(__dirname,"views"));





app.listen(port,function(err){
    if(err) console.log(`Error in running the the Server: ${err}`);
    else{
        console.log(`Server is running at port: ${port}`);
    }
});