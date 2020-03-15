module.exports = {
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store;
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        './src/assets/styles/colors.scss',
                    ],
                })
                .end()
        })
    },
    devServer: {
        proxy: 'http://localhost:1337'
    }
};
