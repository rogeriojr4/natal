const [server, client] = require('nullstack/webpack.config')

function customClient(...args) {
  const config = client(...args)
  const rule = config.module.rules.find((rule) => rule.test.test('.css'))
  rule.use.push({
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
        },
      },
    },
  })
  // console.log(config.module.rules)
  // config.module.rules.push([
  //   {
  //     test: /\.js$/,
  //     exclude: /node_modules/,
  //     loader: 'babel-loader',
  //   },
  // ])
  return config
}

module.exports = [server, customClient]
