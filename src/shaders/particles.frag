varying float vAlpha;

void main() {
  // Circular soft point sprite
  vec2 uv   = gl_PointCoord - 0.5;
  float dist = length(uv);
  float alpha = smoothstep(0.5, 0.1, dist) * vAlpha * 0.6;

  if (alpha < 0.01) discard;

  // Off-white particle color
  vec3 col = vec3(0.94, 0.93, 0.90);
  gl_FragColor = vec4(col, alpha);
}
