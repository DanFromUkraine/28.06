const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: [path.resolve(__dirname, "./src/index.js")],
    main: path.resolve(__dirname, "./src/pages/main/main.js"),
    gluing: path.resolve(__dirname, "./src/pages/gluing/gluing.js"),
    detailing: path.resolve(__dirname, "./src/pages/detailing/detailing.js"),
    gallery: path.resolve(__dirname, "./src/pages/gallery/gallery.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.handlebars$/i,
        loader: "handlebars-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.(ico|png|jpeg|webp|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name].[hash:8][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "index",
      filename: "index.html",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "main",
      filename: "main.html",
      template: "./src/pages/main/main.html",
    }),
    new HtmlWebpackPlugin({
      title: "gluing",
      filename: "gluing.html",
      template: "./src/pages/gluing/gluing.html",
    }),
    new HtmlWebpackPlugin({
      title: "detailing",
      filename: "detailing.html",
      template: "./src/pages/detailing/detailing.html",
    }),
    new HtmlWebpackPlugin({
      title: "gallery",
      filename: "gallery.html",
      template: "./src/pages/gallery/gallery.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  devServer: {
    port: 4444,
    open: true,
    historyApiFallback: true,
  },
};