(function($) {
  $.fn.conditionize = function(options){ 
    
     var settings = $.extend({
        hideJS: true
    }, options );
    
    $.fn.showOrHide = function(listenTo, listenFor, $section) {
      if ($(listenTo).is('select, input[type=text]') && $(listenTo).val() == listenFor ) {
        $section.slideDown();
      }
      else if ($(listenTo + ":checked").filter(function(idx, elem){return elem.value == listenFor);}).length > 0) {
        $section.slideDown();
      }
      else {
        $section.slideUp();
      }
    } 

    return this.each( function() {
      var listenTo = "[name=" + $(this).data('cond-option').replace( /(:|\.|\[|\]|,)/g, "\\$1" ) + "]";
      var listenFor = $(this).data('cond-value');
      var $section = $(this);
  
      //Set up event listener
      $(listenTo).on('change', function() {
        $.fn.showOrHide(listenTo, listenFor, $section);
      });
      //If setting was chosen, hide everything first...
      if (settings.hideJS) {
        $(this).hide();
      }
      //Show based on current value on page load
      $.fn.showOrHide(listenTo, listenFor, $section);
    });
  }
}(jQuery));
