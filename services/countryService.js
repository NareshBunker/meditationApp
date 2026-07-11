// services/countryService.js


export const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      
      if (response.ok) {
        const data = await response.json();
        // Map through the array of country objects to extract only the common name string
        return data.map(country => country.name.common).sort();
      } else {
        throw new Error(`Failed to fetch countries. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };