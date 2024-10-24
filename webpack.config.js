const path = require('path');

module.exports = {
  // Entry point for your application (adjust the path based on your setup)
  entry: './src/index.js',

  // Output configuration for the bundled code
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Adjust if needed
  },

  // Add polyfills for Node.js modules used in the browser
  resolve: {
    fallback: {
      "https": require.resolve("https-browserify"), // Adding https polyfill
      "http": require.resolve("stream-http"),      // Optional: adding http polyfill if needed
      "stream": require.resolve("stream-browserify"), // Optional: adding stream polyfill if needed
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Rule for JavaScript files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel to transpile modern JavaScript
        },
      },
      // Add more loaders if needed (CSS, images, etc.)
    ],
  },

  // Devtool for source map, useful in development
  devtool: 'source-map',
};
