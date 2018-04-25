/*function getSelectedFilters() {
    result = [];
    $("#listCategories").find("div.ingredient").forEach(function (i) {
        if ($(i).find(".marker:checked").count() > 0) {
            result.push({ingredient: $(i).find(".ingredient").text(), amount: $(i).find(".number").getValue()});
        }
    })
}
*/
currentFilters = [];

function getSelectedFilters(){
    return currentFilters;
}

$("div.ingredient > .marker").change(function () {
    console.log(this);
    if (this.checked) {
        addIngredient($(this).parent.find('ingredient').text(), $(this).parent.find('input.number').val())
    }
    else{
        removeIngredient($(this).parent.find('ingredient').text());
    }
});

function addIngredient(ing, am) {
    if (am == undefined)
        am = 99999;
    currentFilters.push({ingredient: ing, amount: am});
}

function removeIngredient(ing) {
    for (var i = 0; i < currentFilters.length; ++i) {
        if (currentFilters[i].ingredient == ing) {
            currentFilters.splice(i, 1);
            --i;
        }
    }
}


$("btn.btnFind").onclick(function () {
    console.log(getSelectedFilters());
    console.log("Those are selected filters");
})