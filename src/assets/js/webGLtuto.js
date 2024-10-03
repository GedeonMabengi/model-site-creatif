

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawNoise() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const noiseLevel = 0.2; // Ajustez cette valeur pour plus ou moins de bruit
  for (let i = 0; i < canvas.width; i += 5) {
    for (let j = 0; j < canvas.height; j += 5) {
      const r = Math.random() * 255;
      const g = Math.random() * 255;
      const b = Math.random() * 255;
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(i, j, 3, 3);
    }
  }

  // Simuler des lignes horizontales pour un effet plus réaliste
  for (let i = 0; i < canvas.height; i += 5) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

setInterval(drawNoise, 30);