const createGradientPlaceholder = (start, end) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="${start}" />
                    <stop offset="1" stop-color="${end}" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(#g)" />
        </svg>
    `
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const PROJECTS = [
    {
        id: 1,
        title: "Aether",
        category: "WebGL / Brand",
        year: "2024",
        color: "#1a3a2e",
        image: createGradientPlaceholder('#1a3a2e', '#0f2027')
    },
    {
        id: 2,
        title: "Luminary",
        category: "Interactive / 3D",
        year: "2024",
        color: "#2d1a0e",
        image: createGradientPlaceholder('#2d1a0e', '#5b2c00')
    },
    {
        id: 3,
        title: "Parallax",
        category: "Creative Dev",
        year: "2023",
        color: "#0e1a2d",
        image: createGradientPlaceholder('#0e1a2d', '#1b4f72')
    },
    {
        id: 4,
        title: "Void",
        category: "Installation",
        year: "2023",
        color: "#1a0e2d",
        image: createGradientPlaceholder('#1a0e2d', '#4a148c')
    },
]
