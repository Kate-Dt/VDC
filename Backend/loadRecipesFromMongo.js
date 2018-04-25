var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://SheduleTelegramBot:Password1!@scheduleusers-shard-00-00-1k8ex.mongodb.net:27017,scheduleusers-shard-00-01-1k8ex.mongodb.net:27017,scheduleusers-shard-00-02-1k8ex.mongodb.net:27017/VDC?ssl=true&replicaSet=ScheduleUsers-shard-0&authSource=admin');

db.on('error', function (err) {
    console.log('connection error:', err.message);
});

db.once('open', function(){
    console.log('Connected to MongoDB!');
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

function getCategories() {
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
        //console.log(result);
    });
    return result;
}

exports.getCategories = getCategories;