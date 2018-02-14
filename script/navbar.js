$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('.main-nav').addClass('shrink')
    $('.profile').addClass('display-none')
  } else {
    $('.main-nav').removeClass('shrink')
    $('.profile').removeClass('display-none')
  }
})

var autoScroll = function() {
  if (window.location.pathname !== '/') {
    return window.scroll(0, 51)
  }
}

$(document).ready(autoScroll)
$(document).on('page:load', autoScroll)
