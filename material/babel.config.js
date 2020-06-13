module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vxe-table',
      style: true
    }],
    ['component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }]
  ]
}
