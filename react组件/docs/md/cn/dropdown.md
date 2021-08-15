Dropdown 下拉菜单
===

向下弹出的列表。

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## 基础实例

<!--DemoStart--> 
```js
const menu = (
  <Menu>
    <Menu.Item index="0">
      <a target="_blank" rel="noopener noreferrer" href="http://uiw-react.github.io/">UI组件库官方文档</a>
    </Menu.Item>
    <Menu.Item index="1">
      <a target="_blank" rel="noopener noreferrer" href="http://wangchujiang.com/">个人网站</a>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item index="3" disabled>老铁就是你了</Menu.Item>
  </Menu>
);

class Demo extends Component {
  render() {
    return (
      <div>
        <Dropdown menu={menu}>
          <a className="ant-dropdown-link" href="javascript:;">
            Hover me <Icon type="arrow-down" />
          </a>
        </Dropdown>
      </div>
    )
  }
}
```
<!--End-->


## 被禁用

<!--DemoStart--> 
```js
const menu = (
  <Menu>
    <Menu.Item index="0">
      <a target="_blank" rel="noopener noreferrer" href="http://uiw-react.github.io/">UI组件库官方文档</a>
    </Menu.Item>
    <Menu.Item index="1">
      <a target="_blank" rel="noopener noreferrer" href="http://wangchujiang.com/">个人网站</a>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item index="3" disabled>老铁就是你了</Menu.Item>
  </Menu>
);

class Demo extends Component {
  render() {
    return (
      <div>
        <Dropdown disabled menu={menu}>
          <a className="ant-dropdown-link" href="javascript:;">
            Hover me <Icon type="arrow-down" />
          </a>
        </Dropdown>
      </div>
    )
  }
}
```
<!--End-->


## 可以点击

<!--DemoStart--> 
```js

class Demo extends Component {
  messageBox() {
    console.log('====>')
  }
  render() {
    const menu = (
      <Menu onSelect={this.messageBox}>
        <Menu.Item index="0">
          历史记录
        </Menu.Item>
        <Menu.Item index="1">
          关于我们
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item index="3" disabled>老铁就是你了</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Dropdown trigger="click" menu={menu}>
          <a href="javascript:;">
            点击我出现下拉菜单 <Icon type="arrow-down" />
          </a>
        </Dropdown>
        <Divider />
        <Dropdown trigger="click" menu={menu}>
          <Button>下拉菜单</Button>
        </Dropdown>
        <Divider />
        <Dropdown trigger="hover" menu={menu}>
          <Button>Hover下拉菜单</Button>
        </Dropdown>
      </div>
    )
  }
}
```
<!--End-->


## 安装和使用

```bash
npm install uiw --save
```

```js
import { Dropdown } from 'uiw';
// or
import Dropdown from 'uiw/lib/dropdown';
```
### Dropdown

| 参数 | 说明 | 类型 | 默认值 |
| ----- | ----- | ----- | ----- |
| disabled | 菜单是否禁用 |	Boolean	| - |
| visible | 菜单是否显示 |	Boolean	| `false` |
| menu | 菜单 |	Menu	| - |
| trigger | 触发下拉的行为 |	Enum{`click`,`hover`}	| `hover` |
| onVisibleChange | 菜单显示状态改变时调用，参数为 visible |	Function(visible)	| - |
