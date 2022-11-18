let canvas = document.getElementById("canvas");
let ctx;
if (canvas.getContext) {
  ctx = canvas.getContext("2d");
}
let xCoord = document.getElementById("xCoord");
let yCoord = document.getElementById("yCoord");
let begX = document.getElementById("xBeg");
let begY = document.getElementById("yBeg");
let endX = document.getElementById("xEnd");
let endY = document.getElementById("yEnd");
let p1X = document.getElementById("xP1");
let p1Y = document.getElementById("yP1");
let p2X = document.getElementById("xP2");
let p2Y = document.getElementById("yP2");

let xBeg, yBeg, xEnd, yEnd, xP1, yP1, xP2, yP2;

begX.addEventListener("input", () => {
  xBeg = begX.value;
});

begY.addEventListener("input", () => {
  yBeg = begY.value;
});

endX.addEventListener("input", () => {
  xEnd = endX.value;
});

endY.addEventListener("input", () => {
  yEnd = endY.value;
});

p1X.addEventListener("input", () => {
  xP1 = p1X.value;
});

p1Y.addEventListener("input", () => {
  yP1 = p1Y.value;
});

p2X.addEventListener("input", () => {
  xP2 = p2X.value;
});

p2Y.addEventListener("input", () => {
  yP2 = p2Y.value;
});

canvas.addEventListener("mousemove", (e) => {
  var mx = getCursorPosition(e)[0] - canvas.offsetLeft;
  var my = getCursorPosition(e)[1] - canvas.offsetTop;
  xCoord.innerText = "X: " + mx;
  yCoord.innerText = "Y: " + my;
  // console.log(mx, my);
});

function getCursorPosition(e) {
  var x;
  var y;

  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return [x, y];
}

const calcDist = (x1, y1, x2, y2) => {
  var xPart = Math.pow(x2 - x1, 2);
  var yPart = Math.pow(y2 - y1, 2);
  return Math.sqrt(xPart + yPart);
};
