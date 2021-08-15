Rate 评分
===

评分组件


### 基本用法

按钮样式的单选组合。

<!--DemoStart--> 
```js
render() {
  return (
    <Rate/>
  )
}
```
<!--End-->


### 只读

按钮样式的单选组合。

<!--DemoStart--> 
```js
render() {
  return (
    <Rate value={2} disabled={true}/>
  )
}
```
<!--End-->


### 颜色

按钮样式的单选组合。

<!--DemoStart--> 
```js
render() {
  return (
    <div>
      <Rate value={2} color="#d80000"/> <br/>
      <Rate value={3.5} allowHalf={true} color="#16a900"/>
    </div>
  )
}
```
<!--End-->


### 文本展现

按钮样式的单选组合。

<!--DemoStart--> 
```js
constructor(props){
  super(props);
  this.state={
    value:0,
    hoverValue:0,
  };
}
handleChange(e,value){
  this.setState({ value });
}
render() {
  const { value,hoverValue } = this.state;
  let str = '极差';
  let _value = hoverValue>0 ? hoverValue :value;
  switch(_value){
    case 0:str='没有状态';break;
    case 1:str='极差';break;
    case 2:str='失望';break;
    case 3:str='一般';break;
    case 4:str='满意';break;
    case 5:str='惊喜';break;
  }
  return (
    <span>
      <Rate onChange={this.handleChange.bind(this)} value={value} onHoverChange={(e,v)=>this.setState({hoverValue:v})} />
      {value >-1&& <span> {str} </span>}
      {hoverValue >-1&& <span>, hover {hoverValue} stars</span>}
    </span>
  );
}
```
<!--End-->


### 允许半选

可支持鼠标选择半星。

<!--DemoStart--> 
```js
render() {
  return <Rate value={2.5} allowHalf={true} onChange={(e,val) => console.log(val)} />
}
```
<!--End-->



## API

### Rate

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 根据 value 进行比较，判断是否选中 | Number | - |
| count | star 总数 | Number | `5` |
| disabled | 只读，无法进行交互 | Boolean | `false` |
| allowHalf | 是否允许半选 | Boolean | `false` |
| character | 自定义字符 | ReactNode | - |
| color | 自定义Star的颜色 | String | - |
| className | 自定义样式类名 | String | - |
| onChange | 数值改变时的回调，返回当前值 | Funtcion(e:Even,value) | - |
| onHoverChange | 鼠标经过时数值变化的回调 | Funtcion(e:Even,value) | - |