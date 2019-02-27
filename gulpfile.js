const gulp       = require('gulp')
const gutil      = require('gulp-util')
const uglify     = require('gulp-uglify')
const browserify = require('browserify')
const sass       = require('gulp-sass')
const source     = require('vinyl-source-stream')
const shell      = require('gulp-shell')
const babelify   = require('babelify')

gulp.task('browserify', () => {
    return browserify('./src/js/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/assets/js/'))
})

gulp.task('sass', done => {
    gulp.src('./src/scss/app.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/assets/css'))
    done()
})

gulp.task('cp', shell.task([
    'cp index.html ./dist/index.html',
    'cp favicon.ico ./dist/favicon.ico'
]))

gulp.task('serve', shell.task([
  'http-server ./dist -p 3000'
]))

gulp.task('watch', () => {
  gulp.watch('./src/js/*/*.js', gulp.series('browserify'))
    gulp.watch('./src/js/*.js', gulp.series('browserify'))
    gulp.watch('./src/scss/*/*.scss', gulp.series('sass'))
    gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('default', gulp.series(['browserify', 'sass', 'cp', 'serve', 'watch']))
