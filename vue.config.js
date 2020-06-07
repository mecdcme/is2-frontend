module.exports = {
  devServer: {
    host: "localhost",
    port: 8070
  },
  configureWebpack: {
    resolve: {
      alias: {
        icons:
          "D:\\development\\is2-frontend\\node_modules\\vue-material-design-icons"
      },
      extensions: [".vue"]
    }
  },
  transpileDependencies: ["vuetify"]
};
