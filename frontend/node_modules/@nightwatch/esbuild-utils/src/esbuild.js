const fs = require('fs');
const path = require('path');
const {build, transform} = require('esbuild');
const merge = require('lodash.merge');
const mergeWith = require('lodash.mergewith');
const {pathToFileURL} = require('url');
const babel = require('./babel.js');

const ESBUILD_LOADERS = Object.freeze({
  '.js': 'jsx',
  '.cjs': 'js',
  '.jsx': 'jsx',

  '.ts': 'ts',
  '.cts': 'ts',
  '.tsx': 'tsx',

  '.css': 'css',

  '.json': 'json',

  '.txt': 'text',
  '.mdx': 'text',
  '.data': 'binary',

  '.svg': 'dataurl',
  '.png': 'dataurl',
  '.jpeg': 'dataurl',
  '.webp': 'dataurl',
  '.avif': 'dataurl'
});

const ESBUILD_CONFIG = Object.freeze({
  write: false,
  format: 'cjs',
  loader: ESBUILD_LOADERS,
  outdir: './out',
  bundle: true,
  target: 'node12',
  platform: 'node'
});

const IDENTIFIER_RE = /\w\S*$/;
const GROUP_SEPARATOR_RE = /\s*,\s*/;
const DEFAULT_EXPORT_RE = /export\s+default/;
const INLINE_EXPORT_NAME_RE = /export\s+\w+\s+(\w\S*)/g;
const GROUP_EXPORT_NAMES_RE = /export\s+{\s*([^}]*)\s*}/g;

const MULTILINE_COMMENT_RE = /\/\*.*?\*\//gs;
const SINGLE_LINE_COMMENT_RE = /\/\/.*/g;

/**
 * Walks through the file's content and gathers all identifiers that are exported.
 * It detects a default export also.
 *
 * **Works with ES modules only for now.**
 *
 * @param {string} modulePath - an absolute module path.
 * @returns {Promise<Array<string>>}
 */
const findExportNamesIn = async function (modulePath) {

  const moduleContent = (await fs.promises.readFile(modulePath, {encoding: 'utf8'}))
    .replace(MULTILINE_COMMENT_RE, '')
    .replace(SINGLE_LINE_COMMENT_RE, '');

  const names = new Set();

  if (DEFAULT_EXPORT_RE.test(moduleContent)) {
    names.add('default');
  }

  let result = null;

  while ((result = INLINE_EXPORT_NAME_RE.exec(moduleContent)) !== null) {
    result[1] && names.add(result[1]);
  }

  while ((result = GROUP_EXPORT_NAMES_RE.exec(moduleContent)) !== null) {
    if (result[1]) {
      result[1].split(GROUP_SEPARATOR_RE)
        .forEach((declaration) => {
          const [name] = IDENTIFIER_RE.exec(declaration);

          name && names.add(name);
        });
    }
  }

  return Array.from(names);
};

const ESBUILD_CONFIGS = ['esbuild.config.mjs', 'esbuild.config.js'];

async function resolveExternalConfig() {
  for (const name of ESBUILD_CONFIGS) {
    if (fs.existsSync(name)) {
      try {
        const {default: values} = await import(pathToFileURL(path.resolve(name)));

        return values;
      } catch {
        continue;
      }
    }
  }

  return {};
}

const buildFile = async function(modulePath, additionalConfig = {}) {
  const fileConfig = await resolveExternalConfig();

  if (additionalConfig.babel) {
    additionalConfig.plugins = additionalConfig.plugins || [];

    additionalConfig.plugins.push(
      babel(typeof additionalConfig.babel === 'boolean' ? {} : additionalConfig.babel)
    );

    delete additionalConfig.babel;
  }

  mergeWith(fileConfig, additionalConfig, function customizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });

  const config = merge({}, ESBUILD_CONFIG, fileConfig);

  return build({...config, entryPoints: [modulePath]});
};

const transformFile = function(content, sourcefile, ext) {
  return transform(content, {
    sourcefile,
    format: ESBUILD_CONFIG.format,
    target: ESBUILD_CONFIG.target,
    loader: ESBUILD_LOADERS[ext],
    platform: ESBUILD_CONFIG.platform
  });
};

module.exports = {
  buildFile,
  transformFile,
  findExportNamesIn
};