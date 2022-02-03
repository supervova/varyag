class Accordion {
  constructor(el, settings) {
    this.group = el;
    this.accordions = this.group.querySelectorAll('.accordion');
    this.toggles = this.group.querySelectorAll('.accordion__header');
    this.contents = this.group.querySelectorAll('.accordion__content');

    // Set default settings. one_visible is for accordion behaviour
    this.settings = { speed: 300, one_visible: false, ...settings };

    // Setup initial positions
    for (let i = 0; i < this.accordion.length; i++) {
      const accordion = this.accordions[i];
      const toggle = this.toggles[i];
      const content = this.contents[i];

      // Set transition-duration to match JS setting
      accordion.style.transitionDuration = `${this.settings.speed}ms`;

      // Set initial height to transition from
      if (!accordion.hasAttribute('open')) {
        accordion.style.height = `${toggle.clientHeight}px`;
      } else {
        accordion.style.height = `${
          toggle.clientHeight + content.clientHeight
        }px`;
      }
    }

    // Setup click handler
    this.group.addEventListener('click', (e) => {
      if (e.target.classList.contains('accordion__header')) {
        e.preventDefault();

        let num = 0;
        for (let i = 0; i < this.toggles.length; i++) {
          if (this.toggles[i] === e.target) {
            num = i;
            break;
          }
        }

        if (!e.target.parentNode.hasAttribute('open')) {
          this.open(num);
        } else {
          this.close(num);
        }
      }
    });
  }

  open(i) {
    const accordion = this.accordions[i];
    const toggle = this.toggles[i];
    const content = this.contents[i];

    // If applicable, hide all the other details first
    if (this.settings.one_visible) {
      for (let a = 0; a < this.toggles.length; a++) {
        if (i !== a) this.close(a);
      }
    }

    // Update class
    accordion.classList.remove('is-closing');

    // Get height of toggle
    const toggleHeight = toggle.clientHeight;

    // Momentarily show the contents just to get the height
    accordion.setAttribute('open', true);
    const contentHeight = content.clientHeight;
    accordion.removeAttribute('open');

    // Set the correct height and let CSS transition it
    accordion.style.height = `${toggleHeight + contentHeight}px`;

    // Finally set the open attr
    accordion.setAttribute('open', true);
  }

  close(i) {
    const accordion = this.accordions[i];
    const toggle = this.toggles[i];

    // Update class
    accordion.classList.add('is-closing');

    // Get height of toggle
    const toggleHeight = toggle.clientHeight;

    // Set the height so only the toggle is visible
    accordion.style.height = `${toggleHeight}px`;

    setTimeout(() => {
      // Check if still closing
      if (accordion.classList.contains('is-closing')) {
        accordion.removeAttribute('open');
      }
      accordion.classList.remove('is-closing');
    }, this.settings.speed);
  }
}

(() => {
  const els = document.querySelectorAll('.has-accordions');

  for (let i = 0; i < els.length; i++) {
    // eslint-disable-next-line no-unused-vars
    const accordions = new Accordion(els[i], {
      // speed: 400,
      // auto collapsible behaviour
      // one_visible: true,
    });
  }
})();
