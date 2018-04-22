var API = require("./API");
var Templates = require("./Templates");
var $recipes_list = $("#recipes_list");
var RecipesList;
var curPage;
var numOfPages;
var onePageNum = 20;
var filter;
var sort;

function initRecipesMenu(){
    $('#search-by-name-form').on('submit', function(e){
        e.preventDefault();
        var value = ($(this).serialize());
        console.log(value);
        findRecipesList(value);
    });
    findRecipesList();
}

function findRecipesList(request){
    RecipesList = API.getRecipesList(request,function(data,respond){
        if(!data||!respond) {
            alert("Unable to get Recipes List!");
            return callback(data);
        }
        RecipesList = data;
        console.log(RecipesList);
        curPage = 1;
        numOfPages = RecipesList.length/onePageNum + (RecipesList.length%onePageNum)?0:1;
        showRecipesList(RecipesList);
    });
}

function showRecipesList(list,page){
    $recipes_list.empty();
    var first = (curPage-1)*onePageNum;
    var last = curPage*onePageNum;
    for(var i = first; i < last && i < list.length; i++){
        showOneRecipe(list[i]);
    }
}

function showOneRecipe(recipe){
    var html_code = Templates.miniRecipe({recipe:recipe});
    var $node = $(html_code);
    $recipes_list.append($node);
}

exports.initRecipesMenu = initRecipesMenu;