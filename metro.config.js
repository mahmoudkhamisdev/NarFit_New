const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

const uniwindConfig = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});

const originalResolveRequest = uniwindConfig.resolver.resolveRequest;
uniwindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName.includes('InputAccessoryView')) {
    return {
      filePath: require.resolve('react-native-web/dist/exports/InputAccessoryView/index.js'),
      type: 'sourceFile',
    };
  }
  return originalResolveRequest(context, moduleName, platform);
};

module.exports = uniwindConfig;
