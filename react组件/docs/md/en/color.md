Color 色彩
===

`uiw` 的样式使用了 [Less](https://github.com/less/less.js) 作为开发语言，并定义了一系列全局/组件的样式变量，`uiw`中提供的所有颜色，你可以根据需求进行相应调整，[默认样式变量](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables)。


## 定制方式

我们使用 [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 的方式来覆盖变量。 参考 **主题定制** 里面的配置。

## 所有颜色

<!--DemoStart--> 
```js
render() {
  //下面这段样式可以写入css中通过 className 来使用
  const {Row,Col} = Layout;

  return (
    <div>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="8"><div style={{background:"#007bff"}}>Blue <br/> #007bff</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#6610f2"}}>Indigo <br/> #6610f2</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#6f42c1"}}>Purple <br/> #6f42c1</div></Col>
      </Row>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="8"><div style={{background:"#e83e8c"}}>Pink <br/> #e83e8c</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#dc3545"}}>Red <br/> #dc3545</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#fd7e14"}}>Orange <br/> #fd7e14</div></Col>
      </Row>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="8"><div style={{background:"#ffc107",color:"#111"}}>Yellow <br/> #ffc107</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#28a745"}}>Green <br/> #28a745</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#20c997"}}>Teal <br/> #20c997</div></Col>
      </Row>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="8"><div style={{background:"#17a2b8"}}>Cyan <br/> #17a2b8</div></Col>
      </Row>
    </div>
  )
}
```
<!--End-->

## 状态颜色

除了主色外的场景色，需要在不同的场景中使用。

<!--DemoStart--> 
```js
render() {
  //下面这段样式可以写入css中通过 className 来使用
  const {Row,Col} = Layout;
  return (
    <div>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="8"><div style={{background:"#007bff"}}>Primary(主要) <br/> #007bff</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#868e96"}}>Secondary(次要) <br/> #868e96</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#28a745"}}>Success(成功) <br/> #28a745</div></Col>
      </Row>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="8"><div style={{background:"#dc3545"}}>Danger(危险) <br/> #dc3545</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#ffc107",color:"#111"}}>Warning(警告) <br/> #ffc107</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#17a2b8"}}>Info(信息) <br/> #17a2b8</div></Col>
      </Row>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="8"><div style={{background:"#f8f9fa",color:"#111"}}>Light(亮) <br/> #f8f9fa</div></Col>
        <Col xs="24" sm="8"><div style={{background:"#343a40"}}>Dark(暗) <br/> #343a40</div></Col>
      </Row>
    </div>
  )
}
```
<!--End-->

## 灰色

常用于文本、背景、边框、阴影等，可以体现出页面的层次结构。

<!--DemoStart--> 
```js
render() {
  //下面这段样式可以写入css中通过 className 来使用
  const {Row,Col} = Layout;
  return (
    <div>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="6"><div style={{background:"#343a40"}}>标题 Title <br/> #343a40</div></Col>
        <Col xs="24" sm="6"><div style={{background:"#52575c"}}>正文 Content <br/> #52575c</div></Col>
        <Col xs="24" sm="6"><div style={{background:"#676b70"}}>辅助/图标 Sub Color <br/> #676b70</div></Col>
        <Col xs="24" sm="6"><div style={{background:"#a3a6a9"}}>失效 Disabled <br/> #a3a6a9</div></Col>
      </Row>
      <Row gutter="20" className="colorDemo">
        <Col xs="24" sm="6"><div style={{background:"#dddee1",color:"#676b70"}}>边框 Border <br/> #dddee1</div></Col>
        <Col xs="24" sm="6"><div style={{background:"#e9eaec",color:"#676b70"}}>分割线 Divider <br/> #e9eaec</div></Col>
        <Col xs="24" sm="6"><div style={{background:"#f8f8f9",color:"#676b70"}}>背景 Background <br/> #f8f8f9</div></Col>
      </Row>
    </div>
  )
}
```
<!--End-->