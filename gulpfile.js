/* ------------------------
 MODULE REGISTRATION
 ------------------------ */
var del = require('del'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify'),
    connect = require('gulp-connect');
/* ------------------------
 VARIABLES
 ------------------------ */
var path = {
  outputDir: './dist/', //output application directory
  sourceDir: './src/', // source directory
  appDir: './src/app/', // application directory
};

var config = {
  mainFile: 'index.ts',
  resultFile: 'application.js'
};

//define typescript project config file
var tsProject = ts.createProject(path.sourceDir + 'tsconfig.json');

/* ------------------------
          TASKS
------------------------ */

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del(path.outputDir + '**/*');
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function() {
  return gulp.src([path.appDir + '**/*', path.sourceDir + 'index.html', path.sourceDir + 'styles.css', '!'+ path.appDir +'**/*.ts'])
    .pipe(gulp.dest('dist'))
});

// define typescript compilation
gulp.task('compile-js', ['clean'] ,function() {
  var bundler = browserify({ basedir: path.appDir})
    .add(config.mainFile)
    .plugin(tsify);

   return bundler
      .bundle()
      .pipe(source(config.resultFile))
      .pipe(gulp.dest('dist'));

/*  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
  return tsResult;*/
});

// define dev file server with LIVERELOAD
gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// define files to watch
gulp.task('watch', function() {
  gulp.watch(path.sourceDir + '*.ts', ['compile-js', 'copy:assets']);
});

gulp.task('default', ['connect', 'watch']);
