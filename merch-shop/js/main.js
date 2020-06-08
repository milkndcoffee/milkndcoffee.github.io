/*TODO: 
  [6/6]function appendSectionData : add onto body multiple DOM elements to <section>.
  [6/8] function getItemData() : do the rest for other clothing items
  [6/8] html data function - finish appenSectionData function so that iit displays the fetched json file content.

  DONE [6/8]:: function getItemData (6/6): add existing data onto to existing array type
*/

//NAVBAR
function openBar() {
  navBar = document.getElementById("nav-id");
  if (screen.width <= 769) {
    navBar.style.width = "80%";
  } else {
    //to allow reclicking on the navbar button to open and close
    if (navBar.classList.contains("active-bar")) {
      navBar.classList.remove("active-bar");
      closeBar();
    } else {
      navBar.classList.add("active-bar");
      navBar.style.width = "15%";
    }
  }
}

function closeBar() {
  document.getElementById("nav-id").style.width = "0";
}

//SHOP NAVBAR
function openShopNav() {
  shopNav = document.getElementById("shop-nav");
  shopButton = document.getElementById("shop-button-id");
  if (shopButton.classList.contains("active-shop-button")) {
    shopButton.classList.remove("active-shop-button");
    shopNav.style.height = "0";
    shopNav.style.opacity = "0";
  } else {
    shopNav.style.height = "30%";
    shopNav.style.opacity = "1";
    shopButton.classList.add("active-shop-button");
  }
}

/*
  create a template that will take in several information in regards to
  item article, so that each data broken down can be appended onto
  the <main> element within the html.

  <section class="clothing-articles">
    <header><h2 id="item-h2"></h2></header>
    <figure>
      <img id="item-img"/>
      <figcaption id="item-figcaption"></figcaption>
    </figure>
  </section>
*/
function appendSectionData(sectionId, itemTitle, itemImg, itemName, itemPrice) {

  //element initialization
  var sectionElement = document.createElement("section");
  var headerElement = document.createElement("header");
  var h2Element = document.createElement("h2");
  var figureElement = document.createElement("figure");
  var imgElement = document.createElement("img");
  var figcaptionElement = document.createElement("figcaption");

  //node construction/initialization
  //template
  var itemTitle = itemTitle;
  var itemImg = itemImg;
  var itemName = itemName;
  var itemPrice = itemPrice;
  var itemTest = "test";
  var itemCap = itemName + itemPrice;


  //applying the nodes to the objects
  //imgElement.src = "../template_img.src";
  sectionElement.className = "clothing-articles";
  imgElement.className = "placeholder-clothing-piece";
  imgElement.src = "not-found.png";
  h2Element.innerText = itemTest;
  figcaptionElement.innerHTML = itemTest;

  //constructing the elements together
  var mainInBody = document.getElementById("main-accs");
  mainInBody.appendChild(sectionElement);
  sectionElement.appendChild(headerElement);
  headerElement.appendChild(h2Element);
  sectionElement.appendChild(figureElement);
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);



}


//-- /shop/.. functions
function getItemData(x) {

  //dom testing

  //declaration of variables
  let accessories = "";
  if (x == "accessories") {
    let accessoriesData = "";
    var accs = "";
    data = "https://milkndcoffee.github.io/merch-shop/db/clothes-db.json"
    fetch(data)
      .then(response => response.json())
      .then(json => {
        var jsonData = json;
        var jsonString = JSON.stringify(json.product[2]);
        accs = jsonString;
        accessoriesData = json.product[2];
        console.log('accessories :', accessoriesData)

        var count = 1;
        var beanieC = 0;
        var dadC = 0;
        var accsTypeObj = new Object();
        var accsArr = new Array();

        /* 
          breaking apart the json file data so that we can section the data based on
          the 'type' of the 'accessories' article.
        */
        for (i in accessoriesData.items) {
          if (accessoriesData.items[i].type in accsTypeObj) {
            for (const typeProp in accsTypeObj) {
              if (typeProp == accessoriesData.items[i].type) {
                var newObj = {
                  id: accessoriesData.items[i].id,
                  name: accessoriesData.items[i].name,
                  description: accessoriesData.items[i].description,
                  price: accessoriesData.items[i].price,
                  imgSrc: accessoriesData.items[i].img
                };
                accsTypeObj[typeProp].push(newObj);
              }
            }
          } else {
            /*
              the 'type' of the accessories does not exist within in the accessories object so we create one
              we create the 'type' as the property and 
              the id is assigned as an array containing an object of the fetched json data 
            */
            var typeArr = new Array();
            typeArr.push({
              id: accessoriesData.items[i].id,
              name: accessoriesData.items[i].name,
              description: accessoriesData.items[i].description,
              price: accessoriesData.items[i].price,
              imgSrc: accessoriesData.items[i].img
            });
            accsTypeObj[accessoriesData.items[i].type] = typeArr;
          }
        } console.log("END RESULT:", accsTypeObj);

        var article = JSON.stringify(json.product[2].article);
        let clothes = JSON.stringify(json.product[2].items);
        console.log(article);

        console.log(clothes);

      });
    //console.log(accessories);
  } else if (x == "tops") {
    //FUTURE TODO::
  } else if (x == "bottoms") {
    //FUTURE TODO::
  } else {
    console.log("error");
  }

}

/*
function getItemData() {
  let accessories = "";
  var accs = "";
  data = "https://milkndcoffee.github.io/merch-shop/db/clothes-db.json"
  fetch(data)
    .then(response => response.json())
    .then(json => {
      var jsonString = JSON.stringify(json.product[2]);
      accs = jsonString;
      accessories = jsonString;
      console.log(jsonString);
      console.log(json.product[2]);
      console.log(accessories);
    });
  console.log(accessories);
}
*/