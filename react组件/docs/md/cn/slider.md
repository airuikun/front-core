Slider 滑块
===

通过拖动滑块在一个固定区间内进行选择

### 基本用法

按钮样式的单选组合。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 20
    }
  }
  render() {
    return (
      <div>
        <Slider value={this.state.value} 
          onChange={(value)=>console.log(`Value: ${value}`)} 
          onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
        />
      </div>
    )
  }
}
```
<!--End-->


### 禁用

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50
    }
  }
  render() {
    return (
      <div>
        <Slider disabled value={this.state.value} 
          onChange={(value)=>console.log(`Value: ${value}`)} 
          onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
        />
      </div>
    )
  }
}
```
<!--End-->


### 设置颜色

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Slider  
          color="#57a2ff"
          value={50} 
          onChange={(value)=>console.log(`Value: ${value}`)} 
          onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
        />
        <Slider  
          color="#d700da"
          value={20} 
          onChange={(value)=>console.log(`Value: ${value}`)} 
          onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
        />
      </div>
    )
  }
}
```
<!--End-->


### 垂直方向

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 20
    }
  }
  render() {
    return (
      <div style={{height:200}}>
        <Slider disabled style={{display:'inline-block'}} vertical value={this.state.value} 
          onChange={(value)=>console.log(`Value: ${value}`)} 
          onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
        />
        <Slider style={{display:'inline-block'}} vertical value={70} 
          //onChange={(value)=>console.log(`Value: ${value}`)} 
          //onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
        />
      </div>
    )
  }
}
```
<!--End-->

### 离散值

选项可以是离散的。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      marks:{
        0:"0°C",
        10:"10°C",
        20:"20°C",
        100:{
          style: {
            color: '#f50',
          },
          label: <strong>100°C</strong>,
        },
      },
      marks2:{
        0:"0°C",
        20:"20°C",
        40:"40°C",
        60:"60°C",
        80:"80°C",
        100:{
          style: {
            color: '#f50',
          },
          label: <strong>100°C</strong>,
        },
      }
    }
  }
  render() {
    return (
      <div>
        <div style={{height:80,padding: "30px 10px", overflow: "hidden"}}>
          <Slider value={20}
            marks={this.state.marks} 
            step={10}
            dots={true}
            onChange={(value)=>{
              this.setState({
                value:value
              })
              console.log(`Value: ${value}`)
            }} 
            onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
          />
        </div>
        <div style={{height:40,padding: "0px 10px"}}>
          <Slider value={30}
            marks={true} 
            step={10}
            onChange={(value)=>{
              this.setState({
                value:value
              })
              console.log(`Value: ${value}`)
            }} 
            onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
          />
        </div>
        <div style={{height:200,width:100,display:'inline-block'}}>
          <Slider value={40}
            marks={{
              20:"20°C"
            }} 
            vertical
            step={10}
            onChange={(value)=>{
              this.setState({
                value:value
              })
              console.log(`Value: ${value}`,value)
            }} 
            onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
          />
        </div>
        <div style={{height:200,display:'inline-block'}}>
          <Slider 
            value={80}
            marks={this.state.marks2} 
            vertical
            step={20}
            dots={true}
            onChange={(value)=>{
              this.setState({
                value:value
              })
              console.log(`Value: ${value}`)
            }} 
            onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
          />
        </div>
      </div>
    )
  }
}
```
<!--End-->



### 区间范围选择

选择某一数值范围。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      marks:{
        [-50]:{
          style: { color: '#007cce'},
          label: "-50°C",
        },
        [-40]:{
          style: { color: '#0094f5'},
          label: "-40°C",
        },
        [-30]:"-30°C",
        [-20]:"-20°C",
        [-10]:"-10°C",
        0:"0°C",
        10:"10°C",
        20:"20°C",
        30:{
          style: { color: '#f50'},
          label: "30°C",
        },
        40:"40°C",
        50:"50°C",
      },
      marks2:{
        0:"0°C",
        10:"10°C",
        20:"20°C",
        30:{
          style: {
            color: '#f50',
          },
          label: <strong>30°C</strong>,
        },
        40:"40°C",
        50:"50°C",
      },
    }
  }
  render() {
    return (
      <div>
        <div style={{height:80,padding: "30px 10px", overflow: "hidden"}}>
          <Slider value={[0,30]}
            marks={this.state.marks} 
            max={50}
            min={-50}
            step={10}
            dots={true}
            onChange={(value)=>{
              console.log(`Value: ${value}`)
            }} 
            //onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
          />
        </div>
        <div style={{height:200,width:150,display:'inline-block'}}>
          <Slider value={[0,30]}
            marks={this.state.marks2} 
            max={50}
            vertical
            step={10}
            dots={true}
            onChange={(value)=>{
              console.log(`Value: ${value}`)
            }} 
            //onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
          />
        </div>
        <div style={{height:200,display:'inline-block'}}>
          <Slider value={[0,30]}
            marks={this.state.marks} 
            max={50}
            min={-50}
            vertical
            step={10}
            dots={true}
            onChange={(value)=>{
              console.log(`Value: ${value}`)
            }} 
            //onDragChange={(value)=>console.log(`Drag value: ${value}`)} 
          />
        </div>
      </div>
    )
  }
}
```
<!--End-->


## API

### Slider

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 选择的数值，为数组时即可开启范围选择，并且指定范围 | Number/Number[] | `0` |
| min | 最小值 | Number | `0` |
| max | 最大值 | Number | `100` |
| disabled | 是否禁用 | Boolean | `false` |
| step | 间步长度 | Number | `1` |
| dots | 是否只能拖拽到刻度上 | Boolean | `false` |
| marks | 刻度标记，`key` 的类型必须为 `number` 且取值在闭区间 `min`, `max` 内，每个标签可以单独设置样式，当值为`Boolean`值时表示是否显示刻度 | Object/Boolean | - |
| tooltip | 是否显示提示 | Boolean | `ture` |
| vertical | 值为 `true` 时，`Slider` 为垂直方向 | Boolean | `false` |
| onDragChange | 拖拽，值改变时触发 | Function(value) | - |
| onChange | 值改变时触发 | Function(value) | - |
