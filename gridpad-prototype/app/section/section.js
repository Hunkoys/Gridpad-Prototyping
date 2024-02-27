import ElementWrapperAbstract from '../util/elementWrapperAbstract';
import './section.scss';

function stringifyTemplate(template) {
  return template.join(' ');
}

// Rename to container
export default class Section extends ElementWrapperAbstract {
  #gridTemplateRows = {};
  #gridTemplateColumns = {};
  blocks = []; // Note: this could live in LayoutEngine

  constructor(gridSize, width, height) {
    super();
    this.el = document.createElement('div');
    this.el.className = 'page';
    this.el.style.width = `${width * gridSize}px`;
    this.el.style.minHeight = `${height * gridSize}px`;
    this.el.style.backgroundSize = `${gridSize}px ${gridSize}px`;

    this.gridSize = gridSize;
    this.width = width;
    this.height = height;
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
  }

  remove(block) {
    this.blocks = this.blocks.filter((b) => b !== block);
    this.el.removeChild(block.el);
  }
}
