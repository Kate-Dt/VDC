var fs = require("fs");
var ejs = require("ejs");

exports.miniRecipe = ejs.compile(fs.readFileSync("./Frontend/templates/miniRecipe.ejs","utf8"));