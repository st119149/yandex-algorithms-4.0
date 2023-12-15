# Разминка
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

## B. Сложить две дроби
Даны две рациональные дроби: a/b и c/d. Сложите их и результат представьте в виде несократимой дроби m/n.

### Формат ввода
Программа получает на вход 4 натуральных числа a, b, c, d, каждое из которых не больше 100.

### Формат вывода
Программа должна вывести два натуральных числа m и n такие, что m/n=a/b+c/d и дробь m/n – несократима.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().split(' ').map(v => Number(v))

const mData = [ data[0]*data[3], data[1]*data[3], data[2]*data[1], data[3]*data[1] ]

let result = [mData[0]+mData[2], mData[1]]

for (let i = 2; i <= mData[0]; i++) {
	if (result[0]%i === 0 && result[1]%i === 0) {
    	result[0] /= i;
        result[1] /= i
        i--;
    }
    
}


fs.writeFileSync("output.txt", result.join(' '))
```
## C. Путешествие по Москве
Мэрия Москвы основательно подготовилась к празднованию тысячелетия города в 2147 году, построив под столицей бесконечную асфальтированную площадку, чтобы заменить все существующие в городе автомобильные дороги. В память о кольцевых и радиальных дорогах разрешили двигаться по площадке только двумя способами:
 1. В сторону точки начала координат или от неё. При этом из точки начала координат разрешено двигаться в любом направлении.
 2. Вдоль окружности с центром в начале координат и радиусом, который равен текущему расстоянию до начала координат. Двигаться вдоль такой окружности разрешается в любом направлении (по или против часовой стрелки).
Вам, как ведущему программисту ответственной инстанции поручено разработать модуль, который будет определять кратчайший путь из точки A, с координатами (xA, yA) в точку B с координатами (xB, yB). Считайте, что менять направление движения можно произвольное количество раз, но оно должно всегда соответствовать одному из двух описанных выше вариантов.

### Формат ввода
В первой строке ввода заданы четыре целых числа xA, yA, xB и yB, по модулю не превосходящие 106.

### Формат вывода
Выведите одно число — минимальное расстояние, которое придётся преодолеть по пути из точки A в точку B, если не нарушать правил дорожного движения. Ваш ответ будет принят, если его абсолютная или относительная погрешность не превосходит 10-6. 
```
 const fs = require('fs')
 let fileContent = fs.readFileSync("input.txt", "utf8");

const [x1,y1,x2,y2] = fileContent.toString().trim().split(' ').map(v => Number(v))

let l1 = Math.sqrt(x1*x1 + y1*y1),
    l2 = Math.sqrt(x2*x2 + y2*y2),
    alpha = Math.atan2(y1,x1),
    beta = Math.atan2(y2,x2),
    angle = Math.min(Math.abs(alpha - beta), 2 * Math.PI - Math.abs(alpha - beta)),
    result = Math.min(Math.min(l1,l2) * angle + Math.abs(l1-l2), l1+l2)

fs.writeFileSync("output.txt", result.toString())
```
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
## E. Средний уровень
В группе учатся n студентов, каждый из которых имеет свой рейтинг ai. Им нужно выбрать старосту; для этого студенты хотят выбрать старосту таким образом чтобы суммарный уровень недовольства группы был минимальный. Если выбрать j-го старостой, то уровень недовольства i-го студента равен ∣∣ai−aj∣∣.
Например, если в группе есть три студента с рейтингами 1, 3 и 4 и в качестве старосты выбирают второго, то уровень недовольства группы будет равен |1−3|+|3−3|+|4−3|=3.
Вычислите уровень недовольства группы при выборе каждого из студентов старостой. 

### Формат ввода
В первой строке дано единственное целое число n (1≤n≤105)  — количество студентов в группе.
Во второй строке даны n целых чисел a1,a2,…,an, идущих по неубыванию (0≤a1≤a2≤…≤an≤104)  — рейтинги студентов.

### Формат вывода
Выведите n чисел через пробел, i-е из которых будет обозначать уровень недовольства группы при выборе i-го студента старостой. 
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const array = fileContent.toString().split('\n')[1].split(' ').map(v => Number(v))

const result = [], less = [0], bigger = [];
bigger[array.length-1] = 0;

for (let i = 1; i < array.length; i++) {
  less[i] = (i) * (array[i]-array[i-1]) + less[i-1]
}

for (let i = array.length-2; i >= 0; i--) {
  bigger[i] = bigger[i+1] + (array.length-1-i)*(array[i+1] - array[i])
}

for (let i = 0; i < array.length; i++) {
  result[i] = less[i] + bigger[i]
}

fs.writeFileSync("output.txt", result.join(' '))
```

