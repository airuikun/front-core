
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};

global.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: () => { },
    removeListener: () => { },
  };
};
