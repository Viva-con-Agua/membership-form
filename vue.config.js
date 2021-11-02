const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        //    plugins: [
        //      new CopyWebpackPlugin([
        //        {
        //          context: 'node_modules/@webcomponents/webcomponentsjs',
        //          from: '**/*.js',
        //          to: 'dist/donation-form.js'
        //        }
        //      ])
        //    ]
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_CONTEXT
    : '/',
    devServer: {
        public: 'spenden.localhost',
        disableHostCheck: true
    },
    css: {
        extract: false,
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/styles/main.scss";`,
            },
        },
    },
}



