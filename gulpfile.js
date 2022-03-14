const gulp = require('gulp');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const cleanCSS = require('gulp-clean-css');

gulp.task('css', () => (
    gulp.src('./static/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('static/dist'))
    ))


gulp.task('watch', () => (
    gulp.watch('./static/styles/*.css', gulp.series('css'))
))

gulp.task('start', (done) => (
    nodemon({
        script: 'server.js',
        ext: 'css',
        tasks: ['css'],
        ignore: ['static/dist'],
        done: done
    })
))

gulp.task('default', gulp.series('css', 'start'))

gulp.task('build', gulp.series('css'));


