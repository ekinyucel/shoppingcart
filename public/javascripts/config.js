$(function() {
  $('.collapse').on('show.bs.collapse', function() {
    var toggle = $('[data-target="#' + this.id + '"]');
    if (toggle) {
      var parent = toggle.attr('data-parent');
      if (parent) {
        $(parent).find('.collapse.in').collapse('hide');
      }
    }
  });

  $('#slide-submenu').on('click',function() {			        
        $(this).closest('.list-group').fadeOut('slide',function(){
        	$('.mini-submenu').fadeIn();	
        });
        
      });

	$('.mini-submenu').on('click',function(){		
        $(this).next('.list-group').toggle('slide');
        $('.mini-submenu').hide();
	})
})
