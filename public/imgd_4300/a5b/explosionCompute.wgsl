// f32 is 4 bytes (4 * 8 bits = 32)
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

// pingpong buffers
@group(0) @binding(0) var<storage, read> particlesIn: array<Particle>;
@group(0) @binding(1) var<storage, read_write> particlesOut: array<Particle>;

@group(0) @binding(2) var<uniform> res: vec2f;
@group(0) @binding(3) var<uniform> count: f32;
@group(0) @binding(4) var<uniform> speed: f32;
@group(0) @binding(5) var<uniform> size: f32;
@group(0) @binding(6) var<uniform> lifetime: f32;
@group(0) @binding(7) var<uniform> explodeX: f32;
@group(0) @binding(8) var<uniform> explodeY: f32;
@group(0) @binding(9) var<uniform> dt: f32;
@group(0) @binding(10) var<uniform> time: f32;
@group(0) @binding(11) var<uniform> spawn: f32;

// control particle spread distance and other settings
const MAX_DIST: f32 = 180.0;
const MIN_SPEED_FACTOR: f32 = 0.08;
const GROWTH_AMOUNT: f32 = 1.4;

fn hash(n: f32) -> f32 {
    return fract(sin(n) * 43758.5453123);
}

fn rand2(seed: f32) -> vec2f {
    let x = hash(seed);
    let y = hash(seed + 17.23);
    return vec2f(x, y) * 2.0 - vec2f(1.0, 1.0);
}

fn safeNormalize(v: vec2f) -> vec2f {
    let len = length(v);
    if (len < 0.0001) {
        return vec2f(1.0, 0.0);
    }
    return v / len;
}

fn moveParticle(p: Particle) -> Particle {
    var out = p;

    let distTraveled = distance(out.pos, out.startPos);
    let progress = clamp(distTraveled / MAX_DIST, 0.0, 1.0);

    // move fast initially, then slow
    let speedFactor = max(MIN_SPEED_FACTOR, 1.0 - progress);

    let dir = safeNormalize(out.vel);
    let baseSpeed = length(out.vel);

    if(distTraveled >= MAX_DIST){
        out.pos = out.startPos + dir * MAX_DIST;
        out.size = out.startSize * (1.0 + GROWTH_AMOUNT);
        return out;
    }

    out.pos = out.pos + dir * baseSpeed * speedFactor * dt * 60.0;
    out.size = out.startSize * (1.0 + progress * GROWTH_AMOUNT);

    return out;
}

fn spawnParticle(index: u32) -> Particle {
    var p = particlesIn[index];
    let seed = f32(index) + time * 17.0;

    let dir = safeNormalize(rand2(seed));
    let spawnOffset = rand2(seed + 100.0) * 12.0;
    var speedScale = hash(seed + 200.0) * 0.3;
    let sizeScale = 0.2 + hash(seed + 300.0) * 0.6;
 
    let spawnPos = vec2f(explodeX, explodeY) + spawnOffset;

    p.pos = spawnPos;
    p.startPos = spawnPos;

    p.vel = dir * speed * speedScale;

    p.life = lifetime;
    p.maxLife = lifetime;

    p.startSize = size * sizeScale;
    p.size = p.startSize;

    p.isActive = 1.0;
    return p;
}

@compute @workgroup_size(64)
fn cs(@builtin(global_invocation_id) gid: vec3<u32>) {
    let i = gid.x;

    if (i >= u32(count)) {
        return;
    }

    // TODO: CHECK i AGAINST particlesIn array length

    var p = particlesIn[i];

    // update living particles
    if (p.isActive > 0.5) {
        p.life = p.life - dt;

        if (p.life <= 0.0) {
            p.isActive = 0.0;
        } 
        else {
            p = moveParticle(p);
        }
    }

    // TODO: ONLY ADD IF ?? IS LESS THAN COUNT
    if(spawn > 0.5) {
        p = spawnParticle(i);
    }

    particlesOut[i] = p;
}