Form 表单
===

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

## 基础实例

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: 'wui',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称' },
          { min: 5, message: '长度不够！' }
        ],
        password: [
          { required: true, message: '不能为空！' },
          { min: 6, message: '长度不够！' },
          { max: 14, message: '长度超出！' }
        ]
      }
    }
  }
  onChange(key, e, value) {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.validate((valid, dataValues) => {
      console.log("返回内容:", dataValues, valid)
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  render() {
    const { form, rules } = this.state;
    const FormItem = Form.Item;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        className: "colspanlab"
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        className: "colspan"
      },
    };
    const wrapperCol = {
      wrapperCol: {
        xs: { span: 24, offset: 0, },
        sm: { span: 14, offset: 4, },
      },
    }
    return (
      <Form
        style={{ maxWidth: 500, padding: '30px 0 0 0' }}
        ref={(component)=>{this.form=component}}
        className="sss"
        model={form}
        rules={rules}
      >
        <FormItem label={<span>用户名</span>} field="name" {...formItemLayout} >
          <Input
            value={form.name}
            preIcon="user"
            placeholder="请输入用户名"
            onChange={this.onChange.bind(this, 'name')} />
        </FormItem>
        <FormItem label="密码" field="password" {...formItemLayout} >
          <Input
            // 注意字段 password
            value={form.password}
            preIcon="unlock"
            type="password"
            placeholder="请输入密码"
            onChange={this.onChange.bind(this, 'password')} />
        </FormItem>
        <FormItem {...wrapperCol}>
          <Button size="small" type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}
```
<!--End-->

### 表单集合

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "wui",
        password: "",
        email: "wwww@qq.com",
        select: "选项4",
        selectMultiple: ['选项1','选项3','选项5'],
        timeSelect: new Date(2017, 6, 28, 15, 51),
        online: true,
        carte: ['湖北菜'],
        category_radio: ["保密"],
        category: ["香蕉","橘子"],
        radio:1,
        radioGroup:"", // 如果是数字类型，必须设置组件 value={6} 也是数字型
        radioGroupDisabled:"乔布斯",
        inputNumber:0,
      },
      selectOptions: [
        { value: '选项1', label: '红葡萄酒' }, 
        { value: '选项2', label: '绍兴黄酒', disabled: true}, 
        { value: '选项3', label: '燕京啤酒' }, 
        { value: '选项4', label: '楚乡王白酒' }, 
        { value: '选项5', label: '五粮液' },
      ],
      tagRadioOptions:[
        {color:"purple", value:'保密'},
        {color:"orange", value:'男生'},
        {color:"green", value:'女生'}
      ],
      tagOptions:[
        {color:"purple", value:'苹果'},
        {color:"orange", value:'橘子'},
        {color:"green", value:'香蕉'}
      ],
      selectMultipleOptions:[
        { value: '选项1', label: '红葡萄酒' }, 
        { value: '选项2', label: '绍兴黄酒'}, 
        { value: '选项3', label: '燕京啤酒' }, 
        { value: '选项4', label: '楚乡王白酒' }, 
        { value: '选项5', label: '五粮液' },
        { value: '选项6', label: '绍兴黄酒', disabled: true}, 
        { value: '选项7', label: '燕京啤酒' }, 
        { value: '选项8', label: '楚乡王白酒' }, 
        { value: '选项9', label: '五粮液' },
      ],
      radioOptionsDisabled:[
        {label: '乔布斯', value: '乔布斯' },
        {label: '比尔盖茨', value: '比尔盖茨' },
        {label: '乔纳森', value: '乔纳森' ,disabled: true },
      ],
      checkboxOption:['四川菜', '湖北菜', '湘菜', '粤菜'],
      rules:{
        name:[
          { required: true, message: '请输入活动名称'},
          { min: 4, message: '长度不够！'}
        ],
        timeSelect:[
          { required: true, message: '请选择时间！'},
        ],
        password:[
          { required: true, message: '不能为空！'},
          { min: 6, message: '长度不够！'},
          { max: 14, message: '长度超出！'}
        ],
        email:[
          {type: 'email', message: '输入的不是E-mail!'}
        ],
        category:[
          {required: true, message: '必须选择一个选项！'}
        ],
        carte:[
          {required: true, message: '不能为空！'},
          {
            // 自定义校验规则 callback() 必须调用
            validator:(rule, value,callback)=>{
              if(value.length > 1){
                callback();
              }else{
                callback(new Error("至少选两个选项"));
              }
            }
          }
        ]
      },
    };
  }

  onChange(key,e, value) {
    const {form} = this.state;
    console.log("value:==:",key,value,e)
    form[key] = value;
    this.setState({form});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.validate((valid,dataValues) => {
      console.log("返回内容:",dataValues,valid)
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset(e) {
    e.preventDefault();
    console.log("--reset22:",this.state.form)
    this.form.resetFields((model)=>{
      this.setState({form:model})
    });
  }

  render() {
    const {form,rules} = this.state;
    const FormItem = Form.Item;
    const TagGroup = Tag.Group;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        className:"colspanlab"
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        className:"colspan"
      },
    };
    const wrapperCol = {
      wrapperCol: {
        xs: {span: 24, offset: 0, },
        sm: {span: 14, offset: 4, },
      },
    }
    return (
      <Form
        style={{ maxWidth: 500 }}
        ref={component => this.form = component}
        model={form}
        rules={rules}
      >
        <FormItem label={<span>用户名</span>} field="name" {...formItemLayout} >
          <Input 
            value={form.name} 
            placeholder="请输入用户名"
            onChange={this.onChange.bind(this, 'name')} />
        </FormItem>
        <FormItem label={<span>用户名</span>} field="name" {...formItemLayout} >
          <Select
            onChange={this.onChange.bind(this)}
            filterable={true}
            multiple={true}
            style={{ maxWidth: 300 }}
            value={form.selectMultiple}
          >
            {this.state.selectMultipleOptions.map((elm, idx) => {
              return <Select.Option key={idx} label={elm.label} value={elm.value} disabled={elm.disabled} />
            })}
          </Select>
        </FormItem>
        <FormItem label="密码" field="password" help="这里显示对密码的帮助，比如只能英文字母"  {...formItemLayout} >
          <Input 
            // 注意字段 password
            value={form.password} 
            type="password"
            placeholder="请输入密码"
            icon="lock"
            onChange={this.onChange.bind(this, 'password')} />
        </FormItem>
        <FormItem label="输入数字" field="inputNumber" help="输入数字5~100"  {...formItemLayout} >
          <InputNumber value={form.inputNumber} onChange={this.onChange.bind(this,'inputNumber')} min="5" max="100"></InputNumber>
        </FormItem>
        <FormItem label="选择器" field="select" help="输入数字5~100"  {...formItemLayout} >
          <Select onChange={this.onChange.bind(this,'select')} value={form.select}>
            {
              this.state.selectOptions.map(elm => {
                return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />
              })
            }
          </Select>
        </FormItem>
        <FormItem label="时间选择" field="timeSelect"  {...formItemLayout} >
          <TimeSelect
            start="08:30"
            step="00:15"
            end="18:30"
            //maxTime="12:30"
            //readOnly="2323"
            minTime="9:30"
            onChange={this.onChange.bind(this, 'timeSelect')}
            value={form.timeSelect}
            placeholder="选择时间"
            />
        </FormItem>
        <FormItem label="是否在线" field="online" {...formItemLayout} >
          <Switch checked={form.online} 
          onChange={this.onChange.bind(this, 'online')}/>
        </FormItem>
        <FormItem label="邮箱" field="email" {...formItemLayout} >
          <Input 
            value={form.email}
            placeholder="请输入邮箱"
            onChange={this.onChange.bind(this, 'email')} />
        </FormItem>
        <FormItem label="分类单选" field="category_radio" {...formItemLayout} >
          <TagGroup 
            options={this.state.tagRadioOptions}
            checked={true}
            isRadio={true}
            checkedValues={form.category_radio} 
            onChange={this.onChange.bind(this, 'category_radio')}
          />
        </FormItem>
        <FormItem label="分类多选" field="category" {...formItemLayout} >
          <TagGroup 
            options={this.state.tagOptions}
            checked={true}
            checkedValues={form.category} 
            onChange={this.onChange.bind(this, 'category')}
          />
        </FormItem>
        <FormItem label="多选" field="carte" {...formItemLayout} >
          <Checkbox.Group 
            options={this.state.checkboxOption}
            checkedValues={form.carte} 
            onChange={this.onChange.bind(this, 'carte')} 
          />
        </FormItem>
        <FormItem label="单选" field="radio" {...formItemLayout} >
          <div style={{margin:"7px 0"}}>
            <Radio value={1} checked={form.radio === 1} 
              onChange={this.onChange.bind(this,"radio")}>备选项</Radio>
            <Radio value={2} checked={form.radio === 2} 
              onChange={this.onChange.bind(this,"radio")}>备选项</Radio>
          </div>
        </FormItem>
        <FormItem label="单选组" field="radioGroup" {...formItemLayout} >
          <div style={{margin:"7px 0"}}>
            <Radio.Group value={form.radioGroup} onChange={this.onChange.bind(this,'radioGroup')}>
              <Radio value="3">高晓松</Radio>
              <Radio value="6">周杰伦</Radio>
              <Radio value="9">黄家驹</Radio>
            </Radio.Group>
          </div>
        </FormItem>
        <FormItem label="单选组配置" field="radioGroupDisabled" {...formItemLayout} >
          <div style={{margin:"7px 0"}}>
            <Radio.Group 
              options={this.state.radioOptionsDisabled} 
              value={form.radioGroupDisabled} 
              onChange={this.onChange.bind(this,'radioGroupDisabled')} />
          </div>
        </FormItem>
        <FormItem {...wrapperCol}>
          <Button size="small" type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
          <Button size="small" onClick={this.handleReset.bind(this)}>重置</Button>
          <Button size="small" onClick={()=>{
            console.log(this.state.form)
            }}>查看State</Button>
        </FormItem>
      </Form>
    )
  }
}
```
<!--End-->

### 水平登录栏  

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name:'wui',
        password: '',
      },
      rules:{
        name:[
          { required: true, message: '请输入活动名称'},
          { min: 5, message: '长度不够！'}
        ],
        password:[
          { required: true, message: '不能为空！'},
          { min: 6, message: '长度不够！'},
          { max: 14, message: '长度超出！'}
        ],
      }
    }
  }

  onChange(key,e, value) {
    const {form} = this.state;
    form[key] = value;
    this.setState({form});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.validate((valid,dataValues) => {
      console.log("返回内容:",dataValues,valid)
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.form.resetFields((model)=>{
      this.setState({form:model})
    });
  }

  render() {
    const {form,rules} = this.state;
    const FormItem = Form.Item;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 4 }, className:"colspanlab" },
      wrapperCol: { xs: { span: 24 }, sm: { span: 14 }, className:"colspan" },
    };
    const wrapperCol = {
      wrapperCol: { xs: {span: 24, offset: 0, }, sm: {span: 14, offset: 4, }, },
    }
    return (
      <Form
        layout="inline"
        style={{ maxWidth: 500, padding: '10px 0 0 0' }}
        ref={(component)=>{this.form=component}}
        model={form}
        rules={rules}
      >
        <FormItem field="name" {...formItemLayout} >
          <Input 
            value={form.name} 
            preIcon="user"
            placeholder="请输入用户名"
            onChange={this.onChange.bind(this, 'name')} />
        </FormItem>
        <FormItem field="password" {...formItemLayout} >
          <Input 
            // 注意字段 password
            value={form.password} 
            preIcon="unlock"
            type="password"
            placeholder="请输入密码"
            onChange={this.onChange.bind(this, 'password')} />
        </FormItem>
        <FormItem {...wrapperCol}>
          <Button size="small" type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
        </FormItem>
      </Form>
    )
  }
}
```
<!--End-->


### 表单布局

表单有三种布局，layout = `horizontal`横、`vertical`竖、`inline`行内；

<!--DemoStart--> 
```js
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plainOptions:[
        {color:"purple", value:'horizontal'},
        {color:"orange", value:'vertical'},
        {color:"green", value:'inline'}
      ],
      formLayout:'vertical',
      form: {
        name:'wui',
        password: '',
        email: '',
      },
      rules:{
        name:[
          { required: true, message: '请输入活动名称'},
          { min: 5, message: '长度不够！'}
        ],
        password:[
          { required: true, message: '不能为空！'},
          { min: 6, message: '长度不够！'},
          { max: 14, message: '长度超出！'}
        ],
        email:[
          {type: 'email', message: '输入的不是E-mail!'}
        ]
      }
    }
  }

  onChange(key,e, value) {
    const {form} = this.state;
    form[key] = value;
    this.setState({form});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.validate((valid,dataValues) => {
      console.log("返回内容:",dataValues,valid)
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.form.resetFields((model)=>{
      this.setState({form:model})
    });
  }

  render() {
    const {form,rules,formLayout} = this.state;
    const FormItem = Form.Item;
    const TagGroup = Tag.Group;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        className:"colspanlab"
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        className:"colspan"
      },
    };
    const wrapperCol = {
      wrapperCol: {
        xs: {span: 24, offset: 0, },
        sm: {span: 14, offset: 4, },
      },
    }
    return (
      <div>
        <TagGroup 
          style={{marginBottom:25}}
          options={this.state.plainOptions}
          checked={true}
          isRadio={true}
          checkedValues={[this.state.formLayout]} 
          onChange={(e,checkedValues)=>{
            console.log("checkedValues[0]::",checkedValues[0])
            this.setState({formLayout:checkedValues[0]})
          }}
        />
        <Form 
          layout={formLayout} 
          style={{ maxWidth: formLayout == 'inline' ? 'auto' : 500 }}
          ref={(component)=>{this.form=component}}
          model={form}
          rules={rules}
        >
          <FormItem label={<span>用户名</span>} field="name" {...formItemLayout} >
            <Input 
              value={form.name} 
              preIcon="user"
              placeholder="请输入用户名"
              onChange={this.onChange.bind(this, 'name')} />
          </FormItem>
          <FormItem label="密码" field="password" {...formItemLayout} >
            <Input 
              // 注意字段 password
              value={form.password} 
              preIcon="unlock"
              type="password"
              placeholder="请输入密码"
              onChange={this.onChange.bind(this, 'password')} />
          </FormItem>
          <FormItem label="邮箱" field="email" {...formItemLayout} >
            <Input 
              value={form.email}
              placeholder="请输入邮箱"
              onChange={this.onChange.bind(this, 'email')} />
          </FormItem>
          <FormItem {...wrapperCol}>
            <Button size="small" type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
            <Button size="small" onClick={this.handleReset.bind(this)}>重置</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
```
<!--End-->

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| ref | React方法，提供Form组件内部方法调用 | String | - |
| model | 表单数据对象，以及验证规则 | Object | - |
| layout | 表单布局 `horizontal` `vertical` `inline` | String | `horizontal` |

### Form refs

```html
<Form ref={(component)=>{this.form=component}}></Form>
```

上面定义`<Form/>`的ref值赋值给`this.form`

```js
// 表单重置
this.form.resetFields((model)=>{
  this.setState({form:model})
});

// 表单验证
this.form.validate((valid,dataValues) => {
  console.log("返回内容:",dataValues,valid)
  if (valid) {
    alert('submit!');
  } else {
    console.log('error submit!!');
    return false;
  }
});
```

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| validate | 对整个表单进行校验的方法 | Function(valid:Boolean,dataValues:Object) | - |
| resetFields | 对整个表单进行重置，将所有字段值重置为空并移除校验结果 | Function(model:Object) | - |

### Form model

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 表单数据对象 | Object、String、Array | - |
| rules | 校验规则，参考下方文档 | Object[] | - |


### Form.Item 

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| label | `label` 标签的文本 | String、ReactNode | - |
| field | `field` 域的名称 | String、ReactNode | - |
| labelCol | `label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | Object | - |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol` | Object | - |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | String、ReactNode | - |

### 校验规则

```js
{
    rules:[
      { required: true, message: "请输入活动名称"},
      { min: 12, message: "长度不够！"}
    ]    
}
```

`rules` 校验规则实例，校验使用的包[async-validator](https://github.com/yiminghe/async-validator)

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| message | 校验文案，错误提示信息  |  string | - |
| type    | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type) | string | `string` |
| required | 是否必选  |  boolean | `false` |
| whitespace | 必选时，空格是否会被视为错误 | boolean | false |
| len | 字段长度  |  number | - |
| min | 最小长度  |  number | - |
| max | 最大长度  |  number | - |
| enum | 枚举类型  |  string | - |
| pattern | 正则表达式校验 RegExp | - |
| validator | 自定义校验（注意，callback 必须被调用） | Function(rule, value,callback) | - |
