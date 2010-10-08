(function($) {
    /* 
    fillDropDown plugin 
    fills a drop down box with options, expects a json array of data with a value and text field for every element
    */
    $.fn.fillDropDown = function(options) {
        return this.each(function() {
            var htmlChunk = '';
            var i;
            for (i = 0; i < options.length; i++) {
                htmlChunk = '<option value="' + options[i].value + '">' + options[i].text + '</option>';
                $(this).append(htmlChunk);
            }
        });
    };

    /* 
    enable plugin 
    enables the selected html input elements
    */
    $.fn.enable = function(options) {
        return this.each(function() {
            $(this).attr('disabled', null);
        });
    };

    /* 
    disable plugin 
    disables the selected html input elements
    */
    $.fn.disable = function(options) {
        return this.each(function() {
            $(this).attr('disabled', 'disabled');
        });
    };

    /* 
    animate form submit button
    */
    $.fn.disableWithAnimation = function(options) {
        var defaults = {
            cssClass: 'ajax-loader',
            message: 'Processing..',
            template: function(message, cssClass) { return '<span class="' + cssClass + '">' + message + '</span>'; }
        };
        var opt = $.extend(defaults, options, {});
        return this.each(function() {
            if (opt['stop']) {
                //code to reset the animation
                $(this).enable();
                $(this).next().remove();
            } else {
                $(this).disable().after(opt['template'](opt['message'], opt['cssClass']));
            }
        });
    };

    /* 
    allKeys()
    gives an array of css classes on the current element
    */
    $.fn.allKeys = function(key) {
        var result = [];
        this.each(function(x) {
            var val = $(this).metadata()[key];
            result.push(val);
        });
        return result;
    };


    /* 
    classes()
    gives an array of css classes on the current element
    */
    $.fn.classes = function() {
        return this.attr('class').split(/\s+/);
    };


} (jQuery));
