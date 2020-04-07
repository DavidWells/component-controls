import { ReplaceSource } from 'webpack-sources';
import jsStringEscape from 'js-string-escape';
import * as path from 'path';
import * as webpack from 'webpack';
import { createHash } from 'crypto';
import { store } from './store';

class StoriesInjectPlugin {
  public static pluginName = 'stories-inject-plugin';
  private readonly compilationHash: string;
  constructor() {
    const hash = createHash('md5')
      .update(new Date().getTime().toString())
      .digest('hex');
    this.compilationHash = `__${hash.substr(0, 6)}__`;
  }

  apply(compiler: webpack.Compiler) {
    this.replaceRuntimeModule(compiler);
    compiler.hooks.compilation.tap(
      StoriesInjectPlugin.pluginName,
      compilation => {
        compilation.hooks.optimizeChunkAssets.tap(
          StoriesInjectPlugin.pluginName,
          chunks => {
            chunks.forEach(chunk => {
              chunk.files
                .filter(fileName => fileName.endsWith('.js'))
                .forEach(file => {
                  this.replaceSource(compilation, file);
                });
            });
          },
        );
      },
    );
  }

  private replaceRuntimeModule(compiler: any) {
    const nmrp = new webpack.NormalModuleReplacementPlugin(
      /story-store-data\.js$/,
      (resource: any) => {
        if (resource.resource) {
          resource.loaders.push({
            loader: path.join(__dirname, 'runtimeLoader.js'),
            options: JSON.stringify({ compilationHash: this.compilationHash }),
          });
        }
      },
    );
    nmrp.apply(compiler);
  }

  private replaceSource(
    compilation: webpack.compilation.Compilation,
    file: string,
  ) {
    const placeholder = `${this.compilationHash}INJECTED_STORIES__`;
    const source = compilation.assets[file];
    const placeholderPos = source.source().indexOf(placeholder);
    if (placeholderPos > -1) {
      store.hash = this.compilationHash;
      const newContent = jsStringEscape(JSON.stringify(store));
      const source = compilation.assets[file];
      const newSource = new ReplaceSource(source, file);
      newSource.replace(
        placeholderPos,
        placeholderPos + placeholder.length - 1,
        newContent,
      );
      compilation.assets[file] = newSource;
    }
  }
}

module.exports = StoriesInjectPlugin;
