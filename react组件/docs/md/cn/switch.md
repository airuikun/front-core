Switch 开关
===

表示两种相互对立的状态间的切换，多用于触发「开/关」。选中时的内容支持响应式。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      checked:true
    }
  }
  render() {
    const styl = {marginRight:"20px"}
    return (
      <div>
        <Switch checked={this.state.checked} 
          style={styl} 
          onChange={(e,checked)=>{
            this.setState({checked})
            console.log(`${checked?"选中":'没有选中'}`)
          }}
        />
        <Button size="mini" onClick={()=>{
          console.log("-->>",this.state.checked)
          this.setState({
            checked:!this.state.checked
          })
        }}>{this.state.checked?"打开":"关闭"}</Button>
      </div>
    )
  }
}
```
<!--End-->

### 不可用

Switch 失效状态。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      disabled:true
    }
  }
  render() {
    const styl = {marginRight:"20px"}
    return (
      <div>
        <Switch checked={false} disabled={this.state.disabled} style={styl} />
        <Switch checked={true} disabled={this.state.disabled} style={styl} />
        <br />
        <br />
        <Button size="mini" type="default" onClick={()=>{
          this.setState({
            disabled:!this.state.disabled
          })
        }}>
          {this.state.disabled?"Toggle disabled":"Toggle undisabled"}
        </Button>
      </div>
    )
  }
}
```
<!--End-->


### 文字和颜色

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const styl = {marginRight:"20px"}
    return (
      <div>
        <Switch checked={false} checkedChildren="开" unCheckedChildren="关" style={styl} />
        <Switch checked={true} checkedChildren="on" unCheckedChildren="off" color="#9C27B0" unColor="#ff4949" />
      </div>
    )
  }
}
```
<!--End-->


### 三种大小

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const styl = {marginRight:"20px"}
    return (
      <div>
        <Switch checked={true} size="small" checkedChildren="n"  unCheckedChildren="o" style={styl} />
        <Switch checked={true} size="small"  disabled={true}style={styl} />

        <Switch checked={true} checkedChildren="开" unCheckedChildren="关" color="#e503f4" unColor="#ff4949"  style={styl}/>
        <Switch disabled={true} checked={true} checkedChildren="开" unCheckedChildren="关" color="#e503f4" unColor="#ff4949"  style={styl}/>

        <Switch checked={true} size="large" checkedChildren="开" unCheckedChildren="关" style={styl} />
      </div>
    )
  }
}
```
<!--End-->


## API

### Switch 

| 参数 | 说明 | 类型 | 默认值 |
|------ |-------- |---------- |-------- |
| checked | 指定当前是否选中 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| color | 打开时的背景色 | string | - |
| unColor | 关闭时的背景色 | string | - |
| onChange | 变化时回调函数 | Function(e:Event,checked:Boolean) | - |
| checkedChildren |  选中时的内容 | string、ReactNode | - |
| unCheckedChildren |  非选中时的内容 | string、ReactNode | - |
| size |  开关大小，可选值：`large` `default` `small` | string | default |
