'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';

import RouterMain from './main';
import RouterAuth from './auth';
import RouterOpen from './open';
import RouterMock from './mock';

import db from '../lib/db';


const router = new Router();

router.get('/db', async (ctx, next) => {
    var data = await db.query();
    ctx.body = {bb: data};
})

router.get('/', async (ctx, next) => {
    // ctx.type = 'html'
    // ctx.body = require('fs').createReadStream(__dirname + '/../public/main.html')
    
    await ctx.render('./main')
})

router.use('/api', RouterMain.routes(), RouterMain.allowedMethods())
router.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods())
router.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods())
router.use('/mock', RouterMock.routes(), RouterMock.allowedMethods())

router.get('*', async (ctx, next) => {
    ctx.body = { status: 404 }
})

export default function routes() {
    return compose(
        [
            router.routes(),
            router.allowedMethods()
        ]
    )
}
