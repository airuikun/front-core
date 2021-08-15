Paging 分页
===

当数据量较多时，使用分页可以快速进行数据切换，每次只加载一个页面。

### 基本用法

基础分页。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Paging activePage={7} pageSize={5} total={249}/>
        <Divider />
        <Paging pageSize={5} total={38}/>
      </div>
    )
  }
}
```
<!--End-->

### 没有翻页缩进

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Paging activePage={1} total={5} onChange={(pageNumber) => { 
          console.log(`pageNumber:${pageNumber}`)
        }} />
        <Divider />
        <Paging pageSize={5} total={11}/>
        <Divider />
        <Paging pageSize={5} total={25}/>
        <Divider />
        <Paging pageSize={5} total={28}/>
      </div>
    )
  }
}
```
<!--End-->

### 迷你分页

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Paging size="small" activePage={1} total={250} onChange={(pageNumber) => { 
        console.log(`pageNumber:${pageNumber}`)
      }} />
    )
  }
}
```
<!--End-->

### 对齐

目前有三种对齐方式 `左边(left)`、`中间(center)`、`右边(right)`

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    let cls = {padding: "10px 10px",background: "#f5f5f5",marginBottom:20}
    let clsLast = {padding: "10px 10px",background: "#f5f5f5",marginBottom:0}
    return (
      <div>
        <div style={cls}>
          <Paging activePage={5} total={250} onChange={(pageNumber) => { 
            console.log(`pageNumber:${pageNumber}`)
          }} />
        </div>
        <div style={cls}>
          <Paging alignment="center" activePage={5} total={250}  onChange={(pageNumber) => { 
            console.log(`pageNumber:${pageNumber}`)
          }} />
        </div>
        <div style={clsLast}>
          <Paging alignment="right" activePage={5} total={250}  onChange={(pageNumber) => { 
            console.log(`pageNumber:${pageNumber}`)
          }} />
        </div>
      </div>
    )
  }
}
```
<!--End-->

## API

### Paging Attributes

| 参数 | 说明 | 类型 | 默认值 |
|------ |-------- |---------- |-------- |
| total | 数据总数 | Number | 0 |
| size | 当为`small`时，是小尺寸分页 | String | - |
| alignment | 对齐 | Enum{`left`, `center`, `right`} | `left` |
| activePage | 当前页数，选中的页数 | Number | 1 |
| pageSize | 每页条数 | Number | 10 |
| onChange | 页码改变的回调，返回改变后的页码 | Function(activePage,total,pageSize) | - |