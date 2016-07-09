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

    /* ScrollUp button */
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

    (function(){
        /*document.documentElement.addEventListener('scroll', function (e) {
            var elem = Array.prototype.slice.call(document.querySelectorAll('.chart'));


        });*/

        $(window).on('scroll', function (e) {
            var $elem = $('.chart:not(.activated)');

            $elem.each(function () {
                var coords = this.getBoundingClientRect();

                if(coords.bottom <= document.documentElement.clientHeight) {
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

        /*$('.chart').each(function(){
            $(this).easyPieChart({
                size: 200,
                animate: 2000,
                lineCap: 'butt',
                scaleColor: false,
                barColor: '#FF5252',
                trackColor: 'transparent',
                lineWidth: 10
            });
        });*/
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