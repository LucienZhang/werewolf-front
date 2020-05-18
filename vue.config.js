module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "狼人杀";
      return args;
    });
  },
  publicPath: process.env.BASE_URL,
};
