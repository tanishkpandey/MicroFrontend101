const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3002/", // Unique port for remote2
  },
  devServer: {
    port: 3002, // Unique port for remote2
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
      name: "remote2", // Unique name for this remote
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/Widget", // Exposing a different module/component
        "./Page": "./src/Remote2Page",
      },
      shared: {
        react: {
          singleton: true,
          eager: true, // Ensure lazy loading
          requiredVersion: "18.3.1", // Adjust to your React version
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "18.3.1",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
