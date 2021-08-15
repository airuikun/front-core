const ghpages = require('gh-pages');
const path = require('path');
const del = require('del');
const loading = require('loading-cli');
require('colors-cli/toxic');
const pkg = require('../package.json');

const log = console.log;

const ORIGIN = 'git@github.com:uiw-react/uiw-react.github.io.git';
// const BRANCH = 'gh-pages';
log('  Start public to your git repo'.green);
log(`  ${ORIGIN}\n`.green);

function pushDirToBranch(dir, branch, callback) {
  const load = loading({
    text: `Push to ${branch}, Please wait ...`.blue,
    color: 'blue',
    interval: 100,
    stream: process.stdout,
  }).start();
  // 将 mocker 模拟 API 文件推送到一个新的分支
  ghpages.publish(path.resolve(path.join(process.cwd(), dir)), {
    branch,
    repo: ORIGIN,
    message: `Update uiw v${pkg.version}., ${new Date()}!`,
  }, (err) => {
    load.stop();
    if (err) {
      return log(err);
    }
    log(`\n  Push to ${branch} success!\n`.green.bold);
    if (callback && typeof callback === 'function') callback();
  });
}

del(['node_modules/gh-pages/.cache/**']).then(() => {
  pushDirToBranch('dist', 'master', () => {
    log(`\n  Push to ${branch} done!\n`.green.bold);
  });
});
