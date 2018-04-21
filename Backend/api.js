var testPizzaList = require("./data/TestRecipesList");
exports.getRecipesList = function(req,res){
    var query = req.query;
    res.send(testPizzaList);
};