Layout 布局
===

通过基础的 `24` 分栏，迅速简便地创建布局。 主要由 `Layout.Row` 和 `Layout.Col` 来实现布局。

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    //下面这段样式可以写入css中通过 className 来使用
    let styleCol = {background: "lightgrey",lineHeight:"36px",textAlign:"center"};
    let styleColLight = {background: "#e3e3e3",lineHeight:"36px",textAlign:"center"};
    let styleRow = {marginBottom: "20px"};

    const {Row,Col} = Layout;

    return (
      <div>
        <Row style={styleRow}>
          <Col span="24"><div style={styleCol}>100%, span=24</div></Col>
        </Row>
        <Row style={styleRow}>
          <Col span="12"><div style={styleCol}>50%, span=12</div></Col>
          <Col span="12"><div style={styleColLight}>50%, span=12</div></Col>
        </Row>
        <Row style={styleRow}>
          <Col span="8"><div style={styleCol}>33.33%, span=8</div></Col>
          <Col span="8"><div style={styleColLight}>33.33%, span=8</div></Col>
          <Col span="8"><div style={styleCol}>33.33%, span=8</div></Col>
        </Row>
        <Row style={styleRow}>
          <Col span="6"><div style={styleCol}>25%, span=6</div></Col>
          <Col span="6"><div style={styleColLight}>25%, span=6</div></Col>
          <Col span="6"><div style={styleCol}>25%, span=6</div></Col>
          <Col span="6"><div style={styleColLight}>25%, span=6</div></Col>
        </Row>
        <Row>
          <Col span="4"><div style={styleCol}>16.66667%, span=4</div></Col>
          <Col span="4"><div style={styleColLight}>16.66667%, span=4</div></Col>
          <Col span="4"><div style={styleCol}>16.66667%, span=4</div></Col>
          <Col span="4"><div style={styleColLight}>16.66667%, span=4</div></Col>
          <Col span="4"><div style={styleCol}>16.66667%, span=4</div></Col>
          <Col span="4"><div style={styleColLight}>16.66667%, span=4</div></Col>
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 分栏间隔

分栏之间存在间隔，通过设置`Row` 属性 `gutter` 的值。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    //下面这段样式可以写入css中通过 className 来使用
    let styleCol = {background: "lightgrey",lineHeight:"36px",textAlign:"center"};
    let styleColLight = {background: "#e3e3e3",lineHeight:"36px",textAlign:"center"};

    const {Row,Col} = Layout;

    return (
      <Row gutter="20">
        <Col span="6"><div style={styleCol}>span=6</div></Col>
        <Col span="6"><div style={styleColLight}>span=6</div></Col>
        <Col span="6"><div style={styleCol}>span=6</div></Col>
        <Col span="6"><div style={styleColLight}>span=6</div></Col>
      </Row>
    )
  }
}
```
<!--End-->

### 混合布局

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    //下面这段样式可以写入css中通过 className 来使用
    let styleCol = {background: "lightgrey",lineHeight:"36px",textAlign:"center"};
    let styleColLight = {background: "#e3e3e3",lineHeight:"36px"};
    let styleRow = {marginBottom: "20px"};

    const {Row,Col} = Layout;

    return (
      <div style={{backgroundColor: "#f7f7f7"}}>
        <Row style={styleRow} gutter="20">
          <Col span="16"><div style={styleCol}>span=16</div></Col>
          <Col span="8"><div style={styleCol}>span=8</div></Col>
        </Row>
        <Row style={styleRow} gutter="20">
          <Col span="8"><div style={styleCol}>span=8</div></Col>
          <Col span="8"><div style={styleCol}>span=8</div></Col>
          <Col span="4"><div style={styleCol}>span=4</div></Col>
          <Col span="4"><div style={styleCol}>span=4</div></Col>
        </Row>
        <Row gutter="20">
          <Col span="4"><div style={styleCol}>span=4</div></Col>
          <Col span="16"><div style={styleCol}>span=16</div></Col>
          <Col span="4"><div style={styleCol}>span=4</div></Col>
        </Row>
      </div>
    )
  }
}
```
<!--End-->


### 左右分栏偏移

使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 `4`个列`column`的宽度。

<!--DemoStart--> 
```js
//下面这段样式可以写入css中通过 className 来使用
let styleCol = {background: "lightgrey",lineHeight:"36px",textAlign:"center"};
let styleColLight = {background: "#e3e3e3",lineHeight:"36px",textAlign:"center"};
let styleRow = {marginBottom: "20px"};

const {Row,Col} = Layout;

class Demo extends Component {
  render() {
    return (
      <div>
        <Row style={styleRow}>
          <Col style={styleCol} span={8}>col=8</Col>
          <Col style={styleColLight} span={8} offset={8}>col=8</Col>
        </Row>
        <Row style={styleRow}>
          <Col style={styleCol} span={6} offset={6}>col=6, offset=6</Col>
          <Col style={styleColLight} span={6} offset={6}>col=6, offset=6</Col>
        </Row>
        <Row>
          <Col style={styleCol} span={12} offset={6}>col=12, offset=6</Col>
        </Row>
      </div>
    )
  }
}
```
<!--End-->


