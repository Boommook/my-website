// PRESS CTRL+ENTER TO RELOAD SHADER
// reference at https://github.com/charlieroberts/wgsl_live

// draws a vertical line at NORMALIZED x-pos across the WHOLE screen
// p is in 0..1 space
fn vline(x: f32, thickness: f32, p: vec2f, ar: f32) -> f32 {
  // x needs aspect-ratio correction. Otherwise it is too thick compared to y 
  return step(abs(p.x - x), thickness / ar);
}

// draws a horizontal line at NORMALIZED y-pos
// p is in 0..1 space
fn hline(y: f32, thickness: f32, p: vec2f) -> f32 {
  return step(abs(p.y - y), thickness);
}

fn between(val: f32, min: f32, max: f32) -> f32 {
	return step(min, val) * step(val, max);
}

fn vline_segment(x: f32, y_start: f32, y_end: f32, thickness: f32, p: vec2f, ar: f32) -> f32 {
	let line = vline(x, thickness, p, ar);
	let y_mask = between(p.y, y_start, y_end);
	return line * y_mask;
}

fn rectangle(p: vec2f, minXY: vec2f, maxXY: vec2f) -> f32 {
	let x = step(minXY.x, p.x) * step(p.x, maxXY.x);
	let y = step(minXY.y, p.y) * step(p.y, maxXY.y);
	return x * y;
}

@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  // normalized coordinates from 0 to 1
  let p = uvN(pos.xy);
  // aspect ratio = width / height
  let ar = res.x / res.y;
	// elapsed time in seconds
	let time = seconds();
	// normalize the time
	let ntime = clamp(time / 60.0, 0.0, 1.);


  // thickness
	// vary based on mouse pos and time
  let thickness = 0.01 + 0.02 * ntime;

	// frame based line coords
	let motion = 0.01 + 0.05 * ntime;
	let v1_x = 0.1 + motion * sin(time * 0.4);
	let v2_x = 0.4 + 0.01 * tan(time * 0.2);
	let v3_x = 0.8;
	let v4_x = 0.9 + motion * cos(time * 0.8);
	let v5_x = 0.6 + 0.1 * sin(time);
	// 
	let h1_y = 0.2 + 0.01 * sin(time * 0.5 + 2.0);
	let h2_y = 0.4 + motion * cos(time * 0.2);
	let h3_y = 0.8 + 0.01 * sin(time * 0.3);


  // normalized line positions
  let v1 = vline(v1_x, thickness, p, ar);
  let v2 = vline(v2_x, thickness, p, ar);
  let v3 = vline_segment(v3_x, 0., h1_y, thickness, p, ar);
	let v4 = vline(v4_x, thickness, p, ar);
	let v5 = vline_segment(v5_x, h3_y, 1., thickness, p, ar);

	//let vM = vline(mouse.x, thickness, p, ar);
  let h1 = hline(h1_y, thickness, p);
  let h2 = hline(h2_y, thickness, p);
	let h3 = hline(h3_y, thickness, p);

	//let hM = hline(mouse.y, thickness, p);
  let lines = clamp(v1 + v2 + v3 + v4 + v5 + h1 + h2 + h3, 0.0, 1.0);

  var color = vec3f(
    0.93 + 0.015 * sin(time * 0.10),
    0.92 + 0.010 * sin(time * 0.12 + 1.0),
    0.86 + 0.015 * sin(time * 0.08 + 2.0)
  );
	
	let red = rectangle(p, vec2f(0.), vec2f(v2_x, h1_y));
	let red_pulse = 0.5 + 0.5 * sin(time * (0.5 +ww ntime));
	let green = rectangle(p, vec2f(v5_x, h3_y), vec2f(v4_x, 1.));

  color = mix(color, vec3f(0.8, 0.1, 0.1), red * red_pulse);
	color = mix(color, vec3f(0.3, 0.8, 0.1), green);
	color = mix(color, vec3f(0.05), lines);

  return vec4f(color, 1.0);
}


