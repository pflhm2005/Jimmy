# HTML5/CSS3

#### 边框



##### 半径

> border-radius : x x x x / y y y y (左上-右上-右下-左下)(x轴-y轴)
>
> ... : 50%	正圆



---



#####  边框图片

> border-image-source : url("")
>
> border-image-slice : num(值不带参数)
>
> border-image-repear : repeat round(推荐 自动调整)





#### 背景尺寸



##### background-size

> cover	(自调整完全覆盖) 
>
> contain	(图片完整)
>
> @media screen and (max-width : \*px){}	(根据分辨图更换图片)



---



##### background-imge(多重背景)

> background-image:url("") xx , 
>
> ​				url("") xx , 
>
> ​				...



---



##### background-origin(背景原点)

> border-box	原点在border区域内	default?
>
> padding-box	原点在padding区域内	这个好使
>
> content-box	原点在内容区域内





#### 渐变



##### 线性(linear)

> background-image : linear-gradient ( dir(to top or \*)/(\*)deg  ,  [color  position(% or px)] , [...] )
>
> 角度，[颜色 位置] , [颜色 位置] ,  ...



---



##### 径向(radial)

> background-image : radial-gradient( radius(px)  at  position(px px)  ,  [color positon] , [...])
>
> 半径 at 圆心 ，[颜色 位置]，[颜色 位置]，...





#### 过渡(transition)



> transition : property duration delay timing-function
>
> 属性  过渡时间  延迟  过渡算法
>
> transition : all 1s



