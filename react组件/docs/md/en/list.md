List列表
===

列表组件


### 基础用法

<!--DemoStart--> 
```js
const data = [
  '"X战警新变种人"首曝海报特写诡异人脸',
  '六大变五大？传迪士尼600亿收购福斯',
  '快跑!《侏罗纪世界2》正式预告要来了',
]
class Demo extends Component {
  render() {
    return (
      <div>
        <List header={<div>列表头部</div>} footer={<div>列表尾部</div>}>
          <List.Item>"X战警新变种人"首曝海报特写诡异人脸</List.Item>
          <List.Item>六大变五大？传迪士尼600亿收购福斯</List.Item>
          <List.Item>快跑!《侏罗纪世界2》正式预告要来了</List.Item>
        </List>
        <h4 style={{ margin: '16px 10px' }}>默认尺寸，没有头部和尾部</h4>
        <List
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <h4 style={{ margin: '16px 10px' }}>小尺寸</h4>
        <List
          size="small"
          header={<div>列表头部</div>} 
          footer={<div>列表尾部</div>}
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <h4 style={{ margin: '16px 10px' }}>大尺寸</h4>
        <List
          size="large"
          header={<div>列表头部</div>} 
          footer={<div>列表尾部</div>}
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
    )
  }
}
```
<!--End-->

### 特殊方法

通过`dataSource`和`renderItem`来创建列表，这两个属性是一起使用。

<!--DemoStart--> 
```js
const data = [
  '"X战警新变种人"首曝海报特写诡异人脸',
  '六大变五大？传迪士尼600亿收购福斯',
  <span>快跑!《侏罗纪世界2》正式预告要来了</span>,
];
class Demo extends Component {
  render() {
    return (
      <List
        header={<div>列表头部</div>}
        footer={<div>列表尾部</div>}
        dataSource={data}
        renderItem={item => {
          return (<List.Item>{item}</List.Item>);
        }}
      />
    )
  }
}
```
<!--End-->

### 禁用行

<!--DemoStart--> 
```js
const data = [
  {
    'content': '"X战警新变种人"首曝海报特写诡异人脸'
  },
  {
    'content': '六大变五大？传迪士尼600亿收购福斯'
  },
  {
    'disabled': true,
    'content': '快跑!《侏罗纪世界2》正式预告要来了'
  },
];
class Demo extends Component {
  onClick(item,index,e){
    e.stopPropagation();
    console.log('item',item,e);
  }
  render() {
    return (
      <List
        header={<div>列表头部</div>}
        footer={<div>列表尾部</div>}
        dataSource={data}
        renderItem={(item,index) => {
          return (<List.Item onClick={this.onClick.bind(this,item,index)} disabled={item.disabled}>{item.content}</List.Item>);
        }}
      />
    )
  }
}
```
<!--End-->


### 行激活

`List.Item` 设置 `active` 属性即可设置这张被激活的样式。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <List size="small" header={<div>列表头部</div>} footer={<div>列表尾部</div>}>
        <List.Item active>"X战警新变种人"首曝海报特写诡异人脸</List.Item>
        <List.Item>六大变五大？传迪士尼600亿收购福斯</List.Item>
        <List.Item>快跑!《侏罗纪世界2》正式预告要来了</List.Item>
      </List>
    )
  }
}
```
<!--End-->

### 斑马线

<!--DemoStart--> 
```js
const data = [
  '人总是在接近幸福时倍感幸福，在幸福进行时却患得患失。',
  '因为爱过，所以慈悲；因为懂得，所以宽容。',
  '你如果认识从前的我，也许你会原谅现在的我。',
  <span>你还不来，我怎敢老去。</span>,
];
class Demo extends Component {
  render() {
    return (
      <List
        dataSource={data}
        striped={true}
        size="small"
        renderItem={item => {
          return (<List.Item>{item}</List.Item>);
        }}
      />
    )
  }
}
```
<!--End-->

### 列表为超链接

`List.Item` 设置了 `href`，`List.Item`就可以设置标签`<a>`的所有属性了。

<!--DemoStart--> 
```js
const data = [
  {
    'href':'#/cn/list',
    'content': '"X战警新变种人"首曝海报特写诡异人脸'
  },
  {
    'target':'_blank',
    'href':'https://uiw-react.github.io/icons/',
    'content': '从uiw组件库中抽离出来的，图标字体 uiw-iconfont 发布'
  },
  {
    'href':'#/cn/list',
    'disabled': true,
    'content': '快跑!《侏罗纪世界2》正式预告要来了'
  },
];
class Demo extends Component {
  render() {
    return (
      <List
        header={<div>列表头部</div>}
        footer={<div>列表尾部</div>}
        dataSource={data}
        renderItem={(item, index) => {
          return (
            <List.Item {...item}>
              {item.content}
            </List.Item>
          );
        }}
      />
    )
  }
}
```
<!--End-->

## List

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| size | 设置行尺寸，分别大、中、小三种尺寸 | Enum{`small`,`default`,`large`} | `default` |
| bordered | 是否展示边框 | Boolean | `true` |
| striped | 斑马线效果 | Boolean | `false` |
| footer | 列表底部 | String/ReactNode | - |
| header | 列表头部 | String/ReactNode | - |
| dataSource | 是否展示边框 | Boolean | - |
| renderItem | 是否展示边框 | Boolean | - |

## List.Item

| 参数 | 说明 | 类型 | 默认值 |
| --------- | -------- | --------- | -------- |
| active | 激活 | Boolean | `false` |
| disabled | 禁用 | Boolean | `false` |
| href | 规定链接的目标，`true` 的时候是个超链接，值为`String`的时候，在超链接上加 `href` 的值就是你传进来的 `href`值，此时将可以设置标签`<a>`的所有属性。  | Boolean/String | `false` |

