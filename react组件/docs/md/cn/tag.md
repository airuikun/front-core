Tag 标签
===

进行标记和分类的小标签。

### 多彩标签

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Tag color="white">white</Tag>
        <Tag color="pink">pink</Tag>
        <Tag color="red">red</Tag>
        <Tag color="yellow">yellow</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="purple">purple</Tag>
      </div>
    )
  }
}
```
<!--End-->

### 多彩英文标签

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Tag color="default">default</Tag>
        <Tag color="error">error</Tag>
        <Tag color="warn">warn</Tag>
        <Tag color="success">success</Tag>
        <Tag color="info">info</Tag>
      </div>
    )
  }
}
```
<!--End-->

### 多彩中文标签

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Tag color="default">默认</Tag>
        <Tag color="error">错误</Tag>
        <Tag color="warn">警告</Tag>
        <Tag color="success">完成</Tag>
        <Tag color="info">信息</Tag>
      </div>
    )
  }
}
```
<!--End-->

### 自定义颜色值

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Tag color="#0080f2">#0080f2</Tag>
        <Tag color="rgba(0, 0, 0, 0.65)">rgba(0, 0, 0, 0.65)</Tag>
        <Tag color="hsla(214, 100%, 29%, 0.65)">hsla(214, 100%, 29%, 0.65)</Tag>
      </div>
    )
  }
}
```
<!--End-->

### 标签组动态单选多选

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plainOptions:[
        {
          color:"white",
          value:'Apple',
          label:'苹果',
        }, {
          color:"orange",
          value:'Pear',
          label:'梨子'
        }, {
          color:"green",
          value:'Orange',
          label:'橘子'
        }
      ],
      tagRadioOptions:[
          {color:"purple", value:'苹果',label:'苹果1'},
          {color:"orange", value:'橘子',label:'橘子2'},
          {color:"green", value:'香蕉',label:'香蕉3'}
      ],
      plainValues:['Orange'],
      checkedValues:['香蕉']
    }
  }
  render() {
    const TagGroup = Tag.Group;
    const {Row,Col} = Layout;
    return (
      <Row gutter="10">
        <Col xs="12" sm="6" md="4" lg="12">
          <TagGroup 
            options={this.state.plainOptions}
            checked={true}
            checkedValues={this.state.plainValues}
            onChange={(e,value2)=>{
              this.setState({plainValues:value2})
              console.log("value::",value2)
            }}
          />
        </Col>
        <Col xs="12" sm="6" md="8" lg="12">
          <TagGroup 
            options={this.state.tagRadioOptions}
            checked={true}
            isRadio={true}
            checkedValues={this.state.checkedValues}
            onChange={(e,value)=>{
              this.setState({checkedValues:value})
              console.log("value::",value)
            }}
          />
        </Col>
      </Row>
    )
  }
}
```
<!--End-->

### 标签组动态删除

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //plainOptions:['Apple', 'Pear', 'Orange'],
      plainOptions:[
        {
          color:"white",
          value:'Apple'
        }, {
          color:"orange",
          value:'Pear'
        }, {
          color:"green",
          value:'Orange'
        }
      ],
    }
  }
  render() {
    const TagGroup = Tag.Group;
    return (
      <TagGroup 
        options={this.state.plainOptions}
        onChange={(e,value)=>{
          console.log("value::",value)
        }}
      >
        <Button size="mini" onClick={()=>{
          console.log(this.state.plainOptions)
          let addTag = this.state.plainOptions
          addTag.push({
            color:"green",
            value:'test'
          })
          this.setState({plainOptions:addTag})
        }}>Set</Button>
      </TagGroup>
    )
  }
}
```
<!--End-->

### 标签组动态编辑

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVisible: false,
      plainOptions:['Apple', 'Pear', 'Orange'],
      inputValue:""
    }
  }

  onKeyUp(e) {
    if (e.keyCode&&e.keyCode === 13) {
      this.handleInputConfirm();
    }
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleClose(index) {
    this.state.plainOptions.splice(index, 1);
    this.forceUpdate();
  }

  showInput() {
    this.setState({ inputVisible: true }, () => {
      this.input.focus();
    });
  }

  handleInputConfirm() {
    let inputValue = this.state.inputValue;
    if (inputValue) {
      this.state.plainOptions.push(inputValue);
    }
    this.state.inputVisible = false;
    this.state.inputValue = '';
    this.forceUpdate();
  }
  render() {
    const TagGroup = Tag.Group;
    const styl = {display:"inline-block",width:50}
    return (
      <TagGroup 
        options={this.state.plainOptions}
        onChange={(e,value)=>{
          console.log("Change::",value)
        }}
      >
      {
        this.state.inputVisible ? (
          <Input
            className="input-new-tag"
            value={this.state.inputValue}
            ref={(component)=>{this.input = component}}
            size="mini"
            style={styl}
            onChange={this.handleChange.bind(this)}
            onKeyUp={this.onKeyUp.bind(this)}
            onBlur={this.handleInputConfirm.bind(this)}
          />
        ) : <Button size="mini" onClick={this.showInput.bind(this)}>+ New Tag</Button>
      }
      </TagGroup>
    )
  }
}
```
<!--End-->

### 禁止删除

<!--DemoStart--> 
```js
class Demo extends Component {
  log(e,vlue){
      console.log("--->",vlue) 
  }
  render() {
    return (
      <div>
        <Tag color="default" onClose={this.log}>默认</Tag>
        <Tag color="error" onClose={this.log}>错误</Tag>
        <Tag color="warn" onClose={this.log}>警告</Tag>
        <Tag color="success" onClose={this.log}>完成</Tag>
        <Tag color="info" onClose={this.log}>信息</Tag>
        <Tag><a href="https://github.com/jaywcjlove">连接</a></Tag>
        <Tag color="info" onClose={(e)=>{
          e.preventDefault();
          console.log('Clicked! But prevent default.');
        }}>
          阻止自身销毁组件的方法
        </Tag>
      </div>
    )
  }
}
```
<!--End-->

## API

### Tag 

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| color | 支持颜色自定义，也提供选择`white`、 `pink`、 `red`、 `yellow`、 `orange`、 `cyan`、 `green`、 `blue`、 `purple` | string | `white` |
| ~~type~~⚠️ | 废弃直接在color里面填写后面面值，`white`、`red`、`orange`、`green`、`blue` | string | - |
| onClose | 关闭时的回调，设置关闭事件，标签是否显示关闭按钮 | (e) => void | - |

### Tag.Group

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| options | 设置每个标签的值例如：`['Apple', 'Pear', 'Orange']` | Array | - |
| checkedValues | 表示标签组动可选择，数组值为默认选中值| Array | - |
| onChange | 标签组发生变化触发事件 | Function(e:Event,options:Array) | - |
| checked | 标签组动可选择 | Boolean | `false` |
| isRadio | 标签组动`单选`，需要配合`checked`使用 | Boolean | `false` |

### Tag.Group options

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| color | 定义颜色 | String | - |
| value | `必填` 如果`label`键值对没有，`value`就是标签上面显示的文字，否则就是隐藏的`value` | String | - |
| label | `可选` 标签上面显示的文字 | String | - |
