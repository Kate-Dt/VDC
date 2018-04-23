$(function () {
    console.log("X3");
    var MainPageAnimations =  require("./MainPageAnimations");
    var RecipesMenu = require("./RecipesMenu");
    var SignIn = require("./SignIn");
    var easyPaginate = require("./jquery.easyPaginate");
    var paginateHelper = require("./paginateHelper");

    SignIn.initClient();
    RecipesMenu.initRecipesMenu();
    MainPageAnimations.initAnimations();
}); 
