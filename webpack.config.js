const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    home: [
      `${__dirname}/app/index.js`
    ],
    style: [
      `${__dirname}/app/partials/main.scss`
    ]
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/build`
  },
  plugins: [
    new HTMLPlugin({
      inject: true,
      filename: 'index.html',
      template: `${__dirname}/app/index.html`,
      chunks: ['home', 'style']
    }),
    new CopyPlugin([
      { from: `${__dirname}/app/favicon.ico`, to: `${__dirname}/build/favicon.ico` },
      { from: `${__dirname}/app/robots.txt`, to: `${__dirname}/build/robots.txt` },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true
          },
        }]
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
    ],
  },
};
