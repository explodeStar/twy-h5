// 覆盖react配置

const { override, addWebpackAlias, addPostcssPlugins } = require("customize-cra");
const path = require("path");
const px2viewport = require("postcss-px-to-viewport-8-plugin");

const webpackAlias = addWebpackAlias({
  "@": path.resolve(__dirname, "src"),
  "@sass": path.resolve(__dirname, "src/assets/styles"),
});

const addPx2Viewport = addPostcssPlugins([
    px2viewport({
      viewportWidth: 375,  // 改成你的设计稿宽度
      unitPrecision: 5,
      // 其他配置...
    }),
  ])

 
module.exports = override(webpackAlias, addPx2Viewport);