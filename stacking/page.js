function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const updatePageHeight = debounce((page, height) => {
  let rows = Math.ceil(height / gridSize);
  if (page.rows === rows) return;

  page.style.height = rows * gridSize + 'px';
  page.style.gridTemplateRows = `repeat(${rows}, ${gridSize}px)`;

  page.rows = rows;
}, 10);

const updatePageWidth = debounce((page, width) => {
  let columns = Math.ceil(width / gridSize);
  if (page.columns === columns) return;

  page.style.width = columns * gridSize + 'px';
  page.style.gridTemplateColumns = `repeat(${columns}, ${gridSize}px)`;

  page.columns = columns;
}, 10);

document.querySelectorAll('.page').forEach((page) => {
  page.style.minHeight = defaultPageHeight + 'px';
  page.style.height = 'fit-content';
  page.style.paddingBottom = gridSize + 'px';
});

// updatePageHeight(document.querySelector('.page'), defaultPageHeight);
updatePageWidth(document.querySelector('.page'), defaultPageWidth);
