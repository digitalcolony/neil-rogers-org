# The Neil Rogers Show Website

A modern tribute website dedicated to The Neil Rogers Show, built with Astro and React. This project preserves the legacy of Neil Rogers through an interactive soundboard, audio archives, timeline, and stories collection.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Netlify Status](https://api.netlify.com/api/v1/badges/363ce69b-fcfb-4ecc-b8cd-62686f6a17df/deploy-status)](https://app.netlify.com/sites/neil-rogers-astro/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎙️ About

The Neil Rogers Show was a legendary radio talk show that entertained listeners for decades. This website serves as a digital archive and tribute, featuring:

- **Interactive Soundboard**: Browse and play classic Neil Rogers sound clips and drops
- **Audio Archives**: Listen to show segments and memorable moments
- **Timeline**: Explore the history and milestones of the show
- **Stories Collection**: Read fan stories and memories
- **Documentation**: Learn about the show's history and impact

## 🚀 Features

- **Modern Web Technologies**: Built with Astro for optimal performance
- **React Components**: Interactive soundboard and audio player components
- **Responsive Design**: Optimized for desktop and mobile devices
- **SEO Optimized**: Automatic sitemap generation and meta tags
- **Fast Loading**: Static site generation with Astro
- **Netlify Deployment**: Continuous deployment and hosting

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.12.3
- **UI Library**: [React](https://reactjs.org/) 18.2.0
- **Styling**: CSS with Astro's built-in styling
- **Font Loading**: [astro-font](https://github.com/rishi-raj-jain/astro-font) 0.1.81
- **Deployment**: [Netlify](https://netlify.com) (via @astrojs/netlify 6.5.3)
- **Build Tool**: Vite (included with Astro)

## 📁 Project Structure

```
├── public/                 # Static assets
│   ├── sounds/            # Audio files for soundboard
│   ├── *.png, *.svg       # Icons and images
│   └── robots.txt         # SEO files
├── src/
│   ├── components/        # React & Astro components
│   │   ├── FullSoundboard.jsx
│   │   ├── FilteredSoundList.jsx
│   │   ├── Navigation.astro
│   │   └── ...
│   ├── content/           # Content collections
│   │   └── stories/       # Story markdown files
│   ├── data/             # Static data files
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   │   ├── index.astro   # Homepage
│   │   ├── soundboard.astro
│   │   ├── timeline.astro
│   │   └── ...
│   ├── scripts/          # Utility scripts
│   └── styles/           # Global styles
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/digitalcolony/neil-rogers-org.git
   cd neil-rogers-org
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start development server with refresh
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🌐 Deployment

This project is configured for Netlify deployment with:

- Automatic builds from the main branch
- Netlify adapter for server-side rendering capabilities
- On-demand page caching for improved performance

The site is live at [neilrogers.org](https://neilrogers.org)

## 🎵 Soundboard

The interactive soundboard features:

- Over 350+ classic Neil Rogers sound drops
- Real-time search and filtering
- Responsive grid layout
- Audio playback controls
- Download functionality for individual sounds

## 📝 Content Management

- **Stories**: Markdown-based content collection for fan stories
- **Static Assets**: Audio files, images, and icons in the `public` directory
- **SEO**: Automatic sitemap generation and meta tag optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The Neil Rogers Show and its fans
- All contributors who have helped preserve this radio legacy
- The Astro and React communities
