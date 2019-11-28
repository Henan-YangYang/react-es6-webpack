const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 基础路径，绝对路径，用于从配置中解析入口起点和loader
    context: path.resolve(__dirname, '../'),
    // 入口，可以是字符串、对象、数组
    entry: {
        page: path.resolve(__dirname, '../src/main.js')
    },
    // 输出解析文件
    output: {
        // 所有输出文件的目录路径，必须是绝对路径
        path: path.resolve(__dirname, '../dist'),
        // 入口的文件名模板，对于入口的数据类型分别为：
        // filename:'main.js', 或
        filename: '[name].js',
    },
    // resolve解析
    resolve: {
        // 使用的扩展名
        extensions: ['.js', '.jsx', '.css', '.json'],
        // 模块别名
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    // 模块配置
    module: {
        // 模块规则配置
        rules: [
            {
                test: /\.(js|jsx)$/,
                // 不匹配的选项
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loaders:['style-loader','css-loader','sass-loader']
            }

        ]
    },
    devServer: {
        host: 'localhost',
        port: '3000',
        contentBase: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            inject: true,
            sourceMap: true,
            chunksSortMode: "dependency"
        }),
        new CleanWebpackPlugin()
    ]
}