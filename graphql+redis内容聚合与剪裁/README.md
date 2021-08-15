# 前端菜鸡让接口提速50%的实践与原理

通过graphQL + redis来对接口进行优化

# 源码使用

## 安装redis

```shell
brew install redis
```
## 安装项目
将项目`git clone`下来以后
```javascript
    npm i
```

## 运行graphQL进行数据按需加载

```javascript
    node graphql.js
```

## 运行redis缓存加载策略

```javascript
    node redis.js
```

## 运行schedule轮询更新缓存

```javascript
    node schedule.js
```