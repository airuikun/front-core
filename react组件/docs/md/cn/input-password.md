InputPassword 密码输入框
===

显示或隐藏输入的密码

### 基本用法

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  onChange(e,value) {
    console.log(`value - ${value}`)
    this.setState({value:value})
  }
  render() {
    const {Row,Col} = Layout;
    return (
      <Row>
        <Col xs="8" sm="8" md="8" xs="24">
          <InputPassword 
            value={this.state.value} 
            placeholder="请输入密码" 
            onChange={this.onChange.bind(this)} 
            length={6}
          />
        </Col>
      </Row>
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
import { InputPassword } from 'uiw';
// or
import InputPassword from 'uiw/lib/input-password';
```

### InputPassword

继承[Input](/#/cn/input)参数，例如`icon`、`length`

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| icon | 输入框`后`面放置图标 | String | `eye-o` |
