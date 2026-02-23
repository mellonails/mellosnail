const products = [
  { name: "Bloody Sweetheart", price: 35, stock: 3, image: "https://via.placeholder.com/300" },
  { name: "Candy Pop", price: 30, stock: 5, image: "https://via.placeholder.com/300" }
];

const shop = document.getElementById("shop");
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <div class="price">$${p.price}</div>
    Qty: <input class="qty" type="number" min="1" max="${p.stock}" value="1" id="q-${p.name}">
    <div id="paypal-${p.name}"></div>
  `;
  shop.appendChild(div);

  paypal.Buttons({
    createOrder: (data, actions) => {
      let qty = document.getElementById("q-" + p.name).value;
      return actions.order.create({
        purchase_units: [{ amount: { value: (p.price * qty).toFixed(2) } }]
      });
    }
  }).render("#paypal-" + p.name);
});

// --- Settings Panel ---
const settingsPanel = document.getElementById("settingsPanel");
document.getElementById("openSettings").addEventListener("click", e => {
  e.preventDefault();
  settingsPanel.style.right = "0";
});
document.getElementById("closeSettings").addEventListener("click", () => {
  settingsPanel.style.right = "-300px";
});

// --- Color customization ---
const bg = document.getElementById("bg");
const panel = document.getElementById("panel");
const accent = document.getElementById("accent");

// Load saved colors
if(localStorage.bg) document.documentElement.style.setProperty('--bg', localStorage.bg);
if(localStorage.panel) document.documentElement.style.setProperty('--panel', localStorage.panel);
if(localStorage.accent) document.documentElement.style.setProperty('--accent', localStorage.accent);

// Initialize inputs
bg.value = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
panel.value = getComputedStyle(document.documentElement).getPropertyValue('--panel').trim();
accent.value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

// Change colors live
bg.addEventListener('input', e => {
  document.documentElement.style.setProperty('--bg', e.target.value);
  localStorage.setItem('bg', e.target.value);
});
panel.addEventListener('input', e => {
  document.documentElement.style.setProperty('--panel', e.target.value);
  localStorage.setItem('panel', e.target.value);
});
accent.addEventListener('input', e => {
  document.documentElement.style.setProperty('--accent', e.target.value);
  localStorage.setItem('accent', e.target.value);
});
