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
    shortDescription: 'Signature chicken skewer with Bamboo house seasoning',
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
    shortDescription: 'Golden, savoury baked pie with signature filling',
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
    shortDescription: '100g portion of crispy bite-sized chicken nuggets',
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
    shortDescription: 'Five seasoned chicken dumplings, hot & ready',
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
    shortDescription: 'Five seasoned minced beef dumplings, hot & ready',
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
    shortDescription: 'Chilled box of 10 dumplings to cook at home',
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
    shortDescription: 'Chilled box of 10 dumplings to cook at home',
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
    shortDescription: 'Chilled iced tea with a touch of citrus flavour',
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
    shortDescription: 'Full bottle of authentic savoury dipping soy sauce',
    description: 'A full bottle of rich savoury soy sauce, suited for dipping dumplings or seasoning meals at home.'
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

const appState = {
  cart: [],
  cardQuantities: {}, // Tracks stepper count per card [item.id]: number
  activeCategory: 'all',
  activeTab: 'home',
  homeCategory: 'all',
  sheetQuantity: 1,
  activeSheetProduct: null
};

// Initialize per-card quantities to 1
SELECT_CATALOG.forEach(item => {
  appState.cardQuantities[item.id] = 1;
});

// ==========================================
// BAMBOO CONTENT ARCHITECTURE (Foundation)
// ==========================================

/**
 * Standard Category Taxonomy for Bamboo Content.
 * Prepared for future categories: recipes, serving-ideas, chinese-inspired, sauces, food-guides.
 */
const BAMBOO_CONTENT_CATEGORIES = [
  {
    id: 'prepare',
    label: 'Prepare',
    icon: '🥟',
    tagline: 'Finish-at-home cooking guides and validated kitchen methods',
    active: true
  }
];

/**
 * Standard Bamboo Content Item Model:
 * - id: unique string
 * - category: matches one of BAMBOO_CONTENT_CATEGORIES
 * - title: editorial headline
 * - shortDescription: concise context
 * - image: visual food asset
 * - relatedProductId: optional catalog connection (e.g. 'chicken-dumpling-box-10')
 * - content: structured payload (methods, steps, notes, safety)
 * - action: optional contextual conversion action
 */
const BAMBOO_CONTENT_ITEMS = [
  {
    id: 'dumpling-preparation-guide',
    category: 'prepare',
    title: 'Dumpling Preparation Guide',
    shortDescription: 'Validated finishing methods for your 10-dumpling Finish-at-Home box.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
    relatedProductId: 'chicken-dumpling-box-10',
    content: {
      intro: 'Handcrafted with thin pleated wrappers and fresh savoury filling, our chilled dumplings are prepared to be finished in minutes. Follow these three time-tested finishing methods for crisp, tender, or classic broth-served dumplings.',
      methods: [
        {
          num: 1,
          name: 'Pan-Frying (Crispy Bottom)',
          badgeClass: '',
          time: '~8 mins',
          intro: 'The signature method for a golden, crunchy crust with juicy filling inside.',
          steps: [
            'Heat 1 tbsp cooking oil in a non-stick frying pan over medium-high heat.',
            'Place chilled dumplings flat-side down into the pan. Fry for 2 to 3 minutes until the bottoms turn golden brown.',
            'Carefully pour in 50ml water (approx. 3 tablespoons), then cover immediately with a tight lid.',
            'Steam on medium heat for 5 minutes until the water has evaporated. Remove lid and let the bottom crisp up for another 30 seconds before serving hot.'
          ]
        },
        {
          num: 2,
          name: 'Steaming (Tender & Juicy)',
          badgeClass: 'steam',
          time: '~10 mins',
          intro: 'Gentle steam cooking for tender wrappers and maximum broth retention.',
          steps: [
            'Line a bamboo or metal steamer basket with baking parchment paper or clean cabbage leaves.',
            'Arrange dumplings spacing them 2cm apart so they do not stick together as they expand.',
            'Place steamer over vigorously boiling water, cover with lid, and steam for 8 to 10 minutes until steaming hot throughout.'
          ]
        },
        {
          num: 3,
          name: 'Boiling (Silky & Classic)',
          badgeClass: 'boil',
          time: '~6 mins',
          intro: 'Simple pot method ideal for serving with warm broth or chilli soy dip.',
          steps: [
            'Bring a large pot of water to a rolling boil.',
            'Gently drop dumplings into boiling water, stirring lightly so they do not stick to the bottom.',
            'Cook for 5 to 6 minutes until all dumplings float to the top and skins turn translucent. Drain gently and enjoy.'
          ]
        }
      ],
      safety: {
        title: 'Food Safety & Storage Notice',
        text: 'Always cook dumplings until the internal filling reaches at least 75°C (165°F). Keep chilled at ≤4°C until ready to cook. Do not refreeze once thawed.'
      }
    },
    action: {
      label: 'Order 10-Pack Box →',
      targetCategory: 'finish-at-home'
    }
  }
];

function getContentItemsByCategory(categoryId) {
  return BAMBOO_CONTENT_ITEMS.filter(item => item.category === categoryId);
}

// ==========================================
// APP SHELL & MULTI-VIEW NAVIGATION
// ==========================================

/**
 * Switch active app tab cleanly with smooth transitions and URL hash synchronization
 */
function navigateToTab(tabId, updateHistory = true) {
  const validTabs = ['home', 'menu', 'prepare', 'orders', 'account'];
  if (!validTabs.includes(tabId)) {
    tabId = 'home';
  }

  appState.activeTab = tabId;

  // 1. Toggle Tab Panes
  validTabs.forEach(id => {
    const pane = document.getElementById(`tab-view-${id}`);
    if (pane) {
      if (id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    }
  });

  // 2. Toggle Bottom Navigation Items
  validTabs.forEach(id => {
    const navBtn = document.getElementById(`nav-btn-${id}`);
    if (navBtn) {
      if (id === tabId) {
        navBtn.classList.add('active');
        navBtn.setAttribute('aria-selected', 'true');
      } else {
        navBtn.classList.remove('active');
        navBtn.setAttribute('aria-selected', 'false');
      }
    }
  });

  // 3. Tab-specific lifecycle actions
  if (tabId === 'orders') {
    renderOrdersTab();
  } else if (tabId === 'menu') {
    renderMenu();
  } else if (tabId === 'home') {
    renderHomeFeed();
  }

  // Update contextual position of persistent bag bar
  const floatingBtn = document.getElementById('floating-cart-btn');
  if (floatingBtn) {
    floatingBtn.setAttribute('data-tab-context', tabId);
  }

  // 4. Update URL Hash without page jump or reload
  if (updateHistory) {
    if (window.location.hash !== `#${tabId}`) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `#${tabId}`);
      } else {
        window.location.hash = `#${tabId}`;
      }
    }
  }

  // 5. Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/**
 * Switch to Menu tab and activate a specific category filter
 */
function navigateToCategory(categoryId) {
  navigateToTab('menu');

  appState.activeCategory = categoryId;
  const categoryButtons = document.querySelectorAll('.cat-filter-btn');
  categoryButtons.forEach(btn => {
    const isTarget = btn.getAttribute('data-category') === categoryId;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    if (isTarget) {
      setTimeout(() => {
        btn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
      }, 50);
    }
  });

  renderMenu();
}

// ==========================================
// HOME DISCOVERY EXPERIENCE & DISCOVERY NODES
// ==========================================

/**
 * Editorial Discovery Nodes Taxonomy for Bamboo Chicken Select — LOCKED 4 POST TYPES
 * 1. FOOD (~50%) | 2. PREPARE (~25%) | 3. SERVING (~15%) | 4. BAMBOO ATTEND EVENTS (~10%)
 * Profile Identity: ALWAYS 'BAMBOO CHICKEN'
 */
