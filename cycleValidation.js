let graphComponentMatrix = [];
let collectedGraphComponent = []
// for (let i = 0; i < rows; i++) {
//   let row = [];
//   for (let j = 0; j < cols; j++) {
//     // More then one child relation
//     row.push([]);
//   }
//   graphComponentMatrix.push(row);
// }
// True -> cycle, False -> Not cyclic
function isGraphCyclic(graphComponentMatrix) {
  // dependency -> visisted, dfVisited
  let visited = []; //Node visited trace
  let dfsVisited = []; //Node visited trace

  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow)
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if(visited[i][j] === false){
        let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
        if (response === true) return [i, j];
      }

    }
  }
  return null;
 
}

// start ->visited(true) dfsVis(true)
// end ->dfsVis(false)
// if vis[i][j] -> already explore path, so go back no use to explore again
// cycle Detection condition -> if (vis[i][j] == true && dfsVis[i][j] == true) -> cycle
// return -> true/false
function dfsCycleDetection(
  graphComponentMatrix,
  srcr,
  srcc,
  visisted,
  dfsVisited
) {
  visisted[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  // A1 - [[0, 1], [10, 12], [5, 9]]
  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
    if ((visisted[nbrr][nbrc] === false)) {
      let response = dfsCycleDetection(
        graphComponentMatrix,
        nbrr,
        nbrc,
        visisted,
        dfsVisited
      );
      if (response === true) return true; //found cycle so return immediatly no need to explore more path
    } else if (visisted[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true)
      return true;
  }

  dfsVisited[srcr][srcc] = false;
  return false;
}
