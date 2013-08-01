;(function($){
	var settings, status;
	var Status = {
		CLOSE: 0,
		OPEN: 1,
		IN_PROGRESS: 2
	};
	var smY, sfY, mfY;


	function _open() {
		status = Status.OPEN;
		$(settings.menu + ", " + settings.main_contents).addClass('show');
		$(settings.menu_contents).show();
		$("html, body").css("overflow-x", "hidden");
		$("html").bind("touchmove.scrollContents", function() {
			event.preventDefault();
		});
		event.preventDefault();
	};

	function _close() {
		status = Status.IN_PROGRESS;
		$(settings.menu + ", " + settings.main_contents).removeClass('show');
		$("html").unbind("touchmove.scrollContents");
		event.preventDefault();
	};

	function _buttonTouchStart() {
		switch(status) {
			case Status.IN_PROGRESS:
				status = Status.CLOSE;
				break;

			case Status.OPEN:
				_close();
				break;

			case Status.CLOSE:
				break;
		}
	}

	function _buttonTouchEnd() {
		switch(status) {
			case Status.IN_PROGRESS:
				status = Status.CLOSE;
				break;

			case Status.OPEN:
				break;

			case Status.CLOSE:
				_open();
				break;
		}
	};

	function _bodyTouchStart() {
		switch(status) {
			case Status.IN_PROGRESS:
			case Status.CLOSE:
				break;

			case Status.OPEN:
				_close();
				break;
		}
	}

	$.fn.slideMenu = function(options) {
		settings = $.extend({}, $.fn.slideMenu.defaults, options);
		status = Status.CLOSE;
		var button_selector = this.selector;

		smY = 0;

		$(document).ready(function() {
			var menu_list_height;

			// hide address bar
			window.onload = function(){
			     setTimeout("scrollTo(0,1)", 100);
			}

			//menu button - touchstart
			$(button_selector).bind("touchstart.menu_button", function() {
				_buttonTouchStart();
			});

			//menu button - touchend
//			$(button_selector).bind("touchend.menu_button"  , function() {
			$(button_selector).bind("click"  , function() {
				_buttonTouchEnd();
			});

			//main contents
			$(settings.main_contents).bind("touchstart.main_contents", function() {
				_bodyTouchStart();
			});

/*
			//scroll - touchStart
			$(settings.menu_contents).bind("touchstart.scrollMenu", function() {
				menu_list_height = $(settings.menu_list).height();
				sfY = event.touches[0].screenY;

			});

			//scroll - touchMove
			$(settings.menu_contents).bind("touchmove.scrollMenu", function() {
				mfY = event.changedTouches[0].screenY;
				var moveY = smY + mfY - sfY;

				if(moveY > 0) moveY = 0;
				if(screen.height > menu_list_height) {
					moveY = 0;
				}
				else if(screen.height - menu_list_height > moveY + settings.bottom_margin) {
					moveY = screen.height - menu_list_height - settings.bottom_margin;
				}
				$(this).css({
					"transition": "-moz-transform 0ms ease-in-out 0s",
					'-webkit-transform':'translate3d(0px,'+ moveY +'px,0px)',
				});
			});

			//scroll - touchEnd
			$(settings.menu_contents).bind("touchend.scrollMenu", function() {
				smY = smY + (mfY - sfY);
				if(smY > 0) smY = 0;
				if(screen.height > menu_list_height) {
					smY = 0;
				}
				else if(screen.height - menu_list_height > smY + settings.bottom_margin) {
					smY = screen.height - menu_list_height - settings.bottom_margin;
				}
			});
*/
			var count = 0;
			var mflag = false;
			var timer = '500';

			$(settings.menu_list).bind({
			    'touchstart.scrollMenu mousedown': function(e) {
					menu_list_height = $(settings.menu_list).height();
					sfY = event.touches[0].screenY;
			    },
			    'touchmove.scrollMenu mousemove': function(e) {
					mfY = event.changedTouches[0].screenY;
					var moveY = smY + mfY - sfY;
					mflag = false;

					moveY = moveY * 1;
					if(moveY > 0){
						mflag = true;
						moveY_b = 0;
					}else if(screen.height > menu_list_height) {
						moveY = 0;
					}else if(screen.height - menu_list_height > moveY + settings.bottom_margin) {
						mflag = true;
						moveY_b = screen.height - menu_list_height - settings.bottom_margin;
					}

					// moving
					$(this).css({
						"-webkit-transition": "all "+timer+"ms cubic-bezier(0.075, 0.82, 0.165, 1)",
						'-webkit-transform':'translate3d(0px,'+ moveY +'px,0px)',
					});

				    $("#moveY").html(moveY);

			    },
			    'touchend.scrollMenu mouseup': function(e) {
					smY = smY + (mfY - sfY);
					if(smY > 0) smY = 0;
					if(screen.height > menu_list_height) {
						smY = 0;
					}
					else if(screen.height - menu_list_height > smY + settings.bottom_margin) {
						smY = screen.height - menu_list_height - settings.bottom_margin;
					}

					if(mflag){
					$(this).css({
						"-webkit-transition": "all "+timer+"ms cubic-bezier(0.075, 0.82, 0.165, 1)",
						'-webkit-transform':'translate3d(0px,'+ moveY_b +'px,0px)',
					});
					}


				    $("#screenheight").html(screen.height);
				    $("#menu_list_height").html(menu_list_height);
				    $("#smY").html(smY);
				    $("#mfY").html(mfY);
				    $("#sfY").html(sfY);

			    }
			});

		});
	};

	$.fn.slideMenu.defaults = {
		main_contents: "#main_contents",
		menu: "#slidemenu",
		menu_contents: "#slidemenu_contents",
		menu_list: "#slidemenu_list",
		speed: 200,
		width: 240,
		bottom_margin: 80// bottom bar height.
	};

})(jQuery);