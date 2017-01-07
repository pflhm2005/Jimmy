

# jQuery源码4-jQuery初始化

#### jQuery调用Sizzle方法

```javascript
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

//不赞成?
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;
```



---



#### 正则

##### risSimple

```javascript
var risSimple = /^.[^:#\[\.,]*$/;
```

##### rneedsContext

```javascript
//等于:/^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
var rneedsContext = jQuery.expr.match.needsContext;
```

##### rsingleTag

```javascript
//快速匹配标签
var rsingleTag = /^<([a-z][^\/\0>:空格]*)[空格]*\/?>(?:<\/\1>|)$/i;
```





#### 功能方法

##### dir

```javascript
var dir = function(elem,dir,until){
  var match = [],
      truncate = until !== undefined;
  while((elem = elem[dir]) && elem.nodeType !== 9){
    if(elem.nodeType === 1){
      if(truncate && jQuery(elem).is(until)){
        break;
      }
      matched.push(elem);
    }
  }
  return matched;
};
```

##### siblings

```javascript
//获取兄弟节点(不包括elem)
var siblings = function(n,elem){
  var match = [];
  for(;n;n = n.nextSibling){
    if(n.nodeType === 1 && n !== elem){
      matched.push(n);
    }
  }
  return matched;
};
```

##### winnow

```javascript
function winnow(elements,qualifier,not){
  
  //函数
  if(jQuery.isFuntion(qualifier)){
    return jQuery.grep(elements,function(elem,i){
      return !!qualifier.call(elem,i,elem) !== not;
    });
  }
  
  //简单元素
  if(qualifier.nodeType){
    return jQuery.grep(elements,function(elem){
      return (elem === qualifier) !== not;
    });
  }
  
  //类数组
  if(type qualifier !== "string"){
    return jQuery.grep(elements,function(elem){
      return (indexOf.call(qualifier,elem) > -1) !== not;
    });
  }
  
  //简单选择器 
  if(risSimple.test(qualifier)){
    return jQuery.filter(qualifier,elements,not);
  }
  
  //复杂选择器
  qualifier = jQuery.filter(qualifier,elements);
  return jQuery.grep(elements,function(elem){
    return (indexOf.call(qualifier,elem) > -1) !== not && elem.nodeType === 1;
  });
}
```



---



#### jQuery方法

##### jQuery.filter

```javascript
var jQuery.filter = function(expr,elems,not){
  var elem = elems[0];
  if(not){
    expr = ":not(" + expr + ")";
  }
  if(elems.length === 1 && elem.nodeType === 1){
    return jQuery.find.matchesSelector(elem,expr) ? 
      [elem] : [];
  }
  return jQuery.find.matches(expr,jQuery.grep(elems,function(elem){
    return elem.nodeType === 1;
  }));
};
```

---



#### jQuery.extend()主方法

```javascript
//合并对象 接受2-n个参数 (布尔值,合并对象1,...)
jQuery.extend = jQuery.fn.extend = function(){
  var options,name,src,copy,copyIsArray,clone,
    target = arguments[0]||{},	//第一个参数给target
    i = 1,
    length = arguments.length,
    deep = false;
  
  //如果第一个参数是布尔值 处理深拷贝环境
  if( typeof target==="boolean" ){
    //第一个参数给deep变量
    deep = target;
    //第二个参数给target
    target = arguments[i]||{};
    i++;	//2
  }
  
  //若target不是对象或者函数 设置为空对象
  if( typeof target !== "object" && !jQuery.isFunction(target) ){
    target={};
  }
  
  //如果只提供一个对象参数 扩展jQuery
  if( i === length ){
    //target设置为空jQuery对象
    target = this;
    i--;	//1
  }
  
  for( ; i<length; i++ ){
    if(( options = arguments[i] ) != null ){
      for( name in options ){
        src = target[name];	//合并后的对象
        copy = options[name];	//被拷贝的对象
        //防止无限循环
        if( target === copy ){
          continue;
        }
        //
        if( deep && copy && ( jQuery.isPlainObject(copy) || ( copyIsArray = jQuery.isArray(copy)))){
          if(copyIsArray){
            copyIsArray=false;
            clone = src && jQuery.isArray(src) ? src : [];
          }
          else{
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }
          //递归实现深拷贝
          target[name]=jQuery.extend(deep,clone,copy);
        }
        //去除undefined值
        //浅拷贝
        else if( copy !== undefined )[
          target[name]=copy;
        ]
      }
    }
  }
    return target;
};
```



----



#### jQuery.fn.extend





##### filter

```javascript
filter: function(selector){
  return this.pushStack( winnow( this, selector || [], false) );
}
```



---

##### find

```javascript
find: function(selector){
  var i,ret,
      //this指向调用find方法的对象
      len = this.length,
      self = this;
  //传入的选择器不是字符串
  if(typeof selector !== "string"){
    //调用 $(selector) 包装后进行过滤
    return this.pushStack( jQuery( selector).filter(funtion(){
      for(i = 0;i < len;i++){
        if(jQuery.contains(self[i],this)){
          return true;
        }
      }
    }));
  }
}
```



---

##### not

```javascript
not: function(selector){
  return this.pushStack( winnow( this, selector || [], true) );
}
```



---

##### is

```javascript
is: function(){
  return !!winnow( this, typeof)
}
```



##### 