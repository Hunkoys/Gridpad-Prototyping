import Block from './app/block/block';
import setupDrag from './app/listeners/drag';
import Section from './app/section/section';
import layoutEngine from './app/util/layoutEngine';
import './app/util/fonts.css';
import './style.scss';
import setupClick from './app/listeners/mouse';

const app = document.getElementById('app');

const defaultGridSize = 20;

const pageSize = {
  width: 30,
  height: 40,
};

const settings = {
  app,
  defaultGridSize,
  pageSize,
};

const canvas = new Section(defaultGridSize);
canvas.el.className = 'canvas';
app.appendChild(canvas.el);

const addPageButton = document.createElement('button');
addPageButton.innerText = 'New Page';
addPageButton.onclick = () => {
  const page = createPage(defaultGridSize, pageSize.width, pageSize.height);
  layoutEngine.move(page, canvas, { left: 0, top: 0 });
};
app.appendChild(addPageButton);

setupClick(settings);
setupDrag(settings);

function createPage(defaultGridSize, width, height) {
  const section = new Section(defaultGridSize, width, height);
  section.el.classList.add('page');
  section.el.style.minHeight = `${height * defaultGridSize}px`;
  return section;
}
