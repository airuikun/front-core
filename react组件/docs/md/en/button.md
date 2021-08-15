Button 按钮
===

按钮用于开始一个即时操作，触发业务逻辑时使用。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button type="primary" active>Button</Button>
        <Button type="primary" size="small">more <Icon type="arrow-down" /></Button>
        <Button type="link"> (超连接样式)link </Button>
        <br/><br/>
        <Button type="primary">主要按钮</Button>
        <Button type="success">成功按钮</Button>
        <Button type="info">信息按钮</Button>
        <Button type="warn">警告按钮</Button>
        <Button type="danger">错误按钮</Button>
      </div>
    )
  }
}
```
<!--End-->

### 按钮组

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const ButtonGroup = Button.Group;
    return (
      <div>
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button disabled>Disabled</Button>
          <Button>Right</Button>
        </ButtonGroup>

        &nbsp;&nbsp;

        <ButtonGroup>
          <Button>Left</Button>
        </ButtonGroup>
        <br/>
        <br/>
        <ButtonGroup>
          <Button size="small" type="info">Secondary Normal</Button>
          <Button size="small" type="info">Secondary Disabled</Button>
        </ButtonGroup>
        <br/>
        <br/>
        <ButtonGroup>
          <Button size="small">Secondary Normal</Button>
          <Button size="small">Secondary Disabled</Button>
          <Button size="small"><Icon type="arrow-down" /></Button>
        </ButtonGroup>
        <br/>
        <br/>
        <ButtonGroup>
          <Button type="warn">Warn Normal</Button>
          <Button type="warn" disabled>Disabled</Button>
        </ButtonGroup>
      </div>
    )
  }
}
```
<!--End-->

### 添加图标

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const ButtonGroup = Button.Group;
    return (
      <div>
        <ButtonGroup>
          <Button type="success" icon="upload" />
          <Button type="success" icon="information" />
          <Button type="success" icon="edit" />
        </ButtonGroup>

        &nbsp;&nbsp;

        <ButtonGroup>
          <Button size="small"><Icon type="arrow-left" />返回</Button>
          <Button size="small">前进<Icon type="arrow-right" /></Button>
        </ButtonGroup>

        <br/><br/>

        <ButtonGroup>
          <Button icon="upload" />
          <Button icon="information" />
          <Button icon="edit" />
          <Button icon="delete" />
          <Button icon="information" />
          <Button icon="verification" />
        </ButtonGroup>

        <br/><br/>

        <ButtonGroup>
          <Button type="link" icon="upload" />
          <Button type="link" icon="information" />
          <Button type="link" icon="edit" />
          <Button type="link" icon="delete" />
          <Button type="link" icon="information" />
          <Button type="link" icon="verification" />
        </ButtonGroup>

        <Button type="link" icon="verification" />
      </div>
    )
  }
}
```
<!--End-->


### 竖排列vertical

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const ButtonGroup = Button.Group;
    return (
      <div>
        <ButtonGroup vertical={true}>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button disabled>Disabled</Button>
          <Button>Right</Button>
        </ButtonGroup>
        
        &nbsp;&nbsp;

        <ButtonGroup vertical>
          <Button size="small">Left</Button>
          <Button size="small">Middle</Button>
          <Button size="small" disabled>Disabled</Button>
          <Button size="small">Right</Button>
        </ButtonGroup>

        &nbsp;&nbsp;

        <ButtonGroup vertical>
          <Button size="small" type="primary">Left</Button>
          <Button size="small" type="primary">Middle</Button>
          <Button size="small" type="primary" disabled>Disabled</Button>
          <Button size="small" type="primary">Right</Button>
        </ButtonGroup>

        &nbsp;&nbsp;

        <ButtonGroup vertical>
          <Button size="small" icon="upload"></Button>
          <Button size="small" icon="menu">Middle</Button>
          <Button size="small" icon="share" disabled>Disabled</Button>
          <Button size="small" icon="verification">Right</Button>
        </ButtonGroup>

        &nbsp;&nbsp;

        <ButtonGroup vertical>
          <Button size="small" icon="upload"></Button>
          <Button size="small" icon="menu"></Button>
          <Button size="small" icon="share" disabled></Button>
          <Button size="small" icon="verification"></Button>
        </ButtonGroup>

        &nbsp;&nbsp;

        <ButtonGroup vertical>
          <Button size="small" type="link" icon="upload"></Button>
          <Button size="small" type="link" icon="menu"></Button>
          <Button size="small" type="link" icon="share" disabled></Button>
          <Button size="small" type="link" icon="verification"></Button>
        </ButtonGroup>
      </div>
    )
  }
}
```
<!--End-->

