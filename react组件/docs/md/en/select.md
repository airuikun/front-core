Select 选择器
===

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选`value`的值为当前被选中的Option的 `value` 属性值

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    options: [
      { value: '选项1', label: '红葡萄酒' }, 
      { value: '选项2', label: '绍兴黄酒', disabled: true}, 
      { value: '选项3', label: '燕京啤酒' }, 
      { value: '选项4', label: '楚乡王白酒' }, 
      { value: '选项5', label: '五粮液' },
      { value: '选项6', label: '绍兴黄酒', disabled: true}, 
      { value: '选项7', label: '燕京啤酒' }, 
      { value: '选项8', label: '楚乡王白酒' }, 
      { value: '选项9', label: '五粮液' },
      { value: '选项10', label: '红葡萄酒' }, 
      { value: '选项11', label: '红葡萄酒' }, 
      { value: '选项12', label: '绍兴黄酒', disabled: true}, 
      { value: '选项13', label: '燕京啤酒' }, 
      { value: '选项14', label: '楚乡王白酒' }, 
      { value: '选项15', label: '五粮液' },
      { value: '选项16', label: '绍兴黄酒', disabled: true}, 
      { value: '选项17', label: '燕京啤酒' }, 
      { value: '选项18', label: '楚乡王白酒' }, 
      { value: '选项19', label: '五粮液' },
    ],
    value: '选项1'
  };
}
onChange(e,value){
  console.log("onChange:",value,e)
}
render() {
  return (
    <Select onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
      {
        this.state.options.map(elm => {
          return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
        })
      }
    </Select>
  )
}
```
<!--End-->

### 禁用状态

`Select`设置`disabled`属性，则整个选择器不可用。单个选项禁用，`Option`设置`disabled`属性即可。

<!--DemoStart--> 
```js
constructor(props) {
  super(props);

  this.state = {
    options: [
      { value: '选项1', label: '红葡萄酒' }, 
      { value: '选项2', label: '绍兴黄酒' }, 
      { value: '选项3', label: '燕京啤酒' }, 
      { value: '选项4', label: '楚乡王白酒' }, 
      { value: '选项5', label: '五粮液' },
    ],
    value: ''
  };
}
render() {
  return (
    <Select style={{width:200}} value={this.state.value} disabled={true}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} />
        })
      }
    </Select>
  )
}
```
<!--End-->


### 自定义模板

可以自定义备选项。

<!--DemoStart--> 
将自定义的 `HTML` 模板插入`Option`中即可。
```js
constructor(props) {
  super(props);
  this.state = {
    cities: [
      { value: 'Beijing', label: '北京' }, 
      { value: 'Shanghai', label: '上海' }, 
      { value: 'Nanjing', label: '南京', disabled: true }, 
      { value: 'Chengdu', label: '成都' }, 
      { value: 'Shenzhen', label: '深圳' }, 
      { value: 'Guangzhou', label: '广州' }
    ],
    value: ''
  };
}
render() {
  const {OptionGroup,Option} = Select
  return (
    <Select style={{width:200}} value={this.state.value}>
      {
        this.state.cities.map((elm,idx) => {
          return (
            <Option key={idx} label={elm.label} value={elm.value} disabled={elm.disabled}>
              <span style={{float: 'left'}}>{elm.label}</span>
              <span style={{float: 'right'}}>{elm.value}</span>
            </Option>
          )
        })
      }
    </Select>
  )
}
```
<!--End-->


### 可清空单选

包含清空按钮，可将选择器清空为初始状态。

<!--DemoStart--> 
为`Select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
```js
constructor(props) {
  super(props);
  this.state = {
    options: [
      { value: '选项1', label: '红葡萄酒' }, 
      { value: '选项2', label: '绍兴黄酒', disabled: true}, 
      { value: '选项3', label: '燕京啤酒' }, 
      { value: '选项4', label: '楚乡王白酒' }, 
      { value: '选项5', label: '五粮液' },
      { value: '选项6', label: '绍兴黄酒', disabled: true}, 
      { value: '选项7', label: '燕京啤酒' }, 
    ],
    value: '选项1'
  };
}
onChange(e,value){
  console.log("onChange:",value,e)
}
render() {
  return (
    <div>
      <Select clearable={true} onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
        {
          this.state.options.map(elm => {
            return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
          })
        }
      </Select>
    </div>
  )
}
```
<!--End-->

