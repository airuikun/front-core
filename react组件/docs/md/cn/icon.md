Icon 图标
===

语义化的矢量图形，内置的图标属于UI框架常用图形字体。icon字体以及样式，被抽离到一个新的仓库 [uiw icon](https://uiw-react.github.io/icons/) ，`uiw`去依赖 [uiw-iconfont](https://github.com/uiw-react/icons)，这个仓库主要是维护一套svg图片，并将svg图片转换为 `*.svg` `*.ttf` `*.woff` `*.eot` 等字体及相关文件并发布到 [npm](https://www.npmjs.com/package/uiw-iconfont) 上去。

### 如何使用

使用`<Icon />`组件，指定图标对应的`type`属性，示例代码：

```html
<Icon type="minus" />
```

渲染后为：

```html
<i class="w-icon-date"></i>
```

示例如下:

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Icon type="arrow-down" />
        <Icon type="minus" />
        <Icon type="plus" />
        <Icon type="check" />
        <Icon type="close" />
      </div>
    )
  }
}
```
<!--End-->

### 添加自己的图标字体方法

默认建议使用 `svg` 来制作图标，如果使用字体文件，需要添加字体文件，并在 `css` 写符合规范的样式。

`icon` 名字需要命名规范，必须加上前缀 `.w-icon-{图标名字}` 。

```css
@font-face {
  font-family: "iconfont";
  src: url('iconfont.eot'); /* IE9*/
  src: url('iconfont.eot') format('embedded-opentype'), /* IE6-IE8 */
  url('iconfont.woff') format('woff'), /* chrome, firefox */
  url('iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg') format('svg'); /* iOS 4.1- */
}

[class^="w-icon-uiw-"], [class*=" w-icon-uiw-"] {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.w-icon-uiw-wxbgongju:before { content: "\e61b"; }
.w-icon-uiw-wxbmingxingdianpu:before { content: "\e61c"; }
```

上面写好CSS之后在组件中引用，就可以通过 `Icon` 组件来调用了，例如上面定义了两个图标使用方法如下

```js
<Icon type="uiw-wxbgongju" />
<Icon type="uiw-wxbmingxingdianp" />
```

注意：这里 `.w-icon-` 是当前默认引用的字体文件，`w-icon-uiw-` 是引用自己制作的字体文件，来覆盖默认的字体文件，就当成一个新的作用域。

### 图标的命名规范

我们为每个图标赋予了语义化的命名，命名规则如下:

> [形状?]-[图标名]-[描线?]-[方向?]  
> 方向：`down`、`up`、`left`、`right`  
> 描线：`-o` 图标添加边框描线
> 默认：`w-icon-` 默认引用的字体文件作用域  
> 自定定义：`w-icon-uiw-` 自定定义作用域  

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Icon type="circle-close" />  图标名称：circle-close，[circle圈]-[关闭close]
        <br/>
        <br/>
        <Icon type="circle-close-o" /> 图标名称：circle-close-o，[circle圈]-[关闭close]-[o描线]
      </div>
    )
  }
}
```
<!--End-->

### API

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| spin | 是否有旋转动画 |  Boolean | `false` |
| style | 设置图标的样式，例如 fontSize 和 color |  Object | - |
| type | 图标的名称 |  String | - |

## 实例

> 点击图标复制代码。

### 图标旋转实例

通过设置参数`spin={true}`来设置图标旋转。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = { textAlign: "center", padding: "20px 10px", background: "#f4f4f4", marginBottom: 10 };
    const iconStyle = { color: '#525252' };
    const iconList = ['loading', 'reload', 'picasa'];
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" spin />`} tooltip="复制成功！">
                    <Icon type={item} spin style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 方向性图标

<!--DemoStart--> 
```js
const iconList = [
  'caret-down', 'arrow-down','down-square-o','down-square',  'down-circle-o', 'down-circle',
  'caret-up','arrow-up', ,'up-square-o', 'up-square','up-circle-o','up-circle',
  'caret-left',  'arrow-left','left-square-o','left-square',  'left-circle-o', 'left-circle',
  'caret-right','arrow-right','right-square-o', 'right-square','right-circle-o', 'right-circle',
  'shrink','arrows-alt','d-arrow-left','d-arrow-right','enter', 

  'rollback', 'd-caret','backward','forward',  'logout', 'login',  'swap-right', 'swap', 
  'verticle-left', 'verticle-right','play-circle-o',  'play-circle','menu-fold', 'menu-unfold',  
]
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = {textAlign:"center",padding:"20px 10px",background: "#f4f4f4",marginBottom:10};
    const iconStyle = {color:"#525252"};
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" />`} tooltip="复制成功！">
                    <Icon type={item} style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 提示建议性图标

