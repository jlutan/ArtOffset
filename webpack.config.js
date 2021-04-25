const path = require('path');

var config = {
  mode: "development",
  devtool: "inline-source-map",
  context: path.resolve(__dirname),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
}

// copies 'config' and new object to empty object
var scriptConfig = Object.assign({}, config, {
  entry: {
    content: './src/app/content.ts',
    popup: './src/ui/popup.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].js'
  }
});

var backgroundConfig = Object.assign({}, config, {
  entry: {
    background: './src/app/background.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'background.js'
  }
})

module.exports = [
  scriptConfig, backgroundConfig
]