const DISCOVERY_NODES = [
  // Post 1: TYPE 1 — FOOD
  {
    id: 'node-bamboo-chicken',
    contentType: 'food',
    themeClass: 'node-theme-dark',
    productId: 'bamboo-chicken-select',
    contextTitle: 'Signature Bamboo Chicken',
    tag: 'Food',
    tagClass: 'food-badge',
    title: 'Signature Bamboo Chicken',
    caption: 'Crispy, juicy Bamboo Chicken made for an easy, satisfying meal. Order it from Bamboo Select and add it straight to your bag.',
    shortDesc: 'Crispy, juicy Bamboo Chicken made for an easy, satisfying meal',
    fullDesc: 'Crispy, juicy Bamboo Chicken made for an easy, satisfying meal. Order it from Bamboo Select and add it straight to your bag.',
    price: 3.00,
    unit: '1 stick',
    images: [
      {
        url: 'https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/website/bamboo_chicken_3_sticks.webp',
        alt: 'Signature Bamboo Chicken on skewers fresh from the grill'
      },
      {
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        alt: 'Flame-grilled chicken skewers sizzling over hot coals'
      },
      {
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        alt: 'Bamboo Chicken skewer served hot and ready'
      }
    ],
    initialLikes: 38,
    initialComments: [
      { author: 'Ronald (Head Chef)', avatar: '👨‍🍳', time: 'Today', text: 'Grilled over charcoal to seal in all the natural chicken juices.' },
      { author: 'Avondale Customer', avatar: '🥢', time: 'Yesterday', text: 'The savoury glaze on these skewers is unreal. Arrived steaming hot!' }
    ]
  },

  // Post 2: TYPE 2 — PREPARE
  {
    id: 'node-prep-dumplings-guide',
    contentType: 'prepare',
    themeClass: 'node-theme-craft',
    productId: 'chicken-dumpling-box-10',
    prepareTargetId: 'prep-featured-video',
    prepareMethod: 'pan-frying',
    contextTitle: 'How to Finish Cooking Bamboo Dumplings',
    tag: 'Prepare',
    tagClass: 'guide-badge',
    title: 'How to Finish Cooking Bamboo Dumplings',
    caption: 'Finish your Bamboo Dumplings at home with the right cooking technique. Follow Bamboo’s preparation guide for a crisp, properly cooked finish.',
    shortDesc: 'Finish your Bamboo Dumplings at home with the right cooking technique',
    fullDesc: 'Finish your Bamboo Dumplings at home with the right cooking technique. Follow Bamboo’s preparation guide for a crisp, properly cooked finish.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
        alt: 'Golden crispy pan-frying dumplings in a skillet'
      },
      {
        url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        alt: 'Adding savoury soy sauce dip and spring onions'
      }
    ],
    initialLikes: 41,
    initialComments: [
      { author: 'Chef Ronald', avatar: '👨‍🍳', time: '3 days ago', text: 'Pro tip: do not lift the lid during the 5-minute steam so heat stays trapped inside.' }
    ]
  },

  // Post 3: TYPE 1 — FOOD
  {
    id: 'node-bamboo-pie',
    contentType: 'food',
    themeClass: 'node-theme-light',
    productId: 'bamboo-pie-select',
    contextTitle: 'Bamboo Pie',
    tag: 'Food',
    tagClass: 'food-badge',
    title: 'Golden Bamboo Pie',
    caption: 'A warm Bamboo favourite made for a quick bite whenever you’re hungry. Add Bamboo Pie to your bag and enjoy it your way.',
    shortDesc: 'A warm Bamboo favourite, made for a quick bite whenever you’re hungry',
    fullDesc: 'A warm Bamboo favourite made for a quick bite whenever you’re hungry. Add Bamboo Pie to your bag and enjoy it your way.',
    price: 3.00,
    unit: 'per pie',
    images: [
      {
        url: 'https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/menu/bamboo_pie_3.webp',
        alt: 'Golden savoury Bamboo Pie with flaky pastry crust'
      },
      {
        url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
        alt: 'Warm freshly baked savoury pie ready to slice'
      }
    ],
    initialLikes: 27,
    initialComments: [
      { author: 'Belgravia Customer', avatar: '🥧', time: 'Yesterday', text: 'The crust is properly flaky and buttery. Great lunch pairing with ice tea.' }
    ]
  },

  // Post 4: TYPE 3 — SERVING
  {
    id: 'node-serving-dumplings-soy',
    contentType: 'serving',
    themeClass: 'node-theme-light',
    servingId: 'prep-serving-section',
    contextTitle: 'Dumplings & Soy Sauce',
    tag: 'Serving',
    tagClass: 'serving-badge',
    title: 'Dumplings & Soy Sauce',
    caption: 'A simple Bamboo pairing: dumplings with savoury soy for dipping and sharing. See how Bamboo brings the two together for an easy serving idea.',
    shortDesc: 'A simple Bamboo pairing: dumplings with savoury soy for dipping and sharing',
    fullDesc: 'A simple Bamboo pairing: dumplings with savoury soy for dipping and sharing. See how Bamboo brings the two together for an easy serving idea.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        alt: 'Steamed dumplings served with savoury dipping soy sauce and scallions'
      },
      {
        url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
        alt: 'Dumplings on ceramic platter with dipping dish'
      }
    ],
    initialLikes: 33,
    initialComments: [
      { author: 'Harare Foodie', avatar: '🥢', time: '2 days ago', text: 'The dipping soy makes all the difference.' }
    ]
  },

  // Post 5: TYPE 1 — FOOD
  {
    id: 'node-cooked-dumplings-5',
    contentType: 'food',
    themeClass: 'node-theme-light',
    productId: 'chicken-dumplings-cooked',
    contextTitle: 'Hot Chicken Dumplings (5 Pack)',
    tag: 'Food',
    tagClass: 'food-badge',
    title: 'Hot Chicken Dumplings (5 Pack)',
    caption: 'Five cooked chicken dumplings, ready to enjoy as a snack or quick meal. Add a pack to your bag whenever dumplings are calling.',
    shortDesc: 'Five cooked chicken dumplings, ready to enjoy as a snack or quick meal',
    fullDesc: 'Five cooked chicken dumplings, ready to enjoy as a snack or quick meal. Add a pack to your bag whenever dumplings are calling.',
    price: 5.00,
    unit: 'pack of 5',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
        alt: 'Steamed chicken dumplings served with savoury dipping sauce'
      },
      {
        url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
        alt: 'Freshly cooked dumpling close up'
      }
    ],
    initialLikes: 39,
    initialComments: [
      { author: 'Mount Pleasant Customer', avatar: '🛵', time: '3 days ago', text: 'Fast delivery to UZ area, arrived piping hot!' }
    ]
  },

  // Post 6: TYPE 2 — PREPARE
  {
    id: 'node-prep-crispy-pan-fry',
    contentType: 'prepare',
    themeClass: 'node-theme-craft',
    productId: 'chicken-dumpling-box-10',
    prepareTargetId: 'prep-featured-video',
    prepareMethod: 'pan-frying',
    contextTitle: 'Crispy-Bottom Pan-Frying Technique',
    tag: 'Prepare',
    tagClass: 'guide-badge',
    title: 'Crispy-Bottom Pan-Frying Technique',
    caption: 'Learn how to give your Bamboo Dumplings a crisp, golden bottom at home. Follow the Bamboo preparation guide and see the technique step by step.',
    shortDesc: 'Learn how to give your Bamboo Dumplings that crisp, golden bottom at home',
    fullDesc: 'Learn how to give your Bamboo Dumplings a crisp, golden bottom at home. Follow the Bamboo preparation guide and see the technique step by step.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
        alt: 'Golden crispy pan-frying dumplings in a skillet'
      },
      {
        url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
        alt: 'Dumpling pan-frying process'
      }
    ],
    initialLikes: 45,
    initialComments: [
      { author: 'Chef Ronald', avatar: '👨‍🍳', time: 'Yesterday', text: 'Keep the heat steady on medium for the crunchiest lace bottom.' }
    ]
  },

  // Post 7: TYPE 1 — FOOD
  {
    id: 'node-dumpling-box-10',
    contentType: 'food',
    themeClass: 'node-theme-light',
    productId: 'chicken-dumpling-box-10',
    contextTitle: 'Finish-at-Home Chicken Dumplings (10 Box)',
    tag: 'Food',
    tagClass: 'food-badge',
    title: 'Finish-at-Home Chicken Dumplings (10 Box)',
    caption: 'Ten chicken dumplings prepared for you to finish cooking at home. A Bamboo option for enjoying freshly finished dumplings when you’re ready.',
    shortDesc: 'Ten chicken dumplings prepared for you to finish cooking at home',
    fullDesc: 'Ten chicken dumplings prepared for you to finish cooking at home. A Bamboo option for enjoying freshly finished dumplings when you’re ready.',
    price: 10.00,
    unit: 'box of 10',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
        alt: 'Chilled 10-pack dumplings being prepared in the pan'
      },
      {
        url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
        alt: 'Pan-fried golden crispy bottom dumplings'
      }
    ],
    initialLikes: 54,
    initialComments: [
      { author: 'Borrowdale Foodie', avatar: '🍲', time: '2 days ago', text: 'We order 3 boxes for the weekend. So easy to finish in a non-stick pan.' }
    ]
  },

  // Post 8: TYPE 4 — BAMBOO ATTEND EVENTS
  {
    id: 'node-event-has-swimming',
    contentType: 'event',
    themeClass: 'node-theme-dark',
    eventId: 'has-swimming',
    contextTitle: 'Bamboo at HAS — Harare Amateur Swimming',
    tag: 'Events',
    tagClass: 'event-badge',
    title: 'Bamboo at HAS — Harare Amateur Swimming',
    caption: 'Bamboo Chicken covers food for events, birthdays, weddings and special occasions. If you’re planning an event and want Bamboo there, enquire with us.',
    shortDesc: 'Bamboo Chicken brings food to real occasions, from events to private celebrations',
    fullDesc: 'Bamboo Chicken covers food for events, birthdays, weddings and special occasions. If you’re planning an event and want Bamboo there, enquire with us.',
    images: [
      {
        url: 'https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/website/bamboo_chicken_3_sticks.webp',
        alt: 'Bamboo Chicken catering live event setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        alt: 'Harare community enjoying fresh food'
      }
    ],
    initialLikes: 68,
    initialComments: [
      { author: 'HAS Organiser', avatar: '🏊', time: 'Last weekend', text: 'The swimmers and parents loved the hot skewers between races!' }
    ]
  },

  // Post 9: TYPE 1 — FOOD
  {
    id: 'node-ice-tea-soy-pair',
    contentType: 'food',
    themeClass: 'node-theme-light',
    productId: 'ice-tea-select',
    contextTitle: 'Select Ice Tea & Savoury Soy Sauce',
    tag: 'Food',
    tagClass: 'food-badge',
    title: 'Select Ice Tea & Savoury Soy Sauce',
    caption: 'Refresh with Bamboo iced tea, made for a cool and easy drink anytime. Add it to your bag through Bamboo Select.',
    shortDesc: 'Refresh with Bamboo iced tea, made for a cool and easy drink anytime',
    fullDesc: 'Refresh with Bamboo iced tea, made for a cool and easy drink anytime. Add it to your bag through Bamboo Select.',
    price: 3.00,
    unit: 'per bottle',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
        alt: 'Chilled citrus iced tea bottle'
      },
      {
        url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        alt: 'Full bottle of rich savoury soy sauce'
      }
    ],
    initialLikes: 22,
    initialComments: [
      { author: 'Eastlea Customer', avatar: '🥤', time: 'Yesterday', text: 'The ice tea is genuinely refreshing with the skewers.' }
    ]
  }
];

