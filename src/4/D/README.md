[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## D. Простая задача коммивояжера
Неориентированный взвешенный граф задан матрицей смежности. Найдите кратчайший цикл, который начинается и заканчивается в вершине номер 1 и проходит через все вершины по одному разу.

### Формат ввода
В первой строке вводится число N (N ≤ 10) — количество вершин графа. Следующие N строк содержат по N целых неотрицательных чисел и задают матрицу смежности. Число 0 означает, что ребро отстутствует. Любое другое число задаёт вес ребра.
### Формат вывода
Выведите минимальную суммарную длину цикла или число -1, если цикл построить невозможно.
```
 const fs = require('fs');
 let fileContent = fs.readFileSync("input.txt", "utf8").toString().trim();
let data = fileContent.split('\n'),
    count = Number(data[0]),
    matrix = [0, ...data.slice(1).map(str => [0,...str.trim().split(' ').map(Number)])];

const shortest = (matrix, start) => {
  let result = Infinity;
  
  const foo = (current, visited = {}, distance = 0) => {

    if (distance >= result) return;
    
    const visitedLength = Object.keys(visited).length;     
    if (start === current && visited[start] && visitedLength === count) {
      result = Math.min(result, distance);
      return;
    }
    
    visited[current] = true;
    
    const neighbors = matrix[current];

    for (let i = 0; i <= neighbors.length; i++) {
      if (neighbors[i] > 0 && (!visited[i] || (i === start && visitedLength+1 === count))) 
        foo(i, {...visited}, distance + neighbors[i]);
    }
  }
  foo(1);
  
  return result;
}
let result = shortest(matrix, 1)
console.log(result)
if (count === 1) 
	fs.writeFileSync("output.txt", "0") 
else if (result === Infinity)
	fs.writeFileSync("output.txt", "-1")
else
	fs.writeFileSync("output.txt", result.toString())
```