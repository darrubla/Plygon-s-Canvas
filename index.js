const lienzo = document.getElementById('lienzo');
const dotsArr = [];

const context = lienzo.getContext("2d");
context.lineWidth = 2;
context.fillStyle = "#A8C3EC";
context.strokeStyle = '#A8C3EC';

const drawing = () => {
  context.beginPath();
  return dotsArr.forEach((dot, idx) => {
    if (idx != dotsArr.length-1) {
      context.moveTo(dot.x, dot.y);
      context.lineTo(dotsArr[idx+1].x, dotsArr[idx+1].y);
      context.stroke();
    }
  });
}

const pintar = (e) => {
  const { offsetX, offsetY } = e;
  console.log(dotsArr);
  context.beginPath();
  context.clearRect(0, 0, lienzo.width, lienzo.height);
  if (dotsArr.length > 0) {
    if (!(dotsArr[dotsArr.length - 1].x === offsetX && dotsArr[dotsArr.length - 1].y === offsetY)) {
      dotsArr.push({x: offsetX, y: offsetY});
      context.fillRect(offsetX, offsetY, 2, 2);
      drawing();
    }
  } else {
    dotsArr.push({x: offsetX, y: offsetY});
    context.fillRect(offsetX, offsetY, 2, 2);
    drawing();
  }
  if (document.getElementById('complete').disabled === true) {
    reset();
  }
}

const complete = () => {
  document.getElementById('complete').disabled = true;
  dotsArr.push(dotsArr[0]);
  drawing();
}

const reset = () => {
  document.getElementById('complete').disabled = false;
  dotsArr.splice(0, dotsArr.length);
  context.beginPath();
  context.clearRect(0, 0, lienzo.width, lienzo.height);
}

lienzo.addEventListener('click', (e) => pintar(e));