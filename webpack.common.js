const TerserPlugin = require("terser-webpack-plugin")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")

module.exports = (env) => {
    console.log("Environment variables", env)

    return {
        mode: "production",
        entry: { test: __dirname + "/src/index.jsx" },
        output: {
            path: __dirname + "/dist/",
            filename: "index.js",
            publicPath: path.resolve("public"),
        },
        optimization: {
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin({})],
        },
        module: {
            rules: [
                {
                    test: [/\.js$/, /\.jsx$/],
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.css$/,
                    use: [
                        // MiniCssExtractPlugin.loader,
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: { url: false }, //Damit alle Image URLs auf ihrem public Pfad bleiben(so wie es im code angegeben wird)
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".json", ".wasm"],
        },
        plugins: [new CleanWebpackPlugin()], //new MiniCssExtractPlugin()
    }
}
