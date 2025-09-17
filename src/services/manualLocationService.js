// Manual Location Service - No automatic detection, user selects location
class ManualLocationService {
  constructor() {
    this.cache = new Map();
    this.cacheDuration = 60 * 60 * 1000; // 1 hour cache for geocoded locations
  }

  /**
   * Get coordinates for a city/location name using Nominatim
   * @param {string} locationName - City or location name
   * @returns {Promise<Object>} Location coordinates and details
   */
  async geocodeLocation(locationName) {
    try {
      const cacheKey = `geocode_${locationName.toLowerCase()}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        console.log('✅ Using cached geocoding result');
        return cached;
      }

      console.log(`🔍 Geocoding location: ${locationName}`);
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'AI-Doctor-Assistant/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.length === 0) {
        throw new Error(`Location "${locationName}" not found`);
      }

      const result = data[0];
      
      const location = {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        name: locationName,
        displayName: result.display_name,
        city: result.address?.city || result.address?.town || result.address?.village,
        state: result.address?.state,
        country: result.address?.country,
        countryCode: result.address?.country_code,
        source: 'manual_geocoded',
        timestamp: Date.now()
      };

      // Cache the result
      this.setCache(cacheKey, location);
      
      console.log(`✅ Geocoded "${locationName}" to ${location.lat}, ${location.lng}`);
      return location;
      
    } catch (error) {
      console.error(`❌ Geocoding failed for "${locationName}":`, error.message);
      throw error;
    }
  }

  /**
   * Get predefined major cities with coordinates
   * @returns {Array} Array of major cities
   */
  getMajorCities() {
    return [
      // India
      { name: 'Delhi', lat: 28.6139, lng: 77.2090, country: 'India', state: 'Delhi' },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777, country: 'India', state: 'Maharashtra' },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946, country: 'India', state: 'Karnataka' },
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, country: 'India', state: 'Telangana' },
      { name: 'Chennai', lat: 13.0827, lng: 80.2707, country: 'India', state: 'Tamil Nadu' },
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639, country: 'India', state: 'West Bengal' },
      { name: 'Pune', lat: 18.5204, lng: 73.8567, country: 'India', state: 'Maharashtra' },
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, country: 'India', state: 'Gujarat' },
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873, country: 'India', state: 'Rajasthan' },
      { name: 'Lucknow', lat: 26.8467, lng: 80.9462, country: 'India', state: 'Uttar Pradesh' },
      
      // USA
      { name: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA', state: 'New York' },
      { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'USA', state: 'California' },
      { name: 'Chicago', lat: 41.8781, lng: -87.6298, country: 'USA', state: 'Illinois' },
      { name: 'Houston', lat: 29.7604, lng: -95.3698, country: 'USA', state: 'Texas' },
      { name: 'Phoenix', lat: 33.4484, lng: -112.0740, country: 'USA', state: 'Arizona' },
      
      // Europe
      { name: 'London', lat: 51.5074, lng: -0.1278, country: 'UK', state: 'England' },
      { name: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France', state: 'Île-de-France' },
      { name: 'Berlin', lat: 52.5200, lng: 13.4050, country: 'Germany', state: 'Berlin' },
      { name: 'Madrid', lat: 40.4168, lng: -3.7038, country: 'Spain', state: 'Madrid' },
      { name: 'Rome', lat: 41.9028, lng: 12.4964, country: 'Italy', state: 'Lazio' },
      
      // Asia
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan', state: 'Tokyo' },
      { name: 'Seoul', lat: 37.5665, lng: 126.9780, country: 'South Korea', state: 'Seoul' },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore', state: 'Singapore' },
      { name: 'Bangkok', lat: 13.7563, lng: 100.5018, country: 'Thailand', state: 'Bangkok' },
      { name: 'Dubai', lat: 25.2048, lng: 55.2708, country: 'UAE', state: 'Dubai' },
      
      // Australia
      { name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia', state: 'New South Wales' },
      { name: 'Melbourne', lat: -37.8136, lng: 144.9631, country: 'Australia', state: 'Victoria' },
      
      // Canada
      { name: 'Toronto', lat: 43.6532, lng: -79.3832, country: 'Canada', state: 'Ontario' },
      { name: 'Vancouver', lat: 49.2827, lng: -123.1207, country: 'Canada', state: 'British Columbia' }
    ].map(city => ({
      ...city,
      source: 'predefined',
      timestamp: Date.now()
    }));
  }

  /**
   * Search cities by name (fuzzy search)
   * @param {string} query - Search query
   * @returns {Array} Matching cities
   */
  searchCities(query) {
    if (!query || query.length < 2) return [];
    
    const cities = this.getMajorCities();
    const lowercaseQuery = query.toLowerCase();
    
    return cities.filter(city => 
      city.name.toLowerCase().includes(lowercaseQuery) ||
      city.state.toLowerCase().includes(lowercaseQuery) ||
      city.country.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 10); // Limit to 10 results
  }

  /**
   * Get cities by country
   * @param {string} country - Country name
   * @returns {Array} Cities in the country
   */
  getCitiesByCountry(country) {
    const cities = this.getMajorCities();
    return cities.filter(city => 
      city.country.toLowerCase() === country.toLowerCase()
    );
  }

  /**
   * Validate location coordinates
   * @param {Object} location - Location object
   * @returns {boolean} Is valid location
   */
  isValidLocation(location) {
    return location && 
           typeof location.lat === 'number' && 
           typeof location.lng === 'number' &&
           location.lat >= -90 && location.lat <= 90 &&
           location.lng >= -180 && location.lng <= 180;
  }

  /**
   * Get user's preferred location from localStorage
   * @returns {Object|null} Saved location or null
   */
  getSavedLocation() {
    try {
      const saved = localStorage.getItem('preferred_location');
      if (saved) {
        const location = JSON.parse(saved);
        if (this.isValidLocation(location)) {
          console.log('✅ Using saved location:', location.name);
          return location;
        }
      }
    } catch (error) {
      console.log('Failed to load saved location:', error);
    }
    return null;
  }

  /**
   * Save user's preferred location to localStorage
   * @param {Object} location - Location to save
   */
  saveLocation(location) {
    try {
      if (this.isValidLocation(location)) {
        localStorage.setItem('preferred_location', JSON.stringify(location));
        console.log('✅ Location saved:', location.name);
      }
    } catch (error) {
      console.log('Failed to save location:', error);
    }
  }

  /**
   * Clear saved location
   */
  clearSavedLocation() {
    try {
      localStorage.removeItem('preferred_location');
      console.log('✅ Saved location cleared');
    } catch (error) {
      console.log('Failed to clear saved location:', error);
    }
  }

  /**
   * Get default location (Delhi)
   * @returns {Object} Default location
   */
  getDefaultLocation() {
    const defaultCity = this.getMajorCities().find(city => city.name === 'Delhi');
    return {
      ...defaultCity,
      source: 'default'
    };
  }

  // Cache management
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheDuration) {
      return cached.data;
    }
    return null;
  }

  clearCache() {
    this.cache.clear();
    console.log('✅ Location cache cleared');
  }
}

export default new ManualLocationService();