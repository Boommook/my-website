import { Pane } from "https://esm.sh/tweakpane@4.0.5";

import { default as seagulls } from '../gulls.js'

const PARAMS = {
  dA: 1.0,
  dB: 0.5,
  feed: 0.055,
  kill: 0.062,
  dt: 1.0,
}

const pane = new Pane({
  title: "Reaction Diffusion",
  expanded: true,
});

const dA_u = pane.addBinding(PARAMS, "dA", { min: 0, max: 2, step: 0.01 });
const dB_u = pane.addBinding(PARAMS, "dB", { min: 0, max: 2, step: 0.01 });
const feed_u = pane.addBinding(PARAMS, "feed", { min: 0, max: 0.1, step: 0.01 });
const kill_u = pane.addBinding(PARAMS, "kill", { min: 0, max: 0.1, step: 0.01 });
const dt_u = pane.addBinding(PARAMS, "dt", { min: 0, max: 1, step: 0.01 });

const sg      = await seagulls.init(),
      frag    = await seagulls.import( './frag.wgsl' ),
      compute = await seagulls.import( './compute.wgsl' ),
      render  = seagulls.constants.vertex + frag,
      size    = (window.innerWidth * window.innerHeight),
      state   = new Float32Array( size )

const width = sg.width;
const height = sg.height;

// a typed array that represents a contiguous buffer of 32-bit floating-point numbers
// each value in rgba is 8 bytes or 32 bits
// so each array needs to be scaled by 4 to get the correct number of bytes
const state1 = new Float32Array( width * height * 4);
const state2 = new Float32Array( width * height * 4);

for(let y = 0; y < height; y++){
  for(let x = 0; x < width; x++){
    // convert 2d coordinates to 1d index
    const cell = (y * width + x) * 4;
    state1[cell] = 1.0; // red channel for is 1 for A
    state1[cell + 1] = 0.0; // green channel is 0 for B
    state1[cell + 2] = 0.0;
    state1[cell + 3] = 1.0; // alpha channel

    state2[cell] = 1.0; 
    state2[cell + 1] = 0.0;
    state2[cell + 2] = 0.0;
    state2[cell + 3] = 1.0; // alpha channel
  }
}

state1[width * height * 2] = 0.0; // set the center cell to 0 for A
state2[width * height * 2 + 1] = 1.0; // set the center cell to 1 for B

// initialize all cells to random values
for( let i = 0; i < size; i++ ) {
  state[ i ] = Math.round( Math.random() )
}

// create two state buffers
const statebuffer1 = sg.buffer( state )
const statebuffer2 = sg.buffer( state )
const res = sg.uniform([ window.innerWidth, window.innerHeight ])


const renderPass = await sg.render({
  shader: render,
  data: [
    res,
    dA_u,
    dB_u,
    feed_u,
    kill_u,
    dt_u,
    sg.pingpong( statebuffer1, statebuffer2 )
  ]
})

const computePass = sg.compute({
  shader: compute,
  data: [ res, dA_u, dB_u, feed_u, kill_u, dt_u, sg.pingpong( statebuffer1, statebuffer2 ) ],
  dispatchCount:  [Math.round(seagulls.width / 8), Math.round(seagulls.height/8), 1],
})

sg.run( computePass, renderPass )
