var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://SheduleTelegramBot:Password1!@scheduleusers-shard-00-00-1k8ex.mongodb.net:27017,scheduleusers-shard-00-01-1k8ex.mongodb.net:27017,scheduleusers-shard-00-02-1k8ex.mongodb.net:27017/VDC?ssl=true&replicaSet=ScheduleUsers-shard-0&authSource=admin');//, { useMongoClient: true });
//console.log("db: ", db);
db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback() {
    console.log("Connected to DB!");

    var recipeSchema = Schema({
        id: Number,
        name: String,
        time: Number,
        image: String,
        ingredients: [{descriptions: [String], amount: Number, unit: String, labels: [String]}],
        directions: [{step: Number, direction: String}],
        labels: [String],
        likes: Number,
        dislikes: Number,
        calories: Number
    }, {collection: 'recipes'});

    var recipeModel = mongoose.model('recipeModel', recipeSchema);

    function query(q) {
        return recipeModel.find(q);
    }

    //console.log(recipeSchema, '\n\n\n\n\n');

    //console.log(db.find(recipeSchema({id:7405})));
    //console.log('RECIPE', db.collection('recipes').find({id:7405}));

    //var queries = [{ingredient: "ten", amount: 60}, {ingredient: "fifty", amount: 300}];
    //q = formQuery(queries, 6);

    //for (var qi in q)
    //for (var qj in qi)
    //console.log(q[qi]);

    var q = [{ingredient: "pre pizza crust", amount: 1}, {
        ingredient: "mozzarella cheese",
        amount: 200
    }, {ingredient: "pizza sauce", amount: 400}];
    qry = createQuery(q, 3);
    console.log(qry["$nor"][0]['ingredients']['$elemMatch']['ingredient'])
    //console.log(qry["$nor"][1]['ingredients']['$elemMatch']['amount'])//[0]["ingredients"]);

    recipeModel.find(qry, function (err, res) {

        if (err) {
            console.log(err);
            return;
        }

        console.log("Filtered");//, res);
        for (var r in res)
            console.log(res[r]);

        //console.log("RECIPE -", res);
        //console.log(res.get("ingredients")[0]);
    });


    recipeModel.find({
        '$nor': [{ingredients: {'$elemMatch': {ingredient: {'$nin': ["pre pizza crust", "mozzarella cheese", "pizza sauce"]}}}}]
    }, function (err, res) {

        if (err) {
            console.log(err);
            return;
        }
        //console.log("Filtered");
        //for (var r in res)
            //console.log(res[r]);

        //console.log("RECIPE -", res);
        //console.log(res.get("ingredients")[0]);
    });

    db.collection("VDC.recipes", function (err, collection) {
        console.log("\n\n\nVDC\n\n");
        console.log(collection.find({}))
    });
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