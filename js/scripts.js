(function ($) {
	"use strict";

	/*----------  Preloader  ----------*/
	$(window).on('load', function() {
		$('.loader').fadeOut();
		$('.page-loader').delay(350).fadeOut('slow');
	});

	/*==========  Responsive Navigation  ==========*/
	$('.main-nav').children().clone().appendTo('.responsive-nav');
	$('.responsive-menu-open').on('click', function(event) {
		event.preventDefault();
		$('body').addClass('no-scroll');
		$('.responsive-menu').addClass('open');
		return false;
	});
	$('.responsive-menu-close').on('click', function(event) {
		event.preventDefault();
		$('body').removeClass('no-scroll');
		$('.responsive-menu').removeClass('open');
		return false;
	});
	$('.responsive-nav li').each(function(index) {
		if ($(this).find('ul').length) {
			var text = $(this).find('> a').text();
			var id = text.replace(/\s+/g, '-').toLowerCase();
			$(this).find('> a').attr('href', '#collapse-' + id);
			$(this).find('> a').attr('data-toggle', 'collapse');
			$(this).find('> a').append('<i class="fa fa-angle-down"></i>');
			$(this).find('> ul').attr('id', 'collapse-' + id);
			$(this).find('> ul').addClass('collapse');
		}
	});
	$('.responsive-nav a').on('click', function() {
		if ($(this).parent().hasClass('collapse-active')) {
			$(this).parent().removeClass('collapse-active');
		} else {
			$(this).parent().addClass('collapse-active');
		}
	});
	if ($(window).width() > 768) {
		var follow_width = $('.header .bottom .follow').width();
		$('.header .bottom .contacts').css('margin-left', follow_width);
	}
	$('.header').headroom({
		offset: 200
	});

	/*==========  Video Gallery  ==========*/
	$('.video-gallery .video').on('mouseover', function() {
		$('.video-gallery .active').removeClass('active');
		$(this).addClass('active');
	});
	$('.videoPopup').nivoLightbox();
	$('.popup').nivoLightbox();

	/*==========  Team  ==========*/
	if ($(window).width() > 1200) {
		var teamWidth = $('.team').width();
		$('.team .member img').each(function(index) {
			$(this).width(teamWidth/4 - 30)
		});
	}
	$('.team .member').on('mouseover', function() {
		$('.team .active').removeClass('active');
		$(this).addClass('active');
	});

	/*==========  Testimonials  ==========*/
	var testimonials = $('.testimonials');
	if (!testimonials.hasClass('vertical')) {
		if ($(window).width() > 1200) {
			var testimonialHeight = $('.testimonials').height();
			$('.testimonials').height(testimonialHeight);
			$('.testimonials .item').css('margin-top', (testimonialHeight - 110) / 2);
		}
		$(window).resize(function() {
			if ($(window).width() > 1200) {
				var testimonialHeight = $('.testimonials').height();
				$('.testimonials').height(testimonialHeight);
				$('.testimonials .item').css('margin-top', (testimonialHeight - 110) / 2);
			}
		});
		$('.testimonials .item').on('mouseover', function() {
			$('.testimonials .active').removeClass('active');
			$(this).addClass('active');
		});
	}

	/*==========  Accordion  ==========*/
	$('.panel-heading a').on('click', function() {
		if ($(this).parents('.panel-heading').hasClass('active')) {
			$('.panel-heading').removeClass('active');
		} else {
			$('.panel-heading').removeClass('active');
			$(this).parents('.panel-heading').addClass('active');
		}
	});

	/*==========  Portfolio Vertical Slider  ==========*/
	var prevFlag = false;
	$('.portfolio-vertical-slider').on('prev.owl.carousel', function(event) {
		prevFlag = true;
	});
	$('.portfolio-vertical-slider').on('initialized.owl.carousel changed.owl.carousel', function(event) {
		var owlItems = event.item.count;
		var item = event.item.index;
		var calcItem = Math.floor(item - (owlItems / 2) + 1);

		if (prevFlag) {
			if (calcItem === 0) {
				calcItem = owlItems;
			}
		}

		if (prevFlag === false && calcItem === 0 || calcItem > owlItems) {
			calcItem = 1;
		}

		$('.portfolio-vertical-slider-meta .current').text(calcItem);
		$('.portfolio-vertical-slider-meta .total').text(event.item.count);

		prevFlag = false;
	});
	$('.portfolio-vertical-slider').owlCarousel({
		loop:true,
		nav:true,
		dots: false,
		navText: ['<i class="fa fa-caret-left"></i>Prev Post','Next Post<i class="fa fa-caret-right"></i>'],
		items: 1
	});
	$('.portfolio-vertical-slider.owl-theme .owl-nav .owl-next').on('click', function() {
		$('.portfolio-vertical-slider').trigger('next.owl.carousel');
	});
	$('.portfolio-vertical-slider.owl-theme .owl-nav .owl-prev').on('click', function() {
		$('.portfolio-vertical-slider').trigger('prev.owl.carousel');
	});

	/*==========  Client Slider  ==========*/
	$('.client-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-caret-left"></i>','<i class="fa fa-caret-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 3
			},
			1200: {
				items: 5
			}
		}
	});

	/*==========  Service Slider  ==========*/
	if ($(window).width() > 1200) {
		$('.service-row').owlCarousel({
			loop: true,
			nav: false,
			dots: false,
			center: true,
			items: 3
		});
	}
	$('.service-row-wrapper .owl-next').on('click', function() {
		$('.service-row').trigger('next.owl.carousel');
	});
	$('.service-row-wrapper .owl-prev').on('click', function() {
		$('.service-row').trigger('prev.owl.carousel');
	});

	/*==========  Blog Post Slider  ==========*/
	$('.blog-post-slider').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 1
	});

	$('.progress-bar').each(function(index) {
		var progress_bar = $(this);
		progress_bar.waypoint(function() {
			progress_bar.css("width", progress_bar.attr("aria-valuenow") + "%");
		}, {
			offset: 'bottom-in-view'
		});
	});

	$('.countTo').each(function(index) {
		var countTo = $(this);
		countTo.waypoint(function() {
			countTo.countTo({
				speed: 600,
				formatter: function(value, options) {
					value = value.toFixed(options.decimals);
					value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					return value;
				}
			});
		}, {
			offset: 'bottom-in-view'
		});
	});

	/* COUNTDOWN */
	$("#countdown").countdown({
		date: "1 Jan 2017 00:00:00", // Put your date here
		format: "on"
	});
	$("#sale-countdown").countdown({
		date: "1 Jan 2017 00:00:00", // Put your date here
		format: "on"
	});

	/*==========  Portfolio Masonry  ==========*/
	var $projectMasonryContainer = $('#portfolio-masonry').imagesLoaded(function() {
		$projectMasonryContainer.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
				columnWidth: $projectMasonryContainer.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-masonry-filters').on('click', 'button', function() {
		$('#portfolio-masonry-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$projectMasonryContainer.isotope({filter: filterValue});
	});
	/*==========  Portfolio Grid  ==========*/
	var $projectGridContainer = $('#portfolio-grid').imagesLoaded(function() {
		$projectGridContainer.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
				columnWidth: $projectGridContainer.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-grid-filters').on('click', 'button', function() {
		$('#portfolio-grid-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$projectGridContainer.isotope({filter: filterValue});
	});
	/*==========  Portfolio Grid 2  ==========*/
	var $projectGrid2Container = $('#portfolio-grid2').imagesLoaded(function() {
		$projectGrid2Container.isotope({
			itemSelector: '.item',
			layoutMode: 'fitRows',
			percentPosition: true,
			masonry: {
				columnWidth: $projectGrid2Container.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-grid2-filters').on('click', 'button', function() {
		$('#portfolio-grid2-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$projectGrid2Container.isotope({filter: filterValue});
	});
	/*==========  Portfolio 4 Col  ==========*/
	var $project4ColContainer = $('#portfolio-4col').imagesLoaded(function() {
		$project4ColContainer.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
				columnWidth: $project4ColContainer.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-4col-filters').on('click', 'button', function() {
		$('#portfolio-4col-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$project4ColContainer.isotope({filter: filterValue});
	});
	/*==========  Portfolio 3 Col  ==========*/
	var $project3ColContainer = $('#portfolio-3col').imagesLoaded(function() {
		$project3ColContainer.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
				columnWidth: $project3ColContainer.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-3col-filters').on('click', 'button', function() {
		$('#portfolio-3col-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$project3ColContainer.isotope({filter: filterValue});
	});
	/*==========  Portfolio 2 Col  ==========*/
	var $project2ColContainer = $('#portfolio-2col').imagesLoaded(function() {
		$project2ColContainer.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
				columnWidth: $project2ColContainer.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-2col-filters').on('click', 'button', function() {
		$('#portfolio-2col-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$project2ColContainer.isotope({filter: filterValue});
	});
	
	/*==========  Validate Email  ==========*/
	function validateEmail($validate_email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $validate_email ) ) {
			return false;
		} else {
			return true;
		}
		return false;
	}
	
	/*==========  Contact Form  ==========*/
	$('#contact-form').on('submit', function() {
		$('#contact-form').find('.button').prop('disabled', true);
		if (validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			var action = $(this).attr('action');
			$.ajax({
				type: "POST",
				url : action,
				data: {
					contact_name: $('#contact-name').val(),
					contact_email: $('#contact-email').val(),
					contact_subject: $('#contact-subject').val(),
					contact_message: $('#contact-message').val()
				},
				success: function() {
					$('#contact-form').find('.button').prop('disabled', false);
					swal({
						title: 'Success!',
						text: 'Thanks for contacting us!',
						type: 'success',
						html: true
					});
				},
				error: function() {
					$('#contact-form').find('.button').prop('disabled', false);
					swal({
						title: 'Error!',
						text: 'Sorry, an error occurred.',
						type: 'error',
						html: true
					});
				}
			});
		} else if (!validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			$('#contact-form').find('.button').prop('disabled', false);
			swal({
				title: 'Oops!',
				text: 'Please enter a valid email.',
				html: true
			});
		} else {
			$('#contact-form').find('.button').prop('disabled', false);
			swal({
				title: 'Oops!',
				text: 'Please fill out all the fields.',
				html: true
			});
		}
		return false;
	});

	/*==========  Newsletter Form  ==========*/
	var $form = $('#mc-embedded-subscribe-form');
	$form.on('submit', function() {
		$form.find('.button').prop('disabled', true);
		if (validateEmail($('#mce-EMAIL').val()) && $('#mce-EMAIL').val().length !== 0) {
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache: false,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				error: function(err) {
					$form.find('.button').prop('disabled', false);
					swal({
						title: 'Error!',
						text: err.msg,
						type: 'error',
						html: true
					});
				},
				success: function(data) {
					if (data.result !== 'success') {
						$form.find('.button').prop('disabled', false);
						swal({
							title: 'Wait!',
							text: data.msg,
							html: true
						});
					} else {
						$form.find('.button').prop('disabled', false);
						swal({
							title: 'Success!',
							text: data.msg,
							type: 'success',
							html: true
						});
					}
				}
			});
		} else {
			$form.find('.button').prop('disabled', false);
			swal({
				title: 'Error!',
				text: 'Please enter a valid email.',
				type: 'error',
				html: true
			});
		}
		return false;
	});

	/*==========  Map  ==========*/
	var map;
	function initialize_map() {
		if ($('.map').length) {
			var myLatLng = new google.maps.LatLng(40.742424, -73.993217);
			var mapOptions = {
				zoom: 13,
				center: myLatLng,
				scrollwheel: false,
				zoomControl: false,
				scaleControl: false,
				mapTypeControl: false,
				streetViewControl: false
			};
			map = new google.maps.Map(document.getElementById('map'), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map
			});
		} else {
			return false;
		}
		return false;
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);

})(jQuery);