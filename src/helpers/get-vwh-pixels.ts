export const getVWHInPixels = () => {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  const vwh = vh + vw;

  return vwh;
};
