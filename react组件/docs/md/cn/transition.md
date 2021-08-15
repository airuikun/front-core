Transition 过渡动画
===

用于页面中展示过渡动画。

## 基本用法

进入、出现、离开动画

<!--DemoStart-->
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      show: true,
      options:[
        { value: 'fadeIn down', label: '向下淡进向上淡出' }, 
        { value: 'fadeIn up', label: '向上淡进向下淡出' }, 
        { value: 'fadeIn right', label: '在右淡进淡出' }, 
        { value: 'fadeIn left', label: '在左淡进淡出' }, 
      ],
      value: 'fadeIn down',
      labe: "向下淡进向上淡出",
    }
  }
  toggleIn () {
    this.setState({ show: !this.state.show })
  }
  onChange(e,value){
    this.setState({ value })
  }
  render() {
    const { show } = this.state
    return (
      <div>  
        <Select onChange={this.onChange.bind(this)} style={{width:200,margin:"0 10px 0 0"}} value={this.state.value}>
          {
            this.state.options.map((elm,idx)=> {
              return <Select.Option key={elm.value} label={elm.label} value={elm.value}/>
            })
          }
        </Select>
        <Button size="small" onClick={this.toggleIn.bind(this)}>
          {show?'消失':'显示'}
        </Button>
        <div style={{padding:"20px 0 10px 5px",maxWidth:200}}>
          <Transition in={show}  sequence={this.state.value}>
            <div>
              {this.state.labe}
            </div>
          </Transition>
        </div>
      </div>
    )
  }
}
```
<!--End-->

## 淡出不卸载组件

<!--DemoStart-->
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true }
  }
  toggleIn () {
    this.setState({ show: !this.state.show })
  }
  render() {
    const { show } = this.state
    return (
      <div>  
        <Button size="mini" onClick={this.toggleIn.bind(this)}>
          {show?'消失':'显示'}
        </Button>
        <div style={{padding:"20px 0 10px 0",maxWidth:200}}>
          <Transition in={show} unmountOnExit={false} sequence='fadeIn'>
            <div>
              淡进淡入
            </div>
          </Transition>
        </div>
      </div>
    )
  }
}
```
<!--End-->

## 高宽改变动画

<!--DemoStart-->
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      show: true ,
      show2:true
    }
  }
  toggleIn (ty) {
    this.setState({ 
      [`${ty}`]: !this.state[ty] 
    })
  }
  render() {
    const { show,show2 } = this.state
    return (
      <div>  
        <Button size="mini" onClick={this.toggleIn.bind(this,'show')}> {show?'消失':'显示'} </Button>
        <div style={{padding:"20px 0 10px 0",maxWidth:200}}>
          <Transition in={show} unmountOnExit={false} sequence='height' style={{background:"#e2e2e2"}}>
            <div>
              <div style={{padding:10}}>
                高度改变动画支持
              </div>
            </div>
          </Transition>
        </div>
        <Button size="mini" onClick={this.toggleIn.bind(this,'show2')}> {show2?'消失':'显示'} </Button>
        <div style={{padding:"20px 0 10px 0",maxWidth:200}}>
          <Transition in={show2} unmountOnExit={false} sequence='width' style={{background:"#e2e2e2"}}>
            <div>
              <div style={{padding:10}}>
                高度改变动画支持
              </div>
            </div>
          </Transition>
        </div>
      </div>
    )
  }
}
```
<!--End-->

## 停止动画效果

拿到 `ref` 可以获得停止动画效果的方法 `this.transition.animation=false`, 对动画效果是破坏性的，应用场景如：`Modal` 弹出对话框的时候需要隐藏动画效果。

<!--DemoStart-->
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true }
  }
  toggleIn () {
    this.setState({ show: !this.state.show })
  }
  render() {
    const { show } = this.state
    return (
      <div>
        <Button size="mini" onClick={() => this.transition.animation = false}>
          关闭动画效果
        </Button>
        <Button size="mini" onClick={this.toggleIn.bind(this)}>
          {show?'消失':'显示'}
        </Button>
        <div style={{padding:"20px 0 10px 0", maxWidth:200}}>
          <Transition ref={tran => this.transition = tran} in={show} unmountOnExit={false} sequence='fadeIn'>
            <div>
              淡进淡入
            </div>
          </Transition>
        </div>
      </div>
    )
  }
}
```
<!--End-->


