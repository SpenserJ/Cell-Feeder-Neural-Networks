var gulp = require('gulp')
  , babel = require('gulp-babel')
  , concat = require('gulp-concat');

gulp.task('default', ['compile'], function () {
  gulp.watch('js/*.js', ['compile']);
});

gulp.task('compile', function () {
  var scripts = [
    'js/Circle.js',
    'js/Cell.js',
    'js/Food.js',
    'js/main.js',
  ];
  return gulp.src(scripts)
    .pipe(concat('main.min.js'))
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
