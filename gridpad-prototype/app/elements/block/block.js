import { ElementWrapperAbstract } from '@/app/util/dom';
import './block.scss';

export default class Block extends ElementWrapperAbstract {
  #gridSize;
  section = null;

  id = 'b' + String(Math.random()).substring(2);

  constructor(gridSize = 18, width = 1, height = 1, value = '') {
    super();
    this.el = document.createElement('div');
    this.el.className = 'block';
    this.el.style.gridArea = this.id;
    this.el.id = this.id;

    this.el.contentEditable = true;
    this.el.innerText = value;

    this.el.addEventListener('blur', (e) => this.checkContent());

    this.gridSize = gridSize;
    this.width = width;
    this.height = height;
    this.maxWidth = Infinity;
    this.minHeight = height;

    this.el._block = this;
  }

  checkContent() {
    if (this.el.innerText.trim() === '') {
      this.section?.remove(this);
    }
  }

  set gridSize(value) {
    this.#gridSize = value;
    this.el.style.lineHeight = `${value}px`;
  }

  get gridSize() {
    return this.#gridSize;
  }

  get right() {
    const right = this.left + this.width;
    return Math.min(right, this.maxWidth);
  }

  get bottom() {
    const bottom = this.top + this.height;
    return Math.max(bottom, this.minHeight);
  }

  focus(type = 'end') {
    setTimeout(() => {
      this.el.focus();
      const selection = window.getSelection();
      if (type == 'start') selection.collapseToStart();
      else if (type == 'end') selection.collapseToEnd();
      else if (type == 'all') selection.selectAllChildren(this.el);
    }, 0);
  }
}
