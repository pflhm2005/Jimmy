# HTML5/CSS3

## web字体

### 使用

1. 下载fontmin软件
2. 下载ttf格式的字体文件
3. 把ttf拉倒fontmin软件中
4. 软件自动生成对应文件
5. 引入字体文件

### 特点

1. 放大不失真
2. 可通过font-size调整大小
3. 有效减小网站的总大小



---



## 伸缩布局

### 术语

> 主轴：伸缩容器方向
>
> 侧轴：垂直主轴且不可变
>
> 伸缩容器：display:block
>
> 伸缩项目：容器子元素
>
> 起始点：默认左上角

### 属性

> 方向：flex-direction: row(-reverse) | column(-reverse)
>
> 伸缩项目主轴方向对齐：justify-content: (flex-start | end) | (center) | (space-between) | (space-around)
>
> 换行样式：flex-wrap: (nowrap) | (wrap)
>
> 不换行样式：align-items: (flex-start) | (flex-end) | (center)
>
> 伸缩项目属性：flex: \d    所占空间
>
> ​			 order: \d    项目顺序
>
> ​			 align-self:    (...)	对齐方式

