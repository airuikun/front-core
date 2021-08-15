Input Number 数字输入框
===

仅允许输入标准的数字值，可定义范围

### 基本用法

<!--DemoStart--> 
可以输入`+` `-` `.` `e` 和数字
```js
constructor(props) {
  super(props);
  this.state = {
    value: 1
  }
}
onChange(e,value) {
  console.log(`value - ${value}`)
}
render() {
  return (
    <InputNumber value={this.state.value} onChange={this.onChange.bind(this)} min="5" max="10"></InputNumber>
  )
}
```
<!--End-->

### 禁用

<!--DemoStart--> 
可以输入`+` `-` `.` `e` 和数字
```js
constructor(props) {
  super(props);
  this.state = {
    value: 1
  }
}
onChange(e,value) {
  console.log(`value - ${value}`)
}
render() {
  return (
    <InputNumber disabled={true} value={this.state.value} onChange={this.onChange.bind(this)} min="5" max="10"></InputNumber>
  )
}
```
<!--End-->

### 输入长度

<!--DemoStart--> 
除了默认的大小外，还提供了 `large`、`small` 和 `mini` 三种尺寸。
```js
constructor(props) {
  super(props);
  this.state = {
    value: 1
  }
}
onChange(e,value) {
    console.log(`value - ${value}`)
}
handleIconClick(e,value){
    console.log(`value - ${value}`)
    Message.success(`您输入了数字 - ${value}`)
}
render() {
  return (
    <InputNumber 
      preIcon="pay" 
      icon="search" 
      length={10} 
      value={this.state.value} 
      onChange={this.onChange.bind(this)}
      onIconClick={this.handleIconClick.bind(this)} />
  )
}
```
<!--End-->

### 小数点

<!--DemoStart--> 
除了默认的大小外，还提供了 `large`、`small` 和 `mini` 三种尺寸。
```js
constructor(props) {
  super(props);
  this.state = {
    value: 1
  }
}
onChange(e,value) {
    console.log(`value - ${value}`)
}
handleIconClick(e,value){
    console.log(`value - ${value}`)
    Message.success(`您输入了数字 - ${value}`)
}
render() {
  return (
    <InputNumber 
      preIcon="pay" 
      icon="search" 
      step="0.5"
      length={10} 
      value={this.state.value} 
      onChange={this.onChange.bind(this)}
      onIconClick={this.handleIconClick.bind(this)} />
  )
}
```
<!--End-->

### 输入框尺寸

<!--DemoStart--> 
可以输入`+` `-` `.` `e` 和数字
```js
render() {
  const {Row,Col} = Layout;
  return (
    <Row gutter="20">
      <Col span="6">
        <InputNumber size="large" preIcon="pay" icon="search" length={10} value=''/>
      </Col>
      <Col span="6">
        <InputNumber preIcon="pay" icon="search" length={10} value=''/>
      </Col>
      <Col span="6">
        <InputNumber size="small" preIcon="pay" icon="search" length={10} value=''/>
      </Col>
      <Col span="6">
        <InputNumber size="mini" preIcon="pay" icon="search" value=''/>
      </Col>
    </Row>
  )
}
```
<!--End-->

## API

### InputNumber

继承Input部分参数，例如`preIcon`、`length`

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| max | 最大值 | Number | Infinity |
| min | 最小值 | Number | -Infinity |
| length | 输入的最大长度，这里继承`Input`组件属性 | Number | Infinity |
| value | 当前值 | Number | 1 |
| step | 每次改变的步伐，可以是小数 | Number |  1 |
| size | 输入框尺寸，可选值为 `large`、`small` 和 `mini` 或者不填 | String | - |
| disabled | 设置禁用状态 | Boolean | false |
| onChange | 数值改变时的回调，返回当前值 | Funtcion(e:Even,value:Number) | false |