## F. Лифт
Тридцатого декабря все сотрудники известной IT-компании отправляются праздновать Новый год! На парковке офиса сотрудников уже ожидают автобусы, чтобы отвезти их в ресторан. Известно, что на i-м этаже работает ai сотрудников, а парковка расположена на нулевом этаже. Изначально лифт расположен на этаже с парковкой. Какое минимальное количество времени лифт будет перевозить всех людей на парковку? Известно, что лифт движется со скоростью один этаж в секунду, а посадка и высадка происходит мгновенно.

### Формат ввода
В первой строке дано единственное целое число k(1≤k≤109)  — количество людей, которое вмещает лифт за одну поездку. Во второй строке дано единственное целое число n  — количество этажей в здании. В следующих n(1≤n≤105) строках дано по одному целому неотрицательному числу ai(0≤ai≤109), которое обозначает количество сотрудников на этаже номер i.

### Формат вывода
Выведите единственное целое число  — минимальное количество секунд, которое необходимо, чтобы все сотрудники оказались на парковке. 
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

let data = fileContent.toString().trim().split('\n'),
    elevatorCapacity = Number(data[0]),
    floorsCount = Number(data[1]),
    floors = data.slice(2).map(Number);
    
function getMinTime(floors, elevatorCapacity) {
  let time = BigInt(0),
      restElevator = BigInt(0);
      
  for (let i = floors.length-1; i>=0; i--) {
    
    if (floors[i] ===0 )continue;
    
    if (BigInt(floors[i])>restElevator) {
      time+=BigInt(Math.ceil((floors[i]-Number(restElevator))/elevatorCapacity)*(i+1)*2);
       restElevator = BigInt(elevatorCapacity) - ((BigInt(floors[i])-restElevator)%BigInt(elevatorCapacity) || BigInt(elevatorCapacity));
    } else {
       restElevator-=BigInt(floors[i])
    }
  }
  return time
}

fs.writeFileSync("output.txt", getMinTime(floors, elevatorCapacity).toString())
```

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

## H. Результаты контеста
Чтобы оценить качество обучения программированию, в каждой группы студентов подсчитывается один параметр — суммарное количество решенных студентами задач.
Известно, что в первой группе суммарное количество решенных на контесте задач равно a, а во второй — b. Всего на контесте было предложено n задач, а также известно, что каждый студент решил не менее одной (и не более n) задач.
По заданным a, b и n определите, могло ли в первой группе быть строго больше студентов, чем во второй.

### Формат ввода
Вводятся три целых числа a, b, n (0 ≤ a, b ≤ 10000, 1 ≤ n ≤ 10000).

### Формат вывода
Выведите "Yes" если в первой группе могло быть строго больше студентов, чем во второй, и "No" в противном случае.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const [a,b,n] = fileContent.toString().trim().split('\n').map(Number);

if (a > Math.ceil(b/n)) {
	fs.writeFileSync("output.txt", "Yes")
} else {
	fs.writeFileSync("output.txt", "No")
}
```

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

# Занятие 1 (Сортировки: быстрая, слиянием и поразрядная)
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

