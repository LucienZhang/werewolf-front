const plugins = [["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" }]];
if (process.env.NODE_ENV === "production") {
  plugins.push(["transform-remove-console", { exclude: ["error", "warn"] }]);
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
