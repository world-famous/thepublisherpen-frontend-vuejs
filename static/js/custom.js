/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable semi */
/* eslint-disable no-undef */
$(function () {
	$(".recommend-seemore").hide();
	$(".see-more a").click(function () {
		$(".recommend-seemore").show();
		$(".see-more").hide();

	});

	$(".menu-toggle a").click(function () {
		$(".right-menu").toggleClass("active");
		$(".page-manager").toggleClass("active");

	});

	$(".data-world-inner ul li a").on('click', function (e) {
		$(".data-world-inner ul li.active").removeClass('active');
		$(this).parent().addClass('active');
		e.preventDefault();
	});

	$(".search-icon a").click(function () {
		$(".search-inner").toggleClass("active");

	});

	$(".video-detail-republic ul li a").click(function () {
		$(".video-detail-republic").addClass("hide");
	});


  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('.content').addClass('active');
    } else {
      $('.content').removeClass('active');
    }
  });

	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('.video-detail-republic').addClass("active");
		}
		if ($(this).scrollTop() < 1)
		{
			$('.video-detail-republic').removeClass("active");
			$('.video-detail-republic').removeClass("hide");
		}
	});
});
