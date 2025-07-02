# Soundboard PWA Requirements & Implementation Guide

## Project Overview

**Goal:** Convert existing Astro information website with React soundboard to a Progressive Web App (PWA) with offline functionality.

**Current State:**

- pages of text + images (photos, mix of decorative/essential)
- React soundboard page with 350+ MP3 audio drops
- Built with Astro framework

## New Features Required

### 1. PWA Implementation

**Priority:** High

- Enable app installation on devices
- Add PWA manifest file
- Implement service worker for offline functionality
- Cache full site (30 pages) for offline access

### 2. Offline Audio Caching

**Priority:** High

- Cache first 20 audio drops (top of soundboard) for offline playback
- Implement smart loading: online loads all 350+, offline shows cached 20
- Add offline indicator to show which drops are available

### 3. Image Optimization & Caching

**Priority:** Medium

- Optimize images for PWA performance
- Cache essential images for offline viewing
- Implement responsive image loading

## Technical Implementation Plan

### PWA Setup (Astro)

**Recommended Tool:** @vite-pwa/astro - Zero-config PWA Integration

```bash
npm install @vite-pwa/astro
```

**Configuration Strategy:**

- Use "cache-first" strategy for static content (pages, images)
- Use "network-first" strategy for dynamic content
- Implement background sync for offline interactions

### Audio Caching Strategy

**Storage Approach:**

- Use Cache API for the first 20 MP3 files
- Implement progressive loading: cache on first play
- Add cache management to prevent storage bloat

**Code Pattern:**

```javascript
// Cache first 20 audio files on service worker install
const AUDIO_CACHE = 'soundboard-audio-v1';
const PRIORITY_AUDIO = ['/audio/drop1.mp3', '/audio/drop2.mp3', ...];
```

### Image Best Practices

**Format & Optimization:**

- Convert photos to WebP format (90% smaller than JPEG)
- Implement lazy loading for below-the-fold images
- Use responsive images with `srcset`
- Compress with tools like Squoosh or TinyPNG

**Offline Strategy:**

- Cache only essential images (hero images, UI elements)
- Skip decorative images for offline to save storage
- Provide fallback placeholders for uncached images

**Recommended Sizes:**

- Mobile: 320w, 640w
- Desktop: 1024w, 1920w
- Thumbnail: 150w, 300w

### Storage Management

**Quotas to Consider:**

- Mobile browsers: ~50-100MB typical limit
- Desktop browsers: ~1GB+ typical limit
- Your estimated usage:
  - 20 MP3s: ~2-5MB
  - Essential images: ~5-10MB
  - 30 pages HTML/CSS: ~1-2MB
  - **Total: ~8-17MB** (well within limits)

## Implementation Checklist

### Phase 1: PWA Foundation

- [ ] Install and configure @vite-pwa/astro
- [ ] Create web app manifest
- [ ] Set up basic service worker
- [ ] Test app installation

### Phase 2: Offline Content

- [ ] Implement page caching strategy
- [ ] Add offline page fallback
- [ ] Cache essential images
- [ ] Test offline navigation

### Phase 3: Audio Caching

- [ ] Identify and prioritize first 20 audio drops
- [ ] Implement audio caching in service worker
- [ ] Add offline/online indicators to soundboard
- [ ] Test audio playback offline

### Phase 4: Optimization

- [ ] Convert images to WebP
- [ ] Implement lazy loading
- [ ] Add responsive image sizes
- [ ] Performance testing and optimization

## Best Practices Summary

### Audio Files

- Keep MP3s at 128kbps for voice content (smaller files)
- Cache only the most important/popular drops
- Implement cache eviction strategy if storage gets full

### Images

- WebP format for 90% size reduction
- Lazy load everything below the fold
- Cache only essential images offline
- Use `loading="lazy"` and `decoding="async"`

### PWA Performance

- Prioritize offline functionality from the outset
- Use cache-first strategy for static assets
- Implement background sync for better UX
- Add offline indicators so users know what's available

### User Experience

- Show clear offline/online status
- Provide feedback when content isn't available offline
- Enable smooth transitions between online/offline modes
- Consider preloading popular content

## Storage Estimate

- **Pages (30):** ~1-2MB
- **Priority Audio (20 MP3s):** ~2-5MB
- **Essential Images:** ~5-10MB
- **App Shell:** ~1MB
- **Total:** ~9-18MB (safe for all devices)

This approach will give you a robust PWA that works great offline while being mindful of storage constraints.
