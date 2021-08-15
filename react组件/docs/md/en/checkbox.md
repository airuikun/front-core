Checkbox 多选框
===

一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换，半选中只是样式上的表现。

<!--DemoStart--> 
简单的Checkboxs，使用`checked`切换选中状态。
```js
log(e,value){
  console.log(`checked = ${e.target.checked} - ${value}`);
}
render() {
  return (
    <div>
        <Checkbox onChange={this.log.bind(this)}>未选中</Checkbox>
        <Checkbox onChange={this.log.bind(this)} checked >选中</Checkbox>
        <Checkbox onChange={this.log.bind(this)} indeterminate >半选中</Checkbox>
    </div>
  )
}
```
<!--End-->


### 不可用(禁用)

通过设置`disabled`属性来禁用多选框。

<!--DemoStart-->
```js
log(e,value){
  console.log(`checked = ${e.target.checked} - ${value}`);
}
render() {
  return (
    <div>
        <Checkbox disabled onChange={this.log.bind(this)}>未选中禁用</Checkbox>
        <Checkbox disabled onChange={this.log.bind(this)} checked>选中禁用</Checkbox>
        <Checkbox disabled onChange={this.log.bind(this)} indeterminate>半选中禁用</Checkbox>
    </div>
  )
}
```
<!--End-->



### 受控的

联动 checkbox。

<!--DemoStart-->
```js
constructor(props) {
  super(props);
  this.state = {
    indeterminate: true
  }
}
log(e,value){
  console.log(`checked = ${e.target.checked} - ${value}`);
}
handleChange(){
  console.log("!this.state.indeterminate::",!this.state.indeterminate)
  this.setState({
    indeterminate:!this.state.indeterminate
  })
}
render() {
  return (
    <div>
      <Checkbox indeterminate={this.state.indeterminate} onChange={this.log.bind(this)}>半选中</Checkbox>
      <Button size="mini" onClick={this.handleChange.bind(this)}>切换半选中</Button>
    </div>
  )
}
```
<!--End-->


### 切换半选中

联动 `Checkbox`。

<!--DemoStart-->
```js
constructor(props) {
  super(props);
  this.state = {
    checked3: true,
    disabled3: true,
  }
}
handleChange(e,value){
  console.log(`checked = ${e.target.checked} - ${value}`);
  this.setState({
    checked3: value,
  });
}
render() {
  return (
    <div>
      <Checkbox checked={this.state.checked3} disabled={this.state.disabled3} 
        onChange={this.handleChange.bind(this)}>
        {`${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`}
      </Checkbox>
      <div style={{padding:"10px 0 0 0"}}>
        <Button
          size="mini"
          onClick={() => {
            this.setState({ checked3: !this.state.checked3 });
          }}
        >
          {!this.state.checked3 ? 'Check' : 'Uncheck'}
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          size="mini"
          onClick={() => {
            this.setState({ disabled3: !this.state.disabled3 });
          }}
        >
          {!this.state.disabled3 ? 'Disable' : 'Enable'}
        </Button>
      </div>
    </div>
  )
}
```
<!--End-->


### Checkbox 组

方便的从数组生成 `Checkbox` 组。

<!--DemoStart-->
```js
constructor(props) {
  super(props);
  this.state = {
    checked3: true,
    disabled3: true,
  }
}
render() {
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const options = [
      { value: 'Apple' },
      { value: 'Pear' },
      { value: 'Orange' },
    ];
    const optionsWithDisabled = [
      { value: 'Apple' },
      { value: 'Pear' },
      { value: 'Orange', disabled: false },
    ];
    const CheckboxGroup = Checkbox.Group;
    return (
      <div>            
        <CheckboxGroup 
          options={plainOptions} 
          checkedValues={['Apple']} 
          onChange={(e,checkedValues,value,checked)=>{
            console.log('checked = ', checkedValues);
          }} 
        />
        <br />
        <CheckboxGroup 
          options={optionsWithDisabled} 
          disabled 
          checkedValues={['Apple']} 
          onChange={(e,checkedValues)=>{
            console.log('checked = ', checkedValues);
          }} 
        />
      </div>
    )
}
```
<!--End-->


### 全选

在实现全选效果时，你可能会用到 `indeterminate` 属性。

<!--DemoStart-->
```js
constructor(props) {
  super(props);
  this.state = {
    checked3: true,
    disabled3: true,

    checkedList: ['Apple', 'Pear'],
    indeterminate: true,
    checkAll: false,

    plainOptions:['Apple', 'Pear', 'Orange']
  }
}
onChange(e,checkedList,value,checked){
  const {plainOptions} = this.state
  console.log("checkedList:",checkedList,value,checked,plainOptions)
  this.setState({
    checkedList,
    indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
    checkAll: checkedList.length === plainOptions.length,
  });
}
render() {
    const defaultCheckedList = ['Apple', 'Orange'];
    const {plainOptions} = this.state
    const options = [
      { value: 'Apple' },
      { value: 'Pear' },
      { value: 'Orange' },
    ];
    const optionsWithDisabled = [
      { value: 'Apple' },
      { value: 'Pear' },
      { value: 'Orange', disabled: false },
    ];
    const CheckboxGroup = Checkbox.Group;
    return (
      <div>            
        <div style={{ borderBottom: '1px solid #E9E9E9',margin:"0 0 10px 0",padding:"0 0 10px 0 "}}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={(e,checked) => {
              console.log("--->",e,checked)
              this.setState({
                checkedList: e.target.checked ? plainOptions : [],
                indeterminate: false,
                checkAll: e.target.checked,
              });
            }}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>

        <CheckboxGroup 
          options={plainOptions} 
          checkedValues={this.state.checkedList} 
          onChange={this.onChange.bind(this)} />
      </div>
    )
}
```
<!--End-->

## API

### Checkbox Attributes

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| options | 指定当前是否选中 | Boolean | false |
| disabled | 禁用 | Boolean | false |
| onChange | 变化时回调函数 | Function(e:Event, checked:Boolean) | - |
| checked | 指定当前是否选中 | Boolean | false |
| indeterminate | 半选中，只负责样式控制 | Boollean | false |

### Checkbox Group Attributes

| 参数      | 说明    | 类型      |  默认值   |
|--------- |-------- |---------- |-------- |
| options | 指定可选 | string[] | [] |
| checkedValues | 默认选中的选 | string[] | [] |
| onChange | 变化时回调函数 | Function(e:Event,checkedValues:Array, value:String, checked:Boolean) | - |
| disabled | 禁用所有，[options]中设置，disabled=false 取消禁用 | Boolean | false |