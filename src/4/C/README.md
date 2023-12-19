[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## C. Максимальный разрез
Взвешенный неориентированный граф без петель задан матрицей смежности. Распределите вершины по двум долям так, чтобы сумма весов рёбер, соединяющих вершины из разных долей, была максимальна.

### Формат ввода
Вводится число N (2 ≤ N ≤ 20) — количество вершин в графе.
В следующих N строках, содержащих по N целых чисел от 0 до 1000, задаётся матрица смежности. 0 означает отсутствие ребра.

### Формат вывода
В первой строке выведите суммарный вес рёбер, соединяющих вершины из разных долей.
Во второй строке выведите N чисел 1 или 2 — номера долей для каждой из вершин графа.
```
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8").toString();

const data = fileContent.trim().split('\n'), 
      vCount = Number(data[0]),
      matrix = data.slice(1).map(str => str.trim().split(' ').map(Number));

function getMax(matrix) {
  let result = {sum:0, parts: []},
      sums = {};
  
  function getSums(parts, sums) {
    let last = parts[parts.length-1],
        lastI = parts.length-1;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] !== last) {
        sums[i] += matrix[i][lastI]
      }
    }
    return sums;
  }
  
  function foo(parts = [2], sums = [...Array(matrix.length).fill(0)]) {
    let calculatedSums = getSums(parts, sums)
    if (parts.length === vCount) {
      let sum = calculatedSums.reduce((acc,v) => acc+v,0)
      if (sum > result.sum)
        result = {sum,parts}
      return;
    }
    foo(parts.concat(2), [...calculatedSums])
    foo(parts.concat(1), [...calculatedSums])
  }
  foo();
  
  return result;
}
      
const result = getMax(matrix)
fs.writeFileSync("output.txt", result.sum + '\n' + result.parts.join(' '))
```