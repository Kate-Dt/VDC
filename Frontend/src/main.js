
$(function () {
    console.log("X3");
    var MainPageAnimations =  require("./MainPageAnimations");
    var RecipesMenu = require("./RecipesMenu");
    var SignIn = require("./SignIn");

    SignIn.initClient();
    RecipesMenu.initRecipesMenu();
    MainPageAnimations.initAnimations();
}); 
