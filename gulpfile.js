var gulp = require("gulp");
var postcss = require("gulp-postcss");
var postcssCustomProperties = require("postcss-custom-properties");
gulp.task("css", async () => {
  gulp.src("./src/assets/styles/variable.css").pipe(
    postcss([
      postcssCustomProperties({
        preserve: false,
        importFrom: ["./config.json"],
        exportTo: "./src/assets/styles/variable.css",
      }),
    ])
  );
});
