# 🚀 Deployment Guide

This guide covers deploying the Second Brain app to various platforms.

## 📋 Prerequisites

- GitHub repository with your code
- MongoDB database (local or cloud)
- Environment variables configured

## 🌐 Frontend Deployment (Vercel)

### 1. Connect to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### 2. Configure Build Settings

**Framework Preset:** Vite
**Build Command:** `cd frontend && npm run build`
**Output Directory:** `frontend/dist`
**Install Command:** `cd frontend && npm install`

### 3. Environment Variables

Add these environment variables in Vercel:

```
VITE_API_URL=https://your-backend-url.onrender.com/api/v1
```

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## 🔧 Backend Deployment (Render)

### 1. Connect to Render

1. Go to [Render](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository

### 2. Configure Service

**Name:** `second-brain-backend`
**Environment:** `Node`
**Build Command:** `cd backend && bun install`
**Start Command:** `cd backend && bun run start`

### 3. Environment Variables

Add these environment variables in Render:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=production
PORT=10000
```

### 4. Deploy

Click "Create Web Service" and wait for deployment.

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster

### 2. Configure Database

1. **Create Database:**
   - Database Name: `second-brain`
   - Collection Name: `users`

2. **Create Collections:**
   - `users` - for user accounts
   - `contents` - for saved content
   - `shareablelinks` - for shared links

3. **Network Access:**
   - Add IP address: `0.0.0.0/0` (allow all)
   - Or add specific IP addresses

4. **Database Access:**
   - Create a database user
   - Set username and password
   - Grant read/write permissions

### 3. Get Connection String

```
mongodb+srv://username:password@cluster.mongodb.net/second-brain?retryWrites=true&w=majority
```

## 🔐 Environment Variables

### Production Environment Variables

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api/v1
```

#### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/second-brain?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
NODE_ENV=production
PORT=10000
```

### Development Environment Variables

#### Frontend (.env.development)
```env
VITE_API_URL=http://localhost:3000/api/v1
```

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/second-brain
JWT_SECRET=your-development-jwt-secret
NODE_ENV=development
PORT=3000
```

## 🔄 CI/CD Pipeline

### GitHub Actions Setup

1. **Add Secrets to GitHub:**
   - Go to repository Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

2. **Vercel Token:**
   - Go to Vercel → Settings → Tokens
   - Create a new token
   - Copy the token to GitHub secrets

3. **Vercel Project ID:**
   - Go to your Vercel project
   - Copy the Project ID from the URL or settings

### Automated Deployment

The CI/CD pipeline will:
1. Run tests on push/PR
2. Deploy preview on PR
3. Deploy to production on merge to main

## 📱 Custom Domain Setup

### Vercel (Frontend)

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Render (Backend)

1. Go to your Render service
2. Click "Settings" → "Custom Domains"
3. Add your custom domain
4. Configure DNS records

## 🔍 Monitoring & Analytics

### Vercel Analytics

1. Enable Vercel Analytics in your project
2. Add analytics code to your app
3. Monitor performance and user behavior

### Error Tracking

Consider adding error tracking services:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)
- [Bugsnag](https://bugsnag.com)

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Rotate secrets regularly

### CORS Configuration
Ensure your backend CORS settings include your frontend domain:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

### Rate Limiting
Consider implementing rate limiting for production:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
- Check build logs for errors
- Ensure all dependencies are installed
- Verify environment variables are set

#### Database Connection Issues
- Check MongoDB connection string
- Verify network access settings
- Ensure database user has correct permissions

#### CORS Errors
- Verify CORS configuration in backend
- Check frontend API URL
- Ensure domains match

#### Authentication Issues
- Verify JWT_SECRET is set correctly
- Check token expiration settings
- Ensure proper token handling in frontend

### Debug Commands

#### Frontend
```bash
# Check build locally
cd frontend
npm run build

# Check for linting errors
npm run lint
```

#### Backend
```bash
# Check if server starts locally
cd backend
bun run start

# Check environment variables
echo $MONGODB_URI
echo $JWT_SECRET
```

## 📊 Performance Optimization

### Frontend
- Enable Vite build optimization
- Use code splitting
- Optimize images and assets
- Enable caching headers

### Backend
- Enable compression
- Implement caching
- Optimize database queries
- Use connection pooling

## 🔄 Backup Strategy

### Database Backups
- Set up automated MongoDB Atlas backups
- Test restore procedures regularly
- Store backups in multiple locations

### Code Backups
- Use GitHub for version control
- Set up branch protection rules
- Create release tags for stable versions

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancers
- Implement session management
- Consider microservices architecture

### Database Scaling
- Use MongoDB Atlas scaling features
- Implement read replicas
- Consider sharding for large datasets

---

For additional support:
- Check the [README](../README.md)
- Review [API Documentation](./API.md)
- Create an issue on GitHub
