# HTML5/CSS3

### 转换(transform)



#### 2D转换



##### 位移

> translateX	左-右
>
> translateY	上-下
>
> translate(X,Y)		参数单位px



---



##### 旋转

> rotate(X,Y)	参数单位deg 代表角度



---



##### 缩放

> scale(0-∞)	参数代表放大倍数



---



##### 缩放原点

> transform-origin: \*		参数为关键字、百分比、数字



---



#### 	3D转换





##### 视角perspective

> 多了Z轴变换
>
> perspective: \*px	规定视角和元素对于translateZ的距离
>
> 注意：perspective与translate一起使用



----



##### 3D转换空间

> transform-style: preserve-3D



---



#### 水平垂直居中方法

> 已知宽高:	top: 50% ; left: 50% ; margin-left: -w/2 ; margin-top: -h/2 ;
>
> 未知宽高:	top,left,translate(-50%,-50%)





### 动画animation

####  用法

##### 定义动画

> @keyframe (name){
>
> 0%{}
>
> ...{}
>
> 100%{}
>
> }

##### 激活动画

> animation: (name) (time) (t-fnc) (delay-time) (infinite)