Card 卡片
===

通用卡片容器，将信息聚合在卡片容器中展示，用来显示文字、列表、图文等内容。


## 基础用法

包含标题、内容、操作区域。

<!--DemoStart--> 
```js
render() {
  return (
    <Card title="Card标题" extra={<a href="#">更多</a>} style={{ width: 300 }}>
      卡片内容<br/>
      卡片内容<br/>
      卡片内容<br/>
    </Card>
  )
}
```
<!--End-->

## 无边框

在灰色背景上使用无边框的卡片。

<!--DemoStart--> 
```js
render() {
  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Card title="Card标题" bordered={false} style={{ width: 300 }}>
        卡片内容<br/>
        卡片内容<br/>
        卡片内容<br/>
      </Card>
    </div>
  )
}
```
<!--End-->

## 简洁卡片

只包含内容区域。

<!--DemoStart--> 
```js
render() {
  return (
    <Card style={{ width: 300 }}>
      卡片内容<br/>
      卡片内容<br/>
      卡片内容<br/>
    </Card>
  )
}
```
<!--End-->

## 更灵活的内容展示

可以调整默认边距，设定宽度。

<!--DemoStart--> 
```js
render() {
  let titleStyle = {padding: `10px 16px`}
  return (
    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
      <div>
        <img alt="example" width="100%" src="http://7xi8d6.com1.z0.glb.clouddn.com/20171018091347_Z81Beh_nini.nicky_18_10_2017_9_13_35_727.jpeg" />
      </div>
      <div style={titleStyle}>
        <h3 style={{margin:0}}>我爱漂亮妹妹</h3>
        <p style={{margin:0}}><a href="https://uiw-react.github.io">https://uiw-react.github.io</a></p>
      </div>
    </Card>
  )
}
```
<!--End-->

## 更灵活的内容展示

跟栅格进行配合排版。

<!--DemoStart--> 
```js
render() {
  const {Row,Col} = Layout;
  return (
  <div style={{ background: '#ECECEC', padding: '20px 10px' }}>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="卡片标题" bordered={false}>卡片内容！</Card>
      </Col>
      <Col span={8}>
        <Card title="卡片标题" bordered={false}>卡片内容！</Card>
      </Col>
      <Col span={8}>
        <Card title="卡片标题" bordered={false}>卡片内容！</Card>
      </Col>
    </Row>
  </div>
  )
}
```
<!--End-->

## API

### Card

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| title | 卡片标题 | String/ReactNode | - |
| extra | 卡片右上角的操作区域 | String/ReactNode | - |
| bordered | 是否显示边框 | Boolean | `true` |
| noHover | 取消鼠标移过浮起 | Boolean | `false` |
| bodyStyle | 设置 body 的样式 | Object | - |