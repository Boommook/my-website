import { Pane } from "https://esm.sh/tweakpane@4.0.5";
import gulls from "../gulls.js";

const sg = await gulls.init();

const width = sg.width, 
      height = sg.height,
      size = width * height;

const PARAMS = {
  count: 200,
  speed: 25,
  size: 20,
  lifetime: 1.2,
}

const pane = new Pane({
  title: "Particle Settings",
  expanded: true,
});

const MAX_SIZE = 40;
const MAX_PARTICLES = 1024;

const u_count = sg.uniform(PARAMS.count),
      u_speed = sg.uniform(PARAMS.speed),
      u_size = sg.uniform(PARAMS.size),
      u_lifetime = sg.uniform(PARAMS.lifetime),
      u_res = sg.uniform([width, height]); 

pane.addBinding(PARAMS, "count", {min: 10, max: MAX_PARTICLES, step: 5});
pane.addBinding(PARAMS, "speed", {min: 5, max: 100, step: 1});
pane.addBinding(PARAMS, "size", {min: 1, max: MAX_SIZE, step: 1});
pane.addBinding(PARAMS, "lifetime", {min: 0.1, max: 3.0, step: 0.1});

pane.on("change", () => {
  u_count.value = PARAMS.count;
  u_speed.value = PARAMS.speed;
  u_size.value = PARAMS.size;
  u_lifetime.value = PARAMS.lifetime;
  renderPass.count = PARAMS.count; // I think this needs to be updated to
})

let explodeX = sg.width / 2;
let explodeY = sg.height / 2;
let spawn = 0;

window.addEventListener("click", (e) => {
  explodeX = e.clientX;
  explodeY = e.clientY;
  spawn = 1;
})

const u_explodeX = sg.uniform(explodeX);
const u_explodeY = sg.uniform(explodeY);
const u_dt = sg.uniform(0);
const u_time = sg.uniform(0);
const u_spawn = sg.uniform(0);

const FLOATS_PER_PARTICLE = 10;
const particleDataA = new Float32Array(MAX_PARTICLES * FLOATS_PER_PARTICLE);
const particleDataB = new Float32Array(MAX_PARTICLES * FLOATS_PER_PARTICLE);

const particlesA = sg.buffer(particleDataA, "particlesA");
const particlesB = sg.buffer(particleDataB, "particlesB");
const particles = sg.pingpong(particlesA, particlesB);

const computeShader = await gulls.import("./explosionCompute.wgsl");
const renderShader = await gulls.import("./explosionRender.wgsl");

const initial = new Date();
let lastTime = initial.getTime();

const computePass = await sg.compute({
  shader: computeShader,
  data: [
    particles,
    u_res,
    u_count,
    u_speed,
    u_size,
    u_lifetime,
    u_explodeX,
    u_explodeY,
    u_dt,
    u_time,
    u_spawn
  ],
  onframe() {
    const date = new Date();
    const now = date.getTime();
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    
    u_explodeX.value = explodeX;
    u_explodeY.value = explodeY;
    u_dt.value = dt;
    u_time.value = (now - initial.getTime()) / 1000;
    u_spawn.value = spawn;
  },
  onframeend() {
    spawn = 0;
  },
  dispatchCount: Math.ceil(MAX_PARTICLES / 64)
});

const renderPass = await sg.render({
  shader: renderShader,
  data: [
    particles,
    u_res
  ],
  blend: true,
  count: PARAMS.count
});

sg.run(computePass, renderPass);