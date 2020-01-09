import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';
import {RESPONSE} from '@nguniversal/express-engine/tokens';
import { ValueProvider } from '@angular/core'
import {Response} from 'express';

import * as express from 'express';
import {join} from 'path';
import 'localstorage-polyfill';
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync('dist/browser/index.html').toString();

global['localStorage'] = localStorage;
global['$'];
 // To remove nagitor is not defined error in SSR
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();
global['navigator'] = mock.getNavigator();
//----------

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const win = domino.createWindow(template);
global['window'] = win;
global['document'] = win.document;

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.render('index', { req });
// });
app.get('*', async (req, res) => {
  res.render('index.html', {req, res, providers: [
      {
        provide: RESPONSE,
        useValue: res,
      },
    ]}, (error, html) => {
    if (error) {
      console.log(`Error generating html for req ${req.url}`, error);
      return (req as any).next(error);
    }
    res.send(html);
    if (!error) {
      if (res.statusCode === 200) {
        //toCache(req.url, html);
      }
    }
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
