# Lighthouse Bundle Size Plugin

A plugin to gather information about your website bundle size.

## Usage

### Installation

```shell script
npm i lighthouse-plugin-bundle-size
```

or use yarn

```shell script
yarn add lighthouse-plugin-bundle-size
```

### Lighthouse Configuration

When programmatically use lighthouse, you can follow below

#### Add `plugins` and `configFlags.configPath` in Configuration

```js
const opts = {
        chromeFlags: ['--headless'],
        extends: 'lighthouse:default',
        plugins: ['lighthouse-plugin-bundle-size'],
        passes: [{
            passName: 'defaultPass',
            gatherers: ['lighthouse-plugin-bundle-size/lib/gatherers/bundle-size-report-gatherer'],
        }],
    };
const configPathFlags = { configPath: resolve('node_modules') };

const result = await lighthouse(url, configPathFlags, opts);
```

#### You can see a new audits with id `css-bundle-size-report` and `js-bundle-size-report` in LHR

like below

```json
{
  "audits": [{
      "css-bundle-size-report": {
          title: 'CSS Bundle Size',
          description:'The CSS bundle size report compares an ideal size of 1MB against the current CSS bundle size',
          score: 1,
          scoreDisplayMode: 'binary',
          numericValue: 964441,
          displayValue: '964441 bytes'}
      },
      "js-bundle-size-report": {
          title: 'JS Bundle Size',
          description:'The JS bundle size report compares an ideal size of 1MB against the current JS bundle size',
          score: 1,
          scoreDisplayMode: 'binary',
          numericValue: 964441,
          displayValue: '964441 bytes'}
        }
      ]
}
```