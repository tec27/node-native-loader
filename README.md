# node-native-loader

A webpack loader for node native modules (.node/C++ binaries).

## What it does

This loader moves all relevant files (generally, `.node` files) to the output path, then uses
relative paths to load them, so that they can be loaded in a consistent location across different
builds of an app (development vs packaged, etc.).

It is similar to [node-relative-loader](https://www.npmjs.com/package/node-relative-loader), but
has a number of problematic options removed, and works consistently on Windows (whereas the
aforementioned module often generates non-working require statements).

## Usage

```javascript
// In your webpack config

// For an application that outputs files to ./app/dist, and starts from ./app/index:
const config = {
  // ...
  module: {
    loaders: {
      // ...
      {
        test: /\.node$/,
        // `from` is where paths will be made relative to
        loader: 'node-native?from=app',
      },
    }
  }
}
```

## A note on webpack-dev-server

If you're using `webpack-dev-server` (or `webpack-dev-middleware`), you probably also want to add
[write-file-webpack-plugin](https://www.npmjs.com/package/write-file-webpack-plugin) to your
configuration for all `.node` files, so that they still get written to the filesystem and can be
required consistently.

## License

MIT
