
$(function () {
    console.log("X3");
    var MainPageAnimations =  require("./MainPageAnimations");
    var RecipesMenu = require("./RecipesMenu");

    RecipesMenu.initRecipesMenu();
    MainPageAnimations.initAnimations();
}); 
