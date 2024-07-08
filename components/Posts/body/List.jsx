function List() {
    return (  
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
      <div className="w-1/2">
        <img
          src="https://example.com/apartment-image.jpg" // Replace with actual image URL
          alt="Banipark Apartment"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Banipark Apartment</h2>
        <p className="text-gray-600 mb-4">From Golden Oak, Banipark, Jaipur</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h3>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17 3a2 2 0 00-2-2H5a2 2 0 00-2 2v14l7-3 7 3V3zM7 7a1 1 0 011-1h4a1 1 0 010 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 010 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>2 Bedrooms</span>
          </div>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a2 2 0 012 2v4a2 2 0 11-4 0V4a2 2 0 012-2zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM7 14a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm-4 2a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>2 Bathrooms</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 2a2 2 0 012 2v2a2 2 0 11-4 0V4a2 2 0 012-2zm10 0a2 2 0 012 2v14a2 2 0 11-4 0V4a2 2 0 012-2zm-8 4a2 2 0 00-2 2v12a2 2 0 104 0V8a2 2 0 00-2-2zm-2 2a2 2 0 00-2 2v10a2 2 0 104 0V12a2 2 0 00-2-2zm12 0a2 2 0 00-2 2v10a2 2 0 104 0V12a2 2 0 00-2-2zm-2 2a2 2 0 00-2 2v6a2 2 0 104 0v-6a2 2 0 00-2-2zm-8 0a2 2 0 00-2 2v6a2 2 0 104 0v-6a2 2 0 00-2-2z" />
            </svg>
            <span>2 Kitchen</span>
          </div>
        </div>
        
        <p className="text-gray-700 mt-4">{`Our place is located in the heart of Jaipur. Quaint Stay Jaipur apartment offers luxe amenities from a smart television set to a fully equipped kitchen. It is sure to bring in vacation vibes with its muted neutral tones teamed with soft hues & floral motifs handprinted on the walls, inspired by the pink city.`}</p>
      </div>
    </div>
    );
}

export default List;