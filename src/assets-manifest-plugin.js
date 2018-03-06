/* eslint-env node */
import assetsSingleton from './storage-singleton';

class AssetsManifestPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    const onCompilation = (compilation) => {
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
    };

    const onEmit = (compilation, cb) => {
      cb();
    };

    if (compiler.hooks) {
      compiler.hooks.emit.tap('AssetsManifestPlugin', onEmit);
      compiler.hooks.compilation.tap('AssetsManifestPlugin', onCompilation);
    } else {
      compiler.plugin('compilation', onCompilation);
      compiler.plugin('emit', onEmit);
    }
  }
}

export default AssetsManifestPlugin;
