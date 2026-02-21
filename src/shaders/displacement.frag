uniform float uTime;
uniform vec3  uColorA;   // near-black base
uniform vec3  uColorB;   // off-white highlight
uniform vec3  uAccent;   // crimson accent

varying vec3  vNormal;
varying vec3  vPosition;
varying float vNoise;

void main() {
  // Fresnel rim
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.5);

  // Map noise to gradient between base and highlight
  float t = smoothstep(-0.5, 0.5, vNoise);
  vec3 baseColor = mix(uColorA, uColorB, t * 0.35);

  // Add fresnel rim with accent color
  vec3 col = mix(baseColor, uAccent, fresnel * 0.6);

  // Subtle pulsing brightness on peaks
  col += uColorB * vNoise * 0.08;

  gl_FragColor = vec4(col, 1.0);
}