### 带搜索框

展开后可对选项进行搜索。

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    options: [
      { value: '选项1', label: '红葡萄酒' }, 
      { value: '选项2', label: '绍兴黄酒', disabled: true}, 
      { value: '选项3', label: '燕京啤酒' }, 
      { value: '选项4', label: '楚乡王白酒' }, 
      { value: '选项5', label: '五粮液' },
      { value: '选项6', label: '绍兴黄酒', disabled: true}, 
      { value: '选项7', label: '燕京啤酒' }, 
    ],
    value: ''
  };
}
onChange(e,value){
  console.log("onChange:",value,e)
}
render() {
  return (
    <div>
      <Select filterable={true} onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
        {
          this.state.options.map(elm => {
            return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
          })
        }
      </Select>
    </div>
  )
}
```
<!--End-->

### 多选标签搜索

用 `Tag` 展示已选择的项，需要设置`multiple=true`，`filterable=true`。

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    options: [
      { value: '选项1', label: '红葡萄酒' }, 
      { value: '选项2', label: '绍兴黄酒'}, 
      { value: '选项3', label: '燕京啤酒' }, 
      { value: '选项4', label: '楚乡王白酒' }, 
      { value: '选项5', label: '五粮液' },
      { value: '选项6', label: '绍兴黄酒', disabled: true}, 
      { value: '选项7', label: '燕京啤酒' }, 
      { value: '选项8', label: '楚乡王白酒' }, 
      { value: '选项9', label: '五粮液' },
    ],
    value: ['选项1','选项3','选项5'],
  };
}
onChange(e,value,values){
  console.log("onChange:",value,values,e)
}
render() {
  return (
    <Select onChange={this.onChange.bind(this)} filterable={true} multiple={true} style={{width:500}} value={this.state.value}>
      {
        this.state.options.map((elm,idx) => {
          return <Select.Option key={idx} label={elm.label} value={elm.value} disabled={elm.disabled} />
        })
      }
    </Select>
  )
}
```
<!--End-->

### 分组

备选项进行分组展示。

<!--DemoStart--> 
使用 `OptionGroup` 对备选项进行分组，它的 `label` 属性为分组名。
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      label: '热门城市',
      options: [{
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Beijing',
        label: '北京'
      }]
    }, {
      label: '城市名',
      options: [{
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }, {
        value: 'Dalian',
        label: '大连'
      }]
    }],
    value: ''
  };
}

render() {
  return (
    <Select value={this.state.value}>
      {
        this.state.options.map(group => {
          return (
            <Select.OptionGroup key={group.label} label={group.label}>
              {
                group.options.map(item => {
                  return (
                    <Select.Option key={item.value} label={item.label} value={item.value}>
                      <span style={{float: 'left'}}>{item.label}</span>
                      <span style={{float: 'right', color: '#b9b9b9', fontSize: 13}}>{item.value}</span>
                    </Select.Option>
                  )
                })
              }
            </Select.OptionGroup>
          )
        })
      }
    </Select>
  )
}
```
<!--End-->


### 多选标签

用 `Tag` 展示已选择的项，需要设置`multiple=true`。

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    options: [
      { value: '选项1', label: '红葡萄酒' }, 
      { value: '选项2', label: '绍兴黄酒'}, 
      { value: '选项3', label: '燕京啤酒' }, 
      { value: '选项4', label: '楚乡王白酒' }, 
      { value: '选项5', label: '五粮液' },
      { value: '选项6', label: '绍兴黄酒', disabled: true}, 
      { value: '选项7', label: '燕京啤酒' }, 
      { value: '选项8', label: '楚乡王白酒' }, 
      { value: '选项9', label: '五粮液' },
    ],
    value: ['选项1','选项3','选项5'],
  };
}
onChange(e,value,values){
  console.log("onChange:",value,values,e)
}
render() {
  return (
    <Select onChange={this.onChange.bind(this)} multiple={true} style={{width:200}} value={this.state.value}>
      {
        this.state.options.map((elm,idx) => {
          return <Select.Option key={idx} label={elm.label} value={elm.value} disabled={elm.disabled} />
        })
      }
    </Select>
  )
}
```
<!--End-->

