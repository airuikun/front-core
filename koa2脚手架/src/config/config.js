"use strict";
const path = require("path");
const _ = require("lodash");

let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

let base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env,
  },
};

let specific = {
    development: {
        app: {
            port: 5000,
            name: "koa2-boilerplate - Dev",
            excluded : "excluded_path"
        },
        mysql: {
            host: 'localhost',
            port : 3306,
            user : 'test',
            password : 'test',
            database : 'test'
        }
    }, 
    production: {
        app: {
            port: process.env.PORT || 5000,
            name: "koa2-boilerplate",
            excluded : "excluded_path"
        },
        mysql: {
            host: 'localhost',
            port : 3306,
            user : 'test',
            password : 'test',
            database : 'test'
        }
    },
};

module.exports = _.merge(base, specific[env]);