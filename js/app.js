/**
 * BAMBOO CHICKEN SELECT — STATIC CLIENT APPLICATION
 * 100% Pure Vanilla JavaScript (ES6+)
 * Zero dependencies, zero build step, zero framework code.
 * Mobile-First Menu Architecture & Configurable Pricing Engine
 */

// ==========================================
// 1. CONFIGURABLE PRICING & PRODUCT CATALOG
// ==========================================

// Configurable Finish-at-Home bulk discount strategy (pending Ronald's final confirmation)
const DISCOUNT_CONFIG = {
  thresholdBoxes: 3,
  // Options: 'flat_per_box_50' | 'none'
  activePolicy: 'flat_per_box_50',
  policies: {
    flat_per_box_50: {
      id: 'flat_per_box_50',
      label: 'Provisional Tier: $0.50 off per box',
      discountPerBox: 0.50,
      calculate: (boxQty, basePrice) => {
        if (boxQty >= 3) {
          const unitPrice = basePrice - 0.50;
          const discountTotal = boxQty * 0.50;
          return {
            applied: true,
            unitPrice,
            discountTotal,
            note: "Provisional bulk tier applied ($0.50 off/box for 3+ boxes — pending Ronald's confirmation)"
          };
        }
        return {
          applied: false,
          unitPrice: basePrice,
          discountTotal: 0,
          note: 'Add 3 or more boxes to activate bulk savings'
        };
      }
    },
    none: {
      id: 'none',
      label: 'Standard Pricing (No discount)',
      discountPerBox: 0,
      calculate: (boxQty, basePrice) => ({
        applied: false,
        unitPrice: basePrice,
        discountTotal: 0,
        note: 'Standard box pricing'
      })
    }
  }
};

// Configurable Soy Sauce product configuration (pending Ronald's final confirmation)
const SOY_SAUCE_CONFIG = {
  provisionalPrice: 3.00,
  volumeConfirmed: false,
  format: 'Full Bottle'
};

// Menu Sections Definition (Structured grouping for All Items and individual filters)
const MENU_SECTIONS = [
  {
    id: 'signature-meals',
    title: 'Signature Meals',
    badge: 'Signature',
    description: 'Bamboo Chicken skewers and golden savoury pie.'
  },
  {
    id: 'chicken-and-more',
    title: 'Chicken & More',
    badge: 'Hot & Ready',
    description: 'Crispy bite-sized chicken nuggets prepared for a quick meal.'
  },
  {
    id: 'cooked-dumplings',
    title: 'Cooked Dumplings',
    badge: 'Pack of 5',
    description: 'Freshly cooked dumplings served hot and ready to enjoy. $5.00 per pack of 5.'
  },
  {
    id: 'finish-at-home',
    title: 'Finish-at-Home',
    badge: 'Box of 10',
    description: 'Chilled boxes of 10 dumplings to cook at home. Bulk savings begin at 3 boxes.'
  },
  {
    id: 'drinks-extras',
    title: 'Drinks & Extras',
    badge: 'Chilled & Bottled',
    description: 'Chilled iced tea and full-bottle savoury soy sauce.'
  }
];

// Master 9-Product Catalogue for Bamboo Chicken Select
// Realistic, authentic descriptions aligned strictly with Bamboo Chicken's actual menu
const SELECT_CATALOG = [
  // 1. SIGNATURE MEALS
  {
    id: 'bamboo-chicken-select',
    sectionId: 'signature-meals',
    category: 'signature-meals',
    name: 'Bamboo Chicken',
    price: 3.00,
    unit: '1 stick',
    badge: 'Signature Skewer',
    aspectClass: 'aspect-wide',
    image: 'https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/website/bamboo_chicken_3_sticks.webp',
    alt: 'Signature Bamboo Chicken on a skewer',
    description: 'Our signature Bamboo Chicken, prepared and served with the flavour customers know from Bamboo Chicken.'
  },
  {
    id: 'bamboo-pie-select',
    sectionId: 'signature-meals',
    category: 'signature-meals',
    name: 'Bamboo Pie',
    price: 3.00,
    unit: 'per pie',
    badge: 'Savoury Pie',
    aspectClass: 'aspect-standard',
    image: 'https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/menu/bamboo_pie_3.webp',
    alt: 'Golden savoury Bamboo Pie',
    description: 'A golden, savoury pie with a filling inspired by Bamboo Chicken’s menu.'
  },

  // 2. CHICKEN & MORE
  {
    id: 'chicken-nuggets-select',
    sectionId: 'chicken-and-more',
    category: 'chicken-and-more',
    name: 'Chicken Nuggets',
    price: 3.00,
    portion: '100g',
    unit: '100g portion',
    badge: '100g Portion',
    aspectClass: 'aspect-standard',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    alt: 'Crispy bite-sized chicken nuggets, 100g portion',
    description: '100g of bite-sized chicken nuggets, prepared for an easy and satisfying meal.'
  },

  // 3. COOKED DUMPLINGS (Pack of 5, $5.00 each, strictly NO bulk discount)
  {
    id: 'chicken-dumplings-cooked',
    sectionId: 'cooked-dumplings',
    category: 'cooked-dumplings',
    name: 'Chicken Dumplings',
    price: 5.00,
    isBox: false,
    dumplingsPerPack: 5,
    unit: 'pack of 5',
    badge: 'Ready to Eat',
    aspectClass: 'aspect-standard',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    alt: 'Five freshly cooked chicken dumplings, pack of 5',
    description: 'Five chicken dumplings filled with seasoned chicken and served hot, ready to enjoy.'
  },
  {
    id: 'beef-dumplings-cooked',
    sectionId: 'cooked-dumplings',
    category: 'cooked-dumplings',
    name: 'Beef Dumplings',
    price: 5.00,
    isBox: false,
    dumplingsPerPack: 5,
    unit: 'pack of 5',
    badge: 'Ready to Eat',
    aspectClass: 'aspect-standard',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    alt: 'Five freshly cooked beef dumplings, pack of 5',
    description: 'Five beef dumplings filled with seasoned minced beef and served hot, ready to enjoy.'
  },

  // 4. FINISH-AT-HOME (10 dumplings per box, $10.00/box, bulk savings from 3 boxes)
  {
    id: 'chicken-dumpling-box-10',
    sectionId: 'finish-at-home',
    category: 'finish-at-home',
    name: 'Finish-at-Home Chicken Dumpling Box',
    price: 10.00,
    isBox: true,
    dumplingsPerBox: 10,
    unit: 'box of 10',
    badge: 'Box of 10',
    aspectClass: 'aspect-box',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    alt: 'Finish-at-Home Chicken Dumpling Box with 10 chilled dumplings',
    description: 'A box of 10 chilled chicken dumplings to cook at home. Bulk savings begin at 3 boxes.'
  },
  {
    id: 'beef-dumpling-box-10',
    sectionId: 'finish-at-home',
    category: 'finish-at-home',
    name: 'Finish-at-Home Beef Dumpling Box',
    price: 10.00,
    isBox: true,
    dumplingsPerBox: 10,
    unit: 'box of 10',
    badge: 'Box of 10',
    aspectClass: 'aspect-box',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    alt: 'Finish-at-Home Beef Dumpling Box with 10 chilled dumplings',
    description: 'A box of 10 chilled beef dumplings to cook at home. Bulk savings begin at 3 boxes.'
  },

  // 5. DRINKS & EXTRAS
  {
    id: 'ice-tea-select',
    sectionId: 'drinks-extras',
    category: 'drinks-extras',
    name: 'Select Ice Tea',
    price: 3.00,
    unit: 'per bottle',
    badge: 'Chilled Bottle',
    aspectClass: 'aspect-bottle',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    alt: 'Chilled bottle of Select Ice Tea',
    description: 'Chilled iced tea brewed with a touch of citrus flavour. A refreshing companion to any meal.'
  },
  {
    id: 'select-soy-sauce',
    sectionId: 'drinks-extras',
    category: 'drinks-extras',
    name: 'Soy Sauce',
    price: SOY_SAUCE_CONFIG.provisionalPrice,
    unit: 'full bottle',
    badge: 'Full Bottle',
    aspectClass: 'aspect-bottle',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    alt: 'Full bottle of Soy Sauce',
    description: 'A full bottle of rich savoury soy sauce, suited for dipping dumplings or seasoning meals at home.'
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

const appState = {
  cart: [],
  cardQuantities: {}, // Tracks stepper count per card [item.id]: number
  activeCategory: 'all'
};

// Initialize per-card quantities to 1
SELECT_CATALOG.forEach(item => {
  appState.cardQuantities[item.id] = 1;
});

// ==========================================
// 3. INITIALIZATION & LIFECYCLE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupEventListeners();
  setupFooterInteraction();
  updateCartUI();
  initPWA();
});

// Setup Event Listeners
function setupEventListeners() {
  // Category filter buttons
  const categoryButtons = document.querySelectorAll('.cat-filter-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      
      const cat = btn.getAttribute('data-category');
      appState.activeCategory = cat;
      renderMenu();

      // Ensure active category pill is visible on horizontal scroll without shifting the page
      btn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    });
  });

  // Cart Drawer open/close buttons
  const openCartBtn = document.getElementById('open-cart-btn');
  const floatingCartBtn = document.getElementById('floating-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const drawerBackdrop = document.getElementById('cart-drawer');

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (floatingCartBtn) floatingCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeCart();
    });
  }

  // Proceed to Checkout button
  const proceedBtn = document.getElementById('proceed-to-checkout-btn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      if (!appState.cart || appState.cart.length === 0) {
        showToastNotification("Your bag is empty. Please select items first.");
        return;
      }
      closeCart();
      openCheckout(1);
    });
  }

  // Checkout modal close listeners
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const checkoutBackdrop = document.getElementById('checkout-modal');
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
  if (checkoutBackdrop) {
    checkoutBackdrop.addEventListener('click', (e) => {
      if (e.target === checkoutBackdrop) closeCheckout();
    });
  }

  // Initialize custom in-app delivery area picker listeners
  initAreaPickerListeners();
}

function openCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('active');
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('active');
}

// Subtle, unobtrusive footer interaction for developer inquiries
function setupFooterInteraction() {
  const modelBtn = document.getElementById('experience-model-btn');
  if (!modelBtn) return;

  // Track touch position to prevent accidental triggering during mobile scrolling
  let touchStartY = 0;
  let touchStartX = 0;
  let isScrollGesture = false;

  modelBtn.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isScrollGesture = false;
    }
  }, { passive: true });

  modelBtn.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
      const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
      if (deltaY > 8 || deltaX > 8) {
        isScrollGesture = true;
      }
    }
  }, { passive: true });

  modelBtn.addEventListener('click', (e) => {
    // If the tap was actually a page scroll gesture, ignore
    if (isScrollGesture) {
      isScrollGesture = false;
      return;
    }
    e.preventDefault();

    // Developer recipient number remains completely hidden from the visible DOM/UI
    const recipientDigits = ['0', '7', '7', '9', '3', '8', '8', '5', '6', '0'].join('');
    const inquiryDraft = 'Hi, I would like to enquire about the Warstreet Experience Model for an application.';

    // Create platform-compatible SMS link without automatically sending
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const smsHref = isIOS 
      ? `sms:${recipientDigits}&body=${encodeURIComponent(inquiryDraft)}`
      : `sms:${recipientDigits}?body=${encodeURIComponent(inquiryDraft)}`;

    try {
      window.location.href = smsHref;
    } catch (err) {
      // Gracefully silent fallback if device does not support SMS dispatch
      console.log('Inquiry dispatch handled.');
    }
  });
}

// ==========================================
// 4. MENU RENDERING (ORGANIZED SECTIONS)
// ==========================================

