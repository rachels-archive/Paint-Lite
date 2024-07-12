const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColour = document.querySelector("#fill-colour"),
  sizeSlider = document.querySelector("#size-slider"),
  colourOptions = document.querySelectorAll(".palette .option"),
  ctx = canvas.getContext("2d");

if (!canvas.getContext) {
  alert("This browser is not supported");
}

document.addEventListener("DOMContentLoaded", function () {
  const brushSizeInput = document.querySelector("#size-slider");
  console.log("Initial value:", brushSizeInput.value);
  // Any other initialization code for the range input
});

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

let startX, startY, snapshot;
let isDrawing = false;
brushWidth = 3;
selectedTool = "brush";
selectedColour = "#000";

function getPosition(e) {
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;
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
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow(startX - e.offsetX, 2) + Math.pow(startY - e.offsetY, 2));

  ctx.arc(startX, startY, radius, 0, 2 * Math.PI);

  fillColour.checked ? ctx.fill() : ctx.stroke();
}

function drawTriangle(e) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(startX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  fillColour.checked ? ctx.fill() : ctx.stroke();
}

function drawing(e) {
  if (!isDrawing) return;

  ctx.lineWidth = brushWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = selectedColour;
  ctx.fillStyle = selectedColour;

  if (selectedTool == "brush") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    getPosition(e);

    ctx.lineTo(startX, startY);
    ctx.stroke();
  } else if (selectedTool == "rectangle") {
    // add copied canvas data to this canvas
    ctx.putImageData(snapshot, 0, 0);
    drawRectangle(e);
  } else if (selectedTool == "circle") {
    ctx.putImageData(snapshot, 0, 0);
    drawCircle(e);
  } else {
    ctx.putImageData(snapshot, 0, 0);
    drawTriangle(e);
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

colourOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".options .selected").classList.remove("selected");
    option.classList.add("selected");
    selectedColour = document.querySelector(".options .selected").id;
  });
});

sizeSlider.addEventListener("change", () => {
  brushWidth = sizeSlider.value;
});
