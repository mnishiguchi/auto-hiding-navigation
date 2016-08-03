/**
 * My fork.
 */
document.addEventListener('DOMContentLoaded', function() {

  var mainHeader          = $('.cd-auto-hide-header')
  var secondaryNavigation = $('.cd-secondary-nav')

  // This applies only if secondary nav is below intro section.
  var belowNavHeroContent = $('.sub-nav-hero')

	// Obtain the height of the entire header.
  var headerHeight = mainHeader.height()

  // Set scrolling variables.
  var scrolling    = false
  var previousTop  = 0
  var currentTop   = 0
  var scrollDelta  = 10
  var scrollOffset = 150

  mainHeader.on('click', '.nav-trigger', function(event){
    // Open primary navigation on mobile.
    event.preventDefault()
    mainHeader.toggleClass('nav-open')
  })

  window.addEventListener('scroll', function(){
    if( !scrolling ) {
      scrolling = true;
      (!window.requestAnimationFrame)
        ? setTimeout(autoHideHeader, 250)
        : requestAnimationFrame(autoHideHeader)
    }
  })

  window.addEventListener('resize', function(){
    headerHeight = mainHeader.height()
  })

  function autoHideHeader() {
    var currentTop = $(window).scrollTop()

    if ( belowNavHeroContent.length > 0 ) {
      checkStickyNavigation(currentTop) // secondary navigation below intro
    } else {
      checkSimpleNavigation(currentTop);
    }

    previousTop = currentTop;
    scrolling = false;
  }

  function checkSimpleNavigation(currentTop) {
    // There's no secondary nav or secondary nav is below primary nav.
    if (previousTop - currentTop > scrollDelta) {
      // If scrolling up...
      mainHeader.removeClass('is-hidden')
    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
      // If scrolling down...
      mainHeader.addClass('is-hidden')
    }
  }

  /**
   * This function is used only for the `Nav+Hero+Subnav` variant.
   */
  function checkStickyNavigation(currentTop) {
    // Secondary navigation below intro section - sticky secondary navigation.
    var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height()

    if (previousTop >= currentTop ) {
      // If scrolling up...
      if( currentTop < secondaryNavOffsetTop ) {

        // Secondary navigation is not fixed.
        mainHeader.removeClass('is-hidden')
        secondaryNavigation.removeClass('fixed slide-up')
        belowNavHeroContent.removeClass('secondary-nav-fixed')

      } else if( previousTop - currentTop > scrollDelta ) {
        // Secondary navigation is fixed.
        mainHeader.removeClass('is-hidden')
        secondaryNavigation.removeClass('slide-up').addClass('fixed')
        belowNavHeroContent.addClass('secondary-nav-fixed')
      }

    } else {
      // If scrolling down...
      if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
        // Hide primary navigation.
        mainHeader.addClass('is-hidden')
        secondaryNavigation.addClass('fixed slide-up')
        belowNavHeroContent.addClass('secondary-nav-fixed')

      } else if( currentTop > secondaryNavOffsetTop ) {
        // Once the secondary navigation is fixed...
        // do not hide primary naviagation if you haven't scrolled more than scrollOffset.
        mainHeader.removeClass('is-hidden')
        secondaryNavigation.addClass('fixed').removeClass('slide-up')
        belowNavHeroContent.addClass('secondary-nav-fixed')
      }
    }
  }
})
