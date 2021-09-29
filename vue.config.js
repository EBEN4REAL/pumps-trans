module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          return {
              transformAssetUrls: {
                  video: ['src', 'poster'],
                  source: 'src',
                  img: 'src',
                  image: 'xlink:href',
                  'b-avatar': 'src',
                  'b-img': 'src',
                  'b-img-lazy': ['src', 'blank-src'],
                  'b-card': 'img-src',
                  'b-card-img': 'src',
                  'b-card-img-lazy': ['src', 'blank-src'],
                  'b-carousel-slide': 'img-src',
                  'b-embed': 'src'
              }
          }
        })
  },
  "configureWebpack": {
    "resolve": {
      "alias": {
        "vue$": "vue/dist/vue.esm.js"
      }
    }
  }
}
// if (process.env.NODE_ENV === 'production') {
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin(),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//       minChunks: function (module) {
//         return module.context && module.context.indexOf('node_modules') !== -1;
//       }
//     }),
//     new HtmlWebpackPlugin({
//       filename: 'index.html',
//       template: 'index.html',
//       inject: true,
//       chunksSortMode: 'dependency'
//     }),
//   ])
// }