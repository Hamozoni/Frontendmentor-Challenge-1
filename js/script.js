let showMenu = document.querySelector("header .nav-links");
let showCart = document.querySelector("header .cart-items");

let proImage = Array.from(
  document.querySelectorAll(".product-images .product-image img")
);
let imageToggler = Array.from(
  document.querySelectorAll(".small-images .image-overlay")
);
let smallImageSrc = Array.from(
  document.querySelectorAll(".small-images .image-overlay img")
);

let imageCount = proImage.length;
let currentImage = 0;

let price = 125.0;

let cartSpanNumber = 0;

let cartSpanNum = document.querySelector(".cart-avatar .cart-num");

let cartMinus = document.getElementById("minus");
let cartNum = document.getElementById("quant-num");
let cartPlus = document.getElementById("plus");

let addToCart = document.querySelector("#add-btn");

let cartItemscontaner = document.querySelector(".cart-items");
let itemsCont = document.querySelector(".cart-items .items");
let checkBtn = document.querySelector("#check-out");

let next = document.querySelector(".product-images .product-image .icon-next");
let previous = document.querySelector(
  ".product-images .product-image .icon-previous"
);

function menu() {
  showMenu.classList.add("active");
}

function noMenu() {
  showMenu.classList.remove("active");
}

function toggleCart() {
  showCart.classList.toggle("active");
}

document.querySelector(".content").onclick = function () {
  if (showCart.classList.contains("active")) {
    showCart.classList.remove("active");
  }
};

updateCart();
cartUdating();

function updateCart() {
  cartNum.innerHTML = cartSpanNumber;
}

cartPlus.onclick = function () {
  if (cartSpanNumber <= 98) {
    cartSpanNumber++;
    updateCart();
  }
};

cartMinus.onclick = function () {
  if (cartSpanNumber > 0) {
    cartSpanNumber--;
    updateCart();
  }
};

function cartUdating() {
  itemsCont.innerHTML = "Your cart is empty";
  itemsCont.classList.add("empty");
  checkBtn.style.display = "none";
}

addToCart.onclick = function () {
  if (cartSpanNumber > 0) {
    cartSpanNum.innerHTML = cartSpanNumber;
    itemsCont.innerHTML = "";

    if (itemsCont.classList.contains("empty")) {
      itemsCont.classList.remove("empty");
    }
    let caIm = document.createElement("img");
    caIm.className = "item-img";
    caIm.src = smallImageSrc[currentImage].src;
    itemsCont.appendChild(caIm);

    let iBox = document.createElement("div");
    iBox.className = "item-box";

    let boxP = document.createElement("p");
    boxP.appendChild(document.createTextNode("Fall Limited Edition Sneakers"));
    iBox.appendChild(boxP);

    let boxH5 = document.createElement("h5");
    boxH5.className = "cart-price";
    boxH5.appendChild(document.createTextNode(`$ ${price}.00`));

    let boxH5Quant = document.createElement("span");
    boxH5Quant.className = "quantity";
    boxH5Quant.appendChild(document.createTextNode(` x ${cartSpanNumber}`));
    boxH5.appendChild(boxH5Quant);

    let boxSpanTotal = document.createElement("span");
    boxSpanTotal.className = "total";
    boxSpanTotal.appendChild(
      document.createTextNode(" " + "$" + price * cartSpanNumber + "." + "00")
    );
    boxH5.appendChild(boxSpanTotal);

    iBox.appendChild(boxH5);

    itemsCont.appendChild(iBox);

    let itemDel = document.createElement("img");
    itemDel.className = "delete-icon";
    itemDel.src = "./images/icon-delete.svg";
    itemsCont.appendChild(itemDel);

    if ((checkBtn.style.display = "none")) {
      checkBtn.style.display = "block";
    }
  }
};

Array.from(document.body.childNodes).forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
      cartUdating();
      cartSpanNumber = 0;
      cartSpanNum.innerHTML = "";
      updateCart();
    }
  });
});

checker();

next.onclick = function () {
  if (currentImage === imageCount - 1) {
    this.classList.add("disable");
  } else {
    currentImage++;
    checker();
  }
};
previous.onclick = function () {
  if (currentImage === 0) {
    this.classList.add("disable");
  } else {
    currentImage--;
    checker();
  }
};

