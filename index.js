// Define the radius of the circle and the lock status
const radius = 8;
let lock = false;

// Define the initial color values
let color = {
    red: 0,
    green: 0,
    blue: 0
}

// Get the canvas element and other required DOM elements
const canvas = document.querySelector('canvas');
const colorDisplay = document.querySelector("#color-container")
const colorValueText = document.querySelector("#color-value")
const dummyImage = new Image();
dummyImage.src = "images/color_street.avif"
const context = canvas.getContext('2d');
const fileChooser = document.getElementById("file-chooser")
const canvasContainer = document.querySelector("#canvas-container")

// Load the dummy image onto the canvas
//context.drawImage(dummyImage, canvas.width/2-dummyImage.width/2, canvas.height/2-dummyImage.height/2, dummyImage.width, dummyImage.height);
dummyImage.onload = event => {
    updateCanvas({ offsetX: canvas.width / 2, offsetY: canvas.height / 2 })
}

// Resize the canvas to fit the window
function resizeCanvas() {
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    updateCanvas({ offsetX: canvas.width / 2, offsetY: canvas.height / 2 });
}

// Resize the canvas when the window is resized
onresize = () => {
    resizeCanvas();
}

resizeCanvas();

// Add event listener to the copy button
document.getElementById("copy-button").addEventListener("click", () => {
    navigator.clipboard.writeText(`rgb(${color.red},${color.green},${color.blue})`)
})


// Event listener for file chooser input
fileChooser.addEventListener('change', event => {
    const files = event.target.files;
    if (files.length !== 0)
        dummyImage.src = URL.createObjectURL(files[0]);
    updateCanvas({ "x": 0, "y": 0 });
});

// Event listener for mouse movement on the canvas
canvas.addEventListener('mousemove', updateCanvas);

// Update the canvas based on the mouse position
function updateCanvas(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    //if detection is locked don't simply redraw
    if (lock)
        return

    // Clear the canvas and draw the dummy image
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(dummyImage, 0, 0, dummyImage.width, dummyImage.height, 0, 0, canvas.width, canvas.height);

    // Get the color data of the pixel at the current position
    const pixelData = context.getImageData(x, y, 1, 1).data;
    color.red = pixelData[0]
    color.green = pixelData[1]
    color.blue = pixelData[2]
    const unitColor = 255 - Math.round((color.red + color.green + color.blue) / (255 * 3)) * 255

    // Draw a circle around the current position
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.lineWidth = 5;
    context.strokeStyle = `rgb(${unitColor},${unitColor},${unitColor})`;
    context.stroke();

    // Update the color value text and color display
    colorValueText.style.color = `rgb(${unitColor},${unitColor},${unitColor})`;
    colorValueText.textContent = `RGB: ${color.red}, ${color.green}, ${color.blue}`;
    colorDisplay.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;

}

// Event listener for mouse down on the canvas
canvas.addEventListener("mousedown", function (event) {
    event.preventDefault();
    lock = !lock;
    updateCanvas(event);
})