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
let drawButton = document.getElementById("draw");

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get getX() {
    return this.x;
  }
  get getY() {
    return this.y;
  }

  set setX(x) {
    this.x = x;
  }

  set setY(y) {
    this.y = y;
  }
}

let beg = new Point(-1, -1),
  end = new Point(-1, -1),
  P1 = new Point(-1, -1),
  P2 = new Point(-1, -1);

const getCursorPosition = (e) => {
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
};

const calcDist = (x1, y1, x2, y2) => {
  var xPart = Math.pow(x2 - x1, 2);
  var yPart = Math.pow(y2 - y1, 2);
  return Math.sqrt(xPart + yPart);
};

// Source: https://en.wikipedia.org/wiki/B%C3%A9zier_curve - Cubic Bezier Curves section
const calculateCurve = () => {
  var curveArray = [];
  var t = 0,
    tValuesArray = [];
  for (let i = 0; i < 1000; i++) {
    tValuesArray.push(t);
    t += 0.001;
  }
  for (let i = 0; i < 1000; i++) {
    //x = (1-t)^3 * x1 + (3 * (1-t)^2 * t * x2) + (3 * (1 - t) * t^2 * x3) + t^3 * x4
    var x =
      Math.pow(1 - tValuesArray[i], 3) * beg.getX +
      3 * Math.pow(1 - tValuesArray[i], 2) * tValuesArray[i] * P1.getX +
      3 * (1 - tValuesArray[i]) * Math.pow(tValuesArray[i], 2) * P2.getX +
      Math.pow(tValuesArray[i], 3) * end.getX;
    //y = (1-t)^3 * y1 + (3 * (1-t)^2 * t * y2) + (3 * (1 - t) * t^2 * y3) + t^3 * y4
    var y =
      Math.pow(1 - tValuesArray[i], 3) * beg.getY +
      3 * Math.pow(1 - tValuesArray[i], 2) * tValuesArray[i] * P1.getY +
      3 * (1 - tValuesArray[i]) * Math.pow(tValuesArray[i], 2) * P2.getY +
      Math.pow(tValuesArray[i], 3) * end.getY;
    curveArray.push(new Point(x, y));
  }
  return curveArray;
};

const drawCurve = () => {
  let curveArray = calculateCurve();
  curveArray.forEach((point) => {
    ctx.fillRect(point.getX, point.getY, 1, 1);
  });
};

const drawControlPoints = () => {
  ctx.fillStyle = "red";
  //P1
  ctx.beginPath();
  ctx.arc(P1.getX, P1.getY, 2.5, 0, 2 * Math.PI);
  ctx.fill();
  //P2
  ctx.beginPath();
  ctx.arc(P2.getX, P2.getY, 2.5, 0, 2 * Math.PI);
  ctx.fill();
  //beg
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(beg.getX, beg.getY, 2.5, 0, 2 * Math.PI);
  ctx.fill();
  //end
  ctx.beginPath();
  ctx.arc(end.getX, end.getY, 2.5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "black";
};

const removeCanvasEventListeners = () => {
  canvas.removeEventListener("click", drawLine);
  canvas.removeEventListener("click", drawCircle);
  canvas.removeEventListener("click", drawRectangleWithClicks);
  canvas.removeEventListener("click", drawRectangleWithParams);
  canvas.removeEventListener("mousedown", myMouseDown);
  canvas.removeEventListener("mouseup", myMouseUp);
  canvas.removeEventListener("mousemove", myMouseMove);
};

begX.addEventListener("input", () => {
  beg.setX = begX.value;
});

begY.addEventListener("input", () => {
  beg.setY = begY.value;
});

endX.addEventListener("input", () => {
  end.setX = endX.value;
});

endY.addEventListener("input", () => {
  end.setY = endY.value;
});

p1X.addEventListener("input", () => {
  P1.setX = p1X.value;
});

p1Y.addEventListener("input", () => {
  P1.setY = p1Y.value;
});

p2X.addEventListener("input", () => {
  P2.setX = p2X.value;
});

p2Y.addEventListener("input", () => {
  P2.setY = p2Y.value;
});

canvas.addEventListener("mousemove", (e) => {
  var mx = getCursorPosition(e)[0] - canvas.offsetLeft;
  var my = getCursorPosition(e)[1] - canvas.offsetTop;
  xCoord.innerText = "X: " + mx;
  yCoord.innerText = "Y: " + my;
});

drawButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCurve();
  drawControlPoints();
});
