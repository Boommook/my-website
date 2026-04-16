struct Particle {
    pos: vec2<f32>,
    vel: vec2<f32>,
    life: f32,
    maxLife: f32,
    size: f32,
    isActive: f32,
    startPos: vec2<f32>,
    startSize: f32
};

struct VSOut {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) lifeTime: f32,
    @location(3) isActive: f32,
};

@group(0) @binding(0) var<storage, read> particles: array<Particle>;
@group(0) @binding(1) var<storage, read> particlesExtra: array<Particle>;

@group(0) @binding(2) var<uniform> res: vec2f;

fn screenToNDC(pos: vec2f) -> vec2f {
    let x = (2.0 * pos.x / res.x) - 1.0;
    let y = 1.0 - (2.0 * pos.y / res.y);
    return vec2f(x, y);
}

@vertex fn vs(
    @location(0) input: vec2f,
    @builtin(instance_index) instanceIndex: u32
) -> VSOut {
    var out: VSOut;
    let p = particles[instanceIndex];

    let age = 1.0 - (p.life / p.maxLife); // get normalized age
    let currSize = p.size * (1.0 + age * 1.5); // use the age to change the size

    let worldPos = p.pos + input * currSize;
    let ndcPos = screenToNDC(worldPos);

    out.position = vec4f(ndcPos, 0.0, 1.0);
    out.uv = input;
    out.lifeTime = p.life / p.maxLife;

    out.isActive = p.isActive;
    return out;
}

@fragment
fn fs(in: VSOut) -> @location(0) vec4<f32> {
    if (in.isActive < 0.5) {
        discard;
    }

    let r = length(in.uv);
    if (r > 1.0) {
        discard;
    }

    let alpha = smoothstep(1.0, 0.0, r) * in.lifeTime * 10;
    let color = vec3f(0.95, 0.6, 0.2);

    return vec4<f32>(color, alpha);
}