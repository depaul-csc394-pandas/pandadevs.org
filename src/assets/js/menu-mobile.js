(function($) {
	'use strict';
/*===================================*
		MENU MOBILE JS
/*===================================*/
/*$(function() {
  function slideMenu() {
    var activeState = $("#menu_mobile").hasClass("active");
    $("#menu_mobile").animate(
      {
        left: activeState ? "0%" : "-100%"
      },
      400
    );
  }
  $(".menu_bar").click(function(event) {
    event.stopPropagation();
    $(".bt-menu").toggleClass("open");
    $("#menu_mobile").toggleClass("active");
	  $("#overlay").toggleClass("overlay");
    slideMenu();
  });
	  $('.dropdown-toggle').click(function(){
		$('.dropdown-menu').slideToggle();
	});
	$('.nav-link').click(function(){
		var $target = $('.navbar-collapse');
		if($target.hasClass('active')){
			$target.removeClass('active');
            $target.animate({
				left: '-100%'
			});
       $(".bt-menu").removeClass("open");
		   $("#overlay").removeClass("overlay");
		}
	});			 
}); */
})(jQuery); 
