Calendar 日历
===

按照日历形式展示数据的容器。

## 基础用法

一个通用的日历面板，支持年/月切换。

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Calendar />
    )
  }
}
```
<!--End-->

## 通知事项日历

在日历面板上面添加通知事件，还可以通过设置`disabledDate`来禁止部分日期点击，如下实例每月`12`号不能点击。

<!--DemoStart--> 
```js
function disabledDate(current) {
  // 每个月 12 号禁止选中
  return current.day === 12;
}
function getListData(value) {
  let listData;
  switch (value) {
    case 8:
      listData = [
        { type: 'warning', content: '小弟调调，生日' },
        { type: 'success', content: '见客户' },
      ]; break;
    case 10:
      listData = [
        { type: 'warning', content: 'DatePicker添加disabledDate禁用属性.' },
        { type: 'success', content: '组件Avatar添加小尺寸.' },
        { type: 'error', content: 'scrollTop方法问题修复。' },
      ]; break;
    case 15:
      listData = [
        { type: 'warning', content: 'EVGA宣布以1000美元天价回收GeForce 4显卡' },
        { type: 'success', content: '中国电动车初创公司蔚来据称考虑明年赴美上市。' },
        { type: 'error', content: '组件库库uiw 1.5.5 发布' },
        { type: 'error', content: '美区 iMac Pro 正式发售 中国区将于近期发售。' },
        { type: 'error', content: '《人民日报》评玩命视频：带血的钱不能赚' },
        { type: 'error', content: '分析师：iPhone X销量尚可 但不会带来超级更新周期' },
      ]; break;
    default:
  }
  return listData || [];
}
const styles = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
  textOverflow: 'ellipsis',
  fontSize: '12px',
}
function dateCellRender(dateItem){
  return (
    <div>
      {getListData(dateItem.day).map((item,index)=>{
        return (
          <Badge key={index} style={styles} status={item.type}>
            <span>{item.content}</span>
          </Badge>
        )
      })}
    </div>
  );
};

function monthCellRender(date,month){
  console.log('date.getMonth():',month);
  return (
    <div>
      {getListData(month).map((item,index)=>{
        return (
          <Badge key={index} style={styles} status={item.type}>
            <span>{item.content}</span>
          </Badge>
        )
      })}
    </div>
  );
}

function onClick(item){
  console.log('item:',item);
}
class Demo extends Component {
  render() {
    return (
      <Calendar 
        disabledDate={disabledDate}
        weekLabel={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onClick={onClick}
      />
    )
  }
}
```
<!--End-->


## 通知事项月份日历

在日历面板上面添加通知事件。

<!--DemoStart--> 
```js
function disabledDate(current) {
  // 每个月 12 号禁止选中
  return current.day === 12;
}
function getListData(value) {
  let listData;
  switch (value) {
    case 8:
      listData = [
        { type: 'warning', content: '小弟调调，生日' },
        { type: 'success', content: '见客户' },
      ]; 
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'DatePicker添加disabledDate禁用属性.' },
        { type: 'success', content: '组件Avatar添加小尺寸.' },
        { type: 'error', content: 'scrollTop方法问题修复。' },
        { type: 'warning', content: 'DatePicker添加disabledDate禁用属性.' },
        { type: 'success', content: '组件Avatar添加小尺寸.' },
        { type: 'error', content: 'scrollTop方法问题修复。' },
        { type: 'warning', content: 'DatePicker添加disabledDate禁用属性.' },
        { type: 'success', content: '组件Avatar添加小尺寸.' },
        { type: 'error', content: 'scrollTop方法问题修复。' },
      ]; 
      break;
    default: listData=[]; break;
  }
  return listData || [];
}
const styles = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
  textOverflow: 'ellipsis',
  fontSize: '12px',
}

function monthCellRender(date,month){
  const year = date.getFullYear();
  const newYear = (new Date()).getFullYear();
  if(year!==newYear) return null;
  return (
    <div>
      {getListData(month).map((item,index)=>{
        return (
          <Badge key={index} style={styles} status={item.type}>
            <span>{item.content}</span>
          </Badge>
        )
      })}
    </div>
  );
}

function onClick(item){
  console.log('item:',item);
}
class Demo extends Component {
  render() {
    return (
      <Calendar 
        disabledDate={disabledDate}
        weekLabel={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
        monthCellRender={monthCellRender}
        mode="year"
        onClick={onClick}
      />
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
import { Calendar } from 'uiw';
// or
import Calendar from 'uiw/lib/calendar';
```

### Calendar

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| weekLabel | 星期显示文本 | Array | `['日', '一', '二', '三', '四', '五', '六']` |
| dateCellRender | 自定义渲染日期单元格，返回内容会被追加到单元格 | function(date:{day,month,date,format,week})=> ReactNode | - |
| monthCellRender | 自定义渲染月单元格，返回内容会被追加到单元格 | function(date:{date,month})=> ReactNode | - |
| disabledDate | 不可选择的日期 | function(date:{day,month,date,format,week})=> Boolean | - |
| onClick | 点击选择日期回调 | function(date:{day,month,date,format,week})=> ReactNode | - |
| date | 默认展示今天 | Date | `new Date()` |
| mode | 展示日期面板 | Enum{`year`, `month`, `week`} | `month` |
