'use strict';

import Koa from 'koa';
import baseconfig from './config/base';
import middleware from './middleware';
import routes from './routes';
import config from './config/config';
import log4js from 'log4js';

const app = new Koa();
const LOG = log4js.getLogger('file')


//configure basic app
baseconfig(app)

//configure custom middleware
app.use(middleware())

//configure custom routes
app.use(routes())

app.listen(config.app.port);
LOG.info("Server started, listening on port: " + config.app.port);

export default app