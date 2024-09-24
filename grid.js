let rows = 100;
let cols = 26;
let addressRowCont = document.querySelector(".address-row-cont");
let addressColCont = document.querySelector(".address-col-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar")
for (let i = 1; i <= rows; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerHTML = i;
  addressColCont.appendChild(addressCol);
}

for (let i = 0; i < cols; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerHTML = String.fromCharCode(65 + i);
  addressRowCont.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true")
    cell.setAttribute("spellcheck", "false")
    // Attribute for cell and storage identification 
    cell.setAttribute("rid", i)
    cell.setAttribute("cid", j)
    rowCont.appendChild(cell);
    addListenerForAddressBarDisplay(cell, i,j)
  }
  cellsCont.appendChild(rowCont);
}

function addListenerForAddressBarDisplay(cell, i , j){
    cell.addEventListener("click", (e)=>{
        let rowId = i+ 1
        let colId = String.fromCharCode(65 + j)
        addressBar.value = `${colId}${rowId}`
    })
}

// by default on first cell
let firstCell = document.querySelector(".cell")
firstCell.click()