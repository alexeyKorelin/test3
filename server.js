const next = require('next')
const express = require('express');
const routes = require('./routes')
const mobxReact = require('mobx-react');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev });
const handler = routes.getRequestHandler(nextApp);

nextApp.prepare()
  .then(() => {
    const server = express();
    mobxReact.useStaticRendering(true);
    server.use(express.static('public'));
    server.use(handler).listen(port, (err) => {
      if (err) throw err
    });
})
