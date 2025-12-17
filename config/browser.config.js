/**
 * Browser configuration and selection logic
 * Supports config-driven browser selection for cross-browser testing
 */

/**
 * Get browser configuration based on environment variable
 * Supports: 'chromium', 'firefox', 'webkit', 'all', or comma-separated list
 */
function getBrowserConfig() {
  const browserEnv = process.env.BROWSER || 'chromium';
  
  const allBrowsers = ['chromium', 'firefox', 'webkit'];
  
  // Handle 'all' case
  if (browserEnv.toLowerCase() === 'all') {
    return {
      enabledBrowsers: allBrowsers,
      defaultBrowser: 'chromium',
    };
  }
  
  // Handle comma-separated list (e.g., "chromium,firefox")
  const requestedBrowsers = browserEnv
    .split(',')
    .map(b => b.trim().toLowerCase())
    .filter(b => allBrowsers.includes(b));
  
  // If no valid browsers found, default to chromium
  if (requestedBrowsers.length === 0) {
    return {
      enabledBrowsers: ['chromium'],
      defaultBrowser: 'chromium',
    };
  }
  
  return {
    enabledBrowsers: requestedBrowsers,
    defaultBrowser: requestedBrowsers[0],
  };
}

/**
 * Get browser-specific launch options
 */
function getBrowserLaunchOptions(browser) {
  const commonOptions = {
    args: ['--disable-web-security'],
  };
  
  switch (browser) {
    case 'chromium':
      return {
        ...commonOptions,
        args: [
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
        ],
      };
    case 'firefox':
      return {
        ...commonOptions,
      };
    case 'webkit':
      return {
        ...commonOptions,
      };
    default:
      return commonOptions;
  }
}

module.exports = {
  getBrowserConfig,
  getBrowserLaunchOptions,
};
