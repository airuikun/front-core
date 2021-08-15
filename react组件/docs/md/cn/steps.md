Steps 步骤条
===

引导用户按照流程完成任务的导航条。当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

### 基本用法

简单的步骤条。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Steps current={1} style={{padding:"20px 0"}}>
        <Steps.Step title="步骤一" description="这里是步骤一的说明，可以很长很长哦。这里是步骤一的说明，可以很长很长哦。这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤二" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤三" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤四" description="这里是步骤一的说明，可以很长很长哦。" />
      </Steps>
    )
  }
}
```
<!--End-->

### 没有详情介绍

简单的步骤条。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Steps current={1} style={{padding:"20px 0"}}>
        <Steps.Step title="步骤一" />
        <Steps.Step title="步骤二" />
        <Steps.Step title="步骤三" />
        <Steps.Step title="步骤四" />
      </Steps>
    )
  }
}
```
<!--End-->

### 带图标的步骤条

通过设置 `Steps.Step` 的 `icon` 属性，可以启用自定义图标。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Steps current={1} style={{padding:"20px 0"}}>
        <Steps.Step icon={<Icon type="user"/>} title="注册" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step icon={<Icon type="picture"/>} title="上传头像" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step icon='message' title="验证邮箱" description="这里是步骤一的说明，可以很长很长哦。这里是步骤一的说明，可以很长很长哦。这里是步骤一的说明，可以很长很长哦。这里是步骤一的说明，可以很长很长哦。" />
      </Steps>
    )
  }
}
```
<!--End-->

### 步骤运行错误

使用 `Steps` 的 `status` 属性来指定当前步骤的状态。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Steps current={2} status="error" style={{padding:"20px 0"}}>
        <Steps.Step title="步骤一" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤二" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤三" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤四" description="这里是步骤一的说明，可以很长很长哦。" />
      </Steps>
    )
  }
}
```
<!--End-->

### 点状步骤条

包含步骤点的进度条。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Steps progressDot status="error" current={2} style={{padding:"20px 0"}}>
        <Steps.Step title="步骤一" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤二" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤三" description="这里是步骤一的说明，可以很长很长哦。" />
        <Steps.Step title="步骤四" description="这里是步骤一的说明，可以很长很长哦。" />
      </Steps>
    )
  }
}
```
<!--End-->

### 步骤切换

通常配合内容及按钮使用，表示一个流程的处理进度。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps:[{
        title: '第一步',
        content: '注册一个账号',
      }, {
        title: '第二步',
        content: '填写个人信息。',
      }, {
        title: '第三步',
        content: '验证邮箱',
      }]
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current ,steps} = this.state;
    const conStyle = {minHeight:200,backgroundColor: '#fafafa',textAlign: 'center',borderRadius: 6,paddingTop: 80,marginTop: 15}
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
        </Steps>
        <div style={conStyle}>{steps[this.state.current].content}</div>
        <div style={{marginTop: 20}}>
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" size="small" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" size="small" onClick={() => Message.success('处理完成!')}>完成</Button>
          }
          {
            this.state.current > 0
            &&
            <Button size="small" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
        </div>
      </div>
    );
  }
}
```
<!--End-->

### 竖直方向的步骤条

简单的竖直方向的步骤条。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    return (
      <Row gutter="20">
        <Col md="12" xs="24">
          <Steps current={1} direction="vertical" style={{padding:"20px 0"}}>
            <Steps.Step title="已完成" description="这里是该步骤的描述信息" />
            <Steps.Step title="进行中" description="这里是该步骤的描述信息" />
            <Steps.Step title="待进行" description="这里是该步骤的描述信息" />
            <Steps.Step title="待进行" description="这里是该步骤的描述信息" />
          </Steps>
        </Col>
        <Col md="12" xs="24">
          <Steps direction="vertical" progressDot status="error" current={2} style={{padding:"20px 0"}}>
            <Steps.Step title="步骤一" description="这里是步骤一的说明，可以很长很长哦。" />
            <Steps.Step title="步骤二" description="这里是步骤一的说明，可以很长很长哦。" />
            <Steps.Step title="步骤三" description="这里是步骤一的说明，可以很长很长哦。" />
            <Steps.Step title="步骤四" description="这里是步骤一的说明，可以很长很长哦。" />
          </Steps>
        </Col>
      </Row>
    )
  }
}
```
<!--End-->


## API

### Steps 

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| current | 指定当前步骤，从 `0` 开始记数。| Number | `0` |
| status | 当前步骤的状态，可选值为`wait`、`process`、`finish`、`error` | String | `process` |
| direction | 指定步骤条方向，支持水平`vertical`、`horizontal` |  | `horizontal` |
| progressDot | 点状步骤条|  | `horizontal` |

### Steps.Step

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| status | 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：`wait` `process` `finish` `error` | String | `wait` |
| title | 指定每个步骤标题 | String/ReactNode | - |
| description | 步骤的详情描述，可选 | String/ReactNode | - |
| icon | 步骤的图标，字符串类型从`<Icon/>`组件中找，可选 | String/ReactNode | - |
