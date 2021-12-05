module.exports = {
    mount: {
        public: "/",
        src: "/dist",
    },
    plugins: ["@snowpack/plugin-babel", "@snowpack/plugin-react-refresh", "@snowpack/plugin-dotenv"],
}
