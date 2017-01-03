# jQuery源码4-jQuery扩展

#### 调用Sizzle方法

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

#### 变量

##### rneedsContext

```javascript
var rneedsContext = jQuery.expr.match.needsContext;
```

#### 正则

##### rsingleTag

```javascript
//快速匹配标签
var rsingleTag = /^<([a-z][^\/\0>:空格]*)[空格]*\/?>(?:<\/\1>|)$/i;
```

##### risSimple

```javascript
var risSimple = /^.[^:#\[\.,]*$/;
```



#### 方法

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
//获取所有后面的兄弟节点(不包括elem)
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
}
```

