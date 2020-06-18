/*TODO: 
  Priority (lowest to highest) : !, !!, !!!
  Optional Priority : ~

  [6/17 ~!!] add sizing in the db and functions :')
  [6/8 !!] function getItemData() : do the rest for other clothing items
  [6/12 ~ !] edit appended DOM JSON data spacing.
  [6/12 !] create images for each item.
  

  DONE [6/12]function appendSectionData : add onto body multiple DOM elements to <section>.
  DONE [6/12] html data function - finish appenSectionData function so that iit displays the fetched json file content.
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




/*    ------------------
      /shop/.. functions
      ------------------    */
function getItemData(x) {

  //FETCH ACCESSORIES

  if (x == "accessories") {
    let accsData = "";
    data = "https://milkndcoffee.github.io/merch-shop/db/clothes-db.json"
    fetch(data)
      .then(response => response.json())
      .then(json => {
        accsData = json.product[2];
        console.log('accessories JSON :', accsData)

        var accsTypeObj = new Object();

        /* 
          breaking apart the json file data so that we can section the data based on
          the 'type' of the 'accessories' article.
        */
        for (i in accsData.items) {
          if (accsData.items[i].type in accsTypeObj) {
            for (const typeProp in accsTypeObj) {
              if (typeProp == accsData.items[i].type) {
                var newObj = {
                  id: accsData.items[i].id,
                  name: accsData.items[i].name,
                  description: accsData.items[i].description,
                  price: accsData.items[i].price,
                  imgSrc: accsData.items[i].img
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
              id: accsData.items[i].id,
              name: accsData.items[i].name,
              description: accsData.items[i].description,
              price: accsData.items[i].price,
              imgSrc: accsData.items[i].img
            });
            accsTypeObj[accsData.items[i].type] = typeArr;
          }
        } console.log("END RESULT:", accsTypeObj);

        appendDataToBody(accsTypeObj, "accs");

      });
    //console.log(accessories);
  } else if (x == "tops") {
    //FUTURE TODO::

  } else if (x == "bottoms") {
    
    //"FETCH BOTTOMS"
    
    let bottData = "";
    data = "https://milkndcoffee.github.io/merch-shop/db/clothes-db.json"
    fetch(data)
      .then(response => response.json())
      .then(json => {
        bottData = json.product[1];
        console.log('accessories JSON :', bottData);

        var bottTypeObj = new Object();

        /* 
          breaking apart the json file data so that we can section the data based on
          the 'type' of the 'accessories' article.
        */
        for (i in bottData.items) {
          if (bottData.items[i].type in bottTypeObj) {
            for (const typeProp in bottTypeObj) {
              if (typeProp == bottData.items[i].type) {
                var newObj = {
                  id: bottData.items[i].id,
                  name: bottData.items[i].name,
                  description: bottData.items[i].description,
                  price: bottData.items[i].price,
                  imgSrc: bottData.items[i].img
                };
                bottTypeObj[typeProp].push(newObj);
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
              id: bottData.items[i].id,
              name: bottData.items[i].name,
              description: bottData.items[i].description,
              price: bottData.items[i].price,
              imgSrc: bottData.items[i].img
            });
            bottTypeObj[bottData.items[i].type] = typeArr;
          }
        } console.log("END RESULT:", bottTypeObj);

        appendDataToBody(bottTypeObj, "bottoms");

      });

  } else {
    console.log("error");
  }
}

function createFigureData(sectionId, itemImg, itemName, itemPrice) {
  //element initialization
  var figureElement = document.createElement("figure");
  var imgElement = document.createElement("img");
  var figcaptionElement = document.createElement("figcaption");

  //node construction/initialization
  var sectId = sectionId; //unused atm but might be utilized later on for creating an item popup.
  var itemImg = itemImg;
  var itemName = itemName;
  var itemPrice = itemPrice;
  var itemCap = itemName + " $" + itemPrice;

  //applying the nodes to the objects
  //imgElement.src = "../template_img.src";
  imgElement.className = "placeholder-clothing-piece";
  figcaptionElement.innerHTML = itemCap;

  if (itemImg == ""){
    console.log("img currently does not exist");
    imgElement.src = "not-found.png";
  } else {
    imgElement.src = itemImg;
    console.log("img exists");
  }

  //constructing the elements together
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);

  return figureElement; //we are going to return this constructed dom element to use for appending towards their desired sects
}

function createSectionData(dataObj) {
  var sectElementArr = new Array();
  var loopCount = 0;

  //sectioning off based of type
  for (const dataType in dataObj) {
    var tempSectEl = document.createElement("section");
    var tempHeaderEl = document.createElement("header");
    var tempH2El = document.createElement("h2");

    //header construction
    tempH2El.innerText = dataType.toLocaleLowerCase();
    tempHeaderEl.appendChild(tempH2El);
    tempSectEl.appendChild(tempHeaderEl);

    //going of the amount of items in a type
    for (i = 0; i < dataObj[dataType].length; i++) {
      //for each 'type' of this 'object' do this:

      var figElement = createFigureData(
        dataObj[dataType][i].id,
        dataObj[dataType][i].imgSrc,
        dataObj[dataType][i].name,
        dataObj[dataType][i].price
      );

      tempSectEl.appendChild(figElement);
      tempSectEl.className = "clothing-articles";
    }

    //storing it into the array we are going to be utilizing for appending
    sectElementArr[loopCount] = tempSectEl;
    loopCount++;
  }

  return sectElementArr; //we are going to return an array of constructed DOM elements
}

function appendDataToBody(data, location) {
  if (location == 'accs') {
    var mainInBody = document.getElementById("main-accs");
    var constructedData = createSectionData(data);

    for (i = 0; i < constructedData.length; i++) {
      mainInBody.appendChild(constructedData[i]);
    }
  } else if (location == "bottoms"){
    var mainInBody = document.getElementById("main-bottoms");
    var constructedData = createSectionData(data);

    for (i = 0; i < constructedData.length; i++) {
      mainInBody.appendChild(constructedData[i]);
    }
  }
}
