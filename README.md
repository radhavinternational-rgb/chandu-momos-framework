# 🥟 Chandu Momos — Cinematic Scroll-Driven Food Website Framework

> Based on the **AutomationX Student Guide (2026)** by Dhiraj Sarkar.  
> Complete blueprint, asset creation prompts, motion engine, and deployment guide for building luxury scroll-driven web experiences.

---

## 📂 Repository Contents

| File | Description |
| :--- | :--- |
| [**Chandu_Momos_Guide.pdf**](./Chandu_Momos_Guide.pdf) | Original 27-page high-resolution illustrated student guide (~20 MB). |
| [**FULL_GUIDE_TEXT.txt**](./FULL_GUIDE_TEXT.txt) | Complete verbatim text extracted from all 27 pages of the guide. |
| [**PROMPTS.md**](./PROMPTS.md) | Copy-paste ready AI prompts for Midjourney, Runway (Gen-3 / seedance-2), nano-banana-pro, etc. |
| [**MASTER_BUILD_PROMPT.md**](./MASTER_BUILD_PROMPT.md) | The master prompt to feed into AI coding assistants (Claude Code, Antigravity, Cursor, Codex). |
| [**CHEAT_SHEET.md**](./CHEAT_SHEET.md) | Essential FFmpeg video commands, 7 hard-won bugs & fixes, and pre-launch checklist. |
| [**dev-server.mjs**](./dev-server.mjs) | Lightweight Node.js local preview server with HTTP 206 byte-range seeking for video scrubbing. |

---

## ⚡ The Core Pipeline (4–6 Hours Total)

1. **Concept Formula**: Define `Product + Emotion + Ritual + Environment + Transformation`.
2. **Asset Generation (20 Assets)**:
   - 6 continuous narrative keyframes
   - 4 transparent flavour plates
   - 3 craft process cutouts (`fold` $\rightarrow$ `steam` $\rightarrow$ `sear`)
   - 3 atmosphere photos & 2 garnish cutouts
   - 3 ambient video loops (chilli pour, levitation, rising steam)
3. **Hero Video Encoding**:
   - Stitch 5 clips with hard cuts.
   - Re-encode with `ffmpeg -g 1` so every frame is an intra-frame for zero-latency 60fps scrubbing.
4. **Site Assembly**:
   - Single-file `index.html` structure.
   - GSAP 3.12.5 + ScrollTrigger + Lenis smooth scroll engine.
   - Direct video `.currentTime` scrubbing tied to `requestAnimationFrame` + `getBoundingClientRect()`.
5. **Launch**:
   - Free static deployment to Netlify or Vercel.

---

## 🚀 Quick Start (Local Preview)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/chandu-momos-framework.git
cd chandu-momos-framework

# Start the byte-range streaming dev server
node dev-server.mjs

# Open in your browser
http://localhost:4174
```

---

## 💡 The Universal Formula

While demonstrated with **Chandu Momos**, this exact system works for any luxury brand:
- Coffee & Tea Roasteries
- Skincare & Cosmetics
- Artisanal Perfumes & Chocolates
- Fine Jewelry & Watches

Only the product photos, color palette, and copy change — the scroll-scrub motion architecture remains identical.
