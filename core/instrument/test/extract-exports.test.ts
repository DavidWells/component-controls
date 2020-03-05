import * as path from 'path';
import * as fs from 'fs';
import { defaultParserOptions } from '../src/index';
import { extractExports } from '../src/babel/extract-exports';

describe('extract-exports', () => {
  const extractExportsForFile = fileName => {
    const content = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    return extractExports(content, defaultParserOptions);
  };
  it('named export', () => {
    expect(
      extractExportsForFile('./examples/exports/named-export.js'),
    ).toMatchSnapshot();
  });
  it('named const export', () => {
    expect(
      extractExportsForFile('./examples/exports/named-const-export.js'),
    ).toMatchSnapshot();
  });

  it('named export alias', () => {
    expect(
      extractExportsForFile('./examples/exports/named-export-alias.js'),
    ).toMatchSnapshot();
  });

  it('re-exported name', () => {
    expect(
      extractExportsForFile('./examples/exports/re-exported-name.js'),
    ).toMatchSnapshot();
  });

  it('export from import', () => {
    expect(
      extractExportsForFile('./examples/exports/export-from.js'),
    ).toMatchSnapshot();
  });

  it('export from import with alias', () => {
    expect(
      extractExportsForFile('./examples/exports/export-from-alias.js'),
    ).toMatchSnapshot();
  });

  it('export * from import', () => {
    expect(
      extractExportsForFile('./examples/exports/export-all-from.js'),
    ).toMatchSnapshot();
  });

  it('export named class', () => {
    expect(
      extractExportsForFile('./examples/exports/button-named-class.js'),
    ).toMatchSnapshot();
  });

  it('export named class export', () => {
    expect(
      extractExportsForFile('./examples/exports/button-named-class-export.js'),
    ).toMatchSnapshot();
  });

  it('export default class', () => {
    expect(
      extractExportsForFile('./examples/exports/button-default-class.js'),
    ).toMatchSnapshot();
  });
  it('export default class export', () => {
    expect(
      extractExportsForFile(
        './examples/exports/button-default-class-export.js',
      ),
    ).toMatchSnapshot();
  });

  it('commonjs named export', () => {
    expect(
      extractExportsForFile('./examples/exports/cjs-named-export.js'),
    ).toMatchSnapshot();
  });
});