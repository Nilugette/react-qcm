// Copied from
// https://stackoverflow.com/questions/22707475/how-to-make-a-promise-from-settimeout
// BE CAREFULL WITH THIS CODE
function later(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}

export default id => {
  let url = process.env.PUBLIC_URL + "/data/qcm.json";
  if (Math.random() > 0.99) {
    url = "";
  }

  return later(Math.floor(Math.random() * 1000))
    .then(_ => fetch(url))
    .then(r => r.json())
    .then(data => {
      return data.qcm.find(e => e.id === id);
    });
};
