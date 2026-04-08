import { Pane } from "https://esm.sh/tweakpane@4.0.5";

import { default as seagulls } from '../gulls.js'

const PARAMS = {
  Min_dA: 0.5,
  Max_dB: 0.5,
  feed: 0.055,
  kill: 0.062,
  dt: 1.0,
}

const pane = new Pane({
  title: "Reaction Diffusion",
  expanded: true,
});

const sg      = await seagulls.init(),
      frag    = await seagulls.import( './frag.wgsl' ),
      compute = await seagulls.import( './compute.wgsl' ),
      render  = seagulls.constants.vertex + frag,
      width   = sg.width,
      height  = sg.height,
      size    = width * height;

const u_feed = sg.uniform(PARAMS.feed),
      u_kill = sg.uniform(PARAMS.kill),
      u_dt = sg.uniform(PARAMS.dt);

let styleMap = initializeStyleMap();
let styleMapBuffer = sg.buffer( styleMap );

pane.addBinding(PARAMS, "Min_dA", { min: 0.15, max: 0.75, step: 0.05 });
pane.addBinding(PARAMS, "Max_dB", { min: 0.25, max: 0.85, step: 0.05 });
pane.addBinding(PARAMS, "feed", { min: 0, max: 0.1, step: 0.01 });
pane.addBinding(PARAMS, "kill", { min: 0, max: 0.1, step: 0.01 });
pane.addBinding(PARAMS, "dt", { min: 1, max: 2, step: 0.05 });
pane.on("change", () => {
  u_feed.value = PARAMS.feed;
  u_kill.value = PARAMS.kill;
  u_dt.value = PARAMS.dt;
  styleMap = initializeStyleMap();
  // I asked chatgpt how to update the buffer and it told me to use this:
  sg.device.queue.writeBuffer(styleMapBuffer.buffer, 0, styleMap);
});

function initializeState(){
    // size is double to store both A and B
    const state = new Float32Array( size * 2);
    // initialize all cells to 1.0 for A and 0.0 for B
    for(let i = 0; i < size; i++){
        state[i * 2] = 1.0 // A is 1.0
        state[i * 2 + 1] = 0.0 // B is 0.0
    }
    
    // choose the number of starting blobs
    const numBlobs = Math.floor( Math.random() * 5) + 10; // between 10 and 20

    for(let i = 0; i < numBlobs; i++){
      // choose a random position for the blob
      const x = Math.floor( Math.random() * width );
      const y = Math.floor( Math.random() * height );
      // choose a random radius for the blob
      const radius = Math.floor( Math.random() * 20) + 10;

      // set the cells inside the radius to 0.0 for A and 1.0 for B
      for(let h = 0; h < height; h++){
          for(let w = 0; w < width; w++){
              const dx = w - x;
              const dy = h - y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if(dist < radius){
                  const cell = (h * width + w) * 2;
                  state[cell] = 0.0; // A is 0.0
                  state[cell + 1] = 1.0; // B is 1.0
              }
          }
      }
    }
    return state;
}

function initializeStyleMap(){
  const styleMap = new Float32Array( size * 2 );
  for(let i = 0; i < size; i++){
    styleMap[i * 2] = Math.random() * (1 - PARAMS.Min_dA) + PARAMS.Min_dA;
    styleMap[i * 2 + 1] = Math.random() * (PARAMS.Max_dB - 0.15) + 0.15;
  }
  return styleMap;
}


// create two state buffers
const initialState = initializeState();
const statebuffer1 = sg.buffer( initialState )
const statebuffer2 = sg.buffer( initialState )
const u_res = sg.uniform([ width, height ])

const renderPass = await sg.render({
  shader: render,
  data: [
    u_res,
    sg.pingpong( statebuffer1, statebuffer2 )
  ]
})

const computePass = sg.compute({
  shader: compute,
  data: [ u_res, u_feed, u_kill, u_dt, sg.pingpong( statebuffer1, statebuffer2 ), styleMapBuffer ],
  dispatchCount: [Math.ceil(width / 8), Math.ceil(height/8), 1],
  times: 50
})

sg.run( computePass, renderPass )
