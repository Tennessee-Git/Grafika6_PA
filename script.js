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
let clickCheckbox = document.getElementById("click");

let mx, my;
let clicks = 0;
let lastClick = [0, 0];

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
  canvas.removeEventListener("mousemove", moveBeg);
  canvas.removeEventListener("mousemove", moveEnd);
  canvas.removeEventListener("mousemove", moveP1);
  canvas.removeEventListener("mousemove", moveP2);
};

const calcDist = (x1, y1, x2, y2) => {
  var xPart = Math.pow(x2 - x1, 2);
  var yPart = Math.pow(y2 - y1, 2);
  return Math.sqrt(xPart + yPart);
};

const checkPointClicked = () => {
  let output = "null";
  if (calcDist(mx, my, beg.getX, beg.getY) <= 5) {
    output = "beg";
  }
  if (calcDist(mx, my, end.getX, end.getY) <= 5) {
    output = "end";
  }
  if (calcDist(mx, my, P1.getX, P1.getY) <= 5) {
    output = "p1";
  }
  if (calcDist(mx, my, P2.getX, P2.getY) <= 5) {
    output = "p2";
  }
  return output;
};

const clearCanvasAndDraw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCurve();
  drawControlPoints();
};

const moveBeg = (e) => {
  mx = getCursorPosition(e)[0] - canvas.offsetLeft;
  my = getCursorPosition(e)[1] - canvas.offsetTop;
  beg.setX = mx;
  beg.setY = my;
  clearCanvasAndDraw();
};

const moveEnd = (e) => {
  mx = getCursorPosition(e)[0] - canvas.offsetLeft;
  my = getCursorPosition(e)[1] - canvas.offsetTop;
  end.setX = mx;
  end.setY = my;
  clearCanvasAndDraw();
};

const moveP1 = (e) => {
  mx = getCursorPosition(e)[0] - canvas.offsetLeft;
  my = getCursorPosition(e)[1] - canvas.offsetTop;
  P1.setX = mx;
  P1.setY = my;
  clearCanvasAndDraw();
};

const moveP2 = (e) => {
  mx = getCursorPosition(e)[0] - canvas.offsetLeft;
  my = getCursorPosition(e)[1] - canvas.offsetTop;
  P2.setX = mx;
  P2.setY = my;
  clearCanvasAndDraw();
};

const setCoordsFromInputs = () => {
  beg.setX = begX.value ? begX.value : 10;
  beg.setY = begY.value ? begY.value : 10;
  end.setX = endX.value ? endX.value : 100;
  end.setY = endY.value ? endY.value : 100;
  P1.setX = p1X.value ? p1X.value : 100;
  P1.setY = p1Y.value ? p1Y.value : 10;
  P2.setX = p2X.value ? p2X.value : 10;
  P2.setY = p2Y.value ? p2Y.value : 100;
};

function drawLine(e) {
  x = getCursorPosition(e)[0] - canvas.offsetLeft;
  y = getCursorPosition(e)[1] - canvas.offsetTop;

  if (clicks != 1) {
    clicks++;
  } else {
    beg.setX = lastClick[0];
    beg.setY = lastClick[1];
    end.setX = x;
    end.setY = y;
    let xM = (lastClick[0] + x) / 2;
    let yM = (lastClick[1] + y) / 2;

    let xBegM = (lastClick[0] + xM) / 2;
    let yBegM = (lastClick[1] + yM) / 2;

    let xEndM = (x + xM) / 2;
    let yEndM = (y + yM) / 2;

    //find a better way to calculate P1 above line and P2 below line
    P1.setX = xBegM;
    P1.setY = yBegM;
    P2.setX = xEndM;
    P2.setY = yEndM;
    clicks = 0;
    clearCanvasAndDraw();
  }

  lastClick = [x, y];
}

p2Y.addEventListener("input", () => {
  P2.setY = p2Y.value;
});

canvas.addEventListener("mousemove", (e) => {
  mx = getCursorPosition(e)[0] - canvas.offsetLeft;
  my = getCursorPosition(e)[1] - canvas.offsetTop;
  xCoord.innerText = "X: " + mx;
  yCoord.innerText = "Y: " + my;
});

canvas.addEventListener("mousedown", () => {
  let clicked = checkPointClicked();
  if (clicked === "beg") {
    canvas.addEventListener("mousemove", moveBeg);
  }
  if (clicked === "end") {
    canvas.addEventListener("mousemove", moveEnd);
  }
  if (clicked === "p1") {
    canvas.addEventListener("mousemove", moveP1);
  }
  if (clicked === "p2") {
    canvas.addEventListener("mousemove", moveP2);
  }
});

canvas.addEventListener("mouseup", () => {
  removeCanvasEventListeners();
});

clickCheckbox.addEventListener("change", () => {
  if (clickCheckbox.checked) {
    drawButton.disabled = true;
    removeCanvasEventListeners();
    canvas.addEventListener("click", drawLine);
    canvas.addEventListener("mousedown", () => {
      let clicked = checkPointClicked();
      if (clicked === "beg") {
        canvas.addEventListener("mousemove", moveBeg);
      }
      if (clicked === "end") {
        canvas.addEventListener("mousemove", moveEnd);
      }
      if (clicked === "p1") {
        canvas.addEventListener("mousemove", moveP1);
      }
      if (clicked === "p2") {
        canvas.addEventListener("mousemove", moveP2);
      }
    });
  } else {
    drawButton.disabled = false;
    canvas.removeEventListener("click", drawLine);
  }
});

drawButton.addEventListener("click", () => {
  setCoordsFromInputs();
  clearCanvasAndDraw();
});
