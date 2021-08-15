Modal 对话框
===

模态对话框。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    }
  }

  showConfirm(){
    Modal.info({
      title: 'Want to delete these items s?',
      content: 'When clicked the OK button, Some descriptions.',
      okText: 'OK',
      cancelText: 'Cancel',
      maskClosable:false,
      className:"aaa",
      onOk:()=>{
        console.log("确定回调！1111")
      },
      onCancel:()=>{
        console.log("取消回调！222")
      },
    })
  }

  showConfirm2(){
    Modal.info({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      okText: '确定按钮',
      onOk:()=>{
        console.log("确定回调！")
      },
    })
  }

  showConfirm3(){
    Modal.error({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 3 second',
      okText: '确定按钮',
      onOk:()=>{
        console.log("确定回调！, 这里是利用Promise等执行完成再去关闭窗口")
        return new Promise((resolve, reject) => {
          console.log("test",Math.random() > 0.5,'--',resolve, reject)
          setTimeout(Math.random() > 0.5 ? resolve : reject, 3000);
        }).catch((e,a) => {
          console.log('Oops errors!',e,a)
        });
      },
    })
  }
  render() {
    const ButtonGroup = Button.Group;
    return (
      <ButtonGroup>
        <Button size="small" onClick={this.showConfirm} type="default">确认对话框</Button>
        <Button size="small" onClick={this.showConfirm2} type="default">一个确认按钮对话框</Button>
        <Button size="small" onClick={this.showConfirm3.bind(this)} type="default">延迟关闭对话框</Button>
      </ButtonGroup>
    )
  }
}
```
<!--End-->

### 不同颜色的提示对话框

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    }
  }
  showConfirm4(){
    Modal.info({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      okText: '确定按钮',
      onOk() {
        console.log("确定回调！")
      },
    })
  }

  showConfirm5(){
    Modal.warn({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      okText: '确定按钮',
      onOk() {
        console.log("确定回调！")
      },
    })
  }

  showConfirm6(){
    Modal.error({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      okText: '确定按钮',
      onOk() {
        console.log("确定回调！")
      },
    })
  }

  showConfirm7(){
    Modal.success({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      okText: '确定按钮',
      onOk() {
        console.log("确定回调！")
      },
    })
  }
  render() {
    const ButtonGroup = Button.Group;
    return (
      <ButtonGroup>
        <Button size="small" onClick={this.showConfirm4} type="info">消息</Button>
        <Button size="small" onClick={this.showConfirm5} type="warn">警告</Button>
        <Button size="small" onClick={this.showConfirm6} type="error">错误</Button>
        <Button size="small" onClick={this.showConfirm7} type="success">成功</Button>
      </ButtonGroup>
    )
  }
}
```
<!--End-->

