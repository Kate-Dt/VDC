(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const API_URL = "http://localhost:8080";

function backendGet(url, data, callback) {
    console.log("X3");
    $.getJSON(url,data,callback);
}

function backendPost(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getRecipesList = function(request, callback) {
    console.log("X3");
    backendGet(API_URL+"/api/get-recipes-list/",request, callback);
};
},{}],2:[function(require,module,exports){
function initAnimations(){
    window.onload=function(){

        $('.dropdown-menu').click(function(event){
            event.stopPropagation();
        });//for dropdown not to close on click

        // $('#savedRecipesHtml').load('savedRecipes.html',function(){
//    $('body').trigger('savedReady');});//load from another html


        $('.buttonGeneralFiltersMenu li').click(function(){ //for filters change name
            var updatedHtml = $(this).html()+ "<span class='caret'></span>";
            $('.buttonGeneralFilters').html(updatedHtml);
            $('.buttonGeneralFilters').attr("data-toggle","dropdown");
        });

    };

    function topFunction(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    };
}

exports.initAnimations = initAnimations;
},{}],3:[function(require,module,exports){
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
},{"./API":1}],4:[function(require,module,exports){

$(function () {
    console.log("X3");
    var MainPageAnimations =  require("./MainPageAnimations");
    var RecipesMenu = require("./RecipesMenu");

    RecipesMenu.initRecipesMenu();
    MainPageAnimations.initAnimations();
}); 

},{"./MainPageAnimations":2,"./RecipesMenu":3}]},{},[4]);
