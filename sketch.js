var drawing=[];
var currentPath=[];
var initialDrawing = []
var isDrawing = false;

function setup() {
  canvas = createCanvas(1000, 600);
  database= firebase.database();
  canvas.mousePressed(start);
  canvas.mouseReleased(end);
  form = new Form();
  form.display();
  //data = new Data();
  database.ref('drawing').on("value",(data)=>{
    console.log(data.val());
    initialDrawing = data.val();
    console.log(initialDrawing[0].length)
    beginShape();
    for(var i = 0; i<initialDrawing[0].length; i++){
     vertex(initialDrawing[0][i].x,initialDrawing[0][i].y);
   }
  })
}

function draw() {
  background("lightpink");

  if(isDrawing){
    var point = {
      x:mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }
  
  strokeWeight(4);
  noFill();
  stroke("green");
 
  for(var i=0; i<drawing.length;i++){
    var path=drawing[i];
    beginShape();
    for(var j=0;j<path.length;j++){
      vertex(path[j].x,path[j].y);
    }
    endShape();
  }
  form.button.mousePressed(() => {
    saveDrawing();
    
});
form.button2.mousePressed(() => {
  clearDrawing();
  
});

}
function start(){
  isDrawing = true;
  currentPath=[];
  drawing.push(currentPath);
}
function end(){
  isDrawing = false;
}

function saveDrawing(){
  var ref = database.ref('/').update({
    drawing : drawing
  })
  
}

function clearDrawing(){
  drawing=[];
  var ref = database.ref('drawing');
  ref.remove();
}

