import React, { useState } from 'react';
import { Typography } from '@mui/material';
import AsyncSelect from 'react-select/async';
import axiosInstance from '../network/axiosInstance';
import { City } from '../clientModels/city.model';
import "../styles/CitySelect.scss";

interface CitySelectProps {
  onCitySelect: (city: City | null) => void;
}

const fetchCities = async (inputValue: string) => {
  if (!inputValue) return [];
  const response = await axiosInstance.get(`/misc/cities/search?q=${inputValue}&limit=10`);
  const cities = response.data;
  return cities.map((city: City) => ({
    label: city.city_name,
    value: city,
  }));
};

export const CitySelect: React.FC<CitySelectProps> = ({ onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState<{ label: string, value: City } | null>(null);

  const handleChange = (selectedOption: { label: string, value: City } | null) => {
    setSelectedCity(selectedOption);
    onCitySelect(selectedOption ? selectedOption.value : null);
  };

  return (
    <div id="city-select-master-container">
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={fetchCities}
        onChange={handleChange}
        value={selectedCity}
        inputId="city-select"
        isClearable
        styles={{
          control: (base) => ({
            ...base,
            width: '10rem', // Fixed width for the select input
          }),
        }}
      />
      {selectedCity && selectedCity.value.city_country_name && (
        <Typography variant="h6" className="city-country-name">
          {selectedCity.value.city_country_name}
        </Typography>
      )}
    </div>
  );
};
