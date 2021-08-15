Message 全局提示
===

全局展示操作反馈信息。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const ButtonGroup = Button.Group
    return (
      <div>
        <ButtonGroup>
          <Button size="small" onClick={()=>{
            Message.success('This is an success Message.')
          }}>
            success
          </Button>  
          
          <Button size="small" onClick={()=>{
            Message.warning('This is an warning Message.')
          }}>
            warning
          </Button>  

          <Button size="small" onClick={()=>{
            Message.info('This is an info Message.')
          }}>
            info
          </Button>  

          
          <Button size="small" onClick={()=>{
            Message.error('This is an error Message.',{duration:4})
          }}>
            error
          </Button>  
          
        </ButtonGroup>
      </div>
    )
  }
}
```
<!--End-->


### 添加HTML输出

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Button size="small" onClick={()=>{
        Message.info(
          <div>
            <h2>标题</h2>
            <p>这里是内容</p>
          </div>
        )
      }}>
        添加HTML输出 
      </Button> 
    )
  }
}
```
<!--End-->

### 延迟关闭

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Button size="small" onClick={()=>{
        Message.error('This is an warning Message.',{
          duration:3,
          onClose:()=>{
            console.log("添加onClose事件")
          }
        })
      }}>
        error, 自动3s关闭
      </Button>
    )
  }
}
```
<!--End-->

### 不同的位置弹出(有待完善)

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const ButtonGroup = Button.Group
    return (
      <div>
        <ButtonGroup>
          <Button size="small" onClick={()=>{
            Message.success('默认顶部中间.',{placement:"top"})
          }}>
            默认顶部中间
          </Button>
          <Button size="small" onClick={()=>{
            Message.info('底部中间',{placement:"bottom"})
          }}>
            底部中间
          </Button>
          <Button size="small" onClick={()=>{
            Message.success('左边上角',{placement:"topLeft"})
          }}>
            左边上角
          </Button>
          <Button size="small" onClick={()=>{
            Message.success('右边上角',{placement:"topRight"})
          }}>
            右边上角
          </Button>
          <Button size="small" onClick={()=>{
            Message.success('左边下角',{placement:"bottomLeft"})
          }}>
            左边下角
          </Button>
          <Button size="small" onClick={()=>{
            Message.success('右边下角',{placement:"bottomRight"})
          }}>
            右边下角
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}
```
<!--End-->

### API

组件提供了一些静态方法，使用方式和参数如下：

```js
Message.success(content, config)  
Message.error(content, config)  
Message.info(content, config)  
Message.warning(content, config)  
Message.loading(content, config)  
```

### Message config

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| content | 提示内容 | string、ReactNode | - |
| duration | 自动关闭的延时，单位秒 | number | 3 |
| placement | 弹出位置 `top`、`bottom`、`topLeft`、`topRight`、`bottomLeft`、`bottomRight` | string | top |
| onClose | 关闭时触发的回调函数 | Function | - |