export default class ElementWrapperAbstract {
  appendChild(elementWrapperAbstract) {
    this.el.appendChild(elementWrapperAbstract.el);
  }
}
