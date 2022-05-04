//actions 
module.exports.home = function(req,res){
    res.send(`<form action="/" method="post"><button type="submit">Submit</button></form>`);
}