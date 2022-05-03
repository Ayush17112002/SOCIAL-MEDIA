const express = require('express');
const app = express();
const port = 3000;




app.listen(port,function(err){
    if(err) console.log(`Error in running the the Server: ${err}`);
    else{
        console.log(`Server is running at port: ${port}`);
    }
});