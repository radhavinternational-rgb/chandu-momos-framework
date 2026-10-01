# Chandu Momos — Cheat Sheet & Hard-Won Bugs

---

## 1. FFmpeg Commands

### A. Re-encode Hero Video for Smooth 60fps Scrubbing
`-g 1` forces every frame to be a keyframe (I-frame), allowing instant browser seeking without stutter.
```bash
ffmpeg -i hero-story-raw.mp4 \
  -vf scale=1280:-2 -movflags faststart \
  -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p \
  -acodec aac -b:a 128k \
  assets/dumpling-story-scrub.mp4
```

### B. Compress Ambient Video Loops
Reduces video size from ~3MB down to 200–400KB. `-an` strips unnecessary audio; `+faststart` enables immediate playback.
```bash
ffmpeg -i raw-film.mp4 -vf scale=1280:-2 \
  -crf 30 -an -movflags +faststart output.mp4
```

### C. Extract Video Poster Frame (First Frame)
Eliminates the empty grey box while video loads:
```bash
ffmpeg -i film-steam.mp4 -vframes 1 assets/film-steam-poster.webp
```

---

## 2. The 7 Hard-Won Bugs & Gotchas

1. **`overflow-x: hidden` on `<body>` breaks ScrollTrigger**
   - *Why*: It turns `<body>` into its own scroll container, breaking GSAP's scroll position measurements.
   - *Fix*: Use `html { overflow-x: clip; } body { overflow-x: clip; }` instead.

2. **`scroll-behavior: smooth` fights ScrollTrigger**
   - *Why*: ScrollTrigger briefly jumps to calculate layout and restores position; smooth scrolling turns that into an animated transition, ruining calculations.
   - *Fix*: Scope it: `html:not(.lenis) { scroll-behavior: smooth; }`.

3. **`overflow: hidden` on a section kills pinning**
   - *Why*: Sticky / pinned children stop functioning inside an overflow-hidden ancestor.
   - *Fix*: Apply clipping to an inner wrapper, never to the section containing the pinned element.

4. **"Transparent" AI images usually aren't**
   - *Why*: Midjourney/Runway often render a grey-and-white checkerboard directly into the RGB channels.
   - *Fix*: Always test cutouts over a high-contrast solid background (`#ff00ff` or solid red/green) to detect rogue checkerboard pixels.

5. **Background videos keep decoding off-screen**
   - *Why*: Burning CPU and GPU on videos that aren't in view.
   - *Fix*: Wrap playback with an `IntersectionObserver` to call `.play()` only when visible, and `.pause()` on `document.visibilitychange`.

6. **Browser cannot seek videos when served via basic static server**
   - *Why*: Video scrubbing requires HTTP 206 Partial Content (Byte-Range requests).
   - *Fix*: Use `node dev-server.mjs` which implements full byte-range streaming.

7. **Linear cross-fading creates murky 50/50 double-exposures**
   - *Why*: Linear opacity transitions feel sluggish in the middle.
   - *Fix*: Use smoothstep interpolation curve: `b * b * (3 - 2 * b)` for crisp, photographic cross-fades.

---

## 3. Pre-Launch Checklist

- [ ] Every video has an extracted `.webp` poster frame.
- [ ] Hero video was re-encoded with `-g 1`.
- [ ] No `overflow-x: hidden` anywhere (only `overflow-x: clip`).
- [ ] Checked on mobile viewport (375px) — zero horizontal overflow.
- [ ] WhatsApp links tested on phone with encoded message.
- [ ] Audio toggle respects mute state across tab changes.
- [ ] Deployed to Netlify / Vercel with clean cache headers.
