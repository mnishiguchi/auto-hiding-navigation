/**
 * My fork.
 */
document.addEventListener('DOMContentLoaded', function() {

  var header = document.querySelector('.auto-hide-header')

	// Obtain the height of the entire header.
  var headerHeight = header.offsetHeight

  // Set scrolling variables.
  var isScrolling  = false
  var previousTop  = 0
  var currentTop   = 0

  // Scrolling sensitivity.
  var scrollDelta  = 10   // No animation 0..10px of acrolling.
  var scrollOffset = 150  // No animation 0..150px at the top.

  // Event listeners.
  document.querySelector('.hamburger').addEventListener('click', onHamburgerClick)
  window.addEventListener('scroll', autoHideHeader)
  window.addEventListener('resize', updateHeaderHeight)

  /**
   * @param  {[type]} event
   */
  function onHamburgerClick(event) {
    event.preventDefault()
    header.classList.toggle('nav-open')
  }

  /**
   * Updates the value of the header's heights.
   */
  function updateHeaderHeight() {
    headerHeight = header.offsetHeight
  }

  /**
   * [autoHideHeader description]
   */
  function autoHideHeader() {
    // The number of pixels that the document has already been scrolled vertically.
    // Obtain the current position of the top.
    currentTop = window.scrollY

    // Show/hide the header according to the scroll direction.
    if ( isUpScroll() ) {
      header.classList.remove('is-hidden')
    } else if ( isDownScroll() ) {
      header.classList.add('is-hidden')
    }

    // Store the value of the current position as previous.
    previousTop = currentTop;
  }

  /**
   * @return {Boolean} true if the document is scrolling down.
   */
  function isDownScroll() {
    return (currentTop - previousTop > scrollDelta) && (currentTop > scrollOffset)
  }

  /**
   * @return {Boolean} true if the document is scrolling up.
   */
  function isUpScroll() {
    return previousTop - currentTop > scrollDelta
  }
})
