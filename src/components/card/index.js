(function () {
  let rotateX = 0,
    rotateY = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
      rotateX += 4;
    } else if (e.code === 'ArrowDown') {
      rotateX -= 4;
    } else if (e.code === 'ArrowLeft') {
      rotateY -= 4;
    } else if (e.code === 'ArrowRight') {
      rotateY += 4;
    }
    document.querySelector('.card').style.transform =
      `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });
})();
