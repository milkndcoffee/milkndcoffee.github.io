/*TODO: 
  Priority (lowest to highest) : !, !!, !!!
  Optional Priority : ~

  
  [6/8 !!] function getItemData() : do the rest for other clothing items
  [6/12 !] create images for each item.

  //Opt
  [6/19 ~ !] add search by price instead of default format
  [6/17 ~ !!] add sizing in the db and functions :')
  [6/12 ~ !] edit appended DOM JSON data spacing.
  

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

function jsonToObjByType(jsonData) {
  var jsonTypeObj = new Object();

  /* 
    breaking apart the json file data so that we can section the data based on
    the 'type' of the 'accessories' article.
  */
  for (i in jsonData.items) {
    if (jsonData.items[i].type in jsonTypeObj) {
      for (const typeProp in jsonTypeObj) {
        if (typeProp == jsonData.items[i].type) {
          var newObj = {
            id: jsonData.items[i].id,
            name: jsonData.items[i].name,
            description: jsonData.items[i].description,
            price: jsonData.items[i].price,
            imgSrc: jsonData.items[i].img
          };
          jsonTypeObj[typeProp].push(newObj);
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
        id: jsonData.items[i].id,
        name: jsonData.items[i].name,
        description: jsonData.items[i].description,
        price: jsonData.items[i].price,
        imgSrc: jsonData.items[i].img
      });
      jsonTypeObj[jsonData.items[i].type] = typeArr;
    }
  } //console.log("END RESULT:", jsonTypeObj);
  return jsonTypeObj;
}

