(function($) {
  $.fn.conditionize = function(){ 
    
    $.fn.showOrHide = function(listenTo, listenFor, $section) {
      if ($(listenTo + ":checked").val() == listenFor) {
        $($section).slideDown();
      }
      else {
        $($section).slideUp();
      }
    } 

    return this.each( function() {
      var listenTo = "[name=" + $(this).data('cond-option') + "]";
      var listenFor = $(this).data('cond-value');
      var $section = $(this);
  
      //Set up event listener
      $(listenTo).on('change', function() {
        $.fn.showOrHide(listenTo, listenFor, $section);
      });
      //Show based on current value on page load
      $.fn.showOrHide(listenTo, listenFor, $section);
    });
  }
}(jQuery));
