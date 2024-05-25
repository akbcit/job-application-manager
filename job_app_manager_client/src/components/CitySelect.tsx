import { Typography } from '@mui/material';
import AsyncSelect from 'react-select/async';
import axiosInstance from '../network/axiosInstance';
import { City } from '../clientModels/city.model';
import "../styles/CitySelect.scss";
import { useJobQueryEditorState } from '../localStates/jobQueryEditorState';
import { SingleValue } from 'react-select';

const fetchCities = async (inputValue: string) => {
  if (!inputValue) return [];
  const response = await axiosInstance.get(`/misc/cities/search?q=${inputValue}&limit=10`);
  const cities = response.data;
  return cities.map((city: City) => ({
    label: city.city_name,
    value: city,
  }));
};

export const CitySelect: React.FC = () => {
  const { jobQueryEditorState, setJobQueryEditorState } = useJobQueryEditorState();

  const handleChange = (newCity: SingleValue<{ label: string; value: City }>) => {
    setJobQueryEditorState((prevState) => ({
      ...prevState,
      selectedCity: newCity ? newCity.value : null,
    }));
  };

  return (
    <div id="city-select-master-container">
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={fetchCities}
        onChange={handleChange}
        value={jobQueryEditorState.selectedCity ? { label: jobQueryEditorState.selectedCity.city_name, value: jobQueryEditorState.selectedCity } : null}
        inputId="city-select"
        placeholder="Start typing to find a city..."
        isClearable
      />
      {jobQueryEditorState.selectedCity && jobQueryEditorState.selectedCity.city_country_name && (
        <Typography variant="h6" className="city-country-name">
          {jobQueryEditorState.selectedCity.city_country_name}
        </Typography>
      )}
    </div>
  );
};
