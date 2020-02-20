const { initConfig, CONFIG_KEY } = require('./src/config');
const tasks = require('./src/tasks/');

/**
 * Initializes the plugin:
 * - registers tasks for `toMatchSnapshot` and `toMatchImageSnapshot`.
 * - Make config accessible via `Cypress.env`.
 * @param {Function} on - Method to register tasks
 * @param {Object} globalConfig - Object containing global Cypress config
 */
function initPlugin(on, globalConfig = {}) {
  const config = initConfig(globalConfig.env[CONFIG_KEY]);

  // Adding sub objects/keys to `Cypress.env` that don't exist in `cypress.json` doesn't work.
  // That's why the config is stringified and parsed again in `src/utils/commands/getConfig.js#fixConfig`.
  globalConfig.env[CONFIG_KEY] = JSON.stringify(config);

  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.push('--font-render-hinting=medium');
      launchOptions.push('--enable-font-antialiasing');
      launchOptions.push('--disable-gpu');
    }

    return launchOptions;
  });

  on('task', tasks);
}

module.exports = {
  initPlugin,
};
