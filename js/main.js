/**
 * Created by Женя on 27.12.2015.
 */



$(document).ready(function(){

    /*Fixed menu & smooth scroll to anchor */
    (function(){
        /*Menu controller fixed & smooth scroll to anchor */
        function FixedMenu(options) {
            this._menu = options.menu;
            this._fixedClass = options.fixedClass || 'js-top-fixed';
            this._menuIsFixed = false;
            this._staticMenuPosition = -1;

        }
        FixedMenu.prototype.init = function () {
            var self = this;

            $(window).load(function () {
                self._staticMenuPosition = self.getCoords(self._menu).top;
                self.toggleMenuPosition();

                $(window).scroll(self.toggleMenuPosition.bind(self));
            });

            self.smoothScrollLink(this._menu);
            self.pageScrollListener();
        };
        FixedMenu.prototype.getCoords = function (elem) {
            var box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };
        FixedMenu.prototype.toggleMenuPosition = function () {
            if (window.pageYOffset <= this._staticMenuPosition && this._menuIsFixed) {
                $(this._menu).removeClass(this._fixedClass);
                this._menuIsFixed = false;
            } else if (window.pageYOffset > this._staticMenuPosition && !this._menuIsFixed){
                $(this._menu).addClass(this._fixedClass);
                this._menuIsFixed = true;
            }
        };
        FixedMenu.prototype.smoothScrollLink = function (selector) {
            var self = this;

            $('a[href^="#"]', $(selector)).click(function (e) {
                e.preventDefault();

                var target = this.hash;

                if(! $(target)[0]) return;

                $('html, body').stop().animate({
                    'scrollTop' : $(target).offset().top - self._menu.offsetHeight
                }, 500, 'swing', function () {
                    window.location.hash = target;
                });
            });
        };
        FixedMenu.prototype.pageScrollListener = function () {
            var isActive = false;
            var activeLink = null;
            var activeSection = null;
            var links = this._menu.querySelectorAll('a[href^="#"]');
            var self = this;

            var checkMenuPos = function () {
                var coordsMenu = self._menu.getBoundingClientRect();
                var elem = document.elementFromPoint(self._menu.offsetWidth/2, coordsMenu.bottom + 10);

                if (!elem && activeLink) {
                    activeLink.closest('li').classList.remove('active');
                    activeLink = null;
                    activeSection = null;
                    return;
                } else if (!elem) {
                    return;
                }

                if (activeLink && activeSection && activeSection.contains(elem)) {
                    return;
                }

                for (var i = 0; i < links.length; i++) {
                    var href = links[i].getAttribute('href');

                    if(href.length < 2) continue;

                    var targetSection = elem.closest(href);

                    if (targetSection) {
                        if (activeLink) {
                            activeLink.closest('li').classList.remove('active');
                        }
                        activeSection = targetSection;
                        activeLink = links[i];
                        activeLink.closest('li').classList.add('active');
                        return;
                    }
                }

                if(activeLink) {
                    activeLink.closest('li').classList.remove('active');
                    activeLink = null;
                    activeSection = null;
                }

            };

            $(document).on('scroll', checkMenuPos);
            checkMenuPos();
        };

        var topMenu = new FixedMenu({
            menu: document.querySelector('header')
        });

        topMenu.init();

        /*Scroll page anchor*/
        topMenu.smoothScrollLink('.page-wrap');
    })();

    /*ScrollUp button*/
    (function(){
        var buttonUp = '<div id="scrollUp"><i class="upButton"></i></div>';
        var flag = false;

        $('body').append($(buttonUp));


        $('#scrollUp').click( function(){
            $("html, body").animate({scrollTop: 0}, 500);
            return false;
        });

        $(window).scroll(function(){
            if ( $(document).scrollTop() > $(window).height() && !flag ) {
                $('#scrollUp').fadeIn({queue : false, duration: 400});
                $('#scrollUp').animate({'bottom' : '40px'}, 400);
                flag = true;
            } else if ( $(document).scrollTop() < $(window).height() && flag ) {
                $('#scrollUp').fadeOut({queue : false, duration: 400})
                $('#scrollUp').animate({'bottom' : '-20px'}, 400);
                flag = false;
            }
        });
    })();

    /*easyPieChart*/
    (function(){
        /*document.documentElement.addEventListener('scroll', function (e) {
            var elem = Array.prototype.slice.call(document.querySelectorAll('.chart'));


        });*/

        $(window).on('scroll', function (e) {
            var $elem = $('.chart:not(.activated)');

            $elem.each(function () {
                var coords = this.getBoundingClientRect();

                if(coords.bottom <= document.documentElement.clientHeight && coords.top >= 0) {
                    
                    $(this).easyPieChart({
                        size: 200,
                        animate: 2000,
                        lineCap: 'butt',
                        scaleColor: false,
                        barColor: '#FF5252',
                        trackColor: 'transparent',
                        lineWidth: 10
                    });

                    this.classList.add('activated');
                }
            });
        });
    })();

    /*Form*/
    (function(){
        /* form control class*/
        function FormController(options) {
            this._submitSelector = options.submitSelector || 'input[type="submit"]';
            this._listenedBlock = options.listenedBlock || 'body';
            this._resetForm = options.resetForm || true;
            this._beforeSend = options.beforeSend || null;
            this._resolve = options.resolve || null;
            this._reject = options.reject || null;
        }
        FormController.prototype.init = function () {
            if(!document.querySelector(this._submitSelector)) return;

            $(this._listenedBlock).click(this.formListeners.bind(this));
        };
        FormController.prototype.validateForm = function (form) {
            var vResult = true;
            var passCurr = false;

            $('input[name!="submit"], textarea', $(form)).each(function () {
                var vVal = $(this).val(),
                    requiredField = $(this).attr('required');

                if ($(this).hasClass('form-fail')) { //чистим классы, если остались после прошлого раза
                    $(this).removeClass('form-fail');
                } else if ($(this).hasClass('form-success')) {
                    $(this).removeClass('form-success');
                }

                if (vVal.length === 0 && requiredField) {
                    var name = $(this).attr('name');
                    var message = 'Заполните';

                    switch (name) {
                        case 'email-login' :
                            message += ' E-mail или логин!';
                            break;
                        case 'email' :
                            message += ' E-mail!';
                            break;
                        case 'pass' :
                            message += ' пароль!';
                            break;
                        case 'name' :
                            message += ' имя!';
                            break;
                        case 'surname' :
                            message += ' фамилию!';
                            break;
                        case 'phone' :
                            message += ' телефон!';
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
                        $(this).addClass('form-success');
                    } else {
                        $(this).val('').addClass('form-fail').attr('placeholder', 'Введите корректный E-mail!');
                        vResult = false;
                    }
                } else if ($(this).attr('name') === 'phone'  && requiredField && vVal.length) {
                    $(this).addClass('form-success');
                } else if ($(this).attr('name') === 'passCurr' && vVal.length) {
                    passCurr = this;
                } else if ($(this).attr('name') === 'passNew' && vVal.length) {
                    if (vVal === $(passCurr).val()) {
                        $(this).addClass('form-fail').attr('placeholder', 'Новый пароль, не должен совпадать с текущим!');
                        $(passCurr).addClass('form-fail').attr('placeholder', 'Новый пароль, не должен совпадать с текущим!');
                    } else {
                        $(this).addClass('form-success');
                        $(passCurr).addClass('form-success');
                    }
                }else if($(this).is('textarea') && vVal.length < 10 && vVal.length > 0  && requiredField) {
                    $(this).val('').attr('placeholder', 'Вопрос слишком короткий!').addClass('form-fail');
                    vResult = false;
                } else if (requiredField) {
                    $(this).addClass('form-success');
                }
            });
            return vResult;
        };
        FormController.prototype.resetForms = function (formContainer) {
            var $form;
            var self = this;

            if (formContainer.tagName === 'FORM') {
                $form = $(formContainer);
            } else {
                $form = $('form', $(formContainer));
            }

            $form.each(function () {
                self.resetPlaceholders(this);
                if (self._resetForm) {
                    this.reset();
                }
            });
        };
        FormController.prototype.resetPlaceholders = function (inputContainer) {
            var $input;

            if (inputContainer.tagName === 'INPUT') {
                $input = $(inputContainer);
            } else {
                $input = $('input[name != submit]', $(inputContainer));
            }

            $input.each(function () {
                var name = $(this).attr('name');

                $(this).removeClass('form-success');
                $(this).removeClass('form-fail');

                switch (name) {
                    case 'name':
                        $(this).attr('placeholder', 'Имя');
                        break;
                    case 'surname':
                        $(this).attr('placeholder', 'Фамилия');
                        break;
                    case 'email-login':
                        $(this).attr('placeholder', 'E-mail или логин');
                        break;
                    case 'email':
                        $(this).attr('placeholder', 'E-mail');
                        break;
                    case 'pass':
                        $(this).attr('placeholder', 'Пароль');
                        break;
                    case 'passCurr':
                        $(this).attr('placeholder', 'Текущий пароль');
                        break;
                    case 'passNew':
                        $(this).attr('placeholder', 'Новый пароль');
                        break;
                }
            });
        };
        FormController.prototype.formListeners = function (e) {
            var elem = e.target;

            if (!elem.matches(this._submitSelector)) return;

            e.preventDefault();

            var form = elem.closest('form');

            if (this.validateForm(form)) {
                this.sendRequest(form, this._resolve, this._reject, this._beforeSend);
            }
        };
        FormController.prototype.sendRequest = function (form, resolve, reject, beforeSend) {
            var formData = $(form).serializeArray(); //собираем все данные из формы
            var self = this;


            if (self._beforeSend) {
                self._beforeSend.call(this, formData, form);
            }
            //console.dir(formData);

            this.showPending(form);

            $.ajax({
                type: form.method,
                url: form.action,
                data: $.param(formData),
                success: function (response) {
                    self.hidePending(form);

                    if (response) {
                        self.showSuccess(form);

                        if (resolve) {
                            resolve.apply(self, [form, response]);
                        }
                    } else {
                        self.showError(form);

                        if (reject) {
                            reject.apply(self, [form, response]);
                        }
                    }

                    self.resetForms(form);
                },
                error: function (response) {
                    //throw new Error(response);

                    self.hidePending(form);
                    self.resetForms(form);
                    self.showError(form);
                }
            });
        };
        FormController.prototype.showError = function (form) {
            var $errBlock = $('.err-block', $(form));

            $('.form-success', $(form)).removeClass('form-success');
            $errBlock.fadeIn('normal');

            setTimeout(function () {
                $errBlock.fadeOut('normal');
            }, 10000);
        };
        FormController.prototype.showSuccess = function (form) {
            var $succBlock = $('.succ-block', $(form));

            $('.form-success', $(form)).removeClass('form-success');
            $succBlock.fadeIn('normal');

            setTimeout(function () {
                $succBlock.fadeOut('normal');
            }, 10000);
        };
        FormController.prototype.showPending = function (form) {
            var $pendingBlock = $('.pend-block', $(form));

            $pendingBlock.fadeIn('normal');
        };
        FormController.prototype.hidePending = function (form) {
            var $pendingBlock = $('.pend-block', $(form));

            $pendingBlock.fadeOut('normal');
        };

        var profileForm = new FormController({});
        profileForm.init();
    })();

    /*slider*/
    (function(){
    	$('.slider').slick({
            dots: true,
            infinite: true
        });
    })();




    


    /*some old script*/
    (function(){
        /* ---------------------------------------------- /*
         * Home BG
         /* ---------------------------------------------- */


        /*if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
         $('#home').css({'background-attachment': 'scroll'});
         } else {
         $('#home').parallax('50%', 0.1);
         }*/
    })();



});