### flex布局

使用 Layout.Row `flex` 定义 `flex` 布局，其子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。  
具体可以参考[阮一峰 Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

<!--DemoStart--> 
- `start（默认值）`：左对齐
- `end`：右对齐
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
```js
//下面这段样式可以写入css中通过 className 来使用
let styleCol = {background: "lightgrey",lineHeight:"36px",minHeight: "36px",textAlign:"center"};
let styleColLight = {background: "#e3e3e3",lineHeight:"36px",minHeight: "36px",textAlign:"center"};
let styleRow = {marginBottom: "20px",background: "#f7f7f7"};
let styleRow2 = {background: "#f7f7f7"};
const {Row,Col} = Layout;

class Demo extends Component {
  render() {
    return (
      <div>
        <Row style={styleRow} type="flex">
          <Col span="6"><div style={styleCol}>col=6</div></Col>
          <Col span="6"><div style={styleColLight}>col=6</div></Col>
          <Col span="6"><div style={styleCol}>col=6</div></Col>
        </Row>
        <Row style={styleRow} type="flex" justify="center">
          <Col span="6"><div style={styleCol}>col=6</div></Col>
          <Col span="6"><div style={styleColLight}>col=6</div></Col>
          <Col span="6"><div style={styleCol}>col=6</div></Col>
        </Row>
        <Row style={styleRow} type="flex" justify="end">
          <Col span="6"><div style={styleCol}>col=6</div></Col>
          <Col span="6"><div style={styleColLight}>col=6</div></Col>
          <Col span="6"><div style={styleCol}>col=6</div></Col>
        </Row>
        <Row style={styleRow} type="flex" justify="space-between">
          <Col span="6"><div style={styleCol}>col=6</div></Col>
          <Col span="6"><div style={styleColLight}>col=6</div></Col>
          <Col span="6"><div style={styleCol}>col=6</div></Col>
        </Row>
        <Row style={styleRow2} type="flex" justify="space-around">
          <Col span="6"><div style={styleCol}>col=6</div></Col>
          <Col span="6"><div style={styleColLight}>col=6</div></Col>
          <Col span={6}><div style={styleCol}>col={6}</div></Col>
        </Row>
      </div>
    )
  }
}
```
<!--End-->


### Flex 对齐

<!--DemoStart--> 
- `top` 交叉轴的起点对齐。设置样式 ~~`align-items: flex-start`~~ 默认不设置
- `bottom` 交叉轴的终点对齐。设置样式 `align-items: flex-end`
- `center` 交叉轴的中点对齐。设置样式 `align-items: center`
- `baseline` 项目的第一行文字的基线对齐。设置样式 `align-items: baseline`
- ~~`stretch（默认值）`~~ 如果Col未设置高度或设为auto，将占满整个容器的高度。不需要设置`align`
```js
//下面这段样式可以写入css中通过 className 来使用
let styleCol1 = {background: "lightgrey",lineHeight:"136px",minHeight: "36px",textAlign:"center"};
let styleCol2 = {background: "#e3e3e3",height:"50px",lineHeight:"36px",minHeight: "36px",textAlign:"center"};
let styleCol3 = {background: "lightgrey",height:"70px",lineHeight:"36px",minHeight: "36px",textAlign:"center"};
let styleCol4 = {background: "#e3e3e3",lineHeight:"36px",minHeight: "36px",textAlign:"center"};
let styleRow1 = {marginBottom: "20px",background: "#f7f7f7"};
let styleRow2 = {background: "#f7f7f7"};

const {Row,Col} = Layout;

class Demo extends Component {
  render() {
    return (
      <div>
        <p>Align Top</p>
        <Row type="flex" justify="center" align="top" style={styleRow1}>
          <Col span="4"><div style={styleCol1}></div></Col>
          <Col span="4"><div style={styleCol2}></div></Col>
          <Col span="4"><div style={styleCol3}></div></Col>
        </Row>
        <p>Align Center</p>
        <Row type="flex" justify="space-around" align="middle" style={styleRow1}>
          <Col span="4"><div style={styleCol1}></div></Col>
          <Col span="4"><div style={styleCol2}></div></Col>
          <Col span="4"><div style={styleCol3}></div></Col>
        </Row>
        <p>Align Bottom</p>
        <Row type="flex" justify="space-between" align="bottom" style={styleRow1}>
          <Col span="4"><div style={styleCol1}></div></Col>
          <Col span="4"><div style={styleCol2}></div></Col>
          <Col span="4"><div style={styleCol3}></div></Col>
        </Row>
        <p>Align Bottom Right</p>
        <Row type="flex" justify="end" align="bottom" style={styleRow1}>
          <Col span="4"><div style={styleCol1}></div></Col>
          <Col span="4"><div style={styleCol2}></div></Col>
          <Col span="4"><div style={styleCol3}></div></Col>
        </Row>
        <p>项目的第一行文字的基线对齐。</p>
        <Row type="flex" justify="center" align="baseline" style={styleRow2}>
          <Col span="4" style={styleCol1}><div>align="baseline"</div></Col>
          <Col span="4" style={styleCol2}><div>align="baseline"</div></Col>
          <Col span="4" style={styleCol3}><div>align="baseline"</div></Col>
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### Flex 排序

通过 `Flex` 布局的 `order` 来改变元素的排序。

<!--DemoStart--> 
```js
//下面这段样式可以写入css中通过 className 来使用
let styleCol = {background: "lightgrey",lineHeight:"36px",textAlign:"center"};
let styleColLight = {background: "#e3e3e3",lineHeight:"36px",textAlign:"center"};

const {Row,Col} = Layout;
class Demo extends Component {
  render() {

    return (
      <Row type="flex">
        <Col span={6} order={4} style={styleCol}>span=1, order=4</Col>
        <Col span={6} order={3} style={styleColLight}>span=2, order=3</Col>
        <Col span={6} order={2} style={styleCol}>span=3, order=2</Col>
        <Col span={6} order={1} style={styleColLight}>span=4, order=1</Col>
      </Row>
    )
  }
}
```
<!--End-->


### 响应式布局

参照 [Bootstrap](http://getbootstrap.com/) 的 响应式设计，预设了四个响应尺寸：xs、sm、md和lg。

```css
/* 超小屏幕（手机，小于 768px） */
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的 */
/* @media (max-width: @screen-xs) { ... } */

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: @screen-sm) { ... }

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-md) { ... }

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: @screen-lg) { ... }
```

<!--DemoStart--> 
<table>
  <tr>
    <th></th>
    <th>超小屏幕 手机 (<768px)</th>
    <th>小屏幕 平板 (≥768px)</th>
    <th>中等屏幕 桌面显示器 (≥992px)</th>
    <th>大屏幕 大桌面显示器 (≥1200px)</th>
  </tr>
  <tr>
    <td>参数</td>
    <td>xs</td>
    <td>sm</td>
    <td>md</td>
    <td>lg</td>
  </tr>
  <tr>
      <td>栅格系统行为</td>
      <td>总是水平排列</td>
      <td colspan="3">开始是堆叠在一起的，当大于这些阈值时将变为水平排列</td>
  </tr>
</table>

```js
//下面这段样式可以写入css中通过 className 来使用
let styleCol = {background: "lightgrey",lineHeight:"36px",minHeight: "36px",textAlign:"center"};
let styleCol2 = {background: "#e3e3e3",lineHeight:"36px",minHeight: "36px",textAlign:"center"};
let styleRow = {background: "#f7f7f7",padding:"5px 0"};

