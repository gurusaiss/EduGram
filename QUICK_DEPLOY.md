# 🚀 Quick Deploy Guide for EduGram

## Step-by-Step Deployment to GitHub Pages

### 1. Open Terminal/Command Prompt in your project folder

### 2. Run these commands one by one:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Complete EduGram platform"

# Set main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/gurusaiss/EduGram.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to: https://github.com/gurusaiss/EduGram
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Wait 2-3 minutes for deployment

### 4. Your Live App URL

Once deployed, your EduGram app will be live at:
**https://gurusaiss.github.io/EduGram/**

## Alternative: Use npm deploy script

If the above doesn't work:

```bash
npm run deploy
```

This will build and deploy directly to GitHub Pages.

## ✅ What's Included in Your EduGram App

- 📱 Instagram-style vertical reels feed
- 🎯 Interactive flashcards with progress tracking  
- 🏫 College groups (Vizag, IITs, NITs)
- 👤 Profile with stats, achievements, activity
- 📊 Real-time progress tracking
- 📱 Mobile-responsive design

Your app is ready to go live! 🎉
