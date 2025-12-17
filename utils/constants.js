/**
 * Common constants and selectors
 * Centralized location for reusable selectors and constants
 */

const TIMEOUTS = {
  ELEMENT_VISIBLE: 10000,
  PAGE_LOAD: 15000,
  ACTION: 15000,
  NAVIGATION: 20000,
};

const SELECTORS = {
  // Common selectors (add as needed)
  MAIN_CONTAINER: '#maincontainer',
  CART_CHECKOUT: '#cart_checkout1',
  LOGIN_FORM: '#loginFrm',
};

module.exports = {
  TIMEOUTS,
  SELECTORS,
};
