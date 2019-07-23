#!/usr/bin/env node

const fs = require('fs')
const argv = require('yargs').argv

// const through = require('through2')

// const DEPS_SLUG = 'DEPS_SLUG'
const { config, deps } = argv
const vizSrc = createVizualization({ config, deps })
process.stdout.write(vizSrc)

function createVizualization ({ config, deps }) {
  const configContent = fs.readFileSync(config, 'utf8')
  const depsContent = fs.readFileSync(deps, 'utf8')
  const htmlTemplate = fs.readFileSync(__dirname + '/indexTemplate.html', 'utf8')
  const appContent = getAppContent()
  const styleContent = getStyleContent()
  const result = htmlTemplate
    .replace('{{__CONFIG__}}', configContent)
    .replace('{{__DEPS__}}', depsContent)
    .replace('{{__APP__}}', appContent)
    .replace('{{__STYLE__}}', styleContent)
  return result
}

function getAppContent () {
  return [
    '/static/js/runtime~main.0cc40efe.js',
    '/static/js/2.c0997759.chunk.js',
    '/static/js/main.8d454f2e.chunk.js',
  ]
  .map(path => fs.readFileSync(__dirname + path, 'utf8'))
  .join(';\n')
}

function getStyleContent () {
  return [
    '/static/css/main.69235527.chunk.css',
  ]
  .map(path => fs.readFileSync(__dirname + path, 'utf8'))
  .join('\n')
}

// /*  export a Browserify plugin  */
// module.exports = function (browserify, pluginOpts) {
//   // setup the plugin in a re-bundle friendly way
//   browserify.on('reset', setupPlugin)
//   setupPlugin()

//   // override browserify/browser-pack prelude
//   function setupPlugin () {
//     // watch all finalized modules
//     const { path } = pluginOpts
//     const aggregator = createModuleAggregator({ path })
//     browserify.pipeline.splice('pack', 0, aggregator)
//   }
// }

// function createModuleAggregator ({ path }) {
//   const deps = {}
//   return createSpyStream((entry) => {
//     const copy = Object.assign({}, entry)
//     delete copy.source
//     deps[entry.id] = copy
//   }), () => {
//     writeVisualization({ path, deps })
//   }
// }

// function writeVisualization ({ path, deps }) {
//   const depsContent = JSON.stringify(deps, null, 2)
//   const depsSrc = `
// self.SESIFY_VIZ_DEPS = self.SESIFY_VIZ_DEPS || [];
// self.SESIFY_VIZ_DEPS.push(${depsContent});
// `
//   const result = HTML_TEMPLATE.replace(DEPS_SLUG, depsSrc)
//   fs.writeFileSync(path, 'utf8', result)
// }

// function createSpyStream (spyFn, flushFn) {
//   return through((chunk, enc, cb) => {
//     spyFn(chunk)
//     // continue normally
//     cb(null, chunk)
//   }, (cb) => {
//     flushFn()
//     cb()
//   })
// }