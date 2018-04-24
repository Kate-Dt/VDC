var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;
mongoose.connect('mongodb://SheduleTelegramBot:Password1!@scheduleusers-shard-00-00-1k8ex.mongodb.net:27017,scheduleusers-shard-00-01-1k8ex.mongodb.net:27017,scheduleusers-shard-00-02-1k8ex.mongodb.net:27017/VDC?ssl=true&replicaSet=ScheduleUsers-shard-0&authSource=admin');
var testRecipesList = require("./data/TestRecipesList");
db.once('open', function(){
    console.log('Connected to MongoDB!');
});
db.on('error', function (err) {
    console.log('connection error:', err.message);
});
var recipeSchema = Schema({
    id: Number,
    name: String,
    time: Number,
    image: String,
    ingredients: [{descriptions: [String], amount: Number, unit: String, labels: [String], ingredient: String}],
    directions: [{step: Number, direction: String}],
    labels: [String],
    likes: Number,
    dislikes: Number,
    calories: Number
}, {collection: 'recipes'});
var recipeModel = mongoose.model('recipeModel', recipeSchema);

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
    res.send(result);
};

exports.getCategoriesList = function(req, res) {
    /*var result = {
        "dairy": [],
        "fat and vitamins": [],
        "cheese": [],
        "meat": [],
        "poultry": [],
        "fish": [],
        "seafood": [],
        "main protein": [],
        "fruit": [],
        "vegetable": [],
        "spice or herb": [],
        "sauce": [],
        "condiment": [],
        "soup": [],
        "alcoholic": [],
        "spicy": [],
        "nut": [],
        "cooking liquid": [],
        "cooking fat": [],
        "baking ingredient": [],
        "sugar": [],
        "grain": [],
        "pasta": [],
        "drink": [],
        "wrapped meal": [],
        "pasta dish": [],
        "vegetable dish": [],
        "recipe extra": [],
        "flavoring": [],
        "mixture": [],
        "fastener": [],
        "adhesive": [],
        "container": []
    };*/

    var result = [];

    recipeModel.find({}, function (err, res) {
        if (err) {
            console.log(err.message);
            return;
        }
        res.forEach(function (recipe) {
            recipe.ingredients.forEach(function (ingr) {
                ingr.labels.forEach(function (category) {
                    if (!(result.includes(category)))
                        result.push(category);
                    if (!(result[category].includes(ingr['ingredient'])))
                        result[category].push(ingr['ingredient']);
                })
            })
        });
        console.log(result);
    });
    return result;
};