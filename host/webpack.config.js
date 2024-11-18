const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3000/",
  },
  devServer: {
    port: 3000,
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
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve .jsx files
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote1: "remote1@http://localhost:3001/remoteEntry.js",
        remote2: "remote2@http://localhost:3002/remoteEntry.js",
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
