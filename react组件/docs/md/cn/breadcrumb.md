Breadcrumb 面包屑
===

显示当前页面的路径，快速返回之前的任意页面。

### 基础用法

适用广泛的基础用法。

<!--DemoStart--> 

在 `Breadcrumb` 中使用 `Breadcrumb.Item` 标签表示从首页开始的每一级。

```js
class Demo extends Component {
  render() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
        <Breadcrumb.Item>活动列表</Breadcrumb.Item>
        <Breadcrumb.Item>活动详情</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}
```
<!--End-->

### 自定义分隔符

使用 `separator=">"` 可以自定义分隔符，分隔符也可以是图标。

<!--DemoStart--> 
注意：子组件也可以定义`separator="/"` 参数哦
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动列表</Breadcrumb.Item>
          <Breadcrumb.Item>活动详情</Breadcrumb.Item>
        </Breadcrumb>
        <Breadcrumb separator={<Icon type="menu"/>}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item separator="/">活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动列表</Breadcrumb.Item>
          <Breadcrumb.Item>活动详情</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
```
<!--End-->

### 带有图标和连接的

图标放在文字前面。注意文字要使用`span`包裹起来，图标 `<Icon/>` 需要跟`span`同级。`Breadcrumb.Item` 定义 `href` 参数的话，`Item` 上的参数就全部是超链原始属性。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item><Icon type="menu"/></Breadcrumb.Item>
          <Breadcrumb.Item href="https://github.com/jaywcjlove" target="_blank">
            <Icon type="verification"/><span>活动管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item separator=">">
            <a href="/">活动列表</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>活动详情</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
```
<!--End-->


## API

### Breadcrumb

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| separator | 分隔符自定义 | String、ReactNode | `/` |

### Breadcrumb.Item

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| separator | 分隔符自定义，子组件可以单独定义不同的分隔符。 | String、ReactNode | `/` |
| href | 定义超链接， 定义了 `href` 参数，`Item` 上的参数就全部是超链原始属性。 | String、ReactNode | `/` |
