async function data() {
  let get = await fetch(
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=lipstick&price_less_than=10"
  );
  let results = await get.json();
  console.log(results);
}

data();