### 联动

省市联动是典型的例子。

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    options: [
      { value: 'Shanghai', label: '上海' }, 
      { value: 'Beijing', label: '北京', disabled: true}, 
      { value: 'Shenzhen', label: '深圳' }
    ],
    secondOptions:{
      'Shanghai':[
        { value: '001', label: '静安区' }, 
        { value: '002', label: '青浦区', disabled: true}, 
      ],
      'Beijing':[
        { value: '001', label: '东城区' }, 
        { value: '002', label: '西城区', disabled: true}, 
        { value: '003', label: '朝阳区', disabled: true}, 
      ]
    },
    secondOptionsEmpty:[],
    value: '',
    valueSecond: ''
  };
}
onChange(e,value){
  console.log("onChange:",value,e)
}
render() {
  return (
    <div>
      <Select style={{width:100}} onChange={(e,value)=>{
        this.setState({
          secondOptionsEmpty:this.state.secondOptions[value] || [],
          value:e.props.label,
          valueSecond:""
        })

      }} value={this.state.value}>
        {
          this.state.options.map(el => {
            return <Select.Option key={el.value} label={el.label} value={el.value} />
          })
        }
      </Select>
      <Select style={{width:100}} onChange={(e,value)=>{
        
        this.setState({
          valueSecond:e.props.label
        })

      }} value={this.state.valueSecond}>
        {
          this.state.secondOptionsEmpty.map(el => {
            return <Select.Option key={el.value} label={el.label} value={el.value} />
          })
        }
      </Select>
      <div style={{paddingTop:10}}>
      您选择了：{`${this.state.value}-${this.state.valueSecond}`}
      </div>
    </div>
  )
}
```
<!--End-->


### 三种大小

选择框大小，可选 `large`, `small`, `default`, `mini`, 输入框高度为 `34px` `26px` 和 `20px` ，默认高度为 `30px`。

<!--DemoStart--> 
```js
constructor(props) {
  super(props);
  this.state = {
    options: [
      { value: '选项1', label: '红葡萄酒' }, 
      { value: '选项2', label: '绍兴黄酒', disabled: true}, 
      { value: '选项3', label: '燕京啤酒' }, 
      { value: '选项4', label: '楚乡王白酒' }, 
      { value: '选项5', label: '五粮液' },
      { value: '选项6', label: '绍兴黄酒', disabled: true}, 
      { value: '选项7', label: '燕京啤酒' }, 
    ],
    value: '选项1'
  };
}
onChange(e,value){
  console.log("onChange:",value,e)
}
render() {
  return (
    <div>
      <div>
        <Select size="large" onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
          {
            this.state.options.map(elm => {
              return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
            })
          }
        </Select>
        <Select onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
          {
            this.state.options.map(elm => {
              return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
            })
          }
        </Select>
        <Select size="small" onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
          {
            this.state.options.map(elm => {
              return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
            })
          }
        </Select>
        <Select size="mini" onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
          {
            this.state.options.map(elm => {
              return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
            })
          }
        </Select>
      </div>
    </div>
  )
}
```
<!--End-->

## API

### Select

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 指定当前选中的条目，值为`value` 或`label` | String/String[] | - |
| name | `Select` 是通过 `input` 实现的，这里是设置 `name` 的属性 | String | - |
| placeholder | 这里是 `input` 占位符 | String | `请选择` |
| disabled | 是否禁用 | Boolean | false |
| multiple | 是否可多选 | Boolean | false |
| filterable | 是否可搜索，设置`true`组件可以输入文字 | Boolean | false |
| clearable | 是否可多选 | Boolean | false |
| onChange | 选中值发生变化时触发 | function(option, curruntValue,values[]) | - |

### Option

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 指定当前选中的条目，`必填`选项 | String/String[] | - |
| disabled | 是否禁用 | Boolean | false |
| label | 选项的标签，若不设置则默认与 `value` 相同，`选填` | String/Number | - |