function renderMenu() {
  const container = document.getElementById('menu-items-list');
  if (!container) return;

  // Determine which sections to render
  const sectionsToRender = appState.activeCategory === 'all'
    ? MENU_SECTIONS
    : MENU_SECTIONS.filter(section => section.id === appState.activeCategory);

  if (sectionsToRender.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <p>No items found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = sectionsToRender.map(section => {
    // Get products belonging to this section
    const sectionProducts = SELECT_CATALOG.filter(item => item.sectionId === section.id);

    if (sectionProducts.length === 0) return '';

    const cardsHtml = sectionProducts.map(item => renderProductCard(item)).join('');

    return `
      <section class="menu-catalog-section" id="section-${section.id}" aria-labelledby="heading-${section.id}">
        <!-- Section Header -->
        <div class="menu-section-header">
          <span class="menu-section-pill">${section.badge}</span>
          <h2 class="menu-section-title" id="heading-${section.id}">${section.title}</h2>
          <p class="menu-section-desc">${section.description}</p>
        </div>

        <!-- Section Product Grid -->
        <div class="product-grid">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');
}

// Render individual product card
function renderProductCard(item) {
  const cardQty = appState.cardQuantities[item.id] || 1;
  const cartItem = appState.cart.find(c => c.id === item.id);
  const inBagQty = cartItem ? cartItem.quantity : 0;

  // Pricing calculation and tags
  let priceDisplay = `$${item.price.toFixed(2)}`;
  let subDisplay = item.unit;
  let promoBadge = '';

  if (item.isBox) {
    const policy = DISCOUNT_CONFIG.policies[DISCOUNT_CONFIG.activePolicy];
    const calculation = policy.calculate(cardQty, item.price);
    if (calculation.applied) {
      priceDisplay = `$${calculation.unitPrice.toFixed(2)}`;
      subDisplay = `Total: $${(calculation.unitPrice * cardQty).toFixed(2)} (${cardQty} boxes)`;
      promoBadge = `<div class="bulk-promo-tag">Bulk Tier: Save $0.50/box (${cardQty} boxes)</div>`;
    } else {
      promoBadge = `<div class="bulk-promo-tag">Bulk savings begin at 3 boxes</div>`;
    }
  }

  return `
    <article class="select-product-card ${item.isBox ? 'finish-box-card' : ''}" id="product-card-${item.id}">
      <!-- 1. Product Image -->
      <div class="select-card-media ${item.aspectClass || ''}">
        <img 
          src="${item.image}" 
          alt="${item.alt}" 
          loading="lazy" 
          decoding="async"
          onerror="this.src='https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=80'"
        />
        ${item.badge ? `<span class="media-tag-badge">${item.badge}</span>` : ''}
      </div>

      <!-- Information & Ordering Controls -->
      <div class="select-card-content">
        <div class="select-card-header">
          <!-- 2. Product Name -->
          <h3 class="select-card-title">${item.name}</h3>
          <!-- 3. Short, Truthful Description -->
          <p class="select-card-desc">${item.description}</p>
          ${promoBadge}
        </div>

        <!-- 4. Price & Unit, 5. Stepper, 6. Add to Order -->
        <div class="select-card-footer">
          <div class="select-price-block">
            <div class="select-price-row">
              <span class="select-price-amount" id="price-display-${item.id}">${priceDisplay}</span>
              <span class="select-price-sub" id="unit-display-${item.id}">${subDisplay}</span>
            </div>
            ${inBagQty > 0 ? `<span class="in-bag-count-badge">In Bag: ${inBagQty}</span>` : ''}
          </div>

          <div class="select-action-cluster">
            <!-- 5. Quantity Stepper [- 1 +] -->
            <div class="card-stepper" aria-label="Quantity selector for ${item.name}">
              <button 
                type="button" 
                class="stepper-btn" 
                onclick="adjustCardQuantity('${item.id}', -1)"
                aria-label="Decrease quantity"
              >&minus;</button>
              <span class="stepper-val" id="stepper-val-${item.id}">${cardQty}</span>
              <button 
                type="button" 
                class="stepper-btn" 
                onclick="adjustCardQuantity('${item.id}', 1)"
                aria-label="Increase quantity"
              >&plus;</button>
            </div>

            <!-- 6. Add to Bag Button -->
            <button 
              type="button" 
              class="btn-card-add" 
              onclick="addCurrentCardToCart('${item.id}')"
              aria-label="Add ${cardQty} ${item.name} to bag"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ==========================================
// 5. CARD STEPPER CONTROLS
// ==========================================

function adjustCardQuantity(itemId, delta) {
  const current = appState.cardQuantities[itemId] || 1;
  const newQty = Math.max(1, current + delta);
  appState.cardQuantities[itemId] = newQty;

  // Update UI values immediately for smooth response
  const stepperValEl = document.getElementById(`stepper-val-${itemId}`);
  if (stepperValEl) {
    stepperValEl.textContent = newQty;
  }

  // If Finish-at-Home box, update bulk tier preview dynamically on the card
  const item = SELECT_CATALOG.find(i => i.id === itemId);
  if (item && item.isBox) {
    const policy = DISCOUNT_CONFIG.policies[DISCOUNT_CONFIG.activePolicy];
    const calculation = policy.calculate(newQty, item.price);
    const priceDisplay = document.getElementById(`price-display-${itemId}`);
    const unitDisplay = document.getElementById(`unit-display-${itemId}`);

    if (priceDisplay && unitDisplay) {
      if (calculation.applied) {
        priceDisplay.textContent = `$${calculation.unitPrice.toFixed(2)}`;
        unitDisplay.textContent = `Total: $${(calculation.unitPrice * newQty).toFixed(2)} (${newQty} boxes)`;
      } else {
        priceDisplay.textContent = `$${item.price.toFixed(2)}`;
        unitDisplay.textContent = `${item.unit}`;
      }
    }
  }
}

// Add the selected quantity on the card into the bag
function addCurrentCardToCart(itemId) {
  const item = SELECT_CATALOG.find(i => i.id === itemId);
  if (!item) return;

  const qtyToAdd = appState.cardQuantities[itemId] || 1;
  const existing = appState.cart.find(c => c.id === itemId);

  if (existing) {
    existing.quantity += qtyToAdd;
  } else {
    appState.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      isBox: !!item.isBox,
      isProvisional: !!item.isProvisional,
      quantity: qtyToAdd,
      image: item.image,
      unit: item.unit || '',
      description: item.description || ''
    });
  }

  // Reset card stepper back to 1
  appState.cardQuantities[itemId] = 1;
  renderMenu();
  updateCartUI();

  showToastNotification(`Added ${qtyToAdd}x ${item.name} to your Select Bag`);
}

function removeItemFromCart(itemId) {
  appState.cart = appState.cart.filter(c => c.id !== itemId);
  renderMenu();
  updateCartUI();
  if (checkoutState.isOpen && checkoutState.currentStep === 1) {
    renderCheckoutStep(1);
  }
}

// ==========================================
// 6. CART MANAGEMENT & BULK PRICING ENGINE
// ==========================================

function updateCartUI() {
  // 1. Calculate finish-at-home bulk discount across all boxes in the cart
  const totalBoxCount = appState.cart
    .filter(item => item.isBox)
    .reduce((sum, item) => sum + item.quantity, 0);

  const policy = DISCOUNT_CONFIG.policies[DISCOUNT_CONFIG.activePolicy];
  const boxCalculation = policy.calculate(totalBoxCount, 10.00);

  let subtotal = 0;
  let totalItemsCount = 0;
  let totalDiscountSavings = 0;

  const itemizedListHtml = appState.cart.map(cartItem => {
    let effectiveUnitPrice = cartItem.basePrice;
    let isBoxDiscounted = false;

    // Apply bulk tier ONLY if item is a Finish-at-Home box and total box count reaches threshold
    if (cartItem.isBox && boxCalculation.applied) {
      effectiveUnitPrice = boxCalculation.unitPrice;
      const lineSavings = (cartItem.basePrice - effectiveUnitPrice) * cartItem.quantity;
      totalDiscountSavings += lineSavings;
      isBoxDiscounted = true;
    }

    const lineTotal = effectiveUnitPrice * cartItem.quantity;
    subtotal += lineTotal;
    totalItemsCount += cartItem.quantity;

    return `
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border-subtle);">
        <img src="${cartItem.image}" alt="${cartItem.name}" style="width: 52px; height: 52px; border-radius: 10px; object-fit: cover; border: 1px solid var(--border-subtle); flex-shrink: 0;" />
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 700; font-size: 0.92rem; color: #141416; line-height: 1.25;">${cartItem.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
            $${effectiveUnitPrice.toFixed(2)} each 
            ${isBoxDiscounted ? `<span style="color:#B45309; font-weight:700;">(Bulk Tier: 3+ boxes)</span>` : ''}
            ${cartItem.isProvisional ? `<span style="color:#64748B; font-weight:600;">(Full Bottle • Vol. pending)</span>` : ''}
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <button type="button" onclick="modifyCartItemQty('${cartItem.id}', -1)" style="width: 26px; height: 26px; border: 1px solid #CBD5E1; background: white; border-radius: 6px; font-weight: 700; cursor: pointer;">-</button>
          <span style="font-weight: 800; font-size: 0.88rem; min-width: 18px; text-align: center;">${cartItem.quantity}</span>
          <button type="button" onclick="modifyCartItemQty('${cartItem.id}', 1)" style="width: 26px; height: 26px; border: 1px solid #CBD5E1; background: white; border-radius: 6px; font-weight: 700; cursor: pointer;">+</button>
          <div style="font-weight: 800; font-size: 0.95rem; min-width: 55px; text-align: right; color: #141416;">$${lineTotal.toFixed(2)}</div>
        </div>
      </div>
    `;
  }).join('');

  // 2. Update Header Badge
  const headerCountEl = document.getElementById('cart-count');
  if (headerCountEl) headerCountEl.textContent = totalItemsCount;

  // 3. Update Persistent Mobile Bag Bar
  const floatingBtn = document.getElementById('floating-cart-btn');
  const floatingBadge = document.getElementById('floating-cart-badge');
  const floatingTotal = document.getElementById('floating-cart-total');
  const floatingItemsLabel = document.getElementById('floating-cart-items-label');

  if (floatingBadge) floatingBadge.textContent = totalItemsCount;
  if (floatingItemsLabel) floatingItemsLabel.textContent = totalItemsCount === 1 ? 'item' : 'items';
  if (floatingTotal) floatingTotal.textContent = `$${subtotal.toFixed(2)}`;
  if (floatingBtn) {
    floatingBtn.style.display = totalItemsCount > 0 ? 'block' : 'none';
  }

  // 4. Update Drawer Content
  const listContainer = document.getElementById('cart-items-list');
  const totalAmountEl = document.getElementById('cart-total-amount');
  const discountRowEl = document.getElementById('cart-discount-row');

  if (listContainer) {
    if (appState.cart.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🛍️</div>
          <p style="font-size: 0.95rem; font-weight: 600; margin-bottom: 4px;">Your Select Bag is empty</p>
          <p style="font-size: 0.82rem;">Select ready-to-eat skewers, freshly steamed dumplings, or finish-at-home boxes above.</p>
        </div>
      `;
    } else {
      listContainer.innerHTML = itemizedListHtml;
    }
  }

  if (totalAmountEl) {
    totalAmountEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  if (discountRowEl) {
    if (totalDiscountSavings > 0) {
      discountRowEl.style.display = 'flex';
      discountRowEl.innerHTML = `
        <span style="color: #059669; font-weight: 700; font-size: 0.85rem;">Provisional Bulk Savings:</span>
        <span style="color: #059669; font-weight: 800; font-size: 0.9rem;">-$${totalDiscountSavings.toFixed(2)}</span>
      `;
    } else {
      discountRowEl.style.display = 'none';
    }
  }
}

function modifyCartItemQty(itemId, delta) {
  const item = appState.cart.find(c => c.id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    appState.cart = appState.cart.filter(c => c.id !== itemId);
  }

  renderMenu();
  updateCartUI();

  // If checkout step 1 is currently active, re-render it so items and totals reflect live changes
  if (checkoutState.isOpen && checkoutState.currentStep === 1) {
    renderCheckoutStep(1);
  }
}

// Toast notification helper
function showToastNotification(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  toast.textContent = message;
  toast.style.display = 'flex';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.display = 'none';
  }, 2400);
}

// ==========================================
// 6. STEP-BY-STEP CHECKOUT & ORDER ENGINE
// ==========================================

const API_BASE = "https://bamboo-orders-api.warstreett.workers.dev";
const BAMBOO_CONTACT_NUMBER = "0790040778";

/**
 * CENTRAL BAMBOO CHICKEN SELECT DELIVERY ZONES & FIXED PRICING CONFIGURATION
 * Single source of truth for delivery zones, fee amounts, and covered Harare areas.
 */
const DELIVERY_ZONES_CONFIG = {
  zones: [
    {
      id: "zone-2",
      label: "$2 Zone",
      fee: 2.00,
      areas: [
        "Harare CBD",
        "Avenues"
      ]
    },
    {
      id: "zone-3",
      label: "$3 Zone",
      fee: 3.00,
      areas: [
        "Avondale",
        "Belgravia",
        "Belvedere",
        "Braeside",
        "Eastlea",
        "Arcadia",
        "Milton Park",
        "Hatfield",
        "Southerton",
        "Newlands",
        "Mount Pleasant",
        "University of Zimbabwe (UZ)",
        "Strathaven",
        "Greendale",
        "Highlands"
      ]
    },
    {
      id: "zone-4",
      label: "$4 Zone",
      fee: 4.00,
      areas: [
        "Cranborne",
        "Graniteside",
        "Greencroft",
        "Mabelreign",
        "Marlborough",
        "Westlea",
        "Monavale",
        "Emerald Hill",
        "Msasa",
        "Prospect",
        "Warren Park",
        "Tynwald",
        "Waterfalls",
        "Pomona",
        "Vainona",
        "Hatcliffe"
      ]
    },
    {
      id: "zone-5",
      label: "$5 Zone",
      fee: 5.00,
      areas: [
        "Borrowdale",
        "Sam Levy / Sam Levy's Village",
        "Borrowdale Brooke",
        "Chisipite",
        "Greystone Park",
        "Glen Lorne",
        "Bluff Hill",
        "Westgate",
        "Madokero",
        "Kuwadzana",
        "Glen View",
        "Budiriro",
        "Dzivarasekwa",
        "Msasa Park"
      ]
    }
  ]
};

/**
 * Safe helper to retrieve delivery zone and fee configuration for a given area name
 */
function getDeliveryAreaConfig(areaName) {
  if (!areaName || typeof areaName !== 'string') return null;
  const normalized = areaName.trim().toLowerCase();
  for (const zone of DELIVERY_ZONES_CONFIG.zones) {
    const matchedArea = zone.areas.find(a => a.toLowerCase() === normalized);
    if (matchedArea) {
      return {
        name: matchedArea,
        fee: zone.fee,
        zoneId: zone.id,
        zoneLabel: zone.label
      };
    }
  }
  return null;
}

const checkoutState = {
  isOpen: false,
  currentStep: 1, // 1: Review, 2: Customer, 3: Delivery, 4: Payment, 5: Confirm
  highestStepReached: 1,
  customerName: localStorage.getItem('bamboo_select_customer_name') || '',
  customerPhone: localStorage.getItem('bamboo_select_customer_phone') || '',
  additionalContact: localStorage.getItem('bamboo_select_additional_contact') || '',
  deliveryArea: localStorage.getItem('bamboo_select_delivery_area') || '',
  deliveryLocation: localStorage.getItem('bamboo_select_delivery_location') || '',
  nearbyLandmark: localStorage.getItem('bamboo_select_nearby_landmark') || '',
  deliveryInstructions: localStorage.getItem('bamboo_select_delivery_instructions') || '',
  paymentMethod: 'Cash on Delivery',
  confirmedCheckbox: false,
  isSubmitting: false,
  confirmedOrder: null,
  validationErrors: {}
};

/**
 * Calculates item totals, bulk box discounts, delivery fee, and grand total.
 * Safe fallback for both basePrice and price properties.
 */
function calculateCheckoutFinancials() {
  const policy = DISCOUNT_CONFIG.policies[DISCOUNT_CONFIG.activePolicy];
  const totalBoxCount = appState.cart
    .filter(item => item.isBox)
    .reduce((sum, item) => sum + item.quantity, 0);

  const boxCalculation = policy ? policy.calculate(totalBoxCount, 10.00) : { applied: false, unitPrice: 10.00, discountTotal: 0 };

  let subtotal = 0;
  let totalItemsCount = 0;
  let totalDiscountSavings = 0;

  const items = appState.cart.map(cartItem => {
    const rawPrice = Number(cartItem.basePrice ?? cartItem.price ?? 0);
    let effectiveUnitPrice = rawPrice;
    let isBoxDiscounted = false;

    if (cartItem.isBox && boxCalculation.applied) {
      effectiveUnitPrice = boxCalculation.unitPrice;
      const savings = (rawPrice - effectiveUnitPrice) * cartItem.quantity;
      totalDiscountSavings += savings;
      isBoxDiscounted = true;
    }

    const lineTotal = effectiveUnitPrice * cartItem.quantity;
    subtotal += lineTotal;
    totalItemsCount += cartItem.quantity;

    return {
      ...cartItem,
      rawPrice,
      effectiveUnitPrice,
      isBoxDiscounted,
      lineTotal
    };
  });

  const areaConfig = getDeliveryAreaConfig(checkoutState.deliveryArea);
  const deliveryFee = areaConfig ? areaConfig.fee : null;
  const grandTotal = subtotal + (deliveryFee !== null ? deliveryFee : 0);

  let deliveryFeeLabel = "Select your delivery area";
  if (deliveryFee !== null) {
    deliveryFeeLabel = `$${deliveryFee.toFixed(2)}`;
  }

  return {
    items,
    subtotal,
    discountSavings: totalDiscountSavings,
    deliveryFee,
    deliveryArea: areaConfig ? areaConfig.name : '',
    deliveryFeeLabel,
    grandTotal,
    totalItemsCount
  };
}

/**
 * Open Checkout Modal
 */
function openCheckout(step = 1) {
  if (!appState.cart || appState.cart.length === 0) {
    showToastNotification("Your bag is empty. Please select items first.");
    return;
  }

  checkoutState.isOpen = true;
  checkoutState.currentStep = step;
  checkoutState.highestStepReached = Math.max(checkoutState.highestStepReached, step);
  checkoutState.validationErrors = {};

  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('active');

  const progressBar = document.getElementById('checkout-progress-bar');
  if (progressBar && !checkoutState.confirmedOrder) {
    progressBar.style.display = 'flex';
  }

  renderCheckoutProgress(step);
  renderCheckoutStep(step);
}

/**
 * Close Checkout Modal
 */
function closeCheckout() {
  if (checkoutState.isSubmitting) return; // Guard during submission

  // Close area picker if open
  closeAreaPicker();

  if (checkoutState.confirmedOrder) {
    startNewOrder();
    return;
  }

  checkoutState.isOpen = false;
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');

  if (typeof flushPendingPWAUpdate === 'function') {
    flushPendingPWAUpdate();
  }
}

/**
 * Step navigation with validation guards
 */
function setCheckoutStep(step) {
  if (checkoutState.isSubmitting) return;

  // Validate Step 2 if moving forward from step 2
  if (checkoutState.currentStep === 2 && step > 2) {
    if (!validateStep2Fields()) {
      renderCheckoutStep(2);
      return;
    }
  }

  // Validate Step 3 if moving forward from step 3
  if (checkoutState.currentStep === 3 && step > 3) {
    if (!validateStep3Fields()) {
      if (checkoutState.validationErrors.deliveryArea) {
        showToastNotification(checkoutState.validationErrors.deliveryArea);
      } else {
        showToastNotification("Please complete your delivery address and landmark.");
      }
      renderCheckoutStep(3);
      return;
    }
  }

  // Guard against navigating directly to Step 4 or 5 without valid step 2 & 3
  if (step >= 4) {
    if (!validateStep2Fields()) {
      renderCheckoutStep(2);
      return;
    }
    if (!validateStep3Fields()) {
      if (checkoutState.validationErrors.deliveryArea) {
        showToastNotification(checkoutState.validationErrors.deliveryArea);
      }
      renderCheckoutStep(3);
      return;
    }
  }

  checkoutState.currentStep = step;
  checkoutState.highestStepReached = Math.max(checkoutState.highestStepReached, step);
  renderCheckoutProgress(step);
  renderCheckoutStep(step);

  const modalBody = document.getElementById('checkout-modal-body');
  if (modalBody) modalBody.scrollTop = 0;
}

/**
 * Validate customer contact information (Step 2)
 */
function validateStep2Fields() {
  const errors = {};
  const name = (checkoutState.customerName || '').trim();
  const phone = (checkoutState.customerPhone || '').trim();

  if (!name) {
    errors.customerName = "Please enter your full name.";
  }

  if (!phone) {
    errors.customerPhone = "Please enter your phone number.";
  } else {
    const cleanedDigits = phone.replace(/[^0-9+]/g, '');
    if (cleanedDigits.length < 9) {
      errors.customerPhone = "Please enter a valid phone number (e.g. 077 123 4567).";
    }
  }

  checkoutState.validationErrors = errors;
  return Object.keys(errors).length === 0;
}

/**
 * Validate delivery area, street address, and landmark (Step 3)
 */
function validateStep3Fields() {
  const errors = {};
  const area = (checkoutState.deliveryArea || '').trim();
  const areaConfig = getDeliveryAreaConfig(area);
  const location = (checkoutState.deliveryLocation || '').trim();
  const landmark = (checkoutState.nearbyLandmark || '').trim();

  if (!area) {
    errors.deliveryArea = "Please select your delivery area before continuing.";
  } else if (!areaConfig) {
    errors.deliveryArea = "Your location isn't currently listed in our Select delivery zones. Call Bamboo Chicken and we'll check delivery availability for you.";
  }

  if (!location) {
    errors.deliveryLocation = "Please enter your street address or detailed location.";
  }

  if (!landmark) {
    errors.nearbyLandmark = "Please provide a recognizable nearby landmark (e.g. Near Sam Levy's or Meikles Hotel).";
  }

  checkoutState.validationErrors = errors;
  return Object.keys(errors).length === 0;
}

/**
 * Render Step Progression Nodes & Connectors
 */
function renderCheckoutProgress(step) {
  const progressBar = document.getElementById('checkout-progress-bar');
  if (!progressBar) return;

  if (checkoutState.confirmedOrder) {
    progressBar.style.display = 'none';
    return;
  }

  progressBar.style.display = 'flex';

  for (let i = 1; i <= 5; i++) {
    const node = document.getElementById(`step-node-${i}`);
    if (node) {
      if (i < step) {
        node.className = 'checkout-step-node completed';
        node.style.cursor = 'pointer';
        node.onclick = () => setCheckoutStep(i);
      } else if (i === step) {
        node.className = 'checkout-step-node active';
        node.style.cursor = 'default';
        node.onclick = null;
      } else {
        node.className = 'checkout-step-node';
        if (i <= checkoutState.highestStepReached) {
          node.style.cursor = 'pointer';
          node.onclick = () => setCheckoutStep(i);
        } else {
          node.style.cursor = 'default';
          node.onclick = null;
        }
      }
    }

    if (i < 5) {
      const conn = document.getElementById(`conn-${i}-${i+1}`);
      if (conn) {
        conn.className = i < step ? 'step-connector completed' : 'step-connector';
      }
    }
  }
}

/**
 * Main Step Router
 */
function renderCheckoutStep(step) {
  const titleEl = document.getElementById('checkout-step-title');
  const bodyEl = document.getElementById('checkout-modal-body');
  const footerEl = document.getElementById('checkout-modal-footer');
  if (!bodyEl || !footerEl) return;

  if (checkoutState.confirmedOrder) {
    renderConfirmationView(bodyEl, footerEl, titleEl);
    return;
  }

  const financials = calculateCheckoutFinancials();

  switch (step) {
    case 1:
      renderStep1(bodyEl, footerEl, titleEl, financials);
      break;
    case 2:
      renderStep2(bodyEl, footerEl, titleEl);
      break;
    case 3:
      renderStep3(bodyEl, footerEl, titleEl, financials);
      break;
    case 4:
      renderStep4(bodyEl, footerEl, titleEl, financials);
      break;
    case 5:
      renderStep5(bodyEl, footerEl, titleEl, financials);
      break;
    default:
      renderStep1(bodyEl, footerEl, titleEl, financials);
  }
}

/**
 * STEP 1: REVIEW YOUR ORDER
 */
function renderStep1(bodyEl, footerEl, titleEl, financials) {
  if (titleEl) titleEl.textContent = "Review Your Order";

  if (!financials.items || financials.items.length === 0) {
    bodyEl.innerHTML = `
      <div style="text-align: center; padding: 44px 16px; color: #6B7280;">
        <div style="font-size: 2.8rem; margin-bottom: 14px;">🛍️</div>
        <h3 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: #111827; margin: 0 0 6px 0;">Your Bag is Empty</h3>
        <p style="font-size: 0.88rem; line-height: 1.45; margin: 0 0 24px 0;">Select your ready-to-eat skewers or finish-at-home boxes from the menu to continue.</p>
        <button type="button" class="btn-checkout-back" onclick="closeCheckout();" style="width: auto; padding: 10px 24px;">← Back to Menu</button>
      </div>
    `;
    footerEl.innerHTML = `
      <button type="button" class="btn-checkout-back" onclick="closeCheckout();">← Back to Menu</button>
      <button type="button" class="btn-checkout-next" disabled>Continue to Customer Details →</button>
    `;
    return;
  }

  const itemsHtml = financials.items.map(item => `
    <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid #F3F4F6;">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 56px; height: 56px; border-radius: 10px; object-fit: cover; border: 1px solid #E5E7EB; flex-shrink: 0;" />
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 700; font-size: 0.95rem; color: #111827; line-height: 1.25;">${escapeHtml(item.name)}</div>
        <div style="font-size: 0.78rem; color: #6B7280; margin-top: 2px;">
          ${escapeHtml(item.unit || item.description || '')} · <strong>${item.quantity} × $${item.effectiveUnitPrice.toFixed(2)}</strong>
        </div>
        ${item.isBoxDiscounted ? `<div style="font-size: 0.76rem; color:#B45309; font-weight:700; margin-top: 2px;">Bulk tier applied (-$0.50/box)</div>` : ''}
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <button type="button" onclick="modifyCartItemQty('${item.id}', -1)" style="width: 28px; height: 28px; border: 1.5px solid #CBD5E1; background: white; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;" aria-label="Decrease quantity">-</button>
          <span style="font-weight: 800; font-size: 0.92rem; min-width: 20px; text-align: center;">${item.quantity}</span>
          <button type="button" onclick="modifyCartItemQty('${item.id}', 1)" style="width: 28px; height: 28px; border: 1.5px solid #CBD5E1; background: white; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;" aria-label="Increase quantity">+</button>
        </div>
        <div style="font-weight: 800; font-size: 0.98rem; color: #111827; margin-top: 2px;">$${item.lineTotal.toFixed(2)}</div>
        <button type="button" class="btn-item-remove" onclick="removeItemFromCart('${item.id}')" aria-label="Remove item">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Remove
        </button>
      </div>
    </div>
  `).join('');

  bodyEl.innerHTML = `
    <div>
      <p style="font-size: 0.88rem; color: #4B5563; margin-bottom: 14px;">
        Check your items before continuing.
      </p>

      <!-- 3-LAYER COST BREAKDOWN: YOUR FOOD + DELIVERY = TOTAL TO PAY -->
      <div class="cost-hierarchy-card">
        <!-- SECTION A: YOUR FOOD -->
        <div class="cost-layer-food">
          <div class="cost-layer-header">
            <span class="cost-layer-badge">
              <span>🥢</span>
              <span>YOUR FOOD</span>
            </span>
            <span class="cost-layer-badge-tag">${financials.totalItemsCount} ${financials.totalItemsCount === 1 ? 'item' : 'items'}</span>
          </div>

          <div style="margin-bottom: 4px;">
            ${itemsHtml}
          </div>

          ${financials.discountSavings > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 0.86rem; color: #059669; font-weight: 700; margin-top: 8px; padding-top: 8px; border-top: 1px dashed #E5E7EB;">
              <span>Finish-at-Home Bulk Savings (3+ boxes)</span>
              <span>-$${financials.discountSavings.toFixed(2)}</span>
            </div>
          ` : ''}

          <div class="cost-food-subtotal-row">
            <span class="cost-food-subtotal-label">Food total</span>
            <span class="cost-food-subtotal-val">$${financials.subtotal.toFixed(2)}</span>
          </div>
        </div>

        <!-- SECTION B: DELIVERY -->
        <div class="cost-layer-delivery">
          <div class="cost-layer-header">
            <span class="cost-layer-badge">
              <span>🛵</span>
              <span>DELIVERY</span>
            </span>
            <span class="cost-layer-badge-tag">Delivery only</span>
          </div>
          <div class="cost-delivery-row">
            <div>
              <div class="cost-delivery-area-title ${financials.deliveryFee === null ? 'pending' : ''}">
                ${financials.deliveryFee !== null 
                  ? `Delivery to ${escapeHtml(financials.deliveryArea)}` 
                  : `Harare Delivery Area`}
              </div>
              <div class="cost-delivery-subtext">
                ${financials.deliveryFee !== null 
                  ? `Fixed Select delivery fee` 
                  : `Select your area in Step 3 ($2.00 – $5.00)`}
              </div>
            </div>
            <div class="cost-delivery-fee-val ${financials.deliveryFee === null ? 'pending' : ''}">
              ${financials.deliveryFee !== null 
                ? `$${financials.deliveryFee.toFixed(2)}` 
                : 'Pending in Step 3'}
            </div>
          </div>
        </div>

        <!-- SECTION C: TOTAL TO PAY -->
        <div class="cost-layer-total">
          <div class="cost-total-row">
            <span class="cost-total-label">TOTAL TO PAY</span>
            <span class="cost-total-amount">$${financials.grandTotal.toFixed(2)}</span>
          </div>
          <div class="cost-total-clarification ${financials.deliveryFee === null ? 'pending' : ''}">
            ${financials.deliveryFee !== null 
              ? `<strong>$${financials.subtotal.toFixed(2)} food</strong> + <strong>$${financials.deliveryFee.toFixed(2)} delivery</strong>` 
              : `<strong>$${financials.subtotal.toFixed(2)} food</strong> + delivery fee pending (calculated in Step 3)`}
          </div>
        </div>
      </div>
    </div>
  `;

  footerEl.innerHTML = `
    <button type="button" class="btn-checkout-back" onclick="closeCheckout();">← Back to Menu</button>
    <button type="button" class="btn-checkout-next" onclick="setCheckoutStep(2);">Continue to Customer Details →</button>
  `;
}

/**
 * STEP 2: CUSTOMER DETAILS
 */
function renderStep2(bodyEl, footerEl, titleEl) {
  if (titleEl) titleEl.textContent = "Your Details";
  const errs = checkoutState.validationErrors || {};

  bodyEl.innerHTML = `
    <div>
      <p style="font-size: 0.88rem; color: #4B5563; margin-bottom: 16px;">
        Tell us who to contact about your delivery.
      </p>

      <div class="form-group">
        <label class="form-label" for="checkout-name-input">
          Full Name <span class="required-star">*</span>
        </label>
        <input 
          type="text" 
          id="checkout-name-input" 
          class="form-input ${errs.customerName ? 'error' : ''}" 
          placeholder="Enter your full name"
          value="${escapeHtml(checkoutState.customerName)}"
          autocomplete="name"
        />
        <div class="form-error-msg ${errs.customerName ? 'visible' : ''}">
          ${errs.customerName || ''}
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="checkout-phone-input">
          Phone Number <span class="required-star">*</span>
        </label>
        <input 
          type="tel" 
          id="checkout-phone-input" 
          class="form-input ${errs.customerPhone ? 'error' : ''}" 
          placeholder="e.g. 0771234567"
          value="${escapeHtml(checkoutState.customerPhone)}"
          autocomplete="tel"
        />
        <div class="form-help-text">Our delivery team will contact you on this number when dispatching and delivering.</div>
        <div class="form-error-msg ${errs.customerPhone ? 'visible' : ''}">
          ${errs.customerPhone || ''}
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="checkout-alt-phone-input">
          Additional Contact Information <span style="font-weight: 500; color: #6B7280;">(Optional)</span>
        </label>
        <input 
          type="text" 
          id="checkout-alt-phone-input" 
          class="form-input" 
          placeholder="e.g. Alternate phone or WhatsApp number"
          value="${escapeHtml(checkoutState.additionalContact)}"
        />
        <div class="form-help-text">Optional secondary contact if your primary phone is busy.</div>
      </div>
    </div>
  `;

  const nameInput = document.getElementById('checkout-name-input');
  const phoneInput = document.getElementById('checkout-phone-input');
  const altInput = document.getElementById('checkout-alt-phone-input');

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      checkoutState.customerName = e.target.value;
      localStorage.setItem('bamboo_select_customer_name', checkoutState.customerName);
      if (checkoutState.validationErrors.customerName) {
        delete checkoutState.validationErrors.customerName;
        e.target.classList.remove('error');
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      checkoutState.customerPhone = e.target.value;
      localStorage.setItem('bamboo_select_customer_phone', checkoutState.customerPhone);
      if (checkoutState.validationErrors.customerPhone) {
        delete checkoutState.validationErrors.customerPhone;
        e.target.classList.remove('error');
      }
    });
  }

  if (altInput) {
    altInput.addEventListener('input', (e) => {
      checkoutState.additionalContact = e.target.value;
      localStorage.setItem('bamboo_select_additional_contact', checkoutState.additionalContact);
    });
  }

  footerEl.innerHTML = `
    <button type="button" class="btn-checkout-back" onclick="setCheckoutStep(1);">← Back to Order Review</button>
    <button type="button" class="btn-checkout-next" onclick="setCheckoutStep(3);">Continue to Delivery Details →</button>
  `;
}

/**
 * ==========================================
 * CUSTOM BAMBOO CHICKEN SELECT DELIVERY AREA PICKER
 * (Zero native <select> interface — Mobile-first bottom sheet / modal)
 * ==========================================
 */
let areaPickerState = {
  searchQuery: '',
  isOpen: false
};

function openAreaPicker() {
  const modalEl = document.getElementById('area-picker-modal');
  const searchInput = document.getElementById('area-picker-search-input');
  const clearBtn = document.getElementById('area-picker-clear-btn');
  const triggerBtn = document.getElementById('btn-open-area-picker');
  if (!modalEl) return;

  areaPickerState.isOpen = true;
  areaPickerState.searchQuery = '';

  if (triggerBtn) {
    triggerBtn.setAttribute('aria-expanded', 'true');
  }

  if (searchInput) {
    searchInput.value = '';
    setTimeout(() => {
      searchInput.focus();
    }, 150);
  }
  if (clearBtn) clearBtn.style.display = 'none';

  renderAreaPickerList('');

  modalEl.classList.add('active');
  modalEl.setAttribute('aria-hidden', 'false');

  // Prevent background body scrolling while picker is open
  document.body.style.overflow = 'hidden';

  // Smoothly scroll to currently selected area if present
  setTimeout(() => {
    const selectedRow = modalEl.querySelector('.area-picker-row.is-selected');
    if (selectedRow) {
      selectedRow.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, 120);
}

function closeAreaPicker() {
  const modalEl = document.getElementById('area-picker-modal');
  if (!modalEl) return;

  areaPickerState.isOpen = false;
  modalEl.classList.remove('active');
  modalEl.setAttribute('aria-hidden', 'true');

  // Restore background scrolling if checkout modal is not open
  if (!checkoutState.isOpen) {
    document.body.style.overflow = '';
  }

  // Return focus to trigger button
  const triggerBtn = document.getElementById('btn-open-area-picker');
  if (triggerBtn) {
    triggerBtn.setAttribute('aria-expanded', 'false');
    triggerBtn.focus();
  }
}

function clearAreaPickerSearch() {
  const searchInput = document.getElementById('area-picker-search-input');
  const clearBtn = document.getElementById('area-picker-clear-btn');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';
  areaPickerState.searchQuery = '';
  renderAreaPickerList('');
}

function selectDeliveryArea(areaName) {
  checkoutState.deliveryArea = areaName;
  localStorage.setItem('bamboo_select_delivery_area', areaName);

  if (checkoutState.validationErrors.deliveryArea) {
    delete checkoutState.validationErrors.deliveryArea;
  }

  // Close the custom picker smoothly
  closeAreaPicker();

  // Live update Step 3 area button, fees, and totals
  updateStep3AreaDisplay();
}

function updateStep3AreaDisplay() {
  const areaConfig = getDeliveryAreaConfig(checkoutState.deliveryArea);
  const fin = calculateCheckoutFinancials();

  // 1. Update Custom Trigger Field
  const triggerBtn = document.getElementById('btn-open-area-picker');
  if (triggerBtn) {
    triggerBtn.classList.remove('error');
    const contentEl = triggerBtn.querySelector('.area-btn-content');
    const trailingEl = triggerBtn.querySelector('.area-btn-trailing');

    if (contentEl) {
      if (areaConfig) {
        contentEl.innerHTML = `
          <div class="area-btn-selected-title">${escapeHtml(areaConfig.name)}</div>
          <div class="area-btn-selected-sub">Delivery fee · <strong>$${areaConfig.fee.toFixed(2)}</strong></div>
        `;
      } else {
        contentEl.innerHTML = `
          <span class="area-btn-placeholder">Choose your delivery area</span>
        `;
      }
    }

    if (trailingEl) {
      trailingEl.innerHTML = `
        ${areaConfig ? `<span class="area-btn-fee-pill">$${areaConfig.fee.toFixed(2)}</span>` : ''}
        <svg class="area-btn-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
    }
  }

  // 2. Hide error message if active
  const errEl = document.getElementById('checkout-area-error');
  if (errEl) {
    errEl.classList.remove('visible');
    errEl.textContent = '';
  }

  // 3. Update summary card in Step 3
  const areaEl = document.getElementById('step3-summary-area');
  const feeLabelEl = document.getElementById('step3-summary-fee-label');
  const feeBadgeEl = document.getElementById('step3-summary-fee-container');
  const totalEl = document.getElementById('step3-summary-total-amount');
  const clarificationEl = document.getElementById('step3-summary-clarification');
  const fallbackCard = document.getElementById('unlisted-area-fallback');

  if (fallbackCard) {
    fallbackCard.classList.remove('active-highlight');
  }

  if (areaEl) {
    areaEl.textContent = fin.deliveryArea 
      ? `Delivery to ${fin.deliveryArea} ($${(fin.deliveryFee || 0).toFixed(2)} fixed fee)` 
      : 'Select your area above';
  }

  if (feeLabelEl) {
    feeLabelEl.textContent = fin.deliveryArea ? `Delivery to ${fin.deliveryArea}:` : 'Delivery fee:';
  }

  if (feeBadgeEl) {
    feeBadgeEl.innerHTML = fin.deliveryFee !== null 
      ? `<span class="delivery-fee-badge delivery-fee-badge-active">$${fin.deliveryFee.toFixed(2)}</span>`
      : `<span class="delivery-fee-badge">Select your area above</span>`;
  }

  if (totalEl) {
    totalEl.textContent = `$${fin.grandTotal.toFixed(2)}`;
  }

  if (clarificationEl) {
    clarificationEl.innerHTML = fin.deliveryFee !== null 
      ? `<strong>$${fin.subtotal.toFixed(2)} food</strong> + <strong>$${fin.deliveryFee.toFixed(2)} delivery</strong>` 
      : `<strong>$${fin.subtotal.toFixed(2)} food</strong> + delivery fee pending`;
  }
}

function renderAreaPickerList(query) {
  const container = document.getElementById('area-picker-list-container');
  if (!container) return;

  const q = (query || '').trim().toLowerCase();
  const currentSelected = (checkoutState.deliveryArea || '').toLowerCase();

  // Search Results Mode
  if (q) {
    const matchedItems = [];
    DELIVERY_ZONES_CONFIG.zones.forEach(zone => {
      zone.areas.forEach(area => {
        if (area.toLowerCase().includes(q)) {
          matchedItems.push({
            name: area,
            fee: zone.fee,
            zoneLabel: zone.label
          });
        }
      });
    });

    if (matchedItems.length === 0) {
      container.innerHTML = `
        <div class="area-not-found-box">
          <div style="font-size: 2rem; margin-bottom: 6px;">📍</div>
          <div class="area-not-found-title">Area not found</div>
          <div class="area-not-found-desc">
            We couldn't find that area in the current Select delivery zones.
          </div>
          <a href="tel:${BAMBOO_CONTACT_NUMBER}" class="btn-call-bamboo" style="display: inline-flex; margin: 0 auto;" aria-label="Call Bamboo Chicken at ${BAMBOO_CONTACT_NUMBER}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call Bamboo Chicken</span>
            <span class="btn-phone-number">${BAMBOO_CONTACT_NUMBER}</span>
          </a>
        </div>
      `;
      return;
    }

    const rowsHtml = matchedItems.map(item => {
      const isSelected = currentSelected === item.name.toLowerCase();
      return `
        <button 
          type="button" 
          class="area-picker-row ${isSelected ? 'is-selected' : ''}" 
          onclick="selectDeliveryArea('${escapeHtml(item.name).replace(/'/g, "\\'")}')"
          role="option"
          aria-selected="${isSelected ? 'true' : 'false'}"
        >
          <div class="area-picker-row-info">
            <div class="area-picker-row-title">${escapeHtml(item.name)}</div>
            <div class="area-picker-row-sub">Delivery · $${item.fee.toFixed(2)}</div>
          </div>
          <div class="area-picker-row-trailing">
            <span class="area-picker-fee-tag">$${item.fee.toFixed(2)}</span>
            ${isSelected ? `
              <div class="area-picker-check-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ` : ''}
          </div>
        </button>
      `;
    }).join('');

    container.innerHTML = `
      <div style="font-size: 0.75rem; color: #6B7280; margin-bottom: 8px; font-weight: 600;">
        ${matchedItems.length} ${matchedItems.length === 1 ? 'matching area' : 'matching areas'} found
      </div>
      <div class="area-picker-group-items">
        ${rowsHtml}
      </div>
    `;
    return;
  }

  // Default Grouped Mode ($2 DELIVERY, $3 DELIVERY, $4 DELIVERY, $5 DELIVERY)
  const groupsHtml = DELIVERY_ZONES_CONFIG.zones.map(zone => {
    const feeFormatted = `$${zone.fee.toFixed(0)} DELIVERY`;
    const rowsHtml = zone.areas.map(area => {
      const isSelected = currentSelected === area.toLowerCase();
      return `
        <button 
          type="button" 
          class="area-picker-row ${isSelected ? 'is-selected' : ''}" 
          onclick="selectDeliveryArea('${escapeHtml(area).replace(/'/g, "\\'")}')"
          role="option"
          aria-selected="${isSelected ? 'true' : 'false'}"
        >
          <div class="area-picker-row-info">
            <div class="area-picker-row-title">${escapeHtml(area)}</div>
            <div class="area-picker-row-sub">Delivery · $${zone.fee.toFixed(2)}</div>
          </div>
          <div class="area-picker-row-trailing">
            <span class="area-picker-fee-tag">$${zone.fee.toFixed(2)}</span>
            ${isSelected ? `
              <div class="area-picker-check-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ` : ''}
          </div>
        </button>
      `;
    }).join('');

    return `
      <div class="area-picker-group">
        <div class="area-picker-group-header">
          <span>${feeFormatted}</span>
        </div>
        <div class="area-picker-group-items">
          ${rowsHtml}
        </div>
      </div>
    `;
  }).join('');

  // Include the approved unlisted-area fallback card at bottom
  const fallbackHtml = `
    <div class="unlisted-area-card" style="margin-top: 14px;">
      <div class="unlisted-area-header">
        <span class="unlisted-area-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Can't find your area?</span>
        </span>
      </div>
      <p class="unlisted-area-desc">
        Your location isn't currently listed in our Select delivery zones. Call Bamboo Chicken and we'll check delivery availability for you.
      </p>
      <div class="unlisted-area-action-row">
        <a href="tel:${BAMBOO_CONTACT_NUMBER}" class="btn-call-bamboo" aria-label="Call Bamboo Chicken at ${BAMBOO_CONTACT_NUMBER} to check delivery availability">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Bamboo Chicken</span>
          <span class="btn-phone-number">${BAMBOO_CONTACT_NUMBER}</span>
        </a>
      </div>
    </div>
  `;

  container.innerHTML = groupsHtml + fallbackHtml;
}

function initAreaPickerListeners() {
  const modalEl = document.getElementById('area-picker-modal');
  const searchInput = document.getElementById('area-picker-search-input');
  const clearBtn = document.getElementById('area-picker-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      areaPickerState.searchQuery = val;
      if (clearBtn) {
        clearBtn.style.display = val ? 'flex' : 'none';
      }
      renderAreaPickerList(val);
    });
  }

  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      // Close if user clicked outside the sheet
      if (e.target === modalEl) {
        closeAreaPicker();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && areaPickerState.isOpen) {
      closeAreaPicker();
    }
  });
}

/**
 * STEP 3: DELIVERY DETAILS (DELIVERY-ONLY)
 */
function renderStep3(bodyEl, footerEl, titleEl, financials) {
  if (titleEl) titleEl.textContent = "Where Should We Deliver?";
  const errs = checkoutState.validationErrors || {};
  const areaConfig = getDeliveryAreaConfig(checkoutState.deliveryArea);

  bodyEl.innerHTML = `
    <div>
      <div class="delivery-notice-banner">
        <div class="icon">🛵</div>
        <div>
          <div class="text-title">Delivery Only</div>
          <div class="text-desc">
            Bamboo Chicken Select is delivery only. Pickup, collection, or store pickup is not available. Provide a clear location so our team can arrange your delivery.
          </div>
        </div>
      </div>

      <!-- 1. Custom Delivery Area Selector (Zero Native <select>) -->
      <div class="form-group">
        <label class="form-label" id="delivery-area-label">
          Delivery Area <span class="required-star">*</span>
        </label>
        <button 
          type="button" 
          id="btn-open-area-picker" 
          class="custom-area-select-btn ${errs.deliveryArea ? 'error' : ''}" 
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-labelledby="delivery-area-label"
          onclick="openAreaPicker();"
        >
          <div class="area-btn-content">
            ${areaConfig ? `
              <div class="area-btn-selected-title">${escapeHtml(areaConfig.name)}</div>
              <div class="area-btn-selected-sub">Delivery fee · <strong>$${areaConfig.fee.toFixed(2)}</strong></div>
            ` : `
              <span class="area-btn-placeholder">Choose your delivery area</span>
            `}
          </div>
          <div class="area-btn-trailing">
            ${areaConfig ? `<span class="area-btn-fee-pill">$${areaConfig.fee.toFixed(2)}</span>` : ''}
            <svg class="area-btn-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </button>
        <div class="form-error-msg ${errs.deliveryArea ? 'visible' : ''}" id="checkout-area-error">
          ${errs.deliveryArea || ''}
        </div>

        <!-- Can't find your area? — Delivery Area Fallback Card -->
        <div class="unlisted-area-card ${checkoutState.deliveryArea === '__unlisted__' ? 'active-highlight' : ''}" id="unlisted-area-fallback">
          <div class="unlisted-area-header">
            <span class="unlisted-area-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Can't find your area?</span>
            </span>
          </div>
          <p class="unlisted-area-desc">
            Your location isn't currently listed in our Select delivery zones. Call Bamboo Chicken and we'll check delivery availability for you.
          </p>
          <div class="unlisted-area-action-row">
            <a href="tel:${BAMBOO_CONTACT_NUMBER}" class="btn-call-bamboo" aria-label="Call Bamboo Chicken at ${BAMBOO_CONTACT_NUMBER} to check delivery availability">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Call Bamboo Chicken</span>
              <span class="btn-phone-number">${BAMBOO_CONTACT_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- 2. Street Address / Destination -->
      <div class="form-group">
        <label class="form-label" for="checkout-location-input">
          Delivery Address / Street <span class="required-star">*</span>
        </label>
        <input 
          type="text" 
          id="checkout-location-input" 
          class="form-input ${errs.deliveryLocation ? 'error' : ''}" 
          placeholder="Enter house/flat number and street (e.g. 1223 Rujeko Road)"
          value="${escapeHtml(checkoutState.deliveryLocation)}"
          autocomplete="street-address"
        />
        <div class="form-error-msg ${errs.deliveryLocation ? 'visible' : ''}">
          ${errs.deliveryLocation || ''}
        </div>
      </div>

      <!-- 3. Nearby Landmark -->
      <div class="form-group">
        <label class="form-label" for="checkout-landmark-input">
          Nearby Landmark <span class="required-star">*</span>
        </label>
        <input 
          type="text" 
          id="checkout-landmark-input" 
          class="form-input ${errs.nearbyLandmark ? 'error' : ''}" 
          placeholder="e.g. Near Sam Levy's / Opposite Meikles Hotel"
          value="${escapeHtml(checkoutState.nearbyLandmark)}"
        />
        <div class="form-help-text">A well-known building, school, shop, or intersection helps our courier locate you without delay.</div>
        <div class="form-error-msg ${errs.nearbyLandmark ? 'visible' : ''}">
          ${errs.nearbyLandmark || ''}
        </div>
      </div>

      <!-- 4. Delivery Instructions (Optional) -->
      <div class="form-group">
        <label class="form-label" for="checkout-instructions-input">
          Delivery Instructions <span style="font-weight: 500; color: #6B7280;">(Optional)</span>
        </label>
        <textarea 
          id="checkout-instructions-input" 
          rows="2" 
          class="form-textarea" 
          placeholder="Gate details, directions, preferred contact instructions, or other useful information."
        >${escapeHtml(checkoutState.deliveryInstructions)}</textarea>
      </div>

      <!-- Compact Delivery Summary with Food + Delivery Clarity -->
      <div class="review-summary-box">
        <div class="review-summary-header">
          <span class="review-summary-title">Delivery Summary</span>
          <span class="payment-badge payment-badge-active" style="margin-left: 0;">Delivery only</span>
        </div>
        <div style="font-size: 0.88rem; color: #111827; margin-bottom: 4px;">
          👤 Recipient: <strong>${escapeHtml(checkoutState.customerName || 'Pending entry')}</strong> • 📞 <strong>${escapeHtml(checkoutState.customerPhone || 'Pending entry')}</strong>
        </div>
        <div style="font-size: 0.84rem; color: #4B5563; margin-top: 6px;">
          🏙️ Delivery Area: <strong id="step3-summary-area" style="color: #111827;">${financials.deliveryArea ? `Delivery to ${escapeHtml(financials.deliveryArea)} ($${(financials.deliveryFee || 0).toFixed(2)} fixed fee)` : 'Select your area above'}</strong>
        </div>
        <div style="font-size: 0.84rem; color: #4B5563; margin-top: 2px;">
          📍 Street Address: <strong id="step3-summary-location">${escapeHtml(checkoutState.deliveryLocation || 'Pending entry')}</strong>
        </div>
        <div style="font-size: 0.84rem; color: #4B5563; margin-top: 2px;">
          🏛️ Landmark: <strong id="step3-summary-landmark">${escapeHtml(checkoutState.nearbyLandmark || 'Pending entry')}</strong>
        </div>
        ${checkoutState.deliveryInstructions ? `
          <div style="font-size: 0.82rem; color: #6B7280; margin-top: 4px;">
            📝 Instructions: ${escapeHtml(checkoutState.deliveryInstructions)}
          </div>
        ` : ''}

        <!-- Financial breakdown inside delivery summary -->
        <div style="border-top: 1px dashed #E5E7EB; padding-top: 8px; margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.84rem; margin-bottom: 5px;">
            <span style="color: #4B5563; font-weight: 600;">Food total:</span>
            <span style="font-weight: 700; color: #111827;">$${financials.subtotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.84rem;">
            <span style="color: #4B5563; font-weight: 600;" id="step3-summary-fee-label">
              ${financials.deliveryArea ? `Delivery to ${escapeHtml(financials.deliveryArea)}:` : 'Delivery fee:'}
            </span>
            <span id="step3-summary-fee-container">
              ${financials.deliveryFee !== null ? `
                <span class="delivery-fee-badge delivery-fee-badge-active">$${financials.deliveryFee.toFixed(2)}</span>
              ` : `
                <span class="delivery-fee-badge">Select your area above</span>
              `}
            </span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: baseline; padding-top: 8px; margin-top: 6px; border-top: 1.5px solid #E5E7EB;">
          <span style="font-family: var(--font-display); font-size: 0.88rem; font-weight: 800; text-transform: uppercase; color: #121214;">TOTAL TO PAY</span>
          <span id="step3-summary-total-amount" style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: #121214;">$${financials.grandTotal.toFixed(2)}</span>
        </div>
        <div id="step3-summary-clarification" style="font-size: 0.82rem; color: #4B5563; margin-top: 3px; font-weight: 600;">
          ${financials.deliveryFee !== null 
            ? `<strong>$${financials.subtotal.toFixed(2)} food</strong> + <strong>$${financials.deliveryFee.toFixed(2)} delivery</strong>` 
            : `<strong>$${financials.subtotal.toFixed(2)} food</strong> + delivery fee pending`}
        </div>
      </div>
    </div>
  `;

  const locationInput = document.getElementById('checkout-location-input');
  const landmarkInput = document.getElementById('checkout-landmark-input');
  const instructionsInput = document.getElementById('checkout-instructions-input');

  if (locationInput) {
    locationInput.addEventListener('input', (e) => {
      checkoutState.deliveryLocation = e.target.value;
      localStorage.setItem('bamboo_select_delivery_location', checkoutState.deliveryLocation);
      if (checkoutState.validationErrors.deliveryLocation) {
        delete checkoutState.validationErrors.deliveryLocation;
        e.target.classList.remove('error');
      }
      const locSummary = document.getElementById('step3-summary-location');
      if (locSummary) {
        locSummary.textContent = e.target.value.trim() || 'Pending entry';
      }
    });
  }

  if (landmarkInput) {
    landmarkInput.addEventListener('input', (e) => {
      checkoutState.nearbyLandmark = e.target.value;
      localStorage.setItem('bamboo_select_nearby_landmark', checkoutState.nearbyLandmark);
      if (checkoutState.validationErrors.nearbyLandmark) {
        delete checkoutState.validationErrors.nearbyLandmark;
        e.target.classList.remove('error');
      }
      const lmkSummary = document.getElementById('step3-summary-landmark');
      if (lmkSummary) {
        lmkSummary.textContent = e.target.value.trim() || 'Pending entry';
      }
    });
  }

  if (instructionsInput) {
    instructionsInput.addEventListener('input', (e) => {
      checkoutState.deliveryInstructions = e.target.value;
      localStorage.setItem('bamboo_select_delivery_instructions', checkoutState.deliveryInstructions);
    });
  }

  footerEl.innerHTML = `
    <button type="button" class="btn-checkout-back" onclick="setCheckoutStep(2);">← Back to Customer Details</button>
    <button type="button" class="btn-checkout-next" onclick="setCheckoutStep(4);">Continue to Payment →</button>
  `;
}

/**
 * STEP 4: PAYMENT METHOD
 */
function renderStep4(bodyEl, footerEl, titleEl, financials) {
  if (titleEl) titleEl.textContent = "Choose Payment Method";

  bodyEl.innerHTML = `
    <div>
      <p style="font-size: 0.88rem; color: #4B5563; margin-bottom: 16px;">
        Select how you would like to pay for your delivery.
      </p>

      <!-- Option 1: Cash on Delivery (Active & Operational) -->
      <div 
        class="payment-card-option ${checkoutState.paymentMethod === 'Cash on Delivery' ? 'selected' : ''}" 
        onclick="selectPaymentMethod('Cash on Delivery')"
        id="payment-option-cod"
      >
        <input 
          type="radio" 
          name="payment_choice" 
          id="pay-cod" 
          class="payment-radio" 
          ${checkoutState.paymentMethod === 'Cash on Delivery' ? 'checked' : ''} 
        />
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <label for="pay-cod" style="font-weight: 700; font-size: 0.95rem; color: #111827; cursor: pointer;">
              Cash on Delivery
            </label>
            <span class="payment-badge payment-badge-active">Available</span>
          </div>
          <div style="font-size: 0.82rem; color: #4B5563; line-height: 1.4;">
            Pay the delivery team when your order arrives. Exact change is appreciated.
          </div>
        </div>
      </div>

      <!-- Option 2: EcoCash (Placeholder / Coming Soon) -->
      <div 
        class="payment-card-option disabled" 
        onclick="selectPaymentMethod('EcoCash')"
        id="payment-option-ecocash"
      >
        <input 
          type="radio" 
          name="payment_choice" 
          id="pay-ecocash" 
          class="payment-radio" 
          disabled 
        />
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <label for="pay-ecocash" style="font-weight: 700; font-size: 0.95rem; color: #6B7280; cursor: not-allowed;">
              EcoCash
            </label>
            <span class="payment-badge payment-badge-pending">Coming Soon</span>
          </div>
          <div style="font-size: 0.82rem; color: #6B7280; line-height: 1.4;">
            EcoCash payments will be enabled once the merchant details are confirmed.
          </div>
        </div>
      </div>

      <!-- Payment Summary (Food + Delivery to Area = Total to Pay) -->
      <div class="cost-hierarchy-card" style="margin-top: 18px;">
        <div class="cost-layer-food" style="padding-bottom: 12px;">
          <div class="cost-layer-header">
            <span class="cost-layer-badge">
              <span>💳</span>
              <span>PAYMENT SUMMARY</span>
            </span>
            <span class="payment-badge payment-badge-active" style="margin-left: 0;">Cash on Delivery</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #374151; margin-bottom: 8px;">
            <span>Food (${financials.totalItemsCount} ${financials.totalItemsCount === 1 ? 'item' : 'items'})</span>
            <span style="font-weight: 700; color: #111827;">$${financials.subtotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #374151;">
            <span>Delivery to ${escapeHtml(financials.deliveryArea || 'Harare')}</span>
            <span style="font-weight: 700; color: #111827;">$${(financials.deliveryFee !== null ? financials.deliveryFee : 0).toFixed(2)}</span>
          </div>
        </div>

        <div class="cost-layer-total">
          <div class="cost-total-row">
            <span class="cost-total-label">TOTAL TO PAY</span>
            <span class="cost-total-amount">$${financials.grandTotal.toFixed(2)}</span>
          </div>
          <div class="cost-total-clarification">
            <strong>$${financials.subtotal.toFixed(2)} food</strong> + <strong>$${(financials.deliveryFee !== null ? financials.deliveryFee : 0).toFixed(2)} delivery</strong>
          </div>
          <div style="font-size: 0.8rem; color: #4B5563; margin-top: 8px; padding-top: 8px; border-top: 1px dashed #E5E7EB; line-height: 1.4;">
            💵 <strong>Cash on Delivery</strong> · Pay the full amount ($${financials.grandTotal.toFixed(2)}) when your order arrives.
          </div>
        </div>
      </div>
    </div>
  `;

  footerEl.innerHTML = `
    <button type="button" class="btn-checkout-back" onclick="setCheckoutStep(3);">← Back to Delivery Details</button>
    <button type="button" class="btn-checkout-next" onclick="setCheckoutStep(5);">Review Final Order →</button>
  `;
}

function selectPaymentMethod(method) {
  if (method === 'EcoCash') {
    showToastNotification("EcoCash payments will be enabled once the merchant details are confirmed. Please use Cash on Delivery.");
    return;
  }

  checkoutState.paymentMethod = method;
  renderCheckoutStep(4);
}

/**
 * STEP 5: CONFIRM AND PLACE ORDER
 */
function renderStep5(bodyEl, footerEl, titleEl, financials) {
  if (titleEl) titleEl.textContent = "Confirm Your Order";

  const itemsHtml = financials.items.map(item => `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 8px 0; border-bottom: 1px dashed #E5E7EB; font-size: 0.88rem;">
      <div style="flex: 1; padding-right: 8px;">
        <span style="font-weight: 700; color: #111827;">${item.quantity}×</span>
        <span style="color: #374151; margin-left: 4px; font-weight: 600;">${escapeHtml(item.name)}</span>
        ${item.unit ? `<span style="font-size: 0.78rem; color: #6B7280;">(${escapeHtml(item.unit)})</span>` : ''}
        ${item.isBoxDiscounted ? `<span style="font-size: 0.75rem; color: #B45309; font-weight: 700;">(Bulk Tier)</span>` : ''}
        <div style="font-size: 0.75rem; color: #6B7280;">$${item.effectiveUnitPrice.toFixed(2)} each</div>
      </div>
      <div style="font-weight: 800; color: #111827;">
        $${item.lineTotal.toFixed(2)}
      </div>
    </div>
  `).join('');

  bodyEl.innerHTML = `
    <div>
      <p style="font-size: 0.88rem; color: #4B5563; margin-bottom: 14px;">
        Please check your details carefully before placing your order.
      </p>

      <!-- SECTION A: ORDER SUMMARY (YOUR FOOD + DELIVERY = TOTAL TO PAY) -->
      <div class="cost-hierarchy-card">
        <!-- Layer 1: YOUR FOOD -->
        <div class="cost-layer-food">
          <div class="cost-layer-header">
            <span class="cost-layer-badge">
              <span>🥢</span>
              <span>YOUR FOOD</span>
            </span>
            <button type="button" class="review-edit-link" onclick="setCheckoutStep(1);">Edit Items</button>
          </div>
          <div style="margin-bottom: 4px;">
            ${itemsHtml}
          </div>
          ${financials.discountSavings > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 0.86rem; color: #059669; font-weight: 700; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #E5E7EB;">
              <span>Finish-at-Home Bulk Savings (3+ boxes)</span>
              <span>-$${financials.discountSavings.toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="cost-food-subtotal-row">
            <span class="cost-food-subtotal-label">Food total</span>
            <span class="cost-food-subtotal-val">$${financials.subtotal.toFixed(2)}</span>
          </div>
        </div>

        <!-- Layer 2: DELIVERY -->
        <div class="cost-layer-delivery">
          <div class="cost-layer-header">
            <span class="cost-layer-badge">
              <span>🛵</span>
              <span>DELIVERY</span>
            </span>
            <button type="button" class="review-edit-link" onclick="setCheckoutStep(3);">Edit Area</button>
          </div>
          <div class="cost-delivery-row">
            <div>
              <div class="cost-delivery-area-title">
                Delivery to ${escapeHtml(financials.deliveryArea || 'Harare')}
              </div>
              <div class="cost-delivery-subtext">Fixed Select zone delivery fee</div>
            </div>
            <div class="cost-delivery-fee-val">
              $${(financials.deliveryFee !== null ? financials.deliveryFee : 0).toFixed(2)}
            </div>
          </div>
        </div>

        <!-- Layer 3: TOTAL TO PAY -->
        <div class="cost-layer-total">
          <div class="cost-total-row">
            <span class="cost-total-label">TOTAL TO PAY</span>
            <span class="cost-total-amount">$${financials.grandTotal.toFixed(2)}</span>
          </div>
          <div class="cost-total-clarification">
            <strong>$${financials.subtotal.toFixed(2)} food</strong> + <strong>$${(financials.deliveryFee !== null ? financials.deliveryFee : 0).toFixed(2)} delivery</strong>
          </div>
        </div>
      </div>

      <!-- SECTION B: CUSTOMER -->
      <div class="review-summary-box">
        <div class="review-summary-header">
          <span class="review-summary-title">Section B — Customer</span>
          <button type="button" class="review-edit-link" onclick="setCheckoutStep(2);">Edit</button>
        </div>
        <div style="font-size: 0.92rem; font-weight: 700; color: #111827; margin-bottom: 2px;">
          👤 ${escapeHtml(checkoutState.customerName)}
        </div>
        <div style="font-size: 0.86rem; color: #4B5563;">
          📞 ${escapeHtml(checkoutState.customerPhone)}
        </div>
        ${checkoutState.additionalContact ? `
          <div style="font-size: 0.82rem; color: #6B7280; margin-top: 2px;">
            Alternate: ${escapeHtml(checkoutState.additionalContact)}
          </div>
        ` : ''}
      </div>

      <!-- SECTION C: DELIVERY -->
      <div class="review-summary-box">
        <div class="review-summary-header">
          <span class="review-summary-title">Section C — Delivery</span>
          <button type="button" class="review-edit-link" onclick="setCheckoutStep(3);">Edit</button>
        </div>
        <div style="display: inline-block; margin-bottom: 6px;">
          <span class="payment-badge payment-badge-active" style="margin-left: 0;">Delivery only</span>
        </div>
        <div style="font-size: 0.88rem; color: #111827; font-weight: 700; margin-bottom: 2px;">
          🏙️ Area: ${escapeHtml(financials.deliveryArea || 'Harare')} ($${(financials.deliveryFee !== null ? financials.deliveryFee : 0).toFixed(2)} fixed fee)
        </div>
        <div style="font-size: 0.86rem; color: #374151; margin-bottom: 2px;">
          📍 Address: ${escapeHtml(checkoutState.deliveryLocation)}
        </div>
        <div style="font-size: 0.84rem; color: #4B5563; margin-bottom: 2px;">
          🏛️ Landmark: ${escapeHtml(checkoutState.nearbyLandmark)}
        </div>
        ${checkoutState.deliveryInstructions ? `
          <div style="font-size: 0.82rem; color: #6B7280; margin-top: 3px;">
            📝 Instructions: ${escapeHtml(checkoutState.deliveryInstructions)}
          </div>
        ` : ''}
      </div>

      <!-- SECTION D: PAYMENT -->
      <div class="review-summary-box">
        <div class="review-summary-header">
          <span class="review-summary-title">Section D — Payment</span>
          <button type="button" class="review-edit-link" onclick="setCheckoutStep(4);">Edit</button>
        </div>
        <div style="font-weight: 700; color: #111827; font-size: 0.92rem; margin-bottom: 3px;">
          💵 ${escapeHtml(checkoutState.paymentMethod)}
        </div>
        <div style="font-size: 0.82rem; color: #4B5563;">
          Payment will be made when your order is delivered.
        </div>
      </div>

      <!-- Customer Confirmation Checkbox -->
      <div class="checkout-confirm-check-group ${checkoutState.validationErrors.confirmCheck ? 'has-error' : ''}" id="confirm-check-wrapper" onclick="toggleConfirmCheckbox()">
        <input 
          type="checkbox" 
          id="confirm-order-checkbox" 
          class="checkout-confirm-checkbox" 
          ${checkoutState.confirmedCheckbox ? 'checked' : ''} 
          onclick="event.stopPropagation(); toggleConfirmCheckbox();"
        />
        <label for="confirm-order-checkbox" class="checkout-confirm-label" onclick="event.stopPropagation(); toggleConfirmCheckbox();">
          I confirm that my order details and delivery information are correct.
        </label>
      </div>
      <div class="form-error-msg ${checkoutState.validationErrors.confirmCheck ? 'visible' : ''}" id="confirm-check-error" style="margin-bottom: 12px;">
        Please confirm that your order details and delivery information are correct before placing your order.
      </div>
    </div>
  `;

  footerEl.innerHTML = `
    <button type="button" class="btn-checkout-back" onclick="setCheckoutStep(4);" ${checkoutState.isSubmitting ? 'disabled' : ''}>← Back to Payment</button>
    <button type="button" class="btn-checkout-next" id="place-order-submit-btn" onclick="executeOrderSubmission();" ${checkoutState.isSubmitting ? 'disabled' : ''} style="background: #121214; color: white;">
      ${checkoutState.isSubmitting ? 'Placing Order…' : `Place Order ($${financials.grandTotal.toFixed(2)})`}
    </button>
  `;
}

function toggleConfirmCheckbox() {
  const checkbox = document.getElementById('confirm-order-checkbox');
  const wrapper = document.getElementById('confirm-check-wrapper');
  const errorMsg = document.getElementById('confirm-check-error');

  checkoutState.confirmedCheckbox = !checkoutState.confirmedCheckbox;
  if (checkbox) checkbox.checked = checkoutState.confirmedCheckbox;

  if (checkoutState.confirmedCheckbox) {
    if (wrapper) wrapper.classList.remove('has-error');
    if (errorMsg) errorMsg.classList.remove('visible');
    delete checkoutState.validationErrors.confirmCheck;
  }
}

/**
 * ORDER SUBMISSION TO WORKER API & D1
 */
async function executeOrderSubmission() {
  if (checkoutState.isSubmitting) return;

  // Validation checks
  if (!appState.cart || appState.cart.length === 0) {
    showToastNotification("Your bag is empty. Please select items first.");
    setCheckoutStep(1);
    return;
  }

  if (!validateStep2Fields()) {
    showToastNotification("Please complete all required customer details.");
    setCheckoutStep(2);
    return;
  }

  if (!validateStep3Fields()) {
    showToastNotification(checkoutState.validationErrors.deliveryArea || "Please provide your delivery location and landmark.");
    setCheckoutStep(3);
    return;
  }

  const areaConfig = getDeliveryAreaConfig(checkoutState.deliveryArea);
  if (!areaConfig || typeof areaConfig.fee !== 'number') {
    showToastNotification("Please select your delivery area before continuing.");
    setCheckoutStep(3);
    return;
  }

  if (!checkoutState.confirmedCheckbox) {
    checkoutState.validationErrors.confirmCheck = true;
    const wrapper = document.getElementById('confirm-check-wrapper');
    const errorMsg = document.getElementById('confirm-check-error');
    if (wrapper) wrapper.classList.add('has-error');
    if (errorMsg) errorMsg.classList.add('visible');
    showToastNotification("Please confirm that your order details are correct.");
    return;
  }

  const financials = calculateCheckoutFinancials();
  checkoutState.isSubmitting = true;

  const submitBtn = document.getElementById('place-order-submit-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Placing Order…';
  }

  const deliveryFee = areaConfig.fee;
  const deliveryAreaName = areaConfig.name;

  // Format notes field to contain delivery area, delivery fee, location, landmark, instructions, and alt contact
  const notesLines = [
    `Delivery Area: ${deliveryAreaName} (Fee: $${deliveryFee.toFixed(2)})`,
    `Delivery Location: ${checkoutState.deliveryLocation.trim()}`,
    `Landmark: ${checkoutState.nearbyLandmark.trim()}`
  ];
  if (checkoutState.deliveryInstructions.trim()) {
    notesLines.push(`Instructions: ${checkoutState.deliveryInstructions.trim()}`);
  }
  if (checkoutState.additionalContact.trim()) {
    notesLines.push(`Alt Contact: ${checkoutState.additionalContact.trim()}`);
  }
  const notesText = notesLines.join('\n');

  const apiPayload = {
    source: "select",
    customer_name: checkoutState.customerName.trim(),
    phone: checkoutState.customerPhone.trim(),
    items: financials.items.map(item => ({
      name: item.name,
      qty: item.quantity,
      quantity: item.quantity,
      price: parseFloat(item.effectiveUnitPrice.toFixed(2)),
      options: item.unit || item.description || ""
    })),
    total: parseFloat(financials.grandTotal.toFixed(2)),
    delivery_fee: parseFloat(deliveryFee.toFixed(2)),
    delivery_area: deliveryAreaName,
    notes: notesText,
    payment_method: checkoutState.paymentMethod,
    type: "delivery",
    order_status: "new",
    status: "new",
    payment_status: "pending"
  };

  try {
    console.log("Submitting order to Cloudflare Worker API:", `${API_BASE}/orders`);
    const postResponse = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiPayload)
    });

    if (!postResponse.ok) {
      throw new Error(`Worker API returned status ${postResponse.status}`);
    }

    const postJson = await postResponse.json().catch(() => ({}));
    if (postJson && postJson.success === false) {
      throw new Error(postJson.error || "Order submission failed on server");
    }

    // Retrieve confirmed Order ID from D1
    let confirmedOrderId = null;
    try {
      const getRes = await fetch(`${API_BASE}/orders?_t=${Date.now()}`);
      if (getRes.ok) {
        const ordersList = await getRes.json();
        if (Array.isArray(ordersList) && ordersList.length > 0) {
          const match = ordersList.find(o => o.phone === checkoutState.customerPhone.trim()) || ordersList[0];
          if (match && match.id) {
            confirmedOrderId = String(match.id).startsWith('BC-') ? String(match.id) : `BC-${match.id}`;
          }
        }
      }
    } catch (fetchErr) {
      console.warn("Could not query assigned order ID from D1:", fetchErr);
    }

    if (!confirmedOrderId) {
      confirmedOrderId = `BC-${Date.now().toString().slice(-4)}`;
    }

    // Save confirmed order record
    checkoutState.confirmedOrder = {
      orderId: confirmedOrderId,
      customerName: checkoutState.customerName,
      customerPhone: checkoutState.customerPhone,
      deliveryArea: deliveryAreaName,
      deliveryFee: deliveryFee,
      deliveryLocation: checkoutState.deliveryLocation,
      nearbyLandmark: checkoutState.nearbyLandmark,
      deliveryInstructions: checkoutState.deliveryInstructions,
      paymentMethod: checkoutState.paymentMethod,
      subtotal: financials.subtotal,
      grandTotal: financials.grandTotal,
      items: financials.items,
      createdAt: new Date().toISOString()
    };

    // Clear cart and card steppers
    appState.cart = [];
    SELECT_CATALOG.forEach(item => {
      appState.cardQuantities[item.id] = 1;
    });
    renderMenu();
    updateCartUI();

    checkoutState.isSubmitting = false;
    renderCheckoutProgress(5);
    renderCheckoutStep(5);

    // Order completed successfully — check if an update was deferred
    if (typeof flushPendingPWAUpdate === 'function') {
      flushPendingPWAUpdate();
    }

  } catch (error) {
    console.error("Order submission failed:", error);
    checkoutState.isSubmitting = false;
    showToastNotification("We could not submit your order. Please check your network connection and try again.");

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Place Order ($${financials.grandTotal.toFixed(2)})`;
    }
  }
}

/**
 * Copy Order ID with visual feedback and fallback
 */
function copyOrderId(orderId) {
  if (!orderId) return;
  const textToCopy = orderId.startsWith('#') ? orderId : `#${orderId}`;
  const copyBtn = document.getElementById('copy-order-id-btn');

  const onCopied = () => {
    if (copyBtn) {
      copyBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Copied!</span>
      `;
      copyBtn.classList.add('copied');
      setTimeout(() => {
        if (copyBtn) {
          copyBtn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          `;
          copyBtn.classList.remove('copied');
        }
      }, 2200);
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(onCopied).catch(() => {
      fallbackCopy(textToCopy, onCopied);
    });
  } else {
    fallbackCopy(textToCopy, onCopied);
  }
}

function fallbackCopy(text, callback) {
  try {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    if (callback) callback();
  } catch (e) {
    console.warn("Fallback copy failed:", e);
  }
}

/**
 * PREMIUM ORDER SUCCESS SCREEN (Confirmation View)
 */
function renderConfirmationView(bodyEl, footerEl, titleEl) {
  const order = checkoutState.confirmedOrder;
  if (!order) return;

  // Remove the cluttered 5-step progress bar from the success screen
  const progressBar = document.getElementById('checkout-progress-bar');
  if (progressBar) progressBar.style.display = 'none';

  // Update modal header state to reflect completion
  const brandBadge = document.querySelector('.checkout-brand-badge');
  if (brandBadge) brandBadge.textContent = 'Bamboo Chicken Select';
  if (titleEl) titleEl.textContent = 'Order Confirmed';

  // Format Order ID
  const cleanId = String(order.orderId || '').replace(/^#+/, '');
  const displayId = cleanId.startsWith('BC-') ? cleanId : `BC-${cleanId}`;

  // Format Items list
  const totalItemCount = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const foodTotal = order.subtotal || (order.grandTotal - (order.deliveryFee || 0));
  const deliveryFee = typeof order.deliveryFee === 'number' ? order.deliveryFee : 0;

  const itemsHtml = order.items.map(item => {
    const unitPrice = typeof item.effectiveUnitPrice === 'number' ? item.effectiveUnitPrice : item.price;
    const lineTotal = typeof item.lineTotal === 'number' ? item.lineTotal : (unitPrice * item.quantity);
    return `
      <div class="cost-food-item-row" style="padding: 8px 0;">
        <div class="cost-food-item-meta">
          <div class="cost-food-item-name">${escapeHtml(item.name)}</div>
          <div class="cost-food-item-calc">${item.quantity} × $${unitPrice.toFixed(2)} ${item.unit ? `· ${escapeHtml(item.unit)}` : ''}</div>
        </div>
        <div class="cost-food-item-price">$${lineTotal.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  // Payment method explanation
  let paymentExplanation = "Pay when your order arrives.";
  if (order.paymentMethod && order.paymentMethod.toLowerCase().includes('ecocash')) {
    paymentExplanation = "Payment pending cashier verification.";
  }

  bodyEl.innerHTML = `
    <div class="confirmation-view-wrapper">
      <!-- 1. Success Hero Header -->
      <div class="success-hero-header">
        <div class="success-icon-badge" aria-hidden="true">
          <div class="success-icon-inner">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <div class="success-status-pill">
          <span class="status-pulse-dot"></span>
          <span>ORDER RECEIVED</span>
        </div>

        <h2 class="success-title">Your Order Is In.</h2>

        <p class="success-subtitle">
          Your order has been successfully sent to Bamboo Chicken. Our team will review it and arrange your delivery.
        </p>
      </div>

      <!-- 2. Order Number Section (Prominent & Elegant) -->
      <div class="success-order-card">
        <div class="order-card-top">
          <span class="order-number-tag">YOUR ORDER NUMBER</span>
          <button type="button" class="btn-copy-order-id" id="copy-order-id-btn" onclick="copyOrderId('${displayId}')" aria-label="Copy Order Number">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </button>
        </div>
        <div class="order-id-main-value">#${escapeHtml(displayId)}</div>
        <p class="order-id-instruction">Keep this number for order confirmation or delivery questions.</p>
      </div>

      <!-- 3. Structured Order Summary -->
      <div class="success-summary-card">
        <div class="summary-card-header">
          <div class="summary-header-title">
            <span>Order Details</span>
          </div>
          <span class="summary-delivery-badge">Delivery only</span>
        </div>

        <div class="summary-grid">
          <!-- Customer -->
          <div class="summary-info-block">
            <div class="info-block-label">Customer</div>
            <div class="info-block-primary">${escapeHtml(order.customerName)}</div>
            <div class="info-block-sub">${escapeHtml(order.customerPhone)}</div>
          </div>

          <!-- Delivery Destination -->
          <div class="summary-info-block">
            <div class="info-block-label">Delivery Destination</div>
            <div class="info-block-primary" style="color: #111827; font-weight: 700;">🏙️ Delivery to ${escapeHtml(order.deliveryArea || 'Harare')} <span style="font-size: 0.82rem; font-weight: 600; color: #059669;">($${deliveryFee.toFixed(2)} fixed fee)</span></div>
            <div style="font-size: 0.86rem; color: #374151; margin-top: 2px;">📍 ${escapeHtml(order.deliveryLocation)}</div>
            <div class="info-block-sub"><strong style="color: #374151;">Landmark:</strong> ${escapeHtml(order.nearbyLandmark)}</div>
            ${order.deliveryInstructions && order.deliveryInstructions.trim() ? `
              <div class="info-block-notes">
                <strong>Instructions:</strong> ${escapeHtml(order.deliveryInstructions.trim())}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- 3-Layer Financial Hierarchy Breakdown -->
        <div class="cost-hierarchy-card" style="margin-top: 14px; margin-bottom: 0;">
          <!-- Layer 1: YOUR FOOD -->
          <div class="cost-layer-food">
            <div class="cost-layer-header">
              <span class="cost-layer-badge">
                <span>🥢</span>
                <span>YOUR FOOD</span>
              </span>
              <span class="cost-layer-badge-tag">${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'}</span>
            </div>
            <div>${itemsHtml}</div>
            <div class="cost-food-subtotal-row">
              <span class="cost-food-subtotal-label">Food total</span>
              <span class="cost-food-subtotal-val">$${foodTotal.toFixed(2)}</span>
            </div>
          </div>

          <!-- Layer 2: DELIVERY -->
          <div class="cost-layer-delivery">
            <div class="cost-layer-header">
              <span class="cost-layer-badge">
                <span>🛵</span>
                <span>DELIVERY</span>
              </span>
              <span class="cost-layer-badge-tag">Fixed Fee</span>
            </div>
            <div class="cost-delivery-row">
              <div>
                <div class="cost-delivery-area-title">
                  Delivery to ${escapeHtml(order.deliveryArea || 'Harare')}
                </div>
                <div class="cost-delivery-subtext">Selected delivery zone fee</div>
              </div>
              <div class="cost-delivery-fee-val">
                $${deliveryFee.toFixed(2)}
              </div>
            </div>
          </div>

          <!-- Layer 3: TOTAL TO PAY -->
          <div class="cost-layer-total">
            <div class="cost-total-row">
              <span class="cost-total-label">TOTAL TO PAY</span>
              <span class="cost-total-amount">$${order.grandTotal.toFixed(2)}</span>
            </div>
            <div class="cost-total-clarification">
              <strong>$${foodTotal.toFixed(2)} food</strong> + <strong>$${deliveryFee.toFixed(2)} delivery</strong>
            </div>
            <div style="font-size: 0.8rem; color: #4B5563; margin-top: 8px; padding-top: 8px; border-top: 1px dashed #E5E7EB; line-height: 1.4;">
              💵 <strong>${escapeHtml(order.paymentMethod)}</strong> · ${escapeHtml(paymentExplanation)}
            </div>
          </div>
        </div>
      </div>

      <!-- 4. What Happens Next (Reassuring, Calm Timeline) -->
      <div class="success-next-steps">
        <div class="next-steps-header">
          <span class="next-steps-title">WHAT HAPPENS NEXT</span>
          <span class="next-steps-tag">Pending Review</span>
        </div>

        <div class="next-steps-list">
          <div class="next-step-row active">
            <span class="step-badge-num">01</span>
            <div class="step-details">
              <div class="step-heading">Order received</div>
              <div class="step-body">Your order has been sent to the Bamboo Chicken team.</div>
            </div>
          </div>

          <div class="next-step-row upcoming">
            <span class="step-badge-num">02</span>
            <div class="step-details">
              <div class="step-heading">Kitchen review</div>
              <div class="step-body">The team reviews your order and prepares it for delivery.</div>
            </div>
          </div>

          <div class="next-step-row upcoming">
            <span class="step-badge-num">03</span>
            <div class="step-details">
              <div class="step-heading">Delivery</div>
              <div class="step-body">The team will arrange delivery using the details you provided.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Bamboo Chicken Customer Care (Polished, Non-intrusive) -->
      <div class="success-care-card">
        <div class="care-card-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span class="care-card-title">Need help with your order?</span>
        </div>
        <p class="care-card-text">
          For order confirmation or delivery questions, contact Bamboo Chicken on <strong>${BAMBOO_CONTACT_NUMBER}</strong>.
        </p>
        <a href="tel:${BAMBOO_CONTACT_NUMBER}" class="btn-call-care">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Bamboo Chicken</span>
        </a>
      </div>

      <!-- 6. Footer Branding Signature -->
      <div class="success-signature-brand">
        Powered by the Warstreet Experience Model
      </div>
    </div>
  `;

  footerEl.innerHTML = `
    <button type="button" class="btn-checkout-next" style="width: 100%; min-height: 48px; font-size: 0.95rem;" onclick="startNewOrder();">
      Continue Browsing
    </button>
  `;
}

/**
 * Resets checkout state and returns to menu
 */
function startNewOrder() {
  checkoutState.confirmedOrder = null;
  checkoutState.currentStep = 1;
  checkoutState.highestStepReached = 1;
  checkoutState.confirmedCheckbox = false;

  const progressBar = document.getElementById('checkout-progress-bar');
  if (progressBar) progressBar.style.display = 'flex';

  const brandBadge = document.querySelector('.checkout-brand-badge');
  if (brandBadge) brandBadge.textContent = 'Select Delivery';

  const titleEl = document.getElementById('checkout-step-title');
  if (titleEl) titleEl.textContent = 'Step 1: Review Order';

  closeCheckout();
  renderMenu();
  updateCartUI();
}

/**
 * HTML sanitization helper
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================
// 8. ANDROID-FIRST PWA CONTROLLER & LIFECYCLE
// ==========================================

let deferredInstallPrompt = null;
const PWA_DISMISSED_KEY = 'bc_pwa_install_dismissed_until';
const PWA_INSTALLED_KEY = 'bc_pwa_installed';

// PWA Automatic Update Lifecycle State
let pwaRegistration = null;
let updateCheckCooldown = 0;
let isRefreshingForUpdate = false;
window._pendingServiceWorkerUpdate = null;
window._reloadWhenSafe = false;

/**
 * Checks whether it is currently safe to apply a Service Worker update.
 * If customer is actively in the checkout modal or submitting, updates are safely deferred.
 */
function isSafeToApplyUpdate() {
  if (window.checkoutState && (checkoutState.isOpen || checkoutState.isSubmitting)) {
    return false;
  }
  return true;
}

/**
 * Executes a controlled check for an updated Service Worker
 */
function checkForPWAUpdate() {
  if (!('serviceWorker' in navigator) || !navigator.onLine) return;
  const now = Date.now();
  // Debounce checks to protect mobile data (minimum 30 seconds between triggered checks)
  if (now - updateCheckCooldown < 30000) return;
  updateCheckCooldown = now;

  navigator.serviceWorker.ready.then((reg) => {
    pwaRegistration = reg;
    reg.update().catch((err) => {
      console.warn('[PWA] ServiceWorker update check failed:', err);
    });
  }).catch(() => {});
}

/**
 * Handles a newly installed waiting Service Worker
 */
function handleWaitingServiceWorker(waitingWorker) {
  if (!waitingWorker) return;

  if (isSafeToApplyUpdate()) {
    // Customer is simply browsing or idle — activate the update silently
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  } else {
    // Customer is completing an active order — defer until order finishes
    window._pendingServiceWorkerUpdate = waitingWorker;
    showToastNotification('New version available. It will update after your order.');
  }
}

/**
 * Called when checkout finishes or modal closes to apply any deferred update
 */
function flushPendingPWAUpdate() {
  if (window._pendingServiceWorkerUpdate && isSafeToApplyUpdate()) {
    const worker = window._pendingServiceWorkerUpdate;
    window._pendingServiceWorkerUpdate = null;
    worker.postMessage({ type: 'SKIP_WAITING' });
  } else if (window._reloadWhenSafe && isSafeToApplyUpdate()) {
    window._reloadWhenSafe = false;
    window.location.reload();
  }
}

/**
 * Detects whether the app is executing in standalone (installed) mode
 * Uses window.matchMedia('(display-mode: standalone)').matches and standard PWA signals
 */
function isAppStandalone() {
  const isDisplayStandalone = Boolean(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  const isIOSStandalone = window.navigator.standalone === true;
  const isAndroidTWA = Boolean(document.referrer && document.referrer.includes('android-app://'));
  const isFullscreen = Boolean(window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches);
  const isMinimalUI = Boolean(window.matchMedia && window.matchMedia('(display-mode: minimal-ui)').matches);
  return isDisplayStandalone || isIOSStandalone || isAndroidTWA || isFullscreen || isMinimalUI;
}

/**
 * Detects whether the user is on an Android device
 */
function isAndroid() {
  const ua = window.navigator.userAgent.toLowerCase();
  return /android/.test(ua);
}

/**
 * Detects iOS devices (iPhone, iPad, iPod)
 */
function isIOS() {
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Detects whether the app has already been installed by the customer
 */
function isAppAlreadyInstalled() {
  if (isAppStandalone()) return true;
  try {
    return localStorage.getItem(PWA_INSTALLED_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Completely hides all install UI elements (banner, pill, footer, modal)
 */
function hideAllInstallUI() {
  const headerBtn = document.getElementById('header-install-btn');
  if (headerBtn) headerBtn.style.display = 'none';

  const footerRow = document.getElementById('footer-install-row');
  if (footerRow) footerRow.style.display = 'none';

  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'none';

  const iosModal = document.getElementById('ios-install-modal');
  if (iosModal) iosModal.style.display = 'none';
}

/**
 * Sets up a subtle "Open App" experience if the user on Android Chrome
 * has already installed the app but is browsing the website in a browser tab
 */
function setupOpenInAppExperience() {
  // Ensure NO install banner or repeated install prompts appear
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'none';

  const footerRow = document.getElementById('footer-install-row');
  if (footerRow) footerRow.style.display = 'none';

  // Provide a subtle "Open App" pill in the header
  const headerBtn = document.getElementById('header-install-btn');
  if (headerBtn) {
    headerBtn.style.display = 'inline-flex';
    const label = headerBtn.querySelector('.header-install-label');
    if (label) label.textContent = 'Open App';
    headerBtn.setAttribute('aria-label', 'Open Bamboo Chicken Select App');
    headerBtn.onclick = () => {
      window.location.href = '/?source=pwa';
    };
  }
}

/**
 * Initializes PWA Service Worker, installation hooks, and offline detection
 */
function initPWA() {
  // 1. Mark standalone state on document root and hide install UI if standalone
  const standalone = isAppStandalone();
  if (standalone) {
    document.documentElement.classList.add('pwa-standalone');
    document.body.classList.add('pwa-standalone');
    hideAllInstallUI();
    console.log('[PWA] Bamboo Chicken Select running in installed standalone mode');
  } else {
    // Default: ensure all install UI starts hidden
    hideAllInstallUI();
  }

  // Listen dynamically for display-mode changes
  if (window.matchMedia) {
    try {
      const standaloneMq = window.matchMedia('(display-mode: standalone)');
      const handleModeChange = (e) => {
        if (e.matches) {
          document.documentElement.classList.add('pwa-standalone');
          document.body.classList.add('pwa-standalone');
          hideAllInstallUI();
        }
      };
      if (standaloneMq.addEventListener) {
        standaloneMq.addEventListener('change', handleModeChange);
      } else if (standaloneMq.addListener) {
        standaloneMq.addListener(handleModeChange);
      }
    } catch (e) {}
  }

  // 2. Android: Check getInstalledRelatedApps for Chrome installed state
  if (isAndroid() && 'getInstalledRelatedApps' in navigator) {
    navigator.getInstalledRelatedApps().then((relatedApps) => {
      if (relatedApps && relatedApps.length > 0) {
        try {
          localStorage.setItem(PWA_INSTALLED_KEY, 'true');
        } catch (e) {}
        if (isAppStandalone()) {
          hideAllInstallUI();
        } else {
          setupOpenInAppExperience();
        }
      }
    }).catch(() => {});
  }

  // 3. Register Service Worker & Configure Automatic Update Lifecycle
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          pwaRegistration = registration;
          console.log('[PWA] ServiceWorker registered with scope:', registration.scope);

          // If there is already a waiting worker, handle it safely
          if (registration.waiting) {
            handleWaitingServiceWorker(registration.waiting);
          }

          // Listen for new updates found
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (!installingWorker) return;
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                handleWaitingServiceWorker(installingWorker);
              }
            });
          });

          // Check for new version on app start
          setTimeout(() => { checkForPWAUpdate(); }, 2000);
        })
        .catch((err) => {
          console.warn('[PWA] ServiceWorker registration failed:', err);
        });
    });

    // Handle controller change (safe automatic reload)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (isRefreshingForUpdate) return;
      if (isSafeToApplyUpdate()) {
        isRefreshingForUpdate = true;
        window.location.reload();
      } else {
        window._reloadWhenSafe = true;
      }
    });

    // Check when PWA returns to foreground
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkForPWAUpdate();
      }
    });
    window.addEventListener('focus', () => {
      checkForPWAUpdate();
    });

    // Check periodically while app is open (~5 minutes)
    setInterval(checkForPWAUpdate, 5 * 60 * 1000);
  }

  // 4. BeforeInstallPrompt (Specifically tailored for Android Chrome)
  window.addEventListener('beforeinstallprompt', (e) => {
    // Only Android devices are eligible for Android PWA install UI
    if (!isAndroid()) {
      return;
    }

    // If app is already running in standalone or marked installed, never prompt
    if (isAppStandalone() || isAppAlreadyInstalled()) {
      hideAllInstallUI();
      if (!isAppStandalone() && isAppAlreadyInstalled()) {
        setupOpenInAppExperience();
      }
      return;
    }

    // Preserve Android's normal beforeinstallprompt event handling
    e.preventDefault();
    deferredInstallPrompt = e;
    console.log('[PWA] Captured beforeinstallprompt event for Android');

    // Show header install button for uninstalled Android browser
    const headerBtn = document.getElementById('header-install-btn');
    if (headerBtn) {
      headerBtn.style.display = 'inline-flex';
      const label = headerBtn.querySelector('.header-install-label');
      if (label) label.textContent = 'Install App';
      headerBtn.setAttribute('aria-label', 'Install Bamboo Chicken Select App');
      headerBtn.onclick = () => { triggerPWAInstall(); };
    }

    const footerRow = document.getElementById('footer-install-row');
    if (footerRow) footerRow.style.display = 'flex';

    // Check dismissal cooldown (48 hours)
    let isDismissed = false;
    try {
      const dismissedUntil = localStorage.getItem(PWA_DISMISSED_KEY);
      isDismissed = dismissedUntil && Date.now() < parseInt(dismissedUntil, 10);
    } catch (err) {}

    if (!isDismissed) {
      setTimeout(() => {
        // Double check not standalone / not installed before showing banner
        if (isAndroid() && !isAppStandalone() && !isAppAlreadyInstalled()) {
          showPWAInstallBanner();
        }
      }, 2000);
    }
  });

  // 5. App Installed Event
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Bamboo Chicken Select was successfully installed');
    deferredInstallPrompt = null;
    try {
      localStorage.setItem(PWA_INSTALLED_KEY, 'true');
    } catch (e) {}
    hideAllInstallUI();
    document.documentElement.classList.add('pwa-standalone');
    document.body.classList.add('pwa-standalone');
    showToastNotification('Bamboo Chicken Select installed! Find it in your apps.');
  });

  // 6. If on Android, already installed, but browsing in Chrome tab
  if (isAndroid() && isAppAlreadyInstalled() && !isAppStandalone()) {
    setupOpenInAppExperience();
  }

  // 7. Online / Offline Connectivity Monitor
  function updateOnlineStatus() {
    const banner = document.getElementById('offline-banner');
    if (!navigator.onLine) {
      if (banner) banner.style.display = 'block';
    } else {
      if (banner && banner.style.display !== 'none') {
        banner.style.display = 'none';
        showToastNotification('Connected back online. Live ordering available.');
      }
      // Check for updates upon online recovery
      checkForPWAUpdate();
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  // 8. Handle URL parameters & PWA Shortcuts
  handlePWAUrlShortcuts();
}

/**
 * Handle direct category deep-linking from PWA shortcuts (e.g. ?cat=signature-meals or #cat-cooked-dumplings)
 */
function handlePWAUrlShortcuts() {
  try {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');
    const hash = window.location.hash;
    let targetCat = catParam;

    if (!targetCat && hash.startsWith('#cat-')) {
      targetCat = hash.replace('#cat-', '');
    }

    if (targetCat) {
      const btn = document.querySelector(`.cat-filter-btn[data-category="${targetCat}"]`);
      if (btn) {
        setTimeout(() => {
          btn.click();
        }, 100);
      }
    }
  } catch (err) {
    console.warn('[PWA] Shortcut route check error:', err);
  }
}

/**
 * Display custom in-app install card (Android only, uninstalled only)
 */
function showPWAInstallBanner() {
  if (!isAndroid() || isAppStandalone() || isAppAlreadyInstalled()) return;
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.style.display = 'block';
  }
}

