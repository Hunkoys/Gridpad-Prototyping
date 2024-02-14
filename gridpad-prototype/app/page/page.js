import ElementWrapperAbstract from '../util/elementWrapperAbstract';
import './page.scss';

const gridSize = 20;

export default class Page extends ElementWrapperAbstract {
  constructor(width, height) {
    this.el = document.createElement('div');
    this.el.className = 'page';
    this.el.style.width = `${width}px`;
    this.el.style.minHeight = `${height}px`;
  }
}

// export function Page(width, height) {
//   const page = document.createElement('div');
//   page.className = 'page';
//   page.style.width = `${width}px`;
//   page.style.minHeight = `${height}px`;

//   return page;
// }

// page.style.gridTemplateColumns = `repeat(${width / gridSize}, ${gridSize}px)`;
// page.style.gridTemplateRows = `repeat(${height / gridSize}, ${gridSize}px)`;
