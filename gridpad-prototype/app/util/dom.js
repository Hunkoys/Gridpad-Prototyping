export class ElementWrapperAbstract {
  appendChild(elementWrapperAbstract) {
    this.el.appendChild(elementWrapperAbstract.el);
  }
}

export function closest(element, selector) {
  let el = element;
  while (el) {
    if (el.matches && el.matches(selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
