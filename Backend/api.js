exports.getRecipesList = function(req,res){
    var query = req.query;
    res.send([query,query]);
};