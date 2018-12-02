window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    document.querySelector('.main-nav').classList.add('shrink')
    document.querySelector('.profile').classList.add('display-none')
  } else {
    document.querySelector('.main-nav').classList.remove('shrink')
    document.querySelector('.profile').classList.remove('display-none')
  }
})

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname !== '/') {
    window.scroll(0, 51)
  }
})
