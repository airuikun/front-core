Collapse 折叠面板
===

可以折叠/展开的内容区域。


## 基本用法

可以同时展开多个面板，这个例子默认展开了第一个。

<!--DemoStart--> 
```js
render() {
  const Panel = Collapse.Panel
  return (
    <Collapse activeKey={['1']} onChange={key=>console.log(key)}>
      <Panel header="大话西游" key="1">
        <div>曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。 </div>
        <div>如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：我爱你。 </div>
        <div>如果非要在这份爱上加上一个期限，我希望是…… </div>
        <div>一万年</div>
      </Panel>
      <Panel header="西游·降魔篇" key="2">
        <div>曾经痛苦，才知道真正的痛苦；曾经执著，才能放下执著；</div>
        <div>曾经牵挂，才能了无牵挂。</div>
      </Panel>
      <Panel header="国产零零漆" key="3" disabled >
        <div>古有关云长全神贯注下象棋刮骨疗毒，今有我零零漆聚精会神看A片挖骨取弹头。</div>
      </Panel>
    </Collapse>
  )
}
```
<!--End-->

## 手风琴折叠面板

手风琴，每次只打开一个tab。默认打开第一个。

<!--DemoStart--> 
`Panel`的`key`属性并非必须。
```js
constructor(props) {
  super(props)
  this.state = {
    activeName: '0'
  }
}
render() {
  const Panel = Collapse.Panel
  return (
    <div>
      <Button
        type="primary"
        style={{marginBottom: '15px'}}
        onClick={() => this.setState({ activeName: this.state.activeName === '2'?'':'2' })}
      >
        打开或关闭第三个
      </Button>
      <Collapse accordion activeKey={[this.state.activeName]} onChange={key=>console.log(key)}>
        <Panel header="大话西游">
          <div>曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。 </div>
          <div>如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：我爱你。 </div>
          <div>如果非要在这份爱上加上一个期限，我希望是…… </div>
          <div>一万年</div>
        </Panel>
        <Panel header="西游·降魔篇">
          <div>曾经痛苦，才知道真正的痛苦；曾经执著，才能放下执著；</div>
          <div>曾经牵挂，才能了无牵挂。</div>
        </Panel>
        <Panel header="国产零零漆" showArrow={false}>
          <div>古有关云长全神贯注下象棋刮骨疗毒，今有我零零漆聚精会神看A片挖骨取弹头。</div>
        </Panel>
      </Collapse>
    </div>
  )
}
```
<!--End-->

## 简洁风格无边框

通过设置`bordered={true}`没有边框的简洁样式。

<!--DemoStart--> 
`Panel`的`key`属性并非必须。
```js
render() {
  const Panel = Collapse.Panel
  return (
    <Collapse accordion bordered={true} activeKey={[]} onChange={key=>console.log(key)}>
      <Panel header="大话西游">
        <div>曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。 </div>
        <div>如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：我爱你。 </div>
        <div>如果非要在这份爱上加上一个期限，我希望是…… </div>
        <div>一万年</div>
      </Panel>
      <Panel header="西游·降魔篇">
        <div>曾经痛苦，才知道真正的痛苦；曾经执著，才能放下执著；</div>
        <div>曾经牵挂，才能了无牵挂。</div>
      </Panel>
      <Panel header="国产零零漆">
        <div>古有关云长全神贯注下象棋刮骨疗毒，今有我零零漆聚精会神看A片挖骨取弹头。</div>
      </Panel>
    </Collapse>
  )
}
```
<!--End-->

## 自定义面板标题

<!--DemoStart--> 
```js
render() {
  const Panel = Collapse.Panel
  return (
    <Collapse showArrow={false} activeKey={['1']} onChange={key=>console.log(key)}>
      <Panel header={<span>大话西游 <Icon type="smile-o"/></span>} key="1">
        <div>曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。 </div>
        <div>如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：我爱你。 </div>
        <div>如果非要在这份爱上加上一个期限，我希望是…… </div>
        <div>一万年</div>
      </Panel>
      <Panel header={<span>西游·降魔篇 <Icon type="smile-o"/></span>} key="2">
        <div>曾经痛苦，才知道真正的痛苦；曾经执著，才能放下执著；</div>
        <div>曾经牵挂，才能了无牵挂。</div>
      </Panel>
      <Panel header="国产零零漆" key="3">
        <div>古有关云长全神贯注下象棋刮骨疗毒，今有我零零漆聚精会神看A片挖骨取弹头。</div>
      </Panel>
    </Collapse>
  )
}
```
<!--End-->

## API

### Collapse

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| accordion | 手风琴效果 | Boolean | false |
| activeKey | 当前激活 tab 面板的 key, accordion 模式下默认第一个元素 | String[]/String | false |
| showArrow | 在这里使用，表示控制所有的面板图标是否展示 | Boolean | true |
| bordered | 设置没有边框的简洁样式 | Boolean | false |

### Collapse.Panel

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| disabled | 禁用后的面板展开与否将无法通过用户交互改变 | Boolean | false |
| header | 面板头内容 | string/ReactNode | - |
| isActive | 是否展开 | Boolean | - |
| showArrow | 是否显示展开图标 | Boolean | true |
| key | 面板头内容，非必填 | 对应 activeKey | - |