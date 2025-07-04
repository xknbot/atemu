# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Standard workflow
1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the [todo.md](http://todo.md/) file with a summary of the changes you made and any other relevant information.

## Development Commands

```bash
# Development server with Turbopack
npm run dev
# or
yarn dev

# Production build
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start

# Lint code
npm run lint
# or
yarn lint
```

## Project Overview

Atemu is a trading card game website built with Next.js 15 and modern React patterns. The project features a gaming-themed UI with custom fonts, animations, and component architecture designed for a card game experience.

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS v4 with custom CSS modules
- **UI Components**: Custom component library with variants system
- **Animations**: Framer Motion, GSAP, and TSParticles for effects
- **Database**: MongoDB integration
- **Analytics**: Vercel Analytics

### Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── fonts/        # Custom font files (Ancient God, Space Games, etc.)
│   ├── (auth)/       # Authentication routes
│   ├── dashboard/    # Dashboard pages
│   └── api/          # API routes
├── components/       # Reusable components
│   ├── ui/           # Base UI components (Button, Card, etc.)
│   ├── layout/       # Layout components (Header, Footer, homepage sections)
│   └── forms/        # Form components and validation
├── libs/             # Utility libraries (auth, db, mongodb)
├── hooks/            # Custom React hooks
├── styles/           # Global styles and CSS modules
├── themes/           # Theme configuration (currently empty)
├── types/            # TypeScript type definitions
└── data/             # Static data and configuration
```

### Component Architecture

**UI Components**: Located in `src/components/ui/`
- **Button**: Supports multiple variants (primary, third), sizes (small, medium, large), and special effects (flame effect)
- **Card**: Modular card system with variants (ProductCard, UserCard)
- **Navigation**: Header/footer layout components

**Layout Components**: Located in `src/components/layout/`
- **Homepage sections**: HeroSection, IntroAtemu, CardShow, Gameplay, Partnership, StayUpdated
- **Header/Footer**: Global navigation and footer components

### Styling System

**Custom Fonts**: Five custom fonts loaded via Next.js font optimization
- Ancient God (`--font-ancientGod`)
- DevinneSwash (`--font-deSwash`)
- Space Games (`--font-spaceGames`)
- FeFCrm2 (`--font-fe`)
- Inconsolata ExtraBold (`--font-incon`)

**CSS Architecture**:
- Tailwind CSS v4 with custom configuration
- CSS Modules for component-specific styles
- CSS custom properties for theme variables
- Global styles in `src/styles/globals.css`

**Animation System**:
- Framer Motion for page transitions and interactions
- GSAP for complex animations
- TSParticles for background effects
- Custom CSS animations (glow-pulse, spin-slow)

### Key Features

**Loading System**: Custom loading overlay with progress tracking using Performance Observer API

**Dynamic Imports**: Strategic use of dynamic imports for heavy components (IntroAtemu) to improve initial load time

**Responsive Design**: Mobile-first approach with Tailwind breakpoints

**Gaming Theme**: Dark theme with golden accents and custom gaming fonts

## Development Patterns

### Component Standards
- Use TypeScript interfaces for all component props
- Implement CSS Modules for component-specific styling
- Follow the variant pattern for component variations
- Use `'use client'` directive for client-side components

### File Naming Conventions
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
- Styles: kebab-case for CSS modules (e.g., `button.module.css`)
- Types: PascalCase interfaces (e.g., `ButtonProps`)

### Import Patterns
- Use `@/` alias for src directory imports
- Group imports: React/Next.js, then third-party, then local
- Use dynamic imports for heavy components

## Configuration Files

### TypeScript Configuration
- Strict mode enabled
- Path mapping with `@/*` for src directory
- Target ES2017 with modern module resolution

### Tailwind Configuration
- Custom animation: `spin-slow` (5s linear infinite)
- Responsive breakpoints defined
- Content scanning configured for src directory

### Next.js Configuration
- Basic configuration with default settings
- App Router enabled

## Database Integration

MongoDB integration available through:
- `src/libs/mongodb.ts` - Database connection utilities
- `src/libs/db.ts` - Database operations
- Authentication system in `src/libs/auth.ts`

## Asset Management

**Images**: Stored in `public/` directory with organized structure:
- Card artwork in `public/nftcards/`
- Character images in `public/champ png/`
- Partnership logos in `public/partnership/`

**Fonts**: Custom gaming fonts in `src/app/fonts/`

## Performance Considerations

- Dynamic imports for heavy components
- Font optimization with Next.js font loading
- Performance Observer API for loading progress
- Lazy loading for images and components
- Turbopack for faster development builds
