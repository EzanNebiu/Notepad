# Netlify + Railway Deployment Guide

Quick guide to deploy your notepad app with split hosting.

## 🚂 Part 1: Deploy Backend to Railway

### Step 1: Prepare Backend
```bash
# Make sure you're in the project root
cd server

# Create .env for production
cp .env.example .env
# Edit .env - we'll use Railway's MongoDB
```

### Step 2: Push to GitHub
```bash
# If not already in git
cd ..
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will auto-detect your project

### Step 4: Add MongoDB to Railway
1. In your Railway project, click "+ New"
2. Select "Database" → "Add MongoDB"
3. Railway will create a MongoDB instance
4. Copy the connection string from MongoDB service

### Step 5: Configure Environment Variables
In Railway backend service:
1. Go to "Variables" tab
2. Add these variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<paste Railway MongoDB connection string>
   CORS_ORIGIN=https://your-app-name.netlify.app
   ```

### Step 6: Configure Build
In Railway backend service settings:
- **Root Directory:** `server`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

### Step 7: Deploy
Railway will automatically deploy. Note your backend URL:
```
https://your-backend.up.railway.app
```

## 🌐 Part 2: Deploy Frontend to Netlify

### Step 1: Update API URL
Edit `client/.env`:
```env
VITE_API_URL=https://your-backend.up.railway.app/api
```

### Step 2: Build Frontend
```bash
cd client
npm install
npm run build
```

### Step 3: Deploy to Netlify

#### Option A: Drag & Drop (Fastest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag the `client/dist` folder to Netlify
4. Done! Your site is live at `https://random-name.netlify.app`

#### Option B: GitHub Integration (Better for updates)
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Configure build settings:
   ```
   Base directory: client
   Build command: npm run build
   Publish directory: client/dist
   ```
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.up.railway.app/api
   ```
7. Click "Deploy site"

### Step 4: Update CORS in Backend
Go back to Railway backend variables and update:
```
CORS_ORIGIN=https://your-actual-site.netlify.app
```

Redeploy backend if needed.

## ✅ Verification

Test your deployed app:
1. Visit your Netlify URL
2. Create a note
3. Check if auto-save works
4. Verify backend is responding

## 🔧 Troubleshooting

### Frontend can't reach backend
**Problem:** CORS error or connection refused

**Solution:**
1. Check `VITE_API_URL` in Netlify environment variables
2. Verify `CORS_ORIGIN` in Railway backend variables
3. Make sure both URLs match exactly (no trailing slashes)

### Backend crashes
**Problem:** Application error on Railway

**Solution:**
1. Check Railway logs
2. Verify `MONGODB_URI` is correct
3. Ensure `NODE_ENV=production`

### Notes not saving
**Problem:** Database connection issue

**Solution:**
1. Check Railway MongoDB is running
2. Verify connection string format
3. Check Railway backend logs

## 💰 Cost

Both services offer free tiers:
- **Railway:** 500 hours/month + $5 credit
- **Netlify:** 100GB bandwidth/month

Your app should run free indefinitely!

## 🔄 Continuous Deployment

Once set up:
- Push to GitHub `main` branch
- Railway auto-deploys backend
- Netlify auto-deploys frontend

No manual steps needed!

## 📝 Alternative: Render (Single Platform)

If you prefer one platform:

1. Go to [render.com](https://render.com)
2. Create **Web Service** for backend
3. Create **Static Site** for frontend
4. Add **MongoDB** (they offer free tier)

Less setup, but Railway + Netlify is faster.

## 🎯 Recommended Flow

```
Development:
  Local MongoDB → Backend (localhost:5000) → Frontend (localhost:5173)

Production:
  Railway MongoDB → Railway Backend → Netlify Frontend
```

## 🚀 Quick Deploy Commands

```bash
# 1. Commit your code
git add .
git commit -m "Ready for deployment"
git push

# 2. Build frontend locally to test
cd client
npm run build
# Check client/dist folder

# 3. Deploy to Railway (from dashboard)
# 4. Deploy to Netlify (drag dist folder or connect GitHub)

# 5. Test production URL
curl https://your-backend.up.railway.app/health
```

## 🔐 Security Checklist

Before going live:
- [ ] Update `CORS_ORIGIN` to your Netlify URL
- [ ] Set `NODE_ENV=production`
- [ ] Use Railway's MongoDB (not local)
- [ ] Verify `VITE_API_URL` points to Railway backend
- [ ] Test all features in production
- [ ] Check Railway logs for errors

---

**Time to Deploy:** ~15 minutes
**Cost:** Free
**Maintenance:** Auto-deploy on git push

Happy deploying! 🎉
