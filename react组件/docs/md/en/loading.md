Loading 加载中
===

用于页面和区块的加载中状态。

### 各种大小

<!--DemoStart--> 
```js
render() {
  return (
    <div>
        <Loading size="small" />
        <Loading />
        <Loading size="large" />
    </div>
  )
}
```
<!--End-->

### 卡片加载中

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    loading:true
  }
}
render() {
  return (
    <div>
        <Loading loading={this.state.loading}>
          <Alert 
            message="Alert message title"
            description="Further details about the context of this alert."
            type="default"
            onClose={()=>{
                console.log("onClose::")  
            }}
            />
        </Loading>
        <br/>
        <Button size="small" type="default" onClick={()=>{

          let isload = !this.state.loading;
          this.setState({
            loading:isload
          })

        }}>点击切换加载状态</Button>
    </div>
  )
}
```
<!--End-->

### 自定义描述

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    loading:true
  }
}
render() {
  return (
    <div>
        <Loading tip="正在加载...">
          <Alert 
            message="Error Text"
            description="Error Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error Description"
            type="error"
          />
        </Loading>
        <Loading tip="loading...">
          <Alert 
            message="Error Text"
            type="default"
            description="Error Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error DescriptionError Description Error Description Error Description Error Description Error Description Error Description"
          />
        </Loading>
    </div>
  )
}
```
<!--End-->

### Loading Attributes

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| loading | 是否旋转 | boolean | true |
| tip | 当作为包裹元素时，可以自定义描述文案 | string | - |