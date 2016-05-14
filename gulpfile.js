var
gulp            = require('gulp'),
sass            = require('gulp-sass'),
shell           = require('gulp-shell'),
data            = require('gulp-data'),
nunjucksRender  = require('gulp-nunjucks-render'),
browserSync     = require('browser-sync'),
file            = require('gulp-file'),
plumber         = require('gulp-plumber'),
packagejson     = require('./package.json');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'public' // This is the DIST folder browsersync will serve
    },
    open: false
  })
})

gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.scss') // Gets all files ending with .scss in source/sass
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('img', function() {
  return gulp.src('source/img/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('public/img'))
  .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('source/templates/**/*')
  .pipe(gulp.dest('public'))
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(['source/js/**/*'])
  .pipe(plumber())
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.stream());
});

gulp.task('deploy', ['sass', 'html', 'img'], shell.task([
  'git subtree push --prefix public origin gh-pages'
  ])
);

gulp.task('default', ['browserSync', 'sass', 'html', 'img', 'js'], function (){
  gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch('source/templates/*.html', ['html']);
});