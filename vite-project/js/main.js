import "../css/style.css";
let dataa = [];

const url = "https://makeup-api.herokuapp.com/api/v1/products.json";
async function data(url) {
  try {
    const response = await fetch(url);
    const dataa = await response.json();
    insert(dataa);
    console.log("Data:", dataa[0]);
    getData(dataa);
  } catch (error) {
    console.log(error);
  }
}
data(url);

const DOMSelectors = {
  header: document.querySelector(".header"),
  form: document.querySelector("#form"),
  types: document.querySelectorAll('input[name="type"]'),
  checkAll: document.querySelector("#checkAll"),
  cardsholder: document.querySelector("#cards-holder"),
  formanswer: document.querySelector("#formanswer"),
  clear: document.querySelector("#clear"),
  bundleHeader: document.querySelector("#bundleHeader"),
  chckbx: document.querySelector(".chckbx"),
};
let bundle = [];

DOMSelectors.clear.addEventListener("click", function (event) {
  event.preventDefault;
  bundle = [];
  DOMSelectors.formanswer.innerHTML = "";
});
function inject(products, product) {
  products.insertAdjacentHTML(
    "beforeend",
    `<div class="cards">
     <h2 class="companyname">${product.brand}:</h2>
    <h3 class="title">${product.name}</h3>
    <img src= "${product.api_featured_image}" alt="${product.name}" class="pic">
   <h4 class="desc">$${product.price}</h4>
    </div>
     `
  );
}
function insert(cards) {
  const top_items = cards.sort((a, b) => a.price - b.price).splice(928);
  console.log(top_items);
  top_items.forEach((item) => {
    inject(DOMSelectors.cardsholder, item);
  });
}

function getData(dataa) {
  DOMSelectors.form.addEventListener("submit", function (event) {
    event.preventDefault();
    bundle = [];
    let type = document.querySelectorAll('input[name="type"]:checked');
    let tipuhs = [];
    let random = "";

    type.forEach((twaipe) => tipuhs.push(twaipe.id));

    //randomize selections of products
    tipuhs.forEach(function (type) {
      console.log(type);
      dataa.forEach((makeup) => console.log(makeup));
      let x = dataa.filter((makeup) => makeup.product_type === type);
      let newURL = `https://makeup-api.herokuapp.com/api/v1/products.json&product_type= ${x}`;
      // console.log('Filtered Data:', newtype);
      random = Math.floor(Math.random() * x.length);
      bundle.push(x[random]);
    });
    console.log("bundle", bundle);
    DOMSelectors.bundleHeader.innerHTML =
      "Here is your personalized makeup bundle!";
    bundle.forEach((item) => {
      inject(DOMSelectors.formanswer, item);
    });
  });
}

//check all and uncheck all button
let checkAll = false;
DOMSelectors.checkAll.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("checked");
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
