import * as path from 'path';
import { compile } from '../src/index';

expect.addSnapshotSerializer({
  test: val => typeof val === 'object' && val instanceof String,
  print: val => {
    return `"${val.toString()}"`;
  },
});

describe('test typescript react settings', () => {
  it('compile', async () => {
    const { bundleName } = await compile({
      presets: ['react', 'react-docgen-typescript'],
      configPath: path.resolve(__dirname, 'fixtures'),
    });
    const bundle = require(bundleName);
    expect(bundle).toMatchSnapshot();
  }, 30000);
});
