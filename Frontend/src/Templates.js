var fs = require("fs");
var ejs = require("ejs");

exports.miniRecipe = ejs.compile(fs.readFileSync("./Frontend/templates/miniRecipe.ejs","utf8"));
exports.ingredient = ejs.compile(fs.readFileSync("./Frontend/templates/ingredient.ejs","utf8"));
exports.category = ejs.compile(fs.readFileSync("./Frontend/templates/category.ejs","utf8"));