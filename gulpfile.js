var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var merge =  require('merge-stream');
var cleanCss = require('gulp-clean-css');
var html2js = require('gulp-html2js');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var jsDependencies = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js'
];

var cssDependencies = [
    'node_modules/normalize.css/normalize.css'
];

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(['dist/*.html', 'dist/**/*.js', 'dist/**/*.css']).on("change", reload);
});

gulp.task('js', function() {
    return gulp.src(['src/shoebox.module.js', 'src/**/*.js', '!src/**/*.spec.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('css', function() {
    return gulp.src(['src/**/*.css'])
        .pipe(concat('app.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('html', function() {
   return gulp.src('src/index.html')
       .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
    return gulp.src(['src/**/*.html', '!src/index.html'])
        .pipe(html2js('app-templates.min.js', {
            adapter: 'angular',
            base: 'src',
            name: 'shoebox'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('image', function () {
   return gulp.src('src/image/**/*.png')
       .pipe(gulp.dest('dist/assets/image'));
});

gulp.task('dependencies', function() {
    var js = gulp.src(jsDependencies)
        .pipe(concat('ext.min.js'))
        .pipe(gulp.dest('dist/assets/js'));

    var css =  gulp.src(cssDependencies)
        .pipe(concat('ext.min.css'))
        .pipe(gulp.dest('dist/assets/css'));
    return merge(js, css);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', {cwd:'./'}, ['js']);
    gulp.watch('src/**/*.css', {cwd:'./'}, ['css']);
    gulp.watch('src/index.html', {cwd:'./'}, ['html']);
    gulp.watch(['src/**/*.html', '!src/index.html'], {cwd:'./'}, ['templates']);
    gulp.watch(['src/**/*.png'], {cwd:'./'}, ['image']);
});

gulp.task('build-app', ['dependencies', 'js', 'image', 'css', 'html', 'templates']);

gulp.task('default', ['build-app', 'watch']);
gulp.task('build', ['build-app', 'coveralls']);