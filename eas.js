const GRID_SIZE = 704;
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
    size = prompt("Input a new grid size:", size);
    while (size > 64 || size < 8) {
      size = prompt("Input a new grid size (between 8 and 64):", size);
    }
    clear();
    initialize(size);
  });

  document.getElementById("clear").addEventListener('click', () => {
    clear();
    initialize(size);
  });

  document.getElementById("color").addEventListener('click', () => {
    color = prompt("Input a new color:", color);
    while (!isValidColor(color)) {
      color = prompt("Please try again:", color);
    }
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
