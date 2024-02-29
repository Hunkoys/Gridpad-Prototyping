import '@/app.scss';
import Section from '@/app/elements/section/section';
import layoutEngine from '@/app/util/layoutEngine';
import setupClick from '@/app/listeners/mouse';
import setupDrag from '@/app/listeners/drag';
import setupFocus from '@/app/listeners/focus';

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
setupFocus(settings);

function createPage(defaultGridSize, width, height) {
  const section = new Section(defaultGridSize, width, height);
  section.el.classList.add('page');
  section.el.style.minHeight = `${height * defaultGridSize}px`;
  181;
  return section;
}
