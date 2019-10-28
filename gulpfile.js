const nodemon = require('gulp-nodemon');
const gulp = require('gulp');
const env = require('gulp-env');

gulp.task('dev', (done) => {
    env({
        vars: {
            PORT: 3000
        }
    });
    nodemon({
        script: 'src/App.ts',
        watch: 'src',
        done
    });
});