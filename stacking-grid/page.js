const gridSize = 20;

let debounceTimeout;
function updatePageHeight(page, height) {
  function debounce(func, delay) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
  }

  debounce(() => {
    let rows = Math.round(height / gridSize);
    if (page.rows === rows) return;

    page.style.height = rows * gridSize + 'px';
    // console.log('rows:', rows);
    page.style.gridTemplateRows = `repeat(${rows}, ${gridSize}px) auto`;

    page.rows = rows;
  }, 10);
}

function setVerticalResizeCursor() {
  document.body.style.cursor = 'ns-resize';
}

document.querySelector('.bottom-edge').addEventListener('mouseover', function (event) {
  var rect = event.target.getBoundingClientRect();
  var bottomEdge = rect.bottom;
  var mouseY = event.clientY;

  if (mouseY >= bottomEdge - 5) {
    setVerticalResizeCursor();
  }
  // console.log('bottomEdge:', bottomEdge);
});

document.querySelector('.bottom-edge').addEventListener('mouseout', function () {
  document.body.style.cursor = 'default';
  // console.log('mouseout');
});

document.querySelector('.bottom-edge').addEventListener('mousedown', function (event) {
  var rect = event.target.getBoundingClientRect();
  var bottomEdge = rect.bottom;
  var mouseY = event.clientY;

  if (mouseY >= bottomEdge - 5) {
    // console.log('resize');
    var pageElement = event.target.closest('.page');
    var initialHeight = pageElement.offsetHeight;
    var initialMouseY = event.clientY;

    let listener = function (event) {
      var mouseY = event.clientY;
      let delta = mouseY - initialMouseY;

      var newHeight = initialHeight + delta;
      updatePageHeight(pageElement, newHeight);
    };

    document.addEventListener('mousemove', listener);

    document.addEventListener('mouseup', function () {
      document.body.style.cursor = 'default';
      // console.log('mouseup');
      document.removeEventListener('mousemove', listener);
    });
  }
});

document.querySelector('.bottom-edge').addEventListener('mouseup', function () {
  document.body.style.cursor = 'default';
  // console.log('mouseup');
});
