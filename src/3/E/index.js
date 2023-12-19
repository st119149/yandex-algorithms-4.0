const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8").toString();

const data = fileContent.trim().split('\n'),
 vCount = Number(data[0]),
 coachesStats = data.slice(1, vCount+1).reduce((acc,str,i) => {
   acc[i+1] = str.split(' ').map(Number);
   return acc;
   }, {}),
 graph = data.slice(vCount+1).reduce((acc, str) => {
   const [from, to, value] = str.split(' ').map(Number);
   acc[from] = { ...(acc[from] ?? {}), [to]: value};
   acc[to] = { ...(acc[to] ?? {}), [from]: value};
   return acc;
 }, {});
 

function findNearestVertex(distances, visited) {
 let minDistance = Infinity;
 let nearestVertex = null;

 Object.keys(distances).forEach(vertex => {
   if (!visited[vertex] && distances[vertex] < minDistance) {
     minDistance = distances[vertex];
     nearestVertex = vertex;
   }
 });

 return nearestVertex;
}


function dijkstra(graph, startVertex, endVertex) {
 let visited = {};
 let distances = {}; 
 let previous = {};

 let vertices = Object.keys(graph);

 vertices.forEach(vertex => {
   distances[vertex] = Infinity;
 });

 distances[startVertex] = 0;

 function handleVertex(vertex) {
   let activeVertexDistance = distances[vertex];

   let neighbours = graph[activeVertex];
   
   if (neighbours) {
       Object.keys(neighbours).forEach(neighbourVertex => {
         let currentNeighbourDistance = distances[neighbourVertex];
         let newNeighbourDistance =
           activeVertexDistance + neighbours[neighbourVertex];
   
         if (newNeighbourDistance < currentNeighbourDistance) {
           distances[neighbourVertex] = newNeighbourDistance;
           previous[neighbourVertex] = vertex;
         }
       });
   }
  

   visited[vertex] = 1;
 }

 let activeVertex = findNearestVertex(distances, visited);

 while (activeVertex) {
   handleVertex(activeVertex);
   activeVertex = findNearestVertex(distances, visited);
 }

 return {distances,previous};
}

let paths = Object.keys(graph).reduce((acc,v) => {
 acc[v] = {};
 return acc
}, {})
for (let key1 in graph) {
 const key1Paths =  dijkstra(graph, key1).distances,
       coach = coachesStats[key1];
 for (let key2 in graph) {
   if (key1 !== key2) {
     let path = key1Paths[key2]/coach[1] + coach[0];
     paths[key2][key1] = path     
   }
 }
}

let maxI, {previous,distances} = dijkstra(paths,1);
for (let key in distances) {
 if (distances[key] > (distances[maxI] ?? 0)) maxI = key 
}

let result = distances[maxI] + '\n' + maxI + ' ',
   current = previous[maxI];
do {
 result += current + ' ';
 current = previous[current];
}
while(current !== undefined)

fs.writeFileSync("output.txt", result.trim());
