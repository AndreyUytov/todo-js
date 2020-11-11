const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env) => {
  const isProduction = env.production === true

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      index: './src/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: './',
      filename: isProduction ? 'js/[name][hash].js' : 'js/[name].js',
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    devtool: isProduction ? '' : 'source-map',

    devServer: {
      publicPath: '/',
      openPage: 'index.html',
      // hot: !isProduction
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[hash].css' : 'index.css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/images/icons',
            to: './',
          },
        ],
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: `index.html`,
        inject: true,
        template: path.resolve(__dirname, 'src/pages/index.html'),
      }),
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  '@babel/plugin-transform-runtime',
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProduction,
                reloadAll: true,
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    (() => {
                      if (isProduction) {
                        return autoprefixer(), cssnano()
                      } else return autoprefixer()
                    })(),
                  ],
                },
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, // always true for work resolve-url-loader!!!
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|svg|webp)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: () => {
                  if (isProduction) {
                    return '[contenthash].[ext]'
                  } else return '[name].[ext]'
                },
                outputPath: (url, resourcePath) => {
                  if (/svg/.test(resourcePath)) {
                    return `img/svg/${url}`
                  }
                  if (/images/.test(resourcePath)) {
                    return `img/${url}`
                  }
                  if (/fonts/.test(resourcePath)) {
                    return `fonts/${url}`
                  }
                },
              },
            },
          ],
        },
        {
          test: /\.html$/i,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
      ],
    },
  }
}
