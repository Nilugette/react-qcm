const url = process.env.PUBLIC_URL + "/data/qcm.json";
export default genreId => {
  return fetch(url)
    .then(r => r.json())
    .then(data => data.genres.find(g => g.id === parseInt(genreId)));
};
