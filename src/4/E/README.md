[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## E. Генерация правильных скобочных последовательностей - 2
По данному числу n выведите все правильные скобочные последовательности из круглых и квадратных скобок длины n в лексикографическом порядке.

### Формат ввода
Одно целое число n (0 ≤ n ≤ 16).

### Формат вывода
Выведите все правильные скобочные последовательности из круглых и квадратных скобок длины n в лексикографическом порядке. Каждая последовательность должна выводиться в новой строке. 
```
const fs = require('fs')

let n = Number(fs.readFileSync("brackets2.in", "utf8").toString().trim());

function getLastOpen(data) {
  let roundCount = 0, squareCount = 0;
  
  for (let i = data.length-1; i >= 0; i--) {
    if (data[i] === ']') {
      squareCount++;
    }
    if (data[i] === ')') {
      roundCount++;
    }
    if (data[i] === '[') {
      squareCount--;
    }
    if (data[i] === '(') {
      roundCount--;
    }
    if (roundCount < 0) return '(';
    if (squareCount < 0) return '[';
  }
}

function getBrackets(n) {
  if (n % 2 === 1) return '';
  let result = '', count = 0;

  function foo(temp = '', roundDiff=0,squareDiff = 0) {
    if (temp.length === n) {
      if (count > 30) {
      	fs.appendFileSync("brackets2.out", result);
        result = '';
        count = 0;
      }
      result += temp + '\n';
      count++;
      return;
    }

	let isRestOpenAble = n-temp.length > roundDiff + squareDiff
    
    if (isRestOpenAble)  
      foo(temp+'(',  roundDiff+1,squareDiff);
    
      
    if (isRestOpenAble) 
      foo(temp+'[', roundDiff,squareDiff+1);
      
    if (roundDiff > 0 && getLastOpen(temp) === '(') 
      foo(temp+')',roundDiff-1,squareDiff);
    
      
    if (squareDiff > 0 && getLastOpen(temp) === '[') 
      foo(temp+']', roundDiff,squareDiff-1);
    
  }
  foo();
  return result;
}
fs.appendFileSync("brackets2.out", getBrackets(n));

```