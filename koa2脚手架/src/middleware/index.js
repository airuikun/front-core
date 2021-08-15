'use strict';

import compose from 'koa-compose';
import checkauth from './checkauth';

export default function middleware() {
    return compose(
        [
            checkauth()
        ]
    )
}