## E. Поразрядная сортировка
Поразрядная сортировка является одним из видов сортировки, которые работают практически за линейное от размера сортируемого массива время. Такая скорость достигается за счет того, что эта сортировка использует внутреннюю структуру сортируемых объектов. Изначально этот алгоритм использовался для сортировки перфокарт. Первая его компьютерная реализация была создана в университете MIT Гарольдом Сьюардом (Harold Н. Seward). Опишем алгоритм подробнее. Пусть задан массив строк s1 , ..., si причём все строки имеют одинаковую длину m. Работа алгоритма состоит из m фаз. На i -ой фазе строки сортируются па i -ой с конца букве. Происходит это следующим образом. Будем, для простоты, в этой задаче рассматривать строки из цифр от 0 до 9. Для каждой цифры создается «корзина» («bucket»), после чего строки si распределяются по «корзинам» в соответствии с i-ой цифрой с конца. Строки, у которых i-ая с конца цифра равна j попадают в j-ую корзину (например, строка 123 на первой фазе попадет в третью корзину, на второй — во вторую, на третьей — в первую). После этого элементы извлекаются из корзин в порядке увеличения номера корзины. Таким образом, после первой фазы строки отсортированы по последней цифре, после двух фаз — по двум последним, ..., после m фаз — по всем. При важно, чтобы элементы в корзинах сохраняли тот же порядок, что и в исходном массиве (до начала этой фазы). Например, если массив до первой фазы имеет вид: 111, 112, 211, 311, то элементы по корзинам распределятся следующим образом: в первой корзине будет. 111, 211, 311, а второй: 112. Напишите программу, детально показывающую работу этого алгоритма на заданном массиве.

### Формат ввода
Первая строка входного файла содержит целое число n (1 ≤ n ≤ 1000) . Последующие n строк содержат каждая по одной строке si . Длины всех si , одинаковы и не превосходят 20. Все si состоят только из цифр от 0 до 9.

### Формат вывода
В выходной файл выведите исходный массив строк в, состояние «корзин» после распределения элементов по ним для каждой фазы и отсортированный массив. Следуйте формату, приведенному в примере. 
```
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8").toString();
const data = fileContent.trim().split('\n').slice(1);

function bitSort(array) {
  let numLength = array[0].length,
    strResult = `Initial array:
${array.join(', ')}
**********
`;
        
  for (let i = 0; i < numLength; i++) {
    let bucket = new Array(10).fill(1).map(v => [])
    for (let j = 0; j < array.length; j++) {
      bucket[array[j][numLength-i-1]].push(array[j])
    }
    
    strResult += `Phase ${i+1}
${bucket.map((v,i) => `Bucket ${i}: ${v.length ? v.join(', ') : 'empty'}`).join('\n')}
**********
`;
    
    array = bucket.reduce((acc,v) => {acc.push(...v); return acc}, [])
  }
  
  strResult += `Sorted array:
${array.join(', ')}
`;
  return strResult;
}

fs.writeFileSync("output.txt", bitSort(data));
```

# Занятие 2 (Хеши для строк)
## A. Равенство подстрок
Дана строка S, состоящая из строчных латинских букв.
Определите, совпадают ли строки одинаковой длины L, начинающиеся с позиций A и B.

### Формат ввода
В первой строке записана S (1 ≤ |S| ≤ 2 ⋅ 105), состоящая из строчных латинских букв.
Во второй строке записано число Q (1 ≤ Q ≤ 2 ⋅ 105) — количество запросов.
В следющих Q строках записаны запросы: целые числа L, A и B (1 ≤ L ≤ |S|, 0 ≤ A, B ≤ (|S| - L)) — длина подстрок и позиции, с которых они начинаются.

### Формат вывода
Если строки совпадают — выведите "yes", иначе — "no".
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString().split('\n');


let string = fileContent[0],
	testsCount = Number(fileContent[1]),
    tests = [];
for (let i = 0; i < testsCount; i++) {
	tests.push(fileContent[i+2].split(' ').map(Number));
}

let n = string.length,
	p = BigInt(1e9+7),
    x_ = BigInt(257),
    h = [BigInt(0)],
    x = [BigInt(1)];
string = ' ' + string;
 
for (let i = 1; i <= n; i++) {
	h[i] = (h[i-1] * x_ + BigInt(string.charCodeAt(i))) % p;
    x[i] = (x[i-1] * x_) % p;
}

  // console.log(string)
function isEqual(from1, from2, slen) {
  // console.log(from1, from2, slen)
	return ( 
	      ( (h[from1 + slen - 1] + h[from2 -1]*x[slen]) % p  === 
	      (h[from2 + slen - 1] + h[from1 - 1]*x[slen]) % p ) 
	);

}

tests.forEach(test => {
	const [slen, from1, from2] = test;
	result.push(isEqual(from1 + 1, from2 + 1, slen) ? 'yes' : 'no')
})

