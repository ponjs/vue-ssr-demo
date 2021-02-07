const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs
    .readFileSync('./public/index.html', 'utf-8')
    .replace('<div id="app"></div>', ''),
  clientManifest
})

const app = express()

app.use(express.static('./dist/client', { index: false }))

app.get('*', async (req, res) => {
  try {
    const context = { url: req.url }
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (error) {
    res.status(500).send('Server Error')
  }
})

app.listen(8080, () => {
  console.log('http://localhost:8080')
})
