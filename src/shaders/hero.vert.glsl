varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Subtle wave deformation driven by time and mouse Y
    float wave = sin(uv.x * 3.0 + uTime * 0.5) * 0.1;
    wave += cos(uv.y * 2.0 + uTime * 0.3 + uMouse.y) * 0.1;
    
    pos.z += wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
