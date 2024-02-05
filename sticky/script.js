let contextMenu = document.getElementById('context-menu');
let content = document.getElementById('content');

let contextElement = null;

content.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  contextElement = e.target;

  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.display = 'block';

  if (contextElement.style.position === 'sticky') {
    stickyButton.innerText = 'Unstick';
  } else {
    stickyButton.innerText = 'Stick';
  }
});

document.addEventListener('click', (e) => {
  if (e.target.offsetParent != contextMenu) {
    hideContextMenu();
  }
});

function hideContextMenu() {
  contextMenu.style.display = 'none';
  contextElement = null;
}

let stickyButton = document.getElementById('sticky-button');

stickyButton.addEventListener('click', (e) => {
  if (contextElement == null) {
    return;
  }

  if (contextElement.style.position === 'sticky') {
    contextElement.style.position = 'static';
  } else {
    contextElement.style.position = 'sticky';
  }
  // contextElement.style.top = '0';

  hideContextMenu();
  console.log(contextElement);
});
