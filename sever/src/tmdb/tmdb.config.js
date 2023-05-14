require("dotenv").config();
const BASETMDBURL = process.env.BASETMDBURL;
const keyTMDB = process.env.keyTMDB;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  console.log(`${BASETMDBURL}${endpoint}?api_key=${keyTMDB}&${qs}`);
  return `${BASETMDBURL}${endpoint}?api_key=${keyTMDB}&${qs}`;
};

export default { getUrl };
