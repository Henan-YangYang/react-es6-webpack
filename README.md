# book_store_app
# 学习react + webpack + es6 + jsx + react-redux
# 为了更好的、更明了的理解项目的构建过程，这里没选择使用create-react-app脚手架来构建项目,所以不建议用来开发项目使用。

搭建框架的步骤及部分详解
    1. npm init
        创建一个npm项目，生产一个package.json文件，包含基本信息，后续的依赖也会保存在这个文件里面

    2. 根目录创建index.html，在body中添加div标签，设置id="APP"
        <div id="APP"></div>

    3. npm install webpack webpack-cli -D
        安装webpack
        -D：表示 "--save-dev",会保存在package.json文件的devDependencies属性中。devDependencies属性中的插件用于开发环境，不需要发布到生产环境的。
        -S：表示"--save",会保存在package.json文件的dependencies属性中。dependencies属性中的插件是需要发布到生产环境的。

    4. 在根目录新建config文件夹，在config中创建并初步配置webpack.config.js
        const webpack = require('webpack');
        const path = require('path');
        module.exports = {
            // 基础路径，绝对路径，用于从配置中解析入口起点和loader
            context: path.resolve(__dirname, '../'),
            // 入口，可以是字符串、对象、数组
            entry: {
                page: './src/main.js'
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
        }

    5. npm install babel-core babel-loader babel-preset-env babel-preset-react css-loader style-loader -D
        babel-core：是调用Babel的API进行转码的包
        babel-loader：是执行转译的核心包
        babel-preset-env：可以格姐配置的目标运行环境自动启用需要的babel插件
        bebel-preset-react：用于转译React的JSX语法
        css-loader：加载.css文件
        style-loader：使用<style>将css-loader内部样式注入到我们的HTML页面

    6. 修改webpack.config.js，配置loader规则
        {
            ...
            // 模块配置
            module: {
                // 模块解析规则配置
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
                    }
                ]
            },
        }

    7. 在根目录新建.babelrc文件并配置
        {
            "presets":["env","react"]
        }

    8. npm install react react-dom -S
        安装react和react-dom

    9. 在根目录新建src文件夹，在src中创建main.js
        import React from 'react';
        import { render } from 'react-dom';

        class App extends React.Component {
            render (){
                return <p> Hello React </p>
            }
        }
        render(<App/>,document.getElementById('APP'));

    10. npm install webpack-dev-server -D
        用来实现浏览器实时更新的插件
    
    11. 修改webpack.config.js文件，添加devServer配置
        {
            ...
            devServer: {
                host:'localhost',
                port: 4000,
                // 当前服务读取文件的目录
                contentBase: path.resolve(__dirname, '../dist')
            }
        }
    
    12. 修改package.json文件，配置dev命令，配置后执行npm run dev会直接找到webpack.config.js来启动项目
        {
            ...
            "scripts": {
                "dev": "webpack-dev-server --open --progress --watch --mode=development --config config/webpack.config.js",
                "build": "webpack -p --progress  --mode=production --hide-modules --config config/webpack.config.js",
                "test": "echo \"Error: no test specified\" && exit 1"
            }
        }

    13. npm install html-webpack-plugin clean-webpack-plugin -D
        html-webpack-plugin：用于简化创建HTML文件的插件，会自动在body最底部用script标签来引入我们编译后的JS文件。   
        clean-webpack-plugin：在生产环境中编译文件时，先删除之前编译的文件然后生成新的文件。 

    14. 修改webpack.config.js文件，添加plugins配置
        {
            const { CleanWebpackPlugin } = require("clean-webpack-plugin");
            const HtmlWebpackPlugin = require("html-webpack-plugin");
            ...
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

至此项目构建基本完毕。

    15. npm install react-redux -S
        安装react-redux状态管理工具
    
    16. npm install sass-loader node-sass -D
        安装sass插件