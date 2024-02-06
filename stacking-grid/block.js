const preset = [];

document.querySelectorAll('.block').forEach(function (block) {});

document.querySelectorAll('.block').forEach(function (block) {
  block.addEventListener('input', function (e) {
    const height = block.offsetHeight;

    block.style.gridRow = 'auto / span ' + Math.floor(height / gridSize);
    let page = block.closest('.page');
    page.style.height = 'fit-content';
    page.style.gridTemplateRows = 'auto';
    console.log('page:', page.offsetHeight);

    updatePageHeight(page, page.offsetHeight - 5);
  });
});
