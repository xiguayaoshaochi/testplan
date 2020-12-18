const path = require('path');
//启动热更新的第二步
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//导入html-webpack-plugins
// 只要是插件，都一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 这个配置文件，其实就是一个JS文件，通过Node中的模块操作，向外暴露了一个配置对象
const pages =['index','register']
//入口
let entry = {};
//插件
let plugins = [];

const init = () => {
  pages.map(name => {
    plugins.push(
      new htmlWebpackPlugin({
        minify: false, //是否压缩
        title: name,  //页面标题
        template: path.join(__dirname, `/src/${name}.html`), //模板文件
        filename: path.join(__dirname, `/dist/${name}.html`), //输出文件名
        inject: 'body',//脚本放置页面位置
        chunks: [name],
        hash: false
      })
    );
    entry[name] = `./src/js/${name}.js`
  });
}

init();

module.exports = {
  entry: entry, // 入口起点，可以指定多个入口起点，表示要使用webpack打包哪个文件
  output: { // 输出，只可指定一个输出配置
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
    // __dirname表示本地路径
  },
  // devtool: 'inline-source-map',
  devServer:{//这是配置dev-server参数的第二种形式，第一种形式在package.json
    open:true,//自动打开浏览器
    port:8081,//浏览器端口
    contentBase:"src",//指定托管的根目录，比如index在src"中，不在根目录里面，就需要设置此项
    hot:true//启动热更新的第一步
  },
  plugins: plugins,
  optimization: { //与entry同级
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       compress: false,
    //       mangle: true,
    //       output: {
    //         comments: false,
    //       },
    //     },
    //     sourceMap: false,
    //   })
    // ]
  },
  module:{//这个节点用于配置所有的第三方模块加载器
    rules:[
      // 配置处理.css文件的第三方loader规则
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {
        test:/\.(jpg|png|gif|bmp|jpeg|svg|woff|woff2|eot|ttf|otf|mp3)/,
        // use:'url-loader?limit=7550&name=[hash:8]-[name].[ext]'
        use: 'url-loader?esModule=false'
        // limit给定的文件大小最小值，是文件资源的大小，单位是byte，如果引用的文件大小或等于给定的limit值
        // 则不会转为base64格式,
        // 注意连接字符为&不是$
      },
      {test:/\.js$/,use:'babel-loader',exclude:/node_module/}
      // exclude的作用是排除node_modules中的JS文件，不然会一起打包编译，非常消耗CPU，而且最终也无法运行



      //webpack处理第三方文件类型的过程：
      // 1.发现这个要处理的文件不是JS文件，然后就去配置文件中，查找有没有对应的第三方loader规则
      // 2.如果能找到对应的规则，就会调用对应的loader去处理这种文件类型
      // 3.在调用loader的时候，是从后往前调用的
      // 4.当最后的一个loader调用完毕，会把处理的结果，直接交给webpack打包合并，最终输出到output规定的目录文件中去
    ]
  },
  resolve: {
    alias: {
        'vue': 'vue/dist/vue.js'
    }//如果不增加这一步，会报错。具体原因还不太理解，但目前问题已经解决。参考http://www.imooc.com/article/17868
  }
};

// 重新安装一次，如果还是不可以的话，在把之前装的都清空

// rm -rf node_modules
// rm package-lock.json
// npm cache clear --force
// npm install

// 管理员身份打开cmd

// 输入命令

// npm install - g node - gyp

// 备注：这个是node 的Python的编译；

// npm install--global--production windows - build - tools

// 这个就是添加windows 下的编译环境
