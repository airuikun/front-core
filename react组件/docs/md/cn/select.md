Select 选择器
===

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选`value`的值为当前被选中的Option的 `value` 属性值

<!--DemoStart--> 
```js
class Demo extends Component {
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
  onChange(e, value) {
    this.setState({ value });
    console.log('onChange:', value, e);
  }
  onSelectChange(e, value) {
    console.log('onChange:', value, e);
  }
  render() {
    return (
      <div>
        <Select onChange={this.onSelectChange.bind(this)} style={{ width: 200 }}>
          <Select.Option label="普通管理员" value="0" />
          <Select.Option label="管理员" value="1" />
        </Select>
        <Select onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value}>
          {
            this.state.options.map(elm => {
              return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
            })
          }
        </Select>
      </div>
    )
  }
}
```
<!--End-->

### 禁用状态

`Select`设置`disabled`属性，则整个选择器不可用。单个选项禁用，`Option`设置`disabled`属性即可。

<!--DemoStart--> 
```js
class Demo extends Component {
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
  onChange(e, d) {
    console.log('~~', e, d);
  }
  render() {
    return (
      <Select onChange={this.onChange.bind(this)} style={{width:200}} value={this.state.value} disabled={true}>
        {
          this.state.options.map(el => {
            return <Select.Option key={el.value} label={el.label} value={el.value} />
          })
        }
      </Select>
    )
  }
}
```
<!--End-->


### 自定义模板

可以自定义备选项。

<!--DemoStart--> 
将自定义的 `HTML` 模板插入`Option`中即可。
```js
class Demo extends Component {
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
      value: '',
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
}
```
<!--End-->


### 可清空单选

包含清空按钮，可将选择器清空为初始状态。

