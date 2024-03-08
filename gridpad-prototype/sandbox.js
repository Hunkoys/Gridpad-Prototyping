export const debounce = (delay, func) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

class Cow {
  constructor(name) {
    this.name = name;
  }
  eat = debounce(1000, () => {
    console.log('eat', this.name);
  });
}

const j = new Cow('sss');
j.eat();
const s = new Cow('ssss');
