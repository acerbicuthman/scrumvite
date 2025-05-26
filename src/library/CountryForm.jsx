import React, { useState, useEffect } from 'react';

function CountryForm({value, onChange, disabled}) {
  const [countries, setCountries] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        // Sort countries alphabetically by common name
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);


  return (
    <div className='py-4 w-1/2'>
        <label htmlFor="country" className='text-white/50'>Country</label>
        <select id="country"
        l     className="bg-white bg-opacity-10 w-full rounded-sm p-2 text-white"
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}>
          <option value="" className='bg-white bg-opacity-10'>Select a country</option>
          {countries.map((country) => (
            <option className='bg-white bg-opacity-10' key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>

   
    </div>
  );
}

export default CountryForm;