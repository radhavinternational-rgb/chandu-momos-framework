# Master Build Prompt for AI Coding Tools

> **Instructions**: Open your AI coding tool (Antigravity, Claude Code, Cursor, Codex, Windsurf), point it at your project folder, confirm it can see `/assets`, and paste this prompt in one message. Fill in the bracketed parts if adapting for another brand.

---

```text
Build a single-page, scroll-driven luxury website for Chandu Momos, a small-batch Himalayan-style momos brand.

TECH CONSTRAINTS:
- One self-contained index.html file — inline <style> and <script>, no build step, no framework, no npm packages beyond CDN <script> tags.
- GSAP 3.12.5 + ScrollTrigger plugin from cdnjs.
- Lenis 1.3.23 from unpkg, synced with GSAP ScrollTrigger (see reference code).
- Fonts via Google Fonts <link> tag: Cormorant Garamond (editorial/serif), Bebas Neue / Antonio (appetite/display), Plus Jakarta Sans (body).
- All media assets already exist in /assets — reference them by relative path, never invent placeholder images.
- html { overflow-x: clip } and body { overflow-x: clip } — NEVER overflow-x: hidden anywhere, it turns the element into a scroll container and silently breaks every ScrollTrigger measurement on the page.
- Scope smooth scrolling to html:not(.lenis) only — Lenis already smooths scrolling itself, and scroll-behavior:smooth left un-scoped fights ScrollTrigger's internal measurement jumps.
- Never put overflow:hidden on a section that contains a pinned/sticky child — put any needed clipping on an inner wrapper instead.
- Must work down to 375px phone width with no horizontal scroll.
- Respect prefers-reduced-motion: static content instead of animation.

DESIGN SYSTEM:
- Every colour as a CSS custom property on :root:
  --night: #17241d (Primary dark background)
  --deep: #0d1813 (Darkest anchor)
  --pine: #263d31 (Secondary green)
  --story-green: #10271c (Story tableau)
  --paper: #f4f2ec (Light sections)
  --chalk: #fcf9f0 (Warm off-white)
  --butter: #fdf3dc (Cream on red)
  --ink: #19231d (Body on light)
  --muted: #58645a (Secondary text)
  --sun: #d9b77e (Gold — buttons, kickers)
  --ember: #cf4a2f ("The heat")
  --chilli: #b5231a (Craft / poster)
  --chilli-deep: #7c140d (Deep red anchor)
- Three font-role variables: Cormorant Garamond for narrative sections, Bebas Neue / Antonio for high-energy moments, Plus Jakarta Sans for body copy. Use them by role, never at random.
- Overall mood: Warm, editorial, steam and candlelight — not a loud sales page.

HERO SECTION (the core mechanic):
- A pinned, tall (e.g. 500–800vh) scroll track containing a <video> element.
- The video NEVER autoplays. Its currentTime is driven directly by scroll progress, measured with getBoundingClientRect() against the track — never window.scrollY alone. Use requestAnimationFrame + a `ticking` flag to avoid redundant updates per scroll event.
- Text overlays fade in/out at specific scroll-progress ranges (e.g. 0.05–0.15, 0.4–0.5) — timed to specific visual beats in the video, never overlapping the brightest part of frame.
- A thin fixed progress bar on one screen edge that fills 0 → 100% with scroll.

SECTIONS (in this order):
1. Hero: scroll-scrubbed video as above.
2. Manifesto/story: one atmospheric photo with generous negative space for copy, a short emotional line, a CTA into the menu.
3. A pinned, full-viewport product showcase: scrolling rotates through 4 products (Classic Chicken, Malai Paneer, Farm Fresh Veg, Fiery Chilli Garlic), each with name/description/price. Dot indicator + counter ("01/04"). User cannot scroll past until every product has been shown. Include a floating product image the user can tilt in 3D by moving their mouse over it (perspective transform following cursor, eased not instant).
4. A full-bleed "impact" poster: one striking video/photo background, one bold headline, minimal copy.
5. A quiet photographic beat: one calm image, a short human quote, a small spec/stats strip.
6. A process/craft section: 3-4 process photos (Fold → Steam → Sear) cross-fading in sync with scroll, using a smoothstep easing curve (b*b*(3-2*b)) rather than linear.
7. An order/menu section with real pricing and direct order links: https://wa.me/91XXXXXXXXXX?text=I+would+like+to+order+Chandu+Momos
8. Wholesale / catering CTA section for bulk buyers.
9. Kitchen: Ambient film behind a short statement.
10. Footer: brand, atmosphere photo, contact links, copyright.

INTERACTIONS:
- The 3D-tilt product image from section 3.
- A click-to-expand modal with more product detail.
- Ambient floating-particle canvas effect in at least one section (subtle).
- Give the 2-3 biggest section transitions their own short, distinct signature animation instead of a plain scroll or fade.

PERFORMANCE:
- Background videos play only while visible (IntersectionObserver), and pause on visibilitychange (tab hidden).
- Every video needs a poster image so there's never an empty box while it loads.
- Keep total page weight reasonable — this is a marketing page, not an app.

Give me the whole site as one index.html, and tell me which files it expects inside /assets.
```
