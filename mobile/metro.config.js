// Metro không tự đi ngược lên thư mục cha để tìm code.
// Khai báo rõ monorepo root, nếu không `@bepnhaminh/shared` sẽ không resolve.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Tránh Metro bundle trùng: chỉ dùng một bản react/react-native.
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
