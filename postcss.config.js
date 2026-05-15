module.exports = {
  plugins: [
    require('postcss-px-to-viewport-8-plugin')({
      viewportWidth: 375,   // 你的设计稿宽度，按实际填（如750）
      unitToConvert: 'px',  // 需要转换的单位，默认就是px
      viewportUnit: 'vw',   // 转成什么视口单位
      unitPrecision: 5,     // 保留小数位数
      // 建议设置最小转换值，避免 1px 边框被转成很小的 vw
      minPixelValue: 1,
      // 排除某些属性不转换，比如不想转换字体
      // propList: ['*', '!font-size'],
      // 媒体查询里的 px 默认不转换，如果需要可开启
      // mediaQuery: false,
    }),
  ],
};