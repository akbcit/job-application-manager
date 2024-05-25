import countries_cities from "../misc/countries_cities_raw.json" assert { type: "json" };
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Function to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractAllCities = () => {
  let countries = [];
  countries = countries_cities.map((item) => {
    return {
      country_name: item.name,
      country_iso3: item.iso3,
      country_region: item.region,
      country_subregion: item.subregion,
      country_cities: item.cities,
      country_currency: item.currency,
    };
  });

  const cities = [];
  countries.forEach((country) => {
    if (country.country_cities && country.country_cities.length > 0) {
      country.country_cities.forEach((city) => {
        const city_obj = {
          city_name: city.name,
          city_id: city.id,
          city_country_name: country.country_name,
          city_country_iso3: country.country_iso3,
          city_country_region: country.country_region,
          city_country_subregion: country.country_subregion,
          city_country_currency: country.country_currency,
        };
        cities.push(city_obj);
      });
    }
  });

  // Define the output file path
  const outputFilePath = path.join(__dirname, "../misc/cities.json");

  // Save the cities array as a JSON file
  fs.writeFileSync(outputFilePath, JSON.stringify(cities, null, 2), "utf-8");
};

extractAllCities();
