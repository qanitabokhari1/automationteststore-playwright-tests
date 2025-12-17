/**
 * Centralized selector constants
 * Organize selectors by page/component for better maintainability
 */

const SELECTORS = {
  // Common/Shared selectors
  MAIN_CONTAINER: '#maincontainer',
  CART_CHECKOUT: '#cart_checkout1',
  LOGIN_FORM: '#loginFrm',
  
  // Navigation
  HOME_LINK: '//*[@id="categorymenu"]/nav/ul/li[1]',
  APPAREL_SECTION: '//*[@id="categorymenu"]/nav/ul/li[2]',
  TSHIRTS_LINK: '//*[@id="categorymenu"]/nav/ul/li[2]/div/ul[1]/li[2]',
  SHOES_LINK: '//*[@id="categorymenu"]/nav/ul/li[2]/div/ul[1]/li[1]',
  MEN_SECTION: '//*[@id="categorymenu"]/nav/ul/li[6]',
  
  // Brand carousel
  BRAND_CAROUSEL: '//*[@id="brandcarousal"]',
  DOVE_BRAND: '//*[@id="brandcarousal"]/li[7]',
  
  // Product page
  SORT_DROPDOWN: '//*[@id="sort"]',
  ADD_TO_CART_BUTTON: '//a[contains(@class,"cart") or contains(text(),"Cart")]',
  PRODUCT_QUANTITY: '//*[@id="product_quantity"]',
  
  // Cart page
  CART_TABLE: '//table[@class="table table-striped table-bordered"]',
  CART_ITEM_QUANTITY: '//*[@id="product_quantity"]',
  CART_PRICE: '//td[contains(@class,"price")]',
  SHOPPING_CART_HEADER: '//h1[contains(text(),"Shopping Cart")]',
  
  // Login page
  USERNAME_FIELD: '#loginFrm_loginname',
  PASSWORD_FIELD: '#loginFrm_password',
  LOGIN_BUTTON: 'button[type="submit"]',
  WELCOME_MESSAGE: '//a[contains(text(),"Welcome back")]',
  
  // Success messages
  SUCCESS_ALERT: '//div[contains(@class,"alert") and contains(text(),"success")]',
};

/**
 * CSS Selectors for Scenario 2 (as per requirements)
 * These are CSS alternatives to the XPath selectors above
 */
const CSS_SELECTORS = {
  // Navigation (CSS versions)
  HOME_LINK_CSS: '#categorymenu nav ul li:first-child',
  APPAREL_SECTION_CSS: '#categorymenu nav ul li:nth-child(2)',
  TSHIRTS_LINK_CSS: '#categorymenu nav ul li:nth-child(2) div ul li:nth-child(2)',
  SHOES_LINK_CSS: '#categorymenu nav ul li:nth-child(2) div ul li:first-child',
  
  // Product page (CSS versions)
  SORT_DROPDOWN_CSS: '#sort',
  ADD_TO_CART_BUTTON_CSS: 'a.cart, a[class*="cart"]',
  PRODUCT_QUANTITY_CSS: '#product_quantity',
  
  // Cart page (CSS versions)
  CART_TABLE_CSS: 'table.table-striped.table-bordered',
  CART_ITEM_QUANTITY_CSS: '#product_quantity',
  CART_PRICE_CSS: 'td.price, td[class*="price"]',
};

module.exports = {
  SELECTORS,
  CSS_SELECTORS,
};
