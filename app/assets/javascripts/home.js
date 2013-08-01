var productionAddress = /icarsclub.com$/;
if (productionAddress.test(window.location.host)) {
	// google analytics
	// show only on production server
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-35276548-1']);
	_gaq.push(['_setDomainName', 'icarsclub.com']);
	_gaq.push(['_trackPageview']);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
}

var WEB_ROOT = '/';
$(function() {
	$('.dropdown-toggle').dropdown(); 
   
  $('#dropdown-login').click(function(e) {
    e.stopPropagation();
  });
  
	$('.bxslider').bxSlider({
		speed : 1500,
		easing : 'ease-in-out',
		infiniteLoop : true,
		minSlides : 1,
		maxSlides : 4,
		slideWidth : 230,
		slideMargin : 10,
		touchEnabled : true,
		controls : false,
		auto : true,
		autoControls : false,
		pause : 8000,
		autoHover : true,
		randomStart : true,

	});

	$('#featured-on').bxSlider({
		speed : 1000,
		easing : 'linear',
		infiniteLoop : true,
		minSlides : 3,
		maxSlides : 3,
		slideWidth : 300,
		slideMargin : 10,
		touchEnabled : true,
		controls : true,
		auto : true,
		autoControls : false,
		pause : 12000,
		autoHover : true,
	});
	$('.bxslider').removeClass('hide');
	$('#featured-on').removeClass('hide');
	
  $("#identify_form :input").tooltip();

  $('input[name=date_start]').live('change', function() {
    var start = $(this);
    var end = $('input[name=date_end]');
    if (start.val() > end.val()) {
      end.val(start.val());
    } else {
      var start_obj = new Date(start.val());
      var end_obj = new Date(end.val());
      if (end_obj.getTime() - start_obj.getTime() > 7 * 24 * 3600 * 1000) {
        end_obj.setTime(start_obj.getTime() + 7 * 24 * 3600 * 1000);
        var mon = end_obj.getMonth() + 1;
        var day = end_obj.getDate();
        if (mon < 10) {
          mon = '0' + mon;
        }
        if (day < 10) {
          day = '0' + day;
        }
        end.val(end_obj.getFullYear() + '-' + mon + '-' + day);
      }

      if (end_obj.getTime() - start_obj.getTime() >= 24 * 3600 * 1000) {
        $('select[name=end]').val($('select[name=begin]').val());
      }
    }
  });

  $('input[name=date_end]').live('change', function() {
    var start = $('input[name=date_start]');
    var end = $(this);
    if (start.val() > end.val()) {
      start.val(end.val());
    } else {
      var start_obj = new Date(start.val());
      var end_obj = new Date(end.val());
      if (end_obj.getTime() - start_obj.getTime() > 7 * 24 * 3600 * 1000) {
        start_obj.setTime(end_obj.getTime() - 7 * 24 * 3600 * 1000);
        var mon = start_obj.getMonth() + 1;
        var day = start_obj.getDate();
        if (mon < 10) {
          mon = '0' + mon;
        }
        if (day < 10) {
          day = '0' + day;
        }
        start.val(start_obj.getFullYear() + '-' + mon + '-' + day);
      }

      if (end_obj.getTime() - start_obj.getTime() >= 24 * 3600 * 1000) {
        $('select[name=end]').val($('select[name=begin]').val());
      }
    }
  });


	jQuery('#sign_up_form #input-email').focus(function() {
		$("#input-email ~ img[alt*=alid]").attr("alt", "Invalid").hide();
		$(this).parents('.control-group').removeClass('error');
		$(this).siblings('p.help-block').hide();
	});

	jQuery('#sign_up_form #input-email').blur(function(event) {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var email = jQuery(this).val();
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (email == '' || !regex.test(email)) {
			$("#input-email ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png').attr("alt", "Invalid").css("display", "inline");
			return;
		}
		$("#input-email ~ img[alt*=alid]").attr("alt", "Invalid").hide();
		jQuery('#email-vcode-ajax-loader').show();
		//jQuery('#send-vcode').addClass('hide');
		var obj = jQuery('#input-email');
		jQuery.ajax({
			url : '/account/verify-email?' + new Date().getTime(),
			data : {
				email : email
			},
			dataType : 'text',
			success : function(data) {
				if (data == 1) {
					jQuery('#email-vcode-ajax-loader').hide();
					$("#input-email ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-valid.png').attr("alt", "Valid").css("display", "inline");
					obj.parents('.control-group').removeClass('error');
					obj.siblings('p.help-block').hide();
					//jQuery('#vcode-hint').fadeIn();
				} else if (data == 2) {
					jQuery('#email-vcode-ajax-loader').hide();
					if (obj.siblings('p.help-block').length == 0) {
						obj.parent().append('<p class="help-block">Email is already taken.</p>');
					} else {
						obj.siblings('p.help-block').show();
					}
					obj.parents('.control-group').addClass('error');
					$("#input-email ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png').attr("alt", "Invalid").css("display", "inline");
				} else {
					jQuery('#email-vcode-ajax-loader').hide();
					//jQuery('#send-vcode').removeClass('hide');
				}
			},
			error : function() {
				jQuery('#email-vcode-ajax-loader').hide();
				//jQuery('#send-vcode').removeClass('hide');
			}
		});
	});

	jQuery('#sign_up_form').liveValidation({
		validIco : WEB_ROOT + 'static/img/jquery.liveValidation-valid.png',
		invalidIco : WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png',
		required : ['input-email', 'input-password', 'input-displayname'], //<927modify/>
		fields : {
			'input-password' : /\S{6}/,
			'input-displayname' : /^\S.*$/
		}
	});

	jQuery('#resetpw_form').liveValidation({
		validIco : WEB_ROOT + 'static/img/jquery.liveValidation-valid.png',
		invalidIco : WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png',
		required : ['input-password'],
		fields : {
			'input-password' : /\S{6}/
		}
	});
	jQuery('#fuel_form').liveValidation({
		validIco : WEB_ROOT + 'static/img/jquery.liveValidation-valid.png',
		invalidIco : WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png',
		required : ['identity_name', 'identity_nric', 'identity_address', 'licence_no'],
		fields : {
			identity_name : /^\S.*$/,
			identity_nric : /^\S.*$/,
			identity_address : /^\S.*$/,
			licence_no : /^[A-Z0-9]+$/
		}
	});
	jQuery('#identity_form').liveValidation({
		validIco : WEB_ROOT + 'static/img/jquery.liveValidation-valid.png',
		invalidIco : WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png',
		required : ['identity_name', 'identity_nric', 'identity_address', 'identity_dri_ex', 'identity_occupation', 'identity_demerit_points'],
		fields : {
			identity_name : /^\S.*$/,
			identity_nric : /^\S.*$/,
			identity_address : /^\S.*$/,
			identity_dri_ex : /^\S.*$/,
			identity_occupation : /^\S.*$/,
			identity_demerit_points : /^\d{1,2}$/
		}
	});

	jQuery("#input-password2").keyup(function() {
		var psw = jQuery("#input-password").val();
		if (psw.length > 5 && this.value == psw) {
			$("#input-password2 ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-valid.png').attr("alt", "Valid").css("display", "inline");
		} else {
			$("#input-password2 ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png').attr("alt", "Invalid").css("display", "inline");
		}
	});

	jQuery("#input-password2").focus(function() {
		var img_obj = $("img", $(this).parent());
		if (img_obj.attr("alt") == "Invalid") {
			img_obj.css("display", "none");
		}
	});
	jQuery("img[alt='Invalid']").each(function() {
		var input_value = jQuery("input", jQuery(this).parent()).val();
		if (input_value == "")
			this.style.display = "none";
	});

	jQuery("#phone").blur(function() {
		var regex = /^(8|9)[0-9]{7}$/;
		if (!regex.test(this.value)) {
			jQuery("#error_p").css("display", "inline");
			//<927modify/>
			return false;
		}
		return true;
	});

	jQuery("#phone").click(function() {
		jQuery("#error_p").css("display", "none");
		//<927modify/>
	});

	jQuery("#verify_form").submit(function() {
		if (jQuery("#error_p").css("display") == "block") {
			return false;
		}
	});
	//jQuery("#previousurl").val(  document.referrer ); //<929modify/>
	//<927modify>
	/*
	 jQuery("#identify_form input[type='file']").blur(function(){
	 var parent_obj = jQuery(this).parent();
	 if( !jQuery( "p", parent_obj )[0] ){
	 jQuery("div" , parent_obj).append("<p class='text-error' style='margin-left:0;display:none;'>Please enter file.</p>");
	 }

	 var p_obj = jQuery("p", parent_obj);
	 if( this.value == "" )
	 p_obj.css("display", "inline").removeClass("fvalid").addClass("finvalid");
	 else
	 p_obj.css("display", "none").removeClass("finvalid").addClass("fvalid");
	 });
	 */

	jQuery("#identify_form").submit(function() {
		$("img[alt='Invalid']").css('display', 'inline');
		var file_validation = true;
		check_radio('gender');
		check_radio('marital');
		check_demerit();
		check_demerit_reason();
		check_accident_details();

		if ($('img[alt=Invalid]').length > 0) {
			file_validation = false;
		}

		if (file_validation) {
			this.submit();
			jQuery('#btn-identify').hide();
			jQuery('img.ajax-loader').show();
		} else {
			scrollto_invalid();
		}

		return file_validation;
	});

	jQuery("#documents_form").submit(function() {
		$("img[alt='Invalid']").css('display', 'inline');
		var file_validation = true;
		//file_validation = check_required_file('icfront') && check_required_file('icback') && check_required_file('dlfront') && check_required_file('dlback');
		file_validation = check_required_file('dlfront') && check_required_file('dlback');

		if ($('img[alt=Invalid]').length > 0) {
			file_validation = false;
		}

		if (file_validation) {
			jQuery('#btn-documents').hide();
			jQuery('img.ajax-loader').show();
		} else {
			scrollto_invalid();
		}

		return file_validation;
	});

	jQuery("#sendverifycode").submit(function() {
		if (jQuery("#phone").val() == "" || jQuery("p", this)[0].style.display == "inline") {
			jQuery("#error_p").css("display", "inline");
			return false;
		}
	});

	jQuery("#code").blur(function() {
		if (this.value == "") {
			$("#error_verify_code").css("display", "inline");
		} else {
			$("#error_verify_code").css("display", "none");
		}
	});

	jQuery("#verifyform").submit(function() {
		var verify_code = jQuery("#code").val();
		if (verify_code == "") {
			$("#error_verify_code").css("display", "inline");
			return false;
		}
	});

	jQuery("#verifyownerform").submit(function() {
		var verify_code = jQuery("#code").val();
		if (verify_code == "") {
			$("#error_verify_code").css("display", "inline");
			return false;
		}

		jQuery('input[name=referer]').val(jQuery('#referal-code').val());
		jQuery("#codeowner").val(verify_code);
	});

	jQuery("#verifyfuelform").submit(function() {
		var verify_code = jQuery("#code").val();
		if (verify_code == "") {
			$("#error_verify_code").css("display", "inline");
			return false;
		}

		jQuery('input[name=referer]').val(jQuery('#referal-code').val());
		jQuery("#codefuel").val(verify_code);
	});

	jQuery('#forgotpw-submit').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		jQuery('.forgotpw-group').removeClass('error');
		jQuery('.help-block').hide();
		jQuery('#forgotpw-email ~ img[alt*=alid]').hide();
		var pwemail = jQuery('#forgotpw-email').val();
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (pwemail != '' && regex.test(pwemail)) {
			jQuery('.ajax-loader').show();
			jQuery('#forgotpw-submit').hide();
			jQuery.ajax({
				url : '/account/forgotpassword?' + new Date().getTime(),
				type : 'POST',
				data : {
					email : pwemail
				},
				dataType : 'text',
				success : function(data) {
					if (data == 1) {
						jQuery('#forgotpw-form').hide();
						jQuery('#forgotpw-success').fadeIn();
					} else {
						$("#forgotpw-email ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png').attr("alt", "Invalid").css("display", "inline");
						jQuery('.forgotpw-group').addClass('error');
						jQuery('.help-block').html('Email is not registered.').show();
						jQuery('.ajax-loader').hide();
						jQuery('#forgotpw-submit').show();
					}
				}
			});
		} else {
			$("#forgotpw-email ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png').attr("alt", "Invalid").css("display", "inline");
			jQuery('.forgotpw-group').addClass('error');
			jQuery('.help-block').html('Email is invalid').show();
		}
	});

	jQuery('#forgotpw-email').focus(function() {
		jQuery('#forgotpw-email ~ img[alt*=alid]').hide();
		jQuery('.forgotpw-group').removeClass('error');
		jQuery('.help-block').hide();
	});

	function scrollto_invalid() {
		var obj = $('img[alt=Invalid]').first();
		if (obj.length > 0) {
			var pos = obj.offset();
			window.scrollTo(pos.left, pos.top);
		}
	}

	function check_required_file(obj_id) {
		if ($('input[name=' + obj_id + '_cur]').length > 0 && $('input[name=' + obj_id + '_cur]').val()) {
			return true;
		} else {
			var obj = $('#' + obj_id).parent();
			if (obj.next('img').length == 0) {
				obj.after('<img src="/static/img/jquery.liveValidation-invalid.png" alt="Invalid" style="display:inline;float:left;">');
			} else {
				obj.next('img').attr('alt', 'Invalid').show();
			}
			return false;
		}
	}

	function check_radio(input_class) {
		var parking = $('input.' + input_class + ':checked');
		var fist_parking_obj = $('input.' + input_class).first().next();
		if (parking.length == 0) {
			if (fist_parking_obj.next('img').length == 0) {
				fist_parking_obj.after('<img src="/static/img/jquery.liveValidation-invalid.png" alt="Invalid" style="display:inline;margin-left:50px;">');
			} else {
				fist_parking_obj.next('img').attr('alt', 'Invalid').css('display', 'inline');
			}
			return false;
		} else {
			fist_parking_obj.next('img').attr('alt', 'Valid').hide();
		}
		return true;
	}

	function check_demerit() {
		var parking = $('#identity_demerit_points');
		if (parking.val() > 24) {
			if (parking.next('img').length == 0) {
				parking.after('<img src="/static/img/jquery.liveValidation-invalid.png" alt="Invalid" style="display:inline;margin-left:50px;">');
			} else {
				parking.next('img').attr('alt', 'Invalid').css('display', 'inline').attr('src', '/static/img/jquery.liveValidation-invalid.png');
			}
			return false;
		} else {
			parking.next('img').attr('alt', 'Valid').hide();
		}
		return true;
	}

	function check_demerit_reason() {
		var obj = $('#identity_demerit_reason');
		if ($('#identity_demerit_points').val() > 0) {
			if (obj.val() == '') {
				if (obj.next('img').length == 0) {
					obj.after('<img src="/static/img/jquery.liveValidation-invalid.png" alt="Invalid" style="display:inline;margin-left:0">');
				} else {
					obj.next('img').attr('alt', 'Invalid').css('display', 'inline').attr('src', '/static/img/jquery.liveValidation-invalid.png');
				}
			} else {
				obj.next('img').attr('alt', 'Valid').hide();
			}
		} else {
			obj.next('img').attr('alt', 'Valid').hide();
		}
		return true;
	}

	function check_accident_details() {
		var obj = $('#identity_claims');
		$('.accident_details_field').each(function() {
			var field = $(this);
			if (field.val() == '' && obj.val() == '1:Not at fault') {
				if (field.next('img').length == 0) {
					field.after('<img src="/static/img/jquery.liveValidation-invalid.png" alt="Invalid" style="display:inline;margin-left:0">');
				} else {
					field.next('img').attr('alt', 'Invalid').css('display', 'inline').attr('src', '/static/img/jquery.liveValidation-invalid.png');
				}
			} else {
				field.next('img').attr('alt', 'Valid').hide();
			}
		});
		return true;
	}


	jQuery('#licence_no').live('keyup', function(event) {
		$(this).val($.trim($(this).val()));
	});

	jQuery('#licence_no').blur(function(event) {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var licence_no = jQuery(this).val();
		var obj = jQuery('#licence_no');
		$("#licence_no ~ img[alt*=alid]").attr("alt", "Invalid").hide();
		if (!licence_no) {
			obj.parents('.control-group').addClass('error');
			$("#licence_no ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png').attr("alt", "Invalid").css("display", "inline");
			return;
		}
		jQuery.ajax({
			url : '/car/check_licence_no?' + new Date().getTime(),
			data : {
				licence_no : licence_no,
				carID : $('input[name=carID]').val()
			},
			dataType : 'json',
			success : function(data) {
				if (data.status == 1) {
					$("#licence_no ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-valid.png').attr("alt", "Valid").css("display", "inline");
					obj.parents('.control-group').removeClass('error');
					obj.siblings('p.help-block').hide();
				} else {
					var error_msg = '';
					var cur_uri = window.location.pathname;
					if (data.status == 2) {
						if (cur_uri == '/list-car') {
							window.location = '/edit-car/' + data.carID;
						} else if (cur_uri == '/list-car-fuel-privilege') {
							alert('This car has already applied iFuelMember.');
							window.location = '/dashboard';
						}
						$("#licence_no ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-valid.png').attr("alt", "Valid").css("display", "inline");
						return;
					} else if (data.status == 3) {
						if (cur_uri == '/list-car') {
							alert('This car has already applied iCarOwner');
							window.location = '/dashboard';
						} else if (cur_uri == '/list-car-fuel-privilege') {
							window.location = '/list-car-fuel-privilege/' + data.carID;
						}
						$("#licence_no ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-valid.png').attr("alt", "Valid").css("display", "inline");
						return;
					} else if (data.status == 98) {
						error_msg = 'Licence Plate No. is already taken. If it is not taken by yourself, please contact us.';
					} else if (data.status == 99) {
						error_msg = 'Licence Plate No. is invalid.';
					}

					if (obj.siblings('p.help-block').length == 0) {
						obj.parent().append('<p class="help-block">' + error_msg + '</p>');
					} else {
						obj.siblings('p.help-block').text(error_msg).show();
					}
					obj.parents('.control-group').addClass('error');
					$("#licence_no ~ img[alt*=alid]").attr("src", WEB_ROOT + 'static/img/jquery.liveValidation-invalid.png').attr("alt", "Invalid").css("display", "inline");
				}
			}
		});
	});

	if (jQuery('#licence_no').length > 0 && jQuery('#licence_no').val() && jQuery('#licence_no').attr('disabled') != 'disabled') {
		jQuery('#licence_no').blur();
	}
});

$(document).ready(function() {

 $("a.page-promo1").mouseover(function() {
	 $(this).effect("bounce", {
		 distance : 20
	 }, "slow");
 });
 $('#top-banner').animate({
	 height : "35px"
 }, 1000, function() {
	 $('.alert').animate({
		opacity : "1"
	 }, 1000);
 });
 $('#top-banner').bind('closed', function() {
	$('#top-banner').animate({
	  height : "0px"
	 }, 100)
 });

});

//Tool Tips

/*************************************************************************
 HOME BACKGROUND PARALLAX SCROLL
 *************************************************************************/

// cache the window object
$window = $(window);

$('div[data-type="background"]').each(function() {
	var $bgobj = $(this);
	// assigning the object
	$(window).scroll(function() {
		var yPos = -($window.scrollTop() / $bgobj.data('speed'));
		// put together our final background position
		var coords = '50% ' + yPos + 'px';
		// move the background
		$bgobj.css({
			backgroundPosition : coords
		});
	});
});


(function() {
	setTimeout(function() {
		var d = document, f = d.getElementsByTagName('script')[0], s = d.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = '//s3.amazonaws.com/ki.js/49763/amo.js';
		f.parentNode.insertBefore(s, f);
	}, 1);
})();

/* for sticky menu */
$(window).scroll(function() {
	if ($("header").offset().top > 0) {
		$("header").addClass("sticky")
		$("header").removeClass("light")
	} else {
		$("header").removeClass("sticky")
		$("header").addClass("light")
	}
});

/*get notice */
$(window).ready(function() {
	$(".referral-menu a").addClass("grow")
});

