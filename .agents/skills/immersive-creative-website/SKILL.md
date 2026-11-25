---
name: immersive-experiential-web-design
description: Research-first instructions for discovering diverse, current creative-web references and designing distinctive immersive, interactive, cinematic, and technically polished websites without copying or depending on any single studio or visual style. Use for website design, redesign, frontend implementation, landing pages, portfolios, brand experiences, product showcases, and interactive storytelling.
---

# Immersive & Experiential Web Design Skill

## Mission

Create websites that feel intentionally art-directed, memorable, immersive, and expertly engineered—not generic templates with a few animations added.

Treat immersive and experiential web design as a broad, constantly evolving field—not as one recognizable aesthetic. Explore many studios, independent creative developers, experimental projects, interactive art, editorial experiences, product storytelling, and unusual uses of browser technology. No single website, agency, award gallery, or technology stack is the default reference.

Any user-supplied website is one possible example among many. It is not automatically the canonical template, required inspiration source, or visual target. Never let one reference determine every project's composition, typography, color, motion, or interaction model.

**Default ambition:** aim for a bespoke, immersive, interactive experience whenever the project allows it. Do not interpret this as “add 3D everywhere.” The right result may use typography, layout, imagery, video, SVG, CSS, sound, scroll choreography, WebGL, generative graphics, data visualization, or a carefully chosen combination. Every effect must serve the content, brand, narrative, or usability.

For utility-heavy products (admin panels, dense dashboards, checkout, forms, internal tools), prioritize clarity and speed. Bring in the same level of craft through typography, spacing, feedback, hierarchy, and restrained motion rather than making essential tasks theatrical.

## Non-negotiable operating rules

1. **Do not start coding immediately.** First inspect the project, understand the brief, research current references and technologies, and establish a clear creative direction.
2. **Research the live web before choosing techniques.** Verify current APIs, package versions, browser support, known limitations, examples, and recommended implementation patterns. Prefer official documentation and maintained repositories over old tutorials.
3. **Inspect the existing project before changing it.** Preserve its framework, package manager, conventions, routing, working features, and design decisions unless there is a strong technical reason to change them.
4. **Design the experience, not just the first screen.** Plan the full page flow, responsive behavior, loading state, scroll behavior, interactions, transitions, and ending.
5. **Build a real, functioning website.** Do not stop at a static mockup or a list of ideas unless the user specifically asks only for a concept.
6. **Responsive behavior is part of the design.** Desktop, tablet, and mobile must each work deliberately. Never assume a desktop animation will automatically work on touch devices.
7. **Accessibility and performance are product requirements.** A visually impressive site that is unreadable, unstable, inaccessible, or slow is not a successful result.
8. **Do not fabricate research.** If browsing or a reference cannot be inspected, state the limitation internally and use verified documentation or a simpler implementation. Never invent API behavior or pretend a technique was tested.
9. **Do not clone a reference.** Extract its design principles and interaction ideas, then create an original visual system that fits this project's content and identity.
10. **Prefer a small, coherent toolset.** Do not install libraries just because they are fashionable. Every dependency must solve a real problem.
11. **Avoid reference anchoring.** Never treat one award gallery, studio, website, or familiar visual aesthetic as the universal target. Discover a new mix of references for each project and deliberately explore at least one direction that differs from the obvious inspiration.

---

## Phase 1 — Understand the project before touching code

### 1.1 Inspect the repository

Before editing, identify:

- Framework, language, build tool, and package manager.
- App entry points, routes, layouts, and component structure.
- Existing styling system, design tokens, fonts, icons, and asset conventions.
- Existing animation, 3D, and UI dependencies.
- Available images, videos, illustrations, 3D models, and brand assets.
- Current functionality that must be preserved.
- Existing errors, warnings, and the baseline behavior of the project.

Run the project using its existing documented commands. Look at the actual running UI, not only the source code. Do not replace the framework or rewrite the app architecture merely to make implementation more convenient.

### 1.2 Understand the brief

Determine:

- Who the audience is and what action or feeling the site should create.
- The product, brand, story, or subject being presented.
- The content hierarchy and essential information.
- The pages and sections required.
- The desired personality: editorial, luxury, playful, technical, artistic, brutalist, futuristic, minimal, cinematic, etc.
- The required interactions and any business constraints.
- Target devices, browsers, and performance constraints when known.

