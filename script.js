const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColour = document.querySelector("#fill-colour");
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

// global variables w default value
let coord = { x: 0, y: 0 };
let startX, startY, snapshot;
let isDrawing = false;
brushWidth = 3;
selectedTool = "brush";

function getPosition(e) {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;
}

function startDrawing(e) {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
  getPosition(e);

  //copying canvas data and pass as snapshot value
  // to avoid multiple copies of shapes when drawing shapes
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function stopDrawing() {
  isDrawing = false;
}

function drawRectangle(e) {
  console.log(fillColour.checked);
  if (!fillColour.checked) {
    return ctx.strokeRect(e.offsetX, e.offsetY, startX - e.offsetX, startY - e.offsetY);
  }
  ctx.fillRect(e.offsetX, e.offsetY, startX - e.offsetX, startY - e.offsetY);
}

function drawCircle(e) {
  ctx.beginPath(); // Start a new path
  let radius = Math.sqrt(Math.pow(startX - e.offsetX, 2) + Math.pow(startY - e.offsetY, 2));

  ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
  //ctx.stroke();

  fillColour.checked ? ctx.fill() : ctx.stroke();
}

function drawing(e) {
  if (!isDrawing) return;

  ctx.lineWidth = brushWidth;
  ctx.lineCap = "round";

  if (selectedTool == "brush") {
    ctx.beginPath();
    ctx.moveTo(coord.x, coord.y);
    getPosition(e);

    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  } else if (selectedTool == "rectangle") {
    // add copied canvas data to this canvas
    ctx.putImageData(snapshot, 0, 0);
    drawRectangle(e);
  } else if (selectedTool == "circle") {
    ctx.putImageData(snapshot, 0, 0);
    drawCircle(e);
  }
}

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});
