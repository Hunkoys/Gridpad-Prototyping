import Block from '@/app/block/block';
import { checkRight } from '@/app/util/crowdChecker';
import layoutEngine from '@/app/util/layoutEngine';

export default function setupDrag({ app, defaultGridSize }) {
  let selectedText = '';

  addEventListener('dragstart', (e) => {
    const selection = window.getSelection();
    if (selection.type === 'Range') {
      selectedText = selection.toString();
    }
  });

  app.addEventListener('dragover', (e) => {
    if (e.target.classList.contains('section')) e.preventDefault();
  });

  app.addEventListener('drop', (e) => {
    if (!e.target.classList.contains('section')) return;

    let section = e.target._block;
    e.preventDefault();
    // Delete the current selection
    const selection = window.getSelection();
    selection.deleteFromDocument();

    // Create a new block with the selection
    const gridX = Math.floor(e.offsetX / defaultGridSize);
    const gridY = Math.floor(e.offsetY / defaultGridSize);

    let { width, height } = checkRight(section, gridX, gridY);

    const block = new Block(defaultGridSize, width, height, selectedText);
    block.focus('all');
    selectedText = ''; // We can select the newly added element

    layoutEngine.move(block, section, {
      left: gridX,
      top: gridY,
    });
  });
}
