const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3001/", // Unique port for remote1
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Include both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // CSS files
        use: ["style-loader", "css-loader"], // Process CSS
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Handle image and SVG files
        type: "asset/resource", // Use Webpack 5's asset modules
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote1", // Unique name for this remote
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        "./Page": "./src/Remote1Page",
      },
      // shared: {
      //   react: {
      //     singleton: true,
      //     eager: false, // Ensure lazy loading
      //     requiredVersion: "^17.0.0", // Adjust to your React version
      //   },
      //   "react-dom": {
      //     singleton: true,
      //     eager: false, // Ensure lazy loading
      //     requiredVersion: "^17.0.0", // Adjust to your React DOM version
      //   },
      // },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
