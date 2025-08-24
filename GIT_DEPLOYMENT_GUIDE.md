# 🚀 Complete Git & GitHub Pages Deployment Guide

## Step 1: Initialize Git Repository

Open terminal in your project folder (`c:/CODING/EduW`) and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Make your first commit
git commit -m "Initial commit: EduGram educational platform"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** button in top-right corner
3. Select **"New repository"**
4. Repository name: `edugram-app` (or any name you prefer)
5. Make it **Public** (required for free GitHub Pages)
6. **DON'T** check "Add a README file" (since you have existing code)
7. Click **"Create repository"**

## Step 3: Connect Local Repository to GitHub

Copy the commands from GitHub's "push an existing repository" section:

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/edugram-app.git

# Push your code to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 4: Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This will:
- Build your app for production
- Create a `gh-pages` branch
- Deploy files to GitHub Pages

## Step 5: Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** section (left sidebar)
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **"gh-pages"** branch
6. Select **"/ (root)"** folder
7. Click **"Save"**

## Step 6: Get Your Public Link

Your app will be live at:
```
https://YOUR_USERNAME.github.io/edugram-app
```

**This process takes 2-10 minutes to go live!**

## Step 7: GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml` for automatic deployment:

```yaml
name: Deploy EduGram to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## Future Updates

To update your deployed app:

```bash
# Make changes to your code
git add .
git commit -m "Update: describe your changes"
git push origin main

# Deploy updates
npm run deploy
```

## Troubleshooting

**Issue: "gh-pages not found"**
```bash
npm install --save-dev gh-pages
```

**Issue: Permission denied**
```bash
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/edugram-app.git
```

**Issue: 404 on deployed site**
- Check that repository name matches `next.config.js` basePath
- Ensure GitHub Pages is enabled in repository settings

## ✅ Success Indicators

1. **Local development works**: `npm run dev` → http://localhost:3000
2. **Build succeeds**: `npm run build` (no errors)
3. **Deploy succeeds**: `npm run deploy` (creates gh-pages branch)
4. **GitHub Pages active**: Settings → Pages shows green checkmark
5. **Public link works**: https://YOUR_USERNAME.github.io/edugram-app

## 🎉 Your EduGram is Now Live!

Share your public link with:
- Friends and family
- Potential employers
- Social media
- Portfolio/resume

The link will work from any device, anywhere in the world! 🌍
