// GLSL shaders for the Trivara data sphere.
// All motion runs on the GPU (vertex shader) -> ~0 CPU per frame.

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3  uMouse;        // mouse position in world space (on z=0 plane)
  uniform float uMouseStrength;
  uniform float uAssemble;     // 0 -> scattered chaos, 1 -> perfect sphere

  attribute vec3  aTarget;     // final position on the sphere
  attribute vec3  aChaos;      // scattered start position
  attribute float aSpeed;      // per-particle phase / energy seed

  varying float vEnergy;       // 0..1 -> drives color (cool -> warm)
  varying float vDist;

  //
  // Simplex 3D noise (Ashima Arts / Stefan Gustavson) — public domain
  //
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    // Ease from chaos -> sphere on load
    vec3 base = mix(aChaos, aTarget, uAssemble);

    // Organic breathing: displace each particle along its normal by simplex noise
    float t = uTime * 0.18;
    vec3 dir = normalize(aTarget + 0.0001);
    float n = snoise(aTarget * 1.4 + vec3(t) + aSpeed);
    float n2 = snoise(aTarget * 3.0 - vec3(t * 1.7));
    float displacement = (n * 0.16 + n2 * 0.06) * uAssemble;
    vec3 pos = base + dir * displacement;

    // Mouse repulsion (falloff) — capital reacts to the cursor
    vec3 worldGuess = pos; // sphere centered at origin
    float d = distance(worldGuess.xy, uMouse.xy);
    float influence = smoothstep(1.4, 0.0, d) * uMouseStrength;
    vec3 push = normalize(vec3(worldGuess.xy - uMouse.xy, 0.35)) * influence * 0.9;
    pos += push;

    // Energy: based on noise + mouse influence -> color + size
    vEnergy = clamp(abs(n) * 0.5 + influence * 1.2, 0.0, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDist = -mvPosition.z;

    gl_Position = projectionMatrix * mvPosition;

    // Perspective-correct point size + energy boost
    float size = uSize * (1.0 + vEnergy * 1.4) * aSpeed;
    gl_PointSize = size * uPixelRatio * (8.0 / -mvPosition.z);
  }
`

export const fragmentShader = /* glsl */ `
  uniform vec3 uColorCool;  // liquidity / data
  uniform vec3 uColorWarm;  // capital / exclusivity
  uniform float uOpacity;

  varying float vEnergy;
  varying float vDist;

  void main() {
    // Round, soft particle
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, r);

    // Cool -> warm by energy
    vec3 color = mix(uColorCool, uColorWarm, vEnergy);

    // Slight depth fade for cinematic atmosphere
    float depthFade = smoothstep(11.0, 3.0, vDist);

    gl_FragColor = vec4(color, alpha * uOpacity * (0.45 + depthFade * 0.55));
  }
`
