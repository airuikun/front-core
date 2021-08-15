Table 表格
===

用于页面中展示重要的提示信息。


### 基本用法

⚠️  columns 中的 key 很重要，在一个表中是唯一的。这个key 对应数据中的key，保持一致，columns中的render函数才会有作用。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "姓名", key: "name", width: 180 },
        {title: "年龄", key: "age", width: 180 },
        {title: "地址", key: "info"},
        {
          title: "操作",
          key: "edit",
          width: 110,
          render: (text, row, index) => {
            const ButtonGroup = Button.Group;
            return (
              <div>
                <Button size="mini" type="danger">删除</Button>
                <Button size="mini" type="success">修改</Button>
              </div>
            )
          },
        }
      ],
      dataSource:[
{name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。',edit:""},
{name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人',edit:""},
{name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手',edit:""},
{name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。',edit:""},
{name: 'Angelababy', age: '54', info: '1989年2月28日出生于上海市，华语影视女演员、时尚模特。',edit:""},
{name: '唐嫣', age: '12', info: '1983年12月6日出生于上海市，毕业于中央戏剧学院表演系本科班',edit:""},
{name: '吴亦凡', age: '4', info: '1990年11月06日出生于广东省广州市，华语影视男演员、流行乐歌手。',edit:""},
      ]
    }
  }
  render() {
    return (
      <Table data={this.state.dataSource} columns={this.state.columns}/>
    )
  }
}
```
<!--End-->

### 暂无数据

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "姓名", key: "name", width: 180 },
        {title: "年龄", key: "age", width: 180 },
        {title: "地址", key: "info"},
        {
          title: "操作",
          key: "edit",
          width: 110,
          render: (text, row, index) => {
            const ButtonGroup = Button.Group;
            return (
              <div>
                <Button size="mini" type="danger">删除</Button>
                <Button size="mini" type="success">修改</Button>
              </div>
            )
          },
        }
      ],
      dataSource:[]
    }
  }
  render() {
    return (
      <Table data={this.state.dataSource} columns={this.state.columns}/>
    )
  }
}
```
<!--End-->


### 列数据在数据项

通过设置 `columns` 参数 `dataIndex`值，指定 `data` 参数中的 `key` 对应的值，默认情况表格的单元格，是按照顺序生成单元格。

下面数据清晰对比有`dataIndex`和没有`dataIndex`的区别。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "姓名", key: "age",  width: 160},
        {title: "年龄", key: "name", dataIndex: 'name',  width: 160},
        {
          title: "操作",
          key: "edit",
          dataIndex: 'edit',
          width: 110,
          render: (text, row, index) => {
            const ButtonGroup = Button.Group;
            return (
              <span>
                <Button size="mini" type="danger">删除{text}</Button>
                <Button size="mini" type="success">修改</Button>
              </span>
            )
          },
        },
        {title: "说明", key: "info", width: 160},
        
      ],
      dataSource:[
        {name: '邓紫棋', age: '12', edit:"11", info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。'},
        {name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。',edit:"11"},
      ]
    }
  }
  render() {
    return (
      <Table 
        data={this.state.dataSource} 
        columns={this.state.columns}/>
    )
  }
}
```
<!--End-->

### 带表头标题和页脚

通过设置 `caption` 和 `footer` 来设置表的标题

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paging:{
          activePage:5,
          total:250,
      },
      columns: [
        {title: "姓名", key: "name", width: 180 },
        {title: "年龄", key: "age", width: 180 },
        {title: "地址", key: "info"}
      ],
      dataSource:[
    {name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。'},
    {name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人'},
    {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手'},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。'},
    {name: 'Angelababy', age: '54', info: '1989年2月28日出生于上海市，华语影视女演员、时尚模特。'},
    {name: '唐嫣', age: '12', info: '1983年12月6日出生于上海市，毕业于中央戏剧学院表演系本科班'},
    {name: '吴亦凡', age: '4', info: '1990年11月06日出生于广东省广州市，华语影视男演员、流行乐歌手。'},
      ]
    }
  }
  render() {
    return (
      <Table 
        paging={this.state.paging}
        caption={<div>明星基本信息</div>}
        footer={<div>更新于1983年12月6日</div>}
        data={this.state.dataSource} 
        columns={this.state.columns}/>
    )
  }
}
```
<!--End-->

