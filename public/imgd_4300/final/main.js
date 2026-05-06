import gulls from "../gulls.js";
import { Pane } from "https://esm.sh/tweakpane@4.0.5";

const GRID_SIZE = 2;
const WIDTH = Math.round(window.innerWidth / GRID_SIZE);
const HEIGHT = Math.round(window.innerHeight / GRID_SIZE);

const VANT_LIFETIME_SEC = 100;
const MAX_VANTS = 4096;
const SPAWN_ON_EAT = 5;

const PARAMS = {
    startingArea: 0.3,
    numAgents: 128,
}
  
const pane = new Pane({
title: "Vant Settings",
expanded: true,
});

pane.addBinding(PARAMS, "startingArea", {min: 0, max: 1, step: 0.1});
pane.addBinding(PARAMS, "numAgents", {min: 10, max: 1024, step: 10});
const respawnBtn = pane.addButton({
    title: 'Respawn Vants',
    label: 'respawn',
  });
respawnBtn.on('click', () => {
    respawnVants();
});
const clearBtn = pane.addButton({
    title: 'Clear Foods',
    label: 'clear',
  });
clearBtn.on('click', async () => {
  foodData.fill(-9999.0);
  foodCount = 0;
  foodData[0] = 0.0;


  if (targetFoods_b?.write) {
    targetFoods_b.write(foodData);
  }
});

const WORKGROUP_SIZE = 64;
const DISPATCH_COUNT = [Math.ceil(MAX_VANTS / WORKGROUP_SIZE), 1, 1];

const render_shader = gulls.constants.vertex + `
@group(0) @binding(0) var<storage> pheromones: array<f32>;
@group(0) @binding(1) var<storage> render: array<f32>;

@group(0) @binding(2) var<storage> targetFoods: array<vec2f>;
@group(0) @binding(3) var<uniform> time: f32;
@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
    let gridPos = floor(pos.xy / ${GRID_SIZE});
    
    let pidx = gridPos.y * ${WIDTH} + gridPos.x; // convert 2d grid position to 1d index
    let p = pheromones[u32(pidx)]; // get the pheromone value at the grid position
    let foodCount = u32(clamp(targetFoods[0].x, 0.0, 64.0));

    var v = 0.0;

    for(var dy: i32 = -1; dy <= 1; dy = dy + 1){
      for(var dx: i32 = -1; dx <= 1; dx = dx + 1){
        let curr_x = i32(gridPos.x) + dx;
        let curr_y = i32(gridPos.y) + dy;

        if(curr_x >= 0 && curr_x < ${WIDTH} && curr_y >= 0 && curr_y < ${HEIGHT} ){
          let indexed = curr_y * ${WIDTH} + curr_x;
          v = max(v, render[u32(indexed)]);
        }
      }
    }

    for (var i: u32 = 1u; i <= foodCount; i = i + 1u) {
      let food = targetFoods[i];
      let dist = distance(food, gridPos);
      
      let pulse = 3.5 + 0.5 * sin(time * 0.05);
      let glow = smoothstep(pulse, 0.0, dist);

      if (glow > 0.01) {
        let color = vec3f(1.0, 1.0, 0.2) * glow;
        return vec4f(color, 1.0);
      }
    }

    // vant color based on type
    if(v == 0.){
        return vec4f(vec3(p), 1.); // pheromone value
    }
    else if(v == 1.){
        return vec4f(vec3(1., 0.,0.), 1.); // red
    }
    else if(v == 2.){
        return vec4f(vec3(0., 1.,0.), 1.); // green
    }
    else if(v == 3.){
        return vec4f(vec3(0., 0.,1.), 1.); // blue
    }
    else if(v == 4.){
        return vec4f(vec3(1., 0.,1.), 1.); // purple
    }
    else{
        return vec4f(vec3(0., 1.,1.), 1.); // cyan  
    }

}`;

