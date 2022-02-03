/* eslint-disable no-unused-vars, no-shadow */
import throttle from '../../util/throttle';

(() => {
  /**
   * ---------------------------------------------------------------------------
   * TOGGLE SEARCH FORM ON MOBILES
   * ---------------------------------------------------------------------------
   */
  const form = document.getElementById('search-drawer');
  const scrim = document.getElementById('search-scrim');

  const closeSearch = () => {
    form.classList.remove('is-open');
    scrim.classList.remove('is-on');
  };

  const openSearch = (event) => {
    event.preventDefault();

    /* When the search form is already open, and the user clicks the search trigger,
    we don't want to rerun the entire event registration. We'll add an early
    return for that. */
    if (form.classList.contains('is-open')) {
      return;
    }

    // Show search and scrim
    form.classList.add('is-open');
    scrim.classList.add('is-on');
  };

  // Event Listener
  if (form && scrim) {
    window.addEventListener('click', (event) => {
      if (event.target.closest('[data-search-btn]')) {
        openSearch(event);
      } else {
        closeSearch();
      }

      if (event.target.matches('[data-search-cancel]')) {
        closeSearch();
      }
    });
  }

  /**
   * ---------------------------------------------------------------------------
   * TOGGLE HEADER CLASS BASED ON SCROLL POSITION
   * ---------------------------------------------------------------------------
   */
  let scrollPos = window.scrollY;
  const header = document.getElementById('header');
  const pointOfChange = 57;

  const addClassOnScroll = () => header.classList.add('is-sticky');
  const removeClassOnScroll = () => header.classList.remove('is-sticky');

  function toggleHeaderSticky() {
    scrollPos = window.scrollY;

    if (scrollPos >= pointOfChange) {
      addClassOnScroll();
    } else {
      removeClassOnScroll();
    }
  }

  window.addEventListener('scroll', throttle(toggleHeaderSticky, 1000));
})();
