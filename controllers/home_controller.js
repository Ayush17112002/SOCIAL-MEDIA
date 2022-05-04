//actions 
const path = require('path');
module.exports.home = function(req,res){
    return res.render('home',{
        title:"home"
    });
}