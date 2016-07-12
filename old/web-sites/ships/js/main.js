$(document).ready(function ($) {

    /*scroll styles*/





    /* Mobile Menu */
    var $menu = $('#m-menu').mmenu({
            offCanvas: {
                pageNodetype: 'div',
                pageSelector: '#page',
                position: "bottom",
                zposition: "front"
            },
            searchfield: {
                placeholder: 'Что ищем?'
            },
            navbar: {
                title: false
            },
            navbars: [
                {
                    content: [],
                    height: 3,
                    position: 'top'
                },
                {
                    content: ["searchfield"],
                    height: 1,
                    position: 'bottom'
                }
            ]
        }),
        API = $menu.data('mmenu'),
        $menuOpen = $('.menu-open'),
        $menuClose = $('.menu-close'),
        $navTopCustom = $('.nav-top'),
        $navBotCustom = $('.nav-bottom'),
        $navTopMenu = $('.mm-navbar-top'),
        $navBotMenu = $('.mm-navbar-bottom'),
        $trainButton = $('.train-btn'),
        $shipButton = $('.ship-btn'),
        $trainPanel = $('#train-panel'),
        $shipPanel = $('#ship-panel'),
        $searchOpen = $('.nav-search a.search-icon'),
        searchCloseStr = '<a class="search-close" href="#">X</a>',
        $searchClose,
        $searchBlock = $('.mm-search'),
        $searchField = $('input', $searchBlock),
        $langOpen = $('.nav-lang'),
        $langClose = $('.lang-close'),
        $langPanel = $('.lang-panel');

    if(document.all && !window.atob) { //IE 9
        $('#m-menu').hide();
    }

    $menuOpen.click(function () {
        API.open();

        if(document.all && !window.atob) { //IE 9
            $('.mm-menu#m-menu').toggle();
        }
    });

    $menuOpen.one('click', function () {
        $navTopMenu.append($navTopCustom);
        $navBotMenu.append($navBotCustom);
        $searchBlock.append(searchCloseStr);

        $searchClose = $('.search-close', $searchBlock);

        $searchClose.click(function (e) {
            e.preventDefault();

            $searchBlock.fadeOut('normal');
            $searchField.val('');
        });

    });

    $menuClose.click(function (e) {
        e.preventDefault();

        API.close();

        if(document.all && !window.atob) { //IE 9
            $('.mm-menu#m-menu').toggle();
        }
    });

    $trainButton.click(function () {
        setActive($(this));
        API.openPanel($trainPanel);
    });

    $shipButton.click(function () {
        setActive($(this));
        API.openPanel($shipPanel);
    });

    $searchOpen.click(function (e) {
        e.preventDefault();

        $searchBlock.fadeIn('normal');
    });

    $langOpen.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        $langPanel.fadeIn('normal');
    });

    $langClose.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        $langPanel.fadeOut('normal');
    });

    function setActive($block) {
        if ($block.hasClass('active')) {
            return false;
        }

        $('.active', $block.parents('.sections')).removeClass('active');
        $block.addClass('active');
        return true;
    }

    /*Descktop Menu*/
    var $topMenuLi = $('.top-menu > ul > li.arrow'),
        $secondaryTopMenu = $('.top-menu .secondary-top-menu'),
        $closeTopMenu = $('.close', $secondaryTopMenu),
        $sideMenu = $('.product-navigation');

    if($sideMenu.find('.product-menu-small').length) {
        var productMenuSmallApi = $('.secondary-product-menu', $sideMenu).jScrollPane({
            verticalGutter: 0,
            contentWidth: '0px'
        }).data('jsp');

        $(window).resize(function () {
            productMenuSmallApi.reinitialise();
        });
    } else {
        $('.secondary-product-menu').jScrollPane({
            verticalGutter: 0,
            contentWidth: '0px'
        });

        $('.main-product-menu').accOM({
            afterAction: function () {
                $(this).data('jsp').reinitialise();
                $(window).trigger('resize');
            }
        });
    }

    $topMenuLi.click(function (e) {
        var actionBlock = this,
            fade = false;

        e.stopPropagation();
        e.preventDefault();

        $topMenuLi.not(actionBlock).each(function () {
            var self = this;

            if ($(this).hasClass('active')) {
                $(actionBlock).addClass('active');
                $('.secondary-top-menu', $(actionBlock)).fadeIn('fast', function () {
                    $(self).removeClass('active');
                    $('.secondary-top-menu', $(self)).hide();
                });
                fade = true;
            }
        });

        if (!fade) {
            $(actionBlock).toggleClass('active');
            if ($(actionBlock).hasClass('active')) {
                $('.secondary-top-menu', $(actionBlock)).slideDown('normal');
            } else {
                $('.secondary-top-menu', $(actionBlock)).slideUp('normal');
            }
        }
    });

    $secondaryTopMenu.click(function (e) {
        e.stopPropagation();
    });

    $closeTopMenu.click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        $(this).parents('li.active').removeClass('active');
        $(this).parents('.secondary-top-menu').slideUp('normal');
    });


    /*slider*/
    if (typeof $(window).owlCarousel == 'function') {
        var $slider = $('.slider-big'),
            $sliderNav = $('.slider-nav');

        if($slider.find('.show').length > 1){
            $slider.owlCarousel({
                nav: true,
                navText: [ '', '' ],
                loop: true,
                items: 1,
                thumbs: true,
                thumbsPrerendered: true,
                thumbContainerClass: 'owl-thumbs',
                thumbItemClass: 'owl-thumb-item'
            });

            var timer = setInterval(function () {  //костыль, для отлавливания инициализации owl
                if($slider.hasClass('owl-loaded')){
                    clearInterval(timer);

                    var $clone = $('.owl-item.cloned a[rel=slider-gallery]', $slider),
                        $original = $('.owl-item:not(.cloned) a[rel=slider-gallery]', $slider);

                    $original.fancybox({
                        padding: 0
                    });

                    $clone.each(function () {
                        var href = $(this).attr('href');
                        var originalItem = [].filter.call($original, function (element) {
                            return $(element).attr('href') == href;
                        });

                        delegateClick($(this), $(originalItem[0]));
                    });
                }
            }, 100);

        } else {
            $('a[rel=slider-gallery]').fancybox({
                padding: 0
            });
            $sliderNav.hide();
        }

        $(window).bind({
            resize: function () {
                setSliderSize($slider);
            },
            load: function () {
                setSliderSize($slider);
            }
        });
    }

    function setSliderSize($slider) {
        var wWidth = $(window).width(),
            $item = $('.item', $slider);

        if (wWidth < 600) {
            $item.css({
                'height': wWidth,
                'width': wWidth
            });
        } else if (wWidth >= 600 && wWidth < 1200){
            $item.css({
                'height': 402,
                'width': 402
            });
        } else if (wWidth >= 1200) {
            $item.css({
                'height': 562,
                'width': 562
            });
        }
    }

    function delegateClick($from, $to) {
        $from.on('click', function (e) {
            var link = $to[0];
            var linkEvent = null;
            if (document.createEvent) {
                linkEvent = document.createEvent('MouseEvents');
                linkEvent.initEvent('click', true, true);// для всех остальных кроме IE
                link.dispatchEvent(linkEvent); //для Safari
            }
            else if (document.createEventObject) { //для обделенного любовью IE
                linkEvent = document.createEventObject();
                link.fireEvent('onclick', linkEvent);
            }

            e.preventDefault();
        });
    }

    /*Pop Up fancybox*/
    /*slider fancybox in slider*/
    var $questionBtn = $('.request-question-btn'),
        $questionPopUp = $('#request-question-pop-up'),
        $priceBtn = $('.request-price-btn'),
        $pricePopUp = $('#request-price-pop-up'),
        $closePopUp = $('.close-popUp'),
        $infoBtn = $('.info-button');


    $questionBtn.fancybox({
        afterClose : function () {
            $('form', $questionPopUp).each(function () {
                this.reset();
                resetPlaceholders($(this));
            });
        }
    });

    $priceBtn.fancybox({
        afterClose : function () {
            $('form', $pricePopUp).each(function () {
                this.reset();
                resetPlaceholders($(this));
            });
        }
    });

    $infoBtn.fancybox({
        afterClose : function () {
            $('form', $pricePopUp).each(function () {
                this.reset();
                resetPlaceholders($(this));
            });
        }
    });

    $closePopUp.click(function (e) {
        e.preventDefault();
        $.fancybox.close();
    });


    /*Language block*/
    var $langBlock = $('.lang');

    $langBlock.click(function (e) {
        e.stopPropagation();

        $(this).toggleClass('active');
    });


    /* Forms and basket */
    var $submitBtn = $('.submit'),
        $removeGood = $('.basket-line .close');

    $('input[type = "number"]').stepper(); // Input number styles,  basket

    /*$('input.phone').mask('+9 (999) 999-99-99');*/  //init mask

    $submitBtn.click(function (e) {
        var $form = $(this).parents('form');

        e.stopPropagation();
        e.preventDefault();

        if (validateForm($form)) {
            submitForm($form);
        }
    });

    $removeGood.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).parents('.basket-line').slideUp('normal', function () {
            $(this).remove();
        });
    });

    function validateForm($form) {
        var vResult = true;

        $('input[name!="submit"], textarea', $form).each(function () {
            var vVal = $(this).val(),
                requiredField = $(this).attr('required');

            if ($(this).hasClass('form-fail')) { //чистим классы, если остались после прошлого раза
                $(this).removeClass('form-fail');
            } else if ($(this).hasClass('form-success')) {
                $(this).removeClass('form-success');
            }

            if (vVal.length == 0 && requiredField) {
                var name = $(this).attr('name'),
                    message = 'Заполните';

                switch (name) {
                    case 'name' :
                        message += ' Имя!';
                        break;
                    case 'email' :
                        message += ' E-mail!';
                        break;
                    case 'phone' :
                        message += ' телефон!';
                        break;
                    case 'message' :
                        message = 'Напишите сообщение!';
                        break;
                    default :
                        message += ' поле!';
                        break;
                }

                $(this).val('').attr('placeholder', message).addClass('form-fail');

                vResult = false;
            } else if ($(this).attr('name') == 'email' && vVal.length) {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

                if (pattern.test($(this).val())) {
                    $(this).addClass('form-success').attr('placeholder', 'E-mail');
                } else {
                    $(this).val('').addClass('form-fail').attr('placeholder', 'Введите корректный E-mail!');
                    vResult = false;
                }
            } else if ($(this).attr('name') == 'phone' && vVal.length) {
                var pattern = /^\+?[\d\(\)\ -]{11,20}\d$/i;

                if (pattern.test($(this).val())) {
                    $(this).addClass('form-success').attr('placeholder', 'E-mail');
                } else {
                    $(this).val('').addClass('form-fail').attr('placeholder', 'Введите корректный телефон!');
                    vResult = false;
                }
            }else if ($(this).is('textarea') && vVal.length < 10 && vVal.length > 0 && requiredField) {
                $(this).val('').attr('placeholder', 'Сообщение слишком короткое!').addClass('form-fail');
                vResult = false;
            } else if (requiredField) {
                $(this).addClass('form-success');
            }
        });
        return vResult;
    }

    function submitForm($form) {
        var formData = $form.serialize(),
            type = $form.attr('method'),
            url = $form.attr('action');

        $.ajax({
            type: type,
            url: url,
            data: formData,
            success: function () {
                alert('Request Complete!'); //это просто заглушка заменить на действие окончания регестрации (перейти на страницу профиля, закрыть и т.д.)

                $form[0].reset();
                resetPlaceholders($form);
                if ($form.parents('.pop-up').length) { //если это в popUp то закрываем его, после отправки
                    $.fancybox.close();
                }
            }
        });
    }

    function resetPlaceholders($form) {
        $('input[name!="submit"], textarea', $form).each(function () {
            $(this).removeClass('form-success');
            $(this).removeClass('form-fail');
            $(this).attr('placeholder', '');
        });
    }


    /*scroll*/

    if (typeof $(window).jScrollPane == "function") {

        var win = $(window);

        /* product-menu scroll*/
        /*(function () {
            var $secondaryProductMenuSmall = $('ul.main-product-menu.product-menu-small ul.secondary-product-menu');
            var isResizing = false;

            $secondaryProductMenuSmall.jScrollPane();

            win.resize(function () {
                if (!isResizing && win.width() >= 1200 && $secondaryProductMenuSmall.length) {
                    isResizing = true;
                    $secondaryProductMenuSmall.data('jsp').reinitialise();
                    isResizing = false;
                }
            });
        })();*/


        /*body scroll*/

        var isResizing = false;
        win.bind(
            'resize',
            function()
            {
                // body
                if (!isResizing) {
                    isResizing = true;

                    //main menu

                    var container = $('#page-scroll');
                    // Temporarily make the container tiny so it doesn't influence the
                    // calculation of the size of the document
                    container.css(
                        {
                            'width': 1,
                            'height': 1
                        }
                    );
                    // Now make it the size of the window...
                    container.css(
                        {
                            'width': win.width(),
                            'height': win.height()
                        }
                    );
                    isResizing = false;
                    container.jScrollPane({
                        verticalGutter: 0,
                        contentWidth: '0px'
                    });
                }
            }
        ).trigger('resize');

        // Workaround for known Opera issue which breaks demo (see
        // http://jscrollpane.kelvinluck.com/known_issues.html#opera-scrollbar )
        $('body').css('overflow', 'hidden');

        // IE calculates the width incorrectly first time round (it
        // doesn't count the space used by the native scrollbar) so
        // we re-trigger if necessary.
        if ($('#page-scroll').width() != win.width()) {
            win.trigger('resize');
        }

        //костыль для скрола боди, иначе периодчески прячет футер
        setTimeout(function () {
            $('#page-scroll').data('jsp').reinitialise();
        }, 10);
    }



});