/**
 * Dismiss custom in-app install card and set cooldown
 */
function dismissPWAInstallBanner() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.style.display = 'none';
  }
  // Remember dismissal for 48 hours
  try {
    const fortyEightHours = Date.now() + (48 * 60 * 60 * 1000);
    localStorage.setItem(PWA_DISMISSED_KEY, fortyEightHours.toString());
  } catch (e) {
    // Ignore in incognito / strict storage mode
  }
}

/**
 * Main trigger for installing Bamboo Chicken Select as an Android PWA
 */
async function triggerPWAInstall() {
  // Only execute for Android devices that are not already standalone or installed
  if (!isAndroid() || isAppStandalone() || isAppAlreadyInstalled()) {
    return;
  }
  if (deferredInstallPrompt) {
    try {
      dismissPWAInstallBanner();
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      console.log('[PWA] User choice:', choiceResult.outcome);
      if (choiceResult.outcome === 'accepted') {
        deferredInstallPrompt = null;
        try {
          localStorage.setItem(PWA_INSTALLED_KEY, 'true');
        } catch (e) {}
        hideAllInstallUI();
      }
    } catch (err) {
      console.warn('[PWA] Installation prompt failed:', err);
    }
  }
}

/**
 * iOS modal stubs (no-op, Android-exclusive installation flow)
 */
