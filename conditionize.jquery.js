(function($) {
  $.fn.conditionize = function(options) {

    var settings = $.extend({
        hideJS: true
    }, options );

    $.fn.eval = function(valueIs, valueShould, operator) {
      switch(operator) {
        case '==':
            return valueIs == valueShould;
            break;
        case '!=':
            return valueIs != valueShould;
        case '<=':
            return valueIs <= valueShould;
        case '<':
            return valueIs < valueShould;
        case '>=':
            return valueIs >= valueShould;
        case '>':
            return valueIs > valueShould;
        case 'in':
            return valueIs !== '' && valueShould.includes(valueIs);
      }
    }

    $.fn.showOrHide = function(listenTo, listenFor, operator, $section) {
      if ($(listenTo).is('select, input[type=text]') && $.fn.eval($(listenTo).val(), listenFor, operator)) {
        $section.slideDown();
      }
      else if ($(listenTo + ":checked").filter(function(idx, elem){return $.fn.eval(elem.value, listenFor, operator);}).length > 0) {
        $section.slideDown();
      }
      else {
        $section.slideUp();
        $section.find('select, input').each(function(){
            if ( ($(this).attr('type')=='radio') || ($(this).attr('type')=='checkbox') ) {
                $(this).prop('checked', false).trigger('change');
            }
            else{
                $(this).val('').trigger('change');
            }
        });
      }
    }

    return this.each( function() {
      var cleanSelector = $(this).data('cond-option').toString().replace(/(:|\.|\[|\]|,)/g, "\\$1");
      var listenTo = (cleanSelector.substring(0,1)=='#'?cleanSelector:"[name=" + cleanSelector + "]");
      var listenFor = $(this).data('cond-value');
      var operator = $(this).data('cond-operator') ? $(this).data('cond-operator') : '==';
      var $section = $(this);

      //Set up event listener
      $(listenTo).on('change', function() {
        $.fn.showOrHide(listenTo, listenFor, operator, $section);
      });
      //If setting was chosen, hide everything first...
      if (settings.hideJS) {
        $(this).hide();
      }
      //Show based on current value on page load
      $.fn.showOrHide(listenTo, listenFor, operator, $section);
    });
  }
}(jQuery));
