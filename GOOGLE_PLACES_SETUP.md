# Google Places API Setup Guide

## 1. Get Your Free Google Places API Key

### Step 1: Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

### Step 2: Create a New Project (if needed)
- Click "Select a project" → "New Project"
- Enter project name: "AI-Doctor-Assistant"
- Click "Create"

### Step 3: Enable Google Places API
- Go to "APIs & Services" → "Library"
- Search for "Places API"
- Click on "Places API" and click "Enable"

### Step 4: Create API Key
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "API Key"
- Copy your API key (keep it secure!)

### Step 5: Configure API Key (Optional but Recommended)
- Click on your API key to edit
- Under "API restrictions", select "Restrict key"
- Choose these APIs:
  - Places API
  - Maps JavaScript API
  - Geocoding API

### Step 6: Set Usage Limits (Optional)
- Set daily quota limits to control costs
- Recommended: 1000 requests/day for testing

## 2. Add API Key to Your Project

### Create .env file in your project root:
```
VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
```

### Important: Add .env to .gitignore
```
# Environment variables
.env
.env.local
.env.production
```

## 3. Free Tier Limits (Updated 2024)

### Monthly Free Credit: $200
This covers approximately:
- **28,000** Places Nearby Search requests ($17/1000)
- **40,000** Geocoding requests ($5/1000)
- **80,000** Places Details requests ($17/1000)

### API Costs:
- **Places Nearby Search**: $17 per 1,000 requests
- **Places Details**: $17 per 1,000 requests
- **Places Text Search**: $32 per 1,000 requests
- **Geocoding**: $5 per 1,000 requests

### Usage Optimization Tips:
1. **Cache Results**: We cache for 30 minutes to reduce API calls
2. **Limit Radius**: Don't search beyond 25km unless necessary
3. **Batch Requests**: Get multiple details in single request when possible
4. **Set Quotas**: Configure daily limits in Google Cloud Console

## 4. Features You Get with Google Places

### ✅ Real-time Data
- Current opening hours
- Live ratings and reviews
- Up-to-date contact information
- Recent photos

### ✅ Comprehensive Coverage
- Hospitals, clinics, doctors
- Pharmacies, dentists
- Emergency services
- Specialist clinics

### ✅ Rich Information
- Detailed reviews and ratings
- High-quality photos
- Verified contact details
- Opening hours
- Website links

### ✅ Accurate Location
- Precise GPS coordinates
- Real-time availability
- Distance calculations
- Directions integration

## 5. Alternative Free Options (Backup)

If you prefer to stay completely free:
1. **OpenStreetMap** (Current implementation)
2. **Government Health APIs** (Limited coverage)
3. **Mock Data** (For testing)

## 6. Security Best Practices

### Restrict API Key:
- Domain restrictions for production
- API restrictions (only enable needed APIs)
- Regular rotation of API keys

### Environment Variables:
```bash
# Development
VITE_GOOGLE_PLACES_API_KEY=your_development_key

# Production  
VITE_GOOGLE_PLACES_API_KEY=your_production_key
```

## 7. Monitoring Usage

### Google Cloud Console:
- Monitor API usage in real-time
- Set up billing alerts
- View detailed usage reports

### In Your App:
- Console logs show API call counts
- Error handling for quota exceeded
- Graceful fallback to cached data

---

**Total Setup Time: ~10 minutes**
**Monthly Cost: $0 (within free tier)**
**Data Quality: Excellent (Google verified)**
