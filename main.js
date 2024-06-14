const mobileLinksBtn = document.querySelector(".lines");
const linksContainer = document.querySelector(".links");
const overlay = document.querySelector(".overlay");
const sliderController = document.querySelector(".slider--controller");
const silderContainer = document.querySelector(".slider--container");
const navBar = document.querySelector("nav");
console.log(silderContainer);
const slider = document.querySelector(".slider");

mobileLinksBtn.addEventListener("click", () => {
  linksContainer.classList.add("active");
  overlay.classList.add("active");
});
overlay.addEventListener("click", () => {
  if (linksContainer.classList.contains("active")) {
    linksContainer.classList.remove("active");
    overlay.classList.remove("active");
    return;
  }
});
const salesContainer = document.querySelector(".sales--slider");
let currScroll = 0;
window.addEventListener("scroll", (e) => {
  if (currScroll > window.scrollY) {
    console.log("scroll UP");

    if (window.scrollY < 120) {
      if (navBar.classList.contains("show")) {
        navBar.classList.remove("show");
        console.log("hhhh");
        return;
      } else return;
    }
    if (!navBar.classList.contains("show")) {
      navBar.classList.add("show");
    }
  } else {
    console.log("Dowwwwn");
    navBar.classList.contains("show");
    console.log(navBar.classList.contains("show"));
    if (navBar.classList.contains("show")) {
      navBar.classList.remove("show");
      console.log("hhhh");
      return;
    }
  }

  currScroll = window.scrollY;
});
// -----------------------------
const overViewCategory = document.querySelector(
  ".cate--container .categories  div"
);
const categoryNextBun = document.querySelector(".category--section .right");
const categoryPrevBun = document.querySelector(".category--section .left");
const categorySliderControl = document.querySelector(
  ".category--section .control"
);
let startShownCategory = 0;
const maxCategories = 3;
// -----------------------------
// First Solutuon
categoryNextBun.addEventListener("click", () => {
  // function body next
  console.log(overViewCategory);

  if (startShownCategory < 2) {
    overViewCategory.style.setProperty("--e", -++startShownCategory);
  }
  if (startShownCategory == 2) {
    categoryNextBun.classList.add("not--active");
  }
  categoryPrevBun.classList.remove("not--active");
});

categoryPrevBun.addEventListener("click", () => {
  // function body prev
  if (startShownCategory > 0)
    overViewCategory.style.setProperty("--e", -(--startShownCategory));

  if (startShownCategory == 0) {
    categoryPrevBun.classList.add("not--active");
  }

  categoryNextBun.classList.remove("not--active");
});

