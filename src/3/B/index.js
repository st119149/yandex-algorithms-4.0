const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString();



const data = fileContent.trim().split('\n'),
      [vCount, start, end] = data[0].split(' ').map(Number),
      matrix = data.slice(1).reduce((matrix, string, i) => {
        matrix[i+1] = [0, ...string.split(' ').map(Number)]
        return matrix
      }, []),
      len = matrix.length - 1;
      
function findNearestVertex(distances, visited) {
  let minDistance = Infinity;
  let nearestVertex = null;

  distances.forEach((vertex, i) => {
    if (!visited[i] && distances[i] < minDistance) {
      minDistance = distances[i];
      nearestVertex = i;
    }
  });
  
  return nearestVertex;
}

function dijkstra(graph, startVertex) {
  let visited = [true];
  let distances = new Array(graph.length).fill(Infinity);
  let previous = [];
  distances[startVertex] = 0;

  function handleVertex(vertex) {
    let activeVertexDistance = distances[vertex]; 
    
    let neighbours = graph[vertex];
    
    neighbours.forEach((neighbourVertex, i) => {
      if (vertex !== i && neighbourVertex > 0) {
        let currentNeighbourDistance = distances[i];
        let newNeighbourDistance = activeVertexDistance + neighbours[i];
        
        if (newNeighbourDistance < currentNeighbourDistance) {
          distances[i] = newNeighbourDistance;
          previous[i] = vertex;
        }
      }
    });
    
    visited[vertex] = true;
  }
  let activeVertex = findNearestVertex(distances, visited);

  while(activeVertex) {
    handleVertex(activeVertex);
    activeVertex = findNearestVertex(distances, visited);
  }
  
  return {distances, previous};
}

const previous = dijkstra(matrix, start).previous;
let result = end,
    currentVertex = end;
while (currentVertex !== start) {
  if (previous[currentVertex] === undefined) {
    result = -1;
    break;
  }
  result = `${previous[currentVertex]} ${result}`;
  currentVertex = previous[currentVertex];
}
fs.writeFileSync("output.txt", result.toString())