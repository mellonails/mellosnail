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

// Panel interactions
const categoriesToggle = document.getElementById("categoriesToggle");
const categoriesMenu = document.getElementById("categoriesMenu");
const panelTab = document.getElementById("panelTab");

if (categoriesToggle && categoriesMenu) {
  categoriesToggle.addEventListener("click", () => {
    const isOpen = categoriesMenu.classList.toggle("is-open");
    categoriesToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (panelTab) {
  panelTab.addEventListener("click", () => {
    document.body.classList.toggle("panel-open");
    panelTab.setAttribute(
      "aria-expanded",
      String(document.body.classList.contains("panel-open"))
    );
  });
}

const filterButtons = document.querySelectorAll(".submenu-link");
if (filterButtons.length) {
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      document.querySelectorAll(".card").forEach(card => {
        if (filter === "all") {
          card.classList.remove("hidden");
          return;
        }

        const categories = card.dataset.categories ? card.dataset.categories.split(",") : [];
        if (categories.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Color Settings
const bg = document.getElementById("bg");
const panel = document.getElementById("panel");
const accent = document.getElementById("accent");

// Load saved colors
if (localStorage.bg) document.documentElement.style.setProperty('--bg', localStorage.bg);
if (localStorage.panel) document.documentElement.style.setProperty('--panel', localStorage.panel);
if (localStorage.accent) document.documentElement.style.setProperty('--accent', localStorage.accent);

bg.value = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
panel.value = getComputedStyle(document.documentElement).getPropertyValue('--panel').trim();
accent.value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

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
const panelItems = document.querySelectorAll('#left-panel .menu-item');

panelItems.forEach(item => {
  item.addEventListener('click', () => {
    // Toggle submenu if it exists
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      item.classList.toggle('active');
    } else {
      // For About, Instructions, Contact, Settings — load content dynamically
      alert(`You clicked: ${item.textContent.trim()}`);
      // Replace alert with actual content rendering later
    }
  });
});
