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