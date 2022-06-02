const webpack = require('webpack');
const {uglifyJsMinify} = require("terser-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    webpack: function override(config, _) {
        console.log("API URL: " + process.env.API_URL);
        for (let i = 0; i < config.plugins.length; i++) {
            const plugin = config.plugins[i];
            if (plugin instanceof webpack.DefinePlugin) {
                config.plugins[i] = new webpack.DefinePlugin({
                    'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:4000/api/')
                });
            }
        }
        if (!process.env.API_URL) {
            return config;
        }

        return {
            ...config,
            plugins: [
                ...config.plugins,
            ],
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        parallel: true,
                        extractComments: true,
                    }),
                ],
            },
        }
    }
}
