/* Binary Animation */
const canvas = document.getElementById('binaryCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize binary characters
class BinaryChar {
    constructor(x, y, speed, fontSize) {
        this.x = x;
        this.y = y;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.speed = speed;
        this.fontSize = fontSize;
        this.opacity = Math.random() * 0.2 + 0.1; // Low opacity for subtle effect
        this.switchInterval = Math.random() * 10000 + 2000; // Random interval to switch between 0 and 1
        this.lastSwitch = Date.now();
    }

    update() {
        this.y += this.speed;
        
        // Reset position if it goes off screen
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        
        // Randomly switch between 0 and 1
        if (Date.now() - this.lastSwitch > this.switchInterval) {
            this.value = this.value === '0' ? '1' : '0';
            this.lastSwitch = Date.now();
        }
    }

    draw() {
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillStyle = `rgba(0, 70, 180, ${this.opacity})`;
        ctx.fillText(this.value, this.x, this.y);
    }
}

// Create binary characters
let binaryChars = [];

function initBinaryChars() {
    binaryChars = [];
    const density = Math.floor(canvas.width * canvas.height / 15000); // Adjust density based on screen size
    
    for (let i = 0; i < density; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 1 + 0.5;
        const fontSize = Math.floor(Math.random() * 14) + 10;
        binaryChars.push(new BinaryChar(x, y, speed, fontSize));
    }
}

// Animation loop
function animate() {
    // Clear canvas with semi-transparent white to create trailing effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw binary characters
    binaryChars.forEach(char => {
        char.update();
        char.draw();
    });
    
    requestAnimationFrame(animate);
}

// Initialize animation
window.addEventListener('load', () => {
    resizeCanvas();
    initBinaryChars();
    animate();
});

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    initBinaryChars();
});
