import ElementWrapperAbstract from '../util/elementWrapperAbstract';
import './page.scss';

export default class Page extends ElementWrapperAbstract {
  constructor(gridSize, width, height) {
    super();
    this.el = document.createElement('div');
    this.el.className = 'page';
    this.el.style.width = `${width * gridSize}px`;
    this.el.style.minHeight = `${height * gridSize}px`;
    this.el.style.backgroundSize = `${gridSize}px ${gridSize}px`;

    this.gridSize = gridSize;
  }

  get gridTemplateRows() {
    return this.el.style.gridTemplateRows;
  }

  set gridTemplateRows(value) {
    this.el.style.gridTemplateRows = value;
  }

  get gridTemplateColumns() {
    return this.el.style.gridTemplateColumns;
  }

  set gridTemplateColumns(value) {
    console.log(value);
    this.el.style.gridTemplateColumns = value;
    console.log(this.el.style.gridTemplateColumns);
  }
}

// page.style.gridTemplateColumns = `repeat(${width / gridSize}, ${gridSize}px)`;
// page.style.gridTemplateRows = `repeat(${height / gridSize}, ${gridSize}px)`;
