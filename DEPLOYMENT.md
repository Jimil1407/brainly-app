# 🚀 Deployment Guide for Second Brain App

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Render.com account (free tier)
- Vercel account (free tier)

## Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (M0 Free tier)

2. **Configure Database**
   - Create a database named `brainly-app`
   - Create a database user with read/write permissions
   - Get your connection string

3. **Network Access**
   - Add `0.0.0.0/0` to IP Access List (allow all IPs)

## Step 2: Backend Deployment (Render.com)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [Render.com](https://render.com)
   - Connect your GitHub repository
   - Create new Web Service
   - Select your repository
   - Configure:
     - **Name**: `brainly-app-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `bun run src/index.ts`

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainly-app
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

4. **Get Backend URL**
   - Note your Render URL: `https://your-app.onrender.com`

## Step 3: Frontend Deployment (Vercel)

1. **Update API URL**
   - Replace `your-backend-domain.onrender.com` in `frontend/src/services/api.ts` with your actual Render URL

2. **Deploy on Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com/api/v1
   ```

4. **Get Frontend URL**
   - Note your Vercel URL: `https://your-app.vercel.app`

## Step 4: Update Backend CORS

1. **Update FRONTEND_URL**
   - Go back to Render dashboard
   - Update `FRONTEND_URL` with your Vercel URL

## Step 5: Test Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-domain.onrender.com/api/v1/content
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Create account and test functionality

## Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainly-app
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-domain.onrender.com/api/v1
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure FRONTEND_URL is set correctly in backend
2. **Database Connection**: Check MONGODB_URI format and network access
3. **Build Failures**: Check package.json scripts and dependencies

### Logs:
- Render: Check logs in dashboard
- Vercel: Check build logs in dashboard
- MongoDB: Check connection in Atlas dashboard

## Cost Estimation
- **MongoDB Atlas**: Free tier (512MB)
- **Render**: Free tier (750 hours/month)
- **Vercel**: Free tier (unlimited)
- **Total**: $0/month for basic usage 