Do not invent content, testimonials, statistics, customer logos, product features, or brand claims. Use supplied material. Where content is missing, use clearly identifiable placeholders only when necessary.

---

## Phase 2 — Research before implementation

Research is a mandatory part of this skill, not an optional extra. It must be repeated for every project. Do not reuse the same handful of references by habit or treat a static list of inspiration sites as the entire design landscape.

### 2.1 Discover fresh and diverse visual references

**Search the live web for every new project before settling on a direction.** A user-provided URL is a clue about taste or quality, not an instruction to copy it or the only website to inspect. If the user supplies a reference, include it as one entry in a wider investigation. If no reference is supplied, discover the direction from the brief.

Do not begin with the same familiar studio or website by default. Do not keep returning to the same agency, award winner, or visual trend. Discover different work each time, including recent projects and sources you have not used in the immediately preceding project when possible.

Use varied search queries based on the actual brief and the effect being explored. Search beyond generic phrases such as “modern website design.” Examples:

- `experimental interactive website [project subject]`
- `immersive digital experience [industry or story]`
- `creative developer portfolio WebGL interaction [current year]`
- `editorial website scroll storytelling art direction`
- `interactive product storytelling website motion design`
- `generative typography web experiment canvas`
- `WebGPU interactive browser experiment demo`
- `minimal typographic website unconventional navigation`
- `interactive data visualization website storytelling`

Use a varied discovery pool. These are starting points, not a closed whitelist; find other studios, individual makers, labs, live experiments, and new collections as research leads you there:

