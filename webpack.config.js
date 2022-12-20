const [server, client] = require("nullstack/webpack.config");
const path = require('path')

function customClient(...args) {
  const config = client(...args);
  const rule = config.module.rules.find((rule) => rule.test.test(".css"));
  rule.use.push({
    loader: require.resolve("postcss-loader"),
    options: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
        },
      },
    },
  });
  config.module.rules.push({
    test: /schema\.prisma/,
    type: 'asset/resource',
  });
  return config;
}

module.exports = [server, customClient];
