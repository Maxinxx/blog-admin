/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1689483174074_5139';

  // add your middleware config here
  config.middleware = ['user', 'error', 'cors'];

  // add your user config here
  const userConfig = {
    security: {
      csrf: {
        enable: false,
      },
    },
    mongoose: {
      client: {
        url: 'mongodb+srv://onechunlin1:admin@cluster0.fayspua.mongodb.net/blog',
        options: {},
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
