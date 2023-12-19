[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## J. Групповой проект
Всего студентов по направлению «Мировая культура» — n человек. Преподаватель дал задание — групповой проект. Для выполнения этого задания студенты должны разбиться на группы численностью от a до b человек. Скажите, можно ли разбить всех студентов на группы для выполнения проекта или преподаватель что-то перепутал.

### Формат ввода
В первой строке вводится число t (1 ≤ t ≤ 100) — количество тестовых случаев. Далее для каждого тестового случая вводится 3 целых числа n, a и b (1 ≤ n ≤ 109, 1 ≤ a ≤ b ≤ n) — общее число студентов и ограничение на число студентов в одной группе.

### Формат вывода
Для каждого тестового случая выведите "YES", если можно разбить студентов на группы и "NO", если нельзя.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n')

const testsCount = Number(data[0])

let tests = [];

for (let i = 0; i < testsCount; i++) {
  tests.push(data[i+1].split(' ').map(v => Number(v)))
}

let result = [];

tests.forEach(test => {
  
  const [count, min, max] = test;
  
  let freeSlot = count % min,
      slotsCount = Math.floor(count/min);
      
  freeSlot -= (max-min)*slotsCount;
 
  result.push(freeSlot > 0 ? 'NO' : 'YES')
    
})

fs.writeFileSync("output.txt", result.join('\n'))
```