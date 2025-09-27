# Render Deployment Instructions for AI Doctor Assistant

## Current Issue
Clinic routes (`/clinic/*`) work locally but return 404 on Render deployment.

## Root Cause
Render's static site hosting doesn't automatically handle Single Page Application (SPA) routing. When a user visits `/clinic/dashboard` directly, Render looks for a physical file at that path instead of serving the React app.

## Solution 1: render.yaml Configuration (Recommended)

We've added a `render.yaml` file with the following configuration:

```yaml
services:
  - type: web
    name: ai-doctor-assistant
    env: static
    buildCommand: npm ci && npm run build
    staticPublishPath: ./dist
    routes:
      - type: redirect
        source: /*
        destination: /index.html
```

## Solution 2: Manual Render Dashboard Configuration

If the `render.yaml` doesn't work, configure manually in Render dashboard:

### Step 1: Service Settings
- **Environment**: `Static Site`
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Node Version**: `18` or `20`

### Step 2: Redirects & Rewrites
Add this rule in the Render dashboard:

**Type**: `Rewrite`
**Source**: `/*`
**Destination**: `/index.html`

### Step 3: Environment Variables (if needed)
Add any required environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Any other `VITE_*` variables

## Solution 3: Alternative _redirects File

If render.yaml doesn't work, try this enhanced `_redirects` file:

```
# Clinic routes
/clinic/* /index.html 200
/clinic /index.html 200

# All other routes
/* /index.html 200
```

## Testing After Deployment

Visit these URLs directly to verify they work:
- `https://your-app.onrender.com/clinic`
- `https://your-app.onrender.com/clinic/dashboard`
- `https://your-app.onrender.com/clinic/training`
- `https://your-app.onrender.com/clinic/symptom-tracker/test`

## Common Render Issues & Solutions

### Issue: Build fails
**Solution**: Make sure `package-lock.json` is committed and `npm ci` is used in build command.

### Issue: 404 on direct navigation
**Solution**: Ensure redirects are properly configured (see solutions above).

### Issue: Blank page
**Solution**: Check browser console. Often caused by incorrect asset paths or environment variables.

### Issue: Assets not loading
**Solution**: Verify `dist` folder contains all assets after build.

## Debugging Steps

1. **Check build logs** in Render dashboard
2. **Verify dist folder** contains `index.html` and assets
3. **Test locally** with `npx serve dist` to simulate production
4. **Check browser network tab** for failed requests
5. **Verify environment variables** are set correctly

## Build Verification

After build, the `dist/assets` folder should contain:
- `clinic-features-[hash].js` - All clinic components
- `react-vendor-[hash].js` - React dependencies
- `index-[hash].js` - Main app bundle
- `index-[hash].css` - Styles

## Alternative Deployment Options

If Render continues to have issues, consider:

1. **Netlify**: Often handles SPAs better automatically
2. **Vercel**: Excellent SPA support with `vercel.json`
3. **GitHub Pages**: Free option with proper configuration

## Quick Fix Command

If issues persist, try this build command in Render:
```
npm ci && npm run build && echo '/*    /index.html   200' > dist/_redirects
```

This adds the redirect rule directly to the build output.