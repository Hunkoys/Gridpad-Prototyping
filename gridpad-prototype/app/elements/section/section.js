import Block from '../block/block';
import './section.scss';

function stringifyTemplate(template) {
  return template.join(' ');
}

// Rename to container
// Also create a common class with Block called Element.

export default class Section extends Block {
  #gridTemplateRows = {};
  #gridTemplateColumns = {};
  blocks = []; // Note: this could live in LayoutEngine

  constructor(gridSize, width, height) {
    super(gridSize, width, height);
    this.el.classList.add('section');
    this.el.style.backgroundSize = `${gridSize}px ${gridSize}px`;

    this.el.contentEditable = false;
  }

  get gridTemplateRows() {
    return this.#gridTemplateRows;
  }

  set gridTemplateRows(value) {
    this.el.style.gridTemplateRows = stringifyTemplate(value);
  }

  get gridTemplateColumns() {
    return this.#gridTemplateColumns;
  }

  set gridTemplateColumns(value) {
    this.el.style.gridTemplateColumns = stringifyTemplate(value);
  }

  add(block) {
    // i need blocks to be sorted by their top then left

    this.blocks.push(block);
    this.blocks = this.blocks.sort((a, b) => {
      if (a.top === b.top) {
        return a.left - b.left;
      }
      return a.top - b.top;
    });
    this.el.appendChild(block.el);
    block.section = this;
  }

  remove(block) {
    this.blocks = this.blocks.filter((b) => b !== block);
    this.el.removeChild(block.el);
    block.section = null;
  }
}
