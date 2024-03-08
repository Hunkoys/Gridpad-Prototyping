export const sleep = (milliseconds) => {
  const start = Date.now();
  while (Date.now() - start < milliseconds) {}
};

export const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function cooldown(time, func) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last > time) {
      last = now;
      return func(...args);
    }
  };
}