## 自定义动画

定义动画样式`flipInX`，下面是[Less](http://lesscss.org/)代码，你可以使用其它方式，比如有原生CSS、[Stylus](http://stylus-lang.com/)、[SASS](http://sass-lang.com/)

```css
.w-animate{
  &.is-flipInX {
    &.is-mounting { // 安装
      transform: translate3d(0, -100%, 0); 
    }
    &.is-mounted { // 安装完
      transform: translate3d(0, 0, 0); 
    }
  
    &.is-unmounting { // 卸载
      transform: translate3d(0, -100%, 0); 
    }
  
    &.is-unmounted { // 卸载完
      transform: translate3d(0, -100%, 0); 
    }
  }
}
```

引用自定义动画`flipInX`

```html
<Transition in={show} sequence='flipInX'>
  <div> 在左淡进淡出 </div>
</Transition>
```

## API

### Transition 

可以通过 [Animate.css](https://daneden.github.io/animate.css/) 制作更多的过度动画。变化比较大，动画库重写了，请使用最新版本。动画组件根据[react-transition-group](https://reactcommunity.org/react-transition-group/#Transition) 动画过渡组件二次封装

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| sequence | 动画效果 默认可选`fadeIn`、`down`、`up`、`right`、`left`、`height`、`width` | String | - |
| [in](https://reactcommunity.org/react-transition-group/#Transition-prop-in) | 显示组件; 触发进入或退出状态 | Bool | `false` |
| animateOnMount | 安装动画 | Bool | `true` |
| duration | 持续时间 | Number | `200` |
| [wait](https://reactcommunity.org/react-transition-group/#Transition-prop-timeout) | 等待时间时间 | Number | `200` |
| prefixCls | 默认样式`w-animate` | String | w-animate |
| ~~unmountOnBeforEnter~~ | ~~默认 `true` 进入之前不装载组件~~ | Bool | `true` |
| [unmountOnExit](https://reactcommunity.org/react-transition-group/#Transition-prop-unmountOnExit) | 默认 `true` 退出动画卸载组件 | Bool | `true` |
| [mountOnEnter](https://reactcommunity.org/react-transition-group/#Transition-prop-mountOnEnter) | 默认情况下，子组件与父Transition组件一起立即安装。 如果要“lazy mount”组件的第一个in = {true}，可以设置mountOnEnter。 在第一次进入转换之后，组件将保持安装，即使是“退出”，除非您还要指定unmountOnExit。 | Number | `false` |
| ~~onTransitionendEnter~~ | 动画进入完成(v1.2.10不支持，请使用`onEntered`) | Function(props)=>{} | - |
| ~~onTransitionendExit~~ | 动画退出完成(v1.2.10不支持，请使用`onExited`) | Function(props)=>{} | - |
| onEnter | 应用`entering`状态之前发出的回调。<br/>一个额外的参数`isAppearing`供给表明如果进入阶段是在初始安装的发生。 | Function(node: HtmlElement, isAppearing: bool) | - |
| onEntering | 应用`entering`状态后发出的回调。<br/>一个额外的参数`isAppearing`供给表明如果进入阶段是在初始安装的发生。 | Function(node: HtmlElement, isAppearing: bool) | - |
| onEntered | 在应用`exiting`状态之前启动回调。 | Function(node: HtmlElement, isAppearing: bool) -> void | - |
| onExit | 在应用`exiting`状态之前启动回调。 | Function(node: HtmlElement) -> void | - |
| onExiting | 在`exiting`状态被应用后，回调触发。 | Function(node: HtmlElement) -> void | - |
| onExited | 在`exited`状态被应用后，回调触发。 | Function(node: HtmlElement) -> void | - |