fs.writeFileSync("output.txt", result.join('\n'))
```

## B. Основание строки
Строка S была записана много раз подряд, после чего от получившейся строки взяли префикс и дали вам. Ваша задача определить минимально возможную длину исходной строки S.

### Формат ввода
В первой и единственной строке входного файла записана строка, которая содержит только латинские буквы, длина строки не превышает 50000 символов. 

### Формат вывода
Выведите ответ на задачу.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString().trim();

let string = fileContent;

let n = string.length,
	p = 1e7+7,
    x_ = 33,
    h = [0],
    h2 = [0],
    x = [1],
    x2=[1];
string = ' ' + string;
 
for (let i = 1; i <= n; i++) {
	h[i] = (h[i-1] * x_ + string.charCodeAt(i)) % p;
    x[i] = (x[i-1] * x_) % p;
}

function isEqual(from1, from2, slen) {
	return ( 
	      ( (h[from1 + slen - 1] + h[from2 -1]*x[slen]) % p  === 
	      (h[from2 + slen - 1] + h[from1 - 1]*x[slen]) % p ) 
	);

}

function foo() {
	let max = 0;
    
    for (let i = 1; i <= n-1; i++) {
    	if (isEqual(1, n + 1 -i, i)) {
          max = i;
          console.log(max, 'max')
      }
      
    }
    
    return n-max;
}
fs.writeFileSync("output.txt", foo().toString())
```

## C. Z-функция
Дана непустая строка S, длина которой N не превышает 106. Будем считать, что элементы строки нумеруются от 0 до N-1.
Вычислите z-функцию z[i] для всех i от 0 до N-1. z[i] определяется как максимальная длина подстроки, начинающейся с позиции i и совпадающей с префиксом всей строки. z[0] = 0

### Формат ввода
Одна строка длины N, 0 < N ≤ 106, состоящая из прописных латинских букв.

### Формат вывода
Выведите N чисел — значения z-функции для каждой позиции, разделённые пробелом. 
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString().trim();

let string = fileContent;

let n = string.length,
	p = 1e7+7,
    x_ = 33,
    h = [0],
    h2 = [0],
    x = [1],
    x2=[1];
string = ' ' + string;
 
for (let i = 1; i <= n; i++) {
	h[i] = (h[i-1] * x_ + string.charCodeAt(i)) % p;
    x[i] = (x[i-1] * x_) % p;
}

function isEqual(from1, from2, slen) {
	return ( 
	      ( (h[from1 + slen - 1] + h[from2 -1]*x[slen]) % p  === 
	      (h[from2 + slen - 1] + h[from1 - 1]*x[slen]) % p ) 
	);

}

