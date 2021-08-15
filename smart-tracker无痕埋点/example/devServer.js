const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static-cache');
const KoaCompress = require('koa-compress');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(KoaCompress({
    filter: function (content_type) {
        return /text|javascript/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));
app.use(KoaStatic(path.join(__dirname, '../')), {
    maxAge: 365 * 24 * 60 * 60
});

router.get('/', async (ctx, next) => {
    await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, './index.html'), 'utf8', (err, htmlData) => {
            if (err) {
                ctx.body = "500 error";
                ctx.status = 500;
                reject();
            } else {
                ctx.body = htmlData;
                resolve();
            }
        });
    });
    next();
});
   
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log(`🚀 Server ready at http://localhost:3000`);
});