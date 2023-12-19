[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## G. Кролик учит геометрию
Кролики очень любопытны. Они любят изучать геометрию, бегая по грядкам. Наш кролик как раз такой. Сегодня он решил изучить новую фигуру — квадрат.
Кролик бегает по грядке — клеточному полю N × M клеток. В некоторых из них посеяны морковки, в некоторых нет.
Помогите кролику найти сторону квадрата наибольшей площади, заполненного морковками полностью.

### Формат ввода
В первой строке даны два натуральных числа N и M (, ). Далее в N строках расположено по M чисел, разделенных пробелами (число равно 0, если в клетке нет морковки или 1, если есть).

### Формат вывода
Выведите одно число — сторону наибольшего квадрата, заполненного морковками.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n');
const rowsCount = Number(data[0].split(' ')[0]);
let array = [];

for (let i = 1; i <= rowsCount; i++) {
  array.push(data[i].split(' ').map(v => Number(v)))
}

function getSquareLength(array) {
  let dp = new Array(rowsCount).fill(1).map(v => []);
  let max = 0;
  
  for (let i = 0; i < array.length; i++) {
   
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 0) {
        dp[i][j] = 0
      } else {
        dp[i][j] = Math.min(dp[i-1]?.[j-1] ?? 0, dp[i-1]?.[j] ?? 0, dp[i]?.[j-1] ?? 0) + 1;
        max = Math.max(dp[i][j],max)
      }
    } 
  }
  return max
  
}

fs.writeFileSync("output.txt", getSquareLength(array).toString())
```