//FETCH CODE
function getItemData(x) {
  var data = "https://milkndcoffee.github.io/merch-shop/db/clothes-db.json";

  if (x == "accessories") {
    //"FETCH ACCS."
    let accsData = "";
    fetch(data)
      .then(response => response.json())
      .then(json => {
        accsData = json.product[2];
        console.log('accessories JSON :', accsData)

        var accsJsonToObj = jsonToObjByType(accsData);
        appendDataToBody(accsJsonToObj, "accs");
      });
  } else if (x == "tops") {
    //"FETCH TOPS"
    let topsData = "";
    fetch(data)
      .then(response => response.json())
      .then(json => {
        topsData = json.product[0];
        console.log('tops JSON :', topsData)

        var topsJsonToObj = jsonToObjByType(topsData);
        appendDataToBody(topsJsonToObj, "tops");
      });
  } else if (x == "bottoms") {
    //"FETCH BOTTOMS"
    let bottData = "";
    fetch(data)
      .then(response => response.json())
      .then(json => {
        bottData = json.product[1];
        console.log('bottoms JSON :', bottData);

        var bottsJsonToObj = jsonToObjByType(bottData);
        appendDataToBody(bottsJsonToObj, "bottoms");

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

  if (itemImg == "") {
    console.log("img currently does not exist :", itemImg);
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
  } else if (location == "bottoms") {
    var mainInBody = document.getElementById("main-bottoms");
    var constructedData = createSectionData(data);

    for (i = 0; i < constructedData.length; i++) {
      mainInBody.appendChild(constructedData[i]);
    }
  } else if (location == "tops") {
    var mainInBody = document.getElementById("main-tops");
    var constructedData = createSectionData(data);

    for (i = 0; i < constructedData.length; i++) {
      mainInBody.appendChild(constructedData[i]);
    }
  }
}

function getSectData(){

}


/*    -------------------
      /lookbook functions
      -------------------    */

function fetchLookbook() {
  var url = "https://milkndcoffee.github.io/merch-shop/db/lookbook-db.json";
  let idUrl = "https://milkndcoffee.github.io/merch-shop/db/clothes-db.json"
  let jsonData = "";
  fetch(url)
    .then(response => response.json())
    .then(json => {
      jsonData = json.lookbook;
      console.log('lookbook json :', jsonData);
      var arrOfObjIds = new Array;
      
      fetch(idUrl)
      .then(response => response.json())
      .then(json => {
        clothData = json;
        var obj1 = jsonToObjByType(clothData.product[0]);
        var obj2 = jsonToObjByType(clothData.product[1]);
        var obj3 = jsonToObjByType(clothData.product[2]);
        let objAll = {...obj1, ...obj2, ...obj3};
        //var arrOfObjIds = new Array;
        for (const c in objAll){
          for (i=0; i<objAll[c].length; i++){
            arrOfObjIds.push({
              id: objAll[c][i].id,
              name: objAll[c][i].name,
              article: c
            });
          }
        }
        console.log(arrOfObjIds);
        appendSlidesFromDb(jsonData, arrOfObjIds);
        onLoadThisSlide(1);
      });
      
    });
}

function createSlideDOM(objSlide, current, max, arrOfObjIds) {
  /* <div class="section-slide fade">
          <div class="current-slide-indicator">2 / 3</div>
          <img class="placeholder-clothes" src="img_snow_wide.jpg" >
          <figcaption class="lookbook-cap">Caption Two</figcaption>
        </div>
      </div>
  */
  var slideDOM = document.createElement("section");
  var currentSlideIndDOM = document.createElement("div");
  var imgDOM = document.createElement("img");
  var imgCapDOM = document.createElement("figcaption");

  //for clothing id's
  var h2ListDOM = document.createElement("h2");
  var ulListDOM = document.createElement("ul");
  //var liListDOM = document.createElement("li");

  //class assign
  slideDOM.className = "section-slide";
  currentSlideIndDOM.className = "current-slide-indicator";
  imgDOM.className = "placeholder-clothes";
  imgCapDOM.className = "lookbook-cap";

  //passing values from current db object
  imgDOM.src = objSlide.imgSrc;
  imgCapDOM.innerHTML = objSlide.imgCap;
  currentSlideIndDOM.innerText = current + " / " + max;
  h2ListDOM.innerText = "cop the style:"
  h2ListDOM.style.fontSize = "17pt";

 //constructing our list
  for (var i=0; i< objSlide.itemIds.length; i++){
    for (var arrIndex=0; arrIndex < arrOfObjIds.length; arrIndex++){
      if (objSlide.itemIds[i] == arrOfObjIds[arrIndex].id){
        console.log("objSlide ID:", arrOfObjIds[arrIndex].id, arrOfObjIds[arrIndex].name);
        var tempLiListDOM = document.createElement("li");
        tempLiListDOM.innerHTML = "<b>"+arrOfObjIds[arrIndex].article+ "</b>: " +arrOfObjIds[arrIndex].name;
        tempLiListDOM.className = "lookbook-list";
        ulListDOM.appendChild(tempLiListDOM);
      }
    }
  }

  //constructing the elements together
  slideDOM.appendChild(currentSlideIndDOM);
  slideDOM.appendChild(imgDOM);
  slideDOM.appendChild(imgCapDOM);
  slideDOM.appendChild(h2ListDOM);
  slideDOM.appendChild(ulListDOM);
  
  return (slideDOM);
}

function constructSlidesFromDb(arrayData, arrOfObjIds) {
  var arrSlideDOM = [];
  for (var i = 0; i < arrayData.length; i++) {
    console.log("constructed slide #:", i);
    //arrSlideDOM[i] = createSlideDOM(arrayData[i], (i + 1), arrayData.length, arrOfObjIds);
    arrSlideDOM.push(createSlideDOM(arrayData[i], (i + 1), arrayData.length, arrOfObjIds));
    //console.log("constructed slide #:", arrSlideDOM);
  }
  return arrSlideDOM;
}

function appendSlidesFromDb(arrayData, arrOfObjIds) {
  var slideShowSectInHTML = document.getElementById("slideshow-sect");
  var arrayDOM = constructSlidesFromDb(arrayData, arrOfObjIds);

  for (i = 0; i < arrayDOM.length; i++) {
    console.log("arrayDOM: ",arrayDOM[i], arrayDOM.length);
    slideShowSectInHTML.appendChild(arrayDOM[i]);
  }
}

/*  
slideshow functions
to allow switching through the many pictures in the lookbook.
*/
function onLoadThisSlide(slide) {
  //initializing the slide index variable.
  displaySlideshow(slideIndex = slide);
}

function changeSlide(n) {
  var maxSlides = document.getElementsByClassName("section-slide").length;

  //limiting the slideIndex to the length of the maxSlides.
  if (slideIndex <= 0) {
    slideIndex = maxSlides;
  } else if (slideIndex > maxSlides) {
    slideIndex = 1;
  }

  var result = (slideIndex += n);
  displaySlideshow(result);
}

function displaySlideshow(currSlideIndex) {
  var slideSects = document.getElementsByClassName("section-slide");
  var slidesMax = slideSects.length;

  if (currSlideIndex > slidesMax) {
    //RESETING after hitting max length
    currSlideIndex = 1;
  } else if (currSlideIndex <= 0) {
    currSlideIndex = slidesMax;
  }
  for (i = 0; i < (slideSects.length); i++) {
    //here we are hiding each slide
    slideSects[i].style.display = "none";
  }
  slideSects[currSlideIndex - 1].style.display = "block"; //display current slideSection 
}

