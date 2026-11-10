export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  client: string;
  image: string;
  aspectRatio: string;
  tags: string[];
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  liveUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string;
    icon?: string;
    details: string;
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "AHMAD ROPALDO",
    preferredName: "Ahmad",
    title: "Creative Technologist & 3D Web Engineer",
    shortRole: "Creative Developer",
    location: "Jakarta, Indonesia (UTC+7)",
    availability: "Available for Q3/Q4 Selected Commissions",
    statusBadge: "OPEN TO GLOBAL ROLES",
    email: "ahmadropaldo@gmail.com",
    whatsapp: "+6281234567890",
    phoneDisplay: "+62 (812) 3456-7890",
    experienceYears: "8+",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    instagram: "https://instagram.com/yourusername",
    twitter: "https://x.com/yourusername",
    codepen: "https://codepen.io/yourusername",
    statement: "I don't just build websites. I engineer digital experiences where brutalist aesthetics meet hyper-fluid motion and mathematical precision.",
    bio: [
      "Operating at the bleeding edge of creative technology, 3D graphics, and bespoke web architecture. Over the past 8 years, I have architected high-performance interactive environments, experiential branding, and real-time WebGL engines for global brands, avant-garde ateliers, and ambitious digital pioneers.",
      "My philosophy synthesizes raw typography, structural grid rigor, and low-latency shader animations into living browser artifacts that leave a lasting emotional resonance."
    ],
    stats: [
      { value: "08+", label: "Years in Creative Code" },
      { value: "16", label: "Awwwards & FWA Honors" },
      { value: "48+", label: "Interactive Sites Shipped" },
      { value: "<16ms", label: "Frame Render Budget" }
    ],
    cvUrl: "#resume-preview"
  },

  projects: [
    {
      id: "kinetic-forms",
      title: "KINETIC FORMS",
      subtitle: "Procedural 3D Typography & Spatial Audio Engine",
      category: "Creative Coding / WebGL",
      year: "2026",
      role: "Lead Creative Developer",
      client: "NeoType Foundry (Zurich)",
      image: "/src/assets/images/project_kinetic_forms_1792329030898.jpg",
      aspectRatio: "16/9",
      tags: ["Three.js", "GLSL Shaders", "Web Audio API", "React", "TypeScript"],
      summary: "An interactive browser laboratory exploring real-time kinetic deformation of variable fonts in 3D coordinate space with reactive sound synthesis.",
      challenge: "Rendering fluid chrome typography deformations at consistent 60fps across heterogeneous GPUs while calculating real-time ray-traced caustics and harmonic oscillators.",
      solution: "Engineered a custom vertex displacement shader pipeline with dual-buffer ping-pong simulation and an unbundled procedural audio graph via Web Audio API.",
      outcome: "Awwwards Site of the Month, featured on Codrops Collective, driving 240,000+ interactive sessions within the first 14 days.",
      liveUrl: "https://example.com/kinetic-forms",
      githubUrl: "https://github.com/yourusername/kinetic-forms",
      stats: [
        { label: "Frame Rate", value: "60 FPS" },
        { label: "Interactive Users", value: "240K+" },
        { label: "Font Glyphs", value: "2,400" }
      ],
      featured: true
    },
    {
      id: "virtual-atelier",
      title: "VIRTUAL ATELIER",
      subtitle: "Parametric Metaverse Showroom & Holographic Fabrics",
      category: "E-Commerce / 3D Experience",
      year: "2025",
      role: "3D Graphics & Frontend Architect",
      client: "Atelier Obsidian (Paris)",
      image: "/src/assets/images/project_virtual_atelier_1792329031891.jpg",
      aspectRatio: "16/9",
      tags: ["Three.js", "PBR Materials", "GSAP ScrollTrigger", "Tailwind CSS"],
      summary: "A high-fashion digital runway featuring procedural fabric drape physics, real-time iridescent anisotropic shaders, and an editorial checkout flow.",
      challenge: "Achieving physical fabric realism with subsurface scattering and grazing-angle iridescence without exceeding mobile WebGL memory budgets.",
      solution: "Custom MeshPhysicalMaterial shader injection (`onBeforeCompile`) with procedural studio environment maps and level-of-detail mesh decimation.",
      outcome: "3.4x boost in dwell time compared to traditional lookbooks, with over $1.2M in pre-orders during Paris Digital Fashion Week.",
      liveUrl: "https://example.com/virtual-atelier",
      githubUrl: "https://github.com/yourusername/virtual-atelier",
      stats: [
        { label: "Avg Dwell Time", value: "4m 12s" },
        { label: "Pre-Orders", value: "$1.2M" },
        { label: "Conversion Lift", value: "+340%" }
      ],
      featured: true
    },
    {
      id: "monolith-arch",
      title: "MONOLITH ARCH",
      subtitle: "Brutalist Architectural Spatial Archive & VR Walkthrough",
      category: "Spatial Web / Architecture",
      year: "2025",
      role: "Creative Direction & WebGL Engineer",
      client: "Kurokawa Monolith Studio (Tokyo)",
      image: "/src/assets/images/project_monolith_arch_1792329032592.jpg",
      aspectRatio: "16/9",
      tags: ["Three.js", "WebXR", "Lenis Smooth Scroll", "GLSL"],
      summary: "An interactive spatial monograph documenting concrete cantilever structures through camera path choreography and dynamic sunlight simulation.",
      challenge: "Balancing monumental concrete geometry fidelity with smooth inertia scrolling and mobile touch responsiveness.",
      solution: "Developed an instanced geometry caching system paired with Lenis scroll normalization and virtual camera dolly curves.",
      outcome: "FWA of the Day winner and ArchDaily Best Digital Architecture Portfolio Award 2025.",
      liveUrl: "https://example.com/monolith-arch",
      githubUrl: "https://github.com/yourusername/monolith-arch",
      stats: [
        { label: "Architectural Views", value: "18 Models" },
        { label: "Asset Size", value: "3.2 MB" },
        { label: "Award Honors", value: "FWA & ArchDaily" }
      ],
      featured: true
    },
    {
      id: "sound-sculpture",
      title: "SONIC RIBBON",
      subtitle: "Audio-Reactive Waveform Ribbon Visualizer",
      category: "Generative Art & Sound",
      year: "2024",
      role: "Solo Creator",
      client: "Resonance Sound Lab (Berlin)",
      image: "/src/assets/images/project_sound_sculpture_1792329033713.jpg",
      aspectRatio: "16/9",
      tags: ["Web Audio API", "Three.js", "Noise Shaders", "Motion"],
      summary: "A generative audio visualizer translating microtonal frequency spectra into undulating metallic chrome ribbons with electric lime luminescent strands.",
      challenge: "Transforming live FFT frequency buckets into continuous smooth Spline ribbon geometry without lag or geometry re-allocation garbage spikes.",
      solution: "Utilized dynamic InstancedBufferGeometry and compute-like vertex shader transformations driven by uniform float arrays.",
      outcome: "Installed as an interactive exhibition centerpiece in Berlin's Kraftwerk Sound Pavilion and open-sourced for the creative coding community.",
      liveUrl: "https://example.com/sonic-ribbon",
      githubUrl: "https://github.com/yourusername/sonic-ribbon",
      stats: [
        { label: "FFT Bands", value: "1,024" },
        { label: "Ribbon Vertices", value: "65,000" },
        { label: "Star Count", value: "1.4k GitHub" }
      ],
      featured: true
    },
    {
      id: "cosmos-observatory",
      title: "COSMOS SPECTRA",
      subtitle: "Astrophysical Coordinate Mapping & Telemetry Hub",
      category: "Data Visualization / WebGL",
      year: "2024",
      role: "Data Visualization Architect",
      client: "DeepSky Astrophysics Consortium",
      image: "/src/assets/images/project_cosmos_observatory_1792329032814.jpg",
      aspectRatio: "16/9",
      tags: ["Three.js", "D3.js", "InstancedMesh", "TypeScript"],
      summary: "Rendering 120,000 deep-space stellar bodies with spectroscopic redshift mapping, interactive coordinate filters, and orbital telemetry.",
      challenge: "Displaying over 100k data points simultaneously with buttery 60fps pan/zoom and instant point inspection tooltip raycasting.",
      solution: "Employed GPU instancing with custom attributes for redshift temperatures and an octree spatial partition for O(log n) hover hits.",
      outcome: "Adopted by researchers across 14 universities and commended for bringing academic astronomy to public engagement.",
      liveUrl: "https://example.com/cosmos-spectra",
      githubUrl: "https://github.com/yourusername/cosmos-spectra",
      stats: [
        { label: "Mapped Stars", value: "120,000" },
        { label: "Query Speed", value: "<4ms" },
        { label: "Data Source", value: "Gaia & SDSS" }
      ],
      featured: false
    }
  ] as Project[],

  skills: [
    {
      category: "Frontend Engineering",
      description: "High-performance modular architecture with rock-solid TypeScript & modern frameworks",
      skills: [
        { name: "React 19 & TypeScript", level: "98%", details: "Hooks architecture, performance profiling, strict type contracts, concurrent features." },
        { name: "Next.js & Vite", level: "95%", details: "SSR/SSG orchestration, modern bundler tuning, tree-shaking, code-splitting." },
        { name: "Tailwind CSS & Styling", level: "96%", details: "Modern layout math, design token architecture, responsive clamp typography." },
        { name: "State & Architecture", level: "92%", details: "Modular domain isolation, event emitters, unidirectional flow, offline caching." }
      ]
    },
    {
      category: "Creative Coding & 3D Web",
      description: "Immersive spatial environments, mathematical geometries & custom GLSL shaders",
      skills: [
        { name: "Three.js & WebGL", level: "96%", details: "Custom shaders, RoomEnvironment PBR lighting, instanced rendering, buffer geometries." },
        { name: "GLSL Shader Programming", level: "90%", details: "Vertex displacement, procedural noise, signed distance fields, post-processing passes." },
        { name: "WebGPU & TSL", level: "84%", details: "Next-gen compute shaders, node materials, low-overhead GPU pipelines." },
        { name: "Mathematical Modeling", level: "88%", details: "Parametric curves, quaternions, spring physics, procedural topology." }
      ]
    },
    {
      category: "Motion & Interaction Design",
      description: "Cinema-grade choreography, scroll storytelling & responsive tactile feedback",
      skills: [
        { name: "GSAP & ScrollTrigger", level: "98%", details: "Pinning, scrubbing, timeline sequencing, smooth coordinate mapping." },
        { name: "Lenis Smooth Scroll", level: "95%", details: "Inertial scroll physics, RAF synchronization, zero jank architecture." },
        { name: "Motion (Framer Motion)", level: "94%", details: "Spring dynamics, layout animations, exit transitions, gesture tracking." },
        { name: "Tactile Micro-Interactions", level: "96%", details: "Magnetic cursor physics, fluid hover state interpolation, haptic cues." }
      ]
    },
    {
      category: "Audio & Experimental",
      description: "Sound synthesis, generative systems & interactive computing experiments",
      skills: [
        { name: "Web Audio API", level: "86%", details: "Harmonic oscillators, gain nodes, FFT real-time analysis, procedural sound design." },
        { name: "Generative Art", level: "90%", details: "Cellular automata, L-systems, flow fields, chaotic attractor mathematics." },
        { name: "Creative Pipeline", level: "92%", details: "Blender 3D optimization, glTF Draco compression, normal map generation." }
      ]
    }
  ] as SkillCategory[],

  recognitions: [
    { title: "Site of the Day (×4)", org: "Awwwards", year: "2024–2026" },
    { title: "Developer Award", org: "Awwwards", year: "2025" },
    { title: "FWA of the Day (×3)", org: "FWA", year: "2024–2025" },
    { title: "Site of the Day (×5)", org: "CSS Design Awards", year: "2024–2026" },
    { title: "Best UI / UX / Innovation", org: "CSSDA", year: "2025" },
    { title: "Creative Coding Feature", org: "Codrops Collective", year: "2025" }
  ]
};
