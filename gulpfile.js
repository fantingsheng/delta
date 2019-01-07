var gulp = require('gulp');
var concat = require('gulp-concat');
var babelify = require('babelify');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var vinylPaths = require('vinyl-paths');
var browserSync = require('browser-sync');

gulp.task('clean',function(){
  return gulp.src(['build/*.js'])
      .pipe(vinylPaths(del));
});
gulp.task('concat-js', ['build-js'], function() {
  return gulp.src(['build/**/*.js'])
      .on('error', errorHandler)
      .pipe(concat('delta.require.js'))
      .pipe(gulp.dest('build'));
});
function errorHandler(err) {
  console.log(err);
}
gulp.task('build-js', [], function () {
  return browserify({
      entries: './src/main'
    })
    // .plugin(standalonify, {  //使打包后的js文件符合UMD规范并指定外部依赖包
    //   name: 'FlareJ',
    //   deps: {
    //     'nornj': 'nj',
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    //   }
    // })
    .transform(babelify)
    .bundle()
    .pipe(source('delta.require.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build'));
});
gulp.task('build', ['concat-js']);
gulp.task('reload', ['build'], browserSync.reload);
gulp.task('watch-js', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['./src/**/*.js'],['reload']);
});
