const url = process.env.PUBLIC_URL + "/data/qcm.json";
export default genreId => {
  return fetch(url)
    .then(r => r.json())
    .then(data => data.qcm.filter(q => q.genre_id === parseInt(genreId)));
};
