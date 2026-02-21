export const lerp = (a, b, n) => (1 - n) * a + n * b

export const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c

export const damp = (val, target, step, dt) => lerp(val, target, 1 - Math.exp(-step * dt))

export const randomBetween = (min, max) => Math.random() * (max - min) + min
