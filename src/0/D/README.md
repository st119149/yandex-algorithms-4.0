[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## D. Анаграмма?
Задано две строки, нужно проверить, является ли одна анаграммой другой. Анаграммой называется строка, полученная из другой перестановкой букв.

### Формат ввода
Строки состоят из строчных латинских букв, их длина не превосходит 100000. Каждая записана в отдельной строке.

### Формат вывода
Выведите "YES" если одна из строк является анаграммой другой и "NO" в противном случае.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const [first,second] = fileContent.toString().split('\n')


let chars = {};

for (let i = 0; i < first.length; i++) {
	chars[first[i]] = !chars[first[i]];
    chars[second[i]] = !chars[second[i]];
}

let isAnagram = true;
for (let char in chars) {
	if (chars[char]) {
    	isAnagram = false;
    }
}

fs.writeFileSync("output.txt", isAnagram ? 'YES' : 'NO')
```