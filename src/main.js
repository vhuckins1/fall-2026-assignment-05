// Vite lets us import JSON directly as a JS array.
import products from './data/products.json';

const PRODUCTS_PER_PAGE = 5;
const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE); // 15 / 5 = 3
let currentPage = 1;

// main.js is loaded on every page, but only the Store page has these elements.
const grid = document.getElementById('product-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

// Builds the HTML for one product card.
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.imageUrl}" alt="${product.name}" />
    <div class="product-info">
      <span class="badge">${product.category}</span>
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="description">${product.description}</p>
    </div>
  `;
  return card;
}

// Shows the products for the current page and updates the controls.
function renderPage() {
  // Page 1 -> items 0-4, page 2 -> 5-9, page 3 -> 10-14
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const pageProducts = products.slice(start, end);

  grid.innerHTML = ''; // clear the old cards
  pageProducts.forEach((product) => {
    grid.appendChild(createProductCard(product));
  });

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

  // Boundary guards: no "Previous" on page 1, no "Next" on the last page.
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

if (grid) {
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  renderPage(); // initial render
}