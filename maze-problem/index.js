function Main(rooms) {
  var noOfRooms = rooms.length;
  var visitedPath = [];
  var success = false;
  var startWith;
  var entryDoors = setEntries();
  console.log('entryDoors : ', entryDoors);
}

function setEntries() {
  var entryDoors = [];
  rooms.forEach(function(room) {
    room.doors.forEach(function(door, index){
      if(door && door.status == 1 && door.linkedTo) {
        entryDoors.push(room.no + ':' + index);
      }
    });
  });
  return entryDoors;
}

function Room(no, doors) {
  this.no = no; // 1
  this.doors = doors; // {1: {status: 1, linkedTo: 123}}
}
