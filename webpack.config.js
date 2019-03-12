var path = require("path");

module.exports = {
  entry: "./src/app.ts",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        loader: "babel-loader",
        test: /\.js?x$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ["style-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    port: 8020,
    publicPath: "/",
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    open: true
  }
};
