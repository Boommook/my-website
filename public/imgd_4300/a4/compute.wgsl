@group(0) @binding(0) var<uniform> res: vec2f;
@group(0) @binding(1) var<uniform> feed: f32;
@group(0) @binding(2) var<uniform> kill: f32;
@group(0) @binding(3) var<uniform> dt: f32;
@group(0) @binding(4) var<storage> statein: array<f32>;
@group(0) @binding(5) var<storage, read_write> stateout: array<f32>;
@group(0) @binding(6) var<storage, read_write> styleMap: array<f32>;

// function to clamp coordinates (x or y) between 0 and the max coordinates (width or height)
// needed for 2d array to 1d array conversion
fn wrap_around(v: i32, maxv: i32) -> i32 {
    // if the vertex coordinate (x or y) is less than 0
    if(v < 0){
        // then add the max
        return v + maxv;
    }
    // if the vertex coordinate is greater than the max
    if(v >= maxv){
        // remove the max
        return v - maxv;
    }
    return v;
}

fn index( x:i32, y:i32 ) -> u32 {
  //let _res = vec2i(res);
  //return u32( (y % _res.y) * _res.x + ( x % _res.x ) );
  let w = i32(res.x);
  let h = i32(res.y);
  // clamp the coordinates
  let true_x = wrap_around(x, w);
  let true_y = wrap_around(y, h);
  // convert from 2d array to double sized 1d array
  return u32((true_y * w + true_x) * 2);
}

// functions to return the A or B value given the coordinates of the pixel using the index
fn getA(x: i32, y: i32) -> f32 {
    return statein[index(x, y)];
}
fn getB(x: i32, y: i32) -> f32 {
    return statein[index(x, y) + 1u];
}

fn getAB(x: i32, y: i32) -> vec2f {
    let ind = index(x, y);
    return vec2f(statein[ind], statein[ind + 1u]);
}

fn laplace(x: i32, y: i32) -> vec2f {
    var sum = vec2f(0.0, 0.0);

    sum += getAB(x, y) * -1;
    sum += getAB(x - 1, y) * 0.2;
    sum += getAB(x + 1, y) * 0.2;
    sum += getAB(x, y - 1) * 0.2;
    sum += getAB(x, y + 1) * 0.2;
    sum += getAB(x - 1, y - 1) * 0.05;
    sum += getAB(x + 1, y - 1) * 0.05;
    sum += getAB(x - 1, y + 1) * 0.05;
    sum += getAB(x + 1, y + 1) * 0.05;

    return sum;
}

@compute
@workgroup_size(8,8)
fn cs( @builtin(global_invocation_id) _cell:vec3u ) {
  let cell = vec3i(_cell);
  
  let x = i32(cell.x);
  let y = i32(cell.y);

  if (x >= i32(res.x) || y >= i32(res.y)) {
    return;
  }

  let i = index(x, y);

  let a = getA(x, y);
  let b = getB(x, y);

  let lap = laplace(x, y);
  let laplaceA = lap.x;
  let laplaceB = lap.y;

  let dA_styleMap = styleMap[i];
  let dB_styleMap = styleMap[i+1];
  
  stateout[i] = clamp(a + 
                (
                    (dA_styleMap * laplaceA) - 
                    (a * b * b) + 
                    (feed * (1 - a))
                ) * dt, 
                0.0, 1.0);

  stateout[i+1] = clamp(b + 
                (
                    (dB_styleMap * laplaceB) + 
                    (a * b * b) - 
                    ((kill + feed) * b)
                ) * dt, 
                    0.0, 1.0);
}
