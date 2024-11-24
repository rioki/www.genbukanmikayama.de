
let gulp          = require('gulp');
let clean         = require('gulp-clean');
let twig          = require('gulp-twig')
let liveServer    = require("live-server");

function mediaTask() {
  return gulp.src('media/**/*', {encoding: false})
    .pipe(gulp.dest('build'))
}

function pagesTask() {
  return gulp.src('pages/*.html')
    .pipe(twig())
    .pipe(gulp.dest('build'))
}

function cleanTask() {
  return gulp.src('build', {read: false, allowEmpty: true})
    .pipe(clean())
}

function serverTask() {
  gulp.watch('media/**/*', mediaTask);
  gulp.watch('pages/*.*', pagesTask);

  liveServer.start({
    root: "build",
    wait: 500
  });
}

let buildTasks = gulp.parallel(mediaTask, pagesTask)

exports.build   = buildTasks
exports.clean   = cleanTask
exports.server  = gulp.series(buildTasks, serverTask) 
exports.default = buildTasks