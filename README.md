# pemesanan_kopi

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Kopi Kuning Garut - E2E Testing Documentation

## Overview
End-to-end testing suite for Kopi Kuning Garut website using Cypress.

## Test Structure
- Main page sections visibility
- Form interactions and validation
- Order process flow
- Payment modal verification
- Responsive design testing
- WhatsApp integration

## Key Test Scenarios
1. Landing Page Sections
   - Hero section visibility
   - Introduction section content
   - Product features display
   - Review section verification
   - Closing section and CTA button

2. Order Process
   - Form input validation
   - Product selection
   - Quantity calculation
   - Address submission
   - WhatsApp integration

3. Payment Flow
   - Modal display
   - Invoice generation
   - Bank transfer details
   - WhatsApp confirmation link

## Setup Instructions
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open Cypress Test Runner
npm run cypress:open
