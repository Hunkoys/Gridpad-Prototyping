export default function setupFocus(layoutEngine) {
  app.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('block')) {
      const block = e.target._block;
      block.checkContent();
    }
  });
}
