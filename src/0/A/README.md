[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## A. Не минимум на отрезке
Задана последовательность целых чисел a1, a2, …, an. Задаются запросы: сказать любой элемент последовательности на отрезке от L до R включительно, не равный минимуму на этом отрезке. 

### Формат ввода
В первой строке содержатся два целых числа N, 1 ≤ N ≤ 100 и M, 1 ≤ M ≤ 1000 — длина последовательности и количество запросов соответственно.
Во второй строке — сама последовательность, 0 ≤ ai ≤ 1000.
Начиная с третьей строки перечисляются M запросов, состоящих из границ отрезка L и R, где L, R - индексы массива, нумеруются с нуля.

### Формат вывода
На каждый запрос выведите в отдельной строке ответ — любой элемент на [L, R], кроме минимального. В случае, если такого элемента нет, выведите "NOT FOUND". 
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().split('\n')
const testsCount = Number(data[0].split(' ')[1]);
const array = data[1].split(' ').map(v => Number(v));
let tests = [];
for (let i = 0; i < testsCount; i++) {
	tests.push(data[i+2].split(' ').map(v => Number(v)))
}

let result = [];
tests.forEach(test => {
    let pivot = array[test[0]];
    for (let i = test[0]+1; i <= test[1]; i++) {
      if (array[i] !== pivot) {
        result.push(Math.max(array[i], pivot))
        return;
      }
    }
    
  	result.push('NOT FOUND')
})

fs.writeFileSync("output.txt", result.join('\n'))
```