<!--DemoStart--> 
为`Select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
```js
class Demo extends Component {
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
    this.setState({ value });
    console.log('onChange:', value, e);
  }
  onClear(state){
    console.log('onChange:', state);
  }
  render() {
    return (
      <div>
        <Select
          clearable={true}
          onClear={this.onClear.bind(this)}
          onChange={this.onChange.bind(this)}
          style={{width:200}}
          value={this.state.value}
        >
          {
            this.state.options.map(elm => {
              return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
            })
          }
        </Select>
      </div>
    )
  }
}
```
<!--End-->

### 带搜索框

展开后可对选项进行搜索。

<!--DemoStart--> 
```js
class Demo extends Component {
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
      value: '',
    };
  }
  onChange(e,value){
    this.setState({ value });
    console.log('onChange:', value, e);
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
}
```
<!--End-->


### 远程搜索

从服务器搜索数据，输入关键字进行查找，具有加载状态效果。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      states: [
        { value: "沃尔玛（WAL-MART STORES)", label: "沃尔玛（WAL-MART STORES)" },
        { value: "国家电网公司（STATE GRID)", label: "国家电网公司（STATE GRID)" },
        { value: "中国石油化工集团公司（SINOPEC GROUP)", label: "中国石油化工集团公司（SINOPEC GROUP)" },
        { value: "中国石油天然气集团公司（CHINA NATIONAL PETROLEUM)", label: "中国石油天然气集团公司（CHINA NATIONAL PETROLEUM)" },
        { value: "丰田汽车公司（TOYOTA MOTOR)", label: "丰田汽车公司（TOYOTA MOTOR)" },
        { value: "大众公司（VOLKSWAGEN)", label: "大众公司（VOLKSWAGEN)" },
        { value: "荷兰皇家壳牌石油公司（ROYAL DUTCH SHELL)", label: "荷兰皇家壳牌石油公司（ROYAL DUTCH SHELL)" },
        { value: "伯克希尔－哈撒韦公司（BERKSHIRE HATHAWAY)", label: "伯克希尔－哈撒韦公司（BERKSHIRE HATHAWAY)" },
        { value: "苹果公司（APPLE)", label: "苹果公司（APPLE)" },
        { value: "埃克森美孚（EXXON MOBIL)", label: "埃克森美孚（EXXON MOBIL)" },
        { value: "麦克森公司（MCKESSON)", label: "麦克森公司（MCKESSON)" },
        { value: "英国石油公司（BP)", label: "英国石油公司（BP)" },
        { value: "联合健康集团（UNITEDHEALTH GROUP)", label: "联合健康集团（UNITEDHEALTH GROUP)" },
        { value: "CVS Health公司（CVS HEALTH)", label: "CVS Health公司（CVS HEALTH)" },
        { value: "三星电子（SAMSUNG ELECTRONICS)", label: "三星电子（SAMSUNG ELECTRONICS)" },
        { value: "嘉能可（GLENCORE)", label: "嘉能可（GLENCORE)" },
        { value: "戴姆勒股份公司（DAIMLER)", label: "戴姆勒股份公司（DAIMLER)" },
        { value: "通用汽车公司（GENERAL MOTORS)", label: "通用汽车公司（GENERAL MOTORS)" },
        { value: "美国电话电报公司（AT&T)", label: "美国电话电报公司（AT&T)" },
        { value: "EXOR集团（EXOR GROUP)", label: "EXOR集团（EXOR GROUP)" },
        { value: "福特汽车公司（FORD MOTOR)", label: "福特汽车公司（FORD MOTOR)" },
        { value: "中国工商银行（INDUSTRIAL & COMMERCIAL BANK OF CHINA)", label: "中国工商银行（INDUSTRIAL & COMMERCIAL BANK OF CHINA)" },
        { value: "美源伯根公司（AMERISOURCEBERGEN)", label: "美源伯根公司（AMERISOURCEBERGEN)" },
        { value: "中国建筑工程总公司（CHINA STATE CONSTRUCTION ENGINEERING)", label: "中国建筑工程总公司（CHINA STATE CONSTRUCTION ENGINEERING)" },
        { value: "安盛（AXA)", label: "安盛（AXA)" },
        { value: "亚马逊（AMAZON.COM)", label: "亚马逊（AMAZON.COM)" },
        { value: "鸿海精密工业股份有限公司（HON HAI PRECISION INDUSTRY)", label: "鸿海精密工业股份有限公司（HON HAI PRECISION INDUSTRY)" },
        { value: "中国建设银行（CHINA CONSTRUCTION BANK)", label: "中国建设银行（CHINA CONSTRUCTION BANK)" },
        { value: "本田汽车（HONDA MOTOR)", label: "本田汽车（HONDA MOTOR)" },
        { value: "道达尔公司（TOTAL)", label: "道达尔公司（TOTAL)" },
        { value: "通用电气公司（GENERAL ELECTRIC)", label: "通用电气公司（GENERAL ELECTRIC)" },
        { value: "威瑞森电信（VERIZON COMMUNICATIONS)", label: "威瑞森电信（VERIZON COMMUNICATIONS)" },
        { value: "日本邮政控股公司（JAPAN POST HOLDINGS)", label: "日本邮政控股公司（JAPAN POST HOLDINGS)" },
        { value: "安联保险集团（ALLIANZ)", label: "安联保险集团（ALLIANZ)" },
        { value: "康德乐（CARDINAL HEALTH)", label: "康德乐（CARDINAL HEALTH)" },
        { value: "好市多（COSTCO WHOLESALE)", label: "好市多（COSTCO WHOLESALE)" },
        { value: "沃博联（WALGREENS BOOTS ALLIANCE)", label: "沃博联（WALGREENS BOOTS ALLIANCE)" },
        { value: "中国农业银行（AGRICULTURAL BANK OF CHINA)", label: "中国农业银行（AGRICULTURAL BANK OF CHINA)" },
        { value: "中国平安保险（集团）股份有限公司（PING AN INSURANCE)", label: "中国平安保险（集团）股份有限公司（PING AN INSURANCE)" },
        { value: "克罗格（KROGER)", label: "克罗格（KROGER)" },
        { value: "上海汽车集团股份有限公司（SAIC MOTOR)", label: "上海汽车集团股份有限公司（SAIC MOTOR)" },
        { value: "中国银行（BANK OF CHINA)", label: "中国银行（BANK OF CHINA)" },
        { value: "法国巴黎银行（BNP PARIBAS)", label: "法国巴黎银行（BNP PARIBAS)" },
        { value: "日产汽车（NISSAN MOTOR)", label: "日产汽车（NISSAN MOTOR)" },
        { value: "雪佛龙（CHEVRON)", label: "雪佛龙（CHEVRON)" },
        { value: "房利美（FANNIE MAE)", label: "房利美（FANNIE MAE)" },
        { value: "中国移动通信集团公司（CHINA MOBILE COMMUNICATIONS)", label: "中国移动通信集团公司（CHINA MOBILE COMMUNICATIONS)" },
        { value: "摩根大通公司（JPMORGAN CHASE & CO.)", label: "摩根大通公司（JPMORGAN CHASE & CO.)" },
        { value: "英国法通保险公司（LEGAL & GENERAL GROUP)", label: "英国法通保险公司（LEGAL & GENERAL GROUP)" },
        { value: "日本电报电话公司（NIPPON TELEGRAPH & TELEPHONE)", label: "日本电报电话公司（NIPPON TELEGRAPH & TELEPHONE)" },
      ],
      value: '',
    }
  }

  onSearch(query) {
    if (!!query) {
      this.setState({
        loading: true
      });
      setTimeout(() => {
        const filter = this.state.states.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.setState({
          loading: false,
          options: filter,
        });
      }, 300);
    } else {
      this.setState({
        options: []
      });
    }
  }
  onChange(option, curruntValue,values) {
    this.setState({ value: curruntValue });
    console.log('~~~~~onChange~~~~~~::', option, curruntValue,values);
  }
  render() {
    return (
      <Select
        value={this.state.value}
        filterable={true}
        onSearch={this.onSearch.bind(this)}
        onChange={this.onChange.bind(this)}
        loading={this.state.loading}
      >
        {
          this.state.options.map(el => {
            return <Select.Option key={el.value} label={el.label} value={el.value} />
          })
        }
      </Select>
    )
  }
}
```
<!--End-->