function z_function() {
    let z = new Array(string.length-1).fill(0);

    for (let i = 1, l = 0, r = 0; i < string.length; i++) {
        if (i <= r) {                            
            z[i] = Math.min(z[i - l], r - i + 1);     
        }

        while (i + z[i] < string.length) {
            if ( isEqual(1,i+1,z[i]+1)) {
                z[i]++;
            } else {
                break;
            }
        }

        if (z[i] > 0 && i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }

    return z;
}
fs.writeFileSync("output.txt", z_function().join(' '))
```

## D. Кубики в зеркале
Привидение Петя любит играть со своими кубиками. Он любит выкладывать их в ряд и разглядывать свое творение. Недавно друзья решили подшутить над Петей и поставили в его игровой комнате зеркало. Известно, что привидения не отражаются в зеркале, а кубики отражаются. Теперь Петя видит перед собой N цветных кубиков, но не знает, какие из этих кубиков настоящие, а какие — отражение в зеркале. Выясните, сколько кубиков может быть у Пети. Петя видит отражение всех кубиков в зеркале и часть кубиков, которая находится перед ним. Часть кубиков может быть позади Пети, их он не видит. 

### Формат ввода
Первая строка входного файла содержит число N ( 1 ≤ N ≤ 1000000 ) и количество различных цветов, в которые могут быть раскрашены кубики — M ( 1 ≤ M ≤ 1000000 ). Следующая строка содержит N целых чисел от 1 до M — цвета кубиков.

### Формат вывода
Выведите в выходной файл все такие K, что у Пети может быть K кубиков
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString().trim();

let string = fileContent.toString().split('\n')[1].split(' ').map(Number);

let n = string.length,
	p = 1e7+7,
    x_ = 7757,
    x2_ = 33,
    h = [0],
    h2=[0],
    hR = [0],
    hR2=[0],
    x = [1],
    x2=[1];
hR[n+1] = 0;
hR2[n+1]=0;
string.unshift(0);

for (let i = 1; i <= n; i++) {
	h[i] = (h[i-1] * x_ + string[i]) % p;
    h2[i] = (h2[i-1] * x2_ + string[i]) % p;
  	x[i] = (x[i-1] * x_) % p;
    x2[i] = (x2[i-1] * x2_) % p;
}

for (let i = n; i >= 1; i--) {
    hR[i] = (hR[i+1] * x_ + string[i]) % p;
	hR2[i] = (hR2[i+1] * x2_ + string[i]) % p;
}


function isReverseEqual(from, slen) {
	return ( 
	      ( (h[from + slen] + hR[from + 1]*x[slen]) % p  === 
	      (hR[1] + h[from]*x[slen]) % p ) && (
          (h2[from + slen] + hR2[from + 1]*x2[slen]) % p  === 
	      (hR2[1] + h2[from]*x2[slen]) % p 
          )
	);
}

function foo() {
  
  let result = [];
	
	for (let i = Math.floor(n/2); i >= 1; i--) {
	  if (isReverseEqual(i,i)) result.push(n - i)
	}
	result.push(n)
	
	return result
}
fs.writeFileSync("output.txt", foo().join(' '))
```

## E. Подпалиндромы
Строка называется палиндромом, если она читается одинаково как слева направо, так и справа налево. Например, строки abba, ata являются палиндромами.
Вам дана строка. Ее подстрокой называется некоторая непустая последовательность подряд идущих символов. Напишите программу, которая определит, сколько подстрок данной строки является палиндромами.

### Формат ввода
Вводится одна строка, состоящая из прописных латинских букв. Длина строки не превышает 100000 символов.

### Формат вывода
Выведите одно число — количество подстрок данной строки, которые являются палиндромами
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString().trim();

let string = fileContent;

let n = string.length,
	p = 1e7+7,
    x_ = 33,
    h = [0],
    h2 = [0],
    x = [1],
    x2=[1];
string = '' + string;
 
for (let i = 1; i <= n; i++) {
	h[i] = (h[i-1] * x_ + string.charCodeAt(i)) % p;
    x[i] = (x[i-1] * x_) % p;
}

function isEqual(from1, from2, slen) {
	return ( 
	      ( (h[from1 + slen - 1] + h[from2 -1]*x[slen]) % p  === 
	      (h[from2 + slen - 1] + h[from1 - 1]*x[slen]) % p ) 
	);
}

function foo() {
  let d1 = [],
      l=0, r=-1;
  for (let i=0; i<n; ++i) {
    let k = i>r ? 1 : Math.min(d1[l+r-i], r-i+1);
    while (i+k < n && i-k >= 0 && string[i+k] === string[i-k])  ++k;
    d1[i] = k;
    if (i+k-1 > r)
      l = i-k+1,  r = i+k-1;
  }
  
  let d2 = [];
      l=0, r=-1;
  for (let i=0; i<n; ++i) {
    let k = i>r ? 0 : Math.min(d2[l+r-i+1], r-i+1);
    while (i+k < n && i-k-1 >= 0 && string[i+k] === string[i-k-1])  ++k;
    d2[i] = k;
    if (i+k-1 > r)
      l = i-k,  r = i+k-1;
  }

  return d1.reduce((acc,v) => acc+v,0) + d2.reduce((acc,v) => acc+v,0)
}

fs.writeFileSync("output.txt", foo().toString())
```

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

## B. Затерянный мир
Территория зоопарка Юрского периода «Затерянный мир» представляет собой решётку N × N, в каждой клетке которой находится вольер для динозавра. Директор зоопарка Степан Савельев планирует расселить в зоопарке N динозавров. Вольеры отделены друг от друга невысоким забором. Сотрудникам зоопарка известно, что динозавр не покидает пределов своего вольера, и не ломает забор, если он не видит на территории парка других динозавров. Зрительный аппарат у динозавров таков, что он видит всех динозавров, которые находятся на одной строке, на одном столбце или на одной диагонали с ним. Если же динозавр видит другого ящера, то ломает забор и вступает в борьбу. Директор зоопарка не хочет терпеть убытки, поэтому просит вас посчитать количество способов так расселить динозавров в зоопарке, чтобы никакой ящер не видел остальных динозавров.

### Формат ввода
Задано единственное число N (N ≤ 10).

### Формат вывода
Необходимо вывести количество способов, которыми можно расселить в зоопарке N динозавров, чтобы у зоопарка не было убытков. 
```
const fs = require('fs');
let n = Number(fs.readFileSync("input.txt", "utf8").toString().trim());

function getCount() {
  let result = 0;
  const initBusy = {
    horizontal: {},
    vertical: {},
    posDiagonal: {},
    negDiagonal: {}
  }

  function isBusy(busy,i,j) {
    const {horizontal, vertical, posDiagonal, negDiagonal} = busy;
    return horizontal[i] ||
            vertical[j] ||
            posDiagonal[i+j] ||
            negDiagonal[i-j]
  }
  
  function next(busy, i,j) {
    do {
      if (j+1 < n && !busy.horizontal[i])
        j++;
      else if (i + 1 < n) {
        i++;
        j = 0;
      } else
        return [null,null];
    } while (isBusy(busy, i,j))
    return [i,j]
  }

  function foo(busy = initBusy,i = 0,j = 0, dinoCount = 0) {
    if (i === null || j === null || dinoCount-i<0) 
      return;
      
    let newBusy = {
      horizontal: {...busy.horizontal},
      vertical: {...busy.vertical},
      posDiagonal: {...busy.posDiagonal},
      negDiagonal: {...busy.negDiagonal},
    }
  
    foo(newBusy, ...next(newBusy, i,j), dinoCount)
    newBusy = undefined;
    
    dinoCount++;
    busy.horizontal[i] = true;
    busy.vertical[j] = true;
    busy.posDiagonal[i+j] = true;
    busy.negDiagonal[i-j] = true;
    
    if (dinoCount === n) {
      result+=1;
      return;
    }
    
    foo(busy, ...next(busy,i,j), dinoCount)
    
    } 
  foo();
  
  return result;
}
fs.writeFileSync("output.txt", getCount(n).toString())
```

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

## D. Простая задача коммивояжера
Неориентированный взвешенный граф задан матрицей смежности. Найдите кратчайший цикл, который начинается и заканчивается в вершине номер 1 и проходит через все вершины по одному разу.

### Формат ввода
В первой строке вводится число N (N ≤ 10) — количество вершин графа. Следующие N строк содержат по N целых неотрицательных чисел и задают матрицу смежности. Число 0 означает, что ребро отстутствует. Любое другое число задаёт вес ребра.
### Формат вывода
Выведите минимальную суммарную длину цикла или число -1, если цикл построить невозможно.
```
 const fs = require('fs');
 let fileContent = fs.readFileSync("input.txt", "utf8").toString().trim();
let data = fileContent.split('\n'),
    count = Number(data[0]),
    matrix = [0, ...data.slice(1).map(str => [0,...str.trim().split(' ').map(Number)])];

const shortest = (matrix, start) => {
  let result = Infinity;
  
  const foo = (current, visited = {}, distance = 0) => {

    if (distance >= result) return;
    
    const visitedLength = Object.keys(visited).length;     
    if (start === current && visited[start] && visitedLength === count) {
      result = Math.min(result, distance);
      return;
    }
    
    visited[current] = true;
    
    const neighbors = matrix[current];

    for (let i = 0; i <= neighbors.length; i++) {
      if (neighbors[i] > 0 && (!visited[i] || (i === start && visitedLength+1 === count))) 
        foo(i, {...visited}, distance + neighbors[i]);
    }
  }
  foo(1);
  
  return result;
}
let result = shortest(matrix, 1)
console.log(result)
if (count === 1) 
	fs.writeFileSync("output.txt", "0") 
else if (result === Infinity)
	fs.writeFileSync("output.txt", "-1")
else
	fs.writeFileSync("output.txt", result.toString())
```
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


