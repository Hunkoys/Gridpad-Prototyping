import Block from './app/block/block';
import Section from './app/section/section';
import './app/util/fonts.css';
import layoutEngine from './app/util/layoutEngine';
import mouseTracker from './app/util/mouseTracker';
import './style.css';

const app = document.getElementById('app');

const defaultGridSize = 20;

const page1 = new Section(defaultGridSize, 30, 50);
app.appendChild(page1.el);

// Simulate page load
setTimeout(() => {
  // simulate clicked empty space at 2, 2
  // get available width
  const block1 = new Block(defaultGridSize, 3);
  layoutEngine.move(block1, page1, { left: 2, top: 2 });
  // simulate typed in block 1
  block1.el.innerText = `Block 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk`;

  // simulate clicked empty space at 5, 5
  const block2 = new Block(defaultGridSize, 4);
  layoutEngine.move(block2, page1, { left: 5, top: 2 });
  // simulate typed in block 2
  block2.el.innerText = `block 2`;

  layoutEngine.move(block1, page1, { width: 3 });
}, 0);

// const block1 = new Block(defaultGridSize);
// const block2 = new Block(defaultGridSize);
// const block3 = new Block(defaultGridSize);

// block1.el.innerText = 'block 1';
// block2.el.innerText = 'block 2';
// block3.el.innerText = 'block 3';

// page1.el.appendChild(block1.el);
// page1.el.appendChild(block2.el);
// page1.el.appendChild(block3.el);

// page1.gridTemplateColumns = [
//   `[${block1.id}-start ${block3.id}-start]`,
//   `280px`,
//   `[${block1.id}-end ]`,
//   `40px`,
//   `[${block3.id}-end ${block2.id}-start]`,
//   `280px`,
//   `[${block2.id}-end]`,
// ];
// page1.gridTemplateRows = [
//   `[${block1.id}-start ${block2.id}-start]`,
//   `min-content`,
//   `[${block1.id}-end ${block3.id}-start]`,
//   `min-content`,
//   `[${block3.id}-end ${block2.id}-end]`,
// ];
