1、全局安装
npm intsall webpack -g
2、打包命令
webpack 要打包的文件名   打包后的文件名
3、打包css文件 需要安装 css-loader 和 style-loader
npm install css-loader style-loader -g

require('style-loader!css-loader!./style.css')