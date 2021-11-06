const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cssRegex = /\.css$/
const sassRegex = /\.(scss|sass)$/
const postcssConfigPath = "postcss.config.js"
const fontsRegex = /\.(woff(2)?|eot|ttf|otf|svg|)$/;
const imageRegex = /\.(?:ico|gif|png|jpg|jpeg)$/i
const tsRegex = /\.tsx?$/

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'images/[name][ext]',
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: imageRegex,
        type: 'asset/resource',
      },
      {
        test: tsRegex,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: fontsRegex,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]'
        },

      },
      {
        test: sassRegex,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              modules :true,
              sourceMap: true
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              postcssOptions: {
                config: path.resolve(postcssConfigPath),
                //modules:true,
              },
              sourceMap: true,
              // importLoaders:1,
              // modules:true,
            }

          },
          {
            loader: require.resolve("sass-loader")
          }
        ],
      },
      {
        test: cssRegex,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders:1,
              modules:true,
              sourceMap: true,
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              postcssOptions: {
                config: path.resolve(postcssConfigPath),
                //modules:true,
              },
              sourceMap: true,
              // importLoaders:1,
              // modules:true,
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".woff", ".jpg"]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  }
}