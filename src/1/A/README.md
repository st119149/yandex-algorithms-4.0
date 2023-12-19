[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## A. Partition
Базовым алгоритмом для быстрой сортировки является алгоритм partition, который разбивает набор элементов на две части относительно заданного предиката.
По сути элементы массива просто меняются местами так, что левее некоторой точки в нем после этой операции лежат элементы, удовлетворяющие заданному предикату, а справа — не удовлетворяющие ему.
Например, при сортировке можно использовать предикат «меньше опорного», что при оптимальном выборе опорного элемента может разбить массив на две примерно равные части.
Напишите алгоритм partition в качестве первого шага для написания быстрой сортировки.

### Формат ввода
В первой строке входного файла содержится число N — количество элементов массива (0 ≤ N ≤ 106).
Во второй строке содержатся N целых чисел ai, разделенных пробелами (-109 ≤ ai ≤ 109).
В третьей строке содержится опорный элемент x (-109 ≤ x ≤ 109).
Заметьте, что x не обязательно встречается среди ai.

### Формат вывода
Выведите результат работы вашего алгоритма при использовании предиката «меньше x»: в первой строке выведите число элементов массива, меньших x, а во второй — количество всех остальных.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let [count, array, x] = fileContent.toString().split('\n');

array = array.split(' ').map(v => Number(v));
x = Number(x);
count = Number(count);



function partition(array, x) {
  let e = 0, g = 0;
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] === x) {
      [array[g], array[i]] = [array[i], array[g]];
      g++;
    }
    
    if (array[i] < x) {
      [array[g], array[i]] = [array[i], array[g]];
      [array[e], array[g]] = [array[g], array[e]];
      g++;
      e++;
    }
  }
  //return array
  return e
}

const less = partition(array,x);
const bigger = array.length - partition(array,x)

fs.writeFileSync("output.txt", count === 0 ? '0\n0' : [less,bigger].join('\n'))
```