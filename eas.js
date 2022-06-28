const GRID_SIZE = 640;
var size = 16;
var color = 'black';

// CITE: https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
function isValidColor(strColor) {
  var s = new Option().style;
  s.color = strColor;

  // return 'false' if color wasn't assigned
  return s.color == strColor.toLowerCase();
}

function addCellListeners() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style.height = ((GRID_SIZE / size) - 2) + 'px';
    cell.style.width = ((GRID_SIZE / size) - 2) + 'px';
    cell.addEventListener('mouseenter', () => {
      cell.style.backgroundColor = color;
    });
  });
}

function addButtonListeners() {
  document.getElementById("size").addEventListener('click', () => {
    if (slider.value != size) {
      size = slider.value;
      clear();
      initialize(size);
    }
  });

  document.getElementById("clear").addEventListener('click', () => {
    clear();
    initialize(size);
  });
}

function initialize() {
  for (let i = 0; i < size; i++) {
    var col = document.createElement("div");
    col.classList.add("col");
    for (let i = 0; i < size; i++) {
      var cell = document.createElement("div");
      cell.classList.add("cell");
      col.appendChild(cell);
    }
    document.getElementById("grid").appendChild(col);
  }
  addCellListeners();
}

function clear() {
  const cols = document.querySelectorAll(".col");
  cols.forEach(col => col.remove());
}

initialize();
addButtonListeners();

var slider = document.getElementById("myRange");
document.getElementById("myRange").defaultValue = "16";
var val = slider.value;
document.getElementById("dim").textContent = val + " x " + val;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  var val = this.value;
  document.getElementById("dim").textContent = val + " x " + val;
}

var pickColor = document.getElementById("color");
pickColor.oninput = function() {
  color = this.value;
}

var pen = document.getElementById("pen");
pen.addEventListener('click', () => {
  if (pen.textContent == "Pen") {
    color = 'white';
    pen.textContent = "Eraser";
  } else {
    color = pickColor.value;
    pen.textContent = "Pen";
  }
});
