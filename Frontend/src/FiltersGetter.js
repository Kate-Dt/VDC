function getSelectedFilters() {
    result = [];
    $("#listCategories").find("div.ingredient").forEach(function (i) {
        if($(i).find("checkbox:checked")){
            result.push({ingredient: $(i).find(".ingredient"), amount: $(i).find(".number").getValue()});
        }
    })
}