### horizontal

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1:false,
      visible2:false,
      visible3:false,
      visible4:false,
      confirmLoading:false,
    }
  }
  onClick(key){
    console.log("key:------------------------------>:",key,this.state.visible1)
    this.setState({
      [key]:true
    })
  }
  render() {
    return (
      <div>
        <Modal 
          title="This Title" 
          horizontal="right"
          width={300}
          visible={this.state.visible1}
          styleMask={{ // 遮罩层样式
            "top": 60,
            "backgroundColor":"rgba(51, 51, 51, 0)"
          }} 
          style={{     // 弹出层容器样式
            //"top": 60
          }}
          onOk={()=>{
            this.setState({
              confirmLoading:true
            })

            setTimeout(() => {
              this.setState({
                visible1: false,
                confirmLoading: false,
              });
            }, 2000);

          }} // 点击确定提交按钮
          onCancel={()=>{
            console.log("-点击确定提交按钮-->",this.state.visible1)
            this.setState({visible1:false})
          }}
          confirmLoading={this.state.confirmLoading}
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
        </Modal>

        <Modal 
          title="This Title" 
          horizontal="right"
          width={300}
          visible={this.state.visible2}
          styleMask={{          // 遮罩层样式
            "top": 60,
            "backgroundColor":"rgba(51, 51, 51, 0.23)"
          }} 
          style={{
            "top": 60
          }}
          onOk={()=>{
            this.setState({
              confirmLoading:true
            })

            setTimeout(() => {
              this.setState({
                visible2: false,
                confirmLoading: false,
              });
            }, 2000);

          }} // 点击确定提交按钮
          onCancel={()=>this.setState({visible2:false})}
          confirmLoading={this.state.confirmLoading}
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
        </Modal>

        <Modal 
          title="This Title" 
          horizontal="left"
          width={300}
          visible={this.state.visible3}
          onOk={()=>{
            this.setState({
              confirmLoading:true
            })

            setTimeout(() => {
              this.setState({
                visible3: false,
                confirmLoading: false,
              });
            }, 2000);

          }} // 点击确定提交按钮
          onCancel={()=>this.setState({visible3:false})}
          confirmLoading={this.state.confirmLoading}
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
        </Modal>

        <Modal 
          title="点击确定后异步关闭对话框" 
          horizontal="right"
          width={300}
          visible={this.state.visible4}
          onOk={()=>{
            this.setState({
              confirmLoading:true
            })

            setTimeout(() => {
              this.setState({
                visible4: false,
                confirmLoading: false,
              });
            }, 2000);

          }} // 点击确定提交按钮
          onCancel={()=>this.setState({visible4:false})}
          confirmLoading={this.state.confirmLoading}
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
        </Modal>

        <Button size="small" onClick={this.onClick.bind(this,'visible1')}>Right顶部留出空隙，隐藏遮罩层</Button>

        <Button size="small" onClick={this.onClick.bind(this,'visible2')}>Right顶部留出空隙</Button>

        <Button size="small" onClick={this.onClick.bind(this,'visible3')}>Left</Button>

        <Button size="small" onClick={this.onClick.bind(this,'visible4')}>Right</Button> 

      </div>
    )
  }
}
```
<!--End-->

### 在render中使用

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
    }
  }
  render() {
    return (
      <div> 
        <Button size="small" onClick={()=>{
          this.setState({visible:true})
        }}>Open Modal dialog</Button>  &nbsp;
        <Modal 
          title="Modal Title" 
          visible={this.state.visible}
          onOk={()=>{
            this.setState({visible:false})
          }} // 点击确定提交按钮
          width={600}          // 有默认值可以不传递
          style={{top: 20}}    // 可以设定容器的位置以及样式
          onCancel={()=>{
            this.setState({visible:false})
          }}
          maskClosable={false} // 禁止遮罩层关闭
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    )
  }
}
```
<!--End-->

### Modals自定义Footer

自定义按钮，需要定义`onCancel`方法，`onCancel`方法改变父组件的`visible`属性。`footer`可以赋值`null`，不显示底部按钮。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
    }
  }
  handleCancel(){
    this.setState({visible:false})
  }
  handleShow(){
    this.setState({visible:true})
  }
  render() {
    return (
      <div> 
        <Button size="small" onClick={this.handleShow.bind(this)}>Modals自定义Footer</Button>
        <Modal 
          title="Modals自定义Footer" 
          visible={this.state.visible}
          onOk={this.handleOk} // 点击确定提交按钮
          style={{top: 20}}    // 可以设定容器的位置以及样式
          onCancel={this.handleCancel.bind(this)}
          okText="OK" 
          cancelText="Cancel"
          // 自定义页脚按钮
          // footer={null}
          footer={(
            <div>
              <Button size="small" onClick={()=>{
                this.setState({
                  visible:false
                })
              }}>
                取消
              </Button>
              <Button size="small" onClick={()=>{
                this.setState({
                  visible:false
                })
              }}>
                确定
              </Button>
            </div>
          )}
        >
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    )
  }
}
```
<!--End-->


### Modals居中显示

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible3:false,
    }
  }
  render() {
    return (
      <div> 
        <Button size="small" onClick={()=>{
          this.setState({visible3:true})
        }}>Modals居中显示，</Button> &nbsp;
        <Modal 
          title="Modals自定义Footer" 
          visible={this.state.visible3}
          onOk={()=>{
            // 点击确定提交按钮
          }} 
          onCancel={()=>this.setState({visible3:false})}
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
        </Modal>
      </div>
    )
  }
}
```
<!--End-->

