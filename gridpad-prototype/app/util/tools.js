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
