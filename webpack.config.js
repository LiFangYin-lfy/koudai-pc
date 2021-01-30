module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  },
  rules:[{
    test: /\.css$/,
    use: ['style-loader', 'css-loader', {
      loader: "postcss-loader",
      options: {  
        plugins: [
          require("autoprefixer")({
            browsers: [
              'ie >= 8',
              'Firefox >= 20',
              'Safari >= 5',
              'Android >= 4',
              'Ios >= 6',
              'last 4 version'
            ]
          })
        ]
      }
    }]
  }]
};