/**
 * Updates dynamic greeting on Home based on current time
 */
function updateHomeGreeting() {
  const greetingEl = document.getElementById('home-greeting-time');
  if (!greetingEl) return;
  const hour = new Date().getHours();
  if (hour < 12) {
    greetingEl.textContent = 'Good morning.';
  } else if (hour < 17) {
    greetingEl.textContent = 'Good afternoon.';
  } else {
    greetingEl.textContent = 'Good evening.';
  }
}

/**
 * Get likes count and status for a discovery node
 */
function getNodeLikesData(nodeId) {
  const node = DISCOVERY_NODES.find(n => n.id === nodeId);
  let likedList = [];
  try {
    const raw = localStorage.getItem('bamboo_select_liked_nodes');
    if (raw) likedList = JSON.parse(raw);
  } catch (e) {}

  const isLiked = Array.isArray(likedList) && likedList.includes(nodeId);
  const baseLikes = node ? node.initialLikes : 0;
  return {
    isLiked,
    count: baseLikes + (isLiked ? 1 : 0)
  };
}

/**
 * Toggle like for a discovery node
 */
function toggleNodeLike(nodeId) {
  let likedList = [];
  try {
    const raw = localStorage.getItem('bamboo_select_liked_nodes');
    if (raw) likedList = JSON.parse(raw);
    if (!Array.isArray(likedList)) likedList = [];
  } catch (e) {
    likedList = [];
  }

  const alreadyLiked = likedList.includes(nodeId);
  if (alreadyLiked) {
    likedList = likedList.filter(id => id !== nodeId);
  } else {
    likedList.push(nodeId);
  }

  try {
    localStorage.setItem('bamboo_select_liked_nodes', JSON.stringify(likedList));
  } catch (e) {}

  // Update UI immediately
  const btn = document.getElementById(`like-btn-${nodeId}`);
  const countEl = document.getElementById(`like-count-${nodeId}`);
  const node = DISCOVERY_NODES.find(n => n.id === nodeId);
  const baseLikes = node ? node.initialLikes : 0;
  const newCount = baseLikes + (!alreadyLiked ? 1 : 0);

  if (btn) {
    btn.classList.toggle('liked', !alreadyLiked);
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', !alreadyLiked ? '#E11D48' : 'none');
    }
  }
  if (countEl) {
    countEl.textContent = newCount;
  }
}

/**
 * Get comments count for a discovery node
 */
function getNodeCommentsCount(nodeId) {
  const node = DISCOVERY_NODES.find(n => n.id === nodeId);
  let localComments = [];
  try {
    const raw = localStorage.getItem(`bamboo_select_comments_${nodeId}`);
    if (raw) localComments = JSON.parse(raw);
  } catch (e) {}

  const initialCount = (node && node.initialComments) ? node.initialComments.length : 0;
  const userCount = Array.isArray(localComments) ? localComments.length : 0;
  return initialCount + userCount;
}

/**
 * Render all comments for active discovery node
 */
function renderNodeComments(nodeId) {
  const container = document.getElementById('comments-list-container');
  if (!container) return;

  const node = DISCOVERY_NODES.find(n => n.id === nodeId);
  if (!node) return;

  let localComments = [];
  try {
    const raw = localStorage.getItem(`bamboo_select_comments_${nodeId}`);
    if (raw) localComments = JSON.parse(raw);
    if (!Array.isArray(localComments)) localComments = [];
  } catch (e) {
    localComments = [];
  }

  const allComments = [...(node.initialComments || []), ...localComments];

  if (allComments.length === 0) {
    container.innerHTML = `
      <div class="comments-empty-state">
        <p>No comments yet. Share your thoughts on this dish!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = allComments.map(c => `
    <div class="comment-row">
      <div class="comment-avatar">${escapeHtml(c.avatar || '💬')}</div>
      <div class="comment-body">
        <div class="comment-author-row">
          <span class="comment-author-name">${escapeHtml(c.author || 'Customer')}</span>
          <span class="comment-time">${escapeHtml(c.time || 'Recently')}</span>
        </div>
        <p class="comment-text">${escapeHtml(c.text || '')}</p>
      </div>
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

/**
 * Open Comments Bottom Sheet for a specific Discovery Node
 */
function openCommentsSheet(nodeId) {
  const node = DISCOVERY_NODES.find(n => n.id === nodeId);
  if (!node) return;

  appState.activeCommentNodeId = nodeId;

  const modal = document.getElementById('comments-sheet-modal');
  const titleEl = document.getElementById('comments-sheet-title');
  const subEl = document.getElementById('comments-sheet-subtitle');
  const inputEl = document.getElementById('comment-input-field');

  if (titleEl) titleEl.textContent = 'Comments';
  if (subEl) subEl.textContent = node.title;
  if (inputEl) inputEl.value = '';

  renderNodeComments(nodeId);

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close Comments Bottom Sheet
 */
function closeCommentsSheet() {
  const modal = document.getElementById('comments-sheet-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
  appState.activeCommentNodeId = null;
}

/**
 * Submit comment for active discovery node
 */
function submitDiscoveryComment() {
  const nodeId = appState.activeCommentNodeId;
  if (!nodeId) return;

  const inputEl = document.getElementById('comment-input-field');
  if (!inputEl) return;

  const text = inputEl.value.trim();
  if (!text) return;

  let localComments = [];
  try {
    const raw = localStorage.getItem(`bamboo_select_comments_${nodeId}`);
    if (raw) localComments = JSON.parse(raw);
    if (!Array.isArray(localComments)) localComments = [];
  } catch (e) {
    localComments = [];
  }

  localComments.push({
    author: 'You (Harare Customer)',
    avatar: '🥢',
    time: 'Just now',
    text: text
  });

  try {
    localStorage.setItem(`bamboo_select_comments_${nodeId}`, JSON.stringify(localComments));
  } catch (e) {}

  inputEl.value = '';
  renderNodeComments(nodeId);

  // Update comment counter in feed
  const countEl = document.getElementById(`comment-count-${nodeId}`);
  if (countEl) {
    countEl.textContent = getNodeCommentsCount(nodeId);
  }

  showToastNotification('Comment saved locally on device');
}

/**
 * Share Discovery Node (Native Web Share with Clipboard Fallback)
 */
function shareDiscoveryNode(nodeId) {
  const node = DISCOVERY_NODES.find(n => n.id === nodeId);
  if (!node) return;

  const shareUrl = `${window.location.origin}${window.location.pathname}#discovery-${nodeId}`;
  const shareTitle = `${node.title} — Bamboo Chicken Select`;
  const shareText = `${node.caption} Order fresh in Harare!`;

  if (navigator.share) {
    navigator.share({
      title: shareTitle,
      text: shareText,
      url: shareUrl
    }).catch(err => {
      if (err.name !== 'AbortError') {
        copyDiscoveryLink(shareUrl);
      }
    });
  } else {
    copyDiscoveryLink(shareUrl);
  }
}

function copyDiscoveryLink(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToastNotification('Discovery link copied to clipboard!');
    }).catch(() => {
      promptCopyFallback(url);
    });
  } else {
    promptCopyFallback(url);
  }
}

function promptCopyFallback(url) {
  showToastNotification('Link ready: ' + url);
}

/**
 * Update multi-image gallery counter and dot indicators as user scrolls horizontally
 */
function handleGalleryScroll(sliderEl, counterId, dotsContainerId) {
  if (!sliderEl) return;
  const slideWidth = sliderEl.clientWidth;
  if (!slideWidth) return;

  const currentIndex = Math.min(
    Math.floor((sliderEl.scrollLeft + (slideWidth / 2)) / slideWidth) + 1,
    sliderEl.children.length
  );

  const counterEl = document.getElementById(counterId);
  if (counterEl) {
    counterEl.textContent = `${currentIndex}/${sliderEl.children.length}`;
  }

  const dotsContainer = document.getElementById(dotsContainerId);
  if (dotsContainer) {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentIndex - 1);
    }
  }
}

