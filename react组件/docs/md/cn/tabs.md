Tabs 标签页
===

标签页切换组件，分隔内容上有关联但属于不同类别的数据集合。


### 基本用法

基础的、简洁的卡片式标签页。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Tabs activeKey="1" onTabClick={(tab, key, e) => {
          console.log("=>",key,tab)
        }}>
        <Tabs.Pane label="用户管理" key="1">用户管理</Tabs.Pane>
        <Tabs.Pane label="配置管理" key="2">配置管理</Tabs.Pane>
        <Tabs.Pane sequence="fadeIn up" label="角色管理" key="3">角色管理</Tabs.Pane>
        <Tabs.Pane label="大爷欢乐多" key="4"><div>大爷欢乐多</div><div>大爷欢乐多</div></Tabs.Pane>
      </Tabs>
    )
  }
}
```
<!--End-->

### 卡片式页签

另一种样式的页签，不提供对应的垂直样式。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Tabs type="card" activeKey="2" onTabClick={(tab, key, e) => {
          console.log("=>",key,tab)
        }}>
        <Tabs.Pane label="用户管理" key="1">用户管理</Tabs.Pane>
        <Tabs.Pane label={<span><Icon type="setting" />配置管理 </span>} key="2">配置管理</Tabs.Pane>
        <Tabs.Pane sequence="fadeIn up" label="角色管理" key="3">角色管理</Tabs.Pane>
        <Tabs.Pane label="大爷欢乐多" key="4"><div>大爷欢乐多</div><div>大爷欢乐多</div></Tabs.Pane>
      </Tabs>
    )
  }
}
```
<!--End-->

### 禁用卡片选项

`<Tabs.Pane>` 设置参数 `disabled={true}` 来禁用卡片选项。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Tabs type="card" activeKey="2" 
          style={{paddingBottom:"30px"}}
          onTabClick={(tab) => {
            console.log(tab.props.activeKey)
          }}>
          <Tabs.Pane disabled={true} label="用户管理" key="1">用户管理</Tabs.Pane>
          <Tabs.Pane label={<span><Icon type="setting" />配置管理 </span>} key="2">配置管理</Tabs.Pane>
          <Tabs.Pane disabled label="角色管理" key="3">角色管理</Tabs.Pane>
          <Tabs.Pane label="大爷欢乐多" key="4"><div>大爷欢乐多</div><div>大爷欢乐多</div></Tabs.Pane>
        </Tabs>
        <Tabs activeKey="1" onTabClick={(tab, key, e) => {
          console.log("=>",key,tab)
        }}>
          <Tabs.Pane label="用户管理" key="1">用户管理</Tabs.Pane>
          <Tabs.Pane disabled={true} label="配置管理" key="2">配置管理</Tabs.Pane>
          <Tabs.Pane sequence="fadeIn up" label="角色管理" key="3">角色管理</Tabs.Pane>
          <Tabs.Pane label="大爷欢乐多" key="4"><div>大爷欢乐多</div><div>大爷欢乐多</div></Tabs.Pane>
        </Tabs>
      </div>
    )
  }
}
```
<!--End-->

### 位置

有四个位置，position=`top` `right` `bottom` `left`。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagRadioOptions:[
          {color:"purple", value:'top',label:'顶部'},
          {color:"orange", value:'right',label:'右边'},
          {color:"green", value:'bottom',label:'底部'},
          {color:"blue", value:'left',label:'左边'}
      ],
      position:['left']
    }
  }
  render() {
    const TagGroup = Tag.Group;
    return (
      <div>

        <TagGroup 
          options={this.state.tagRadioOptions}
          checked={true}
          isRadio={true}
          style={{paddingBottom:25}}
          checkedValues={this.state.position}
          onChange={(e,value)=>{
            this.setState({position:value})
            console.log("value::",value)
          }}
        />
          
        <Tabs type="line" position={this.state.position[0]} activeKey="2" onTabClick={(tab, key, e) => {
          console.log("=>",key,tab)
        }}>
          <Tabs.Pane label={<span><Icon type="menu" />用户管理 </span>} key="1">用户管理</Tabs.Pane>
          <Tabs.Pane label={<span><Icon type="setting" />配置管理 </span>} key="2">配置管理</Tabs.Pane>
          <Tabs.Pane sequence="fadeIn up" label={<span><Icon type="user" />角色管理 </span>}  key="3">角色管理</Tabs.Pane>
          <Tabs.Pane label={<span><Icon type="heart-on" />大爷欢乐多 </span>} key="4"><div>大爷欢乐多</div><div>大爷欢乐多</div></Tabs.Pane>
        </Tabs>
      </div>
    )
  }
}
```
<!--End-->