### 带加载状态的表

⚠️  columns 中的 key 很重要，在一个表中是唯一的。这个key 对应数据中的key，保持一致，columns中的render函数才会有作用。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      paging:{
          activePage:5,
          total:250,
          onChange:this.handleTableChange.bind(this)
      },
      columns: [
        {title: "姓名", key: "name", width: 180 },
        {title: "年龄", key: "age", width: 180 },
        {title: "地址", key: "info"}
      ],
      dataSource:[
  {name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。'},
  {name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人'},
  {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手'},
  {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。'},
  {name: 'Angelababy', age: '54', info: '1989年2月28日出生于上海市，华语影视女演员、时尚模特。'},
  {name: '唐嫣', age: '12', info: '1983年12月6日出生于上海市，毕业于中央戏剧学院表演系本科班'},
  {name: '吴亦凡', age: '4', info: '1990年11月06日出生于广东省广州市，华语影视男演员、流行乐歌手。'},
      ]
    }
  }

  handleTableChange(activePage,total,pageSize){

    this.setState({
      loading:true,
      activePage:activePage
    })

    setTimeout(()=>{

      this.setState({
        loading:false
      })

    },2000)
    
  }
  render() {
    return (
      <Table 
        data={this.state.dataSource} 
        paging={this.state.paging}
        loading={this.state.loading}
        columns={this.state.columns}
      />
    )
  }
}
```
<!--End-->

### 表头分组

表头分组通过 `children` 来实现，复制的表头，需要设置每列的`width`，不然无法对齐表格。

<!--DemoStart--> 
对应数据中的key，保持一致，columns中的render函数才会有作用。
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paging:{
          activePage:5,
          total:250,
      },
      columns: [
          {
            title: '姓名',
            key: 'name', 
            children:[
              {
                title: '中文名字',
                key: 'enname',
                children:[
                  {
                    title: '姓',
                    key: 'firstname',
                    children:[
                      {title: '祖姓', key: 'firstname_wcj', width: 150, },
                      {title: '先姓', key: 'lastname_wcj', width: 150, }
                    ]
                  },{
                    title: '名',
                    key: 'lastname',
                    children:[
                      {title: '谱名', width: 150, key: 'puname'},
                      {title: '名', width: 150, key: 'lastpuname'}
                    ]
                  }
                ]
              },{
                title: '英文名字',
                key: 'cnname'
              }
            ]
          }, {
            title: '公司',
            key: 'company',
            children:[
              {title: '地址', width: 150, key: 'companyaddress'},
              {title: '公司名字', width: 150, key: 'companyname'}
            ]
          }, {
            title: '操作',
            key: 'edit',
            width: 150,
            render: (text, row, index) => <a href="#" onClick={()=>{
              console.log(text,row, index)
            }}>{text}</a>,
          }
      ],
      dataSource:[
        {firstname_wcj: '周', lastname_wcj: '杰伦', puname:"street", lastpuname:"street", cnname: 32, companyaddress: '亮金信息科技', companyname: '亮金', edit: '编辑11'},
        {firstname_wcj: '周', lastname_wcj: '杰伦', puname:"street", lastpuname:"street", cnname: 32, companyaddress: '亮金信息科技', companyname: '亮金', edit: '编辑11'},
        {firstname_wcj: '周', lastname_wcj: '杰伦', puname:"street", lastpuname:"street", cnname: 32, companyaddress: '亮金信息科技', companyname: '亮金', edit: '编辑11'},
        {firstname_wcj: '周', lastname_wcj: '杰伦', puname:"street", lastpuname:"street", cnname: 32, companyaddress: '亮金信息科技', companyname: '亮金', edit: '编辑11'},
        {firstname_wcj: '周', lastname_wcj: '杰伦', puname:"street", lastpuname:"street", cnname: 32, companyaddress: '亮金信息科技', companyname: '亮金', edit: '编辑11'},
        {firstname_wcj: '周', lastname_wcj: '杰伦', puname:"street", lastpuname:"street", cnname: 32, companyaddress: '亮金信息科技', companyname: '亮金', edit: '编辑11'},
      ]
    }
  }
  render() {
    return (
      <Table 
        paging={this.state.paging}
        width={2000}
        footer={<div>更新于1983年12月6日</div>}
        data={this.state.dataSource} columns={this.state.columns}/>
    )
  }
}
```
<!--End-->

### 固定表头

固定表头通过设置表格 `height` 来实现。

<!--DemoStart--> 
对应数据中的key，保持一致，columns中的render函数才会有作用。
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paging:{
          activePage:5,
          total:250,
      },
      columns: [
        {title: "姓名", key: "name", width: 180 },
        {title: "年龄", key: "age", width: 180 },
        {title: "地址", key: "info"}
      ],
      dataSource:[
    {name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。'},
    {name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人'},
    {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手'},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。'},
    {name: 'Angelababy', age: '54', info: '1989年2月28日出生于上海市，华语影视女演员、时尚模特。'},
    {name: '唐嫣', age: '12', info: '1983年12月6日出生于上海市，毕业于中央戏剧学院表演系本科班'},
    {name: '吴亦凡', age: '4', info: '1990年11月06日出生于广东省广州市，华语影视男演员、流行乐歌手。'},
    {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手'},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。'},
    {name: 'Angelababy', age: '54', info: '1989年2月28日出生于上海市，华语影视女演员、时尚模特。'},
    {name: '唐嫣', age: '12', info: '1983年12月6日出生于上海市，毕业于中央戏剧学院表演系本科班'},
    {name: '吴亦凡', age: '4', info: '1990年11月06日出生于广东省广州市，华语影视男演员、流行乐歌手。'},
      ]
    }
  }
  render() {
    return (
      <Table height={300} 
      paging={this.state.paging}
      data={this.state.dataSource} columns={this.state.columns}/>
    )
  }
}
```
<!--End-->


### 选择功能的配置

通过 rowSelection 自定义选择项，默认rowSelection 存在就会有选择功能呢。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "姓名", key: "name", width: 180 },
        {title: "年龄", key: "age", width: 180 },
        {title: "地址", key: "info"}
      ],
      dataSource:[
    {_checked:true,name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。'},
    {_disabled:true,name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人'},
    {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手'},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。'},
      ]
    }
  }
  render() {
    return (
      <Table 
        rowSelection={{
          onSelectAll:(selectDatas,checked,e)=>{
            console.log("所有选择的数据：",selectDatas)
            console.log("是否选中：",checked)
          },
          onSelect:(row,number,checked,allChecked,e)=>{ //选中行的数据, 选中的行数, 是否选中, 选中的所有数据,e
            console.log("选中行的数据row:",row)
            console.log("选中的行数number:",number)
            console.log("是否选中checked:",checked)
            console.log("选中的所有数据allChecked:",allChecked)
            console.log("Evn:",e)
          }
        }}
        data={this.state.dataSource} 
        columns={this.state.columns}/>
    )
  }
}
```
<!--End-->

