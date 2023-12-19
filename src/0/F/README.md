[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

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