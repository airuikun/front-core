Hotkeys 快捷键
===

用于捕获键盘输入和输入的组合键，基于 [hotkeys.js](https://github.com/jaywcjlove/hotkeys) 封装的组件。也可以单独使用[react-hotkeys](https://github.com/jaywcjlove/react-hotkeys)

### 基础用法

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    output: `Hello, I am a component that listens to keydown and keyup of a. <br/> 
    你好，我是一个监听keydown和keyup的组件。<br/> 
    请摁下【shift+a】或者【alt+s】是一下效果`,
    keyout:""
  }
}
onKeyUp(keyName, e, handle) {
  console.log("test:onKeyUp", e, handle)
  this.setState({
    keyout: `onKeyUp ${keyName}`,
  });
}
onKeyDown(keyName, e, handle) {
  console.log("test:onKeyDown", keyName, e, handle)
  this.setState({
    keyout: `onKeyDown ${keyName}`,
  });
}
render() {
  return (
    <Hotkeys 
      keyName="shift+a,alt+s" 
      onKeyDown={this.onKeyDown.bind(this)}
      onKeyUp={this.onKeyUp.bind(this)}
    >
      <div style={{ padding: "20px" }} dangerouslySetInnerHTML={{__html:`${this.state.output}<br/>${this.state.keyout}`}} />
    </Hotkeys>
  )
}
```
<!--End-->


## API

### Hotkeys

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| keyName | 快捷键组合，也可以是单个键监听，例如：`shift+a,alt+s,enter` | String | - |
| onKeyDown | 键盘摁下去事件 | Function(keyName, e, handle) | - |
| onKeyUp | 键盘弹起事件 | Function(keyName, e, handle) | - |

### keyName

支持的键 `⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, `⌘`。 

`⌘` Command()  
`⌃` Control  
`⌥` Option(alt)  
`⇧` Shift  
`⇪` Caps Lock(大写)   
~~`fn` 功能键就是fn(不支持)~~  
`↩︎` return/enter  
`space` 空格键


## 修饰键判断

可以对下面的修饰键判断 `shift` `alt` `option` `ctrl` `control` `command`，特别注意`+`和`=`键值相同，组合键设置`⌘+=`

```js
onKeyDown(keyName, e, handle) {
  console.log("test:onKeyDown", keyName, e, handle)
  if(e.shiftKey) console.log('大哥你摁下了 shift 键！');
  if(e.ctrlKey) console.log('大哥你摁下了 ctrl 键！');
  if(e.altKey) console.log('大哥你摁下了 alt 键！');
}
```
