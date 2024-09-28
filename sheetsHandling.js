let activeSheetColor = "#ced6e0"


let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("Id", allSheetFolders.length);

  sheet.innerHTML = `
  <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
  `;

  sheetsFolderCont.appendChild(sheet);
  sheet.scrollIntoView()
  
  //DB
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet)
  handleSheetRemoval(sheet)
  sheet.click()

});

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e) => {
        // 2 represent right click
        if(e.button !== 2) return  
        
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length === 1){
            alert("You need to have atleast one sheet!")
            return 
        }

        let response = confirm("your sheet will be remove permanently, Are you sure?")
        if(response === false) return 
        let sheetIdx = Number(sheet.getAttribute("ID"))
        // DB removal
        collectedSheetDB.splice(sheetIdx, 1)
        collectedGraphComponent.splice(sheetIdx, 1)
        handleSheetUIRemoval(sheet)

        // By default assign DB to sheet 1 to active
        sheetDB = collectedSheetDB[0]
        graphComponentMatrix = collectedGraphComponent[0]
        handleSheetProperties()
    
    })
}

function handleSheetUIRemoval(sheet){
    sheet.remove()
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i  = 0; i < allSheetFolders.length; i++){
        allSheetFolders[i].setAttribute("Id", i)
        let sheetContent =   allSheetFolders[i].querySelector(".sheet-content")
        sheetContent.innerText = `sheet ${i+1}`
        allSheetFolders.style.backgroundColor = "transparent"
    }
    allSheetFolders[0].style.backgroundColor = activeSheetColor
}



function handleSheetDB(sheetIdx){
   sheetDB = collectedSheetDB[sheetIdx]
   graphComponentMatrix = collectedGraphComponent[sheetIdx]
}

function  handleSheetProperties(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click()
        }
    }
    let firstCell = document.querySelector(".cell")
    firstCell.click()
}

function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor = "transparent"
    }
    sheet.style.backgroundColor = activeSheetColor
}

function handleSheetActiveness(sheet){
    sheet.addEventListener("click", (e) => {
       let sheetIdx = Number(sheet.getAttribute("ID"))
       handleSheetDB(sheetIdx)
       handleSheetProperties()
       handleSheetUI(sheet)
    })
}



function createSheetDB() {
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
        BGcolor: "#000000", // Just for indication purpose,
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      // More then one child relation
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponent.push(graphComponentMatrix)
}
