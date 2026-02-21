varying vec2 vUv;
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Displacement based on mouse distance
    float dist = distance(vUv, (uMouse * 0.5 + 0.5));
    float strength = smoothstep(0.5, 0.0, dist) * 0.1 * uHover;
    pos.z += strength;
    
    // Wave effect
    pos.z += sin(uv.x * 10.0 + uTime) * 0.02 * uHover;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
