const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cat = { x: 180, y: 500, width: 40, height: 40, color: "orange" };
let gold = { x: Math.random() * 360, y: 0, width: 20, height: 20 };

function update() {
    gold.y += 5; // Vàng rơi xuống
    if (gold.y > 600) { gold.y = 0; gold.x = Math.random() * 360; }
    
    // Kiểm tra va chạm (ăn vàng)
    if (cat.x < gold.x + gold.width && cat.x + cat.width > gold.x && cat.y < gold.y + gold.height) {
        gold.y = 0; gold.x = Math.random() * 360;
        console.log("Ăn vàng!");
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = cat.color;
    ctx.fillRect(cat.x, cat.y, cat.width, cat.height); // Vẽ mèo
    ctx.fillStyle = "gold";
    ctx.fillRect(gold.x, gold.y, gold.width, gold.height); // Vẽ vàng
}

function loop() { update(); draw(); requestAnimationFrame(loop); }
loop();

// Điều khiển qua cảm ứng/chuột
canvas.addEventListener("touchmove", (e) => {
    let touch = e.touches[0];
    cat.x = touch.clientX - canvas.offsetLeft - cat.width/2;
});
