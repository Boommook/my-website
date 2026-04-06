@group(0) @binding(0) var<uniform> res: vec2f;
@group(0) @binding(1) var<uniform> dA: f32;
@group(0) @binding(2) var<uniform> dB: f32;
@group(0) @binding(3) var<uniform> feed: f32;
@group(0) @binding(4) var<uniform> kill: f32;
@group(0) @binding(5) var<uniform> dt: f32;
@group(0) @binding(6) var<storage> statein: array<f32>;
@group(0) @binding(7) var<storage, read_write> stateout: array<f32>;


// diffusion rates for A and B
//const dA: f32 = 1.0;
//const dB: f32 = 0.5;
// feed rate of A
//const feed: f32 = 0.055;
// kill rate of B
//const kill: f32 = 0.062;
// change in time for each iteration. all terms are scaled by this
//const dt: f32 = 1.0;

fn wrap_around(v: i32, maxv: i32) -> i32 {
    if(v < 0){
        return v + maxv;
    }
    if(v >= maxv){
        return v - maxv;
    }
    return v;
}

fn index( x:i32, y:i32 ) -> u32 {
  //let _res = vec2i(res);
  //return u32( (y % _res.y) * _res.x + ( x % _res.x ) );
  let w = i32(res.x);
  let h = i32(res.y);
  let true_x = wrap_around(x, w);
  let true_y = wrap_around(y, h);
  return u32((true_y * w + true_x) * 2);
}

fn getA(x: i32, y: i32) -> f32 {
    return statein[index(x, y)];
}

fn getB(x: i32, y: i32) -> f32 {
    return statein[index(x, y) + 1u];
}

fn laplaceA(x: i32, y: i32) -> f32{
    var sum: f32 = 0.0;

    sum += getA(x, y) * -1;
    sum += getA(x - 1, y) * 0.2;
    sum += getA(x + 1, y) * 0.2;
    sum += getA(x, y - 1) * 0.2;
    sum += getA(x, y + 1) * 0.2;
    sum += getA(x - 1, y - 1) * 0.05;
    sum += getA(x + 1, y - 1) * 0.05;
    sum += getA(x - 1, y + 1) * 0.05;
    sum += getA(x + 1, y + 1) * 0.05;

    return sum;
}

fn laplaceB(x: i32, y: i32) -> f32{
    var sum: f32 = 0.0;

    sum += getB(x, y) * -1;
    sum += getB(x - 1, y) * 0.2;
    sum += getB(x + 1, y) * 0.2;
    sum += getB(x, y - 1) * 0.2;
    sum += getB(x, y + 1) * 0.2;
    sum += getB(x - 1, y - 1) * 0.05;
    sum += getB(x + 1, y - 1) * 0.05;
    sum += getB(x - 1, y + 1) * 0.05;
    sum += getB(x + 1, y + 1) * 0.05;

    return sum;
}

@compute
@workgroup_size(8,8)
fn cs( @builtin(global_invocation_id) _cell:vec3u ) {
  let cell = vec3i(_cell);
  let x = i32(cell.x);
  let y = i32(cell.y);

  let i = index(x, y);

  let a = statein[i];
  let b = statein[i + 1u];
  
  stateout[i] = clamp(a + 
                (dA * laplaceA(x, y) * a) - 
                (a * b * b) + 
                (feed * (1 - a)), 0.0, 1.0) * dt;

  stateout[i+1] = clamp(b + 
                (dB * laplaceB(x, y) * b) + 
                (a * b * b) - 
                ((kill + feed) * b), 0.0, 1.0) * dt;
}
