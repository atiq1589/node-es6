import gulp from 'gulp';
import shell from 'gulp-shell';
import server from 'gulp-live-server';
import run from 'run-sequence';
import rimraf from 'rimraf';
import watch from 'gulp-watch'

const paths = {
    source: 'src',
    js: ['./src/**/*.js'],
    destination: './app'
};

let express;

gulp.task('default', cb => {
    run('server','build', 'watch', cb);
});

gulp.task('watch', () => {
    return watch(paths.js, () => {
        gulp.start('build');
    });
});

gulp.task('build', cb => {
    run('clean', 'babel', 'restart', cb);
});

gulp.task('babel', shell.task([
    `babel ${paths.source} --out-dir ${paths.destination}`
]));

gulp.task('clean', cb => {
    rimraf(paths.destination, cb);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('server', () => {
    express = server(paths.destination, {env: {NODE_ENV: 'development', PORT: 3000}})
});