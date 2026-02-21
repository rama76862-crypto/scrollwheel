// 3D Simplex Noise — Ashima Arts (inlined)
vec3 mod289i(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289i(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permutei(vec4 x) { return mod289i(((x*34.0)+10.0)*x); }
vec4 taylorInvSqrti(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289i(i);
  vec4 p = permutei(permutei(permutei(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrti(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

uniform float uTime;
uniform float uHover;   // 0 to 1
uniform sampler2D uTexture;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Distortion effect on hover
  float noise = snoise(vec3(uv * 4.0, uTime * 0.5)) * uHover * 0.05;
  
  // Wave distortion
  float wave = sin(uv.y * 10.0 + uTime) * uHover * 0.02;
  
  vec2 distortedUv = uv + vec2(noise + wave, noise - wave);
  
  vec4 color = texture2D(uTexture, distortedUv);
  
  // Vignette/Darken edges
  float dist = distance(uv, vec2(0.5));
  color.rgb *= (1.0 - dist * 0.5);

  // RGB Shift on hover
  float shift = uHover * 0.01;
  float r = texture2D(uTexture, distortedUv + vec2(shift, 0.0)).r;
  float g = texture2D(uTexture, distortedUv).g;
  float b = texture2D(uTexture, distortedUv - vec2(shift, 0.0)).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
