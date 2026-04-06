@group(0) @binding(0) var<uniform> res: vec2f;
@group(0) @binding(1) var<storage> state: array<f32>;
@group(0) @binding(2) var<storage> stateout: array<f32>;

fn index(x: i32, y: i32) -> u32 {
  return u32((y * i32(res.x) + x) * 2);
}
@fragment 
fn fs( @builtin(position) pos : vec4f ) -> @location(0) vec4f {
  let x = i32(pos.x);
  let y = i32(pos.y);
  let i = index(x, y);

  let a = state[i];
  let b = state[i + 1];
  
  let v = clamp(a - b, 0.0, 1.0);
  return vec4f( v,v,v, 1.);
}
