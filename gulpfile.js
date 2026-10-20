const { rm } = require('node:fs/promises');
const { Transform } = require('node:stream');
const gulp = require('gulp');
const twig = require('twig');

twig.cache(false);

function mediaTask() {
  return gulp.src('media/**/*', {encoding: false})
    .pipe(gulp.dest('build'));
}

function pagesTask() {
  return gulp.src('pages/*.html')
    .pipe(new Transform({
      objectMode: true,
      transform(file, encoding, callback) {
        try {
          const template = twig.twig({ path: file.path, async: false, rethrow: true });
          file.contents = Buffer.from(template.render({}));
          callback(null, file);
        } catch (error) {
          callback(error);
        }
      }
    }))
    .pipe(gulp.dest('build'));
}

function cleanTask() {
  return rm('build', { recursive: true, force: true });
}

async function serverTask() {
  const { createServer } = await import('vite');
  const server = await createServer({
    configFile: false,
    root: 'build',
    publicDir: false,
    server: { port: 8080, open: true }
  });

  await server.listen();
  server.printUrls();

  gulp.watch('media/**/*', mediaTask);
  gulp.watch('pages/**/*.{html,twig}', pagesTask);
}

const buildTasks = gulp.parallel(mediaTask, pagesTask);

exports.build = buildTasks;
exports.clean = cleanTask;
exports.server = gulp.series(buildTasks, serverTask);
exports.default = buildTasks;
