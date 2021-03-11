$(function() {

	// check for ie11
	if(navigator.userAgent.match(/Trident.*rv:11\./)) {
	  $('body').addClass('ie11');
	}
	$('#show-more').click(function (e) {
		e.preventDefault();
		var max_item = $('.supplies >div.item').length;
		var active_item = $('.supplies >div.item.active').length;
		var chek = 0;
		for (var i = active_item; i < max_item; i++) {
			chek++;
			if (chek < 7) {
				$('.supplies >div').eq(i).addClass('active');
			}
		}
		if ((max_item - 1 - active_item) < 6) {
			$('#show-more').hide();
		}
	});
	var budgetCarousel1 = $('.js-budget-carousel .owl-carousel').owlCarousel({
		margin: 20,
		loop: true,
		dots: false,
		responsive: {
			576: {
				items: 3,
				slideBy: 3
			},
			0: {
				items: 2,
				slideBy: 2
			}
		}
	});
	// budget carousel next item
	$('.budget-carousel-item-next').click(function() {
		budgetCarousel1.trigger('next.owl.carousel');
		return false;
	})
	// check for ie11
	if(navigator.userAgent.match(/Trident.*rv:11\./)) {
		$('body').addClass('ie11');
	}

	$('#next-step').click(function (e) {
		e.preventDefault();
		var a = document.forms["big-form"]["name"].value;
		var b = document.forms["big-form"]["phone"].value;
		var c = document.forms["big-form"]["email"].value;
		if (a == null || a == "", b == null || b == "", c == null || c == "") {
			$('.input').addClass(' error');
			return false;
		} else {
			$('.input').removeClass('error');
			$('#next-step').removeClass('disabled');
			$('.first-block').addClass('hidden');
			$('.last-block').removeClass('hidden');
			return true;
		}
	});
	
	// smooth scrolling to hash
	var $root = $('html, body');
	$('a[href^="#"][data-scroll]').click(function () {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 80
    }, 500);
    return false;
	});

	// fixed header
	$(window).scroll(function(){
		if($(window).scrollTop() > 5){
			$('.header').addClass('fixed');
			$('body').addClass('fixed');
		}
		else{
			$('.header').removeClass('fixed');
			$('body').removeClass('fixed');
		}
	});

	// budget carousel
	var budgetCarousel = $('.budget-carousel .owl-carousel').owlCarousel({
		margin: 20,
		items: 1,
		slideBy: 1
	});

	// budget carousel next item
	$('.budget-carousel-item-next').click(function() {
	    budgetCarousel.trigger('next.owl.carousel');
	    return false;
	})

	// equip menu
	$('.equip-menu a').click(function(){
		var menuIndex = $(this).parent().index();
		$('.equip-menu a').removeClass('active');
		$(this).addClass('active');
		$('.equip-items').removeClass('active');
		$('.equip-items').eq(menuIndex).addClass('active');
		return false;
	});

	$('.equip-block-mobile-link').click(function(){
		$(this).toggleClass('active');
		$(this).parent().addClass('active');
		$(this).parent().find('.equip-item-inner-wrapper').slideToggle();
		return false;
	});

	// convert ul to select menu
	// var clonedLinks = $('.equip-menu a').clone();
	// clonedLinks.each(function(){
	// 	$('<option/>').appendTo('.equip-menu-select')
	// 	.append($(this));
	// });
	// $('.equip-menu-select').change(function(){
	// 	var menuIndex = $('.equip-menu-select :selected').index();
	// 	$('.equip-menu a').removeClass('active');
	// 	$(this).addClass('active');
	// 	$('.equip-items').removeClass('active');
	// 	$('.equip-items').eq(menuIndex).addClass('active');
	// 	return false;
	// });

	var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
	};

	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_campaign = getUrlParameter('utm_campaign');
	var utm_content = getUrlParameter('utm_content');
	var utm_term = getUrlParameter('utm_term');
	var utm_expid = getUrlParameter('utm_expid');

  // form send