### 点击确定后异步关闭对话框

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading:false,
      loading:false,
      visible:false,
    }
  }
  render() {
    return (
      <div> 
        <Button size="small" onClick={()=>{
          this.setState({visible:true})
        }}>点击确定后异步关闭对话框， 并添加加载状态</Button> 
        <Modal 
          title="点击确定后异步关闭对话框" 
          visible={this.state.visible}
          onOk={()=>{
            this.setState({
              confirmLoading:true,
              loading:true
            })

            setTimeout(() => {
              this.setState({
                visible: false,
                confirmLoading: false,
                loading:false
              });
            }, 2000);

          }} // 点击确定提交按钮
          onCancel={()=>this.setState({visible:false})}
          confirmLoading={this.state.confirmLoading}
          okText="OK" 
          cancelText="Cancel"
        >
          <Loading loading={this.state.loading}>
          <p style={{color:"#333"}}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p><p>Bla bla ...</p>
          </Loading>
        </Modal>
      </div>
    )
  }
}
```
<!--End-->

### 对话框可拖拽

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
    }
  }
  render() {
    return (
      <div> 
        <Button
          size="small"
          onClick={()=>{
            this.setState({visible:true});
          }}
        >
          对话框可拖拽
        </Button>
        <Modal 
          title="Modal Title"
          dragable
          visible={this.state.visible}
          onOk={()=>{
            this.setState({visible:false})
          }} // 点击确定提交按钮
          width={600} // 有默认值可以不传递
          style={{top: 20}} // 可以设定容器的位置以及样式
          onCancel={()=>{
            this.setState({visible:false})
          }}
          maskClosable={false} // 禁止遮罩层关闭
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{ color:'#333' }}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    )
  }
}
```
<!--End-->

### 对话框可改变尺寸

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
    }
  }
  render() {
    return (
      <div> 
        <Button
          size="small"
          onClick={()=>{
            this.setState({visible:true});
          }}
        >
          对话框可改变尺寸
        </Button>
        <Modal 
          resizeable
          title="Modal Title"
          visible={this.state.visible}
          onOk={()=>{
            this.setState({visible:false})
          }} // 点击确定提交按钮
          width={600} // 有默认值可以不传递
          style={{top: 20}} // 可以设定容器的位置以及样式
          onCancel={()=>{
            this.setState({visible:false})
          }}
          maskClosable={false} // 禁止遮罩层关闭
          okText="OK" 
          cancelText="Cancel"
        >
          <p style={{ color:'#333' }}>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    )
  }
}
```
<!--End-->

### Modal Attributes

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| visible | 对话框是否可见 | boolean | - |
| title | 标题，标题为空，标题将不展示，标题右侧关闭按钮同样不展示 | string、ReactNode | - |
| okText | 确认按钮文字 | string | 确定 |
| onOk | 点击确定回调 | function(e) | - |
| confirmLoading | 确定按钮 loading | boolean | false |
| cancelText | 取消按钮文字 | string | 取消 |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | - |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 footer={null} | string、ReactNode | 确定取消按钮 |
| width | 宽度, 字符串的时候需要带单位如`300px` | number|string | 520 |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| dragable | 会话框是否允许拖拽 | boolean | false |
| resizeable | 会话框是否允许改变尺寸 | boolean | false |
| styleMask | 遮罩层样式 | object | - |
| style | 可用于设置浮层的样式，调整浮层位置等 | object | - |
| onEntered | 动画进入完成，`<Transition>` 动画库方法 | Function | - |
| onExited | 动画退出完成，`<Transition>` 动画库方法 | Function | - |



### Modal.method()

| 方法 | 说明 |
|--------- |-------- |
| `Modal.info` | 正常白底效果 |
| `Modal.success` | 成功提示 |
| `Modal.warn` | 警告提示 |
| `Modal.warning` | 警告提示 同warn |
| `Modal.error` | 错误提示 |

继承Modals组件方法下面是默认，以及新增的方法。

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| title | 标题 | string、ReactNode | - |
| content | 内容 | string、ReactNode | - |
| width | 宽度 | string、number | 416 |
| maskClosable | 点击蒙层是否允许关闭，默认不允许关闭 | boolean | false |
