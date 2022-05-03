const express = require('express');
const routes = require('./routes/index.js');
const app = express();
const port = 3000;


//assigning the router to be used 
app.use('/',routes);










app.listen(port,function(err){
    if(err) console.log(`Error in running the the Server: ${err}`);
    else{
        console.log(`Server is running at port: ${port}`);
    }
});