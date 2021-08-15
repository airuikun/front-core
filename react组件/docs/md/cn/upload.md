Upload 标签
===

### 拖拽上传

可批量拖拽图片上传。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Upload.Dragger 
          onChange={(value1)=>{
            console.log("value1::",value1)
          }}
          onRemove={(value2)=>{
            console.log("value2::",value2)
          }}
          limit={3}
        />
      </div>
    )
  }
}
```
<!--End-->



## API

### Upload.Dragger

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| onChange | 拖拽完成触发,可获取图片的base64编码以及二进制编码容器blob | function(value) | - |
| onRemove | 删除某张图片 | function(value) | - |
| disabled | 禁止点击按钮 | Boolean | `false` |
| limit    | 限制上传张数 | Number | - |
