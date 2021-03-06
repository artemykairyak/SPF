$(function() {
    setTimeout(() => {
        $('body').removeClass('scroll-disabled');
        $('.preloader').addClass('preloader_disabled');
    }, 1000);

    setTimeout(() => {
        $('.teachers__slider').slick({
            infinite: false,
            lazyLoad: 'ondemand',
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.teachers__nav_left'),
            nextArrow: $('.teachers__nav_right'),
            fade: false,
            responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2.5,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1.5,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1.3,
                    }
                }
            ]
        });
    }, 100);


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
            $(this).parent().addClass('order-modal__input-container_error');
        }

        if (($(this).hasClass('order-modal__phone') &&
                !$(this).val().match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/))) {
            $(this).parent().addClass('order-modal__input-container_error');
        } else if (($(this).hasClass('order-modal__age') && !$(this).val().match(/^\d{1,}$/)) || ($(this).hasClass('order-modal__name') && !$(this).val())) {
            $(this).parent().addClass('order-modal__input-container_error');
        } else {
            $(this).parent().removeClass('order-modal__input-container_error');
        }
    });

    $('.header__burger').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('header__burger_active')) {
            $('.mobile-menu').removeClass('mobile-menu_active');
            $(this).removeClass('header__burger_active');
            $('.overlay').hide();
        } else {
            $(this).addClass('header__burger_active');
            $('.mobile-menu').addClass('mobile-menu_active');
            $('.overlay').show();
        }
    });

    function disableBtn(btn) {
        btn.addClass('btn_disabled');
    };

    function enableBtn(btn) {
        btn.removeClass('btn_disabled');
    };

    function sendForm(form, container) {
        if (validateForm(form)) {
            let data = form.serializeArray();
            disableBtn($('.order-modal__order-btn'));
            $.ajax({
                url: 'http://spf.asap-lp.ru/mail/index.php',
                type: "POST",
                data: data,
                success: function(data) {
                    if (container) {
                        hideFramedModal($('.order-modal'))
                        showFramedModal(container, $('.success-modal'));
                    } else {
                        hideModal($('.order-modal'))
                        showModal($('.success-modal'));
                    }

                    enableBtn($('.order-modal__order-btn'));
                },
                error: function(error) {
                    console.log(error)
                },
                dataType: 'json'
            });

            let inputs = form.find('.order-modal__input-container');

            inputs.each((i, item) => {
                $(item).removeClass('order-modal__input-container_focused');
            });

            form[0].reset();
        }
    };

    $('.order-modal__form').on('submit', function(e) {
        e.preventDefault();

        if ($(this).closest('.modal').attr('style') &&
            $(this).closest('.modal').attr('style').length > 0) {
            sendForm($(this), $('.framed'))
        } else {
            sendForm($(this))
        }
    });

    function showModal(modal) {
        modal.addClass('modal_active');
        $('.overlay').show();
    };

    function hideModal(modal) {
        modal.removeClass('modal_active');
        $('.overlay').hide();
    };

    function showFramedModal(container, modal) {
        if ($('.framed').length > 0) {
            $('.framed').attr('style', '');
            $('.framed').removeClass('framed');
        }

        modal.addClass('modal_framed');

        modal.css({
            'width': container.outerWidth() + 'px',
            'height': container.outerHeight() + 'px',
            'left': container.offset().left + 'px',
            'top': container.offset().top + 'px',
            'transform': 'none',
            'position': 'absolute',
            'background': 'rgba(45, 44, 44, 0.44)',
            'max-width': '100%'
        });

        container.css({
            'opacity': 0
        });

        container.addClass('framed');
        modal.addClass('modal_active');
    };

    function hideFramedModal() {
        $('.modal').attr('style', '');
        $('.header__content-picture, .future__content-picture').attr('style', '');
        $('.modal').removeClass('modal_active');
        $('.modal').removeClass('modal_framed');
    };

    function validateForm(form) {
        let correct = true;
        if (!form.find('.order-modal__input-container_error').length) {
            let inputs = form.find('.order-modal__input');
            inputs.each((i, item) => {

                if (!$(item).val()) {
                    $(item).parent().addClass('order-modal__input-container_error');
                    correct = false;
                }
            });
        } else {
            correct = false;
        }
        return correct;
    };

    function hideMobileMenu() {
        $('.mobile-menu').removeClass('mobile-menu_active');
        $('.header__burger').removeClass('header__burger_active');
        $('.overlay').hide();
    };

    $('.modal__arr, .modal__close').on('click', function() {
        if ($('.framed').length > 0) {
            $('.framed').attr('style', '');
            $('.framed').removeClass('framed');
            $('.modal').removeClass('modal_framed');
        }
        $('.overlay').hide();
        $('.modal').removeClass('modal_active');
    });

    $('.header__menu-link_programming').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('.programming').offset().top }, 700);
    });

    $('.header__menu-link_design').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('.design').offset().top }, 700);
    });

    $('.header__menu-link_teachers').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('.teachers').offset().top }, 700);
    });

    $('.header__menu-link_contacts').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('.contacts').offset().top }, 700);
    });

    $('.mobile-menu__link_programming').on('click', function(e) {
        e.preventDefault();
        hideMobileMenu();
        $('html, body').animate({ scrollTop: $('.programming').offset().top }, 700);
    });

    $('.mobile-menu__link_design').on('click', function(e) {
        e.preventDefault();
        hideMobileMenu();
        $('html, body').animate({ scrollTop: $('.design').offset().top }, 700);
    });

    $('.mobile-menu__link_teachers').on('click', function(e) {
        e.preventDefault();
        hideMobileMenu();
        $('html, body').animate({ scrollTop: $('.teachers').offset().top }, 700);
    });

    $('.mobile-menu__link_contacts').on('click', function(e) {
        e.preventDefault();
        hideMobileMenu();
        $('html, body').animate({ scrollTop: $('.contacts').offset().top }, 700);
    });

    $('.contacts__totopbtn-button').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('.header').offset().top }, 700);
    });

    $('.header__content-picture, .future__content-picture').on('click', function() {
        if ($(window).width() > 1024) {
            if ($('.framed').length > 0) {
                $('.framed').attr('style', '');
                $('.framed').removeClass('framed');
                hideFramedModal();
            }
            showFramedModal($(this), $('.order-modal'));
        } else {
            showModal($('.order-modal'));
        }
    })

    $('.programming__order-btn, .design__order-btn').on('click', function(e) {
        e.preventDefault();
        hideFramedModal();
        showModal($('.order-modal'));
    });

    $('.overlay').on('click', function() {
        $('.modal').removeClass('modal_active')
        $('.overlay').hide();
        $('.modal').removeClass('modal_framed');
        $('.mobile-menu').removeClass('mobile-menu_active');
        $('.header__burger').removeClass('header__burger_active');
    });

    $('.success-modal__btn').on('click', function(e) {
        e.preventDefault();
        $('.modal').removeClass('modal_framed');

        if ($('.framed').length > 0) {
            $('.framed').attr('style', '');
            $('.framed').removeClass('framed');
        }

        $('.modal').removeClass('modal_active');
        $('.overlay').hide();
    });

    ymaps.ready(function() {
        var myMap = new ymaps.Map('map', {
                center: [51.53147662, 46.04544572],
                zoom: 18,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),

            myPlacemark = new ymaps.Placemark([51.53148888584206, 46.04545542824164], {}, {
                iconColor: '#d32f2f'
            });

        myMap.geoObjects.add(myPlacemark);
        myMap.container.fitToViewport();
    });
});