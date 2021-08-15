Carousel 走马灯
===


### 最简单的用法

<!--DemoStart--> 
```js
onChange(a,b,c){
  console.log(a, b, c);
}
render() {
  let style = {
    textAlign: 'center',
    height: 160,
    width:100,
    linearHeight: 160,
    background: '#b7b7b7',
    overflow: 'hidden',
  };
  return (
    <Carousel   easing='linear'  afterChange={this.onChange} >
      <div style={style}><h3 style={{color:'#fff'}}>1</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>2</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>3</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>4</h3></div>
    </Carousel>
  )
}
```
<!--End-->


### 垂直显示

<!--DemoStart--> 
```js
onChange(a,b,c){
  console.log(a, b, c);
}
render() {
  let style = {
    textAlign: 'center',
    height: 160,
    linearHeight: 160,
    background: '#b7b7b7',
    overflow: 'hidden',
  };
  return (
    <Carousel vertical  afterChange={this.onChange} >
      <div style={style}><h3 style={{color:'#fff'}}>1</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>2</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>3</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>4</h3></div>
    </Carousel>
  )
}
```
<!--End-->

### 渐显

<!--DemoStart--> 
```js
onChange(a,b,c){
  console.log(a, b, c);
}
render() {
  let style = {
    textAlign: 'center',
    height: 160,
    linearHeight: 160,
    width:50,
    background: '#b7b7b7',
    overflow: 'hidden',
  };
  return (
    <Carousel effect="fade" afterChange={this.onChange} >
      <div style={style}><h3 style={{color:'#fff'}}>1</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>2</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>3</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>4</h3></div>
    </Carousel>
  )
}
```
<!--End-->


### 自动切换

<!--DemoStart--> 
```js
onChange(a,b,c){
  console.log(a, b, c);
}
render() {
  let style = {
    textAlign: 'center',
    height: 160,
    linearHeight: 160,
    background: '#b7b7b7',
    overflow: 'hidden',
  };
  return (
    <Carousel autoplay afterChange={this.onChange} >
      <div style={style}><h3 style={{color:'#fff'}}>1</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>2</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>3</h3></div>
      <div style={style}><h3 style={{color:'#fff'}}>4</h3></div>
    </Carousel>
  )
}
```
<!--End-->

## API

### Carousel

更多参数可参考：[akiran/react-slick](https://github.com/akiran/react-slick)

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| effect | 动画效果函数，可取 scrollx, fade | String | 'srcollx' |
| dots | 是否显示面板指示点 | Boolean | `true` |
| vertical | 垂直显示 | Boolean | `false` |
| autoplay | 是否自动切换 | Boolean | `false` |
| easing | 动画效果 | String | 'linear' |
| draggable | 拖拽切换 | Boolean | `false` |
| beforeChange | 切换面板的回调 | function(from, to) | 无 |
| afterChange | 切换面板的回调 | function(current) | 无 |