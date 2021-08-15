Menu 菜单
===

为页面和功能提供导航的菜单列表。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  onSelect(index, menuItem) {
    console.log("index::",index)
  }
  render() {
    return (
      <div>
        <Menu defaultActive="1" mode="horizontal" onSelect={this.onSelect.bind(this)}>
          <Menu.Item index="1"><Icon type="date" />首页</Menu.Item>
          <Menu.Item index="2"><Icon type="menu" />新闻中心</Menu.Item>
          <Menu.Item disabled index="3"><Icon type="verification" />服务范围</Menu.Item>
          <Menu.Item index="4"><Icon type="windows" />电器城</Menu.Item>
          <Menu.SubMenu index="5" title={<span><Icon type="star-on" /><span>新闻中心</span></span>}>
            <Menu.ItemGroup title="分组一">
              <Menu.Item index="5-1">选项1</Menu.Item>
              <Menu.Item index="5-2">选项2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="分组2">
              <Menu.Item index="5-3">选项3</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.Item index="6">
            <a href="https://github.com/uiw-react/uiw" target="_blank" rel="noopener noreferrer">电器城- Link</a>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
```
<!--End-->

### 横向菜单暗主题

<!--DemoStart--> 
```js
class Demo extends Component {
  onSelect(index, menuItem) {
    console.log("index::",index)
  }
  render() {
    return (
      <Menu defaultActive="1" theme="dark" mode="horizontal" onSelect={this.onSelect.bind(this)}>
        <Menu.Item index="1"><Icon type="date" />首页</Menu.Item>
        <Menu.SubMenu index="2" title={<span><Icon type="star-on" /><span>新闻中心</span></span>}>
          <Menu.Item index="2-1">选项1</Menu.Item>
          <Menu.Item index="2-2">选项1</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item disabled index="3"><Icon type="verification" />服务范围</Menu.Item>
        <Menu.Item index="4"><Icon type="windows" />电器城</Menu.Item>
        <Menu.SubMenu index="5" title={<span><Icon type="star-on" /><span>新闻中心</span></span>}>
          <Menu.ItemGroup title="分组一">
            <Menu.Item index="5-1">选项1</Menu.Item>
            <Menu.Item index="5-2"><a href="https://github.com/uiw-react/uiw" target="_blank" rel="noopener noreferrer">我的博客- Link</a></Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="分组2">
            <Menu.Item index="5-3">选项3</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item index="6">
          <a href="https://github.com/uiw-react/uiw" target="_blank" rel="noopener noreferrer">电器城- Link</a>
        </Menu.Item>
      </Menu>
    )
  }
}
```
<!--End-->

### 展开当前父级菜单

<!--DemoStart--> 
```js
class Demo extends Component {
onSelect() {}
  onClose(index) {
    console.log("index::",index)
  }
  render() {
    return (
      <Menu 
        defaultActive="1"
        defaultOpened={['5']}
        style={{width:240}}
        onClose={this.onClose.bind(this)}
        onSelect={this.onSelect.bind(this)}
      >
        <Menu.Item index="1"><Icon type="date" />首页</Menu.Item>
        <Menu.SubMenu index="2" title={<span><Icon type="menu" /><span>新闻中心</span></span>}>
          <Menu.Item index="2-1">进口食品</Menu.Item>
          <Menu.Item index="2-2">食品饮料</Menu.Item>
          <Menu.Item index="2-3">美容洗护</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item disabled index="3"><Icon type="windows"/>服务范围</Menu.Item>
        <Menu.Item index="4"><Icon type="star-on" />电器城</Menu.Item>
        <Menu.SubMenu index="5" title={<span><Icon type="verification" /><span>折叠菜单</span></span>}>
          <Menu.Item index="5-1">生活电器</Menu.Item>
          <Menu.Item index="5-2">厨房电器</Menu.Item>
          <Menu.Item index="5-3">健康电器</Menu.Item>
          <Menu.Item index="5-4">手机配件</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
  }
}
```
<!--End-->

### 内嵌菜单

<!--DemoStart--> 
```js
class Demo extends Component {
  onSelect() {}
  onClose(index) {
    console.log("index::",index)
  }
  onOpen(index) {
    console.log("index::",index)
  }
  render() {
    return (
      <Menu 
        defaultActive="1-1-1" 
        className="demo" 
        style={{width:260}}
        onOpen={this.onOpen.bind(this)} 
        onClose={this.onClose.bind(this)}
      >
        <Menu.SubMenu index="1-1" title={<span><Icon type="apple"/>导航一</span>}>
          <Menu.ItemGroup title="分组一">
            <Menu.Item index="1-1-1">选项1</Menu.Item>
            <Menu.Item index="1-1-2">选项2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="分组2">
            <Menu.Item index="1-1-3">选项3</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu index="2" title={<span><Icon type="android"/>导航二</span>}>
          <Menu.Item index="2-1">选项1</Menu.Item>
          <Menu.Item index="2-2">选项2</Menu.Item>
          <Menu.SubMenu index="2-3" title={<span>导航二子菜单</span>}>
            <Menu.Item index="2-3-1">选项1</Menu.Item>
            <Menu.Item index="2-3-2">选项2</Menu.Item>
            <Menu.SubMenu index="2-3-3" title={<span>三级子菜单</span>}>
              <Menu.Item index="2-3-3-1">选项1</Menu.Item>
              <Menu.Item index="2-3-3-2">选项2</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item index="3"><Icon type="linux"/>导航三</Menu.Item>
      </Menu>
    )
  }
}
```
<!--End-->

### 主题

内建了两套主题 `light|dark`，默认 `light`。

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      checked: true,
    };
  }
  onSelect(index, menuItem) {
    console.log("index::",index)
  }
  render() {
    return (
      <div>
        <Switch checkedChildren="dark" unCheckedChildren="light" checked={this.state.checked}
          onChange={(e,checked)=>{
            this.setState({checked})
            console.log(`${checked?"选中":'没有选中'}${checked}`)
          }}
        />
        <br />
        <br />
        <Menu
          defaultActive="1"
          theme={this.state.checked?'dark':'light'}
          onSelect={this.onSelect.bind(this)}
          style={{width:240}}
        >
          <Menu.Item index="1"><Icon type="date" />首页</Menu.Item>
          <Menu.Item index="2"><Icon type="menu" />新闻中心</Menu.Item>
          <Menu.Item disabled index="3"><Icon type="verification" />服务范围</Menu.Item>
          <Menu.Item index="4"><Icon type="windows" />电器城</Menu.Item>
          <Menu.SubMenu index="2" title={<span><Icon type="star-on" /><span>新闻中心</span></span>}>
            <Menu.ItemGroup title="分组一">
              <Menu.Item index="1-1-1">选项1</Menu.Item>
              <Menu.Item index="1-1-2">选项2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="分组2">
              <Menu.Item index="1-1-3">选项3</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.Item index="5">
            <a href="https://github.com/uiw-react/uiw" target="_blank" rel="noopener noreferrer">电器城- Link</a>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
```
<!--End-->

### 内嵌菜单

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      checked: true,
      mode: true,
    };
  }
  render() {
    return (
      <div>
        Change Mode&nbsp;
        <Switch checkedChildren="inline" unCheckedChildren="vertical" checked={this.state.mode}
          onChange={(e, mode)=>{
            console.log('mode',mode);
            this.setState({mode});
          }}
        />
        <br />
        <br />
        Change Theme&nbsp;
        <Switch checkedChildren="dark" unCheckedChildren="light" checked={this.state.checked}
          onChange={(e, checked)=>{
            this.setState({checked});
          }}
        />
        <br />
        <br />
        <div style={{width:240}}>
          <Menu 
            mode={this.state.mode?'inline':'vertical'}
            theme={this.state.checked?'dark':'light'}
            defaultActive="1-1-1" 
            className="demo"
          >
            <Menu.SubMenu index="1-1" title={<span><Icon type="apple"/>导航一</span>}>
              <Menu.ItemGroup title="分组一">
                <Menu.Item index="1-1-1">选项1</Menu.Item>
                <Menu.Item index="1-1-2">选项2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="分组2">
                <Menu.Item index="1-1-3">选项3</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu index="2" title={<span><Icon type="android"/>导航二</span>}>
              <Menu.Item index="2-1">选项1</Menu.Item>
              <Menu.Item index="2-2">选项2</Menu.Item>
              <Menu.SubMenu index="2-3" title={<span>导航二子菜单</span>}>
                <Menu.Item index="2-3-1">选项1</Menu.Item>
                <Menu.Item index="2-3-2">选项2</Menu.Item>
                <Menu.SubMenu index="2-3-3" title={<span>三级子菜单</span>}>
                  <Menu.Item index="2-3-3-1">选项1</Menu.Item>
                  <Menu.Item index="2-3-3-2">选项2</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item index="2-3-4">选项2</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item index="2-4">选项2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item index="3"><Icon type="linux"/>导航三</Menu.Item>
            <Menu.Item index="4"><Icon type="linux"/>导航三</Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}
```
<!--End-->


### 缩起内嵌菜单

需要设置 `mode=inline` 并且 `inlineCollapsed=true`

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      checked: true,
      mode: true,
    };
  }
  onSelect(index, menuItem) {
    console.log("index~::",index)
  }
  render() {
    return (
      <div>
        Change Mode&nbsp;
        <Switch checkedChildren="inline" unCheckedChildren="vertical" checked={this.state.mode}
          onChange={(e, mode)=>{
            this.setState({mode});
          }}
        />
        <br />
        <br />
        Change Theme&nbsp;
        <Switch checkedChildren="dark" unCheckedChildren="light" checked={this.state.checked}
          onChange={(e, checked)=>{
            this.setState({checked});
          }}
        />
        <br />
        <br />
        <div style={{width:240}}>
          <Menu
            defaultActive="5-4-2"
            mode={this.state.mode?'inline':'vertical'}
            theme={this.state.checked?'dark':'light'}
            onSelect={this.onSelect.bind(this)}
            inlineCollapsed={this.state.mode}
          >
            <Menu.Item index="1"><Icon type="date" /><span>关于我们</span></Menu.Item>
            <Menu.Item index="2"><Icon type="menu" /><span>成功案例</span></Menu.Item>
            <Menu.SubMenu index="3" title={<span><Icon type="star-on" /><span>服务范围</span></span>}>
              <Menu.ItemGroup title="分组一">
                <Menu.Item index="3-1">选项1</Menu.Item>
                <Menu.Item index="3-2">选项2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="分组2">
                <Menu.Item index="3-3">选项3</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.Item index="4"><Icon type="windows" /><span>电器城</span></Menu.Item>
            <Menu.SubMenu index="5" title={<span><Icon type="star-on" /><span>解决方案</span></span>}>
              <Menu.ItemGroup title="分组一">
                <Menu.Item index="5-1">选项1</Menu.Item>
                <Menu.Item index="5-2">选项2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="分组2">
                <Menu.Item index="5-3">选项3</Menu.Item>
                <Menu.SubMenu index="5-4" title={<span>新闻资讯</span>}>
                  <Menu.ItemGroup title="分组一">
                    <Menu.Item index="5-4-1">选项1</Menu.Item>
                    <Menu.Item index="5-4-2">选项2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="分组2">
                    <Menu.Item index="5-4-3">选项3</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.Item index="6">
              <Icon type="star-on" />
              <span><a href="https://github.com/jaywcjlove" target="_blank" rel="noopener noreferrer">电器城- Link</a></span>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}
```
<!--End-->

### 激活菜单并展开菜单

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultActive:'1-1-1',
      defaultOpened:['1-1']
    }
  }
  onSelect(defaultActive){
    this.setState({
      defaultActive
    })
    console.log("index::",defaultActive)
  }
  onClose(index) {
    console.log("index::",index)
  }
  onOpen(index) {
    console.log("index::",index)
  }
  onButtonClick(){
    this.setState({
      defaultActive:'2-3-3-1',
      defaultOpened:['2','2-3','2-3-3']
    })
  }
  render() {
    const {defaultActive,defaultOpened} = this.state;
    return (
      <div>
        <Menu 
          defaultActive={defaultActive}
          defaultOpened={defaultOpened}
          className="demo" 
          style={{width:260}}
          onOpen={this.onOpen.bind(this)} 
          onClose={this.onClose.bind(this)}
          onSelect={this.onSelect.bind(this)}
        >
          <Menu.SubMenu index="1-1" title={<span><Icon type="apple"/>导航一</span>}>
            <Menu.ItemGroup title="分组一">
              <Menu.Item index="1-1-1">选项1</Menu.Item>
              <Menu.Item index="1-1-2">选项2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="分组2">
              <Menu.Item index="1-1-3">选项3</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.SubMenu index="2" title={<span><Icon type="android"/>导航二</span>}>
            <Menu.Item index="2-1">选项1</Menu.Item>
            <Menu.Item index="2-2">选项2</Menu.Item>
            <Menu.SubMenu index="2-3" title={<span>导航二子菜单</span>}>
              <Menu.Item index="2-3-1">选项1</Menu.Item>
              <Menu.Item index="2-3-2">选项2</Menu.Item>
              <Menu.SubMenu index="2-3-3" title={<span>三级子菜单</span>}>
                <Menu.Item index="2-3-3-1">选项1</Menu.Item>
                <Menu.Item index="2-3-3-2">选项2</Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
          </Menu.SubMenu>
          <Menu.Item index="3"><Icon type="linux"/>导航三</Menu.Item>
        </Menu>
        <div>
          <Button type="primary" size="small" onClick={this.onButtonClick.bind(this)}>激活选项2菜单</Button>
        </div>
      </div>
    )
  }
}
```
<!--End-->


### 菜单项分割线

此分割线只是简单的做一下分割样式，你可以自定义`className`、`style`、`children`等。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Menu style={{width:200}}>
        <Menu.Item index="2-1">选项1</Menu.Item>
        <Menu.Divider />
        <Menu.Item index="2-2">选项2</Menu.Item>
        <Menu.Divider style={{background:'#3c90f2'}}/>
        <Menu.Item index="2-3">选项2</Menu.Item>
        <Menu.Divider style={{background:'#0fa120',height:3}}/>
        <Menu.Item index="2-4">选项2</Menu.Item>
        <Menu.Item index="2-5">选项2</Menu.Item>
        <Menu.Item index="2-6">选项2</Menu.Item>
        <Menu.Item index="2-7">选项2</Menu.Item>
      </Menu>
    )
  }
}
```
<!--End-->

## API

### Menu

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| mode | 菜单类型，可选值为 horizontal(水平) 和 vertical(垂直) 和 inline(垂直弹出层) 默认垂直参数`vertical` | String | `vertical` |
| theme | 主题颜色 | String[light,dark] | light |
| inlineCollapsed | inline 时菜单是否收起状态 | boolean | `false` |
| inlineIndent | inline 模式的菜单缩进宽度 | boolean | `24` |
| defaultActive | 当前默认选中的菜单项 `index` | String | - |
| defaultOpened | 当前默认打开的菜单项 `index` | String[] | - |
| onClose | 折叠菜单关闭事件 | Function(index) | - |
| onOpen | 折叠菜单展开事件 | Function(index) | - |
| onSelect | 当前默认打开的菜单项 | Function(index) | - |

### Menu.Item

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| disabled | 是否禁用 | Boolean | false |
| index | `item` 的唯一标志 | String | vertical |

### Menu.SubMenu

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| title | 折叠菜单标题 | String,React.ReactNode | vertical |
| index | `SubMenu` 的唯一标志 | String | vertical |


### Menu.Divider

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| className | 元素的类的名称。 | String | - |