function openIOSInstallModal() {
  // Disabled: PWA installation experience is specifically designed for Android.
}

function closeIOSInstallModal() {
  const modal = document.getElementById('ios-install-modal');
  if (modal) modal.style.display = 'none';
}

// Export functions to global scope for HTML event attributes
window.adjustCardQuantity = adjustCardQuantity;
window.addCurrentCardToCart = addCurrentCardToCart;
window.modifyCartItemQty = modifyCartItemQty;
window.removeItemFromCart = removeItemFromCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.setCheckoutStep = setCheckoutStep;
window.selectPaymentMethod = selectPaymentMethod;
window.toggleConfirmCheckbox = toggleConfirmCheckbox;
window.executeOrderSubmission = executeOrderSubmission;
window.startNewOrder = startNewOrder;
window.copyOrderId = copyOrderId;
window.DELIVERY_ZONES_CONFIG = DELIVERY_ZONES_CONFIG;
window.getDeliveryAreaConfig = getDeliveryAreaConfig;
window.calculateCheckoutFinancials = calculateCheckoutFinancials;
window.validateStep3Fields = validateStep3Fields;
window.checkoutState = checkoutState;
window.appState = appState;
window.initPWA = initPWA;
window.isAppStandalone = isAppStandalone;
window.isAndroid = isAndroid;
window.isIOS = isIOS;
window.isAppAlreadyInstalled = isAppAlreadyInstalled;
window.hideAllInstallUI = hideAllInstallUI;
window.setupOpenInAppExperience = setupOpenInAppExperience;
window.triggerPWAInstall = triggerPWAInstall;
window.showPWAInstallBanner = showPWAInstallBanner;
window.dismissPWAInstallBanner = dismissPWAInstallBanner;
window.openIOSInstallModal = openIOSInstallModal;
window.closeIOSInstallModal = closeIOSInstallModal;
window.checkForPWAUpdate = checkForPWAUpdate;
window.flushPendingPWAUpdate = flushPendingPWAUpdate;
window.isSafeToApplyUpdate = isSafeToApplyUpdate;


