
var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var amdOptimize = require("amd-optimize") 

var config = {
    //Include all js files but exclude any min.js files
    src: [
        'assets/scripts/jquery.backstretch.js',
        'assets/scripts/retina-1.1.0.js',
        'assets/scripts/base.js',
        'app/**/*.js'
    ],
    libs: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
    ]
}

gulp.task('index', function () {
    var target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources;
    var css;
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'Release') {
        sources = gulp.src(['./dist/libs.min.js', './dist/app.min.js'], { read: false });
        css = gulp.src('./assets/styles/main.min.css', { read: false });
    }
    else {
        sources = gulp.src(config.libs.concat(config.src), { read: false });
        css = gulp.src('./assets/styles/main.css', { read: false });
    }
    return target.pipe(inject(css))
                 .pipe(inject(sources))
                 .pipe(gulp.dest('./'));
});

gulp.task('clean',function () {
    return del(['dist/*.js']);
});

gulp.task('scripts:app', function () {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'Release') {
        return gulp.src(config.src)
         .pipe(concat('app.min.js'))
         .pipe(uglify())
         .pipe(gulp.dest('dist/'));
    }
});

gulp.task('scripts:libs', function () {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'Release') {
        return gulp.src(config.libs)
          .pipe(concat('libs.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist/'));
    }
});

gulp.task('build', function (cb) {
    runSequence('clean', ['scripts:libs', 'scripts:app'],'index', cb);
});

gulp.task('default', ['build']);
