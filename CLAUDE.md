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


## Project Overview

ATEMU is a trading card game website built with Next.js 15, featuring a modern gaming aesthetic with particle effects, animations, and responsive design. The project emphasizes visual appeal with custom fonts, GSAP animations, and interactive elements.

## Core Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS 4 with custom CSS modules
- **Animations**: Framer Motion, GSAP, and custom CSS animations
- **Particles**: TSParticles for visual effects
- **Database**: MongoDB integration
- **Package Manager**: Uses both npm and yarn (yarn.lock present)

## Development Commands

```bash
# Development server with turbopack
npm run dev
# or
yarn dev

# Production build
npm run build
# or
yarn build

# Start production server
npm run start
# or
yarn start

# Lint code
npm run lint
# or
yarn lint
```

## Project Architecture

### Component Organization

The project follows a hybrid feature-based and type-based organization:

- **`src/components/layout/`** - Layout components (Header, Footer)
  - **`homepage/`** - Homepage-specific components (HeroSection, CardShow, IntroAtemu, etc.)
- **`src/components/ui/`** - Reusable UI components (Button, Card, Navigation)
- **`src/components/forms/`** - Form components with shared utilities
- **`src/app/`** - Next.js App Router pages and API routes
- **`src/styles/`** - Global styles and CSS modules
- **`src/data/`** - Static data and configuration
- **`src/libs/`** - Utilities and external service integrations
- **`src/types/`** - TypeScript type definitions

### Styling Approach

- **Primary**: Tailwind CSS with custom configuration
- **Secondary**: CSS Modules for component-specific styles
- **Custom Properties**: CSS variables for theming
- **Fonts**: Custom local fonts (Ancient God, Space Games, etc.)

### Key Features

1. **Particle Effects**: Interactive background particles using TSParticles
2. **Animation System**: Multiple animation libraries (Framer Motion, GSAP)
3. **Dynamic Imports**: Code splitting for performance optimization
4. **Custom Loading**: Progressive loading overlay with progress tracking
5. **Responsive Design**: Mobile-first approach with breakpoint-specific styles

## Development Patterns

### Component Structure

- Use TypeScript interfaces for all prop types
- Implement compound components for complex UI elements
- Apply CSS Modules for component-specific styling
- Use Tailwind utilities for layout and spacing
- Implement proper loading states and error boundaries

### Animation Guidelines

- Use Framer Motion for component-level animations
- Apply GSAP for complex timeline animations
- Implement CSS animations for simple transitions
- Use Intersection Observer for viewport-based triggers

### Performance Considerations

- Implement dynamic imports for large components
- Use React.memo for expensive components
- Apply virtualization for large lists
- Optimize images and assets
- Use proper loading states

## File Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Utilities**: camelCase (e.g., `characterImages.ts`)
- **Styles**: kebab-case with module suffix (e.g., `button.module.css`)
- **Types**: PascalCase interfaces (e.g., `NavItem`)

## API Routes

- Located in `src/app/api/`
- Use Next.js route handlers pattern
- Implement MongoDB integration for data persistence
- Apply proper error handling and validation

## Testing

- Component test structure present but minimal implementation
- Storybook configuration for Button component
- Focus on component-specific testing patterns

## Asset Management

- **Images**: Stored in `public/` directory
- **Fonts**: Local fonts in `src/app/fonts/`
- **Icons**: React Icons library
- **Videos**: WebM/MP4 formats for compatibility

## Browser Compatibility

- Modern browsers supporting ES2017+
- Responsive design for mobile and desktop
- Progressive enhancement for advanced features

## Environment

- Development uses Turbopack for faster builds
- Production builds optimized for Vercel deployment
- MongoDB connection for data persistence
- Vercel Analytics integration
