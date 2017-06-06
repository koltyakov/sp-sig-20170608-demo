'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const tslint = require('gulp-tslint');
const tsc = require('gulp-typescript');
const gutil = require('gulp-util');
const ftp = require("gulp-ftp");

gulp.task('clean', () => {
    const del = require('del');
    return del(['dist/**']);
});

gulp.task('deploy-web-job', () => {
    const cpass = new (require('cpass')).Cpass();
    let config = require('./config/private.publish.json');
    config.pass = config.pass && cpass.decode(config.pass);
    return gulp.src(['./dist/*.*', './package.json', './run.js'], { base: './' })
        .pipe(ftp(config))
        .pipe(gutil.noop());
});

gulp.task('prepublish', [ 'clean' ], () => {
    let tsSourcesResult = gulp
        .src(['./src/**/*.ts'])
        .pipe(tsc.createProject('tsconfig.json')());

    return merge[
        tsSourcesResult.js.pipe(gulp.dest('./dist')),
        tsSourcesResult.dts.pipe(gulp.dest('./dist'))
    ];
});

gulp.task('tsc', () => {
    const sourcemaps = require('gulp-sourcemaps');

    let tsSourcesResult = gulp.src(['src/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsc.createProject('tsconfig.json')());

    let sources = tsSourcesResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));

    let declarations = tsSourcesResult.dts
        .pipe(gulp.dest('./dist'));

    return merge(sources, declarations);
});

gulp.task('tslint', () => {
    const yargs = require('yargs');
    let emitError = yargs.argv.emitError;
    return gulp.src(['src/**/*.ts'])
        .pipe(tslint({
            configuration: './tslint.json',
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true,
            emitError: emitError
        }));
});