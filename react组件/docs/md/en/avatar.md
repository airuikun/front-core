Avatar 头像
===

用来代表用户或事物，支持图片、图标或字符展示。

## 基本用法

头像有三种尺寸，两种形状可选。

<!--DemoStart--> 
```js
render() {
  return (
    <div>
      <div style={{paddingBottom:20}}>
        <Avatar size="large" icon={<Icon type="user"/>} />
        <Avatar icon="user" />
        <Avatar size="small" icon="user" />
      </div>
      <div>
        <Avatar shape="square" size="large" icon="user" />
        <Avatar shape="square" icon="user" />
        <Avatar shape="square" size="small" icon="user" />
      </div>
    </div>
  )
}
```
<!--End-->

## 其它类型

支持三种类型：Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。

<!--DemoStart--> 
```js
render() {
  return (
    <div>
      <Avatar icon={<Icon type="user"/>} />
      <Avatar>U</Avatar>
      <Avatar src="https://avatars2.githubusercontent.com/u/1680273?s=40&v=4" />
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
    </div>
  )
}
```
<!--End-->

## 图片支持

在组件上没有暴露`onError`事件，可以直接使用`<img/>`标签。

<!--DemoStart--> 
```js
render() {
  return (
    <div>
      <Avatar src="https://avatars2.githubusercontent.com/u/1680273?s=40&v=4" />
      <Avatar>
        <img src="https://avatars2.githubusercontent.com/u/1680273?s=40&v=4" onError={()=>{
          console.log("图片加载错误！")
        }}/>
      </Avatar>
    </div>
  )
}
```
<!--End-->

## 带徽标的头像

<!--DemoStart--> 
```js
render() {
  return (
    <div>
      <span style={{ marginRight: 24 }}>
        <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
      </span>
      <span>
        <Badge dot><Avatar shape="square" icon="user" /></Badge>
      </span>
    </div>
  )
}
```
<!--End-->

## API

## Avatar

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| icon | 设置头像的图标类型，参考 Icon 组件 | String、ReactNode | - |
| shape | 指定头像的形状`square`正方形或者`circle`圆	 | Enum{'`circle`', '`square`' } | - |
| size | 设置头像的大小 | Enum{ '`large`', '`small`', '`default`' } | `default` |
| src | 图片类头像的资源地址 | String | - |
| alt | 规定图像的替代文本 | String | - |