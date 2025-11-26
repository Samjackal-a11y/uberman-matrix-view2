// assets/app.js
export const drivers = { emotion: 0.6, curiosity: 0.5 };

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blueprint = { /* … your JSON … */ };
const chars = JSON.stringify(blueprint);
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

function glyphColor(e) { return `rgb(${Math.floor(204*e)}, 255, 0)`; }

export function drawGlyphs() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = glyphColor(drivers.emotion);
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

let last = 0;
export function tick(ts, renderGraphs) {
  const baseMs = 33;
  const speedFactor = 1 - drivers.curiosity * 0.6;
  const interval = baseMs * speedFactor;
  if (ts - last >= interval) {
    drawGlyphs();
    if (renderGraphs) renderGraphs();
    last = ts;
  }
  requestAnimationFrame((t)=>tick(t, renderGraphs));
}
// assets/app.js
export const drivers = { emotion: 0.6, curiosity: 0.5 };

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blueprint = { /* … your JSON … */ };
const chars = JSON.stringify(blueprint);
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

function glyphColor(e) { return `rgb(${Math.floor(204*e)}, 255, 0)`; }

export function drawGlyphs() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = glyphColor(drivers.emotion);
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

let last = 0;
export function tick(ts, renderGraphs) {
  const baseMs = 33;
  const speedFactor = 1 - drivers.curiosity * 0.6;
  const interval = baseMs * speedFactor;
  if (ts - last >= interval) {
    drawGlyphs();
    if (renderGraphs) renderGraphs();
    last = ts;
  }
  requestAnimationFrame((t)=>tick(t, renderGraphs));
}
