import ElementWrapperAbstract from '../util/elementWrapperAbstract';
import './section.scss';

function stringifyTemplate(template) {
  return template.join(' ');
}

export default class Section extends ElementWrapperAbstract {
  #gridTemplateRows = {};
  #gridTemplateColumns = {};
  blocks = null; // Note: this could live in LayoutEngine

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
}

// page.style.gridTemplateColumns = `repeat(${width / gridSize}, ${gridSize}px)`;
// page.style.gridTemplateRows = `repeat(${height / gridSize}, ${gridSize}px)`;