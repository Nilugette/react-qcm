const url = process.env.PUBLIC_URL + "/data/qcm.json";
export default (genreId = null) => {
  return fetch(url)
    .then(r => r.json())
    .then(data => {
      return genreId === null
        ? data.qcm
        : data.qcm.filter(q => q.genre_id === parseInt(genreId));
    });
};
