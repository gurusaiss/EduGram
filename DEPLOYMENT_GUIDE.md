# 🚀 EduGram Deployment Guide - GitHub Pages

## Overview
This guide will help you deploy your EduGram app to GitHub Pages for free hosting and public sharing.

## Prerequisites
- GitHub account
- Git installed on your computer
- Your EduGram project ready

## Step-by-Step Deployment Process

### 1. Prepare Your Project for Deployment

First, install the GitHub Pages deployment package:
```bash
npm install --save-dev gh-pages
```

### 2. Update package.json

Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d out",
    "build": "next build && next export"
  },
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

### 3. Update next.config.js

Create or update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : ''
}

module.exports = nextConfig
```

### 4. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it (e.g., `edugram-app`)
4. Make it public
5. Don't initialize with README (since you have existing code)

### 5. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - EduGram app"

# Add your GitHub repository as origin
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 6. Deploy to GitHub Pages

Run the deployment command:
```bash
npm run deploy
```

This will:
- Build your app
- Create a `gh-pages` branch
- Deploy the built files to GitHub Pages

### 7. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Select "/ (root)" folder
7. Click "Save"

### 8. Access Your Deployed App

Your app will be available at:
```
https://yourusername.github.io/your-repo-name
```

## GitHub Actions Workflow (Alternative Method)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## Important Notes

### ✅ What Works with GitHub Pages:
- Static site generation (SSG)
- Client-side routing
- Static assets (images, CSS, JS)
- API calls to external services

### ❌ What Doesn't Work:
- Server-side rendering (SSR)
- API routes (`/api/*`)
- Dynamic server functions
- File system operations

### 🔧 Troubleshooting:

**Issue: 404 errors on page refresh**
- Solution: GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html`

**Issue: Images not loading**
- Solution: Use relative paths or configure `assetPrefix` correctly

**Issue: CSS/JS not loading**
- Solution: Check `basePath` and `assetPrefix` in `next.config.js`

## Updating Your Deployment

To update your deployed app:
```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main

# Deploy updates
npm run deploy
```

## Custom Domain (Optional)

1. Buy a domain from any registrar
2. In your repository settings → Pages → Custom domain
3. Enter your domain name
4. Configure DNS with your registrar:
   - Add CNAME record pointing to `yourusername.github.io`

## Security Considerations

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- All code is public on GitHub Pages
- HTTPS is automatically enabled

## Performance Tips

- Optimize images before deployment
- Minimize bundle size
- Use CDN for large assets
- Enable compression in your build process

## Sharing Your App

Once deployed, you can share your app using:
- Direct URL: `https://yourusername.github.io/your-repo-name`
- QR code generators for mobile sharing
- Social media sharing with Open Graph meta tags

Your EduGram app will be live and accessible to anyone with the URL! 🎉
