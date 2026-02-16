let flowers = [];
let gifs = [];
let prompts = [];

const promptListEl = document.getElementById("promptList");

// Map keywords to GIF URLs
const keywordGIFs = {
    "dog": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDF4OTR6YmZmOHUwOWQ1c2g2OWt6dHhvbjdxcGFoeTl2Znk1NXVucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ig3nXeCHJa1H9SxhsI/giphy.gif",
    "cat": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGM3dnB1bTF5c2piN2dvdmRtM2NoMXJvZGprNjRvZm1teHhoNnJzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/901mxGLGQN2PyCQpoc/giphy.gif",
    "sunshine": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzF1angxcHVkcHJpd2N0dWRzZW45dnR3Y3N2OWZjdXlmMDk5Mjd3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pKg7w5TkppQFuWhVw6/giphy.gif",
    "sweetie": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG44ZWg1aG53dHBmbGZhaTJlZjRtNnVwdGtyajdvd3Z4ejJtM2luMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y3SWDSFd77ATwBxSJr/giphy.gif",
    "rainbow": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnNleXRhM3g1YnZxZmhyYzQ3ZzYyaW85bXVjMzZmMGZrMHo4dWRpNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SKGo6OYe24EBG/giphy.gif"
};

function updatePromptList() {
    promptListEl.innerHTML = "";
    prompts.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.username}: ${p.text}`;
        promptListEl.appendChild(li);
    });
}

document.getElementById("addPromptBtn").addEventListener("click", () => {
    const textInput = document.getElementById("userPrompt");
    const text = textInput.value.trim();
    if (!text) return;

    const username = "User";
    prompts.push({ username, text });
    updatePromptList();

    let matched = false;

    for (let key in keywordGIFs) {
        if (text.toLowerCase().includes(key)) {
            matched = true;
            let gif = createImg(keywordGIFs[key]);
            gif.size(150, 150);
            gifs.push({
                img: gif,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speedY: Math.random() * 1 + 0.5,
                speedX: (Math.random() - 0.5) * 1
            });
            break;
        }
    }

    if (!matched) {
        flowers.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: text.length * 2 + 10,
            speed: Math.random() * 1.5 + 0.5,
            color: [
                Math.random() * 155 + 100,
                Math.random() * 150 + 50,
                Math.random() * 155 + 100
            ]
        });
    }

    textInput.value = "";
});

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    noStroke();

    for (let i = 0; i < 30; i++) {
        flowers.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 1.5 + 0.5,
            color: [
                Math.random() * 155 + 100,
                Math.random() * 150 + 50,
                Math.random() * 155 + 100
            ]
        });
    }
}

function draw() {
    background(0, 20);

    flowers.forEach(f => {
        fill(f.color);
        ellipse(f.x, f.y, f.size);

        f.y -= f.speed;
        f.x += sin(frameCount * 0.01 + f.x) * 0.5;

        if (f.y < -f.size) {
            f.y = height + f.size;
            f.x = Math.random() * width;
        }
    });

    gifs.forEach(obj => {
        obj.y -= obj.speedY;
        obj.x += obj.speedX;

        if (obj.y < -150) obj.y = height;
        if (obj.x < -150) obj.x = window.innerWidth;
        if (obj.x > window.innerWidth) obj.x = -150;

        obj.img.position(obj.x, obj.y);
    });
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}