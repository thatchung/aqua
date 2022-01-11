/*==========

Template Name: Misaru - Finance Consulting HTML Template

==========*/

/*==========
----- JS INDEX -----
1.Whole Script Strict Mode Syntax
2.About Us Counting JS
==========*/



$(document).ready(function($) {

	// Whole Script Strict Mode Syntax
	"use strict";

	var a = 0;
	var b = 0;
	$(window).on('scroll', function() {
	// About Us Counting JS Start
		var oTop = $('#counter').offset().top - window.innerHeight;
		if (a === 0 && $(window).scrollTop() > oTop) {
			$('.counting-data').each(function() {
			  var $this = $(this),
			      countTo = $this.attr('data-count');
			  
			  $({ countNum: $this.text()}).animate({
			    countNum: countTo
			  },

			  {

			    duration: 2000,
			    easing:'linear',
			    step: function() {
			      $this.text(numberWithCommas(Math.floor(this.countNum)));
			    },
			    complete: function() {
			      $this.text(numberWithCommas(this.countNum));
			    }

			  });  
			  
			});
		a = 1;
	  	}
	// About Us Counting JS End

	});

	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") ;
	}

});