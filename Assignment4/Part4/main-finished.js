/*
Name: Brayson Baldwin
Date: August 02, 2024
File: main-finished.js
JavaScript code for bouncing balls with evil circle - Part 2
*/

// set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//shape class
class Shape {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true; 
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class from Shape
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); 
    this.color = "white";
    this.size = 10;

    // Add keyboard controls
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color; 
    ctx.lineWidth = 3; 
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke(); 
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = width - this.size;
    }

    if (this.x - this.size <= 0) {
      this.x = this.size; 
    }

    if (this.y + this.size >= height) {
      this.y = height - this.size; 
    }

    if (this.y - this.size <= 0) {
      this.y = this.size; 
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false; 
          updateBallCount(-1); 
        }
      }
    }
  }
}

//Array to store all balls
const balls = [];

//Variable to store the ball count
let ballCount = 0;

//Function to update the ball count in the HTML
function updateBallCount(change) {
  ballCount += change;
  const ballCountElem = document.getElementById("ball-count");
  if (ballCountElem) {
    ballCountElem.textContent = `Ball count: ${ballCount}`;
  }
}

//Populate the array with balls
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Shape(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  updateBallCount(1); 
}

// Create an EvilCircle
const evilCircle = new EvilCircle(100, 100);

// Animation loop
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) { 
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  //update and draw the EvilCircle
  evilCircle.checkBounds(); 
  evilCircle.collisionDetect();
  evilCircle.draw();

  requestAnimationFrame(loop);
}

loop();
