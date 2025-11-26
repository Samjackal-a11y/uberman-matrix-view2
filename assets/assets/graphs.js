// assets/graphs.js
import { drivers } from './app.js';

const g1 = document.getElementById('graph1').getContext('2d');
const g2 = document.getElementById('graph2').getContext('2d');

const series = {
  cortisol: new Array(120).fill(0),
  serotonin: new Array(120).fill(0),
  dopamine: new Array(120).fill(0),
  oxytocin: new Array(120).fill(0)
};

function clamp(x){ return Math.max(0, Math.min(1, x)); }
function chemistryFromDrivers({ emotion, curiosity }) {
  return {
    cortisol: clamp(0.2 + 0.7*curiosity - 0.2*emotion),
    serotonin: clamp(0.2 + 0.6*emotion - 0.2*curiosity),
    dopamine: clamp(0.15 + 0.7*curiosity + 0.05*Math.random()),
    oxytocin: clamp(0.15 + 0.6*emotion - 0.15*curiosity),
  };
}

function pushSeries(key, value){ series[key].push(value); series[key].shift(); }
function clearGraph(ctx){
  ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 1; ctx.beginPath();
  for (let i=1;i<5;i++){ const y=(i/5)*ctx.canvas.height; ctx.moveTo(0,y); ctx.lineTo(ctx.canvas.width,y); }
  ctx.stroke();
}
function drawSeries(ctx,data,color){
  ctx.strokeStyle=color; ctx.lineWidth=1.5; ctx.beginPath();
  const W=ctx.canvas.width, H=ctx.canvas.height;
  data.forEach((v,i)=>{ const x=(i/(data.length-1))*(W-1); const y=H-2 - v*(H-4); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
  ctx.stroke();
}

export function renderGraphs(){
  const chem = chemistryFromDrivers(drivers);
  pushSeries('cortisol', chem.cortisol);
  pushSeries('serotonin', chem.serotonin);
  pushSeries('dopamine', chem.dopamine);
  pushSeries('oxytocin', chem.oxytocin);
  clearGraph(g1); drawSeries(g1, series.cortisol, "#ff6a00"); drawSeries(g1, series.serotonin, "#66ff99");
  clearGraph(g2); drawSeries(g2, series.dopamine, "#33ccff"); drawSeries(g2, series.oxytocin, "#ffd54d");
}
