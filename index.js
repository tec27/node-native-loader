const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = function process(content) {
  if (this.cacheable) {
    this.cacheable()
  }

  const query = loaderUtils.parseQuery(this.query)
  let outfile = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: query.context || this.options.context,
    content,
  })
  outfile = outfile.replace(/[\\/]/g, '_')
  this.emitFile(outfile, content)
  let relativePath = query.from ?
      path.relative(query.from, path.resolve(this.options.output.path, outfile)) : outfile
  if (path.sep !== '/') {
    // require always uses posix separators
    relativePath = relativePath.replace('\\', '/')
  }
  if (relativePath[0] !== '.') {
    // Node needs all relative paths to start with a '.'
    relativePath = './' + relativePath
  }
  const modulePath = JSON.stringify(relativePath)
  return 'module.exports = __non_webpack_require__(' + modulePath + ')'
}
module.exports.raw = true
