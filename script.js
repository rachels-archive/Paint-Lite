const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

if (!canvas.getContext) {
  alert("This browser is not supported");
}

window.addEventListener("load", () => {
  resize();
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mousemove", drawing);
  window.addEventListener("resize", resize);
});

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

let coord = { x: 0, y: 0 };
let isDrawing = false;

function getPosition(e) {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;
}

function startDrawing(e) {
  isDrawing = true;
  getPosition(e);
}

function stopDrawing() {
  isDrawing = false;
}

function drawing(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.moveTo(coord.x, coord.y);
  getPosition(e);

  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

/*
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};
*/