### 多选标签搜索

用 `Tag` 展示已选择的项，需要设置`multiple=true`，`filterable=true`。

<!--DemoStart--> 
```js
class Demo extends Component {
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
}
```
<!--End-->

### 分组

备选项进行分组展示。

<!--DemoStart--> 
使用 `OptionGroup` 对备选项进行分组，它的 `label` 属性为分组名。
```js
class Demo extends Component {
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
}
```
<!--End-->


### 多选标签

用 `Tag` 展示已选择的项，需要设置`multiple=true`。

<!--DemoStart--> 
```js
class Demo extends Component {
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
}
```
<!--End-->

### 联动

省市联动是典型的例子。

<!--DemoStart--> 
```js
class Demo extends Component {
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
}
```
<!--End-->


### 三种大小

选择框大小，可选 `large`, `small`, `default`, `mini`, 输入框高度为 `34px` `26px` 和 `20px` ，默认高度为 `30px`。

<!--DemoStart--> 
```js
class Demo extends Component {
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
| searchPlaceholder | 搜索结果为空的占位符 | String/ReactNode | `请选择` |
| disabled | 是否禁用 | Boolean | false |
| multiple | 是否可多选 | Boolean | false |
| filterable | 是否可搜索，设置`true`组件可以输入文字 | Boolean | false |
| clearable | 是否可清空单选 | Boolean | false |
| loading | 是否可清空单选 | Boolean | false |
| onChange | 是否正在从远程获取数据 | function(option, curruntValue,values[]) | - |
| onClear | 可清空的单选模式下用户点击清空按钮时触发 | function(state) | - |
| onSearch | 输入值发生变化时触发，此事件配合 `filterable` 和 `loading` 使用 | function(query) | Null |

### Option

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 指定当前选中的条目，`必填`选项 | String/String[] | - |
| disabled | 是否禁用 | Boolean | false |
| label | 选项的标签，若不设置则默认与 `value` 相同，`选填` | String/Number | - |
