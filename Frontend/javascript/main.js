window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}
$(document).ready(function(){    
alert("Dd");
 $('.carousel[data-type="multi"] .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  for (var i=0;i<2;i++) {
    next=next.next();
    if (!next.length) {
    	next = $(this).siblings(':first');
  	}
    
    next.children(':first-child').clone().appendTo($(this));
  }
});
    $('.messageRegister').click(function () {

        $('.login-form').hide();
        $('.register-form').show();
    });


    $('.messageLogin').click(function () {

        $('.login-form').show();
        $('.register-form').hide();
    });

 

});


// https://stackoverflow.com/questions/9376192/add-icon-to-submit-button-in-twitter-bootstrap-2
// $("#myFavoriteFormSubmitButton").bind('click', function(event) {
//     $("#myFavoriteForm").submit();
// });

$(function(){
$(".sort-recipies-options").children("li").hover(
function(){
$(this).css("background-color", "#c0c0c0");},
function(){
$(this).css("background-color", "#FFF");
});
}); 
