/*
SkinDrop - Skin your dropdown
Works for IE9, FF13, Chrome19
By: Chonla
Create Date: 15 June 2012
URL: http://blog.chonla.com
Revision: 2012.06.16.10.00
*/

(function($) {
	$.fn.skindrop = function(options)
	{
		var defaults = {
			triggerText : '',
			onItemSelected : null,
			onReady : null,
			onFold : null,
			onUnfold : null,
			className : ''
		};
		options = $.extend(defaults, options);
		id = 0;
		this.each(function() {
			// create a new id
			ctrl_id = 'skindrop_ctrl_'+id++;

			// assign uid to control
			$(this).attr('skindrop_id', ctrl_id).addClass(options.className);

			// build up drop wrapper
			drop_wrap = $('<div class="skindrop_wrapper"></div>').addClass(options.className).attr('skindrop_id', ctrl_id);

			// build up the text holder
			txt = $('option:selected', this).html();
			idx = $('option:selected', this).index();
			txt_wrap = $('<div class="skindrop_txt_wrapper"></div>').addClass(options.className).attr('skindrop_id', ctrl_id).html(txt);

			// build up the trigger
			trigger = $('<div class="skindrop_trigger"></div>').addClass(options.className).attr('skindrop_id', ctrl_id).html(options.triggerText);

			// build up the list
			opt_wrap = $('<div class="skindrop_opt_wrapper"><ul></ul></div>').addClass(options.className).attr('skindrop_id', ctrl_id).css({'position':'relative','clear':'both'}).hide();
			opt_wrap_ul = opt_wrap.find('ul');
			$('option', this).each(function(i) {
				selected = (idx==i)?' skindrop_selected':'';
				opt_wrap_ul.append('<li class="skindrop_opt'+selected+'" value="'+$(this).val()+'">'+$(this).html()+'</li>');
			});

			// attach to page
			drop_wrap.append(txt_wrap).append(trigger).append(opt_wrap);
			$(this).before(drop_wrap).appendTo(drop_wrap).hide();
		});

		// bind events
		$('.skindrop_trigger, .skindrop_txt_wrapper').live('click', function(){
			active_id = $(this).attr('skindrop_id');

			$('.skindrop_wrapper[skindrop_id="'+active_id+'"]').toggleClass('unfold');

			// toggle dropdown
			if ($('.skindrop_opt_wrapper[skindrop_id="'+active_id+'"]').is(':visible')) {
				$('.skindrop_opt_wrapper[skindrop_id="'+active_id+'"]').hide();
				if ($.isFunction(options.onFold)) {
					options.onFold(this);
				}
			} else {
				p = $('.skindrop_wrapper[skindrop_id="'+active_id+'"]').position();
				h = $('.skindrop_wrapper[skindrop_id="'+active_id+'"]').height();
				w = $('.skindrop_wrapper[skindrop_id="'+active_id+'"]').width();
				bt = parseInt($('.skindrop_wrapper[skindrop_id="'+active_id+'"]').css('border-top-width'), 10);
				bb = parseInt($('.skindrop_wrapper[skindrop_id="'+active_id+'"]').css('border-bottom-width'), 10);

				if (isNaN(bt)) bt = 0;
				if (isNaN(bb)) bb = 0;

				$('.skindrop_opt_wrapper[skindrop_id="'+active_id+'"]').css({"left":"0px"}).show();
				if ($.isFunction(options.onUnfold)) {
					options.onFold(this);
				}
			}
		});

		$('.skindrop_opt').live('click', function(){
			active_id = $(this).addClass('skindrop_selected').parents('div.skindrop_opt_wrapper').attr('skindrop_id');

			$('.skindrop_wrapper[skindrop_id="'+active_id+'"]').toggleClass('unfold');

			// update selected item
			clicked_idx = $(this).index();
			$('select[skindrop_id="'+active_id+'"]').prop('selectedIndex',clicked_idx);
			$(this).parents('ul').find('li:not(:eq('+clicked_idx+'))').removeClass('skindrop_selected');

			// update text displayed
			$('div.skindrop_txt_wrapper[skindrop_id="'+active_id+'"]').html($('option:selected', 'select[skindrop_id="'+active_id+'"]').html());

			$(this).addClass('skindrop_selected').parents('div.skindrop_opt_wrapper').hide();

			if ($.isFunction(options.onItemSelected)) {
				options.onItemSelected(this);
			}

			if ($.isFunction(options.onFold)) {
				options.onFold(this);
			}
		});

		if ($.isFunction(options.onReady)) {
			options.onReady($('.skindrop_wrapper'));
		}
	};
})(jQuery);
