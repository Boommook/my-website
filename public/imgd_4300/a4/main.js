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
const feed_u = pane.addBinding(PARAMS, "feed", { min: 0, max: 1, step: 0.01 });
const kill_u = pane.addBinding(PARAMS, "kill", { min: 0, max: 1, step: 0.01 });
const dt_u = pane.addBinding(PARAMS, "dt", { min: 0, max: 1, step: 0.01 });

const sg      = await seagulls.init(),
      frag    = await seagulls.import( './frag.wgsl' ),
      compute = await seagulls.import( './compute.wgsl' ),
      render  = seagulls.constants.vertex + frag,
      size    = (window.innerWidth * window.innerHeight),
      state   = new Float32Array( size )


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
