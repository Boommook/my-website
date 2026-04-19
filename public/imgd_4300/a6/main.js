import gulls from "../gulls.js";
import { Pane } from "https://esm.sh/tweakpane@4.0.5";

const PARAMS = {
    startingArea: 0.3,
    numAgents: 256,
}
  
const pane = new Pane({
title: "Vant Settings",
expanded: true,
});

pane.addBinding(PARAMS, "startingArea", {min: 0, max: 1, step: 0.1});
pane.addBinding(PARAMS, "numAgents", {min: 10, max: 1024, step: 10});

const btn = pane.addButton({
    title: 'Spawn Vants',
    label: 'spawn',
  });
  
btn.on('click', () => {
    runSimulation();
  });

const WORKGROUP_SIZE = 64,
        DISPATH_COUNT = [PARAMS.numAgents / WORKGROUP_SIZE, 1, 1],
        GRID_SIZE = 2;

const WIDTH = Math.round(window.innerWidth / GRID_SIZE),
    HEIGHT = Math.round(window.innerHeight / GRID_SIZE);

const render_shader = gulls.constants.vertex + `
@group(0) @binding(0) var<storage> pheromones: array<f32>;
@group(0) @binding(1) var<storage> render: array<f32>;

@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
    let gridPos = floor(pos.xy / ${GRID_SIZE});
    
    let pidx = gridPos.y * ${WIDTH} + gridPos.x; // convert 2d grid position to 1d index
    let p = pheromones[u32(pidx)]; // get the pheromone value at the grid position
    let v = render[u32(pidx)]; // get the render value at the grid position 

    // vant color based on type
    if(v == 0.){
        return vec4f(vec3(p), 1.);
    }
    else if(v == 1.){
        return vec4f(vec3(1., 0.,0.), 1.);
    }
    else if(v == 2.){
        return vec4f(vec3(0., 1.,0.), 1.);
    }
    else if(v == 3.){
        return vec4f(vec3(0., 0.,1.), 1.);
    }
    else{
        return vec4f(vec3(1., 1.,0.), 1.);
    }

}`;

const compute_shader = `
struct Vant {
    pos: vec2f,
    dir: f32,
    flag: f32
}

@group(0) @binding(0) var<storage, read_write> vants: array<Vant>;
@group(0) @binding(1) var<storage, read_write> pheromones: array<f32>;
@group(0) @binding(2) var<storage, read_write> render: array<f32>;

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

@compute @workgroup_size(${WORKGROUP_SIZE}, 1, 1)
fn cs(@builtin(global_invocation_id) cell: vec3u) {
    let pi2 = ${Math.PI * 2.};
    var vant: Vant = vants[cell.x];

    let pIndex = pheromoneIndex(vant.pos);
    let pheromone = pheromones[pIndex];

    if(pheromone != 0.){
        vant.dir += select(.25, -.25, vant.flag == 0.); // turn left or right based on vant type
        pheromones[pIndex] = 0.; // clear the pheromone
    }
    else{ // 
        if(random_float(cell.x) < 0.9){
            vant.dir += select(-.25, .25, vant.flag == 0.); // turn left or right based on vant type
        }
        pheromones[pIndex] = 1.; // set the pheromone
    }

    let move_speed = select(1., 2., vant.flag == 2.); // move speed based on vant type

    let dir = vec2f(sin(vant.dir * pi2), cos(vant.dir * pi2)); // convert angle to direction vector
    
    vant.pos = round(vant.pos + dir * move_speed); // move the vant in the direction

    vants[cell.x] = vant;
    render[pIndex] = vant.flag;
}
`;

const NUM_PROPS = 4;
const pheromones = new Float32Array(WIDTH * HEIGHT); // array to store pheromone values
const vants_render = new Float32Array(WIDTH * HEIGHT); // array to store vant values
const vants_data = new Float32Array(PARAMS.numAgents * NUM_PROPS); // array to store vant data

async function runSimulation(){
    const offset = .5 - PARAMS.startingArea / 2;
    for(let i = 0; i < PARAMS.numAgents * NUM_PROPS; i+=NUM_PROPS){
        vants_data[i] = Math.floor( (offset + Math.random()*PARAMS.startingArea) * WIDTH); // random x position
        vants_data[i + 1] = Math.floor( (offset + Math.random()*PARAMS.startingArea) * HEIGHT); // random y position
        vants_data[i + 2] = Math.random() * 2 * Math.PI; // random direction
        vants_data[i + 3] = Math.round(Math.random() * 3); // random behavior type (0 or 1 or 2 or 3)
}

const sg = await gulls.init();
const pheromones_b = sg.buffer(pheromones, "pheromones");
const vants_render_b = sg.buffer(vants_render, "vants_render");
const vants_data_b = sg.buffer(vants_data, "vants_data");

const render = await sg.render({
    shader: render_shader,
    data: [
        pheromones_b,
        vants_render_b,
    ]
});

const compute = await sg.compute({
    shader: compute_shader,
    data: [
        vants_data_b,
        pheromones_b,
        vants_render_b,
    ],
    onframe() {
        vants_render_b.clear();
    },
    dispatchCount: DISPATH_COUNT,
});

    sg.run(compute, render);
}