### 点击Loading

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      loading3:false,
      loading4:false,
      loading5:true,
      loading2:false
    }
  }
  render() {
    return (
      <div>
        <Button size="mini" loading={this.state.loading} 
          onClick={()=>{
            console.log("loading:",this.state.loading)
            this.setState({loading:true})
        }}>
          点击Loading
        </Button>
        <Button size="small" type="success" loading={this.state.loading2} 
          onClick={()=>{
            console.log("loading2:",this.state.loading2)
            this.setState({loading2:true})
        }}>
          点击Loading
        </Button>
        <Button size="small" type="info" loading={this.state.loading5} 
          onClick={()=>{
            console.log("loading5:",this.state.loading5)
        }}>
          点击Loading
        </Button>
        <Button size="default" type="success" loading={this.state.loading3} 
          onClick={()=>{
            console.log("loading3:",this.state.loading3)
            this.setState({loading3:true})
        }}>
          点击Loading
        </Button>
        <Button size="large" type="danger" loading={this.state.loading4} 
          onClick={()=>{
            console.log("loading4:",this.state.loading4)
            this.setState({loading4:true})
        }}>
          点击Loading
        </Button>
      </div>
    )
  }
}
```
<!--End-->

### active样式

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Button active size="small" type="default">  默认样式 </Button>
        <Button active size="small" type="primary"> （首选项）Primary </Button>
        <Button active size="small" type="success"> （成功）Success </Button>
        <Button active size="small" type="info"> （一般信息）Info </Button>
        <Button active size="small" type="warn"> （警告）Warning </Button>
        <Button active size="small" type="danger"> （危险）Danger </Button>
        <Button active size="small" type="link"> (超连接样式)link </Button>
      </div>
    )
  }
}
```
<!--End-->

### disabled样式

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const ButtonGroup = Button.Group;
    return (
      <div>
        <ButtonGroup>
          <Button size="small" disabled type="default">  默认样式 </Button>
          <Button size="small" disabled type="primary"> （首选项）Primary </Button>
          <Button size="small" disabled type="success"> （成功）Success </Button>
          <Button size="small" disabled type="info"> （一般信息）Info </Button>
          <Button size="small" disabled type="warn"> （警告）Warning </Button>
          <Button size="small" disabled type="danger"> （危险）Danger </Button>
        </ButtonGroup>
        <br/>
        <br/>
        <Button size="small" disabled type="default">  默认样式 </Button>
        <Button size="small" disabled type="primary"> （首选项）Primary </Button>
        <Button size="small" disabled type="success"> （成功）Success </Button>
        <Button size="small" disabled type="info"> （一般信息）Info </Button>
        <Button size="small" disabled type="warn"> （警告）Warning </Button>
        <Button size="small" disabled type="danger"> （危险）Danger </Button>
        <Button size="small" disabled type="link"> (超连接样式)link </Button>
      </div>
    )
  }
}
```
<!--End-->

### size大小

`size` 在 `Button.Group`下面不支持。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Button size="mini" icon="arrow-down" type="default">mini</Button>
        <Button size="small" type="primary"><Icon type="arrow-down" /> small</Button>
        <Button size="default" type="success"><Icon type="arrow-down" /> default</Button>
        <Button size="large" type="info"><Icon type="arrow-down" /> large</Button>
      </div>
    )
  }
}
```
<!--End-->

### block

`block` 在 `Button.Group`下面不支持。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    return (
      <Row>
        <Col xs="8" sm="8" md="8" xs="24">
          <Button type="info" block size="small">（小按钮）Small button </Button>
          <Button type="info" block size="default">（默认尺寸）Default button </Button>
        </Col>
      </Row>
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
import { Button } from 'uiw';
// or
import Button from 'uiw/lib/button';
const ButtonGroup = Button.Group;
```

### Button

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| size | `large`, `default`, `small`, `mini` |String | - |
| type | `default`,`primary`,`success`,`info`,`warn`,`error`,`danger` |String | - |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) |String | `button` |
| icon | 设置按钮的图标类型 |String | - |
| block | 通过设置属性 block 可将按钮宽度设置为 100%，（块级元素），常用于弹窗内操作按钮。 |Boolean | false |
| disabled | 禁用状态 |Boolean | false |
| active | 激活状态，其表现为被按压下去（底色更深、边框夜色更深、向内投射阴影）。 |Boolean | false |
| loading | 加载中状态 | Boolean | false |
| onClick | click 事件的 handler |function | - |

### Button.Group

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| vertical | 竖排列 | Boolean | `false` |