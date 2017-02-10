#	HTML5/CSS3

#### HTML5简介

- 狭义：

  > HTML4.0的升级版
  >
  > HTML+CSS+JS api 技术组合


- 广义：

  > 行业的代名词 -- HTML5工程师
  >
  > 行业的最新技术



---



#### 语法规范

1. 文档声明：<!DOCTYPE html>
2. 字符集编码：<meta charset="UTF-8">  

> 还有GBK、GB2312等



---



#### 语义化标签

- 优点：

  > 便于SEO优化

  > 便于维护修改
  >
  > 方便屏幕阅读器解析


- 常见新标签

  > <header></header> 头部
  >
  > <nav></nav>           导航
  >
  > <main></main>       主要区域
  >
  > <aside></aside>       侧边栏
  >
  > <section></section> 独立段、节
  >
  > <footer></footer>     底部

- 不常见的新标签

  > <mark></mark>               标记
  >
  > <progress></progress>    进度条
  >
  > <meter></meter>             度量器
  >
  > <detail></detail>             详细信息
  >
  > <summary></summary> 标题



---



#### 表单

- 表单输入类型

  > email	邮箱地址
  >
  > url            网址
  >
  > search      搜索
  >
  > tel            电话号码 
  >
  > number    数字
  >
  > range       范围
  >
  > time         时间       xx-xx
  >
  > date         日期       xxxx-xx-xx
  >
  > color        颜色      value="完整16进制"

- 表单元素datalist

  > - 用法:
  >
  > ```
  > - 
  > -     <input type="text" list=""/>
  >       <datalist id="">
  >        <option value=""></option>
  >       </datalist>
  > - 
  > ```
  >
  > - 注意：input中list的值必须与datalist的id值一样

- 表单属性

  > placeholer	占位符 提示输入信息
  >
  > autofocus
  >
  > autocomplete   输入提交后 再次输入相同内容自动填充表单 依赖name属性
  >
  > required
  >
  > pattern
  >
  > multiple

- 表单事件

  > oninput		
  >
  > oninvalid
  >
  > setCustomValidity()	改变默认错误提示内容



---



#### 多媒体标签

- audio(wav/ogg/mp3)

  > controls 	播放菜单
  >
  > autoplay	自动播放
  >
  > loop		循环播放
  >
  > ```javascript
  > <audio controls>
  >    <source src="music/SeeYouAgain.mp3" >
  >    <source src="music/SeeYouAgain.ogg" >
  >    <source src="music/SeeYouAgain.wav" >
  > </audio>
  > ```

- video(mp4/ogg/WebM)

  > controls 	播放菜单
  >
  > autoplay	自动播放
  >
  > loop		循环播放
  >
  > ```javascript
  > //etc
  > ```



---



#### DOM扩展

- 元素获取

  > document.querySelector()		选取第一个符合条件的元素
  >
  > document.querySelectorAll() 		返回符合条件的元素类数组

- 类名操作

  > add: node.classList.add()
  >
  > remove: node.classList.remove()
  >
  > contains: node.classList.contains()
  >
  > toggle: node.classList.toggle()

- 自定义属性

  > 写法	data-\*  or  data-\*-\*
  >
  > 获取	node.dataset-\*
  >
  > 设置	node.dataset.\* = value

- 案例（略）



