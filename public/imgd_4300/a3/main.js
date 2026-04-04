import { Pane } from "https://esm.sh/tweakpane@4.0.5";

import Video from "./video.js";
import gulls from "../gulls.js";

const sg = await gulls.init();
const quadVertexShader = gulls.constants.vertex;

await Video.init();

async function run() {
  const PARAMS = {
    speed: 0.5,
    red: 0.6,
    green: 0.2,
    blue: 0.8,
    size: "medium",
    invert: 0,
  };

  const pane = new Pane();

  const camTexture = sg.device.createTexture({
    size: [sg.width, sg.height],
    format: "rgba8unorm",
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });
  camTexture.type = "texture";

  const fragmentShader = `
    @group(0) @binding(0) var<uniform> res : vec2f;
    @group(0) @binding(1) var<uniform> frame : f32;
    @group(0) @binding(2) var<uniform> speed : f32;
    @group(0) @binding(3) var<uniform> invert : f32;
    @group(0) @binding(4) var<uniform> mouse : vec2f;
    @group(0) @binding(5) var<uniform> red : f32;
    @group(0) @binding(6) var<uniform> green : f32;
    @group(0) @binding(7) var<uniform> blue : f32;
    @group(0) @binding(8) var<uniform> size : f32;

    @group(0) @binding(9) var videoSampler : sampler;
    @group(0) @binding(10) var videoTexture : texture_2d<f32>;
    @group(1) @binding(0) var videoBuffer : texture_external;

    fn random(st : vec2f) -> f32 {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
    }

    fn pattern(st: vec2f, v: vec2f, t: f32) -> f32 {
      let p = floor(st + v);
      return step(t, random(100. + p * .000001) + random(vec2f(p.x, p.x)) * 0.5);
    }

    @fragment
    fn fs( @builtin(position) pos : vec4f ) -> @location(0) vec4f {
      let grid = vec2f(50, 25);
      var uvBase = pos.xy / res;
      let uvCam = vec2f(pos.x / res.x, pos.y / res.y);
      let video = textureSampleBaseClampToEdge(videoBuffer, videoSampler, uvCam);

      uvBase *= grid;

      let ipos = floor(pos.xy);

      let mouseGrid = mouse * grid;
      let startPoint = vec2f(uvBase.x, uvBase.y);
      let flowDir = normalize(mouseGrid - startPoint);
      let angle = atan2(flowDir.y, flowDir.x);
      let speed = frame * speed / 180.0 * grid.x;
      var vel = vec2f(0., 0.);
      if (invert == 1.0) {
        vel = vec2f(speed * cos(angle), speed * sin(angle));
      } else {
        vel = vec2f(speed * sin(angle), speed * cos(angle));
      }
      vel *= random(vec2f(1. + ipos.y, 1. + ipos.y));

      let offset = vec2f(0.1, 0.);

      let distToMouse = distance(uvBase, mouse * grid);
      let noiseMask = smoothstep(0.5, size, distToMouse);

      let base_r = pattern(uvBase + offset, vel, 1. - red);
      let base_g = pattern(uvBase, vel, 1. - green);
      let base_b = pattern(uvBase - offset, vel, 1. - blue);

      let baseColor = vec3f(base_r, base_g, base_b);

      let clearMask = 1.0 - noiseMask;
      let videoMix = clamp(clearMask * 0.85 + 0.15, 0.0, 1.0);
      let color = mix(baseColor, video.rgb, videoMix);

      return vec4f(color, 1.);
    }
  `;

  const shader = quadVertexShader + fragmentShader;

  let frame_u = sg.uniform(0);
  let speed_u = sg.uniform(PARAMS.speed);
  let invert_u = sg.uniform(1.0);
  let mouse_u = sg.uniform([0.5, 0.5]);
  let red_u = sg.uniform(PARAMS.red);
  let green_u = sg.uniform(PARAMS.green);
  let blue_u = sg.uniform(PARAMS.blue);
  let size_u = sg.uniform(4.0);

  const camSampler = sg.sampler({
    magFilter: "linear",
    minFilter: "linear",
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge",
  });

  const back = new Float32Array(sg.width * sg.height * 4);
  const videoTexture = sg.texture(back);

  const videoObj = sg.video(Video.element);

  const renderPass = await sg.render({
    shader,
    data: [
      sg.uniform([window.innerWidth, window.innerHeight]),
      frame_u,
      speed_u,
      invert_u,
      mouse_u,
      red_u,
      green_u,
      blue_u,
      size_u,
      camSampler,
      videoTexture,
      videoObj,
    ],
    copy: videoTexture,
    onframe() {
      frame_u.value++;
    },
  });

  window.onmousemove = (e) => {
    mouse_u.value = [e.clientX / window.innerWidth, e.clientY / window.innerHeight];
  };

  pane
    .addBinding(PARAMS, "speed", { min: 0, max: 1, step: 0.01 })
    .on("change", (ev) => {
      speed_u.value = ev.value;
    });

  const colorFolder = pane.addFolder({ title: "Color", expanded: true });
  colorFolder
    .addBinding(PARAMS, "red", { min: 0, max: 1, step: 0.01 })
    .on("change", (ev) => {
      red_u.value = ev.value;
    });
  colorFolder
    .addBinding(PARAMS, "green", { min: 0, max: 1, step: 0.01 })
    .on("change", (ev) => {
      green_u.value = ev.value;
    });
  colorFolder
    .addBinding(PARAMS, "blue", { min: 0, max: 1, step: 0.01 })
    .on("change", (ev) => {
      blue_u.value = ev.value;
    });

  pane
    .addBinding(PARAMS, "size", {
      options: { Small: "small", Medium: "medium", Large: "large" },
    })
    .on("change", (ev) => {
      size_u.value = ev.value === "small" ? 2.0 : ev.value === "medium" ? 4.0 : 8.0;
    });

  const btn = pane.addButton({ title: "Invert", label: "invert" });
  btn.on("click", () => {
    invert_u.value *= -1;
  });

  sg.run(renderPass);
}

run();

