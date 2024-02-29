import Block from './app/block/block';
import Section from './app/section/section';
import './app/util/fonts.css';
import layoutEngine from './app/util/layoutEngine';
import mouseTracker from './app/util/mouseTracker';
import './style.scss';

const app = document.getElementById('app');

const defaultGridSize = 20;

const dimensions = {
  width: 30,
  height: 40,
};

(function BUTTON() {
  const canvas = new Section(defaultGridSize);
  canvas.el.classList.add('canvas');
  app.appendChild(canvas.el);

  const addPageButton = document.createElement('button');
  addPageButton.innerText = 'Add Page';

  function createSection(defaultGridSize, width, height) {
    const section = new Section(defaultGridSize, width, height);
    section.el.classList.add('page');
    section.el.style.minHeight = `${height * defaultGridSize}px`;
    return section;
  }

  addPageButton.onclick = () => {
    const page = createSection(defaultGridSize, dimensions.width, dimensions.height);
    layoutEngine.move(page, canvas, { left: 0, top: 0 });
  };
  app.appendChild(addPageButton);
})();

(function CLICK() {
  app.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('section')) {
      const section = e.target._block;
      const gridX = Math.floor(e.offsetX / defaultGridSize);
      const gridY = Math.floor(e.offsetY / defaultGridSize);

      // Check distance from right block/wall
      let { width, height } = checkRight(section, gridX, gridY);

      const block = new Block(defaultGridSize, width, height);
      layoutEngine.move(block, e.target._block, {
        left: gridX,
        top: gridY,
      });
    }
  });
})();

let selectedText = '';

(function DRAG() {
  addEventListener('dragstart', (e) => {
    const selection = window.getSelection();
    if (selection.type === 'Range') {
      selectedText = selection.toString();
    }
  });

  app.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  app.addEventListener('drop', (e) => {
    e.preventDefault();
    // Delete the current selection
    const selection = window.getSelection();
    selection.deleteFromDocument();

    // Create a new block with the selection
    const gridX = Math.floor(e.offsetX / defaultGridSize);
    const gridY = Math.floor(e.offsetY / defaultGridSize);

    let section = e.target._block;
    let { width, height } = checkRight(section, gridX, gridY);

    const block = new Block(defaultGridSize, width, height, selectedText);
    block.focus('all');
    selectedText = ''; // We can select the newly added element

    layoutEngine.move(block, section, {
      left: gridX,
      top: gridY,
    });
  });
})();

function checkRight(section, gridX, gridY) {
  let width = section.width - gridX;
  const height = 1; // Could be a param
  for (const block of section.blocks) {
    const hasBlockToTheRight = gridY + height > block.top && gridY < block.bottom && gridX < block.left;
    if (hasBlockToTheRight) {
      width = Math.min(width, block.left - gridX);
    }
  }
  return { width, height };
}

// simulate();
function simulate() {
  // simulate clicked empty space at 2, 2
  // // get available width

  const page1 = new Section(defaultGridSize, 30, 50);
  app.appendChild(page1.el);

  const block1 = new Block(defaultGridSize, 3);
  layoutEngine.move(block1, page1, { left: 2, top: 2, width: 3 });
  // // simulate typed in block 1
  block1.el.innerText = `Block 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk`;

  // // simulate clicked empty space at 5, 5
  const block2 = new Block(defaultGridSize, 4);
  layoutEngine.move(block2, page1, { left: 5, top: 2 });
  // // simulate typed in block 2
  block2.el.innerText = `block 2`;

  const block3 = new Block(defaultGridSize, 3);
  layoutEngine.move(block3, page1, { left: 5, top: 10 });
  block3.el.innerText = `block 3`;

  // layoutEngine.move(block3, page1, { left: 6, top: 5 });

  layoutEngine.move(block1, page1, { width: 3 });
}
