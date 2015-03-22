/*
* heat.js
* MIT Licensed
* @author Mamod Mehyar
* http://sweefty.com
* version : 0.0.1
*/

(function($){
    "use strict";
    var _preventOnMouseEnter = false;
    var _SW_tooltip,_SW_tooltipClass;
    $(document).ready(function(){
        //initiate tooltip div
        _SW_tooltip = $('<div class="tinytip"></div>').css({
            width : 'auto',
            'max-width' : '90%',
            position : 'absolute',
            display : 'none',
            top : '0',
            left : '0',
            margin: '0',
            zIndex : '99999'
        }).appendTo('body');

        _SW_tooltip.on('mouseenter', function(){
            _preventOnMouseEnter = true;
        }).on('mouseleave', function(){
            _preventOnMouseEnter = false;
        });
    });
    
    var tooltip_options = {
        position : 'top',
        speed : 250,
        easing : 'linear',
        on: 'mouseenter',
        off : 'mouseleave'
    };

    var lastElement;
    var _isview = false;

    var _tooltip = function(ele,obj){
        obj = $.extend({},tooltip_options, obj);
        var text = obj.tooltip || ele.data('tooltip');
        var fix = obj.fix || '0 0';
        
        if (text || obj.content){
            var fixcoords = fix.split(' '),
            fixX = parseInt(fixcoords[0]),
            fixY = parseInt(fixcoords[1]);
            var _class = obj.addClass;
            var position = obj.position || 'top';
            var speed = parseInt(obj.speed);
            var startX = function(x){
                return x;
            }, startY = function(y){
                return y;
            };
            
            if (obj.animation){
                var xy = obj.animation.split('+');
                if (xy.length == 2){
                    xy.push('+');
                } else {
                    xy = [];
                    xy = obj.animation.split('-');
                    xy.push('-');
                }
                
                var val = parseInt(xy[1]);
                if (xy[0] == 'left'){
                    startX = function(x){
                        //var val = parseInt(xy[1]);
                        var newx = (xy[2] == '-') ? x-val : x+val;
                        return newx;
                    };
                } else {
                    startY = function(y){
                        var newy = (xy[2] == '-') ? y-val : y+val;
                        return newy;
                    };
                }
            }
            
            var start1,start2;
            var closeTooltip = function(e){
                e.preventDefault();
                setTimeout(function(){
                    if (_preventOnMouseEnter && obj.preventClose){
                        closeTooltip(e); 
                        return; 
                    }

                    if (!_isview){ return false; }

                    //e.preventDefault();
                    _SW_tooltip.stop().animate({
                        opacity: 0,
                        top:start1,
                        left:start2
                    }, speed, obj.easing, function(){
                        $(this).hide();
                        _isview = false;
                        if (obj.onClose && typeof obj.onClose === 'function'){
                            obj.onClose();
                        }
                        if (obj.clone){
                            obj.clone.remove();
                        }
                    });
                }, 60);
            };

            var viewTooltip = function(e){
                if (e){ e.preventDefault(); }
                if (_isview && obj.on === obj.off){
                    if (lastElement === ele){
                        closeTooltip(e);
                        return;
                    } else {
                        _isview = false;
                    }
                } else if (_isview && lastElement === ele){
                    return;
                }

                lastElement = ele;
                if (_SW_tooltipClass){
                    _SW_tooltip.removeClass(_SW_tooltipClass);
                }
                
                _SW_tooltipClass = _class;
                if (obj.content){
                    obj.clone = obj.content.clone();
                    _SW_tooltip.html(obj.clone);
                    obj.clone.show();
                } else if (text){
                    _SW_tooltip.html(text);
                }

                var top = ele.offset().top + fixY;
                var left = ele.offset().left + fixX;
                var width = ele.outerWidth();
                var height = _SW_tooltip.outerHeight();
                
                if (position == 'bottom'){
                    top = top + ele.outerHeight() + 2;
                    left = left + (width/2);
                    left = left - (_SW_tooltip.outerWidth()/2);
                } else if (position == 'left'){
                    left = left - _SW_tooltip.outerWidth() - 2;
                } else if (position == 'right'){
                    left = left + width + 2;
                } else {
                    left = left + (width/2);
                    left = left - (_SW_tooltip.outerWidth()/2);
                    top = top - height - 2;
                } 
                
                start1 = parseFloat(startY(top));
                start2 = parseFloat(startX(left));
                _SW_tooltip.addClass(_class).stop().css({
                    top : start1,
                    left : start2,
                    opacity: 0,
                    display : ''
                }).animate({ opacity: 1, top:top, left:left}, speed, obj.easing, function(){
                    _isview = true;
                    if (obj.onLoad && typeof obj.onLoad === 'function'){
                        obj.onLoad(obj.clone || _SW_tooltip.find('p'));
                    }
                });
            };

            ele.on(obj.on, function(e){
                viewTooltip(e);
            }).on( obj.off, function(e){
                closeTooltip(e);
            });
        }
    };
    
    //jQuery custom functions
    $.fn.tinytip = function(text, customOptions) {
        if (text && typeof text === 'object'){
            customOptions = text;
            text = customOptions.tooltip;
        }
        
        var options = $.extend({}, tooltip_options, customOptions);
        options.tooltip = text;
        return this.each(function(){
            var $this = $(this);
            if ($this[0] == $(document)[0]){
                tooltip_options = $.extend({}, tooltip_options, text);
            } else {
                _tooltip($this, options);
            }
        });
    };
}(jQuery));
