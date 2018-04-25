function getSelectedFilters() {
    result = [];
    $("#listCategories").find("div.ingredient").forEach(function (i) {
        if($(i).find("checkbox:checked").count()>0){

            result.push({ingredient: $(i).find(".ingredient").text(), amount: $(i).find(".number").getValue()});
        }
    })
}



$("btn.btnFind").onclick(function(){
    console.log(getSelectedFilters());
    console.log("Those are selected filters");
})