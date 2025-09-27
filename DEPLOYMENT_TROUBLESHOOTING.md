# Deployment Troubleshooting Guide for Clinic Routes

## Issue: Clinic routes work locally but not in deployment

The main problem is that Single Page Applications (SPAs) need special server configuration to handle client-side routing. When users navigate directly to `/clinic/dashboard`, the server looks for that file instead of serving the React app.

## Solutions Added

### 1. Routing Configuration Files

We've added configuration files for popular deployment platforms:

#### Netlify
- **File**: `_redirects`
- **Content**: `/*    /index.html   200`
- **File**: `netlify.toml`
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel
- **File**: `vercel.json`
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### 2. Vite Configuration Optimization

Updated `vite.config.js` to include clinic components in manual chunks:

```javascript
'clinic-features': [
  './src/pages/clinic/ClinicLandingPage.jsx',
  './src/pages/clinic/ClinicDashboardSimple.jsx', 
  './src/pages/clinic/PatientRegistrationSimple.jsx',
  './src/pages/clinic/PatientQueueSimple.jsx',
  './src/pages/clinic/ClinicEfficiencyDashboard.jsx',
  './src/pages/clinic/ClinicSymptomTracker.jsx',
  './src/pages/clinic/ClinicAIReportsView.jsx',
  './src/pages/clinic/ClinicWorkerTraining.jsx'
]
```

### 3. Updated Meta Tags

Enhanced `index.html` with proper SEO and social media meta tags.

## Platform-Specific Instructions

### Render
If using Render, add these settings in the dashboard:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Rewrites and Redirects**: Add rule `/*` → `/index.html` (SPA)

### Netlify
- Deploy with the `_redirects` file in root
- Or use `netlify.toml` configuration

### Vercel
- Deploy with `vercel.json` in root
- Automatic SPA detection should work

### GitHub Pages
Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## Testing Deployment

1. **Build locally**: `npm run build`
2. **Check dist folder**: Ensure all files are generated
3. **Test production build**: `npx vite preview` 
4. **Test direct navigation**: Try visiting `/clinic/dashboard` directly

## Common Issues and Solutions

### Issue: 404 on direct navigation
**Solution**: Ensure your deployment platform has SPA routing configured with the files above.

### Issue: Blank page after deployment
**Solution**: Check browser console for errors. Often caused by incorrect base URL or missing assets.

### Issue: Clinic components not loading
**Solution**: Verify all clinic component files exist and imports are correct.

### Issue: Slow loading
**Solution**: The manual chunks configuration should improve loading performance.

## Verification Steps

After deployment, test these URLs directly:
- `https://yourdomain.com/clinic`
- `https://yourdomain.com/clinic/dashboard`  
- `https://yourdomain.com/clinic/training`
- `https://yourdomain.com/clinic/symptom-tracker/test`

All should load the React app correctly.

## Environment Variables

If your clinic features use environment variables, ensure they're set in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Any other `VITE_*` variables

## Build Output Analysis

The build creates these chunks:
- `clinic-features-[hash].js` - All clinic components
- `react-vendor-[hash].js` - React dependencies  
- `ui-vendor-[hash].js` - UI components
- Main app bundle

This optimizes loading and prevents issues with missing components.