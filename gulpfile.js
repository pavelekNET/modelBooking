// modules
var gulp = require('gulp'),
    ts = require("gulp-typescript");

//define typescript project config file
var tsProject = ts.createProject("src/tsconfig.json");

// define typescript compilation
gulp.task('typescriptCompilation', function() {
  var tsResult = tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));

  return tsResult;
});

// define files to watch
gulp.task('watch', ['typescriptCompilation'], function() {
  gulp.watch('src/*.ts', ['typescriptCompilation']);
});
