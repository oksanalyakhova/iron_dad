$(window).on('load', function () {

    // var menuTrigger = $('.header-toggle'),
    //     nav = $('.header-nav'),
    //     closeButton = nav.find('.header-nav__close'),
    //     siteBody = $('body'),
    //     mainContents = $('section, footer'),
    //     socials = $('.home-social'),
    //     goTop = $('.go-top'),
    //     goTopBtn = $('.go-top-btn');

    // feather icons
    feather.replace({
        width: 35,
        height: 35
    });

    // isotope on news
    var iso = new Isotope('.grid', {
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: 195,
            gutter: 25,
            fitWidth: true
        }
    });

    // slick carousels
    $('.product-carousel').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.authors-carousel').slick({
        arrows: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // menu btn on scrolldown
    // $(window).on('scroll', function() {
    //     if ($(window).scrollTop() > 250) {
    //         menuTrigger.addClass('toggle-is-opaque');
    //         socials.addClass('social-is-hide');
    //     }
    //     else {
    //         menuTrigger.removeClass('toggle-is-opaque');
    //         socials.removeClass('social-is-hide');
    //     }
    // });
    // -- with midnight
    // goTop.midnight();

    // back to top
    // $(window).on('scroll', function() {
    //     if ($(window).scrollTop() >= 500) {
    //         goTop.fadeIn(400);
    //     } else {
    //         goTop.fadeOut(400);
    //     }
    // });

    // open-close menu by clicking on the menu icon
    // menuTrigger.on('click', function(e){
    //     e.preventDefault();
    //     nav.toggleClass('menu-is-open');
    //     $(this).addClass('toggle-is-hide');
    // });

    // close menu by clicking the close button
    // closeButton.on('click', function(e){
    //     e.preventDefault();
    //     menuTrigger.trigger('click');
    //     menuTrigger.removeClass('toggle-is-hide');
    // });

    // close menu clicking outside the menu itself
    // siteBody.on('click', function(e){
    //     if(!$(e.target).is('.header-nav, .header-nav__content, .header-toggle, .header-toggle span')) {
    //         nav.removeClass('menu-is-open');
    //         menuTrigger.removeClass('toggle-is-hide');
    //     }
    // });

    // smooth scrolling
    // var scrollLink = $('.smoothscroll');
    // scrollLink.click(function(e) {
    //     e.preventDefault();
    //     $('body, html').animate({
    //         scrollTop: $(this.hash).offset().top
    //     }, 1000 );
    //     // check if menu is open
    //     if ($('body').hasClass('menu-is-open')) {
    //         $('.header-nav__close').trigger('click');
    //     }
    // });

    // animate on scroll
    // AOS.init({
    //     offset: 300,
    //     duration: 600,
    //     easing: 'ease-in-sine',
    //     delay: 50,
    //     once: true,
    //     disable: 'mobile'
    // });






});