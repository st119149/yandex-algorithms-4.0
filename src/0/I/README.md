[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## I. Правильная скобочная последовательность
Рассмотрим последовательность, состоящую из круглых, квадратных и фигурных скобок. Программа должна определить, является ли данная скобочная последовательность правильной. Пустая последовательность является правильной. Если A — правильная, то последовательности (A), [A], {A} — правильные. Если A и B — правильные последовательности, то последовательность AB — правильная.

### Формат ввода
В единственной строке записана скобочная последовательность, содержащая не более 100000 скобок.

### Формат вывода
Если данная последовательность правильная, то программа должна вывести строку "yes", иначе строку "no". 
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim();

let temp = [];

for (let i = 0; i < data.length; i++) {
  if (
    data[i] === ')' && temp[temp.length-1] === '(' ||
    data[i] === ']' && temp[temp.length-1] === '[' ||
    data[i] === '}' && temp[temp.length-1] === '{'
  ) {
      temp.pop();
      continue;
  }
  temp.push(data[i]);
}

fs.writeFileSync("output.txt", temp.length ? 'no' : 'yes')
```