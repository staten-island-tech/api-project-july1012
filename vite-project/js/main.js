import "../css/style.css";
let dataa = [];

const url = "http://makeup-api.herokuapp.com/api/v1/products.json";
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
};

function insert(cards) {
  const top_items = cards.sort((a, b) => a.price - b.price).splice(928);
  console.log(top_items);
  top_items.forEach((item) => {
    DOMSelectors.cardsholder.insertAdjacentHTML(
      "beforeend",
      `<div class="cards">
       <h2 class="companyname">${item.brand}:</h2>
      <h3 class="title">${item.name}</h3>
      <img src= "${item.api_featured_image}" class="pic">
     <h4 class="desc">$${item.price}</h4>
      </div>
       `
    );
  });
}

function getData(dataa) {
  DOMSelectors.form.addEventListener("submit", function (event) {
    event.preventDefault();
    let bundle = [];
    let type = document.querySelectorAll('input[name="type"]:checked');
    let tipuhs = [];
    let random = "";

    type.forEach((twaipe) => tipuhs.push(twaipe.id));

    //randomize selections of products
    tipuhs.forEach(function (type) {
      console.log(type);
      dataa.forEach((makeup) => console.log(makeup));
      let newtype = dataa.filter((makeup) => makeup.product_type === type);
      // console.log('Filtered Data:', newtype);
      random = Math.floor(Math.random() * newtype.length);
      bundle.push(newtype[random]);
    });
    console.log("bundle", bundle);
    bundle.forEach((basket) => {
      DOMSelectors.formanswer.insertAdjacentHTML(
        "beforeend",
        `<div class="cards">
       <h2 class="companyname">${basket.brand}:</h2>
      <h3 class="title">${basket.name}</h3>
      <img src= "${basket.api_featured_image}" class="pic">
     <h4 class="desc">$${basket.price}</h4>
      </div>
       `
      );
    });
  });
}

//check all and uncheck all button
let checkAll = false;
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
