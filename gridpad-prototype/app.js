import Block from './app/block/block';
import Page from './app/page/page';
import './app/util/fonts.css';
import layoutEngine from './app/util/layoutEngine';
import mouseTracker from './app/util/mouseTracker';
import './style.css';

const app = document.getElementById('app');

const defaultGridSize = 20;

const page1 = new Page(defaultGridSize, 30, 50);

const block1 = new Block();
block1.gridSize = defaultGridSize;

block1.el.innerText = `Inside this rule, youve added a font-family property with a value of "Fira Sans" in quotes. Since this code is defining an overall font-family, only one font name should be used. The comma separated list of font formats for src is two parted. The `;

const block2 = new Block();
block2.gridSize = defaultGridSize;

block2.el.innerText = `another block`;

layoutEngine.move(block1, page1, 2, 2);
layoutEngine.move(block2, page1, 5, 5);

block1.el.style.gridArea = 'block1';
block2.el.style.gridArea = 'block2';

block1.el.style.gridArea = '';
block2.el.style.gridArea = '';

const templateColumns = ['220px', '40px', '220px', 'auto'];
const templateRows = [`minmax(${defaultGridSize}px, min-content)`];

page1.el.style.gridTemplateColumns = templateColumns.join(' ');
page1.el.style.gridTemplateRows = templateRows.join(' ');

block1.el.style.gridColumnStart = 3;
block1.el.style.gridRowStart = 2;
block1.el.style.gridColumnEnd = 4;

block2.el.style.gridColumnStart = 1;
block2.el.style.gridColumnEnd = 3;
block2.el.style.gridRowStart = 1;
block2.el.style.gridRowEnd = 3;

// block1.el.style.gridColumn = '2 / 3';
// block1.el.style.gridRow = '2 / 3';
// block2.el.style.gridColumn = '1 / 2';
// block2.el.style.gridRow = '1 / 3';

// page1.el.style.gridAutoRows = `${defaultGridSize}px`;

// mouseTracker.addListener((event) => {
//   console.table(event);
// });

// layout.move(block1, page1, 0, 0);

// moveBlock(block1, page1, 0, 0);
// moveBlock(block1, null, 0, 0);

app.appendChild(page1.el);

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { contentRect, target } = entry;
    console.log(contentRect, target);
  }
});

resizeObserver.observe(block1.el);
