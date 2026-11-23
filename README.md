# VANGUARD HYPERCAR // AEROVANE V12
**Immersive 3D Sports Car Experience & Cinematic Scroll Journey**
*Award-worthy automotive digital campaign inspired by Awwwards SOTD / SOTM experiences*

[![Live Website](https://img.shields.io/badge/Live-Deployment-red.svg)](https://shahzaib-shams2023.github.io/vanguard-aerovane-hypercar/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/shahzaib-shams2023/vanguard-aerovane-hypercar)

---

## 1. Project Overview & Live URLs

- **Live Production URL:** [https://shahzaib-shams2023.github.io/vanguard-aerovane-hypercar/](https://shahzaib-shams2023.github.io/vanguard-aerovane-hypercar/)
- **GitHub Repository:** [https://github.com/shahzaib-shams2023/vanguard-aerovane-hypercar](https://github.com/shahzaib-shams2023/vanguard-aerovane-hypercar)
- **Deployment Platform:** GitHub Pages via automated GitHub Actions CI/CD pipeline
- **Build Status:** Passing (HTTP 200 on all production assets)

---

## 2. The Core Feature: Persistent 3D Sports Car Scroll Motion

Unlike ordinary websites that render isolated 3D widgets in a hero box, **Vanguard Hypercar** utilizes **one continuous, persistent 3D WebGL scene** fixed across the entire viewport. As the user scrolls, the sports car physically traverses the virtual stage, with the camera choreographing cinematic transitions through six distinct narrative chapters:

| Section | Scroll Progress | Car Position & Rotation | Camera Composition & Focus |
|---|---|---|---|
| **01 // Hero Stage** | $0.00 - 0.16$ | $[0, -0.42, 0]$, $\text{rotY} = 0.35$ rad | Wide cinematic studio 3/4 front profile, dramatic rim lighting |
| **02 // Aerodynamics** | $0.16 - 0.35$ | $[0.85, -0.38, 0.4]$, $\text{rotY} = 1.48$ rad | Side silhouette pass, active venturi tunnels, downforce particle vectors |
| **03 // Powertrain** | $0.35 - 0.55$ | $[-0.9, -0.40, 0.3]$, $\text{rotY} = -1.25$ rad | Rear 3/4 quarter view highlighting quad exhaust and carbon diffuser |
| **04 // Carbon Chassis** | $0.55 - 0.72$ | $[0.65, -0.35, 0.6]$, $\text{rotY} = 0.85$ rad | Low-angle wheel rim, carbon-ceramic brake caliper and suspension macro |
| **05 // Cockpit Cabin** | $0.72 - 0.88$ | $[0.1, -0.28, 1.1]$, $\text{rotY} = 0.22$ rad | Intimate top-down cockpit view showing steering wheel, telemetry, seats |
| **06 // Atelier Reserve** | $0.88 - 1.00$ | $[0, -0.42, 0.1]$, $\text{rotY} = -0.45$ rad | Monumental final perspective, full paint customization altar, build reservation |

---

## 3. Technology Stack & Architecture

- **Framework:** React 18 + TypeScript + Vite
- **3D Graphics:** Three.js with Draco geometry decompression (`three/addons/loaders/DRACOLoader`)
- **PBR Shader Materials:** High-gloss `MeshPhysicalMaterial` with realistic clearcoat lacquer, roughness modulation, and Fresnel reflection
- **Motion & Smooth Inertia:** Lenis smooth scrolling coordinated with GSAP ScrollTrigger
- **Styling & Typography:** Tailwind CSS with Google Fonts (`Syncopate`, `Plus Jakarta Sans`, `Space Mono`)
- **Procedural Soundscape:** Web Audio API synthesizer generating V12 engine idle frequencies, turbo spool harmonics, and aerodynamic wind rushing

---

## 4. 3D Model Source & Licensing

- **Asset:** Real-Time Ferrari Sports Car Geometry (`ferrari.glb`)
- **Source:** Three.js Official Examples (`mrdoob/three.js/examples/models/gltf/ferrari.glb`)
- **License:** MIT License (Permits commercial and non-commercial real-time web rendering, modification, and distribution)
- **Asset Size:** 1.68 MB optimized GLB with separate DRACO web workers for non-blocking main-thread execution
- **Full Provenance:** See [ASSET_CREDITS.md](./ASSET_CREDITS.md) for complete details

