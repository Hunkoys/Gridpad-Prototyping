const listeners = [];

const MouseTracker = {
  addListener: (listener) => {
    listeners.push(listener);
  },
  removeListener: (listener) => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  },
  notify: (event) => {
    listeners.forEach((listener) => listener(event));
  },
};

let x, y;
let beforeScrollX, beforeScrollY;

document.addEventListener('mousemove', (e) => {
  x = e.pageX;
  y = e.pageY;
  beforeScrollX = window.scrollX;
  beforeScrollY = window.scrollY;
  MouseTracker.notify({ x, y });
});

document.addEventListener('scroll', (e) => {
  const deltaX = window.scrollX - beforeScrollX;
  const deltaY = window.scrollY - beforeScrollY;
  MouseTracker.notify({ x: x + deltaX, y: y + deltaY });
});

export default MouseTracker;