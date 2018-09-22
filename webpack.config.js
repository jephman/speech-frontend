const path = require("path")
const fs = require('fs')
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development'
const PRODUCTION = process.env.NODE_ENV === 'production'
const buildDir = path.join(__dirname, 'dist/');

let entry = PRODUCTION
  ? {
    app: ['./src/index.js'],
    vendor: [
      "angular",
      "angular-animate",
      "angular-aria",
      "angular-loading-bar",
      "angular-messages",
      "angular-sanitize",
      "angular-spinners",
      "angular-ui-router",
      "angular-ui-router.statehelper",
      "angular-material",
      "./node_modules/angular-loading-bar/src/loading-bar.css",
      "./node_modules/angular-material/angular-material.css",
      "./node_modules/angular-material-data-table/dist/md-data-table.css",
      "lodash",
      "moment",
      "moment-timezone",
      "angular-material-data-table"
    ]
  }
  : [
    // "./src/index.js",
    "webpack-dev-server/client?http://localhost:8081",
    "webpack/hot/dev-server",
    path.join(__dirname, 'src/index.js')
  ];

let plugins = PRODUCTION
  ? [
      new HardSourceWebpackPlugin({
        cacheDirectory: path.join(__dirname, 'node_modules/.cache/hardsource/[confighash]'),
        recordsPath: path.join(__dirname, 'node_modules/.cache/hardsource/[confighash]/records.json'),
        configHash: function(webpackConfig) {
          return require('node-object-hash')().hash(webpackConfig);
        },
        environmentHash: {
          root: process.cwd(),
          directories: ['node_modules'],
          files: ['package-lock.json']
        }
      }),
      new WebpackOnBuildPlugin(function(stats) {
        const newlyCreatedAssets = stats.compilation.assets;
  
        const unlinked = [];
        fs.readdir(path.resolve(buildDir), (err, files) => {
          files.forEach(file => {
            if (!newlyCreatedAssets[file]) {
              if(!file.includes('report')){
                fs.unlinkSync(path.resolve(buildDir + file));
              }
              unlinked.push(file);
            }
          });
          if (unlinked.length > 0) {
            console.log('Removed old assets: ', unlinked);
          }
        });
      }),

      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new ExtractTextPlugin('[name].[contenthash:10].min.css'),
      new HTMLWebpackPlugin({
        template: './index.template.html',
        inject: true,
        filename: 'index.html'
      }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0
      }),
      new HtmlWebpackInlineSVGPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.NormalModuleReplacementPlugin(
        /moment-timezone\/data\/packed\/latest\.json/,
        require.resolve('./misc/timezone-definitions')
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['app'],
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['bootstrap'],
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
      }),

    ]
  : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackInlineSVGPlugin(),
      new HardSourceWebpackPlugin({
        cacheDirectory: path.join(__dirname, 'node_modules/.cache/hardsource/[confighash]'),
        recordsPath: path.join(__dirname, 'node_modules/.cache/hardsource/[confighash]/records.json'),
        configHash: function(webpackConfig) {
          return require('node-object-hash')().hash(webpackConfig);
        },
        environmentHash: {
          root: process.cwd(),
          directories: ['node_modules'],
          files: ['package-lock.json']
        }
      }),
      // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static'
      // })
    ];

plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION),
    '__BRANCH': JSON.stringify(require("./package.json").version),
    '__DATE': JSON.stringify(require("./package.json").description)
  })
)

const cssIdentifier = PRODUCTION ? '[chunkhash]' : '[path][name]---[local]';
const cssLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
      use: {
        loader: 'css-loader?localIdentName=' + cssIdentifier,
        options: { minimize: true }
      }
    })
  : ['style-loader', 'css-loader?localIdentName='+ cssIdentifier];

module.exports = {
  externals: {
  // 'jquery': 'jQuery' //jquery is external and available at the
  //global variable jQuery
  },
  // devtool: 'source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/': '/dist/',
    filename: PRODUCTION ? '[name].[chunkhash].min.js' : 'bundle.js',
  },
  plugins: plugins,

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: cssLoader,
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      },
      {
        test: /\.html$/, // Only .html files
        include: [
          path.resolve(__dirname, "src")
        ],
        use: ['ngtemplate-loader','html-loader'] // Run html loader
      },
      {
        include: /\.json$/,
        use: ['json-loader']
      }
    ]
  }
}
