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

