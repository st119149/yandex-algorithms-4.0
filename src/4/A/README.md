[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

# Занятие 4 (Перебор и методы его оптимизации)
## A. Все перестановки заданной длины
По данному числу N (0 < N < 10) выведите все перестановки чисел от 1 до N в лексикографическом порядке. 
```
const fs = require('fs')
let count = Number(fs.readFileSync("input.txt", "utf8").toString());

function getNums(count) {
  let result = [];
  let arr = Array(count).fill(1).map((v,i) => i+1);
  
  const foo = (temp = '') => {
  	if (temp.length === count) {
   		result.push(temp)
      return;
   	}
      
     for (let num of arr) {
    	if (!temp.includes(num))
    		foo(temp.concat(num));
    }
  }
  foo();
  return result;
}

fs.writeFileSync("output.txt", getNums(count).join('\n').trim())
```