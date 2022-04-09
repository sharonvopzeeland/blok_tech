const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('css', () => (
    gulp.src('./static/styles/*.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/dist'))
))

gulp.task('js', async () => {
    gulp.src('./static/scripts/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/dist'))
})

gulp.task('watch', async () => (
    gulp.watch('./static/styles/*.css', gulp.parallel('css')),
    gulp.watch('./static/scripts/*.js', gulp.parallel('js'))
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

gulp.task('default', gulp.parallel('css', 'js', 'start', 'watch'))



