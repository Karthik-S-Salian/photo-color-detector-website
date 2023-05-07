
const radius = 10;

const canvas = document.querySelector('canvas');
const colorDisplay = document.querySelector("#color-container")
const dummyImage = new Image();
dummyImage.src = "10581731.jpg"
const context = canvas.getContext('2d');

dummyImage.onload = event => {
  context.drawImage(dummyImage, 0, 0, dummyImage.width, dummyImage.height, 0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
  canvas.width = window.innerWidth * .9;
  canvas.height = Math.max(300, window.innerHeight * .6);
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
});

canvas.addEventListener('mousemove', function (event) {
  const x = event.offsetX;
  const y = event.offsetY;

  const pixelData = context.getImageData(x, y, 1, 1).data;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(dummyImage, 0, 0, dummyImage.width, dummyImage.height, 0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
  colorDisplay.textContent = `RGB: ${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}`;
  colorDisplay.style.backgroundColor = `rgb(${pixelData[0]},${pixelData[1]},${pixelData[2]})`;
});



