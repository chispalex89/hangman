'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const env = require('gulp-env');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');

gulp.task('test', ['lint-test'], function() {
    env({ vars: { NODE_ENV: 'test' } });
    return gulp
            .src('tests/**/*.js')
            .pipe(mocha());
});

gulp.task('lint-server', function() {
    return gulp
            .src(['src/**/*.js', '!src/public/**/*.js'])
            .pipe(eslint({
                envs: ['es6', 'node'],
                rules: {
                    "no-unused-vars": [2, { "argsIgnorePattern": "next" } ]
                }
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});

gulp.task('lint-client', function() {
    return gulp
            .src('src/public/**/*.js')
            .pipe(eslint({ envs: ['browser', 'jquery']}))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});

gulp.task('lint-test', function() {
    return gulp
            .src('tests/**/*.js')
            .pipe(eslint({ envs: ['es6', 'node', 'mocha']}))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});

gulp.task('lint-integration-tests', function() {
    return gulp
            .src('integration-tests/**/*.js')
            .pipe(eslint({ 
                envs: ['browser', 'phantomjs', 'jquery'],
                rules: { 'no-console' : 0 }
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});

gulp.task('lint', [
    'lint-server', 'lint-client', 'lint-test', 'lint-integration-tests'
]);

gulp.task('default', ['lint', 'test']);
