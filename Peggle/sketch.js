
console.log('hello Peggle');

// Basvärden för plattan
// Plattorna har 29*29 piggar
var pxBredd = 21;
var stdPegs = 29

let pegsw =stdPegs;
let pegsh =stdPegs;
let bas = stdPegs * pxBredd;

var image = new Image();
//image.src = ;

var btn2 = document.getElementById('btn2');                     // Open file button
var btnpeg = document.getElementById('btnpeg');                 // Open file button
var btnzoompos = document.getElementById('btnzoompos');         // Open file button
var btnzoomneg = document.getElementById('btnzoomneg');         // Open file button
var btn1platta = document.getElementById('btn1platta');         // button
var btn2platta = document.getElementById('btn2platta');         // button
var btn3platta = document.getElementById('btn3platta');         // button
var btn4platta = document.getElementById('btn4platta');         // button
var fIn = document.getElementById('file-input');                // Hidden file input field
var pixels = null;                                              // Pixel object for manipulating the picture
var canvas = document.getElementById('canvas1');                // The canvas we are working with
var isDragging=false;                                           // Dragging, yes or no
var ctx=null;                                                   // Context holder
canvas.width = bas;
canvas.height = bas;
var offsetX=canvas.offsetLeft;                                  // Offset for dragging
var offsetY=canvas.offsetTop;                                   // offset for dragging
var currScale = 1;
var currImgX = 0;
var currImgY = 0;
var moveXAmount = 0;
var moveYAmount = 0;
var mstartX = 0;
var mstartY = 0;

//-------- colors section -----------------
const colors =[ {r: 125, g:125,b:100}   ];
 
//-----------------------------------------

//------------------------

btn1platta.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  console.log("platta 1 event"); 
  canvas.width = bas;
  canvas.height = bas;
  pegsw = 29;
  pegsw = 29;
});

btn2platta.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  console.log("platta 2 event"); 
  canvas.width = bas * 2;
  canvas.height = bas;
  pegsw = stdPegs *2;
  pegsh = stdPegs;
});

btn3platta.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  console.log("platta 3 event"); 
  canvas.width = bas;
  canvas.height = bas * 2;
  pegsw = stdPegs;
  pegsh = stdPegs * 2;
});

btn4platta.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  console.log("platta 3 event"); 
  canvas.width = bas * 2;
  canvas.height = bas * 2;
  pegsw = stdPegs * 2;
  pegsh = stdPegs * 2;
});

//------------------------

btnpeg.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  console.log("Btnpeg event"); 
  pegIt();
});

btn2.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  fIn.click();
  console.log("Klick klar");
});

btnzoompos.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  console.log("Klick zoom pos");
  currScale = currScale + 1;
  ScaleAndRedraw();
  
});

btnzoomneg.addEventListener("click", function() {         // Denna triggar file browser vid klick på knapp
  console.log("Klick zoom neg");
  currScale = currScale - 0.5;

  ScaleAndRedraw();
});

function ScaleAndRedraw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //ctx.drawImage(image, currImgX , currImgY, image.width * currScale ,image.height * currScale , currImgX , currImgY, image.width, image.height);
  ctx.drawImage(image, 0 , 0, image.width ,image.height , currImgX , currImgY, image.width * currScale, image.height * currScale);
  //ctx.setTransform(1, 0, 0, 1, 0, 0);

  //currScale = 1;
  
}

fIn.addEventListener("change", function() {
const file = document.querySelector('input[type=file]').files[0];
const reader = new FileReader();

reader.addEventListener("load", function () {
  // convert image file to base64 string
  image.src = reader.result;
}, false);

if (file) {
  console.log("Inside read as ata url");
  reader.readAsDataURL(file);
}
});



function pegIt(){
  console.log<("Start of function - pegIt");

  pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loggelilogg
  console.log(pixels);

  var pixelation_level = bas / stdPegs;

  console.log("Pixelation level" + pixelation_level);
  console.log("PegsW:" + pegsw + " PegsH:" + pegsh);

  for (let x = 0; x < canvas.width; x += pixelation_level) {
    for (let y = 0; y < canvas.height; y += pixelation_level) {

      let i = (x + y * canvas.width) * 4;

      let r = pixels.data[i + 0];
      let g = pixels.data[i + 1];
      let b = pixels.data[i + 2];
      let a = pixels.data[i + 3];

      let startPeg = pixelation_level / 2;

      ctx.fillStyle = 'white';
      ctx.fillRect(x, y, pixelation_level,pixelation_level);
     
      // Draw peg with color.
      ctx.beginPath();
      ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';
      ctx.strokeStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';
      ctx.lineWidth = 2;
      ctx.arc(x+startPeg, y+startPeg, (pixelation_level/2)-1, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      

      // Draw small peg to locate center with gray color.
      ctx.beginPath();
      ctx.fillStyle = 'gray';
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 2;
      ctx.arc(x+startPeg, y+startPeg, pixelation_level/6, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
    
    }
  }
};


//----------- Eventhandlers for moving picture-------------

canvas.addEventListener('mousedown', e => {
 
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);

  mstartX = e.pageX;
  mstartY = e.pageY;

  // set the drag flag
  //console.log(canMouseX + " "+ canMouseY);
  isDragging=true;
});


canvas.addEventListener('mouseup', e => {
  
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // clear the drag flag
  isDragging=false;

  moveXAmount = 0;
  moveYAmount = 0;
});


canvas.addEventListener('mouseout', e => {
  
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // user has left the canvas, so clear the drag flag
  //isDragging=false;
});





canvas.addEventListener('mousemove', e => {
 
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);

  if(isDragging && ((e.pageX != mstartX) || (e.pageY != mstartY))){

    var diffX = mstartX - e.pageX;
    var diffY = mstartY - e.pageY;

      ctx.clearRect(0,0,canvas.width,canvas.height);

      currImgX = currImgX - diffX;
      currImgY = currImgY - diffY;

      //ctx.drawImage(image, currImgX , currImgY , image.width, image.height);
      
      ctx.drawImage(image, 0 , 0, image.width ,image.height , currImgX , currImgY, image.width * currScale, image.height * currScale);
      
      mstartX = e.pageX;
      mstartY = e.pageY;
    }
});


//------------ Enf of moving picture eventhandlers---------

// Event when image has loaded
image.addEventListener('load', function(){
  console.log<("Start of function - image load");

//----------------------------------------------------------

  canvas = document.getElementById('canvas1');


  offsetX=canvas.offsetLeft;                  // Offset for dragging
  offsetY=canvas.offsetTop;                   // offset for dragging

  console.log("Offset -->" + canvas.offsetLeft + " " + canvas.offsetTop);

  ctx = canvas.getContext('2d');
  //ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, image.width, image.height);



  console.log("Offset -->" + image.width + " " + image.height);
//-----------------------------------------------------------
        
});