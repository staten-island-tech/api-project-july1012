import "./style.css";

async function data() {
  let get = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
  let results = await get.json();
  console.log(results);
}

data();
