$(function () {
    var MainPageAnimations =  require("./MainPageAnimations");
    var RecipesMenu = require("./RecipesMenu");
    var SignIn = require("./SignIn");
    var easyPaginate = require("./jquery.easyPaginate");
    var paginateHelper = require("./paginateHelper");
    var CategoriesMenu = require("./CategoriesMenu");

    SignIn.initClient();
    CategoriesMenu.initCategoriesMenu();
    RecipesMenu.initRecipesMenu();
    MainPageAnimations.initAnimations();
}); 
