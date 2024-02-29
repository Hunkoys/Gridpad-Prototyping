export default function setupFocus({ app }) {
  app.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('block')) {
      const block = e.target._block;
      console.log(block);
      block.checkContent();
    }
  });
}
