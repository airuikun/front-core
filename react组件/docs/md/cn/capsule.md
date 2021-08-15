Capsule 胶囊
===

胶囊。

## 基础用法

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Capsule title="折扣">限购一份</Capsule>
        <Capsule color="red" title="折扣">限购一份</Capsule>
        <Capsule type="shields" title="npm">v6.0.1</Capsule>
        <Capsule type="shields" color="#ce4a32" title="build">failure</Capsule>
        <Capsule type="shields" color="#40bf16" title="download">10k</Capsule>
        <Capsule type="shields" color="#e97437" title="coverage">35%</Capsule>
        <Capsule disabled title="build">unknown</Capsule>
      </div>
    )
  }
}
```
<!--End-->


## 颜色设置

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Capsule color="red" title="折扣">限购一份</Capsule>
        <Capsule color="#1C7CEB" title="折扣">限购一份</Capsule>
        <Capsule disabled color="#1C7CEB" title="折扣">限购一份</Capsule>
        <Capsule color="#40ba16" title="build">passing</Capsule>
        <Capsule color="#4f4f4f" title="npm">6.0.1</Capsule>
        <Capsule color="#1C7CEB" title="npm">6.0.1</Capsule>
        <Capsule color="#e97437" title="coverage">35%</Capsule>
        <Capsule color="red" title="build">failure</Capsule>
        <Capsule disabled color="red" title="build">unknown</Capsule>
      </div>
    )
  }
}
```
<!--End-->


## 胶囊盾牌

设置类型 `type` 值 `shields`。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Capsule type="shields" color="red" title="折扣">限购一份</Capsule>
        <Capsule type="shields" color="#1C7CEB" title="折扣">限购一份</Capsule>
        <Capsule type="shields" disabled color="#1C7CEB" title="折扣">限购一份</Capsule>
        <Capsule type="shields" color="#40ba16" title="build">passing</Capsule>
        <Capsule type="shields" color="#ea7538" title="npm">6.0.1</Capsule>
        <Capsule type="shields" color="#cfa720" title="npm">6.0.1</Capsule>
        <Capsule type="shields" color="#1C7CEB" title="npm">6.0.1</Capsule>
        <Capsule type="shields" color="#e97437" title="coverage">35%</Capsule>
        <Capsule type="shields" color="red" title="build">failure</Capsule>
        <Capsule type="shields" disabled color="red" title="build">unknown</Capsule>
      </div>
    )
  }
}
```
<!--End-->

## 作为标签使用

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Capsule type="shields" color="red">限购一份</Capsule>
        <Capsule type="shields" color="#1C7CEB">限购一份</Capsule>
        <Capsule type="shields" disabled color="#1C7CEB">限购一份</Capsule>
        <Capsule type="shields" color="#40ba16">passing</Capsule>
        <Capsule type="shields" color="#ea7538">6.0.1</Capsule>
        <Capsule type="shields" color="#cfa720">6.0.1</Capsule>
        <Capsule type="shields" color="#1C7CEB">6.0.1</Capsule>
        <Capsule type="shields" color="#e97437">35%</Capsule>
        <Capsule type="shields" color="red">failure</Capsule>
        <Capsule type="shields" disabled color="red">unknown</Capsule>
      </div>
    )
  }
}
```
<!--End-->


## API

### Capsule

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| title | 胶囊标题 | String/ReactNode | - |
| type | 胶囊类型 'shields', 'default' | String | - |
| color | 胶囊颜色 | String | `#1C7CEB` |
| disabled | 胶囊禁用 | Boolean | `false` |