const {Row,Col} = Layout;
class Demo extends Component {
  render() {
    // xs 默认不用设置
    return (
      <Row style={styleRow} gutter="10">
        <Col xs="24" sm="6" md="4" lg="3"><div style={styleCol}></div></Col>
        <Col xs="24" sm="6" md="8" lg="9"><div style={styleCol2}></div></Col>
        <Col xs="24" sm="6" md="8" lg="9"><div style={styleCol}></div></Col>
        <Col xs="24" sm="6" md="4" lg="3"><div style={styleCol2}></div></Col>
      </Row>
    )
  }
}
```
<!--End-->

## API

### Row

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| gutter | 栅格间隔间距 | number | - |
| type | 布局模式，可选 `flex`，[现代浏览器](http://caniuse.com/#search=flex) 下有效 | string | - |
| justify | flex 布局下的水平排列方式：`start`,`center`,`end`,`space-between`,`space-around` | number | - |
| align | flex 布局下的垂直对齐方式：`top`,`middle`,`bottom`,`baseline` | number | - |


### Col

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| span | 栅格占据的列数，必选参数 `0 < span < 24`，默认设置`24`宽度 `100%`，可设置`0`取消这一默认值 | number | - |
| order | 栅格顺序，`flex` 布局模式下有效 | number | 0 |
| offset | 栅格左侧的间隔格数，将列向右侧偏 | number | 0 |
| push | 栅格向右移动格数 | number | 0 |
| pull | 栅格向左移动格数 | number | 0 |
| xs | `<768px` 默认的样式不需要设置 | number | - |
| sm | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number | 0 |
| md | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number | 0 |
| lg | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number | 0 |
