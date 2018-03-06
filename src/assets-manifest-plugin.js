/* eslint-env node */
import assetsSingleton from './storage-singleton';

class AssetsManifestPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.compilation.tap('AssetsManifestPlugin', (compilation) => {
      compilation.plugin('additional-assets', (cb) => {
        const storage = assetsSingleton.getStorage();
        storage.emittedFiles.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          compilation.assets[item.outputPath] = {
            source: () => item.content,
            size: () => Buffer.byteLength(item.content, 'utf8'),
          };
        });
        cb();
      });
    });
    compiler.hooks.emit.tap('AssetsManifestPlugin', (compilation, cb) => {
      cb();
    });
  }
}

export default AssetsManifestPlugin;
