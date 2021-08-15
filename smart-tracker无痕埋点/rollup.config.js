import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import { version, name, author } from './package.json';

const banner = `/*!
* ${name} v${version}
*
* Copyright ${new Date().getFullYear()}, ${author}
*
*/`;

export default [{
    input: 'src/index.js',
    output: [
        {
            file: 'dist/tracker.min.js',
            name: 'Tracker',
            sourcemap: true,
            format: 'iife'
        }
    ],
    plugins: [
        postcss({ extensions: ['.css'] }),
        resolve(),
        commonjs(),
        json(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**' 
        }),
        uglify(),
        license({ banner })
    ]
}, {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/index.js',
            sourcemap: true,
            format: 'cjs'
        }, {
            file: 'es/index.js',
            sourcemap: true,
            format: 'es'
        }
    ],
    plugins: [
        postcss({ extensions: ['.css'] }),
        commonjs(),
        json(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**' 
        }),
        license({ banner })
    ]
}]