$("form").submit(function(e) { 
	$(this).find('.utm').remove();
	$(this).append(
    $('<input>', {
      type: 'hidden',
      name: 'utm_source',
      val: utm_source,
      class: 'utm'
  	})
	);
	$(this).append(
    $('<input>', {
      type: 'hidden',
      name: 'utm_medium',
      val: utm_medium,
      class: 'utm'
  	})
	);
	$(this).append(
    $('<input>', {
      type: 'hidden',
      name: 'utm_campaign',
      val: utm_campaign,
      class: 'utm'
  	})
	);
	$(this).append(
    $('<input>', {
      type: 'hidden',
      name: 'utm_content',
      val: utm_content,
      class: 'utm'
  	})
	);
	$(this).append(
    $('<input>', {
      type: 'hidden',
      name: 'utm_term',
      val: utm_term,
      class: 'utm'
  	})
	);
	$(this).append(
    $('<input>', {
      type: 'hidden',
      name: 'utm_expid',
      val: utm_expid,
      class: 'utm'
  	})
	);
	var form = $(this);
	var data = form.serialize();
 	e.preventDefault();
  var fd = new FormData(this);
  $.ajax({
    url: 'mailer.php',
    type: 'POST',
    contentType: false, 
    processData: false, 
    data: fd,
    beforeSend: function() {
			form.find('input[type="submit"]').attr('disabled', 'disabled');
		},
    success: function(msg){
    	if(msg == "Максимальный размер файла 5МБ"){
				alert(msg);
			}
			else{
				console.log(msg);
        form[0].reset();
				window.location.replace("../thankyou.html");
			}
    }
  });
  $.ajax({
		type: 'POST',
		url: 'send-reply.php',
		dataType: 'json',
		data: data
  });
});

	// add dynamic subject fields
	$(document).on("click", ".equip-item", function(){
		var equipTitle = $(this).find('p').text();
		$(".fancybox-inner .popup-form input[type='hidden']").remove();
		$('.fancybox-inner .popup-form').append(
	    $('<input>', {
	      type: 'hidden',
	      name: 'subject',
	      val: "Получить комплект: " + equipTitle
	  	})
		);
	});

	// add hidden subject field
  $(document).on("click", "a[data-subject]", function(){
    var dataSubject = $(this).data('subject');
    $('.fancybox-inner .popup-form input[name=subject]').remove();
    $('.fancybox-inner .popup-form').append(
      $('<input>', {
        type: 'hidden',
        name: 'subject',
        val: dataSubject
      })
    );
  });

  // aggreement logic
  $(".aggreement input").on('change', function(){
		if ( !$(this).is(":checked") ){
      $(this).parents('form').find('.btn').prop('disabled', true).addClass('disabled');
    }
    else{
      $(this).parents('form').find('.btn').prop('disabled', false).removeClass('disabled');
    }
	});

	// menu toggler
	$('.mobile-panel-btn').click(function(){
		$(this).toggleClass('active');
		$('body').toggleClass('active');
		$('.mobile-panel').toggleClass('active');
		return false;
	});
	$('.mobile-menu a').click(function(){
		$(this).toggleClass('active');
		$('body').toggleClass('active');
		$('.mobile-panel').toggleClass('active');
		$('.mobile-panel-btn').toggleClass('active');
		return false;
	});

	// fancybox disable touch
  $.fancybox.defaults.touch = false;

	// projects slider
	$('.projects-slider').owlCarousel({
	  items: 1,
	  dots: true
	});

  // projects carousel
  if($('.projects-carousel-main').length > 0){
  	$('.projects-carousel-main').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  fade: true,
		  focusOnSelect: true,
		  asNavFor: '.projects-carousel-thumbs'
		});
		$('.projects-carousel-thumbs').slick({
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  asNavFor: '.projects-carousel-main',
		  centerMode: true,
		  focusOnSelect: true,
			responsive: [
		    {
		      breakpoint: 576,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
		});
  }

	// brand carousel
	// var divs = $(".brands-items img");
	// for(var i = 0; i < divs.length; i+=12) {
	//   divs.slice(i, i+12).wrapAll("<div class='brands-item'></div>");
	// }
	var brandsCarousel = $('.brands-items .owl-carousel').owlCarousel({
		items: 9,
		autoplay: true,
		autoplayTimeout: 1500,
		loop: true,
		lazyLoad: true,
		dots: false,
		responsive: {
			768:{
				items: 9
			},
			576:{
				items: 6
			},
			0:{
				items: 3
			}
		}
	});

	$(window).on("blur focus", function(e) {
    var prevType = $(this).data("prevType");

    if (prevType != e.type) {   //  reduce double fire issues
        switch (e.type) {
            case "blur":
                // do work
                brandsCarousel.trigger('stop.owl.autoplay');
                break;
            case "focus":
                // do work
                brandsCarousel.trigger('play.owl.autoplay', [3000]);
                break;
        }
    }
    $(this).data("prevType", e.type);
	});
// Link
	$('.js-equip-item').click(function () {
		var $this = $(this),
			link = $this.attr('data-link')

		$('#jsCatalogLink').attr('href', link);
	})

	// map
	var mapTargets = [
		['55.037603, 82.894935','г. Новосибирск'],
		['53.139051, 103.078382','г. Черемхово'],
		['55.795712, 37.565811','г. Москва'],
		['55.711519, 37.752913','г. Москва'],
		['68.980972, 33.104769','г. Мурманск'],
		['43.148827, 45.903273','г. Шали'],
		['55.747454, 37.498599','г. Москва'],
		['55.750464, 37.603047','г. Москва'],
		['55.776603, 37.679143','г. Москва'],
		['47.254950, 39.770636','г. Ростов-на-Дону'],
		['55.736285, 37.649552','г. Москва'],
		['55.748017, 37.589455','г. Москва'],
		['44.918202, 34.083672','г. Симферополь'],
		['52.594381, 58.295847','г. Баймак'],
		['55.674169, 37.454843','г. Москва'],
		['55.888775, 37.382124','г. Москва'],
		['55.836888, 37.535475','г. Москва'],
		['52.774706, 32.210936','г. Клинцы'],
		['67.560220, 30.470729','г. Ковдор'],
		['55.642596, 37.341376','г. Москва'],
		['68.965445, 33.077460','г. Мурманск'],
		['55.735155, 37.629664','г. Москва'],
		['55.652598, 37.413879','г. Москва'],
		['55.100762, 38.760966','г. Коломна'],
		['55.726294, 37.680949','г. Москва'],
		['52.963000, 36.067368','г. Орёл'],
		['54.967486, 35.857449','г. Медынь'],
		['55.547825, 37.522728','г. Москва'],
		['55.417291, 37.486544','г. Подольск'],
		['43.352981, 45.638441','г. Грозный'],
		['47.695247, 40.261898','г. Шахты'],
		['61.991665, 129.688780','г. Якутск'],
		['55.996642, 37.180903','г. Москва'],
		['55.806656, 37.623160','г. Москва'],
		['57.122899, 65.567583','г. Тюмень'],
		['59.995125, 30.252375','г. Санкт-Петербург'],
		['57.906835, 59.963021','г. Нижний Тагил'],
		['55.645964, 37.668022','г. Москва'],
		['67.185603, 32.451972','г. Кандалакша'],
		['55.742732, 37.825460','г. Москва'],
		['55.630431, 37.617195','г. Москва'],
		['55.685056, 37.526816','г. Москва'],
		['55.658825, 52.270343','г. Набережные Челны'],
		['61.108524, 42.135883','д. Горка'],
		['55.983278, 92.952581','г. Красноярск'],
		['54.729954, 55.952987','г. Уфа'],
		['55.702495, 37.512649','г. Москва'],
		['56.848360, 35.942187','г. Тверь'],
		['62.032887, 129.722063','г. Якутск'],
		['56.684088, 36.372831','пгт. Радченко'],
		['48.512004, 44.541167','г. Волгоград'],
		['55.757313, 37.572243','г. Москва'],
		['55.770451, 37.715911','г. Москва'],
		['55.105228, 38.108556','д. Дубнево'],
		['55.829835, 37.357923','г. Москва'],
		['55.830265, 37.360564','г. Москва'],
		['55.755814, 37.617635','г. Москва'],
		['55.376902, 36.731807','г. Наро-Фоминск'],
		['69.357352, 88.184997','г. Норильск'],
		['55.645893, 37.477022','г. Москва'],
		['56.011067, 37.475073','г. Лобня'],
		['55.505546, 37.332097','г. Москва'],
		['55.754481, 37.556244','г. Москва'],
		['58.737164, 29.847720','г. Луга'],
		['55.721432, 37.400656','г. Москва'],
		['66.083963, 76.680974','г. Новый Уренгой'],
		['55.827085, 37.752975','г. Москва'],
		['54.490884, 55.887257','с Булгаково'],
		['55.997265, 36.818862','пос. Гидроузла им. Куйбышева'],
		['55.627575, 36.336701','д. Нестерово'],
		['61.016632, 69.054134','г. Ханты-Мансийск'],
		['55.785513, 37.665408','г. Москва'],
		['47.254950, 39.770636','г. Ростов-на-Дону'],
		['55.734836, 37.636096','г. Москва'],
		['55.787169, 37.740588','г. Москва'],
		['54.616247, 39.724319','г. Рязань'],
		['55.777682, 37.602570','г. Москва'],
		['63.895652, 122.757928','пос. Кысыл-Сыр'],
		['55.807390, 37.412496','г. Москва'],
		['55.728368, 37.770034','г. Москва'],
		['55.875450, 37.580041','г. Москва'],
		['55.755814, 37.617635','г. Москва'],
		['53.412997, 58.978504','г. Магнитогорск'],
		['66.629301, 72.923663','с. Ныда'],
		['58.479870, 41.532915','г. Буй'],
		['55.633297, 37.477606','г. Москва'],
		['55.889649, 37.610206','г. Москва'],
		['55.819550, 37.516180','г. Москва'],
		['56.016023, 37.867457','д. Пушкино'],
		['55.769140, 37.658509','г. Москва'],
		['55.681087, 37.656586','г. Москва'],
		['55.695012, 37.799876','г. Москва'],
		['55.796101, 37.815741','г. Москва'],
		['43.489759, 43.600199','г. Нальчик'],
		['51.530128, 46.044623','г. Саратов'],
		['53.188503, 45.009387','г. Пенза'],
		['55.628988, 37.511158','г. Москва'],
		['55.639090, 37.363520','г. Москва'],
		['59.411539, 56.783533','г. Березники'],
		['63.205058, 75.473010','г. Ноябрьск'],
		['55.780157, 37.828587','г. Москва']
	];
	ymaps.ready(init);
  function init () {
    window.myMap = new ymaps.Map('geography-map', {
      center: [62.449589, 96.693102],
      zoom: 3
    });
    myMap.behaviors.disable('scrollZoom');

      $(window).on('load resize', function(){
          if($(window).width() > 576){
              window.myMap2 = new ymaps.Map('contacts-map', {
                  center: [55.543502, 37.720058],
                  zoom: 17
              });
          }
          else{
              window.myMap2 = new ymaps.Map('contacts-map', {
                  center: [55.543502, 37.720058],
                  zoom: 17
              });
          }
          myMap2.behaviors.disable('scrollZoom');
          myMap2.geoObjects.add(
              new ymaps.Placemark([55.543158, 37.720943], {}, {
                  iconLayout: 'default#image',
                  // Custom image for the placemark icon.
                  iconImageHref: 'img/placemark-icon.png',
                  // The size of the placemark.
                  iconImageSize: [48, 60]
              })
          );
      });

    HintLayout = ymaps.templateLayoutFactory.createClass(
     	"<div class='my-hint'>" +
        "{{ properties.hintContent }}" +
      "</div>"
    );

		$.each(mapTargets, function (i, e) {
      myMap.geoObjects.add(
        new ymaps.Placemark(
          e[0].split(','), {
          	// hintContent: e[1],
          	balloonContent: e[1]
          }, {
          	iconLayout: 'default#image',
		        // Custom image for the placemark icon.
		        iconImageHref: 'img/placemark-icon.png',
		        // The size of the placemark.
		        iconImageSize: [48, 60]
          })
      );
	  });
  }

  // vk group widget init
	VK.Widgets.Group("vk_groups", {mode: 0, width: "auto", height: "auto"}, 167908342);

  $('.js-showBlock').click(function () {
	  var clickedBtn = $(this),
		  hiddenBlock = $('.anticrisis')

      clickedBtn.toggleClass('active')
      hiddenBlock.toggleClass('active')
  })

    $('.js-showMore').click(function () {
        var clickedBtn = $(this),
            hiddenBlock = $(clickedBtn).siblings('.line-center').find('.line-center-content')

        clickedBtn.toggleClass('active')
        hiddenBlock.toggleClass('active')
    })

});