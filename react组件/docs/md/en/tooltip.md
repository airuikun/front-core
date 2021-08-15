Tooltip 文字提示
===

简单的文字提示气泡框。


### 基础用法

<!--DemoStart--> 
最简单的用法。
```js
render() {
  return (
    <div>
        <Tooltip content="文字提示" style={{marginRight:"20px"}}>
          <Button>上边文字提示</Button>
        </Tooltip>

        <Tooltip placement="left" content="文字提示"  style={{marginRight:"20px"}}>
          <Button>左边文字提示</Button>
        </Tooltip>

        <Tooltip placement="bottom" content="文字提示"  style={{marginRight:"20px"}}>
          <Button>下边文字提示</Button>
        </Tooltip>

        <Tooltip placement="right" content="文字提示"  style={{marginRight:"20px"}}>
          <Button>右边文字提示</Button>
        </Tooltip>
    </div>
  )
}
```
<!--End-->


### 更多内容

展示多行文本或者是设置文本内容的格式，

<!--DemoStart--> 
`content`属性也可以是`ReactElement`。
```js
render() {
  return (
    <Tooltip placement="right" content={
        <div>
            <div>标题</div>
            <p>展示多行文本或者是设置文本内容的格式</p>
        </div>
    }>
      <Button>右边多行文字</Button>
    </Tooltip>
  )
}
```
<!--End-->



### 位置

位置有 12 个方向。

<!--DemoStart--> 
```js
render() {
  const text = <span>提示文字</span>;
  return (
    <div style={{ marginLeft: 60 }}>
        <div style={{ marginLeft: 60 }}>
          <Tooltip style={{ marginRight: 20}} placement="topLeft" content={text}>
            <Button>上左</Button>
          </Tooltip>
          <Tooltip style={{ marginRight: 20}} placement="top" content={text}>
            <Button>上边</Button>
          </Tooltip>
          <Tooltip style={{ marginRight: 20}} placement="topRight" content={text}>
            <Button>上右</Button>
          </Tooltip>
        </div>
        <div style={{ width: 60, float: 'left' }}>
          <Tooltip placement="leftTop" content={<div>
              <div>文字提示</div>
              <div>这里是文字描述！</div>
              <div>这里是文字描述！</div>
          </div>}>
            <Button>左上</Button>
          </Tooltip>
          <br/><br/>
          <Tooltip placement="left" content={text}>
            <Button>左边</Button>
          </Tooltip>
          <br/><br/>
          <Tooltip placement="leftBottom" content={<div>
              <div>文字提示</div>
              <div>这里是文字描述！</div>
              <div>这里是文字描述！</div>
          </div>}>
            <Button>左下</Button>
          </Tooltip>
        </div>
        <div style={{ width: 60, marginLeft: 270 }}>
          <Tooltip placement="rightTop" content="文字提示">
            <Button>右上</Button>
          </Tooltip>
          <br/><br/>
          <Tooltip placement="right" content="提示文字提示文字提示文字提文字">
            <Button>右边</Button>
          </Tooltip>
          <br/><br/>
          <Tooltip placement="rightBottom" content={<div>
              <div>文字提示</div>
              <div>这里是文字描述！</div>
              <div>这里是文字描述！</div>
          </div>}>
            <Button>右下</Button>
          </Tooltip>
          <br/><br/>
        </div>
        <div style={{ marginLeft: 60, clear: 'both' }}>
          <Tooltip style={{ marginRight: 20}} placement="bottomLeft" content={<div>
              <div>文字提示</div>
              <div>这里是文字描述！</div>
              <div>这里是文字描述！</div>
          </div>}>
            <Button>下左</Button>
          </Tooltip>
          <Tooltip style={{ marginRight: 20}} placement="bottom" content={text}>
            <Button>下边</Button>
          </Tooltip>
          <Tooltip style={{ marginRight: 20}} placement="bottomRight" content={text}>
            <Button>下右</Button>
          </Tooltip>
        </div>
    </div>
  )
}
```
<!--End-->


### 主题

组件提供了两个不同的主题：`dark`和`light`。

<!--DemoStart--> 
```js
render() {
  return (
    <div>
        <Tooltip content="文字提示" style={{marginRight:"20px"}}>
          <Button>上边文字提示</Button>
        </Tooltip>
        <Tooltip effect="light" content="文字提示">
          <Button>上边文字提示</Button>
        </Tooltip>
    </div>
  )
}
```
<!--End-->



### 禁用 Tooltip 功能

