Notification 通知提醒框
===

全局展示通知提醒信息。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.open.bind(this)}>4.5秒后可自动关闭</Button>
        <Button onClick={this.open2.bind(this)}>不会自动关闭</Button>
        <Button onClick={this.open3.bind(this)}>4.5秒后自动关闭</Button>
      </div>
    )
  }
  open() {
    Notification({
      message: '通知提醒框标题名称',
      description: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案',
      onClose(){
        console.log("onClose-> 关闭回调事件！")
      }
    });
  }
  open2() {
    Notification({
      message: '提示',
      description: '这是一条不会自动关闭的消息',
      duration: 0,
    });
  }
  open3() {
    Notification.info({
      message: '提示',
      description: '这是一条不会自动关闭的消息',
    });
  }
}
```
<!--End-->


### 带状态的通知

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.open1.bind(this)}>成功</Button>
        <Button onClick={this.open2.bind(this)}>警告</Button>
        <Button onClick={this.open3.bind(this)}>消息</Button>
        <Button onClick={this.open4.bind(this)}>错误</Button>
      </div>
    )
  }
  //'success', 'warning','info', 'error'
  open1() {
    Notification({
      message: '通知提醒框标题名称',
      description: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案',
      type:"success",
    });
  }
  open2() {
    Notification({
      message: 'Notification Title',
      description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
      type:"warning",
    });
  }
  open3() {
    Notification({
      message: 'Notification Title',
      description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
      type:"info",
    });
  }
  open4() {
    Notification({
      message: 'Notification Title',
      description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
      type:"error",
    });
  }
}
```
<!--End-->

### 弹出通知位置

可以设置通知从右上角、右下角、左下角、左上角弹出。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: 'topLeft', label: 'topLeft' }, 
        { value: 'topRight', label: 'topRight' }, 
        { value: 'bottomLeft', label: 'bottomLeft' }, 
        { value: 'bottomRight', label: 'bottomRight' }, 
      ],
      value: 'topLeft'
    };
  }
  onChange(e,value){
    this.setState({
      value
    })
  }
  open() {
    Notification({
      message: 'Notification Title',
      description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
      type:"info",
      placement:this.state.value
    });
  }
  render() {
    return (
      <div>
      <Select onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
        {
          this.state.options.map(elm => {
            return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
          })
        }
      </Select>
      <Button style={{marginLeft:10}} size='small' onClick={this.open.bind(this)}>点击</Button>
      </div>
    )
  }
}
```
<!--End-->


## API

### Notification Attributes

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| message | 通知提醒标题，必选 | String|ReactNode | - |
| description | 通知提醒内容，必选 | String|ReactNode | - |
| className | 自定义 CSS class | String | - |
| style | 自定义内联样式 | String | - |
| showIcon | 是否显示图标 | Boolean | - |
| placement | 弹出位置，可选 `topLeft`、`topRight`、`bottomLeft`、`bottomRight` | Boolean | `topRight` |
| duration | 显示时间, 秒。设为 0 则不会自动关闭 | String | 4.5 |
| onClose | 通知提醒框关闭回调事件 | Function | - |