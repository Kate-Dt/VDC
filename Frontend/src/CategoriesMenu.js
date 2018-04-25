var API = require("./API");
var Templates = require("./Templates");
var $listCategories = $("#listCategories");
var categoriesList;

function initCategoriesMenu(){
    $('.choose-ingredient-block').on('submit', function(e){
        e.preventDefault();
        var value = ($(this).serialize());
        console.log(value);
    });
    categories = API.getCategoriesList(function(data,respond){
        if(!data||!respond) {
            alert("Unable to get Recipes List!");
            return callback(data);
        }
        categoriesList = data;
        showCategoriesList(categoriesList);
    });
}

function  showCategoriesList(categories) {
    $listCategories.empty();
    for(var category in categories){
        var html_category = Templates.category({category:category});
        var $node = $(html_category);
        for(var i = 0; i < categories[category].length; i++){
            //console.log((categories[category])[i]);
            var html_ingredient = Templates.ingredient({ingredient:(categories[category])[i]});
            $node.find(".dropdown-container").append($(html_ingredient));

        }
        $listCategories.append($node);
        var dropdown = document.getElementsByClassName("dropdown-btn");
        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
                //$('body').scrollTo(dropdown[i]);
            });
        }
    }
}

exports.initCategoriesMenu = initCategoriesMenu;