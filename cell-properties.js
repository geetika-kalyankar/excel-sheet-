// Storage

let sheetDB = [];
for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      BGcolor: "#000000", //default value
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

// Selectors for cell properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";
// Attach properties listener
// Application of two way binding

// Functionality on Bold
bold.addEventListener("click", () => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);
  //   Modification
  cellProp.bold = !cellProp.bold; //data change
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change(1)
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp; // UI change(2)
});
// Functionality on Bold
italic.addEventListener("click", () => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);
  //   Modification
  cellProp.italic = !cellProp.italic; //data change
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI change(1)
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp; // UI change(2)
});
// Functionality on Bold
underline.addEventListener("click", () => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);
  //   Modification
  cellProp.underline = !cellProp.underline; //data change
  cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI change(1)
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp; // UI change(2)
});

// FontSize
fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);

  cellProp.fontSize = fontSize.value; //data change
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

// fontfamily
fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);

  cellProp.fontFamily = fontFamily.value; //data change
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

// FontColor
fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);

  cellProp.fontColor = fontColor.value; //data change
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

//Background color
BGcolor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);

  cellProp.BGcolor = BGcolor.value; //data change
  cell.style.backgroundColor = cellProp.BGcolor;
  BGcolor.value = cellProp.BGcolor;
});

// alignment
alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue; //Data Change
    cell.style.textAlign = cellProp.alignment; // UI change (1)

    switch (
      alignValue //UI change (2)
    ) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelector(".cell");
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
  // work
  let address = addressBar.value;
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  let cellProp = sheetDB[rid][cid];

  cell.addEventListener("click", (e) => {
    // cell properties
    cellProp.bold = !cellProp.bold; //data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change(1)
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI change(1)  // UI change(2)
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor
    cell.style.textAlign = cellProp.alignment; // UI change (1)


    // apply properties to UI Props container
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change(2)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // UI change(2)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // UI change(2)
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    fontFamily.value = cellProp.fontFamily;
    fontSize.value = cellProp.fontSize;
    switch (cellProp.alignment) {
        case "left":
          leftAlign.style.backgroundColor = activeColorProp;
          centerAlign.style.backgroundColor = inactiveColorProp;
          rightAlign.style.backgroundColor = inactiveColorProp;
          break;
        case "center":
          leftAlign.style.backgroundColor = inactiveColorProp;
          centerAlign.style.backgroundColor = activeColorProp;
          rightAlign.style.backgroundColor = inactiveColorProp;
          break;
        case "right":
          leftAlign.style.backgroundColor = inactiveColorProp;
          centerAlign.style.backgroundColor = inactiveColorProp;
          rightAlign.style.backgroundColor = activeColorProp;
          break;
      }

  });
}

function activecell(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  // Access cell and objects
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}
function decodeRIDCIDFromAddress(address) {
  //address -> "A1"
  let rid = Number(address.slice(1)) - 1; //"1"
  let cid = Number(address.charCodeAt(0) - 65); //"A" -> 65
  return [rid, cid];
}



