const products = [
  {
    name: "Bloody Sweetheart",
    price: 35,
    stock: 3,
    image: "https://via.placeholder.com/300",
    categories: ["dark", "glam"]
  },
  {
    name: "Candy Pop",
    price: 30,
    stock: 5,
    image: "https://via.placeholder.com/300",
    categories: ["simple", "nude"]
  }
];

const shop = document.getElementById("shop");

const formatId = name => name.replace(/\s+/g, '-').toLowerCase();

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.dataset.categories = p.categories.join(",");
  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <div class="price">$${p.price}</div>
    Qty: <input class="qty" type="number" min="1" max="${p.stock}" value="1" id="q-${formatId(p.name)}">
    <div id="paypal-${formatId(p.name)}"></div>
  `;
  shop.appendChild(div);

  const safeId = formatId(p.name);

  if (window.paypal && typeof window.paypal.Buttons === "function") {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        const qtyInput = document.getElementById("q-" + safeId);
        const qty = qtyInput ? qtyInput.value : 1;
        return actions.order.create({
          purchase_units: [{ amount: { value: (p.price * qty).toFixed(2) } }]
        });
      }
    }).render("#paypal-" + safeId);
  }
});

// Panel Interactions
const panelItems = document.querySelectorAll('#left-panel .menu-item');
panelItems.forEach(item => {
  item.addEventListener('click', () => {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      item.classList.toggle('active');
    } else {
      alert(`You clicked: ${item.textContent.trim()}`); // placeholder for actual content
    }
  });
});
