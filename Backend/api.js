var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://SheduleTelegramBot:Password1!@scheduleusers-shard-00-00-1k8ex.mongodb.net:27017"
var testRecipesList = require("./data/TestRecipesList");

exports.getRecipesList = function(req,res){
    var query = req.query;
    var result = testRecipesList.slice();
    for(var i = 0; i < result.length; i++)
        result[i].relevance = 0;
    if(query && query.name && query.name.length>0){
        var words = query.name.toLowerCase().split(" ");
        for(var i = 0; i < result.length; i++){
            var name = result[i].name.toLowerCase();
            for(var j = 0; j < words.length; j++){
                if(name.indexOf(words[j])>=0)
                    result[i].relevance += words[j].length/name.length;
            }
            if(result[i].relevance<=0)
                result.splice(i--,1);
        }
    }
    //console.log(result);
    res.send(result);
    /*MongoClient.connect(url, function(err,db){
        if(err) throw err;
        var dbo = db.db("vdc");

    });*/
};