如果需要关闭Tooltips功能，`disabled`属性可以满足这个需求，它接受一个Boolean，设置为`true`即可。

<!--DemoStart--> 
```js
constructor(props){
  super(props);
  this.state = {
    disabled: false
  }
}
render() {
  return (
    <div>
      <Tooltip disabled={ this.state.disabled } content="点击关闭 Tooltip 功能">
        <Button onClick={ e => this.setState({ disabled: true}) }>点击关闭   Tooltip 功能</Button>
      </Tooltip> &nbsp;
      <Button onClick={ e => this.setState({ disabled: false}) }>
         启用前面按钮的提示
      </Button>
    </div>
  )
}
```
<!--End-->


### 点击出现

通过设置属性`trigger`可以文字提示操作方式。

<!--DemoStart--> 
```js
render() {
  return (
    <Tooltip placement="right" trigger="click" content="文字提示" >
      <Button>点击</Button>
    </Tooltip>
  )
}
```
<!--End-->

### 显示和消失触发事件

<!--DemoStart--> 
```js
constructor(props){
  super(props);
  this.state = {
    str: '-'
  }
}
render() {
  return (
    <div>
        <Tooltip content="文字提示"
        onVisibleChange={(isVisible)=>{
            console.log("isVisible::",isVisible)
            this.setState({
                str:isVisible?"显示了！":"隐藏了！"
            })
        }}>
          鼠标移动到此处，显示和消失触发事件
        </Tooltip>
        <div style={{paddingTop:"20px"}}>显示状态：{this.state.str}</div>
    </div>
  )
}
```
<!--End-->

### 手动控制状态的展示

通过设置属性`visible`可以文字提示手动控制状态的展示。

<!--DemoStart--> 
```js
constructor(props){
  super(props);
  this.state = {
    visible: false
  }
}
render() {
  const {visible} = this.state;
  return (
    <div>
    <Tooltip trigger="click" visible={visible} content="文字提示"  style={{marginRight:"20px"}}>
      <div>手动控</div>
    </Tooltip>
    <Button onClick={()=>{
        this.setState({
            visible:!visible
        })
    }}>点击</Button>
    </div>
  )
}
```
<!--End-->


### 文字提示框不显示箭头

通过设置属性`visibleArrow`可以文字提示框不显示箭头。

<!--DemoStart--> 
```js
render() {
  return (
    <Tooltip placement="right" visibleArrow={false} content="文字提示"  style={{marginRight:"20px"}}>
      <Button>不显示箭头</Button>
    </Tooltip>
  )
}
```
<!--End-->


### 延迟进入和消失

通过设置属性`leaveDelay`可以文字提示延迟消失。`enterDelay` 为延迟进入必须配合`leaveDelay` 来使用，并且值比 `leaveDelay`小

<!--DemoStart--> 
```js
render() {
  return (
    <div>
    <Tooltip placement="right" leaveDelay={6000} content="文字提示"  style={{marginRight:"20px"}}>
      <Button>hove延迟6s消失</Button>
    </Tooltip>
    <Tooltip placement="right" leaveDelay={6000} trigger="click" content="文字提示"  style={{marginRight:"20px"}}>
      <Button>点击延迟6s消失</Button>
    </Tooltip>
    <Tooltip placement="right" enterDelay={2000}  leaveDelay={6000} content="文字提示"  style={{marginRight:"20px"}}>
      <Button>鼠标悬停在按钮上延迟2s进入</Button>
    </Tooltip>
    </div>
  )
}
```
<!--End-->


### Tooltip

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| content | 显示的内容 | String,React.ReactNode | - |
| placement | 气泡框位置，可选 `top`,`topLeft`,`topRight`,`left`,`leftTop`,`leftBottom`,`right`,`rightTop`,`rightBottom`, `bottom`,`bottomLeft`,`bottomRight` | String | `top` |
| effect | 默认提供的主题  `dark`, `light` | String | `dark` |
| disabled | 是否禁用提示框 | boolean | `false` |
| leaveDelay | 鼠标离开或者点击之后延时多少才隐藏 Tooltip，单位：秒 | number | - |
| enterDelay | 鼠标离开或者点击之后延时多少才隐藏 Tooltip，单位：秒，`enterDelay` 为延迟进入必须配合`leaveDelay` 来使用，并且值比 `leaveDelay`小 | number | - |
| visibleArrow | 是否显示 Tooltip 箭头 | bool | false |
| visible | 状态是否可见 | bool | false |
| onVisibleChange | 显示隐藏的回调 | Function(isVisible:bool) | - |