- [Awwwards](https://www.awwwards.com/) — award-winning digital experiences and interaction patterns.
- [Godly](https://godly.website/) — curated creative websites and visual directions.
- [The FWA](https://thefwa.com/) — experimental and technically ambitious web experiences.
- [CSS Design Awards](https://www.cssdesignawards.com/) — creative web design references.
- [SiteInspire](https://www.siteinspire.com/) — layouts, typography, and art direction.
- [Codrops Creative Hub](https://tympanus.net/codrops/hub/) — code-led experiments, interaction demos, and implementation ideas.
- [Hoverstates](https://hoverstat.es/) — unconventional web layouts, interactions, and experimental design.
- [Httpster](https://httpster.net/) — distinctive independent and studio websites.
- [Recent](https://recent.design/) — recently launched website inspiration.
- [Minimal Gallery](https://minimal.gallery/) — restrained, typography-led, and minimal directions.
- [One Page Love](https://onepagelove.com/) — focused landing pages and single-page storytelling.
- [Land-book](https://land-book.com/) — landing page composition and art direction.

Also explore studio portfolios, personal portfolios, creative-coding showcases, open-source demos, digital art projects, product launches, museums, cultural institutions, music experiences, fashion campaigns, and experimental browser projects. Some of the strongest ideas will not appear in award galleries.

#### Reference diversity requirements

Before choosing a direction, gather **at least five genuinely different references from at least three independent sources or domains**, when web access permits. Do not satisfy this requirement by collecting five pages from one studio or five websites with effectively the same aesthetic. Prefer a mix such as:

- One reference with strong art direction, composition, or typography.
- One reference with a distinct interaction or motion idea.
- One reference using a different visual language from the obvious direction (for example minimal/editorial versus 3D/cinematic).
- One reference relevant to the project's subject, audience, or industry.
- One unexpected reference from another field that could introduce a fresh idea.

Choose references for different strengths. They do not all need to be immersive 3D sites. A restrained editorial site, a data visualization, an interactive artwork, a product configurator, a typographic experiment, or a great mobile experience may offer a more useful idea than another cinematic portfolio.

Compare at least three distinct creative directions before committing. For example, compare a typographic/editorial direction, a spatial/3D direction, and a motion-led or generative direction. Adapt this comparison to the project; do not force these exact categories when they are irrelevant.

The goal is not to combine every reference. Identify a small number of useful principles from different sources, then create a new visual system that belongs to this project. Avoid repeating the same layout, hero treatment, transition, color palette, or 3D motif from project to project.

#### Inspect references, do not just collect screenshots

Open the actual live websites where possible. Scroll through the full experience and test interactions rather than judging only thumbnails or landing-page screenshots. Check recent work and dates when available. Record the URL and the specific observation so the idea can be traced back to its source.

For each useful reference, inspect and record:

- First-screen composition and visual hierarchy.
- Typography choices, scale, line breaks, and type behavior.
- Grid, spacing, alignment, negative space, and section rhythm.
- Color, contrast, texture, lighting, and art direction.
- Use of photography, video, 3D, illustration, and abstract graphics.
- Navigation and page transitions.
- Scroll choreography and the relationship between scrolling and animation.
- Hover, pointer, drag, click, and touch interactions.
- How the design changes at mobile widths.
- Loading behavior and perceived performance.

Look for the underlying design principle rather than copying an isolated effect. Example: “the hero uses a slow camera move to establish scale” is more useful than “copy this spinning sphere.”

### 2.2 Research implementation options

For every substantial effect, compare at least two plausible approaches before selecting one. Examples:

- CSS transforms versus GSAP timelines.
- SVG animation versus Canvas/WebGL.
- A pre-rendered video versus a real-time 3D scene.
- Spline embed versus a custom Three.js scene.
- Native scrolling versus a smooth-scroll library.

Check current official documentation, release notes, examples, and relevant browser support. Confirm package compatibility with the project's installed framework and version. Do not follow an old tutorial blindly.

Use this order of trust:

1. Official API documentation and migration guides.
2. Official examples, maintainers' repositories, and release notes.
3. Maintained library documentation and established engineering articles.
4. Community discussions as supplementary context—not as the sole authority.

Record the chosen approach and why it fits the project. Avoid adding an elaborate technology stack without a concrete benefit.

### 2.3 Research output

Before implementation, form a concise internal design/engineering brief containing:

- Creative concept in one sentence.
- The three distinct creative directions considered and why one was selected.
- At least five reference URLs from at least three independent sources when browsing is available, with a note explaining the specific lesson taken from each.
- Which ideas are borrowed as general principles and how the final execution will differ from the references.
- Visual direction: typography, palette, imagery, composition, texture, and layout.
- Main interaction idea and the purpose it serves.
- Proposed section order and narrative flow.
- Selected technologies and alternatives rejected, with current documentation or implementation sources.
- Mobile adaptation and accessibility plan.
- Performance risks and mitigation.

Do not pad the research brief with irrelevant links. Five carefully inspected references are more valuable than twenty unexamined thumbnails. If web access is unavailable, say so in the work summary and do not pretend that fresh references were researched.

If the environment supports progress updates, share the meaningful findings before moving into a large implementation. Do not expose a long research diary.

---

## Phase 3 — Create an original art direction

### 3.1 Establish a visual concept

Choose a specific concept that can guide the whole experience. Examples include:

- A digital exhibition or interactive gallery.
- A cinematic product reveal.
- An editorial story with oversized type and image sequences.
- A spatial environment with a camera journey.
- A tactile, material-led interface.
- A restrained typographic experience with precise motion.
- A data or product story that unfolds through scroll.

Make the visual language coherent. Define a small set of rules for:

- Display and body typography.
- Font weights, type scale, and responsive line lengths.
- Main and supporting colors.
- Grid, margins, spacing, and section widths.
- Image treatment, aspect ratios, cropping, and transitions.
- Borders, surfaces, shadows, textures, and graphic motifs.
- Motion duration, easing, and interaction feedback.

Use deliberate asymmetry, scale, overlap, negative space, or unusual composition where it strengthens the concept. Do not add visual complexity without hierarchy.

### 3.2 Avoid generic AI-generated design patterns

Do not default to:

- A generic centered hero followed by identical feature cards.
- Purple/blue gradient backgrounds without a clear reason.
- Glassmorphism on every surface.
- Excessive rounded cards, pills, badges, and floating blobs.
- Stock-looking abstract 3D objects unrelated to the subject.
- Repeated cards with identical spacing and layout across every section.
- Random gradients, noise, glow, blur, or decorative lines used to disguise weak composition.
- Huge empty sections that add no narrative value.
- Generic copy such as “Revolutionizing the future” or fabricated marketing claims.
- Default component-library styling presented as a finished creative direction.

Use a component library only where it genuinely helps. Customize it to the visual system rather than allowing its defaults to determine the site's identity.

### 3.3 Typography and assets

Typography is a primary design element. Select fonts based on the project's character and ensure they are licensed for the intended use. Use a clear typographic hierarchy and intentional line breaks. Avoid tiny body text and overly long lines.

Use real, relevant, high-quality visual assets wherever possible. Prefer supplied brand assets or appropriately licensed assets. Do not use random stock imagery simply to fill empty space. Optimize image dimensions and formats; define image dimensions or aspect ratios to prevent layout shifts.

For video, use an appropriate poster, compressed encodes, and a loading strategy suited to the placement. Avoid loading every large media asset immediately.

---

## Phase 4 — Choose the technology for the experience

The following is a decision guide, not a requirement to use every tool.

### 4.1 Core web platform

Start with semantic HTML, modern CSS, and the project's existing JavaScript framework. Use native platform features when they are sufficient. CSS Grid, Flexbox, custom properties, responsive typography, `position: sticky`, transforms, masks, clip paths, and modern media queries can produce sophisticated results without a heavy runtime.

Use the existing framework and version unless a change is justified. Keep the main content in the DOM so it remains discoverable, selectable, responsive, and accessible.

### 4.2 Motion and scroll choreography

**GSAP** is a strong choice for coordinated timelines, complex sequences, SVG motion, pinned sections, scrubbed scroll animation, and precise choreography.

Useful areas to research:

- GSAP timelines and easing.
- ScrollTrigger for scroll-linked and section-based motion.
- `gsap.matchMedia()` for responsive animation setups.
- `gsap.context()` or the current React integration for scoped setup and cleanup.

Official docs: <https://gsap.com/docs/v3/>

Use CSS transitions and keyframes for simple, local interactions. Use the framework's existing motion library when it is already part of the project and fits the effect. Avoid using multiple animation systems to control the same element.

**Motion principles:**

- Every animation must communicate hierarchy, state, continuity, spatial depth, or feedback.
- Use a small, consistent set of durations and easing curves.
- Animate `transform` and `opacity` where practical; avoid repeatedly animating layout-heavy properties.
- Do not animate every element. Establish a clear focal point.
- Avoid scroll effects that make reading or navigation difficult.
- Avoid scroll-jacking. The user must remain in control of scrolling.
- Keep animations interruptible and avoid trapping users in long transitions.
- Clean up timelines, event listeners, observers, and animation frames when components unmount or routes change.

### 4.3 Smooth scrolling

**Lenis** can be considered when smooth scrolling materially supports the experience, especially when scroll position must stay synchronized with GSAP or a WebGL scene.

Official documentation: <https://github.com/darkroomengineering/lenis>

Do not add smooth scrolling automatically. Native scrolling is usually simpler and already works well with browser navigation, keyboard input, and touch. If Lenis is used:

- Follow the current official setup and GSAP integration instructions.
- Preserve anchor navigation and nested scroll behavior.
- Test touch devices, mobile browsers, modals, forms, and fixed-position UI.
- Respect `prefers-reduced-motion`.
- Provide a reliable path back to native-feeling behavior if integration causes issues.

### 4.4 3D, WebGL, and real-time graphics

Use 3D when it adds genuine value: spatial storytelling, product inspection, an interactive object, camera movement, depth, simulation, or an experience that cannot be expressed as clearly with normal web elements.

**Three.js** is a foundational choice for custom browser-based 3D scenes:

- Official docs: <https://threejs.org/docs/>
- WebGL renderer: <https://threejs.org/docs/pages/WebGLRenderer.html>
- WebGPU renderer notes: <https://threejs.org/manual/#en/webgpurenderer>

**React Three Fiber (R3F)** is appropriate when the project uses React and a declarative Three.js scene is beneficial:

- Docs: <https://r3f.docs.pmnd.rs/>
- Performance guidance: <https://r3f.docs.pmnd.rs/advanced/scaling-performance>
- Performance pitfalls: <https://r3f.docs.pmnd.rs/advanced/pitfalls>

**Drei** provides useful helpers for common R3F tasks. Verify the current package versions and compatibility before installing.

**Spline** can be a practical choice when a designed 3D scene can be authored visually and embedded or exported:

- Docs: <https://docs.spline.design/>
- Evaluate its runtime cost, loading behavior, responsiveness, accessibility, and integration limits before choosing an embed.

**Shaders:** GLSL or Three.js Shading Language (TSL) can create custom materials, distortion, particles, atmosphere, procedural surfaces, and post-processing effects. Research current renderer compatibility and examples before writing shader code.

**Important WebGPU caution:** do not assume WebGPU is the safe default. Check the current Three.js documentation, browser/device support, feature gaps, and the project's needs. The Three.js documentation has described `WebGPURenderer` as evolving and notes that some WebGL-specific materials and post-processing paths require migration. Use a tested fallback strategy where appropriate; use WebGL 2 or a simpler approach when it is the more reliable production choice.

### 4.5 Other useful techniques

Choose only when the concept benefits from them:

- **SVG:** crisp illustrations, masks, paths, and lightweight vector animation.
- **Canvas 2D:** particles, generative graphics, drawing, and custom visual layers.
- **Rive:** interactive vector animation and state-driven illustrations. <https://rive.app/>
- **Lottie:** playback of prepared motion graphics when the file size and runtime are appropriate. <https://airbnb.io/lottie/>
- **Web Audio API:** sound-reactive or user-controlled audio experiences. Audio must never autoplay unexpectedly; provide obvious controls.
- **Web Animations API:** native animation control for suitable cases.
- **View Transitions API:** consider for route or state transitions after checking current support and framework integration.
- **GLTF/GLB:** common delivery format for 3D models. Optimize geometry, materials, textures, and file size before shipping.

### 4.6 Make a deliberate stack decision

Before installing anything, answer:

- What exact effect or capability is needed?
- Can CSS, SVG, or browser APIs achieve it well?
- Does the project already include a suitable library?
- Is the library maintained and compatible with the current project?
- What is the runtime, bundle, memory, and maintenance cost?
- What happens on mobile, low-end hardware, and unsupported browsers?
- What is the fallback if the effect fails?

Prefer the smallest stack that achieves the intended quality.

---

## Phase 5 — Design the motion and interaction system

Do not add effects randomly during implementation. Define an interaction language first.

### 5.1 Plan interactions by purpose

Common techniques include:

- Entrance choreography that establishes the page's visual hierarchy.
- Typography reveals for section introductions.
- Image masks, crops, or transitions that connect one scene to another.
- Parallax used sparingly to create depth.
- Sticky or pinned sections for a meaningful sequence.
- Horizontal storytelling when the content genuinely benefits from it.
- Pointer-responsive lighting or object movement on devices that support a pointer.
- Hover states for desktop, with equivalent tap/focus behavior on touch and keyboard.
- Cursor treatments only when they do not obscure content or replace normal affordances.
- Page transitions that preserve orientation and do not delay navigation.
- 3D camera movement tied to scroll or intentional user input.

For each interaction specify: trigger, visual response, duration, end state, mobile equivalent, keyboard equivalent, reduced-motion behavior, and failure fallback.

### 5.2 Loading and transitions

A loader should communicate genuine progress or establish a meaningful visual transition. Do not force users through an unnecessarily long intro, fake percentage counter, or full-screen loading animation when the page is ready.

Load critical text and the main visual quickly. Defer below-the-fold media and expensive scenes. Reveal content progressively without leaving the page blank or hiding essential information behind animation completion.

For route transitions, maintain focus behavior, browser history, and a usable state if navigation is interrupted.

### 5.3 Interaction quality

- All clickable items must behave like controls and have clear affordances.
- Buttons, links, menus, forms, and media controls must work—not merely look interactive.
- Never make hover the only way to access essential information.
- Pointer tracking must not break text selection, scrolling, or normal controls.
- Provide visible focus states.
- Keep touch targets appropriately sized and separated.
- Ensure scroll-linked interactions do not block normal scrolling or keyboard access.

---

## Phase 6 — Responsive design from the beginning

Do not finish desktop first and “make it responsive” at the end.

### 6.1 Design for real viewport changes

Test the layout at narrow phones, larger phones, tablets, laptops, and wide desktop screens. Include intermediate widths where layouts commonly break.

Use fluid sizing where appropriate (`clamp()`, relative units, flexible grids), but establish sensible minimum and maximum bounds. Avoid fixed widths and heights that cause clipping. Account for mobile browser viewport behavior and safe areas where relevant.

### 6.2 Adapt the experience, not only the dimensions

On mobile, it may be necessary to:

- Change the composition or section order.
- Replace pointer-driven motion with touch-friendly controls or static presentation.
- Disable expensive or purely decorative 3D effects.
- Reduce particle counts, shader complexity, post-processing, and render resolution.
- Replace a long horizontal scroll sequence with natural vertical content.
- Simplify navigation and keep controls reachable.
- Use mobile-specific imagery or crops.
- Preserve the same core story and information.

Do not hide essential content or interactions just to make the page fit. Do not make text too small to preserve a desktop composition.

### 6.3 Verify overflow

Check for:

- Horizontal page scrolling caused by oversized elements.
- Text, buttons, or navigation clipped outside their containers.
- Fixed elements covering content.
- Canvas layers intercepting input.
- Long headings breaking the composition.
- Media with missing dimensions or unexpected aspect ratios.
- Sections that depend on a desktop-only hover or pointer.

---

## Phase 7 — Accessibility and reduced motion

Immersive effects must not make the website unusable.

Follow semantic HTML and use WCAG 2.2 as the accessibility reference: <https://www.w3.org/TR/WCAG22/>.

Minimum expectations:

- Use semantic landmarks, headings, buttons, links, and form labels.
- Provide useful alternative text for meaningful images; use empty alt text for purely decorative images.
- Keep text readable and maintain adequate contrast.
- Support keyboard navigation and visible focus indicators.
- Ensure focus is not hidden by sticky headers, overlays, or transitions.
- Do not convey state through color or motion alone.
- Avoid flashing effects and rapid high-contrast transitions.
- Provide captions or equivalent information for meaningful video/audio content.
- Do not autoplay sound. Include accessible media controls.
- Keep important content in the DOM rather than rendering all text into a canvas.

### Reduced motion is mandatory

Use `prefers-reduced-motion` to reduce or remove non-essential motion and replace spatial movement with simple opacity or immediate state changes where appropriate.

Reference: <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion>

Reduced-motion mode must be a complete usable experience, not a broken layout with animations merely hidden. Check the preference in CSS and in any JavaScript animation or smooth-scroll system. Re-check the preference during development and testing.

---

## Phase 8 — Performance engineering

High-end visual quality must be achieved with deliberate resource budgets.

### 8.1 Core Web Vitals targets

Use Google's current Core Web Vitals guidance. The current “good” thresholds are:

- **LCP:** 2.5 seconds or less.
- **INP:** less than 200 milliseconds.
- **CLS:** less than 0.1.

Reference: <https://developers.google.com/search/docs/appearance/core-web-vitals>

Treat these as real user-experience goals, not guarantees based on a single local test. Measure on representative devices and network conditions.

### 8.2 Images, video, and fonts

- Use appropriately sized responsive images and modern formats such as AVIF or WebP where supported by the delivery pipeline.
- Reserve layout space with intrinsic dimensions or aspect ratios.
- Lazy-load offscreen images and media; do not lazy-load the primary above-the-fold image if it harms LCP.
- Use video posters and appropriate preload settings. Defer large background videos until needed.
- Prefer compressed video to animated GIF for complex motion.
- Subset and self-host fonts where appropriate; limit the number of font files and weights.
- Preload only assets that are genuinely critical.
- Use the framework's image/font optimization tools when available.

Useful references:

- Next.js image optimization: <https://nextjs.org/docs/app/getting-started/images>
- Next.js font optimization: <https://nextjs.org/docs/app/getting-started/fonts>
- web.dev media loading: <https://web.dev/learn/performance/>

### 8.3 3D and WebGL budgets

- Keep geometry, material count, draw calls, and texture memory under control.
- Reuse geometry, materials, textures, and loaded models where possible.
- Instance repeated objects rather than creating large numbers of independent meshes.
- Use compressed textures and optimized GLB/GLTF assets where appropriate.
- Use mipmaps where suitable for 3D textures.
- Avoid expensive real-time shadows, reflections, transparency, and post-processing unless they clearly improve the result.
- Limit device pixel ratio and render resolution on mobile or weaker devices.
- Use level of detail (LOD) or simpler models at distance where useful.
- Pause or reduce rendering when scenes are offscreen or inactive.
- Prefer on-demand rendering for mostly static scenes instead of rendering continuously without a reason.
- Add adaptive quality levels when the scene's complexity warrants them.
- Handle WebGL context loss and renderer initialization failure gracefully.
- Dispose of resources and event listeners correctly when scenes are removed.

References:

- MDN WebGL best practices: <https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices>
- R3F scaling performance: <https://r3f.docs.pmnd.rs/advanced/scaling-performance>
- R3F performance pitfalls: <https://r3f.docs.pmnd.rs/advanced/pitfalls>

### 8.4 JavaScript and animation performance

- Keep the main thread available for input and navigation.
- Avoid unnecessary client-side JavaScript and large dependency bundles.
- Split code and defer non-critical features when practical.
- Use `requestAnimationFrame` for custom visual loops and clean it up.
- Avoid React state updates on every animation frame; use refs or the animation library's imperative update path for high-frequency values.
- Use frame delta rather than fixed per-frame increments so motion is not tied to refresh rate.
- Avoid layout reads/writes that cause repeated forced reflows.
- Use Intersection Observer for viewport-based activation where appropriate.
- Avoid running multiple competing animation loops.

---

## Phase 9 — Implementation discipline

### 9.1 Build in layers

A reliable order is:

1. Establish the semantic page structure and content hierarchy.
2. Implement the responsive layout and visual system.
3. Add typography, imagery, and media treatment.
4. Implement core interactions and navigation.
5. Add motion choreography.
6. Add optional 3D, shaders, or advanced visual layers.
7. Add loading states, fallbacks, and reduced-motion behavior.
8. Optimize and test the complete experience.

This order makes it easier to preserve a working website while introducing complex visual layers.

### 9.2 Keep the code maintainable

- Use components for meaningful reusable sections and interaction units.
- Keep 3D scenes separate from ordinary content components where appropriate.
- Keep animation setup scoped and clean it up when components unmount.
- Keep design tokens centralized.
- Avoid giant components, duplicated styles, deeply nested conditional logic, and unnecessary abstractions.
- Do not install a package for a tiny effect that can be implemented reliably with native CSS or browser APIs.
- Keep console output free of avoidable errors and warnings.
- Do not leave dead code, unused dependencies, debug markers, or temporary test assets in the final implementation.

### 9.3 Preserve functionality

When redesigning an existing project, retain all existing routes, key content, form behavior, authentication flows, data handling, and integrations unless the task explicitly changes them. Do not replace working functionality with decorative mockups.

---

## Phase 10 — Test the actual experience

Do not declare completion after the page merely compiles.

### 10.1 Visual and responsive testing

Run the app and inspect it at multiple viewport sizes. Check the full page, not just the hero. Verify:

- No horizontal overflow or clipped elements.
- No overlapping text, images, buttons, or navigation.
- Correct image crops and stable layout while assets load.
- Readable typography and intentional spacing at every breakpoint.
- No blank WebGL canvas or missing media on unsupported devices.
- Navigation, overlays, and fixed UI remain usable.
- The first screen loads without an unnecessarily long intro.

### 10.2 Functional testing

Test every link, button, menu, form, drag control, and navigation transition. Test browser back/forward behavior and direct route loading. Confirm there are no interactions that require hover only.

### 10.3 Accessibility testing

Test with keyboard only. Check focus visibility and order. Enable reduced motion. Inspect contrast and text size. Verify meaningful images have useful alternatives and that essential information remains available without canvas/WebGL.

### 10.4 Performance testing

Use browser developer tools, Lighthouse or PageSpeed Insights, and field metrics when available. Inspect the network waterfall, image/video sizes, JavaScript bundles, layout shifts, console errors, and frame rate on representative hardware. Test at least one lower-powered or mobile device profile.

Useful references:

- web.dev performance: <https://web.dev/performance/>
- Next.js production checklist, when applicable: <https://nextjs.org/docs/app/guides/production-checklist>

### 10.5 Fix issues rather than documenting them away

If tests reveal overflow, broken transitions, inaccessible controls, frame drops, or missing assets, fix them before considering the task complete. Re-test after fixes. Do not claim a test was performed unless it actually was.

---

## Quality bar — what “finished” means

A result is ready only when all relevant statements are true:

- [ ] The creative direction is specific to the project, not a generic template.
- [ ] The site has a coherent visual identity and strong hierarchy.
- [ ] The first screen creates a clear impression and communicates what the site is about.
- [ ] The full page has a deliberate narrative and section rhythm.
- [ ] Interactions feel intentional, polished, and useful.
- [ ] Motion is consistent and does not interfere with reading or navigation.
- [ ] The site works at phone, tablet, laptop, and wide desktop sizes.
- [ ] Touch and keyboard users can access the same essential functionality.
- [ ] Reduced-motion users receive a complete and usable experience.
- [ ] Media and 3D assets load efficiently and have appropriate fallbacks.
- [ ] There are no obvious layout shifts, overflow issues, or broken states.
- [ ] Existing project functionality remains intact.
- [ ] The browser console is free of avoidable errors.
- [ ] Performance has been considered and measured where tools allow.
- [ ] The implementation is maintainable and does not contain unnecessary dependencies.

## Expected working behavior from the AI

When this skill applies, follow this sequence without waiting for the user to request each stage:

1. Inspect the current project and understand its constraints.
2. Browse the live web for fresh visual references; inspect at least five examples across at least three independent sources when browsing is available.
3. Compare multiple, meaningfully different visual directions. Treat any supplied URL as one reference among many, never as the default template.
4. Research current technical approaches and review official documentation for the techniques and packages being considered.
5. Form a distinct creative direction and a concise implementation plan.
6. Build the complete experience using the smallest suitable technology stack.
7. Test the actual running website across viewport sizes and interaction modes.
8. Fix visible and functional issues before reporting completion.
9. Report what was built, the significant technologies used, the reference directions explored, and any remaining limitations honestly.

Do not ask the user to choose a library or animation technique when the brief and research provide enough information to make a sensible engineering decision. Ask only when a missing business requirement or asset genuinely prevents implementation.

---

## Discovery library — starting points, never limits

These resources are discovery entry points, not a fixed source list and not a set of sites to imitate. Search for new studios, new projects, independent creators, interactive experiments, and unfamiliar sources on every project. A reference library is useful only when it expands the range of ideas; repeatedly choosing the same examples defeats its purpose.

### Visual inspiration and creative experiments

- Awwwards: <https://www.awwwards.com/>
- Godly: <https://godly.website/>
- The FWA: <https://thefwa.com/>
- CSS Design Awards: <https://www.cssdesignawards.com/>
- SiteInspire: <https://www.siteinspire.com/>
- Codrops Creative Hub: <https://tympanus.net/codrops/hub/>
- Hoverstates: <https://hoverstat.es/>
- Httpster: <https://httpster.net/>
- Recent: <https://recent.design/>
- Minimal Gallery: <https://minimal.gallery/>
- One Page Love: <https://onepagelove.com/>
- Land-book: <https://land-book.com/>


### Engineering and motion

- Three.js documentation: <https://threejs.org/docs/>
- Three.js WebGPU renderer notes: <https://threejs.org/manual/#en/webgpurenderer>
- React Three Fiber: <https://r3f.docs.pmnd.rs/>
- R3F performance guidance: <https://r3f.docs.pmnd.rs/advanced/scaling-performance>
- R3F performance pitfalls: <https://r3f.docs.pmnd.rs/advanced/pitfalls>
- GSAP documentation: <https://gsap.com/docs/v3/>
- GSAP ScrollTrigger: <https://gsap.com/docs/v3/Plugins/ScrollTrigger/>
- Lenis: <https://github.com/darkroomengineering/lenis>
- Spline documentation: <https://docs.spline.design/>
- MDN WebGL best practices: <https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices>

### Accessibility and performance

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- MDN reduced motion: <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion>
- Google Core Web Vitals: <https://developers.google.com/search/docs/appearance/core-web-vitals>
- web.dev performance: <https://web.dev/performance/>
- Next.js production checklist: <https://nextjs.org/docs/app/guides/production-checklist>
