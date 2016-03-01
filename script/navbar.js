$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('#main-nav').addClass('shrink');
    $('#body').addClass('body-padding-top');

    $('#profile').addClass('display-none');
    $('#profile').removeClass('display-block');
  } else {
    $('#main-nav').removeClass('shrink');
    $('#body').removeClass('body-padding-top');

    $('#profile').addClass('display-block');
    $('#profile').removeClass('display-none');
  }
});

var autoScroll = function() {
  if (window.location.pathname !== '/') {
    return window.scroll(0, 51);
  }
};

$(document).ready(autoScroll);
$(document).on('page:load', autoScroll);
