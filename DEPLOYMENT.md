# Deploying to Vercel

This guide will help you deploy the Student ERP Dashboard to Vercel.

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub** (already done ✅)

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

3. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository: `ashurajs552-droid/ERP`
   - Click "Import"

4. **Configure Project**
   - **Framework Preset:** Vite
   - **Root Directory:** `student-erp-dashboard`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for the build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd /Users/blinks2780/WINDSURF/CascadeProjects/windsurf-project/student-erp-dashboard

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Configuration Files

The following files have been added/updated for Vercel deployment:

### `vercel.json`
- Handles SPA routing for React Router
- Redirects all routes to `index.html`
- Specifies build configuration

### `vite.config.ts`
- Optimized build settings
- Code splitting for better performance
- Vendor chunk separation

### `.vercelignore`
- Excludes unnecessary files from deployment
- Reduces deployment size

## Environment Variables (Optional)

If you need to add environment variables:

1. In Vercel Dashboard:
   - Go to your project
   - Settings → Environment Variables
   - Add variables (e.g., API URLs, keys)

2. In your code:
   - Create `.env.local` file
   - Add variables prefixed with `VITE_`
   - Example: `VITE_API_URL=https://api.example.com`
   - Access in code: `import.meta.env.VITE_API_URL`

## Custom Domain (Optional)

1. In Vercel Dashboard:
   - Go to your project
   - Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Automatic Deployments

Once connected to GitHub:
- **Main branch** → Automatic production deployments
- **Other branches** → Automatic preview deployments
- **Pull requests** → Automatic preview deployments

## Build Configuration

The build process:
1. Installs dependencies: `npm install`
2. Runs TypeScript compiler: `tsc`
3. Builds with Vite: `vite build`
4. Outputs to `dist/` directory
5. Deploys to Vercel CDN

## Performance Optimizations

Already configured:
- ✅ Code splitting (vendor chunks)
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression
- ✅ CDN distribution
- ✅ HTTP/2 support

## Troubleshooting

### Routes not working (404 errors)
- **Solution:** The `vercel.json` file handles this by redirecting all routes to `index.html`

### Build fails
```bash
# Test build locally first
npm run build

# If successful, deploy
vercel --prod
```

### Slow builds
- Clear Vercel cache in dashboard
- Check dependencies in `package.json`

### Environment variables not working
- Ensure they're prefixed with `VITE_`
- Set them in Vercel Dashboard
- Redeploy after adding variables

## Live Demo Access

After deployment, your app will be accessible at:
- Production: `https://your-project-name.vercel.app`
- Preview: `https://your-project-name-git-branch.vercel.app`

## Demo Credentials (Don't Forget!)

Make sure to share these with users:

**Student Login:**
- Email: `student@demo.com`
- Password: `password`

**Admin Login:**
- Email: `admin@demo.com`
- Password: `password`

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router on Vercel](https://vercel.com/guides/deploying-react-with-vercel)
