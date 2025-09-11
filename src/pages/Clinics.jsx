import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Filter, Search, Navigation, Star, AlertCircle, CheckCircle, ExternalLink, Users } from 'lucide-react';
import Header from '../assets/component/Header';
import Footer from '../assets/component/Footer';
import FreeHospitalService from '../services/freeHospitalService';

const Clinics = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [error, setError] = useState(null);
  const [locationSource, setLocationSource] = useState('detecting');

  // Hospital types for filtering
  const hospitalTypes = ['all', 'Government', 'Private', 'Hospital', 'Clinic', 'Emergency'];
  
  // Common specialties
  const specialties = [
    'all', 'Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 
    'Pediatrics', 'Gynecology', 'General Medicine', 'Emergency Medicine', 'Surgery'
  ];

  // Get user's current location
  useEffect(() => {
    const getLocation = async () => {
      try {
        setLocationSource('detecting');
        console.log('🗺️ Starting location detection...');
        
        const location = await FreeHospitalService.getUserLocation();
        
        console.log('📍 Location obtained:', location);
        setUserLocation(location);
        setLocationSource(location.source);
        
        if (location.source === 'default') {
          setError('Using default location (Delhi). Please enable location services for better results.');
        } else if (location.source === 'ip') {
          setError('Using approximate location based on your IP address.');
        }
      } catch (err) {
        console.error('❌ Error getting location:', err);
        setError('Unable to get your location. Using Delhi as default.');
        setUserLocation({ lat: 28.6139, lng: 77.2090, source: 'error' });
        setLocationSource('error');
      }
    };

    getLocation();
  }, []);

  // Fetch hospitals when location is available
  useEffect(() => {
    if (userLocation) {
      fetchHospitals();
    }
  }, [userLocation]);

  // Search hospitals using free service
  const fetchHospitals = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🏥 Fetching hospitals using free service...');
      
      const options = {
        radiusKm: 25, // 25km radius
        maxResults: 50
      };

      const hospitalData = await FreeHospitalService.searchNearbyHospitals(
        userLocation.lat, 
        userLocation.lng, 
        options
      );

      console.log('✅ Found hospitals:', hospitalData.length);
      setHospitals(hospitalData);
      setFilteredHospitals(hospitalData);
      
    } catch (err) {
      console.error('❌ Error fetching hospitals:', err);
      setError('Failed to load hospital data. Showing sample hospitals.');
      
      // Use mock data as fallback
      const mockData = await FreeHospitalService.getMockHospitalData(userLocation.lat, userLocation.lng);
      setHospitals(mockData);
      setFilteredHospitals(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search hospitals
  useEffect(() => {
    let filtered = [...hospitals];

    // Search by name or address
    if (searchTerm) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(hospital => hospital.type === selectedType);
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(hospital =>
        hospital.specialties.some(specialty =>
          specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
        )
      );
    }

    // Sort hospitals
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredHospitals(filtered);
  }, [hospitals, searchTerm, selectedType, selectedSpecialty, sortBy]);

  const handleRetryLocation = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const location = await FreeHospitalService.getUserLocation();
      setUserLocation(location);
    } catch (err) {
      setError('Still unable to get your location. Using default location.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Finding Nearby Hospitals</h2>
              <p className="text-gray-500">
                {locationSource === 'detecting' ? 'Getting your location...' : 'Searching for hospitals...'}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏥 Nearby Hospitals & Clinics
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the best healthcare facilities near you with detailed information about doctors, services, and timings.
          </p>
        </div>

        {/* Location Info */}
        {userLocation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">
                  Showing hospitals near your location 
                  {userLocation.city && ` in ${userLocation.city}`}
                  {locationSource === 'ip' && ' (approximate)'}
                </span>
              </div>
              {(locationSource === 'ip' || locationSource === 'default' || locationSource === 'error') && (
                <button
                  onClick={handleRetryLocation}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Get precise location
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800">{error}</span>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Hospital Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {hospitalTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>

            {/* Specialty Filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{filteredHospitals.length}</span> hospitals
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Hospital List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Hospital Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-green-800">
                        {hospital.rating.toFixed(1)}
                      </span>
                    </div>
                    {hospital.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" title="Verified" />
                    )}
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm line-clamp-2">{hospital.address}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {hospital.distance} km away
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {hospital.type}
                  </span>
                </div>
              </div>

              {/* Hospital Details */}
              <div className="p-6">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {hospital.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-green-500 mr-2" />
                      <a 
                        href={`tel:${hospital.phone}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {hospital.phone}
                      </a>
                    </div>
                  )}
                  {hospital.website && (
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <a 
                        href={hospital.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                {/* Timings */}
                <div className="flex items-center mb-4">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {hospital.timings.isOpen24x7 ? (
                      <span className="text-green-600 font-medium">Open 24/7</span>
                    ) : (
                      hospital.timings.schedule
                    )}
                  </span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{hospital.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Doctors */}
                {hospital.doctors && hospital.doctors.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Doctors Available:
                    </h4>
                    <div className="space-y-2">
                      {hospital.doctors.slice(0, 2).map((doctor, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                          <div className="font-medium text-gray-800">{doctor.name}</div>
                          <div className="text-gray-600">{doctor.specialty}</div>
                          <div className="text-gray-500 text-xs">{doctor.timings}</div>
                        </div>
                      ))}
                      {hospital.doctors.length > 2 && (
                        <div className="text-sm text-gray-500">
                          +{hospital.doctors.length - 2} more doctors
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Get Directions
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Book Appointment
                  </button>
                </div>

                {/* Data Source */}
                <div className="mt-3 text-xs text-gray-400 text-center">
                  Source: {hospital.source === 'openstreetmap' ? 'OpenStreetMap' : 
                           hospital.source === 'mock' ? 'Sample Data' : 'Database'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHospitals.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No hospitals found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or expanding the search radius.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedSpecialty('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Clinics;