### 可关闭

可以关闭标签页，只有卡片样式的页签支持新增和关闭选项。 

<!--DemoStart--> 
`<Tabs>`使用 `closable={true}` 开启标签可关闭。  
`<Tabs.Pane>`使用 `closable={false}` 标签关闭按钮被隐藏。
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const TagGroup = Tag.Group;
    return (
      <div>
        <Tabs closable type="card" activeKey="1" 
          onTabRemove={(tab, idx, e)=>{
            console.log("=>",tab, idx, e)
          }}
          onTabClick={(tab,  key, e) => {
            console.log("=>",key,tab)
          }}
        >
          <Tabs.Pane label="用户管理" key="1">用户管理</Tabs.Pane>
          <Tabs.Pane closable={false} label="配置管理" key="2">配置管理</Tabs.Pane>
          <Tabs.Pane label="角色管理"  key="3">角色管理</Tabs.Pane>
        </Tabs>
      </div>
    )
  }
}
```
<!--End-->

### 附加内容

可以在页签右边添加附加操作。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        { title: '用户管理', content: '用户管理内容1', key: '1' },
        { title: '配置管理', content: '配置管理内容2', key: '2' },
        { title: '角色管理', content: '角色管理内容3', key: '3', closable: false },
        { title: '大爷欢乐多', content: <div>大爷欢乐多大爷欢乐多</div>, key: '4' },
      ]
    }
  }
  render() {
    const { panes } = this.state;
    return (
      <Tabs
        activeKey="1"
        tabBarExtra={<Button size="mini">添加更多功能</Button>}
        onTabClick={(tab, key, e) => {
          console.log("=>",key,tab)
        }}>
        {panes.map((item) => {
          return (
            <Tabs.Pane key={item.key} label={item.title}>{item.content}</Tabs.Pane>
          );
        })}
      </Tabs>
    )
  }
}
```
<!--End-->

### 新增和关闭页签

设置参数 `onTabAdd` 按钮将被展示。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        { title: '用户管理', content: '用户管理内容1', key: '1' },
        { title: '配置管理', content: '配置管理内容2', key: '2' },
        { title: '角色管理', content: '角色管理内容3', key: '3', closable: false },
        { title: '大爷欢乐多', content: <div>大爷欢乐多大爷欢乐多</div>, key: '4' },
      ],
      activeKey: '1',
    }
  }
  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        closable
        activeKey={activeKey}
        tabBarExtra={<Button size="mini">添加更多功能</Button>}
        onTabAdd={(lastKey, lastChild, e) => {
          const panes = this.state.panes;
          // lastKey = parseInt(lastKey, 10)
          const activeKey = String(parseInt(lastKey, 10) + 1);
          panes.push({ title: '新标签', content: '新标签内容', key: activeKey });
          this.setState({ panes, activeKey });
          console.log('onTabAdd:', lastKey, lastChild, e);
        }}
        onTabClick={(tab, key, e) => {
          this.setState({ activeKey: key });
          console.log("=>",key,tab)
        }}
      >
        {panes.map((item) => {
          return (
            <Tabs.Pane key={item.key} label={item.title}>{item.content}</Tabs.Pane>
          );
        })}
      </Tabs>
    )
  }
}
```
<!--End-->


## API

### Tags 

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| type | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | String | `white` |
| activeKey | 当前激活 `tab` 面板的 `key` | String | - |
| tabBarExtra | `tab` `bar` 上额外的元素 | String\ReactNode | - |
| onTabClick | `tab` 被点击的回调 | Function | `(item,key,e)=>{}` |
| onTabRemove | 点击 `tab` 被移除的回调事件 | Function | `(item,key,e)=>{}` |
| onTabAdd | 点击 `tab` 添加按钮的回调事件，事件存在按 | Function | `(lastKey, lastChild, e)=>{}` |
| position | 页选项卡位置，可选值有 `top` `right` `bottom` `left` | String | `top` |
| sequence | 设置`<Tabs.Pane>`进出动画，默认动画效果参考 `<Transition>` | String | `fadeIn` |

### Tag.Pane

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| label | 选项卡标题 | String,Node | - |
| keys | 对应 activeKey | String,Node | - |
| closable | 标签是否可关闭 | Boolean | `false` |
| disabled | 标签是禁用不可点击 | Boolean | `false` |
| sequence | 给每个`Pane`定义不同的动画效果 | Boolean | `fadeIn` |
