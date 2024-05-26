export const convertQueryObjToQueryString = (queryObj) => {
  return `${queryObj.jobTitle} in ${queryObj.city}, ${queryObj.country}`;
};
