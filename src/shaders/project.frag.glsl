uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
varying vec2 vUv;

#include './noise.glsl'

void main() {
    vec2 uv = vUv;
    
    // Sample textures
    vec4 tex1 = texture2D(uTexture1, uv);
    vec4 tex2 = texture2D(uTexture2, uv);
    
    // Noise-based threshold wipe
    float noise = snoise(vec3(uv * 4.0, uTime * 0.1));
    float threshold = uProgress * 1.2 - 0.1; // Expand range for full coverage
    float mask = smoothstep(threshold - 0.1, threshold + 0.1, noise + uv.x * 0.2); // Subtle directional bias
    
    vec4 finalColor = mix(tex1, tex2, mask);
    
    // Vignette
    float vig = 1.0 - distance(uv, vec2(0.5)) * 1.5;
    finalColor.rgb *= vig;
    
    gl_FragColor = finalColor;
}
