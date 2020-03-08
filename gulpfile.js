const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const gutil = require('gulp-util')
const replace = require('gulp-replace')
const size = require('gulp-size')
const pug = require('gulp-pug')
const fs = require('fs')

const onError = function (err) {
    console.log('An error occurred:', gutil.colors.magenta(err.message))
    gutil.beep()
    this.emit(end)
}

// Pug
gulp.task('pug', function (done) {
    return gulp.src('./src/templates/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dist'))
        .pipe(size())
    done()
})

// Sass
gulp.task('sass', function (done) {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(size())
    done()
})

// JavaScript
gulp.task('js', function (done) {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(size())
    done()
})

// Watcher
gulp.task('watch', function () {
    gulp.watch('./src/templates/**/*.pug', gulp.series('pug'))
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./src/js/**/*.js', gulp.series('js'))
})

// Default
gulp.task('default', gulp.series('pug', 'sass', 'js', 'watch'))