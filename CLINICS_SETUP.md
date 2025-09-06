# 🏥 Clinics Integration Setup Guide

This guide explains how to integrate the National Hospital Directory API from data.gov.in with your AI Doctor Assistant application.

## 📋 Prerequisites

1. **Data.gov.in API Key**: You'll need an API key from the Government of India's Open Data Portal
2. **Node.js**: Make sure you have Node.js installed
3. **Internet Connection**: Required for API calls and location services

## 🔑 Getting Your API Key

### Step 1: Visit data.gov.in
1. Go to [https://data.gov.in/](https://data.gov.in/)
2. Click on "LOGIN | REGISTER" in the top right corner
3. Create an account or login with existing credentials

### Step 2: Get API Access
1. After logging in, navigate to your profile/dashboard
2. Look for "API Key" or "API Access" section
3. Generate a new API key for the National Hospital Directory dataset
4. Copy the API key (you'll need it for the next step)

## ⚙️ Configuration

### Step 1: Environment Variables
1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder with your actual API key:
   ```env
   VITE_DATA_GOV_API_KEY=your_actual_api_key_here
   ```

### Step 2: Verify Installation
1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Navigate to `http://localhost:5173/clinics` to test the integration

## 🗺️ How It Works

### Location Detection
- The app automatically detects the user's current location using the browser's geolocation API
- If location access is denied, it defaults to Delhi coordinates
- Hospitals are sorted by distance from the user's location

### API Integration
- Fetches hospital data from the National Hospital Directory API
- Processes and normalizes the data for consistent display
- Includes fallback to mock data if the API is unavailable

### Data Processing
The API provides:
- **Hospital Name**: Official name of the healthcare facility
- **Location**: Address and geographic details
- **Coordinates**: Latitude and longitude for mapping
- **Category**: Type of hospital (Government, Private, etc.)

### Features
- **Distance Calculation**: Shows how far each hospital is from user location
- **Category Filtering**: Filter by hospital type (Government, Private, Trust, etc.)
- **Search Functionality**: Search by hospital name, location, or specialties
- **Sorting Options**: Sort by distance, rating, or name
- **Direct Actions**: Get directions via Google Maps or call directly

## 🏥 Supported Hospital Categories

The system automatically categorizes hospitals based on their names:

- **Government**: AIIMS, Government hospitals, District hospitals
- **Private**: Corporate hospitals, Private clinics
- **Railway**: Railway hospitals and clinics
- **ESI**: Employee State Insurance hospitals
- **Defence**: Military, Army, Navy, Air Force hospitals
- **Municipal**: Corporation and municipal hospitals
- **Trust**: Charitable and mission hospitals

## 🔧 Customization

### Adding More Data Fields
To add more fields from the API response, modify the `processHospitalData` function in `/src/services/hospitalApi.js`:

```javascript
return {
  id: index + 1,
  name: hospitalName,
  category: category,
  location: location,
  latitude: latitude,
  longitude: longitude,
  // Add new fields here
  newField: hospital.new_field || hospital.NewField,
  // ...
};
```

### Changing Search Radius
To modify the default search radius (currently 50km), update the call in `/src/pages/Clinics.jsx`:

```javascript
const nearbyHospitals = userLocation 
  ? getHospitalsNearLocation(hospitalData, userLocation, 100) // Change to 100km
  : hospitalData;
```

### Custom Styling
The component uses Tailwind CSS. Modify the className properties in the JSX to customize the appearance.

## 🚨 Troubleshooting

### API Key Issues
- **Error**: "Invalid API key"
  - **Solution**: Verify your API key is correct and active on data.gov.in
  - **Check**: Make sure the key is properly set in the `.env` file

### Location Issues
- **Error**: "Location access denied"
  - **Solution**: The app falls back to Delhi coordinates automatically
  - **Manual**: Users can search for hospitals in specific cities

### No Hospitals Found
- **Cause**: API might be down or no hospitals in the area
  - **Solution**: App shows fallback mock data
  - **Action**: Check console for API error messages

### CORS Issues
- **Error**: "CORS policy" errors
  - **Solution**: The API should support CORS, but if issues persist, consider using a proxy server

## 📱 Mobile Responsiveness

The clinics page is fully responsive and includes:
- Touch-friendly search and filter controls
- Optimized card layout for mobile screens
- Swipe-friendly interface elements
- Call and directions buttons for mobile users

## 🔄 Future Enhancements

Potential improvements:
1. **Real-time Availability**: Integration with hospital booking systems
2. **Reviews and Ratings**: User-generated hospital reviews
3. **Insurance Network**: Filter by insurance acceptance
4. **Appointment Booking**: Direct appointment scheduling
5. **Emergency Services**: Real-time emergency room status

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is active on data.gov.in
3. Ensure location services are enabled in your browser
4. Check your internet connection

For technical support with the data.gov.in API, contact their support team through the portal.
