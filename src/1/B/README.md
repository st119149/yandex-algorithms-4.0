[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## B. Быстрая сортировка
Реализуйте быструю сортировку, используя алгоритм из предыдущей задачи.
На каждом шаге выбирайте опорный элемент и выполняйте partition относительно него. Затем рекурсивно запуститесь от двух частей, на которые разбился исходный массив.

### Формат ввода
В первой строке входного файла содержится число N — количество элементов массива (0 ≤ N ≤ 106).
Во второй строке содержатся N целых чисел ai, разделенных пробелами (-109 ≤ ai ≤ 109).

### Формат вывода
Выведите результат сортировки, то есть N целых чисел, разделенных пробелами. 
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n');
const length = Number(data[0]);
const array = data[1].split(' ').map(v => Number(v))

function partition(array, from, to, x) {
  let e = from, g = from;
  
  for (let i = from; i < to; i++) {
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
  return [e,g]
}

function quickSort(array, from = 0, to = array.length) {
	if (to-from <= 1) {
    	return array;
    }
    const random = array[Math.floor(from + Math.random()*(to-from))]

    let [e,g] = partition(array, from, to, random)

    quickSort(array, from, e)
    quickSort(array, g, to)
    return array
}


if (length != 0) {
	fs.writeFileSync("output.txt", quickSort(array).join(' '));
}
```