const compute_shader = `
struct Vant {
    pos: vec2f,
    dir: f32,
    flag: f32,
}

@group(0) @binding(0) var<storage, read_write> vants: array<Vant>;
@group(0) @binding(1) var<storage, read_write> pheromones: array<f32>;
@group(0) @binding(2) var<storage, read_write> render: array<f32>;
@group(0) @binding(3) var<storage, read_write> targetFoods: array<vec2f>;
@group(0) @binding(4) var<uniform> frame: f32;

// function to convert 2d position to 1d index for pheromone array
fn pheromoneIndex(pos: vec2f) -> u32 {
    let width = ${WIDTH}.;
    return u32(abs(pos.y % ${HEIGHT}. ) * width + pos.x);
}

// https://github.com/bevyengine/bevy/issues/11470
fn pcg_hash(input: u32) -> u32 {
    var state = input * 747796405u + 2891336453u;
    var word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}
// generates a float in the range [0.0, 1.0]
fn random_float(seed: u32) -> f32 {
    let h = pcg_hash(seed);
    // convert u32 to float by dividing by max u32 value
    return f32(h) / 4294967295.0;
}

fn closestFood(pos: vec2f, foodCount: u32) -> vec2f {
  var closest = vec2f(-9999., -9999.);
  var closestDist = 9999999.;

  for (var i: u32 = 1u; i <= foodCount; i = i + 1u) {
    let curr = targetFoods[i];

    if (curr.x > -1000.0) {
      let dist = distance(pos, curr);

      if (dist < closestDist) {
        closest = curr;
        closestDist = dist;
      }
    }
  }

  return closest;
}

fn removeFood(pos: vec2f, foodCount: u32) {
  for (var i: u32 = 1u; i <= foodCount; i = i + 1u) {
    let curr = targetFoods[i];
    if (curr.x > -1000.0 && distance(pos, curr) < 2.5) {
      targetFoods[i] = vec2f(-9999., -9999.);
      return;
    }
  }
}


@compute @workgroup_size(${WORKGROUP_SIZE}, 1, 1)
fn cs(@builtin(global_invocation_id) cell: vec3u) {
    if (cell.x >= arrayLength(&vants)) {
      return;
    }
    let pi2 = ${Math.PI * 2.};
    var vant: Vant = vants[cell.x];

    let pIndex = pheromoneIndex(vant.pos);
    let pheromone = pheromones[pIndex];
    let turnAmt = 0.125;
    let foodCount = u32(clamp(targetFoods[0].x, 0.0, 64.0));

    let shouldChaseFood = random_float(cell.x + pIndex + u32(frame)) > 0.35; // 65% chance to chase food

    let closest = closestFood(vant.pos, foodCount);
    let hasFood = closest.x > -1000.0;
    if (foodCount > 0u && hasFood && shouldChaseFood) { // if there is food available, move towards it
      let toClosest = closest - vant.pos;

      if(pheromone > 0.2){
          vant.dir += select(turnAmt, -turnAmt, vant.flag == 1. || vant.flag == 4.);
          pheromones[pIndex] = 0.;
      }

      else if (length(toClosest) > 0.001) {
        
        let toFood = normalize(toClosest);
        let targetDir = atan2(toFood.x, toFood.y) / pi2;

        // stronger = more direct targeting
        vant.dir = mix(vant.dir, targetDir, 0.2);
        pheromones[pIndex] = min(1., pheromone + 0.75);
      }
      
    }
    else { // if there is no food available, move randomly
      if(pheromone > 0.2){
        vant.dir += select(turnAmt, -turnAmt, vant.flag == 1. || vant.flag == 4.);
        pheromones[pIndex] = 0.;
      }
      else{
        vant.dir += select(-turnAmt, turnAmt, vant.flag == 1. || vant.flag == 4.);
        pheromones[pIndex] = min(1., pheromone + 0.75);
      }
   }

    let move_speed = select(1., 2., vant.flag == 3. || vant.flag == 4.); // move speed based on vant type

    let dir = vec2f(sin(vant.dir * pi2), cos(vant.dir * pi2)); // convert angle to direction vector
    
    vant.pos = round(vant.pos + dir * move_speed); // move the vant in the direction

    if(vant.pos.x <= 0.){ 
      vant.pos.x = 0. + 1.; 
      vant.dir = random_float(cell.x + pIndex);
    }
    if(vant.pos.x >= ${WIDTH}){ 
      vant.pos.x = ${WIDTH} - 1.;
      vant.dir = random_float(cell.x + pIndex);
    }
    if(vant.pos.y <= 0.){ 
      vant.pos.y = 0. + 1.;
      vant.dir = random_float(cell.x + pIndex);
    }
    if(vant.pos.y >= ${HEIGHT}){ 
      vant.pos.y = ${HEIGHT} - 1.;
      vant.dir = random_float(cell.x + pIndex);
    }

    removeFood(vant.pos, foodCount);

    vants[cell.x] = vant;
    render[pIndex] = vant.flag;
}
`;

const decay_shader = `
@group(0) @binding(0) var<storage, read_write> pheromones: array<f32>;
@compute @workgroup_size(${WORKGROUP_SIZE}, 1, 1)
fn cs(@builtin(global_invocation_id) cell: vec3u) {
    let ind = cell.x;
    if(ind >= arrayLength(&pheromones)){ // https://www.w3.org/TR/WGSL/#arrayLength-builtin
        return;
    }
    let decayAmt = 0.0005;
    let decayThreshold = 0.9;
    let decayPercent = 0.99;
    pheromones[ind] = max(0., 
    select(pheromones[ind] * decayPercent, pheromones[ind] - decayAmt, pheromones[ind] > decayThreshold)); // decay the pheromone
}
`

