import elrUtlities from 'elr-utility-lib';
const $ = require('jquery');

let elr = elrUtlities();

// if (!Number.isNan) {
//     Number.isNan = function(num) {
//         return num !== num;
//     };
// }

const elrUI = function() {
    const self = {
        getListValues($list) {
            let values = [];

            elr.each($list, function(k,v) {
                values.push(elr.trim($(v).text()).toLowerCase());

                return values;
            });

            return values;
        },
        getFormData($form) {
            // get form data and return an object
            // need to remove dashes from ids
            let formInput = {};
            let $fields = $form.find(':input').not('button').not(':checkbox');
            let $checkboxes = $form.find('input:checked');

            if ($checkboxes.length !== 0) {
                let boxIds = [];

                $checkboxes.each(function() {
                    boxIds.push($(this).attr('id'));
                });

                boxIds = self.unique(boxIds);

                self.each(boxIds, function() {
                    let checkboxValues = [];
                    let $boxes = $form.find(`input:checked#${this}`);

                    $boxes.each(function() {
                        checkboxValues.push(self.trim($(this).val()));
                    });

                    formInput[this] = checkboxValues;
                    return;
                });
            }

            self.each($fields, function() {
                let $that = $(this);
                let id = $that.attr('id');
                let formInput = [];
                let input;

                if (self.trim($that.val()) === '') {
                    input = null;
                } else {
                    input = self.trim($that.val());
                }

                if (input) {
                    formInput[id] = input;
                }

                return;
            });

            return formInput;
        },
        // wrapper for creating jquery objects
        createElement(tagName, attrs = {}) {
            return $(`<${tagName}></${tagName}>`, attrs);
        },
        toTop($content, speed) {
            $content.stop().animate({
                'scrollTop': $content.position().top
            }, speed, 'swing');
        },
        killEvent($el, eventType, selector = null) {
            if (selector === null) {
                $el.on(eventType, function(e) {
                    e.stopPropagation();
                });
            }

            $el.on(eventType, selector, function(e) {
                e.stopPropagation();
            });
        },
        // scrollEvent($el, offset, cb) {
        //     // TODO: finish thie function
        //     if ($(document).scrollTop() > $(window).height()) {
        //         cb();
        //     }
        // },
        scrollSpy($nav, $content, el, activeClass) {
            const scroll = $(document).scrollTop();
            const $links = $nav.find('a[href^="#"]');
            const positions = this.findPositions($content, el);

            this.each(positions, function(index, value) {
                if (scroll === 0) {
                    $nav.find(`a.${activeClass}`).removeClass(activeClass);
                    $links.eq(0).addClass(activeClass);
                } else if (value < scroll) {
                    // if value is less than scroll add activeClass to link with the same index
                    $nav.find(`a.${activeClass}`).removeClass(activeClass);
                    $links.eq(index).addClass(activeClass);
                }
            });
        },
        getPosition(height, $obj) {
            if (height > 200) {
                return $obj.position().top - ($obj.height() / 4);
            }

            return $obj.position().top - ($obj.height() / 2);
        },
        findPositions($content, el) {
            const $sections = $content.find(el);
            const positions = [];

            // populate positions array with the position of the top of each section element
            $sections.each(function(index) {
                const $that = $(this);
                const length = $sections.length;
                let position;

                // the first element's position should always be 0
                if (index === 0) {
                    position = 0;
                } else if (index === (length - 1)) {
                    // subtract the bottom container's full height so final scroll value is equivalent
                    // to last container's position
                    position = self.getPosition($that.height, $that);
                } else {
                    // for all other elements correct position by only subtracting half of its height
                    // from its top position
                    position = $that.position().top - ($that.height() / 4);
                }

                // correct for any elements _that may have a negative position value

                if (position < 0) {
                    positions.push(0);
                } else {
                    positions.push(position);
                }
            });

            return positions;
        },
        // forces link to open in a new tab
        openInTab($links) {
            $links.on('click', function(e) {
                e.preventDefault();
                window.open($(this).attr('href'), '_blank');
            });
        },
        isMobile(mobileWidth = 568) {
            return ($(window).width() <= mobileWidth) ? true : false;
        },
        // assigns a random class to an element.
        // useful for random backgrounds/styles
        randomClass($el, classList = []) {
            this.each(classList, function(index, value) {
                $el.removeClass(value);
            });

            $el.addClass(classList[Math.floor(Math.random() * classList.length)]);
        },
        // smooth scroll to section of page
        // put id of section in href attr of link
        gotoSection() {
            const section = $(this).attr('href').split('#').pop();

            $('body, html').stop().animate({
                'scrollTop': $(`#${section}`).position().top
            });

            return false;
        },
        scrollToView($el, speed = 300) {
            const showElement = function(speed) {
                const scroll = $(document).scrollTop();
                const height = $(window).height();

                if (scroll > height) {
                    $el.fadeIn(speed);
                } else if (scroll < height) {
                    $el.fadeOut(speed);
                }
            };

            $(window).on('scroll', elr.throttle(showElement, 100));
        },
        clearElement($el, speed = 300) {
            $el.fadeOut(speed, function() {
                $(this).remove();
            });
        },
        clearForm($fields) {
            $fields.each(function() {
                let $that = $(this);
                if ($that.attr('type') === 'checkbox') {
                    $that.prop('checked', false);
                } else {
                    $that.val('');
                }
            });
        }
    };

    return self;
};

export default elrUI;