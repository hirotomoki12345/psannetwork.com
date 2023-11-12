const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const lines = [];

class Line {
    constructor(x, y, color, speed) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
    }

    update() {
        this.x += this.speed;
        if (this.x > canvas.width) {
            this.x = 0;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 50, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function createLines() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`;
        const speed = 1 + Math.random() * 3;
        lines.push(new Line(x, y, color, speed));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const line of lines) {
        line.update();
        line.draw();
    }
}

createLines();
animate();
