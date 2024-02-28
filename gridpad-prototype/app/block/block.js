import ElementWrapperAbstract from '../util/elementWrapperAbstract';
import './block.scss';

export default class Block extends ElementWrapperAbstract {
  #gridSize;

  id = 'b' + String(Math.random()).substring(2);

  constructor(gridSize = 18, width = 1, height = 1) {
    super();
    this.el = document.createElement('div');
    this.el.className = 'block';
    this.el.style.gridArea = this.id;
    this.el.id = this.id;

    this.el.contentEditable = true;

    this.gridSize = gridSize;
    this.width = width;
    this.height = height;
    this.minHeight = height;

    this.el._block = this;
  }

  set gridSize(value) {
    this.#gridSize = value;
    this.el.style.lineHeight = `${value}px`;
  }

  get gridSize() {
    return this.#gridSize;
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }
}
