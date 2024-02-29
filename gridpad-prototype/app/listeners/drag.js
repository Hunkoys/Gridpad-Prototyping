import Block from '@/app/elements/block/block';
import { checkRight } from '@/app/util/crowdChecker';
import layoutEngine from '@/app/util/layoutEngine';
import { closest } from '@/app/util/dom';
import { SECTION } from '@/app/elements/classnames';

function reset(data) {
  data.selectedText = '';
  data.sourceBlock = null;
}

export default function setupDrag({ app, defaultGridSize }) {
  const data = {};
  reset(data);

  addEventListener('dragstart', (e) => {
    const selection = window.getSelection();
    if (selection.type === 'Range') {
      data.selectedText = selection.toString();
      console.log(e);
      data.sourceBlock = closest(e.target, `.${SECTION}`)._block;
    }
  });

  //   let element = document.getElementById('myElement');
  // let parent = element.closest('.myClassName');

  //   console.log(parent);

  app.addEventListener('dragover', (e) => {
    if (e.target.classList.contains(SECTION)) e.preventDefault();
  });

  app.addEventListener('drop', (e) => {
    if (!e.target.classList.contains(SECTION)) return;
    e.preventDefault();

    const section = e.target._block;
    window.getSelection().deleteFromDocument();

    const point = {
      left: Math.floor(e.offsetX / defaultGridSize),
      top: Math.floor(e.offsetY / defaultGridSize),
    };

    const height = 1;
    const width = checkRight(point, section);

    const block = new Block(defaultGridSize, width, height, data.selectedText);

    data.sourceBlock.checkContent();

    layoutEngine.move(block, section, point);
    block.focus('all');

    reset(data);
  });
}
