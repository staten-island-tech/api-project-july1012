import "../css/style.css";
let dataa = [];

const url = "http://makeup-api.herokuapp.com/api/v1/products.json";
async function data(url) {
  try {
    const response = await fetch(url);
    dataa = await response.json();
    console.log(dataa);
  } catch (error) {
    console.log(error);
  }

  // let results = await response.json();
  // console.log(results);
  // return results.json;
}
data(url);

const DOMSelectors = {
  header: document.querySelector(".header"),
  form: document.querySelector("#form"),
  types: document.querySelectorAll('input[name="type"]'),
  checkAll: document.querySelector("#checkAll"),
  // brand: document.querySelector("#brand"),
  // product: document.querySelector("#product"),
  // ten: document.querySelector(".ten"),
  // twenty: document.querySelector(".twenty"),
  // fifty: document.querySelector(".fifty"),
};

let checkAll = false;

DOMSelectors.form.addEventListener("submit", function (event) {
  event.preventDefault();
  let bundle = [];
  let type = document.querySelectorAll('input[name="type"]:checked');
  let tipuhs = [];
  let random = "";

  type.forEach((twaipe) => tipuhs.push(twaipe.id));

  //randomize selections
  tipuhs.forEach(function (type) {
    console.log(type);
    let newtype = dataa.filter((makeup) => makeup.product_type === type);
    console.log(newtype);
    random = Math.floor(Math.random() * newtype.length);
    bundle.push(newtype[random]);
  });
  console.log("bundle", bundle);
});

DOMSelectors.checkAll.addEventListener("click", function (event) {
  event.preventDefault();
  if (checkAll === false) {
    DOMSelectors.types.forEach((checkbox) => {
      checkbox.checked = true;
    });
    checkAll = true;
    DOMSelectors.checkAll.innerHTML = "Uncheck All";
  } else if (checkAll === true) {
    DOMSelectors.types.forEach((checkbox) => {
      checkbox.checked = false;
    });
    checkAll = false;
    DOMSelectors.checkAll.innerHTML = "Check All";
  } else {
    console.log("Error checking all");
  }
});
