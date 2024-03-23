let htmlElement = document.querySelector("html");
let menuOpenerElement = document.querySelector("header nav .hamburger");
let closeNavMenuElement = document.querySelector(".menu-popup .close-button");
let headerElement = document.querySelector("header");
/* #region  mobile/secondary navigation menu */
function openNavMenu() {
  let navMenuElement = document.querySelector(".menu-popup");
  navMenuElement.classList.remove("hidden");
  setTimeout(() => navMenuElement.classList.remove("hidden-content"), 300);
}
function closeNavMenu() {
  let navMenuElement = document.querySelector(".menu-popup");
  navMenuElement.classList.add("hidden-content");
  setTimeout(() => navMenuElement.classList.add("hidden"), 200);
}
menuOpenerElement.addEventListener("click", openNavMenu);
closeNavMenuElement.addEventListener("click", closeNavMenu);
/* #endregion */

/* #region  changing header on scroll */
if (window.scrollY == 0) {
  //user is at the top of the page; no need to show the back to top button
  headerElement.classList.remove("scroll");
} else {
  headerElement.classList.add("scroll");
}
window.addEventListener("scroll", function () {
  if (window.scrollY == 0) {
    //user is at the top of the page; no need to show the back to top button
    headerElement.classList.remove("scroll");
  } else {
    headerElement.classList.add("scroll");
  }
});
/* #endregion */

/* #region  target menus site */
if (htmlElement.classList.contains("menus")) {
  let menusNavElement = document.querySelector("html.menus .section-1 nav");
  let selectMenu = function (menu) {
    menusNavElement.className = "menu-nav";
    setTimeout(() => menusNavElement.classList.add(menu), 200);
  };
  menusNavElement
    .querySelector(".breakfast")
    .addEventListener("click", () => selectMenu("breakfast"));
  menusNavElement
    .querySelector(".lunch")
    .addEventListener("click", () => selectMenu("lunch"));
  menusNavElement
    .querySelector(".dinner")
    .addEventListener("click", () => selectMenu("dinner"));
  menusNavElement
    .querySelector(".drinks")
    .addEventListener("click", () => selectMenu("drinks"));

  let allDishElements = document.querySelectorAll(
    "html.menus .section-1 .dishes-grid .dish"
  );
  console.log(allDishElements);
  allDishElements.forEach((dishElement) => {
    dishElement.classList.remove("dish");
    let dishName = dishElement.className;
    dishElement.classList.add("dish");
    let innerImageElement = dishElement.querySelector(".image");
    innerImageElement.style.backgroundImage = `url(./images/dishes-downscaled/${dishName}.jpg)`;
  });
}
/* #endregion */

/* #region  target gallery site */
if (htmlElement.classList.contains("gallery")) {
  /* #region  create masonry layout */
  var totalRows = getComputedStyle(htmlElement).getPropertyValue(
      "--number-of-gallery-columns"
    ),
    itemCol = 0;
  console.log(totalRows);
  for (var rowCount = 0; rowCount < totalRows; rowCount++) {
    newCol = document.createElement("div");
    newCol.className = "column";
    document.getElementsByClassName("masonry-layout")[0].appendChild(newCol);
  }

  for (
    var itemCount = 0;
    itemCount < document.querySelectorAll(".masonry-layout .image").length;
    itemCount++
  ) {
    document
      .getElementsByClassName("column")
      [itemCol].appendChild(
        document.querySelectorAll(".masonry-layout .image")[0]
      );
    if (itemCol < totalRows - 1) {
      itemCol++;
    } else {
      itemCol = 0;
    }
  }
  /* #endregion */

  /* #region  image pop up events */
  let allImages = document.querySelectorAll(".masonry-layout .image");
  let imagePopUpContainerElement = document.querySelector(".image-pop-up");
  let imgElement = imagePopUpContainerElement.querySelector("img");
  let highlightImagePopUp = function (event) {
    imgElement.src = event.target.src;
    imagePopUpContainerElement.classList.remove("hidden");
    imagePopUpContainerElement.classList.add("active");
    imgElement.classList.add("animate");
    setTimeout(() => {
      imgElement.classList.remove("animate");
    }, 300);
  };
  let hideImagePopUp = function () {
    imagePopUpContainerElement.classList.remove("active");
    setTimeout(() => imagePopUpContainerElement.classList.add("hidden"), 300);
  };
  allImages.forEach((image) =>
    image.addEventListener("click", highlightImagePopUp)
  );
  imagePopUpContainerElement.addEventListener("click", hideImagePopUp);
  setTimeout(() => {
    document.querySelector("#gallery").classList.remove("loading-images");
  }, 5000);
  /* #endregion */
}
/* #endregion */
