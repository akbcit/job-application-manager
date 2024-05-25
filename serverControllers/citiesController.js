import cities from "../data/misc/cities.json" assert { type: "json" };

export const citySearch = async (req, res) => {
  const search = req.query.q || '';
  const limit = parseInt(req.query.limit, 10) || 10;

  const filteredCities = cities
    .filter((city) => city.city_name.toLowerCase().startsWith(search.toLowerCase()))
    .slice(0, limit);

  res.status(200).send(filteredCities);
};
