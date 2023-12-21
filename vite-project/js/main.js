import "../css/style.css";

const url = 'http://makeup-api.herokuapp.com/api/v1/products.json';
async function data(url) {
  let get = await fetch(url);
  let results = await get.json();
  console.log(results);
  return results.json;
}
data(url);

const DOMSelectors = {
  header: document.querySelector(".header"),
  form: document.querySelector("#form"),
  brand:document.querySelector("#brand"),
  product: document.querySelector("#product"),
  ten: document.querySelector(".ten"),
  twenty: document.querySelector(".twenty"),
  fifty: document.querySelector(".fifty"),
};

let prices = [DOMSelectors.ten, DOMSelectors.twenty, DOMSelectors.fifty]

prices.forEach((btn)=> btn.addEventListener("click",function(){
  const money = btn.textContent;
  console.log(money);
  
}))



