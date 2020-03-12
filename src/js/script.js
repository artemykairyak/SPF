$(function() {

    $('.teachers__slider').slick({
        infinite: true,
        lazyLoad: 'ondemand',
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.teachers__nav_left'),
        nextArrow: $('.teachers__nav_right'),
        fade: false,
    });

    $('.teachers__slide').on('mouseenter', function() {
    	$(this).addClass('teachers__slide_hovered');
    });

     $('.teachers__slide').on('mouseleave', function() {
    	$(this).removeClass('teachers__slide_hovered');
    });

      $('.order-modal__input').on('focus', function() {
        $(this).parent().addClass('order-modal__input-container_focused');
    });

    $('.order-modal__input').on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('order-modal__input-container_focused');
        }

        // if (($(this).hasClass('order-modal__phone') &&
        //         !$(this).val().match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/) ||
        //         $(this).hasClass('order-modal__name') && !$(this).val() ||
        
        //     $(this).parent().removeClass('order-modal__input-container_error');
        //     $(this).parent().addClass('order-modal__input-container_success');
        // }
    });

    ymaps.ready(function () {
			var myMap = new ymaps.Map('map', {
				center: [51.53147662, 46.04544572],
				 zoom: 18,
				controls: []

			}, {
				searchControlProvider: 'yandex#search'
			}),        

			myPlacemark = new ymaps.Placemark([51.53148888584206, 46.04545542824164], {}, {
            // Опции.
            // Необходимо указать данный тип макета.
            // iconLayout: 'default#image',
             iconColor: '#d32f2f'
            // Своё изображение иконки метки.
            // iconImageHref: '/assets/img/icons/location.png',
            // Размеры метки.
            // iconImageSize: [68, 68],
            // iconImageOffset: [-12, 0]
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
        })

			myMap.geoObjects.add(myPlacemark);
			// myMap.behaviors.disable('scrollZoom');
			myMap.container.fitToViewport();

			// if ($(window).width() < 840) {
			// 	myMap.setCenter([55.762681099950635, 37.75192034572300]);
			// }
		});

});