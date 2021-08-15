Progress 进度条
===

用于展示操作进度，告知用户当前状态和预期。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const sty = {marginBottom:10}
    return (
      <div style={{maxWidth:400}}>
        <Progress style={sty} percent={30} />
        <Progress style={sty} percent={50} status="active" />
        <Progress style={sty} percent={70} status="exception" />
        <Progress style={sty} percent={100} />
        <Progress style={sty} percent={50} showText={false} />
      </div>
    )
  }
}
```
<!--End-->

### 进度条大小设置

设置参数`strokeWidth`即可

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const sty = {marginBottom:15}
    return (
      <div style={{maxWidth:400}}>
        <Progress style={sty} strokeWidth={14} percent={30} />
        <Progress style={sty} strokeWidth={14} percent={50} status="active" />
        <Progress style={sty} strokeWidth={14} percent={70} status="exception" />
        <Progress style={sty} strokeWidth={14} percent={100} />
        <Progress style={sty} strokeWidth={14} percent={50} showText={false} />
      </div>
    )
  }
}
```
<!--End-->

### 动态展示

进度条动态展示更直观。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      percent: 0,
    }
  }
  increase(){
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  }
  decline(){
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  }
  render() {
    const ButtonGroup = Button.Group;
    let sty = {marginRight:15}
    return (
      <div style={{maxWidth:400}}>
        <Progress percent={this.state.percent} />
        <ButtonGroup style={sty}>
          <Button size="mini" onClick={this.decline.bind(this)} icon="minus" />
          <Button size="mini" onClick={this.increase.bind(this)} icon="plus" />
        </ButtonGroup>
      </div>
    )
  }
}
```
<!--End-->

### 圆圈进度条

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    let sty = {marginRight:15}
    return (
      <div style={{maxHeight:120}}>
        <Progress style={sty} type="circle" percent={75} />
        <Progress style={sty} type="circle" percent={70} status="exception" />
        <Progress style={sty} type="circle" percent={100} />
      </div>
    )
  }
}
```
<!--End-->

### 设置不同的尺寸

通过`strokeWidth`设置圆圈进度宽带，通过`width`（`type="circle"`有效）设置圆圈大小，

<!--DemoStart--> 
```js
let sty = {marginRight:15}
class Demo extends Component {
  render() {
    return (
      <div style={{maxHeight:120}}>
        <Progress style={sty} type="circle" width={80} strokeWidth={2} percent={75} />
        <Progress style={sty} type="circle" width={100} strokeWidth={10} percent={70} status="exception" />
        <Progress style={sty} type="circle" percent={100} />
        <Progress style={sty} type="circle" percent={100} strokeWidth={3}/>
        <Progress style={sty} type="circle" width={100} strokeWidth={4} percent={70} status="exception" />
        <Progress style={sty} type="circle" width={80} strokeWidth={2} percent={75} />
        <Progress style={sty} type="circle" width={50} strokeWidth={2} percent={75} />
      </div>
    )
  }
}
```
<!--End-->

### 进度圈动态展示

圈动进度条动态展示更直观。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props)
    this.state = {
      percent: 10,
    }
  }
  increase() {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  }
  decline() {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  }
  render() {
    const ButtonGroup = Button.Group;
    return (
      <div>
        <Progress type="circle" percent={this.state.percent} />
        <br/>
        <br/>
        <ButtonGroup>
          <Button size="small" onClick={this.decline.bind(this)} icon="minus" />
          <Button size="small" onClick={this.increase.bind(this)} icon="plus" />
        </ButtonGroup>
      </div>
    );
  }
}
```
<!--End-->

## 自定义文字格式

`format` 属性指定格式。

<!--DemoStart--> 
```js
const sty = {marginRight:10}
class Demo extends Component {
  render() {
    return (
      <div>
        <Progress style={sty} percent={80} type="circle" format={percent => (
            <span>
              {`${percent} %`}
              <div style={{padding:"10px 0 0 0",fontSize:21}}>已完成</div>
            </span>
          )}/>
        <Progress style={sty} percent={70} status="exception" type="circle" format={percent => (
          <span>
            {`${percent} %`}
            <div style={{padding:"10px 0 0 0",fontSize:21}}>已关闭</div>
          </span>
        )}/>
        <Progress style={sty} percent={100} type="circle" format={percent => `已完成`}/>
        <Progress style={sty} percent={70} format={percent => `${percent}℃`}/>
      </div>
    )
  }
}
```
<!--End-->

## API

### Progress

| 参数 | 说明 | 类型 | 默认值 |
|------ |-------- |---------- |-------- |
| percent | 百分比 | Number | `0` |
| showText | 是否显示进度条文字内容 | Boolean | `true` |
| format | 内容的模板函数，自定义文字格式。 | Function | - |
| type | 类型 | Enum{'`line`', '`circle`'} | `line` |
| strokeWidth | 进度条线的宽度 | Number | `6` |
| width  | 圆形进度条画布宽度，单位 px ,`type="circle"`有效| Number | `126` |
| status | 状态，可选：`success` `exception` `active` | Enum{'`success`', '`exception`'} | - |
