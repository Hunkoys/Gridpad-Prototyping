import ElementWrapperAbstract from '../util/elementWrapperAbstract';
import './block.scss';

export default class Block extends ElementWrapperAbstract {
  #grid = 18;

  id = 'b' + String(Math.random()).substring(2);
  width = 'max';
  height = 'min';

  constructor() {
    super();
    this.el = document.createElement('div');
    this.el.className = 'block';
    this.el.style.gridArea = this.id;
    this.el.style.alignSelf = 'start';
    this.el.id = this.id;

    this.el.contentEditable = true;

    this.gridSize = this.#grid;
  }

  set gridSize(value) {
    this.#grid = value;
    this.el.style.lineHeight = `${value}px`;
  }

  get gridSize() {
    return this.#grid;
  }
}
