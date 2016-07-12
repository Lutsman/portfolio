;(function ($) {
    $(document).ready(function () {
        var acc = {
            defaults: {
                mainBlockClass: 'acc-main-block',
                blockClass: 'acc-block',
                panelClass: 'acc-panel',
                nestedPadding: 0,
                beforeAction: null, //context == panel
                afterAction: null //context == panel
            },
            options: {},
            init: function ($base, userOptions) {
                $.extend(this.options, this.defaults, userOptions);

                this.setLayout($base);
                this.bindBlockLogick($base);
                this.bindBlockLogick($('.' + this.options.blockClass, $base));

            },
            setLayout: function ($block) {
                var self = this;
                var nestedLevel = 1;
                var $panel = $block.children('li').has('ul');

                if(arguments.length > 1) {
                    nestedLevel = arguments[1];
                } else {
                    $block.addClass(self.options.mainBlockClass + ' ' + self.options.blockClass);
                }

                $panel.each(function () {
                    var $nestedBlock = $(this).children('ul');
                    var $nestedLink = $nestedBlock.children('li').children('a');

                    $(this).addClass(self.options.panelClass);
                    $nestedBlock.addClass(self.options.blockClass);
                    $nestedLink.css('padding-left', parseFloat($nestedLink.css('padding-left')) + (nestedLevel * self.options.nestedPadding) + 'px');

                    self.setLayout($nestedBlock, nestedLevel + 1);
                });
            },
            bindBlockLogick: function ($block) {
                var self = this;

                $block.each(function () {
                    var $panels = $(this).children('.' + self.options.panelClass);

                    self.preventBubles($(this));

                    $panels.click(function (e) {
                        e.preventDefault();

                        $(this).toggleClass('active');

                        self.hasFuncRun(self.options.beforeAction, this);

                        if($(this).hasClass('active')){
                            $(this).children('ul').slideDown('fast', 'swing', function () {
                                self.hasFuncRun(self.options.afterAction, this);
                            });

                        } else {
                            $(this).children('ul').slideUp('fast', 'swing', function () {
                                self.hasFuncRun(self.options.afterAction, this);
                            });
                        }

                        $panels.not(this).each(function () {
                            if($(this).hasClass('active')) {
                                $(this).removeClass('active').children('ul').slideUp('fast');
                            }
                        });
                    });
                });
            },
            preventBubles: function ($block) {
                $block.click(function (e) {
                    e.stopPropagation();
                });

                $block.children().click(function (e) {
                    e.stopPropagation();
                })
            },
            hasFuncRun: function (func, context, arg) {
                var result = func !== null;

                if(result) {
                    func.apply(context, arg);
                }

                return result;
            }
        };

        $.fn.accOM = function (userOptions) {
            return $(this).each(function () {
                var accCopy = $.extend({}, acc);

                accCopy.init($(this), userOptions);
            });
        }
    });
})(jQuery);