/**
 * Scroll gallery to a specific slide when user taps a dot indicator
 */
function scrollGalleryToSlide(sliderId, slideIndex) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;
  const slideWidth = slider.clientWidth;
  slider.scrollTo({
    left: slideIndex * slideWidth,
    behavior: 'smooth'
  });
}

/**
 * 1-Tap Add to Bag directly from Discovery Node with instant tactile feedback
 */
function addNodeProductToBag(productId, btnEl) {
  quickAddItemToBag(productId);

  if (btnEl) {
    btnEl.classList.add('added');
    btnEl.innerHTML = `<span class="add-icon">✓</span><span class="add-label">ADDED</span>`;
    setTimeout(() => {
      btnEl.classList.remove('added');
      updateHomeFeedInBagBadges();
    }, 1000);
  }
}

/**
 * Update In-Bag indicators on Home Discovery Feed nodes
 */
function updateHomeFeedInBagBadges() {
  const feedEl = document.getElementById('home-discovery-feed');
  if (!feedEl) return;

  DISCOVERY_NODES.forEach(node => {
    if (!node.productId) return;
    const nodeEl = document.getElementById(`discovery-${node.id}`);
    if (!nodeEl) return;

    const cartItem = appState.cart.find(c => c.id === node.productId);
    const inBagQty = cartItem ? cartItem.quantity : 0;
    const addBtn = nodeEl.querySelector('.btn-node-add-bag');

    if (addBtn && !addBtn.classList.contains('btn-node-explore') && !addBtn.classList.contains('added')) {
      const labelSpan = addBtn.querySelector('.add-label');
      const iconSpan = addBtn.querySelector('.add-icon');
      if (inBagQty > 0) {
        addBtn.classList.add('in-bag');
        if (labelSpan) labelSpan.textContent = `In Bag (${inBagQty})`;
        if (iconSpan) iconSpan.textContent = '✓';
      } else {
        addBtn.classList.remove('in-bag');
        if (labelSpan) labelSpan.textContent = 'Add to Bag';
        if (iconSpan) iconSpan.textContent = '+';
      }
    }
  });
}

/**
 * Render the Vertical Food Discovery Feed with Editorial Discovery Nodes
 */
