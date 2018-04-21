var API = require("./API");
var RecipesList;
var curPage;
var numOfPages;
var onePageNum = 20;
var filter;
var sort;

function showRecipesList(list,page){
}

function initRecipesMenu(){
    RecipesList = API.getRecipesList(function(err,server_data){
        if(err) {
            alert("Unable to get Recipes List!");
            return callback(err);
        }
        RecipesList = server_data;
        curPage = 0;
        numOfPages = RecipesList.length/onePageNum;
        showRecipesList(RecipesList);
    });
}
exports.initRecipesMenu = initRecipesMenu;