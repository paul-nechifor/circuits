const fs = require('fs');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const pug = require('gulp-pug');
const webpack = require('webpack-stream');
const webserver = require('gulp-webserver');

gulp.task('default', ['html', 'webserver', 'watch']);

gulp.task('build', ['html']);

gulp.task('js', () =>
  gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist'))
);

gulp.task('html', ['js'], () =>
  gulp.src('index.pug')
    .pipe(pug({
      locals: {
        js: fs.readFileSync(__dirname + '/dist/bundle.js'),
      },
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
);

gulp.task('webserver', () => {
  const port = parseInt(process.env.port || '8080', 10);
  return gulp.src('dist')
    .pipe(webserver({ livereload: true, open: true, port, host: '0.0.0.0' }));
});

gulp.task('watch', () =>
  gulp.watch(['index.pug', 'src/**/*.js'], ['html'])
);
