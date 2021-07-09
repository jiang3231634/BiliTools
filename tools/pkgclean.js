const { resolve } = require('path');
const { readFileSync, readdirSync, statSync, writeFileSync } = require('fs');

const nodeModulesPath = resolve(__dirname, '../node_modules');
packageClean(nodeModulesPath);
console.log('package.json 清理完成');

function writePackageFile(path) {
  try {
    /**
     * 暂时保留这些
     */
    const { name, version, author, repository, main, license } = JSON.parse(
      readFileSync(path),
    );
    const newPKG = { name, version, author, repository, main, license };
    writeFileSync(path, JSON.stringify(newPKG));
  } catch {}
}

function packageClean(rootPath) {
  // 找出路径下的所有文件和文件夹
  const allPath = readdirSync(rootPath).map(p => resolve(rootPath, p));

  const dirPath = [],
    filePath = [];
  // 判断是文件还是文件夹
  allPath.forEach(p => {
    // 只处理 package.json 文件
    if (statSync(p).isDirectory()) {
      dirPath.push(p);
      return;
    }
    if (statSync(p).isFile() && p.endsWith('package.json')) {
      filePath.push(p);
    }
  });

  // 处理所有文件
  filePath.forEach(file => writePackageFile(file));
  // 递归处理目录
  dirPath.forEach(dir => packageClean(dir));
}
