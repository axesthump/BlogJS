const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    //Указываем стартовый файл и место, куда будем сохранять обработанный js
    // Бабел полифил тоже должен быть в продакшене, поэтому его тоже добавляем
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    //Настраиваем DEV сервер, указываем ему путь
    devServer: {
        contentBase: __dirname + 'dist'
    },
    //Подключаем плагины
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCss({
            filename: 'styles.css'
        })
    ],
    //Когда буду делать прод версию, минифицируем JS и CSS
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    //Чтобы не писать каждый раз .js
    resolve: {
        extensions: ['.js']
    },
    //Правила обработки
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCss.loader, 'css-loader']
            }
        ]
    }

}