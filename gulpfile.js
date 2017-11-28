var gulp = require('gulp');
var polyclean = require('polyclean');

gulp.task('default', ['develop'], function () {
    return gulp.src('hamburger-button.html')
        .pipe(polyclean.cleanCss())
        .pipe(polyclean.leftAlignJs())
        .pipe(polyclean.uglifyJs())
        .pipe(gulp.dest('./'));
});

gulp.task('develop', function () {
    return gulp.src('src/hamburger-button.html')
        .pipe(gulp.dest('./'))
        .pipe(gulp.dest('bower_components/hamburger-button-test'));
});