Radio 单选框
===

单选框，在一组备选项中进行单选。


### 基础用法

适用广泛的基础最简单的用法。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Radio onChange={(e,value)=>{
          console.log(`values= ${value}`,value)
      }}>Radio
      </Radio>
    )
  }
}
```
<!--End-->

### 多个单选框

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }
  onChange(e,value) {
    this.setState({ value });
  }
  render() {
    return (
      <div>
        <Radio value={1} checked={this.state.value === 1} onChange={this.onChange.bind(this)}>备选项</Radio>
        <Radio value={2} checked={this.state.value === 2} onChange={this.onChange.bind(this)}>备选项</Radio>
      </div>
    )
  }
}
```
<!--End-->

### 单选框禁用

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }
  onChange(e,value) {
    this.setState({ value });
  }
  render() {
    return (
      <div>
        <Radio disabled={true}>禁用</Radio>
        <Radio disabled={true} checked={true}>禁用</Radio>
      </div>
    )
  }
}
```
<!--End-->


### 单选框组

结合`Radio.Group`元素和子元素`Radio`可以实现单选组。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3
    }
  }
  onChange(e,value) {
    this.setState({ value });
  }
  render() {
    return (
      <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
        <Radio value="3">备选项</Radio>
        <Radio disabled={true} value="6">备选项</Radio>
        <Radio value="9">备选项</Radio>
      </Radio.Group>
    )
  }
}
```
<!--End-->


### 单选框组配置方式

通过配置 `options` 参数来渲染单选框。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: "乔布斯",
      value2: "乔纳森",
      value3: "比尔盖茨"
    }
  }
  onChange(key,e ,value) {
    this.setState({
      [key]: value
    });
  }
  render() {
    const plainOptions = ['乔布斯', '比尔盖茨', '乔纳森'];
    const options = [
      {label: '乔布斯', value: '乔布斯' },
      {label: '比尔盖茨', value: '比尔盖茨' },
      {label: '乔纳森', value: '乔纳森' },
    ];
    const optionsDisabled = [
      {label: '乔布斯', value: '乔布斯' },
      {label: '比尔盖茨', value: '比尔盖茨' },
      {label: '乔纳森', value: '乔纳森' ,disabled: true },
    ];
    return (
      <div>
        <Radio.Group options={plainOptions} value={this.state.value1} 
          onChange={this.onChange.bind(this,'value1')} />
        
        <br/><br/>
        
        <Radio.Group options={options} value={this.state.value2} 
          onChange={this.onChange.bind(this,'value2')} />
        
        <br/><br/>

        <Radio.Group options={optionsDisabled} value={this.state.value3} 
          onChange={this.onChange.bind(this,'value3')} />
          
      </div>
    )
  }
}
```
<!--End-->

### 单选框组竖排

结合`Radio.Group`元素和子元素`Radio`可以实现单选组。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "3"
    }
  }
  onChange(e,value) {
    this.setState({ value });
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      marginLeft:0
    };
    return (
      <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
        <Radio style={radioStyle} value="3">备选项</Radio>
        <Radio style={radioStyle} value="6">备选项</Radio>
        <Radio style={radioStyle} value="9">选择显示输入框哦
          {this.state.value === "9" ? <Input style={{ 
            width: 100, 
            marginLeft: 10,
            display: "inline-block"}} /> : null}
        </Radio>
      </Radio.Group>
    )
  }
}
```
<!--End-->

### 按钮样式

按钮样式的单选组合。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "3"
    }
  }
  onChange(e,value) {
    this.setState({ value });
  }
  render() {
    return (
      <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
        <Radio.Button value="3">备选项</Radio.Button>
        <Radio.Button disabled={true} value="6">备选项</Radio.Button>
        <Radio.Button value="9">备选项</Radio.Button>
      </Radio.Group>
    )
  }
}
```
<!--End-->


## API

### Radio

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 根据 value 进行比较，判断是否选中 | String/Number/Boolean | - |
| checked | Radio是否被选中 | Boolean | - |
| disabled | 是否禁用 | Boolean | `false` |
| onChange | 数值改变时的回调，返回当前值 | Funtcion(e:Even,value) | - |

### Radio.Group 

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 根据 value 进行比较，判断是否选中 | String/Number/Boolean | - |
| onChange | 数值改变时的回调，返回当前值 | Funtcion(e:Even,value) | - |
| options | 以配置形式设置子元素 | Array<{label:String, value:String}> | - |

### Radio.Group options

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| label | Radio显示文字 | String/Number/Boolean | - |
| value | Radio 的 value | String/Number | - |
| disabled | Radio 是否禁用 | Boolean | - |