// Get Products Data And Display it
const productsContainer = document.querySelector(".products");
console.log(productsContainer);
async function fetchData() {
  const req = await fetch("./data.json");
  const productItems = await req.json();
  productItems.forEach((item) => {
    displayProduct(item);
  });
}
fetchData();
function productSizes(sizes) {
  sizeDiv = document.createElement("div");
  sizeDiv.classList.add("sizes");
  let sizeSpans = "";
  for (let i = 0; i < sizes.length; i++) {
    const span = `<span>${sizes[i]}</span>`;
    sizeSpans += span;
  }
  sizeDiv.innerHTML = sizeSpans;
  return sizeDiv;
}
function createColorPalette(colors) {
  const ul = document.createElement("ul");
  ul.classList.add("colors");
  colors.forEach((color, i) => {
    const li = document.createElement("li");
    i === 0 ? li.classList.add("active") : "";
    li.style.backgroundColor = "#" + color;
    console.log(color);
    ul.appendChild(li);
  });
  return ul;
}
function createProductInfo(name, price, discount, newPrice) {
  const div = document.createElement("div");
  const discountSpan = discount
    ? `<span class="new--price">from ${newPrice}</span>`
    : "";
  div.classList.add("product--info");
  div.innerHTML = `
              <a class="product--title" href="#">${name}</a>
                <p class="product--price"><span class="${
                  discount ? "old--price" : ""
                }">${price}</span> ${discountSpan}</p>
  `;
  console.log(div);
  return div;
}
function displayProduct(product) {
  const div = document.createElement("div");
  div.classList.add("product");
  const productColor = product.colors[0];
  const productImages = product.images;
  const imgs = productColor ? productImages[0] : undefined;
  const productColors = product.colors;
  const mainImg = imgs ? imgs.main : "";
  const hoverImg = imgs ? imgs.hoverd : "";
  const price = product.price;
  console.log(price);
  const name = product.name;
  const sizes = product.sizes;
  let sizeDiv;
  const productImgDiv = document.createElement("div");
  productImgDiv.classList.add("product--imgs");
  productImgDiv.innerHTML = `
    <img class="" src="${mainImg}" alt="productImage" />
    <img src= "${hoverImg}" alt="" class="hoverdImg" />
    <div class="product--control ${!sizeDiv ? "pb15" : ""}">
      <button  class="product--cart product--controllrs">
       <i class="fa-solid fa-cart-shopping"></i>
      </button>
      <button  class="product--favourite product--controllrs">
     <i class="fa-regular fa-heart"></i>
      </button>
      <button  class="product--compare product--controllrs">
       <i class="fa-solid fa-check"></i>
      </button>
      <button   class="product--veiw product--controllrs">
       <i class="fa-regular fa-eye"></i>
      </button>
      </div>
      ${
        product.discount
          ? `<div class='discount'>-${product.discount}</div>
          <div class="discount--end">${new Date(
            "15 Jun 2024 10:00:00"
          ).toUTCString()}</div>
          `
          : ""
      }
    `;

  if (sizes) {
    const productControlDiv = productImgDiv.querySelector(".product--control");
    productControlDiv.appendChild(productSizes(sizes));
  }
  div.appendChild(productImgDiv);
  if (name && price) {
    div.appendChild(
      createProductInfo(name, price, product.discount, product.newPrice)
    );
    if (product.discount) {
      const discountEnd = new Date(product.discountDateEnd);
      console.log(discountEnd);
      console.log(div);
      setInterval(() => {
        getRemainingTime(discountEnd, div);
      }, 1000);
      console.log();
    }
  }
  if (productColors) {
    div.appendChild(createColorPalette(productColors));
    const images = div.querySelectorAll(".product--imgs > img");
    const colorPalettes = div.querySelectorAll(".colors > *");
    let activeColor = div.querySelector(".colors .active");
    console.log(activeColor);
    // Change Images Based On the hover Event On A Color
    function changeProductImage(li, i) {
      activeColor.classList.remove("active");
      activeColor = li;
      activeColor.classList.add("active");
      const newImgs = productImages[i];
      console.log(newImgs);
      Object.values(newImgs).forEach((img, i) => {
        console.log(img);
        images[i].src = img;
      });
    }
    colorPalettes.forEach((li, i) => {
      li.addEventListener("click", () => {
        changeProductImage(li, i);
      });
      li.addEventListener("mouseenter", (e) => {
        const changeLag = setTimeout(() => {
          changeProductImage(li, i);
        }, 800);
        li.addEventListener("mouseleave", () => {
          clearTimeout(changeLag);
        });
      });
    });
  }
  productsContainer.appendChild(div);
}
console.log();
function getRemainingTime(date, div) {
  const now = new Date();

  // Parse the future date
  const future = new Date(date);

  // Calculate the difference in milliseconds
  const difference = future - now;

  // Convert milliseconds to time components
  const millisecondsInDay = 1000 * 60 * 60 * 24;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const discountDiv = div.querySelector(".discount--end");
  const formatedDate = `${String(days).padStart(2, "0")}d : ${String(
    hours
  ).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(
    seconds
  ).padStart(2, "0")}s`;
  discountDiv.innerHTML = formatedDate;
}
