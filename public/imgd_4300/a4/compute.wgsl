@group(0) @binding(0) var<uniform> res: vec2f;
@group(0) @binding(1) var<storage> statein: array<f32>;
@group(0) @binding(2) var<storage, read_write> stateout: array<f32>;

// diffusion rates for A and B
const dA: f32 = 1.0;
const dB: f32 = 0.5;
// feed rate of A
const feed: f32 = 0.055;
// kill rate of B
const kill: f32 = 0.062;
// change in time for each iteration. all terms are scaled by this
const dt: f32 = 1.0;

fn index( x:i32, y:i32 ) -> u32 {
  let _res = vec2i(res);
  return u32( (y % _res.y) * _res.x + ( x % _res.x ) );
}

fn laplaceA(x: i32, y: i32) -> {
    
}

@compute
@workgroup_size(8,8)
fn cs( @builtin(global_invocation_id) _cell:vec3u ) {
  let cell = vec3i(_cell);

  let i = index(cell.x, cell.y);
  let activeNeighbors = statein[ index(cell.x + 1, cell.y + 1) ] +
                        statein[ index(cell.x + 1, cell.y)     ] +
                        statein[ index(cell.x + 1, cell.y - 1) ] +
                        statein[ index(cell.x, cell.y - 1)     ] +
                        statein[ index(cell.x - 1, cell.y - 1) ] +
                        statein[ index(cell.x - 1, cell.y)     ] +
                        statein[ index(cell.x - 1, cell.y + 1) ] +
                        statein[ index(cell.x, cell.y + 1)     ];

  if( activeNeighbors == 2.0 ) {
    stateout[i] = statein[i];
  }else if( activeNeighbors == 3.) {
    stateout[i] = 1.;
  }else{
    stateout[i] = 0.;
  }
}