### 固定表头和列

通过设置属性 `height` 给表格指定高度后，会自动固定表头，当纵向内容过多时可以使用。  
通过设置属性 `width` 来实现横向滚动条，设置columns 的 `fixed: 'right'` 属性来固定列。   
固定列必须设置Tables属性`width`，如果表头与内容无法对其，设置 `columns` 的属性 `width` 。  

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "姓名", key: "name", width: 180, fixed: 'left'},
        {title: "年龄", key: "age", width: 180 },
        {title: "地址", key: "info"}, 
        {
          title: '操作',
          key: 'edit',
          width: 60,
          fixed: 'right',
          render: (text, row, index) => <a href="javascript:void(0)" onClick={()=>{
            console.log("--->",text,row, index)
          }}>{text}</a>,
        }
      ],
      dataSource:[
    {_checked:true,name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港创作型女歌手。',edit:"编辑"},
    {_disabled:true,name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人',edit:"编辑"},
    {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手',edit:"编辑"},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。',edit:"编辑"},
    {_disabled:true,name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人',edit:"编辑"},
    {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手',edit:"编辑"},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。',edit:"编辑"},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。',edit:"编辑"},
    {_disabled:true,name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人',edit:"编辑"},
    {name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手',edit:"编辑"},
    {name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。',edit:"编辑"},
      ]
    }
  }
  render() {
    return (
      <Table 
        height={200}
        width={2000}
        rowSelection={{
          onSelectAll:(selectDatas,checked,e)=>{
            console.log("选择或取消选择所有选项！",selectDatas)
          },
          onSelect:()=>{
            console.log("选择单行选项！")
          }
        }}
        data={this.state.dataSource} 
        columns={this.state.columns}/>
    )
  }
}
```
<!--End-->

## API

### Table 

| 参数 | 说明 | 类型 | 默认值 |
|------ |-------- |---------- |-------- |
| options | 指定可选项 | string[] | [] |
| caption | 表格标题 | Function | - |
| footer | 表格尾部 | Function | - |
| height | 通过设置属性 height 给表格指定高度后，会自动固定表头。当纵向内容过多时可以使用。 | number | - |
| width | 设置属性 width 出现横向滚动条，若列头与内容不对齐，请指定列的宽度 width | number | - |
| defaultChecked | 默认选中的选项 | string | [] |
| onChange | 变化时回调函数 | Function(checkedValues:Array, value:String, checked:Boolean, e:Event) | - |
| showHeader | 是否显示表头 | Boolean | `true` |
| paging | 分页器，配置项参考 paging，设为 false 时不展示和进行分页 | Object | - |
| rowSelection | 选择功能的配置。方法参考下面 `rowSelection` 文档 | Object | - |
| rowClassName | 表格行的类名 | Function(record, index):string | - |


### Table Column

列描述数据对象，是 columns 中的一项，`Column` 使用相同的 API。

| 参数 | 说明 | 类型 | 默认值 |
|------ |-------- |---------- |-------- |
| width | 列宽度 | string | - |
| dataIndex | 列数据在数据项中对应的 `key` | Function | string |
| fixed | 列是否固定，`left`、`right` | string | - |
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并 | Function(text, rowData, index) {} | - |
| className | 列的 className | string | - |
| onCellClick | 单元格点击回调 | Function(cellData, colNumber, rowNum, columnKey, rowData, ischecked, event) | - |

### Table rowSelection

选择功能的配置。

| 参数 | 说明 | 类型 | 默认值 |
|------ |-------- |---------- |-------- |
| onSelect | 用户手动选择/取消选择某一行的回调，配置onSelect | Function(选中行的数据, 选中的行数, 是否选中, 选中的所有数据,e) | - |
| onSelectAll | 用户手动选择/取消选择所有列的回调 | Function(selectedRowKeys, selectedRows) | - |

### Table data

Tables中的data描述数, 注意参数是有顺序的，必须放置最前面

| 参数 | 说明 | 类型 | 默认值 |
|------ |-------- |---------- |-------- |
| _checked  | 给 data 项设置特殊 key `_checked: true` 可以默认选中当前项。 | Boolean | false | 
| _disabled  | 给 data 项设置特殊 key `_disabled: true` 可以禁止选择当前项。 | Boolean | false | 
| ~~`_select`~~ | 特殊`key:_select`，框架内部使用，请不要设置 | - | - | 
