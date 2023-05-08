
const radius = 8;
let lock=false;

const canvas = document.querySelector('canvas');
const colorDisplay = document.querySelector("#color-container")
const colorValueText= document.querySelector("#color-value")
const dummyImage = new Image();
dummyImage.src = "images/color_street.avif"
const context = canvas.getContext('2d');
const fileChooser = document.getElementById("file-chooser")


//context.drawImage(dummyImage, canvas.width/2-dummyImage.width/2, canvas.height/2-dummyImage.height/2, dummyImage.width, dummyImage.height);
dummyImage.onload = event => {
  
  context.drawImage(dummyImage, 0, 0, dummyImage.width, dummyImage.height, 0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
  canvas.width = window.innerWidth * .9-48;
  canvas.height = Math.min(600, window.innerHeight * .8);
}

onresize = () => {
  resizeCanvas();
}

addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  
});

fileChooser.addEventListener('change', event => {
  const files = event.target.files;
  if (files.length !== 0)
     dummyImage.src = URL.createObjectURL(files[0]);
     updateCanvas({"x":0,"y":0});
});

canvas.addEventListener('mousemove', updateCanvas);


function updateCanvas(event){
  const x = event.offsetX;
  const y = event.offsetY;

  const pixelData = context.getImageData(x, y, 1, 1).data;
  if(lock)
    return
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(dummyImage, 0, 0, dummyImage.width, dummyImage.height, 0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.lineWidth = 5;
  const cssColor=`rgb(${pixelData[0]},${pixelData[1]},${pixelData[2]})`
  context.strokeStyle = `rgb(${255-pixelData[0]},${255-pixelData[0]},${255-pixelData[0]})`;
  colorValueText.style.color=`rgb(${255-pixelData[0]},${255-pixelData[0]},${255-pixelData[0]})`;
  context.stroke();
  colorValueText.textContent = `RGB: ${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}`;
  colorDisplay.style.backgroundColor = cssColor;
  navigator.clipboard.writeText(cssColor);
}

canvas.addEventListener("mousedown",function (event){
  event.preventDefault();
  lock=!lock;
  updateCanvas(event);
})