<!--DemoStart--> 
```js
const iconList = [ 
  'smile-o', 'smile','frown-o', 'frown','meh', 'meh-o',
  'pause','pause-circle', 'pause-circle-o', 'information', "information-o", 'warning-o', 'warning',
]
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = {textAlign:"center",padding:"20px 10px",background: "#f4f4f4",marginBottom:10};
    const iconStyle = {color:"#525252"};
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" />`} tooltip="复制成功！">
                    <Icon type={item} style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 符号

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = {textAlign:"center",padding:"20px 10px",background: "#f4f4f4",marginBottom:10};
    const iconStyle = {color:"#525252"};
    const iconList = [ 
      "plus", 'plus-circle-o','plus-circle', 'plus-square', 'plus-square-o', "question-circle-o", 
      "minus", 'minus-circle-o', 'minus-circle', 'minus-square', 'minus-square-o',"question-circle", 
      "close", "circle-close-o", "circle-close",'close-square', 'close-square-o', "asterisk", 
      "check", "circle-check-o", "circle-check",'check-square','check-square-o', "copyright",
    ]
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" />`} tooltip="复制成功！">
                    <Icon type={item} style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 文件

<!--DemoStart-->  
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = {textAlign:"center",padding:"20px 10px",background: "#f4f4f4",marginBottom:10};
    const iconStyle = {color:"#525252"};
    const iconList = [ 
      'file-text', 'file-jpg', 'file-unknown', 'file-add', 'file-excel', 'file-pdf',
      'folder-add', 'folder-open', 'paper-clip', 
    ]
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" />`} tooltip="复制成功！">
                    <Icon type={item} style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 其它

<!--DemoStart-->  
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = {textAlign:"center",padding:"20px 10px",background: "#f4f4f4",marginBottom:10};
    const iconStyle = {color:"#525252"};
    const iconList = [ 
      'heart-off', 'heart-on', 'star-on', 'star-off','lock', 'unlock','dashboard',
      'area-chart', 'bar-chart', 'dot-chart','pie-chart', 
      'dislike-o', 'like-o','loading', 'reload','appstore', 'appstore-o',
      'tag', 'tag-o','tags','tags-o', 'setting','setting-o','map','table','qrcode','barcode','printer',
      'cloud-upload','cloud-upload-o', 'cloud-download','cloud-download-o', 'download','message','message-o',
      'user', 'usergroup-add', 'zoom-in', 'zoom-out','time', 'time-o',
      "bell", 'camera-o', 'coffee', 'document', 'delete', 'date', 'edit',  'eye-o', 'environment-o', 'filter', 'global', 'inbox', 'home', 'laptop', 'link',  'menu', 'mobile', 'more', 'notification', 'picture', 'picasa', 'pay-circle-o', 'pay', 'poweroff',  'save', 'safety', 'search', 'shopping-cart', 'share',   'upload', 'verification', 'video-camera', 'wifi', 
    ]
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" />`} tooltip="复制成功！">
                    <Icon type={item} style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 品牌标识

<!--DemoStart-->  
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = {textAlign:"center",padding:"20px 10px",background: "#f4f4f4",marginBottom:10};
    const iconStyle = {color:"#525252"};
    const iconList = ['uiw', 'windows', "linux", 'apple', 'facebook', 'twitter', 'adobe', "baidu", "ali-pay", 'android-o', 'android','reddit', 'github', 'github-o', "aliwangwang",   "dingding", "foursquare", "linkedin", "pinterest", "qq",  "weibo", "taobao", "weixin", 'css3', 'html5', ]
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" />`} tooltip="复制成功！">
                    <Icon type={item} style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->

### 浏览器图标

<!--DemoStart-->  
```js
class Demo extends Component {
  render() {
    const {Row,Col} = Layout;
    const styleItem = {textAlign:"center",padding:"20px 10px",background: "#f4f4f4",marginBottom:10};
    const iconStyle = {color:"#525252"};
    const iconList = [
      "chrome", "safari", "firefox", "opera", "ie", 
    ]
    return (
      <div>
        <Row gutter="10">
        {
          iconList.map((item,idx) => {
            return (
              <Col key={idx} xs="8" sm="6" md="4" lg="4">
                <div style={styleItem}>
                  <CopyToClipboard style={iconStyle} text={`<Icon type="${item}" />`} tooltip="复制成功！">
                    <Icon type={item} style={{fontSize:18,marginBottom:10}}/>
                    <div>{item}</div>
                  </CopyToClipboard>
                </div>
              </Col>
            )
          }) 
        }
        </Row>
      </div>
    )
  }
}
```
<!--End-->
