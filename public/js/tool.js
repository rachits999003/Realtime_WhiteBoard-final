// connect to socket server
const socket = io.connect("https://drawease.onrender.com");
// *********************************Basic Setup
const board = document.querySelector(".board");
board.height = window.innerHeight;
board.width = window.innerWidth;
// canvasRenderingContext2d=> tool
const ctx = board.getContext("2d");
ctx.strokeStyle = "blue";
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3;

// ************************Change Size**************************//
function sizeChange(value) {
  ctx.lineWidth = value;
  socket.emit("size", value);
}

// **tool Change***************************************************//
function handleLocaltoolChange(tool) {
  handleToolChange(tool);
  if (tool != "sticky");
  socket.emit("toolchange", tool);
}
// ******************handle color****************************
function handleColorChange(color) {
  ctx.strokeStyle = color;
  socket.emit("color", color);
}

const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function () {
  handleHamburger()

  socket.emit("hamburger");
});

// ******************Clear Canvas****************************
const clearTool = document.querySelector(".clear-tool");
clearTool.addEventListener("click", function () {
  if (confirm("Are you sure you want to clear the canvas?")) {
    handleClearCanvas();
    socket.emit("clear");
  }
});

function handleClearCanvas() {
  ctx.clearRect(0, 0, board.width, board.height);
  undoStack = [];
  redoStack = [];
}

