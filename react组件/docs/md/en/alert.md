Alert 警告
===

用于页面中展示重要的提示信息。

### 基本用法

<!--DemoStart--> 
```js
render() {
  return (
    <div>
      <Alert showIcon type="info" message="info Text"/>
      <Alert type="success" message="success Text"/>
      <Alert 
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
      />
    </div>
  )
}
```
<!--End-->

### 带图标

<!--DemoStart--> 
```js
render() {
  return (
    <div>
        <Alert showIcon type="success" message="success Text"/>
        <Alert showIcon type="info" message="info Text"/>
        <Alert showIcon type="warning" message="warning Text"/>
        <Alert showIcon type="error" message="error Text"/>
        <Alert 
            message="Error Text"
            description="Error Description Error Description Error Description Error Description Error Description Error Description"
            type="error"
            showIcon
          />

        <Alert showIcon type="success" description="这里是说明！" message="Success Text"/>
        <Alert showIcon type="info" description="这里是说明！" message="Info Text"/>
        <Alert showIcon type="warning" description="这里是说明！" message="Warning Text"/>
        <Alert showIcon type="error" description="这里是说明！" message="Error Text"/>
    </div>
  )
}
```
<!--End-->

### 带关闭按钮的

<!--DemoStart--> 
```js
render() {
  return (
    <div>
        <Alert 
            message="Success Text"
            description="Success Description Success Description Success Description Success Description Success Description Success Description"
            type="success"
            closable
            onClose={()=>{
                console.log("onClose::")  
            }}
          />
        <Alert 
            message="info Text"
            type="info"
            closable
            onClose={()=>{
                console.log("onClose::")  
            }}
          />
    </div>
  )
}
```
<!--End-->

### 常规颜色使用

共有四种样式 `default`、`primary`=`info`、`warning`、`error`。

<!--DemoStart--> 
```js
render() {
  return (
    <div>
        <Alert type="default" message="default Text"/>
        <Alert type="primary" message="primary Text"/>
        <Alert type="success" message="success Text"/>
        <Alert type="info" message="info Text"/>
        <Alert type="warning" message="warning Text"/>

        <Alert 
            message="Error Text"
            type="error"
            closable
            onClose={()=>{
                console.log("onClose::")  
            }}
          />
    </div>
  )
}
```
<!--End-->

### 控制显示隐藏

<!--DemoStart--> 
```js
constructor(props){
  super(props)
  this.state = {
    visible: true,
  }
}
render() {
  return (
    <div>
      <Switch 
        checked={true} 
        style={{marginBottom:10}}
        checkedChildren="显示" unCheckedChildren="隐藏"
        onChange={(e,visible)=>{
          console.log(`${visible?"选中":'没有选中'}`,visible)
          this.setState({visible})
        }}
      />
      <Alert 
        visible={this.state.visible}
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
      />
    </div>
  )
}
```
<!--End-->


## API

### Alert Attributes

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| message | 警告提示内容 | String、ReactNode | - |
| description | 警告提示的辅助性文字介绍 | String、ReactNode | - |
| onClose | 关闭时触发的回调函数 | Function | - |
| closable | 显示关闭按钮 | Boolean | - |
| showIcon | 是否显示图标 | Boolean | false |
| visible | 是否显示组件 | Boolean | true |
| transition | 过渡动画，具体值参见动画组件`<Transition>` | String | `fadeIn` |
| type | 指定警告提示的样式，有四种选择 `default`、 `primary`、 `success`、 `info`、`warning`、 `error` | String | default |