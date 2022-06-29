const GRID_SIZE = 640;
// I hate this global variable but idk how to do this without pointers :/
var color = "black";

function clear() {
  const cols = document.querySelectorAll(".col");
  cols.forEach(col => col.remove());
}

function addCellListeners(size) {
  // cell listeners
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style.height = ((GRID_SIZE / size) - 2) + 'px';
    cell.style.width = ((GRID_SIZE / size) - 2) + 'px';
    cell.addEventListener('mouseenter', () => {
      cell.style.backgroundColor = color;
    });
  });
}

function initialize(size) {
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
  addCellListeners(size);
}

function main() {
  var size = 16;
  initialize(size);

  // color picker listeners
  const pickColor = document.getElementById("color")
  pickColor.oninput = function() {
    color = this.value;
  }

  // pen and eraser selector listeners
  const pen = document.getElementById("pen");
  pen.addEventListener('click', () => {
    if (pen.textContent == "Pen") {
      pen.textContent = "Eraser";
      color = 'white';
    } else {
      pen.textContent = "Pen";
      color = pickColor.value;
    }
  });

  // clear button listener
  document.getElementById("clear").addEventListener('click', () => {
    clear();
    initialize(size);
  });

  // grid size slider listener
  const slider = document.getElementById("myRange");
  document.getElementById("myRange").defaultValue = "16";
  var val = slider.value;
  document.getElementById("dim").textContent = val + " x " + val;
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    var val = this.value;
    document.getElementById("dim").textContent = val + " x " + val;
  }

  // apply grid size listners
  document.getElementById("size").addEventListener('click', () => {
    if (slider.value != size) {
      size = slider.value;
      clear();
      initialize(size);
    }
  });

  // toggle gridline listener
  const gridlines = document.getElementById("lines");
  gridlines.addEventListener('click', () => {
    if (gridlines.textContent == "Hide Grid") {
      var cells = document.querySelectorAll(".cell");
      cells.forEach(cell => cell.style.borderColor = "transparent");
      gridlines.textContent = "Show Grid";
    } else {
      var cells = document.querySelectorAll(".cell");
      cells.forEach(cell => cell.style.borderColor = "gray");
      gridlines.textContent = "Hide Grid"
    }
  });
}

main();
