// craco 配置文件
const path = require("path");
const px2viewport = require("postcss-px-to-viewport-8-plugin");

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@sass": path.resolve(__dirname, "src/assets/styles"),
    },
    // 直接修改 webpack 配置
    configure: (webpackConfig) => {
      // 查找所有 postcss-loader
      const rules = webpackConfig.module.rules;
      
      // 递归查找 postcss-loader 并添加 px2viewport 插件
      const findAndModifyPostcssLoader = (loaders) => {
        if (!loaders) return;
        
        for (const loader of loaders) {
          if (typeof loader === 'object' && loader !== null) {
            // 检查是否是 postcss-loader
            if (loader.loader && loader.loader.includes('postcss-loader')) {
              const originalOptions = loader.options;
              
              // 修改 postcssOptions 中的 plugins
              if (originalOptions && originalOptions.postcssOptions) {
                const originalPlugins = originalOptions.postcssOptions.plugins;
                
                loader.options = {
                  ...originalOptions,
                  postcssOptions: {
                    ...originalOptions.postcssOptions,
                    plugins: typeof originalPlugins === 'function'
                      ? (...args) => {
                          const plugins = originalPlugins(...args);
                          // 添加 px2viewport 插件（排除 node_modules）
                          plugins.push(px2viewport({
                            viewportWidth: 375,
                            unitPrecision: 5,
                            viewportUnit: "vw",
                            fontViewportUnit: "vw",
                            selectorBlackList: [],
                            minPixelValue: 1,
                            mediaQuery: false,
                            exclude: [/node_modules/],
                            include: [/src/],
                            landscape: false,
                          }));
                          return plugins;
                        }
                      : [
                          ...(Array.isArray(originalPlugins) ? originalPlugins : []),
                          px2viewport({
                            viewportWidth: 375,
                            unitPrecision: 5,
                            viewportUnit: "vw",
                            fontViewportUnit: "vw",
                            selectorBlackList: [],
                            minPixelValue: 1,
                            mediaQuery: false,
                            exclude: [/node_modules/],
                            include: [/src/],
                            landscape: false,
                          }),
                        ],
                  },
                };
              }
            }
            
            // 递归处理 oneOf 规则
            if (loader.oneOf) {
              for (const rule of loader.oneOf) {
                if (rule.use) {
                  findAndModifyPostcssLoader(rule.use);
                }
              }
            }
            
            // 递归处理 use 数组
            if (loader.use) {
              findAndModifyPostcssLoader(loader.use);
            }
          }
        }
      };
      
      // 遍历所有规则
      for (const rule of rules) {
        if (rule.oneOf) {
          for (const subRule of rule.oneOf) {
            if (subRule.use) {
              findAndModifyPostcssLoader(subRule.use);
            }
          }
        }
        if (rule.use) {
          findAndModifyPostcssLoader(rule.use);
        }
      }
      
      return webpackConfig;
    },
  },
};
