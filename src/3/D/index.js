const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8").toString();

const data = fileContent.trim().split('\n'),
  count = Number(data[0]),
  [from, to] = data[1].split(' ').map(Number),
  schedule = data.slice(3).reduce((acc, str) => {
    const [from, start, to, end] = str.split(' ').map(Number);
    acc[from] = {
      ...(acc[from] ?? {}),
      [to]: [...(acc[from]?.[to] ?? []), [start, end]],
    };
    return acc;
  }, {});


function findNearestVertex(distances, visited) {
  let minDistance = [Infinity, -Infinity];
  let nearestVertex = null;
  Object.keys(distances).forEach(vertex => {
    if (!visited[vertex] && distances[vertex][0] < minDistance[0]) {
      minDistance = distances[vertex];
      nearestVertex = vertex;
    }
  });

  return nearestVertex;
}


function dijkstra(graph, startVertex, endVertex) {
  let visited = {};
  let distances = {}; 

  let vertices = Object.keys(graph); 

  vertices.forEach(vertex => {
    distances[vertex] = [Infinity, -Infinity];
  });

  distances[startVertex] = [0,0];
  distances[endVertex] = [Infinity, -Infinity];

  function handleVertex(vertex) {
    let neighbours = graph[activeVertex];
    const activeDistance = distances[vertex];
    if (neighbours) {
      Object.keys(neighbours).forEach(neighbourVertex => {
        let timings = graph[vertex][neighbourVertex];

        timings.forEach(([start, end]) => {
            let currentNeighbourDistance = distances[neighbourVertex];
            if (start >= activeDistance[0] && (end < currentNeighbourDistance[0] || end > currentNeighbourDistance[1])) {
              distances[neighbourVertex] = [
                Math.min( end, currentNeighbourDistance[0]),
                Math.max( end, currentNeighbourDistance[1])
              ];
            }
           
        });
      });
    }
    visited[vertex] = 1;
  }

  let activeVertex = findNearestVertex(distances, visited);
  do {
    handleVertex(activeVertex);
    activeVertex = findNearestVertex(distances, visited);
  } while (activeVertex);

  return distances;
}

if (from === to) {
	fs.writeFileSync("output.txt", "0");
} else {
	const distances = dijkstra(schedule, from, to);
	fs.writeFileSync("output.txt", String(distances[to][0] !== Infinity ? distances[to][0] : -1));
}

