TimePicker 时间选择器
===

用于选择或输入日期

### 基本用法
点击 `TimePicker`，然后可以在浮层中选择或者输入某一时间。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(2017, 6, 28, 15, 51),
    }
  }
  handleChang(value,date) {
    console.log('TimePicker:Chang:', value,date)
  }
  render() {
    return (
      <div>
        <TimePicker
          onChange={this.handleChang.bind(this)}
          disabledHours={['00','01']}
          disabledMinutes={['01','02']}
          disabled={false}
          format="H:i:s"
          placeholder="选择时间de拉！更改"
          value={this.state.value}
        />
      </div>
    )
  }
}
```
<!--End-->

### 固定时间点

<!--DemoStart--> 
使用 `<TimeSelect>` ，分别通过`star`、`end`和`step`指定可选的起始时间、结束时间和步长，通过`minTime`和`maxTime`来限制时间。
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(2017, 6, 28, 15, 51),
    }
  }
  handleChang(value,date) {
    console.log('time-select Chang: ', value,date)
  }
  render() {
    return (
      <div>
        <TimeSelect
          start="08:30"
          step="00:15"
          end="18:30"
          minTime="9:30"
          // hideDisabled={true}
          onChange={this.handleChang.bind(this)}
          value={this.state.value}
          //placeholder="选择时间"
        />
        <TimeSelect
          start="08:30"
          step="00:15"
          end="18:30"
          minTime="9:30"
          hideDisabled={true}
          onChange={this.handleChang.bind(this)}
          value={null}
          //placeholder="选择时间"
        />
      </div>
    )
  }
}
```
<!--End-->

### 固定时间点禁用

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date(2017, 6, 28, 15, 51), }
  }
  handleChang(value,date) {
    console.log('time-select Chang: ', value,date)
  }
  render() {
    return (
      <TimeSelect
        start="08:30"
        step="00:15"
        end="18:30"
        disabled={true}
        minTime="9:30"
        onChange={this.handleChang.bind(this)}
        value={this.state.value}
        placeholder="选择时间"
      />
    )
  }
}
```
<!--End-->

### 固定时间范围

可以通过`hideDisabled={true}`来设置禁用的不显示。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(2017, 9, 10, 14, 30),
      endDate: new Date(2017, 9, 10, 15, 30)
    }
  }

  handleStartUpdate(value,startDate) {
    console.debug('time-select startDate update: ', startDate)
    this.setState({startDate})
  }

  handleEndUpdate(value,endDate){
    console.debug('time-select endDate update: ', endDate)
    this.setState({endDate})
  }

  render() {
    return (
      <div>
        <TimeSelect
          start="08:30"
          step="00:15"
          end="18:30"
          onChange={this.handleStartUpdate.bind(this)}
          value={this.state.startDate}
          placeholder="选择时间"
        />
        <TimeSelect
          start="08:30"
          step="00:15"
          end="18:30"
          onChange={this.handleEndUpdate.bind(this)}
          value={this.state.endDate}
          minTime={this.state.startDate}
          placeholder="选择时间"
        />
      </div>
    )
  }
}
```
<!--End-->


### 任意时间点

使用 `<TimePicker>`，可以选择任意时间。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(2017, 6, 28, 15, 51),
      showTime:'',
    }
  }
  handleChang(value,date) {
    console.log('value;',value)
    this.setState({
      showTime:value,
      value:date
    })
  }
  render() {
    const {showTime} = this.state;
    return (
      <div>
        <TimePicker
          //style={{width:100}}
          onChange={this.handleChang.bind(this)}
          disabledHours={['00','01']}
          disabledMinutes={['01','02']}
          disabled={true}
          //hideDisabled={true}
          format="H:i:s"
          placeholder="选择时间de拉！"
          value={new Date(2017, 6, 28, 15, 51)}
        />
        <TimePicker
          //style={{width:100}}
          size="large" 
          onChange={this.handleChang.bind(this)}
          disabledHours={['00','01']}
          disabledMinutes={['01','02']}
          disabled={false}
          // hideDisabled={true}
          format="H:i"
          placeholder="选择时间de拉！更改"
          value={this.state.value}
        />
        <TimePicker
          //style={{width:100}}
          size="mini" 
          onChange={this.handleChang.bind(this)}
          disabledHours={['00','01']}
          disabledMinutes={['01','02']}
          disabled={false}
          format="H:i:s"
          placeholder="选择时间de拉！更改"
          value={this.state.value}
        />
        <div style={{padding:"20px 0 0 0"}}>
          选择时间：{showTime}
        </div>
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
import { TimePicker, TimeSelect } from 'uiw';
// or
import TimePicker from 'uiw/lib/time-picker';
import TimeSelect from 'uiw/lib/time-select';
```

> 输入框继承 `<Input/>` 组件。支持 Input 的部分属性如`size`,`disabled`, `size`, `autoFocus`, `preIcon`, `defaultValue`

### 公共参数 

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| className | 选择器类名 | String | - |
| value | 值 | Date/Null | - |
| disable | 禁用时间选择器 | Boolean | `false` |
| placeholder | 值 | String | - |
| placeholder | 占位内容提示 | String | `false` |
| hideDisabled | 不可选择的项隐藏 | Boolean | `false` |

### TimeSelect 

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| start | 开始时间 | String | 09:00 |
| end | 结束时间 | String | 18:00 |
| step | 间隔时间 | String | 00:30 |
| minTime | 最小时间 | Date | - |
| maxTime | 最大时间 | Date | - |
| onChange | 时间发生变化的回调 time:`9:30`、timeString:`Fri Jul 28 2017 09:45:00 GMT+0800 (CST)` | function(time:String, timeString: String) | - |

### TimePicker 

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| format | 默认显示时分秒，可以定义`H:i`只显示十分 | String | `H:i:s` |
| disabledHours | 禁止选择部分`小时`选项 | Array | [] |
| disabledMinutes | 禁止选择部分`分钟`选项 | Array | [] |
| disabledSeconds | 禁止选择部分`秒`选项 | String | [] |
| onChange | 时间发生变化的回调 time:`9:30`、timeString:`Fri Jul 28 2017 09:45:00 GMT+0800 (CST)` | function(time:String, timeString: String) | - |
