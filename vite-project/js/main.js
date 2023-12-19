import "../css/style.css";

const url = 'http://makeup-api.herokuapp.com/api/v1/products.json';
async function data(url) {
  let get = await fetch(url);
  let results = await get.json();
  console.log(results);
  return results.json;
}
data(url);


