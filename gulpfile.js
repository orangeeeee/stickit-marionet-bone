var gulp = require('gulp');
var browserify = require('browserify');
var minifyify = require('minifyify');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
    browserify('./app.js')
        .plugin("minifyify", {
            map: false, // : 'bundle.js.map'としたいが、エラーになる。
            uglify: {
                compress: {
                    drop_console: true,
                    dead_code: true,
                    conditionals: true,
                    unused: true,
                    if_return: true,
                    global_defs: {
                        DEBUG: false
                    }
                },
                mangle: true,
                "screw-ie8": true
            }
        })
        .bundle()
        .pipe(source('vender2.js'))
        .pipe(gulp.dest('./'));
});

//browserify entry.js -d -p [minifyify --map bundle.js.map --output bundle.js.map --uglify [ --compress [ --dead_code--comparisons 0 ] ] ] > bundle.js

//browserify entry.js -d -p [minifyify --map bundle.js.map --output bundle.js.map] > bundle.js
//
