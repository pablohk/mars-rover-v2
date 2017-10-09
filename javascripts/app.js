var rover ={
  direction:"N",
  x:0,
  y:0,
  travelLog:[["N",0,0]],
  roverToString: function(){
    return "(Actual position:" + this.direction + "," + this.x +
            "," + this.y +"\n" + "travel:\n"+ this.travelLog.join('\n') + ")";
  }
};

function turnLeft(rover){
    switch (rover.direction) {
      case 'N':
        rover.direction="W";
        break;
      case 'E':
        rover.direction="N";
        break;
      case 'S':
        rover.direction="E";
        break;
      case 'W':
        rover.direction="S";
        break;
      default:
        console.log("turnLeft error. Invalid direction key");
    }
  console.log("turnLeft was called!");
}

function turnRight(rover){
  switch (rover.direction) {
    case 'N':
      rover.direction="E";
      break;
    case 'E':
      rover.direction="S";
      break;
    case 'S':
      rover.direction="W";
      break;
    case 'W':
      rover.direction="N";
      break;
    default:
      console.log("turnRight error. Invalid direction key");
  }
  console.log("turnRight was called!");
}

function moveForward(rover){
  switch (rover.direction) {
    case 'N':
      rover.y-=1;
      break;
    case 'E':
      rover.x+=1;
      break;
    case 'S':
      rover.y+=1;
      break;
    case 'W':
      rover.x-=1;
      break;
    default:
      console.log("moveForward error. Invalid move key");
  }
  console.log("moveForward was called");
}

function moveBackward(rover){
    switch (rover.direction) {
    case 'N':
      rover.y+=1;
      break;
    case 'E':
      rover.x-=1;
      break;
    case 'S':
      rover.y-=1;
      break;
    case 'W':
      rover.x+=1;
      break;
    default:
      console.log("moveBackward error. Invalid move key");
  }
  console.log("moveBackward was called");
}

function tester(key){
  if(verifyLimitGrid(key)){
    switch (key) {
      case 'l':
        turnLeft(rover);
        break;
      case 'r':
        turnRight(rover);
        break;
      case 'f':
        moveForward(rover);
        break;
      case 'b':
        moveBackward(rover);
        break;
      default:
        console.log("tester error. Invalid move key");
      }
    rover.travelLog.push([rover.direction,rover.x,rover.y]);
    document.getElementById("rover-status-x").innerHTML=rover.x;
    document.getElementById("rover-status-y").innerHTML=rover.y;
    document.getElementById("rover-status-dir").innerHTML=rover.direction;
    console.log(rover.roverToString());
    }
}

function verifyLimitGrid(key){
  if( (rover.x==0 && rover.direction=='W' && key=='f') ||
      (rover.x==0 && rover.direction=='E' && key=='b') ||
      (rover.y==0 && rover.direction=='N' && key=='f') ||
      (rover.y==0 && rover.direction=='S' && key=='b') ||
      (rover.x==9 && rover.direction=='E' && key=='f') ||
      (rover.x==9 && rover.direction=='W' && key=='b') ||
      (rover.y==9 && rover.direction=='S' && key=='f') ||
      (rover.y==9 && rover.direction=='N' && key=='b') ){
    window.alert("Grid limit reached ");
    return false;
  }else {
    return true;
  }
}

function moveSequence(){
  var keys = document.getElementById("sequence").value.toLowerCase();
  if(verifySequenceKeys(keys)){
    for(var i=0;i<keys.length;i++){
      console.log("moveSequence was called");
      tester(keys.substr(i,1));
      }
      document.getElementById("rover-status-travel").innerHTML="<br />"+rover.travelLog.join('<br />');
    }else{
      console.log("moveSequence Error. Stopped Sequence by Invalid key");
    }
}

function verifySequenceKeys(keys){
  console.log("---keys: "+keys);  // Trace
  for(var i=0;i<keys.length;i++){
    //console.log("---"+i);   // Trace
    if(  (keys.substr(i,1)!= 'f' && keys.substr(i,1)!= 'b' && keys.substr(i,1)!= 'r' &&
     keys.substr(i,1)!= 'l') ){
       window.alert("Incorrect keys, only l, r, t, b");
       /*
       var elem =document.createElement("p");
       var node= document.createTextNode("Incorrect keys, only l, r, t, b");
       elem.appendChild(node);
       var addNote= document.getElementById("seq-content");
       addNote.appendChild(elem);
       */
       console.log("verifySequence incorrect keys");
       return false;
     }
   }
    console.log("verifySequence Success");
    return true;
}
