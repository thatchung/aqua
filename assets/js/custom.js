/*=========

Template Name: Misaru - Finance Consulting HTML Template

=========*/

/*=========
----- JS INDEX -----
1.Whole Script Strict Mode Syntax
2.WoW Js
3.Loader JS
4.Sticky Header JS
5.Toggle Menu Mobile JS
6.Scroll To Top JS
7.Banner Slider JS
8.Banner Content Slider JS
9.Partners Logo Slider JS
10.Testimonial Box Slider JS
11.Team Box Slider JS
12.If Mobile Slider JS
	(a)Submenu For Mobile JS
	(b)Case Slider For Mobile JS
	(c)Blog Slider For Mobile JS
13.Blog List Slider JS
=========*/

$(document).ready(function($) {

	// Whole Script Strict Mode Syntax
	"use strict";

	// Loader JS Start
	$(window).ready(function(){
		$('.loader-box').fadeOut();
		$('body').removeClass('fixed');
   });
	// Loader JS End

	// Wow Animation JS Start
	new WOW().init(); 
	// Wow Animation JS Start

    // Sticky Header JS Start
	$(window).on( 'scroll', function(){
		if ($(window).scrollTop() >= 100) {
		  $('.site-header').addClass('sticky-header');
		}
		 else {
		  $('.site-header').removeClass('sticky-header');
		}

		if ($(window).scrollTop() + window.innerHeight < $('.main-services').offset().top + 1900) {
			if(!$("#menu-1").hasClass("active")) {
				$(".menu>li.active").removeClass("active");
        		$("#menu-1").addClass("active");
			}
		}
		else if ($(window).scrollTop() + window.innerHeight < $('.main-case-studies').offset().top + 1600) {
			if(!$("#menu-2").hasClass("active")) {
				$(".menu>li.active").removeClass("active");
        		$("#menu-2").addClass("active");
			}
		}
		else if ($(window).scrollTop() + window.innerHeight < $('.main-testimonial').offset().top + 1200) {
			if(!$("#menu-3").hasClass("active")) {
				$(".menu>li.active").removeClass("active");
        		$("#menu-3").addClass("active");
			}
		}
		else if ($(window).scrollTop() + window.innerHeight < $('.main-team').offset().top + 1600) {
			if(!$("#menu-4").hasClass("active")) {
				$(".menu>li.active").removeClass("active");
        		$("#menu-4").addClass("active");
			}
		}
		else if ($(window).scrollTop() + window.innerHeight < $('.main-testimonial-s').offset().top + 1500) {
			if(!$("#menu-5").hasClass("active")) {
				$(".menu>li.active").removeClass("active");
        		$("#menu-5").addClass("active");
			}
		}
		else if ($(window).scrollTop() + window.innerHeight < $('.main-blog').offset().top + 1600) {
			if(!$("#menu-6").hasClass("active")) {
				$(".menu>li.active").removeClass("active");
        		$("#menu-6").addClass("active");
			}
		}
		else if ($(window).scrollTop() + window.innerHeight < $('.main-blog-s').offset().top + 1600) {
			if(!$("#menu-7").hasClass("active")) {
				$(".menu>li.active").removeClass("active");
        		$("#menu-7").addClass("active");
			}
		}
	  });
	  // Sticky Header JS End

	  // Toggle Menu Mobile JS Start
	$(".toggle-button").on( 'click', function(){
		$(".main-navigation").toggleClass('toggle-menu');
		$(".header-menu .black-shadow").fadeToggle();
	});
	$(".main-navigation ul li a").on( 'click', function(){
		$(".main-navigation").removeClass('toggle-menu');
		$(".header-menu .black-shadow").fadeOut();
	});
	$(".main-navigation ul li.sub-items>a").on( 'click', function(){
		$(".main-navigation").addClass('toggle-menu');
		$(".header-menu .black-shadow").stop();
	});
	$(".header-menu .black-shadow").on( 'click', function(){
		$(this).fadeOut();
		$(".main-navigation").removeClass('toggle-menu');
	});
	// Toogle Menu Mobile JS End

	// Scroll To Top JS Start
	$('#scroll-to-top').on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });
	$(window).on( 'scroll', function() {
	  if ($(window).scrollTop() > 300) {
	    $("#scroll-to-top").fadeIn(500);
	  } else {
	    $("#scroll-to-top").fadeOut(500);
	  }
	});

	
	// Scroll To Top JS End

    // Banner Slider JS Start
	// $('.banner-slider').slick({
 //        infinite: true,
 //        slidesToShow: 1,
 //        slidesToScroll: 1,
 //        prevArrow: '<button class="slick-arrow prev-arrow"><i class="fa fa-arrow-left" aria-hidden="true"></i></i></button>',
	//   	nextArrow: '<button class="slick-arrow next-arrow"><i class="fa fa-arrow-right" aria-hidden="true"></i></i></button>',
	//     arrows: false,
 //        dots: false,
 //        autoplay: true,
 //        autoplaySpeed: 5000,	
 //        speed: 1000,
 //        fade: true,
 //        cssEase: 'linear',
 //        lazyLoad: 'progressive',
	// 	asNavFor: '.banner-content-slider',
 //      });
      // Banner Slider JS End

	  // Banner Content Slider JS Start
	// $('.banner-content-slider').slick({
 //        infinite: true,
 //        slidesToShow: 1,
 //        slidesToScroll: 1,
 //        prevArrow: '<button class="slick-arrow prev-arrow for-mob"><i class="fa fa-chevron-left"></i></button>',
	//   	nextArrow: '<button class="slick-arrow next-arrow for-mob"><i class="fa fa-chevron-right"></i></button>',
	//   	arrows: true,
 //        dots: false,
 //        autoplay: true,
 //        autoplaySpeed: 5000,	
 //        speed: 1000,
 //        fade: true,
 //        cssEase: 'linear',
	// 	draggable: true,
	// 	lazyLoad: 'progressive',
	// 	asNavFor: '.banner-slider',
 //      });
      // Banner Content Slider JS End

	  // Partners Logo Slider Start JS
	  $('.partners-slider').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-arrow-team prev-arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
		nextArrow: '<button class="slick-arrow-team next-arrow"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
		  {
			  breakpoint: 1200,
			  settings: {
				  slidesToShow: 4,
			  }
		  },
		  {
			  breakpoint: 992,
			  settings: {
				  slidesToShow: 3
			  }
		  },
		  {
			  breakpoint: 768,
			  settings: {
				  slidesToShow: 2
			  }
		  }
	  ]
	  });
	  //Partners Logo Slider End JS

	  // Testimonial Box Slider JS Start

	$('.main-testimonial-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-arrow prev-arrow color-arrow"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button class="slick-arrow next-arrow color-arrow"><i class="fa fa-chevron-right"></i></button>',
		arrows: true,
		dots: false,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
		  {
			  breakpoint: 1200,
			  settings: {
				  slidesToShow: 3,
			  }
		  },
		  {
			  breakpoint: 992,
			  settings: {
				  slidesToShow: 1,
			  }
		  },
		  {
			  breakpoint: 768,
			  settings: {
				  slidesToShow: 1
			  }
		  },
		  {
			  breakpoint: 376,
			  settings: {
				  slidesToShow: 1
			  }
		  }
	  ]
	  });
  
	// Testimonial Box Slider JS End

	// Team Box Slider JS Start

	$('.main-team-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-arrow prev-arrow color-arrow"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button class="slick-arrow next-arrow color-arrow"><i class="fa fa-chevron-right"></i></button>',
		arrows: true,
		dots: false,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
		  {
			  breakpoint: 1200,
			  settings: {
				  slidesToShow: 3,
			  }
		  },
		  {
			  breakpoint: 992,
			  settings: {
				  slidesToShow: 2,
			  }
		  },
		  {
			  breakpoint: 768,
			  settings: {
				  slidesToShow: 1
			  }
		  },
		  {
			  breakpoint: 376,
			  settings: {
				  slidesToShow: 1
			  }
		  }
	  ]
	  });
  
	  // Team Box Slider JS End

	  // If Mobile Slider JS Start

	  if ($(window).width() < 992) {

		// Submenu For Mobile JS Start
		$('body').on('click', '.main-navigation ul li.sub-items>a', function() {
            if (($(this).parent().hasClass('active-sub-menu'))) {
            $(this).parent().removeClass('active-sub-menu');
            $(this).parent().find('ul').slideUp();
            } else {
                $(this).parent().addClass('active-sub-menu');
                $(this).parent().find('ul').slideDown();
            }
        });
		// Submenu For Mobile JS End

		// Case Slider For Mobile JS Start
	   $('.case-slider').slick({
		  infinite: true,
		  slidesToShow: 2,
		  slidesToScroll: 1,
		  prevArrow: '<button class="slick-arrow prev-arrow color-arrow"><i class="fa fa-chevron-left"></i></button>',
		  nextArrow: '<button class="slick-arrow next-arrow color-arrow"><i class="fa fa-chevron-right"></i></button>',
		  dots: false,
		  arrows: true,
		  autoplay: false,
	  	  autoplaySpeed: 2000,	
	  	  responsive: [
	  	  {
	  	  	breakpoint: 768,
	  	  	settings: {
	  	  		slidesToShow: 2
	  	  	}
	  	  },
	  	  {
	  	  	breakpoint: 576,
	  	  	settings: {
	  	  		slidesToShow: 1
	  	  	}
	  	  }
	      ]	
	   });
	   // Case  Slider For Mobile JS End

	   // Blog Slider For Mobile JS Start
	   $('.blog-slider').slick({
		  infinite: true,
		  slidesToShow: 2,
		  slidesToScroll: 1,
		  prevArrow: '<button class="slick-arrow prev-arrow color-arrow"><i class="fa fa-chevron-left"></i></button>',
		  nextArrow: '<button class="slick-arrow next-arrow color-arrow"><i class="fa fa-chevron-right"></i></button>',
		  dots: false,
		  arrows: true,
		  autoplay: true,
	  	  autoplaySpeed: 3000,	
	  	  responsive: [
	  	  {
	  	  	breakpoint: 992,
	  	  	settings: {
	  	  		slidesToShow: 2
	  	  	}
	  	  },
	  	  {
	  	  	breakpoint: 768,
	  	  	settings: {
	  	  		slidesToShow: 1
	  	  	}
	  	  }
	      ]	
	   });
	   // Blog Slider For Mobile JS End

	    // Simple Step For Mobile JS Start
		$('.step-slider').slick({
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			prevArrow: '<button class="slick-arrow prev-arrow color-arrow"><i class="fa fa-chevron-left"></i></button>',
			nextArrow: '<button class="slick-arrow next-arrow color-arrow"><i class="fa fa-chevron-right"></i></button>',
			dots: false,
			arrows: true,
			autoplay: true,
			  autoplaySpeed: 3000,	
			  responsive: [
			  {
				  breakpoint: 992,
				  settings: {
					  slidesToShow: 2
				  }
			  },
			  {
				  breakpoint: 768,
				  settings: {
					  slidesToShow: 1
				  }
			  }
			]	
		 });
		 // Blog Slider For Mobile JS End
	}

	// If Mobile Slider JS End

	// Blog List Slider JS Start
	$('.blog-list-img-slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-arrow prev-arrow color-arrow-blog"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button class="slick-arrow next-arrow color-arrow-blog"><i class="fa fa-chevron-right"></i></button>',
		dots: false,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
		  {
			  breakpoint: 768,
			  settings: {
				  slidesToShow: 1,
			  }
		  }
	  ]
	  });
	  // Blog List Slider JS End

	  
      
});