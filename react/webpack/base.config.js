const path = require('path')
const constants = require('./constants')

const buildType = process.env.BUILD_TYPE ? process.env.BUILD_TYPE : constants.modes.dev

module.exports = {
	mode: constants.builds[buildType],
	entry: path.join(__dirname, '../src/index.jsx'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: "/",
		filename: 'js/[name]-[hash:3].js',
		clean: true,
		assetModuleFilename: 'assets/[name]-[hash:3][ext]'
	},

	devServer: {
		port: 3000,
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},		
		hot: true,
		historyApiFallback: {
			disableDotRule: true,
		  },
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', ".tsx"],
		fallback: {
			assert: require.resolve('assert'),
            buffer: require.resolve('buffer'),
            console: require.resolve('console-browserify'),
            constants: require.resolve('constants-browserify'),
            crypto: require.resolve('crypto-browserify'),
            domain: require.resolve('domain-browser'),
            events: require.resolve('events'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            punycode: require.resolve('punycode'),
            process: require.resolve('process/browser'),
            querystring: require.resolve('querystring-es3'),
            stream: require.resolve('stream-browserify'),
            string_decoder: require.resolve('string_decoder'),
            sys: require.resolve('util'),
            timers: require.resolve('timers-browserify'),
            tty: require.resolve('tty-browserify'),
            url: require.resolve('url'),
            util: require.resolve('util'),
            vm: require.resolve('vm-browserify'),
            zlib: require.resolve('browserify-zlib'),
			"fs": false,			
			// stream: require.resolve('stream-browserify'),
			// "crypto": false,
			// "buffer": require.resolve("buffer")
		} 
	},
}