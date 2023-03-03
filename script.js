// Set up the container and initial variables
const container = document.getElementById('container');
let width = container.offsetWidth;
let height = container.offsetHeight;
let bubbles = [];

// Create a new bubble
function createBubble(x, y) {
  // Create a new div element for the bubble
  let bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Set random color
  
  // Set the bubble's initial position and velocity
  bubble.style.left = x + 'px';
  bubble.style.top = y + 'px';
  bubble.vx = Math.random() * 4 - 2;
  bubble.vy = Math.random() * 4 - 2;
  
  // Add the bubble to the container
  container.appendChild(bubble);
  bubbles.push(bubble);
}

// Update the position of each bubble
function update() {
  width = container.offsetWidth;
  height = container.offsetHeight;
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    
    // Update the bubble's position based on its velocity
    bubble.style.left = parseInt(bubble.style.left) + bubble.vx + 'px';
    bubble.style.top = parseInt(bubble.style.top) + bubble.vy + 'px';
    
    // Bounce the bubble off the walls
    if (parseInt(bubble.style.left) < 0 || parseInt(bubble.style.left) > width - bubble.offsetWidth) {
      bubble.vx *= -1;
    }
    if (parseInt(bubble.style.top) < 0 || parseInt(bubble.style.top) > height - bubble.offsetHeight) {
      bubble.vy *= -1;
    }
    
    // Slow down the bubble's velocity over time
    bubble.vx *= 0.99;
    bubble.vy *= 0.99;
  }
}

// Handle mouse movement
container.addEventListener('mousemove', function(event) {
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    
    // Calculate the distance between the bubble and the mouse
    let dx = parseInt(bubble.style.left) + bubble.offsetWidth/2 - event.clientX;
    let dy = parseInt(bubble.style.top) + bubble.offsetHeight/2 - event.clientY;
    let distance = Math.sqrt(dx*dx + dy*dy);
    
    // Apply a force to the bubble based on its distance from the mouse
    if (distance < 100) {
      bubble.vx += dx * 0.1;
      bubble.vy += dy * 0.1;
    }
  }
});

// Create a new bubble every second
setInterval(function() {
  createBubble(Math.random() * (width - 50), Math.random() * (height - 50));
}, 1000);

// Update the bubbles 60 times per second
setInterval(update, 16.67);

// Add click event listener to clear button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
  // Remove all bubbles from the container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  // Clear the bubbles array
  bubbles = [];
});


