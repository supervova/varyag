(() => {
  const modal = document.getElementById('modal-external');
  const container = modal.querySelector('.modal__box');

  /**
   * Open an external page in the modal window
   */
  modal.addEventListener('show.bs.modal', (event) => {
    // Link that triggered the modal
    const href = event.relatedTarget.getAttribute('href');

    fetch(href)
      .then((response) => {
        // Get page HTML as a text string
        return response.text();
      })
      .then((html) => {
        // Convert the HTML string into a document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Get the page content and insert it in modal container
        const content = doc.querySelector('.is-modal-src');
        container.appendChild(content);
      });
  });

  // Clear modal content to prevent show it before new document has been loaded
  modal.addEventListener('hidden.bs.modal', () => {
    container.innerHTML = '';
  });
})();
