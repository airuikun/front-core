'use strict';

import Router from 'koa-router';
import NodeExcel from 'excel-export';

const router = new Router();

router.get('/export', async (ctx, next) => {
    let conf = {}
    conf.cols = [{
        caption:'Header',
        type:'string',
        width: 145
    }]
    
    conf.rows = [['value01'], ['value02'], ['value03']] 
    
    ctx.type = 'application/vnd.openxmlformats'
    ctx.attachment( "Report.xlsx")
    ctx.body = new Buffer(NodeExcel.execute(conf), 'binary')
})

router.get('/test', async(ctx, next) => {
    ctx.body = {
        'status' : 'done'
    }
})

export default router;