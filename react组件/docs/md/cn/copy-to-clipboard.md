CopyToClipboard 复制
===

将文本到剪切板，复制到剪贴板功能可以应用于各种元素。

## 基础实例

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <CopyToClipboard text="我被一个连接复制了！" tooltip="复制成功！"> 点击我复制 </CopyToClipboard>
      </div>
    )
  }
}
```
<!--End-->

## 点击按钮复制

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      copyText: "生亦何欢，死亦何苦"
    }
  }
  render() {
    const { copyText } = this.state;
    return (
      <div>
        <div>点击复制：{copyText}</div>
        <CopyToClipboard style={{marginTop:10,display:'inline-block'}} text={copyText} tooltip="复制成功！">
          <Button size="small">点击复制</Button>
        </CopyToClipboard>
      </div>
    )
  }
}
```
<!--End-->

## 复制输入框内容

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      copyText: "生亦何欢，死亦何苦"
    }
  }
  onChange(e){
    this.setState({
      copyText:e.target.value
    })
  }
  render() {
    const { copyText } = this.state;
    return (
      <div>
        <div><Input ref="input" type="text" value={copyText} onChange={this.onChange.bind(this)}/></div>
        <CopyToClipboard 
          style={{marginTop:10,display:'inline-block'}} 
          text={copyText} 
          tooltip="复制成功！"
          onClick={()=>{
            const {input} = this.refs;
            ReactDOM.findDOMNode(input).querySelector('input').select();
          }}
        >
          <Button size="small">点击复制</Button>
        </CopyToClipboard>
      </div>
    )
  }
}
```
<!--End-->

## 安装和使用

```bash
npm install uiw --save
```

```js
import { CopyToClipboard } from 'uiw';
// or
import CopyToClipboard from 'uiw/lib/copy-to-clipboard';
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| text | 拷贝的文本 | String | - |
| tooltip | 拷贝成的提示 | String、ReactNode | - |
| leaveDelay | `tooltip`消失的时间 | Number | `1000` |
| onClick | 点击事件 | Function(text,isCopy,event) | - |
