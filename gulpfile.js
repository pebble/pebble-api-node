var gulp = require('gulp');
var open = require('open');
var $ = require('gulp-load-plugins')();

var travis = process.env.TRAVIS === 'true' ? true : false;

gulp.task('default', ['lint', 'jscs', 'test']);

gulp.task('watch', function() {
  travis = true;
  gulp.watch(['./lib/*.js', './*.js', '!./gulpfile.js'], ['default']);
});

gulp.task('lint', function () {
  return gulp.src(['./lib/*.js', './test/*.js', './*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('jscs', function () {
  return gulp.src('./lib/*.js')
    .pipe($.jscs());
});

gulp.task('test', function () {
  var mochaReporter = travis ? 'min' : 'spec';

  return gulp.src(['./lib/*.js', './*.js'])
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire())
    .on('finish', function () {
      gulp.src('test/*.js')
        .pipe($.mocha({ reporter: mochaReporter, bail: travis }))
        .pipe($.istanbul.writeReports());
    });
});

gulp.task('open-cov', function () {
  open('./coverage/lcov-report/index.html');
});
