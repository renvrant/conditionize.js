/* jquery - flexible conditionize - v1.2 - https://github.com/rguliev/conditionize.js - by Rustam Guliev at 2018-11-30*/
(function($) {
  $.fn.conditionize = function(options) {

    var settings = $.extend({
        hideJS: true
    }, options );

    $.fn.showOrHide = function(is_met, $section) {
      if (is_met) {
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
      var $section = $(this);
      var cond = $(this).data('condition');
      // This is a regex suffix that will make sure that the string is not inside quotes
      var ifNotInQuotes = "(?:(?=([^\"]*\"[^\"]*\")*[^\"]*$)(?=([^']*'[^']*')*[^']*$))";
      // First get all (distinct) used field/inputs
      var re = new RegExp("(#?[0-9a-z-_]*[a-z][0-9a-z-_]*)" + ifNotInQuotes, 'gi');
      var match = re.exec(cond);
      var inputs = {}, e = "", name ="", tmp_re = "";
      while(match !== null) {
        name = match[1];
        e = (name.substring(0,1)=='#' ? name : "[name=" + name + "]");
        if ( $(e).length && ! (name in inputs) ) {
            inputs[name] = e;
        }
        match = re.exec(cond);
      }
      
      // Replace fields names/ids by $().val()
      for (name in inputs) {
        e = inputs[name];
        tmp_re = new RegExp("(" + name + ")\\b" + ifNotInQuotes, 'g')
        if ( ($(e).attr('type')=='radio') || ($(e).attr('type')=='checkbox') ) {
          cond = cond.replace(tmp_re,"$('" + e + ":checked').val()");
        }
        else {
          cond = cond.replace(tmp_re,"$('" + e + "').val()");
        }
      }
      
      //Set up event listeners
      for (name in inputs) {
        $(inputs[name]).on('change', function() {
          $.fn.showOrHide(eval(cond), $section);
        });
      }

      //If setting was chosen, hide everything first...
      if (settings.hideJS) {
        $(this).hide();
      }
      //Show based on current value on page load
      $.fn.showOrHide(eval(cond), $section);
    });
  }
}(jQuery));
