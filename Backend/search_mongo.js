var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://SheduleTelegramBot:Password1!@scheduleusers-shard-00-00-1k8ex.mongodb.net:27017,scheduleusers-shard-00-01-1k8ex.mongodb.net:27017,scheduleusers-shard-00-02-1k8ex.mongodb.net:27017/VDC?ssl=true&replicaSet=ScheduleUsers-shard-0&authSource=admin');
db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback() {
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

    function query(ingredients, servingsNum, f) {
        return recipeModel.find(createQuery(ingredients, servingsNum), f);
    }

    exports.queryRecipes = query;

});


//@args
//ingredients - List of objects with @fields
//  ingredient - name of the ingredient
//  amount - amount of ingredient
//servingsNum - number of servings
//
//@return object, passable to recipeModel.find() as query
function createQuery(ingredients, servingsNum) {
    res = [];
    ings = [];
    for (var ing in ingredients) {
        var i = ingredients[ing];
        ings.push(i.ingredient);

        res.push({
            ingredients: {
                $elemMatch: {
                    ingredient: i.ingredient,
                    amount: {$gte: Number(i.amount / servingsNum)}
                }
            }
        });

    }
    res.splice(0, 0, {ingredients: {$elemMatch: {'ingredient': {$nin: ings}}}});
    return {$nor: res};
}