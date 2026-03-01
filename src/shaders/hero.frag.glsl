uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uDistortion;
uniform float uOpacity;
varying vec2 vUv;

#include './noise.glsl'

void main() {
    vec2 uv = vUv;
    
    // Fluid distortion based on mouse proximity
    vec2 mouseP = uMouse * 0.5 + 0.5;
    float dist = distance(uv, mouseP);
    float ripple = smoothstep(0.4, 0.0, dist);
    
    // Base noise and distortion
    float noiseBase = snoise(vec3(uv * 5.0, uTime * 0.1));
    vec2 distortedUv = uv + ripple * uDistortion * noiseBase;
    
    // Chromatic Aberration (Cheaper approximation)
    float offset = ripple * 0.003;
    float r = snoise(vec3((distortedUv + vec2(offset, 0.0)) * 3.0, uTime * 0.05));
    float g = noiseBase * 0.5 + 0.5; // Reuse base noise for green channel
    float b = snoise(vec3((distortedUv - vec2(offset, 0.0)) * 3.0, uTime * 0.05));
    
    vec3 color = mix(vec3(0.04), vec3(0.08, 0.07, 0.07), vec3(r, g, b));
    
    // Vignette
    float vignette = smoothstep(1.2, 0.4, length(vUv - 0.5));
    color *= mix(0.6, 1.0, vignette);
    
    // Grain (internal fallback to noise)
    float grain = snoise(vec3(uv * uResolution.y, uTime * 10.0)) * 0.04;
    color += grain;
    
    gl_FragColor = vec4(color, uOpacity);
}