function renderHomeFeed() {
  updateHomeGreeting();

  const container = document.getElementById('home-discovery-feed');
  if (!container) return;

  container.innerHTML = DISCOVERY_NODES.map(node => {
    const isMultiImage = node.images && node.images.length > 1;
    const totalSlides = node.images ? node.images.length : 1;
    const sliderId = `slider-${node.id}`;
    const counterId = `counter-${node.id}`;
    const dotsId = `dots-${node.id}`;

    const likesData = getNodeLikesData(node.id);
    const commentsCount = getNodeCommentsCount(node.id);

    // Slides markup
    const slidesHtml = (node.images || []).map(img => `
      <div class="discovery-gallery-slide">
        <img src="${img.url}" alt="${escapeHtml(img.alt || node.title)}" loading="lazy" />
      </div>
    `).join('');

    // Dots markup
    const dotsHtml = isMultiImage ? `
      <div class="discovery-gallery-dots" id="${dotsId}" role="tablist" aria-label="Photo carousel indicators">
        ${node.images.map((_, idx) => `
          <button type="button" class="gallery-dot ${idx === 0 ? 'active' : ''}" onclick="scrollGalleryToSlide('${sliderId}', ${idx});" aria-label="Go to slide ${idx + 1}" role="tab"></button>
        `).join('')}
      </div>
    ` : '';

    // Counter markup
    const counterHtml = isMultiImage ? `
      <div class="discovery-gallery-counter" id="${counterId}" aria-label="Slide 1 of ${totalSlides}">
        1/${totalSlides}
      </div>
    ` : '';

    // Primary CTA Markup strictly mapped to the 4 content types (Section 2 & 6)
    let commerceHtml = '';
    if (node.contentType === 'food') {
      const cartItem = appState.cart.find(c => c.id === node.productId);
      const inBagQty = cartItem ? cartItem.quantity : 0;
      commerceHtml = `
        <div class="commerce-price-block">
          <span class="node-price-val">$${node.price.toFixed(2)}</span>
          ${node.unit ? `<span class="node-unit-val">${escapeHtml(node.unit)}</span>` : ''}
        </div>
        <button type="button" class="btn-node-add-bag ${inBagQty > 0 ? 'in-bag' : ''}" onclick="addNodeProductToBag('${node.productId}', this);" aria-label="Add ${escapeHtml(node.title)} to bag for $${node.price.toFixed(2)}">
          <span class="add-icon">${inBagQty > 0 ? '✓' : '+'}</span>
          <span class="add-label">${inBagQty > 0 ? `In Bag (${inBagQty})` : 'Add to Bag'}</span>
        </button>
      `;
    } else if (node.contentType === 'prepare') {
      commerceHtml = `
        <button type="button" class="btn-node-action-primary btn-node-prep" onclick="openPrepareForProduct('${node.prepareTargetId || 'prep-featured-video'}', '${node.prepareMethod || 'pan-frying'}');" aria-label="How to prepare ${escapeHtml(node.title)}">
          <span>HOW TO PREPARE</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      `;
    } else if (node.contentType === 'serving') {
      commerceHtml = `
        <button type="button" class="btn-node-action-primary btn-node-serving" onclick="openServingContent('${node.servingId || 'prep-serving-section'}');" aria-label="See how to serve ${escapeHtml(node.title)}">
          <span>SEE HOW</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      `;
    } else if (node.contentType === 'event') {
      commerceHtml = `
        <button type="button" class="btn-node-action-primary btn-node-event" onclick="openEventEnquiry('${escapeHtml(node.title)}');" aria-label="Enquire for your event with Bamboo Chicken">
          <span>ENQUIRE FOR YOUR EVENT</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      `;
    }

    return `
      <article class="discovery-node ${node.themeClass || 'node-theme-light'}" id="discovery-${node.id}" aria-label="${escapeHtml(node.title)}">
        <!-- Node Author Header: CONSTANT Profile (BAMBOO CHICKEN) + Variable Post Context/Title -->
        <header class="discovery-node-header">
          <div class="node-author-group">
            <div class="node-avatar-circle">🥢</div>
            <div class="node-author-info">
              <span class="node-author-name">BAMBOO CHICKEN</span>
              <span class="node-author-sub">${escapeHtml(node.contextTitle || node.title)}</span>
            </div>
          </div>
          <span class="node-badge-tag ${node.tagClass || ''}">${escapeHtml(node.tag)}</span>
        </header>

        <!-- Multi-Image Photo Gallery -->
        <div class="discovery-gallery-wrap">
          <div 
            class="discovery-gallery-slider" 
            id="${sliderId}" 
            onscroll="handleGalleryScroll(this, '${counterId}', '${dotsId}');"
            tabindex="0"
            role="region"
            aria-label="${escapeHtml(node.title)} photo gallery"
          >
            ${slidesHtml}
          </div>
          ${counterHtml}
          ${dotsHtml}
        </div>

        <!-- Restrained Social Engagement Row: Like, Comment, Share -->
        <div class="discovery-actions-row">
          <div class="discovery-engagement-group">
            <button 
              type="button" 
              class="btn-discovery-action ${likesData.isLiked ? 'liked' : ''}" 
              id="like-btn-${node.id}" 
              onclick="toggleNodeLike('${node.id}');"
              aria-label="Like ${escapeHtml(node.title)}"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${likesData.isLiked ? '#E11D48' : 'none'}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span id="like-count-${node.id}">${likesData.count}</span>
            </button>

            <button 
              type="button" 
              class="btn-discovery-action" 
              onclick="openCommentsSheet('${node.id}');"
              aria-label="View comments for ${escapeHtml(node.title)}"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span id="comment-count-${node.id}">${commentsCount}</span>
            </button>

            <button 
              type="button" 
              class="btn-discovery-action" 
              onclick="shareDiscoveryNode('${node.id}');"
              aria-label="Share ${escapeHtml(node.title)}"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Node Editorial Content Body -->
        <div class="discovery-node-body">
          <h2 class="node-title">${escapeHtml(node.title)}</h2>
          <div class="node-description-wrap" id="desc-${node.id}">
            <span class="desc-text">${escapeHtml(node.shortDesc || node.caption)}</span><span class="desc-ellipsis">... </span><button type="button" class="btn-desc-toggle" onclick="toggleNodeDescription('${node.id}', true);" aria-label="Show more description for ${escapeHtml(node.title)}">more</button>
          </div>
        </div>

        <!-- Single Primary Action Row belonging to Content Type -->
        <div class="discovery-commerce-row">
          ${commerceHtml}
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Toggle Discovery Node description expansion inline without re-rendering or jumping
 */
function toggleNodeDescription(nodeId, expand) {
  const descEl = document.getElementById(`desc-${nodeId}`);
  if (!descEl) return;
  const node = DISCOVERY_NODES.find(n => n.id === nodeId);
  if (!node) return;

  if (expand) {
    descEl.classList.add('expanded');
    descEl.innerHTML = `
      <span class="desc-text">${escapeHtml(node.fullDesc || node.caption)}</span>
      <button type="button" class="btn-desc-toggle" onclick="toggleNodeDescription('${nodeId}', false);" aria-label="Show less description">less</button>
    `;
  } else {
    descEl.classList.remove('expanded');
    descEl.innerHTML = `
      <span class="desc-text">${escapeHtml(node.shortDesc || node.caption)}</span><span class="desc-ellipsis">... </span><button type="button" class="btn-desc-toggle" onclick="toggleNodeDescription('${nodeId}', true);" aria-label="Show more description">more</button>
    `;
  }
}

/**
 * Handle TYPE 2 (PREPARE): Navigate to Prepare content and focus video/guide
 */
function openPrepareForProduct(targetId, method) {
  navigateToTab('prepare');
  setTimeout(() => {
    const el = document.getElementById(targetId) || document.getElementById('prep-featured-video') || document.getElementById('prepare-video-masterclass');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
      el.style.borderColor = 'var(--gold-vibrant)';
      el.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.35)';
      setTimeout(() => {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }, 2000);
    }
  }, 120);
}

/**
 * Handle TYPE 3 (SERVING): Navigate to Prepare destination and focus Serving section
 */
function openServingContent(targetId) {
  navigateToTab('prepare');
  setTimeout(() => {
    const el = document.getElementById(targetId || 'prep-serving-section') || document.getElementById('prep-serving-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
      el.style.borderColor = 'var(--gold-vibrant)';
      el.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.35)';
      setTimeout(() => {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }, 2000);
    }
  }, 120);
}

/**
 * Canonical Frying Method Video Source configuration
 * (Single canonical video source for both Home PREPARE posts)
 */
const CANONICAL_FRYING_VIDEO = {
  id: 'prep-featured-video',
  title: 'How to Finish Cooking Bamboo Dumplings',
  subtitle: 'Frying / finish-at-home method',
  poster: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
  src: '' // Plugged when official video file asset is deployed
};

/**
 * Play Dumpling Preparation Video technique explicitly on user tap (STRICT: NO autoplay)
 */
function playPrepareVideo() {
  const posterLayer = document.getElementById('prep-video-poster-layer');
  const video = document.getElementById('prep-native-video');
  const nonplaying = document.getElementById('prep-video-nonplaying-state');

  if (CANONICAL_FRYING_VIDEO.src) {
    // If real video asset exists, play using standard native HTML5 video player
    if (posterLayer) posterLayer.style.display = 'none';
    if (nonplaying) nonplaying.style.display = 'none';
    if (video) {
      video.style.display = 'block';
      if (!video.src || !video.src.includes(CANONICAL_FRYING_VIDEO.src)) {
        video.src = CANONICAL_FRYING_VIDEO.src;
      }
      video.loop = false; // Do not automatically replay
      video.muted = false; // Allow sound / unmute on explicit user tap

      // Stop at end and leave user in PREPARE experience
      video.onended = () => {
        video.pause();
      };

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts unmuted autoplay, mute as fallback
          video.muted = true;
          video.play();
        });
      }
    }
  } else {
    // Real video asset is not yet available: preserve video architecture
    // and display appropriate non-playing state rather than fake video content
    if (posterLayer) posterLayer.style.display = 'none';
    if (video) {
      video.style.display = 'none';
      video.pause();
    }
    if (nonplaying) {
      nonplaying.style.display = 'flex';
    }
  }
}

/**
 * Reset video container back to initial thumbnail card with clear PLAY button
 */
function resetPrepareVideo() {
  const posterLayer = document.getElementById('prep-video-poster-layer');
  const video = document.getElementById('prep-native-video');
  const nonplaying = document.getElementById('prep-video-nonplaying-state');

  if (video) {
    video.pause();
    video.currentTime = 0;
    video.style.display = 'none';
  }
  if (nonplaying) {
    nonplaying.style.display = 'none';
  }
  if (posterLayer) {
    posterLayer.style.display = 'block';
  }
}

/**
 * Fullscreen toggle helper (Allow view video full or close full)
 */
function togglePrepareVideoFullscreen() {
  const video = document.getElementById('prep-native-video');
  if (!video) return;
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  } else {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  }
}

/**
 * Sound toggle helper (Allow unmute to allow sound)
 */
function togglePrepareVideoSound() {
  const video = document.getElementById('prep-native-video');
  if (!video) return;
  video.muted = !video.muted;
}

/**
 * Serving description in PREPARE destination
 * (Compact editorial 1-2 lines with inline ...more / less expansion)
 */
const PREPARE_SERVING_DESC = {
  short: 'A simple Bamboo pairing: dumplings with savoury soy for dipping and sharing',
  full: 'A simple Bamboo pairing: dumplings with savoury soy for dipping and sharing. See how Bamboo brings the two together for an easy serving idea. Serve freshly pan-fried or steamed dumplings immediately while piping hot with authentic savoury dipping soy, fresh scallions, and toasted sesame.'
};

function togglePrepareServingDesc(expand) {
  const wrap = document.getElementById('prep-serving-desc-wrap');
  if (!wrap) return;
  if (expand) {
    wrap.classList.add('expanded');
    wrap.innerHTML = `
      <span class="desc-text">${escapeHtml(PREPARE_SERVING_DESC.full)}</span>
      <button type="button" class="btn-desc-toggle" onclick="togglePrepareServingDesc(false);" aria-label="Show less description">less</button>
    `;
  } else {
    wrap.classList.remove('expanded');
    wrap.innerHTML = `
      <span class="desc-text">${escapeHtml(PREPARE_SERVING_DESC.short)}</span><span class="desc-ellipsis">... </span><button type="button" class="btn-desc-toggle" onclick="togglePrepareServingDesc(true);" aria-label="Show more description for Dumplings &amp; Soy Sauce">more</button>
    `;
  }
}

/**
 * Handle TYPE 3 (SERVING): Open serving guide bottom sheet
 */
function openServingSheet(servingId) {
  const modal = document.getElementById('serving-sheet-modal');
  const container = document.getElementById('serving-sheet-content');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="serving-sheet-body">
      <div class="serving-hero-media">
        <img src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80" alt="Dumplings & Savoury Soy Sauce" />
      </div>
      <div>
        <span style="font-size: 0.72rem; font-weight: 800; color: #B45309; text-transform: uppercase; letter-spacing: 0.08em;">Serving Inspiration</span>
        <h4 style="font-size: 1.15rem; font-weight: 800; color: #111827; margin: 3px 0 6px;">Dumplings &amp; Savoury Soy Sauce</h4>
        <p style="font-size: 0.85rem; color: #4B5563; line-height: 1.48; margin: 0;">
          Serve freshly pan-fried or steamed dumplings immediately while piping hot. Drizzle with authentic savoury dipping soy, thinly sliced spring onions, and a touch of toasted sesame oil.
        </p>
      </div>
      <div class="serving-tip-box">
        <strong>💡 Pairing Suggestion:</strong>
        <div>Pair with chilled Select Ice Tea brewed with citrus notes for a refreshing balance against the warm savoury glaze.</div>
      </div>
      <div style="display: flex; gap: 10px; margin-top: 4px;">
        <button type="button" class="btn-node-serving" style="flex: 1;" onclick="closeServingSheet(); navigateToCategory('finish-at-home');">
          View Dumplings in Menu &rarr;
        </button>
        <button type="button" class="btn-comment-cancel" style="padding: 8px 16px; border-radius: 999px;" onclick="closeServingSheet();">
          Done
        </button>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeServingSheet() {
  const modal = document.getElementById('serving-sheet-modal');
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Handle TYPE 4 (BAMBOO ATTEND EVENTS): Open event catering enquiry sheet
 */
function openEventEnquiry(eventTitle) {
  const modal = document.getElementById('event-sheet-modal');
  const container = document.getElementById('event-sheet-content');
  if (!modal || !container) return;

  const defaultMsg = encodeURIComponent("Hi Bamboo Chicken, I would like to enquire about event catering and food coverage for our event.");

  container.innerHTML = `
    <div class="event-sheet-body">
      <div class="event-hero-media">
        <img src="https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/website/bamboo_chicken_3_sticks.webp" alt="Bamboo Chicken Event Catering" />
      </div>
      <div>
        <span style="font-size: 0.72rem; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.08em;">Event Food Coverage</span>
        <h4 style="font-size: 1.15rem; font-weight: 800; color: #111827; margin: 3px 0 6px;">Bamboo at HAS &amp; Harare Events</h4>
        <p style="font-size: 0.85rem; color: #4B5563; line-height: 1.48; margin: 0;">
          We cover food for events, birthdays, weddings and special occasions across Harare. Flame-grilled skewers and hot dumplings prepared live for your guests.
        </p>
      </div>
      <div class="event-info-box">
        <strong>🍢 On-Site Live Catering:</strong>
        <div>Live charcoal grilling station, hot dumpling service, and ice tea refreshment bars tailored for private and corporate gatherings.</div>
      </div>
      <div class="event-action-buttons">
        <a href="https://wa.me/263790040778?text=${defaultMsg}" target="_blank" rel="noopener noreferrer" class="btn-event-whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.203.043.072.043.419-.101.824z"></path></svg>
          <span>Chat on WhatsApp: +263 790 040 778</span>
        </a>
        <a href="tel:+263790040778" class="btn-event-call">
          <span>Call Hotline: +263 790 040 778</span>
        </a>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeEventSheet() {
  const modal = document.getElementById('event-sheet-modal');
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Open Product Details Bottom Sheet
 */
function openProductSheet(itemId) {
  const item = SELECT_CATALOG.find(i => i.id === itemId);
  if (!item) return;

  appState.activeSheetProduct = item;
  appState.sheetQuantity = 1;

  const modal = document.getElementById('product-sheet-modal');
  const scrollBody = document.getElementById('sheet-scroll-body');
  const footer = document.getElementById('sheet-footer');

  if (!modal || !scrollBody || !footer) return;

  const badgeText = item.badge || (item.unit ? item.unit : 'Select Item');
  const isFinishAtHome = item.category === 'finish-at-home' || item.isBox;

  // Render Sheet Scrollable Content
  scrollBody.innerHTML = `
    <div class="sheet-hero-media">
      <img src="${item.image}" alt="${escapeHtml(item.alt || item.name)}" loading="lazy" />
      <span class="sheet-badge">${escapeHtml(badgeText)}</span>
    </div>

    <div class="sheet-title-row">
      <h2 class="sheet-product-title" id="sheet-product-title">${escapeHtml(item.name)}</h2>
      <span class="sheet-price-tag">$${item.price.toFixed(2)}</span>
    </div>

    <div class="sheet-unit-label">${escapeHtml(item.unit || 'per portion')}</div>

    <p class="sheet-desc-text">${escapeHtml(item.description)}</p>

    ${isFinishAtHome ? `
      <div class="sheet-prep-highlight">
        <div class="sheet-prep-highlight-text">
          <strong>HOW TO PREPARE</strong>
          <span>Finish this chilled 10-box at home in minutes. Three validated methods: Pan-Frying (crispy bottom), Steaming, or Boiling.</span>
        </div>
        <button type="button" class="btn-sheet-how-to-prep" onclick="closeProductSheet(); navigateToTab('prepare');">
          <span>View Cooking Guide</span>
          <span>&rarr;</span>
        </button>
      </div>

      <div class="sheet-bulk-note">
        <span>✨ Bulk Tier: Order 3+ boxes to receive $0.50 off per box</span>
      </div>
    ` : ''}

    ${item.id === 'select-soy-sauce' ? `
      <div class="sheet-prep-highlight" style="background: #F0FDF4; border-color: #BBF7D0;">
        <div class="sheet-prep-highlight-text">
          <strong style="color: #166534;">SERVING SUGGESTION</strong>
          <span style="color: #14532D;">Perfect accompaniment for finished dumplings or adding rich savoury umami to home rice &amp; noodle dishes.</span>
        </div>
      </div>
    ` : ''}
  `;

  // Render Sheet Sticky Footer
  footer.innerHTML = `
    <div class="sheet-stepper" role="group" aria-label="Quantity selector">
      <button type="button" class="sheet-stepper-btn" onclick="changeSheetQuantity(-1);" aria-label="Decrease quantity">-</button>
      <span class="sheet-stepper-val" id="sheet-qty-val">1</span>
      <button type="button" class="sheet-stepper-btn" onclick="changeSheetQuantity(1);" aria-label="Increase quantity">+</button>
    </div>
    <button type="button" class="btn-sheet-add-cta" id="btn-sheet-add-cta" onclick="addSheetItemToBag('${item.id}');">
      <span>Add to Bag</span>
      <span id="sheet-cta-price">• $${item.price.toFixed(2)}</span>
    </button>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * Close Product Details Bottom Sheet
 */
function closeProductSheet() {
  const modal = document.getElementById('product-sheet-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
  appState.activeSheetProduct = null;
}

/**
 * Adjust quantity stepper inside Product Details Bottom Sheet
 */
function changeSheetQuantity(delta) {
  if (!appState.activeSheetProduct) return;

  const current = appState.sheetQuantity || 1;
  const next = Math.max(1, Math.min(99, current + delta));
  appState.sheetQuantity = next;

  const valEl = document.getElementById('sheet-qty-val');
  if (valEl) valEl.textContent = next;

  const priceEl = document.getElementById('sheet-cta-price');
  if (priceEl && appState.activeSheetProduct) {
    const total = (appState.activeSheetProduct.price * next).toFixed(2);
    priceEl.textContent = `• $${total}`;
  }
}

/**
 * Add item from bottom sheet with selected quantity
 */
function addSheetItemToBag(itemId) {
  const item = SELECT_CATALOG.find(i => i.id === itemId);
  if (!item) return;

  const qty = appState.sheetQuantity || 1;
  const existingInCart = appState.cart.find(c => c.id === itemId);
  if (existingInCart) {
    existingInCart.quantity += qty;
  } else {
    appState.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      quantity: qty,
      image: item.image,
      isBox: item.category === 'finish-at-home',
      isProvisional: item.id === 'select-soy-sauce' && !SOY_SAUCE_CONFIG.volumeConfirmed
    });
  }

  // Micro-interaction on sheet CTA button
  const ctaBtn = document.getElementById('btn-sheet-add-cta');
  if (ctaBtn) {
    ctaBtn.classList.add('added');
    ctaBtn.innerHTML = `<span>✓ Added to Bag</span>`;
  }

  updateCartUI();
  renderMenu();
  updateHomeFeedInBagBadges();

  setTimeout(() => {
    closeProductSheet();
  }, 350);
}

/**
 * 1-Tap Quick Add to Bag from Home discovery cards
 */
function quickAddItemToBag(itemId) {
  const item = SELECT_CATALOG.find(i => i.id === itemId);
  if (!item) return;

  const existingInCart = appState.cart.find(c => c.id === itemId);
  if (existingInCart) {
    existingInCart.quantity += 1;
  } else {
    appState.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      quantity: 1,
      image: item.image,
      unit: item.unit || '',
      description: item.description || '',
      isBox: item.category === 'finish-at-home',
      isProvisional: item.id === 'select-soy-sauce' && !SOY_SAUCE_CONFIG.volumeConfirmed
    });
  }

  // Sync card quantity stepper
  appState.cardQuantities[itemId] = (appState.cardQuantities[itemId] || 1);

  renderMenu();
  updateCartUI();
  updateHomeFeedInBagBadges();
}

/**
 * Save confirmed order to local storage history
 */
function saveConfirmedOrderToHistory(order) {
  if (!order || !order.orderId) return;
  try {
    const raw = localStorage.getItem('bamboo_select_orders_history');
    let orders = [];
    if (raw) {
      orders = JSON.parse(raw);
    }
    if (!Array.isArray(orders)) {
      orders = [];
    }
    // Remove if duplicate orderId exists
    orders = orders.filter(o => o.orderId !== order.orderId);
    orders.unshift(order);
    localStorage.setItem('bamboo_select_orders_history', JSON.stringify(orders));
    updateNavOrdersBadge();
  } catch (err) {
    console.warn("Could not save confirmed order to localStorage:", err);
  }
}

/**
 * Show badge dot on bottom nav Orders icon when past orders exist
 */
function updateNavOrdersBadge() {
  const dot = document.getElementById('nav-orders-dot');
  if (!dot) return;
  try {
    const raw = localStorage.getItem('bamboo_select_orders_history');
    const orders = raw ? JSON.parse(raw) : [];
    dot.style.display = (Array.isArray(orders) && orders.length > 0) ? 'block' : 'none';
  } catch (e) {
    dot.style.display = 'none';
  }
}

/**
 * Render the dedicated Orders Tab
 */
function renderOrdersTab() {
  const container = document.getElementById('orders-list-container');
  if (!container) return;

  let orders = [];
  try {
    const raw = localStorage.getItem('bamboo_select_orders_history');
    if (raw) {
      orders = JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to parse orders history:", e);
  }

  if (!orders || orders.length === 0) {
    container.innerHTML = `
      <div class="orders-empty-state">
        <div class="empty-orders-icon">🥡</div>
        <h3 class="empty-orders-title">No Orders Yet</h3>
        <p class="empty-orders-desc">
          When you place an order for Bamboo Chicken skewers or finish-at-home dumpling boxes, your confirmed order history, details, and live WhatsApp support links will appear here.
        </p>
        <button type="button" class="btn-empty-orders-action" onclick="navigateToTab('menu');">
          Browse Menu &amp; Order
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const cleanId = String(order.orderId || '').replace(/^#+/, '');
    const displayId = cleanId.startsWith('BC-') ? cleanId : `BC-${cleanId}`;

    // Format date nicely
    let dateStr = 'Recently Placed';
    if (order.createdAt) {
      try {
        const d = new Date(order.createdAt);
        dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' • ' +
                  d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      } catch (err) {
        // fallback
      }
    }

    // Format item summary lines
    const itemsHtml = (order.items || []).map(item => {
      const unitPrice = typeof item.effectiveUnitPrice === 'number' ? item.effectiveUnitPrice : item.price;
      const lineTotal = typeof item.lineTotal === 'number' ? item.lineTotal : (unitPrice * (item.quantity || 1));
      return `
        <div class="order-item-summary-line">
          <span>${escapeHtml(item.name)} &times; ${item.quantity || 1}</span>
          <span>$${lineTotal.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    const grandTotal = typeof order.grandTotal === 'number' ? order.grandTotal : 0;
    const deliveryArea = escapeHtml(order.deliveryArea || 'Harare');
    const paymentMethodLabel = order.paymentMethod === 'ecocash_usd' ? 'EcoCash USD' : 'Cash on Delivery (USD)';
    const encodedOrderMsg = encodeURIComponent(`Hi Bamboo Chicken, I am following up on my Select order #${displayId} (${deliveryArea})`);

    return `
      <div class="order-history-card">
        <div class="order-history-card-header">
          <div class="order-id-badge">#${escapeHtml(displayId)}</div>
          <span class="order-status-badge">Confirmed • In Kitchen</span>
        </div>

        <div class="order-items-summary-list">
          ${itemsHtml}
        </div>

        <div class="order-meta-info-row">
          <span>${dateStr}</span>
          <span>${deliveryArea} • ${paymentMethodLabel}</span>
        </div>

        <div class="order-card-total-row">
          <span class="order-total-label">Total</span>
          <span class="order-total-val">$${grandTotal.toFixed(2)}</span>
        </div>

        <div class="order-actions-row">
          <a href="https://wa.me/263790040778?text=${encodedOrderMsg}" target="_blank" rel="noopener noreferrer" class="btn-order-action whatsapp" aria-label="Follow up on WhatsApp">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.203.043.072.043.419-.101.824z"></path>
            </svg>
            <span>WhatsApp Kitchen</span>
          </a>
          <button type="button" class="btn-order-action copy" onclick="copyOrderId('${escapeHtml(displayId)}');" aria-label="Copy Order ID">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy ID</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 3. INITIALIZATION & LIFECYCLE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderHomeFeed();
  setupEventListeners();
  setupFooterInteraction();
  updateCartUI();

  // App Shell Navigation initialization from URL hash
  const initialHash = (window.location.hash || '').replace('#', '').toLowerCase();
  const validTabs = ['home', 'menu', 'prepare', 'orders', 'account'];
  if (validTabs.includes(initialHash)) {
    navigateToTab(initialHash, false);
  } else {
    navigateToTab('home', false);
  }
  updateNavOrdersBadge();

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

  // Product Details bottom sheet backdrop click listener
  const sheetBackdrop = document.getElementById('product-sheet-modal');
  if (sheetBackdrop) {
    sheetBackdrop.addEventListener('click', (e) => {
      if (e.target === sheetBackdrop) closeProductSheet();
    });
  }

  // Comments bottom sheet backdrop click listener
  const commentsBackdrop = document.getElementById('comments-sheet-modal');
  if (commentsBackdrop) {
    commentsBackdrop.addEventListener('click', (e) => {
      if (e.target === commentsBackdrop) closeCommentsSheet();
    });
  }

  // Global Keyboard Escape listener for modals and bottom sheets
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductSheet();
      closeCommentsSheet();
      closeAreaPicker();
      closeCart();
    }
  });

  // Initialize custom in-app delivery area picker listeners
  initAreaPickerListeners();

  // Brand logo home link
  const brandHomeLink = document.getElementById('brand-home-link');
  if (brandHomeLink) {
    brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToTab('home');
    });
  }

  // Hashchange listener for hardware back / URL navigation
  window.addEventListener('hashchange', () => {
    const hash = (window.location.hash || '').replace('#', '').toLowerCase();
    const validTabs = ['home', 'menu', 'prepare', 'orders', 'account'];
    if (validTabs.includes(hash)) {
      navigateToTab(hash, false);
    }
  });
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
// 4. MENU RENDERING (PREMIUM RESTAURANT EXPERIENCE)
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
      <div class="menu-empty-state">
        <p>No items found in this section.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = sectionsToRender.map(section => {
    // Get products belonging to this section
    const sectionProducts = SELECT_CATALOG.filter(item => item.sectionId === section.id);

    if (sectionProducts.length === 0) return '';

    const itemsHtml = sectionProducts.map(item => renderRestaurantMenuItem(item)).join('');

    return `
      <section class="restaurant-menu-section" id="section-${section.id}" aria-labelledby="heading-${section.id}">
        <!-- Section Editorial Header -->
        <div class="restaurant-section-header">
          <div class="restaurant-section-title-wrap">
            <h2 class="restaurant-section-title" id="heading-${section.id}">${escapeHtml(section.title)}</h2>
            ${section.badge ? `<span class="restaurant-section-badge">${escapeHtml(section.badge)}</span>` : ''}
          </div>
          ${section.description ? `<p class="restaurant-section-desc">${escapeHtml(section.description)}</p>` : ''}
        </div>

        <!-- Section Menu Items (Compact Scannable Restaurant Rows) -->
        <div class="restaurant-items-list" role="list">
          ${itemsHtml}
        </div>
      </section>
    `;
  }).join('');
}

// Render individual restaurant menu item row
function renderRestaurantMenuItem(item) {
  const cartItem = appState.cart.find(c => c.id === item.id);
  const inBagQty = cartItem ? cartItem.quantity : 0;
  const shortDesc = item.shortDescription || item.description || '';

  // Pricing display
  let priceDisplay = `$${item.price.toFixed(2)}`;

  // Action control: '+ Add' button or inline '−  qty  +' stepper directly on the row
  let actionControlHtml = '';
  if (inBagQty === 0) {
    actionControlHtml = `
      <button 
        type="button" 
        class="btn-menu-add" 
        id="btn-add-${item.id}"
        onclick="quickAddMenuItem('${item.id}', event);"
        aria-label="Add ${escapeHtml(item.name)} to bag"
      >
        <span class="btn-menu-add-plus">+</span>
        <span class="btn-menu-add-text">Add</span>
      </button>
    `;
  } else {
    actionControlHtml = `
      <div class="menu-inline-stepper" role="group" aria-label="Quantity for ${escapeHtml(item.name)}">
        <button 
          type="button" 
          class="menu-stepper-btn minus" 
          onclick="modifyCartItemQty('${item.id}', -1); event.stopPropagation();"
          aria-label="Decrease quantity"
        >&minus;</button>
        <span class="menu-stepper-val" id="menu-val-${item.id}">${inBagQty}</span>
        <button 
          type="button" 
          class="menu-stepper-btn plus" 
          onclick="modifyCartItemQty('${item.id}', 1); event.stopPropagation();"
          aria-label="Increase quantity"
        >&plus;</button>
      </div>
    `;
  }

  return `
    <article class="restaurant-menu-row" id="product-card-${item.id}" role="listitem">
      <!-- 1. Small Food Photo (Doorway into Deeper Food View) -->
      <button 
        type="button" 
        class="restaurant-item-photo-btn" 
        onclick="openProductSheet('${item.id}');"
        aria-label="View full photo and details for ${escapeHtml(item.name)}"
      >
        <img 
          src="${item.image}" 
          alt="${escapeHtml(item.alt || item.name)}" 
          class="restaurant-item-thumb"
          loading="lazy" 
          decoding="async"
          onerror="this.src='https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80'"
        />
        <span class="restaurant-photo-expand-badge" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </span>
      </button>

      <!-- 2. Restaurant Item Details (Scannable, Compact, High Hierarchy) -->
      <div class="restaurant-item-body">
        <div class="restaurant-item-top">
          <h3 class="restaurant-item-title" onclick="openProductSheet('${item.id}');">${escapeHtml(item.name)}</h3>
          <span class="restaurant-item-price">${priceDisplay}</span>
        </div>

        <p class="restaurant-item-desc" onclick="openProductSheet('${item.id}');">${escapeHtml(shortDesc)}</p>

        <div class="restaurant-item-bottom">
          <span class="restaurant-item-unit">${escapeHtml(item.unit || '')}</span>
          <div class="restaurant-item-action" id="action-wrap-${item.id}">
            ${actionControlHtml}
          </div>
        </div>
      </div>
    </article>
  `;
}

// 1-Tap Quick Add with subtle inline micro-confirmation (NO disruptive toasts)
function quickAddMenuItem(itemId, event) {
  if (event) event.stopPropagation();
  const item = SELECT_CATALOG.find(i => i.id === itemId);
  if (!item) return;

  const existingInCart = appState.cart.find(c => c.id === itemId);
  if (existingInCart) {
    existingInCart.quantity += 1;
  } else {
    appState.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      basePrice: item.price,
      quantity: 1,
      image: item.image,
      unit: item.unit || '',
      description: item.description || '',
      isBox: !!item.isBox,
      isProvisional: item.id === 'select-soy-sauce' && !SOY_SAUCE_CONFIG.volumeConfirmed
    });
  }

  // Micro-confirmation: gentle checkmark on button
  if (event && event.currentTarget) {
    const btn = event.currentTarget;
    btn.classList.add('just-added');
    btn.innerHTML = '<span class="just-added-check">✓</span>';
  }

  updateCartUI();
  updateHomeFeedInBagBadges();

  setTimeout(() => {
    renderMenu();
  }, 180);
}

// Maintain backward compatibility for any existing calls
function renderProductCard(item) {
  return renderRestaurantMenuItem(item);
}

// ==========================================
// 5. CARD STEPPER CONTROLS
// ==========================================

function adjustCardQuantity(itemId, delta) {
  modifyCartItemQty(itemId, delta);
}

// Add the selected quantity on the card into the bag
function addCurrentCardToCart(itemId) {
  quickAddMenuItem(itemId);
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

  const headerCartBtn = document.getElementById('open-cart-btn');
  if (headerCartBtn) {
    if (totalItemsCount === 0) {
      headerCartBtn.classList.add('empty');
    } else {
      headerCartBtn.classList.remove('empty');
    }
  }

  // 3. Update Persistent Mobile Bag Bar (Docked contextually above bottom nav)
  const floatingBtn = document.getElementById('floating-cart-btn');
  const floatingBadge = document.getElementById('floating-cart-badge');
  const floatingTotal = document.getElementById('floating-cart-total');
  const floatingItemsLabel = document.getElementById('floating-cart-items-label');

  if (floatingBadge) floatingBadge.textContent = totalItemsCount;
  if (floatingItemsLabel) floatingItemsLabel.textContent = totalItemsCount === 1 ? 'item' : 'items';
  if (floatingTotal) floatingTotal.textContent = `$${subtotal.toFixed(2)}`;
  if (floatingBtn) {
    const isCheckoutOpen = typeof checkoutState !== 'undefined' && checkoutState && checkoutState.isOpen;
    floatingBtn.style.display = (totalItemsCount > 0 && !isCheckoutOpen) ? 'inline-flex' : 'none';
    if (!floatingBtn.getAttribute('data-tab-context')) {
      floatingBtn.setAttribute('data-tab-context', appState.activeTab || 'menu');
    }
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

  // 5. Sync in-bag badges on Home discovery feed cards
  if (typeof updateHomeFeedInBagBadges === 'function') {
    updateHomeFeedInBagBadges();
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

  // Hide persistent bag bar so it doesn't obstruct checkout controls
  const floatingBtn = document.getElementById('floating-cart-btn');
  if (floatingBtn) floatingBtn.style.display = 'none';

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

  // Restore bag bar if items remain
  updateCartUI();

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

    // Persist confirmed order to local order history
    saveConfirmedOrderToHistory(checkoutState.confirmedOrder);

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
window.navigateToTab = navigateToTab;
window.navigateToCategory = navigateToCategory;
window.quickAddItemToBag = quickAddItemToBag;
window.renderOrdersTab = renderOrdersTab;
window.saveConfirmedOrderToHistory = saveConfirmedOrderToHistory;
window.updateNavOrdersBadge = updateNavOrdersBadge;
window.BAMBOO_CONTENT_CATEGORIES = BAMBOO_CONTENT_CATEGORIES;
window.BAMBOO_CONTENT_ITEMS = BAMBOO_CONTENT_ITEMS;
window.getContentItemsByCategory = getContentItemsByCategory;
window.DISCOVERY_NODES = DISCOVERY_NODES;
window.updateHomeGreeting = updateHomeGreeting;
window.renderHomeFeed = renderHomeFeed;
window.toggleNodeLike = toggleNodeLike;
window.getNodeLikesData = getNodeLikesData;
window.getNodeCommentsCount = getNodeCommentsCount;
window.openCommentsSheet = openCommentsSheet;
window.closeCommentsSheet = closeCommentsSheet;
window.renderNodeComments = renderNodeComments;
window.submitDiscoveryComment = submitDiscoveryComment;
window.shareDiscoveryNode = shareDiscoveryNode;
window.handleGalleryScroll = handleGalleryScroll;
window.scrollGalleryToSlide = scrollGalleryToSlide;
window.addNodeProductToBag = addNodeProductToBag;
window.openProductSheet = openProductSheet;
window.closeProductSheet = closeProductSheet;
window.quickAddMenuItem = quickAddMenuItem;
window.renderRestaurantMenuItem = renderRestaurantMenuItem;
window.changeSheetQuantity = changeSheetQuantity;
window.addSheetItemToBag = addSheetItemToBag;
window.toggleNodeDescription = toggleNodeDescription;
window.updateHomeFeedInBagBadges = updateHomeFeedInBagBadges;
window.openPrepareForProduct = openPrepareForProduct;
window.playPrepareVideo = playPrepareVideo;
window.resetPrepareVideo = resetPrepareVideo;
window.togglePrepareVideoFullscreen = togglePrepareVideoFullscreen;
window.togglePrepareVideoSound = togglePrepareVideoSound;
window.openServingContent = openServingContent;
window.togglePrepareServingDesc = togglePrepareServingDesc;
window.openServingSheet = openServingContent;
window.closeServingSheet = closeServingSheet;
window.openEventEnquiry = openEventEnquiry;
window.closeEventSheet = closeEventSheet;