imageToggler.forEach(function (e) {
  e.addEventListener("click", (e) => {
    currentImage = parseInt(e.target.dataset.slide);
    checker();
  });
});

function checker() {
  proImage.forEach(function (e) {
    e.classList.remove("active");
  });

  imageToggler.forEach(function (e) {
    e.classList.remove("active");
  });

  proImage[currentImage].classList.add("active");
  imageToggler[currentImage].classList.add("active");

  if (next.classList.contains("disable")) {
    next.classList.remove("disable");
  }
  if (previous.classList.contains("disable")) {
    previous.classList.remove("disable");
  }
}

let sImagesHol = [];
let prevNextSpan = [];

proImage.forEach(function (e) {
  e.onclick = function () {
    let overlay = document.createElement("div");
    overlay.className = "overlay";

    let imageHolder = document.createElement("div");
    imageHolder.className = "big-image";

    let CancelIcon = document.createElement("p");
    CancelIcon.appendChild(document.createTextNode("X"));
    CancelIcon.className = "cancel";
    imageHolder.appendChild(CancelIcon);
    let image = document.createElement("img");
    image.src = `${proImage[currentImage].src}`;

    imageHolder.appendChild(image);
    overlay.appendChild(imageHolder);

    let smallImgHolder = document.createElement("div");
    smallImgHolder.className = "small-images";

    let smallImageHolder = document.createElement("div");
    smallImageHolder.className = "small-images";

    let prevBtn = document.createElement("span");
    let nextvBtn = document.createElement("span");
    let prevIcon = document.createTextNode("<");
    let nextIcon = document.createTextNode(">");
    prevBtn.className = "prev-icon";
    nextvBtn.className = "next-icon";
    prevBtn.appendChild(prevIcon);
    nextvBtn.appendChild(nextIcon);

    imageHolder.appendChild(prevBtn);
    imageHolder.appendChild(nextvBtn);
    for (let i = 0; i < imageToggler.length; i++) {
      let smallImage = document.createElement("div");
      smallImage.className = "small-image";
      smallImage.setAttribute("data-bullet", i);
      let sImages = document.createElement("img");
      sImages.src = `${smallImageSrc[i].src}`;
      smallImage.appendChild(sImages);

      smallImageHolder.appendChild(smallImage);
    }
    overlay.appendChild(smallImageHolder);

    document.querySelector("header").appendChild(overlay);

    sImagesHol = Array.from(document.querySelectorAll(".overlay .small-image"));

    sImagesHol[currentImage].classList.add("active");
  };
});

Array.from(document.body.childNodes).forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel")) {
      document.querySelector("header .overlay").remove();
    }
    if (e.target.classList.contains("overlay")) {
      e.target.remove();
    }
    if (e.target.classList.contains("next-icon")) {
      if (currentImage >= imageCount - 1) {
        return;
      } else {
        currentImage++;
        document.querySelector(
          ".overlay .big-image img"
        ).src = `${proImage[currentImage].src}`;
        sImagesHol.forEach((im) => {
          if (im.classList.contains("active")) {
            im.classList.remove("active");
          }
        });
        sImagesHol[currentImage].classList.add("active");
        checker();
      }
    }
    if (e.target.classList.contains("prev-icon")) {
      if (currentImage === 0) {
        return;
      } else {
        currentImage--;
        document.querySelector(
          ".overlay .big-image img"
        ).src = `${proImage[currentImage].src}`;
        sImagesHol.forEach((im) => {
          if (im.classList.contains("active")) {
            im.classList.remove("active");
          }
        });
        sImagesHol[currentImage].classList.add("active");
        checker();
      }
    }

    if (e.target.classList.contains("small-image")) {
      currentImage = parseInt(e.target.dataset.bullet);
      document.querySelector(
        ".overlay .big-image img"
      ).src = `${proImage[currentImage].src}`;
      sImagesHol.forEach((im) => {
        if (im.classList.contains("active")) {
          im.classList.remove("active");
        }
      });
      sImagesHol[currentImage].classList.add("active");
      checker();
    }
  });
});
