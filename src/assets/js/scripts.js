(function ($) {
	'use strict';

	/*===================================*
	01. LOADING JS
	/*===================================*/
	$(window).on('load', function () {
		var preLoder = $(".preloader");
		preLoder.delay(700).fadeOut(500);
	});

	/*===================================*
	02. SMOOTH SCROLLING JS
	*===================================*/
	// Select all links with hashes
	

	/*===================================*
	03. MENU JS
	*===================================*/
	//Main navigation scroll spy for shadow
	$(window).on("scroll", function () {
		menuJSTrigger()
	});
	
	$(window).on("resize", function () {
		menuJSTrigger()
	});

	//Hide Navbar Dropdown After Click On Links
	var navBar = $(".header_wrap");
	var navbarLinks = navBar.find(".navbar-collapse ul li a");

	$.each(navbarLinks, function (i, val) {

		var navbarLink = $(this);

		navbarLink.on('click', function () {
			navBar.find(".navbar-collapse").collapse('hide');
		});

	});

	//Main navigation Active Class Add Remove
	$('.navbar-toggler').on('click', function () {
		$("header").toggleClass("active");
	});


	/*===================================*
04. BACKGROUND ANIMATION JS
*===================================*/
	/*$(window).on('load', function() {
		$('.roadmap').owlCarousel({
	     loop: false,
	     margin: 30,
	     nav: true,
	     navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
	     responsive: {
	         0: {
	             items: 1,

	         },
	         380: {
	             items: 2,
	             margin: 15,
	         },
	         600: {
	             items: 3
	         },
	         1000: {
	             items: 5
	         },
	         1199: {
	             items: 5
	         }
	     }
	 });
	});*/

	/*===================================*
     05.COUNTDOWN JS
    *===================================*/
	$(window).on('load', function () {
		$('.tk_countdown_time').each(function () {
			var endTime = $(this).data('time');
			$(this).countdown(endTime, function (tm) {
				$(this).html(tm.strftime('<span class="counter_box"><span class="tk_counter days">%D </span><span class="tk_text">Days</span></span><span class="counter_box"><span class="tk_counter hours">%H</span><span class="tk_text">Hours</span></span><span class="counter_box"><span class="tk_counter minutes">%M</span><span class="tk_text">Minutes</span></span><span class="counter_box"><span class="tk_counter seconds">%S</span><span class="tk_text">Seconds</span></span>'));
			});
		});
	});

	/*===================================*
	06. CONTACT FORM JS
	*===================================*/
	$(window).on('load', function () {
		$("#submitButton").on("click", function (event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function (data) {
					if (data.type === "error") {
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
					} else {
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");
						$("#first-name").val("Enter Name");
						$("#email").val("Enter Email");
						$("#subject").val("Enter Subject");
						$("#description").val("Enter Message");

					}
					$("#alert-msg").html(data.msg);
					$("#alert-msg").show();
				},
				error: function (xhr, textStatus) {
					alert(textStatus);
				}
			});
		});
	});


	/*===================================*
	07. SCROLLUP JS
	*===================================*/
	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});

	$(".scrollup").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});


	/*===================================*
	08. POPUP JS
	*===================================*/
	$(window).on('load', function () {
		$('.content-popup').magnificPopup({
			type: 'inline',
			preloader: true,
			mainClass: 'mfp-zoom'
		});
	});

	/*===================================*
	09. ANIMATION JS
	*===================================*/
	$(function () {

		function ckScrollInit(items, trigger) {
			items.each(function () {
				var ckElement = $(this),
					AnimationClass = ckElement.attr('data-animation'),
					AnimationDelay = ckElement.attr('data-animation-delay');

				ckElement.css({
					'-webkit-animation-delay': AnimationDelay,
					'-moz-animation-delay': AnimationDelay,
					'animation-delay': AnimationDelay
				});

				var ckTrigger = (trigger) ? trigger : ckElement;

				ckTrigger.waypoint(function () {
					ckElement.addClass("animated").css("visibility", "visible");
					ckElement.addClass('animated').addClass(AnimationClass);
				}, {
						triggerOnce: true,
						offset: '90%'
					});
			});
		}

		ckScrollInit($('.animation'));
		ckScrollInit($('.staggered-animation'), $('.staggered-animation-wrap'));

	});

	/*===================================*
	10. SHOW HIDE PASSWORD
	*===================================*/

	$(".toggle-password").on('click', function () {

		$(this).toggleClass("ion-eye ion-eye-disabled");
		var input = $($(this).attr("data-toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

})(jQuery);

function menuJSTrigger() {
	var scroll = $(window).scrollTop();

	if (scroll >= 80) {
		$('header').addClass('nav-fixed');
		if ($(window).width() > 991) {
			$('#panel').addClass('panel-fixed');
		} else {
			$('#panel').removeClass('panel-fixed');
		}
	} else {
		$('header').removeClass('nav-fixed');
		$('#panel').removeClass('panel-fixed');
	}
}
