// Seleção de elementos do DOM
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const closeBtn = document.querySelector(".close-btn");

// Evento para abrir e fechar o menu responsivo
hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("active");
});

// Ações a serem executadas quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Seleção de elementos do carrinho e outros elementos necessários
  const cartIcon = document.getElementById("cart-icon");
  const sideCart = document.getElementById("side-cart");
  const closeSideCartBtn = document.querySelector(".side-cart-header .close-btn");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const sideCartItemsList = document.getElementById("side-cart-items");
  const sideCartTotalElement = document.getElementById("side-cart-total");
  const cartCountElement = document.getElementById("cart-count");
  const cartCountBadge = document.getElementById("cart-count-badge");
  const sideCartOverlay = document.getElementById("side-cart-overlay");
  let cart = [];

  // Função para abrir o carrinho lateral
  function openSideCart() {
    sideCart.style.right = "0";
    sideCartOverlay.style.display = "block";
  }

  // Função para fechar o carrinho lateral
  function closeSideCart() {
    sideCart.style.right = "-400px";
    sideCartOverlay.style.display = "none";
  }

  // Eventos para abrir e fechar o carrinho
  cartIcon.addEventListener("click", openSideCart);
  closeSideCartBtn.addEventListener("click", closeSideCart);
  sideCartOverlay.addEventListener("click", closeSideCart);

  // Eventos para adicionar itens ao carrinho
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const name = event.target.getAttribute("data-name");
      const price = parseFloat(event.target.getAttribute("data-price"));
      const image = event.target.parentElement.querySelector("img").src;

      const product = {
        name,
        price,
        qty: 1,
        image,
      };

      const existingProduct = cart.find((item) => item.name === name);
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        cart.push(product);
      }
      updateCart();
    });
  });

  // Função para atualizar o conteúdo do carrinho
  function updateCart() {
    sideCartItemsList.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
      const listItem = document.createElement("li");

      const itemInfo = document.createElement("div");
      itemInfo.classList.add("item-info");

      const itemImage = document.createElement("img");
      itemImage.src = item.image;

      const itemName = document.createElement("span");
      itemName.textContent = item.name;

      itemInfo.appendChild(itemImage);
      itemInfo.appendChild(itemName);

      const itemQty = document.createElement("div");
      itemQty.classList.add("item-qty");

      const decreaseQty = document.createElement("button");
      decreaseQty.textContent = "-";
      decreaseQty.addEventListener("click", () => {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });

      const qtySpan = document.createElement("span");
      qtySpan.textContent = item.qty;

      const increaseQty = document.createElement("button");
      increaseQty.textContent = "+";
      increaseQty.addEventListener("click", () => {
        item.qty += 1;
        updateCart();
      });

      itemQty.appendChild(decreaseQty);
      itemQty.appendChild(qtySpan);
      itemQty.appendChild(increaseQty);

      listItem.appendChild(itemInfo);
      listItem.appendChild(itemQty);

      sideCartItemsList.appendChild(listItem);

      total += item.price * item.qty;
      itemCount += item.qty;
    });

    sideCartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = itemCount;
    cartCountBadge.textContent = itemCount;
  }
});
