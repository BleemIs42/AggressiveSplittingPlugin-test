const { join } = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const assetsPath = (...relativePath) => join(__dirname, '..', ...relativePath)

module.exports = {
	// cache: true, // better performance for the AggressiveSplittingPlugin
	entry: {
        vendor: ['react', 'react-dom'],
        index: [assetsPath(`src/entry.js`)],
    } ,
	output: {
		path: assetsPath("dist"),
		filename: "js/[name].[chunkhash:5].js",
		chunkFilename: "js/[name].[chunkhash:5].js"
	},
	plugins: [
        new HtmlWebpackPlugin({
          minify: {
            html5: false
          },
          chunks: ['vendor', 'index'],
          filename: `index.html`,
          template: assetsPath('src/index.html')
        }),
		new webpack.optimize.AggressiveSplittingPlugin({
			minSize: 200000,
			maxSize: 500000
		}),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: (module, count) => {
            let res = module.resource
            return res && /\.js$/.test(res) && (~res.indexOf(assetsPath('node_modules')))
          }
        }),
	],
	recordsOutputPath: assetsPath("dist/records.json")
};