const blur_shader = gulls.constants.vertex + `
@group(0) @binding(0) var currentTexture: texture_2d<f32>;
@group(0) @binding(1) var currentSampler: sampler;
@group(0) @binding(2) var <uniform> res: vec2f;
@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = pos.xy / res; // normalized texture coords
  let pixel = 1.0 / res; // one pixel step in texture space

  var color = vec3f(0.0);

  color += textureSample( currentTexture,  currentSampler, uv ).rgb * 2.0; // weight the center of the trail double

  color += textureSample(currentTexture, currentSampler, uv + pixel * vec2f(-2.0, 0.0)).rgb; // color to the left
  color += textureSample(currentTexture, currentSampler, uv + pixel * vec2f(2.0, 0.0)).rgb; // color to the right
  color += textureSample(currentTexture, currentSampler, uv + pixel * vec2f(0.0, 2.0)).rgb; // color up
  color += textureSample(currentTexture, currentSampler, uv + pixel * vec2f(0.0, -2.0)).rgb; // color down


  let blurred = color / 8.0;
  let output = mix(color, blurred, 0.75);

  return vec4f(output, 1.0);
}
`

const sg = await gulls.init();
const res_u   = sg.uniform([ sg.width, sg.height ])
let time_u = sg.uniform(0);


const NUM_PROPS = 4;
let pheromones = new Float32Array(WIDTH * HEIGHT); // array to store pheromone values
let vants_render = new Float32Array(WIDTH * HEIGHT); // array to store vant values
let vants_data = new Float32Array(PARAMS.numAgents * NUM_PROPS); // array to store vant data

const MAX_FOODS = 64;
const foodData = new Float32Array((MAX_FOODS + 1) * 2).fill(-9999.0);
foodData[0] = 0;
let foodCount = 0;

let copy_texture = sg.texture(new Float32Array( gulls.width * gulls.height * 4 ))

let pheromones_b; 
let vants_render_b;
let vants_data_b;
let targetFoods_b;
let frame_u;
let render_pass;
let compute_pass;
let decay_pass;
let blur_pass;

window.addEventListener("click", async (e) => {
  if (e.target.closest(".tp-dfwv")) return;
  
  if (foodCount >= MAX_FOODS) return;

  foodCount++;
  foodData[0] = foodCount;

  const slot = foodCount;

  const newFood = new Float32Array([
    Math.floor(e.clientX / GRID_SIZE),
    Math.floor(e.clientY / GRID_SIZE),
  ]);

  foodData[slot * 2] = newFood[0];
  foodData[slot * 2 + 1] = newFood[1];

  if (targetFoods_b?.write) {
    targetFoods_b.write(new Float32Array([foodCount]), 0);
    targetFoods_b.write(newFood, slot * 2 * 4);
  }
});

let isRunning = false;

function startSimulation(){
  if(!isRunning){
    isRunning = true;
    sg.run(decay_pass, compute_pass, render_pass, blur_pass);
  }
}

function resetSimulation(){
  pheromones = new Float32Array(WIDTH * HEIGHT); // array to store pheromone values
  vants_render = new Float32Array(WIDTH * HEIGHT); // array to store vant values
  vants_data = new Float32Array(PARAMS.numAgents * NUM_PROPS); // array to store vant data
}

function fillVantsData(){
  const offset = .5 - PARAMS.startingArea / 2;
  for (let i = 0; i < PARAMS.numAgents * NUM_PROPS; i += NUM_PROPS) {
    vants_data[i] = Math.floor((offset + Math.random() * PARAMS.startingArea) * WIDTH);
    vants_data[i + 1] = Math.floor((offset + Math.random() * PARAMS.startingArea) * HEIGHT);
    vants_data[i + 2] = Math.random();
    vants_data[i + 3] = Math.round(Math.random() * 3 + 1.);
  }
}

function respawnVants(){
  resetSimulation();
  fillVantsData();

  pheromones_b.write(pheromones);
  vants_render_b.write(vants_render);
  vants_data_b.write(vants_data);
}

async function runSimulation(){
  resetSimulation();
  fillVantsData();

  pheromones_b = sg.buffer(pheromones, "pheromones");
  vants_render_b = sg.buffer(vants_render, "vants_render");
  vants_data_b = sg.buffer(vants_data, "vants_data");
  targetFoods_b = sg.buffer(foodData, "targetFoods");
  frame_u = sg.uniform(0);


  render_pass = await sg.render({
      shader: render_shader,
      data: [
          pheromones_b,
          vants_render_b,
          targetFoods_b,
          time_u,
      ],
      copy: copy_texture,
  });

  decay_pass = await sg.compute({
    shader: decay_shader,
    data: [pheromones_b],
    dispatchCount: [Math.ceil((WIDTH * HEIGHT) / WORKGROUP_SIZE), 1, 1], // dispatch count needs to be calculated based on the number of cells in the grid
  });

  compute_pass = await sg.compute({
    shader: compute_shader,
    data: [
        vants_data_b,
        pheromones_b,
        vants_render_b,
        targetFoods_b,
        frame_u,
    ],
    onframe() {
        vants_render_b.clear();
        frame_u.value++;
        time_u.value = frame_u.value;
    },
    dispatchCount: DISPATCH_COUNT, // dispatch count needs to be calculated based on the number of agents
});

  blur_pass = await sg.render({
    shader: blur_shader,
    data: [
      copy_texture,
      sg.sampler(),
      res_u,
    ]
  })

  startSimulation();
}

runSimulation();

