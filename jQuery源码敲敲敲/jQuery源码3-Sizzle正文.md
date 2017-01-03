# 敲敲jQuery源码-2(Sizzle正文)



#### 变量声明

```javascript
  var i,
      support,
      Expr,
      getText,
      isXML,
      tokenize,
      compile,
      select,
      outermostContext,
      sortInput,
      hasDuplicate,
      setDocument,
      document,
      docElem,
      documentIsHTML,
      rbuggyQSA,	
      rbuggyMatches,	
      matches,
      contains,
      expando = "Sizzle" + 1 * new Date(),
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      sortOrder,
      hasOwn,
      arr,
      pop,
      push_native,
      push,
      slice,
      indexOf,
      booleans;
```

#### 正则表达式

```javascript
//这个地方为什么要用字符串形式的正则啊...
//原来是当变量插入 后面不抄了 意思意思
//改成正则字面量

//匹配空字 制表符 回车符 换行符 换页符
var whitespace = /\x20\t\r\n\f/,
    //?:.是非捕获分组 匹配.或(字符-)或0-160的ASCII字符组
    //这个正则匹配变量名
    //\0:The NUL character (\u0000)
    identifier = /(?:\.|[\w-]|[^\0-\xa0])+/,
    //匹配属性
    attributes = /"\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + thitespace + "*(?:'((?:\.|[^\'])*)'|"((?:\.|[^\"])*)"|(" + idextifier + "))\) + whitespace + "*\\]"/,
    //伪类
    pseudos = ":(" + identifier + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",
    //正则集合 大概写写就行了
    //whitespace=空格
    //identifier=变量
    matchExpr = {
      "ID": /^#(变量)/,				//ID 	  #* #slide	
      "CLASS": /^\.(变量)/,			//CLASS   .*  .content
      "TAG": /^(变量|[*])/,			//标签	(div),(span)
      "ATTR": /^ + attributes/,	  //属性	   "href","src"
      "PSEUDO": /^ +pseudos/,		  //伪元素	  :first
      //子元素
      "CHILD": /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\(空格*(even|odd|(([+-]|)(\d*)n|)(空格)*(?:([+-]|)(空格).../,
      "bool": /^(?:booleans)$,i/,	  //值为布尔的属性 例如checked
      "needsContext": /.../		  //需要内容的属性
    },
    //input标签
    rinput = /^(?:input|select|textarea|button)$/i,
    //h1-h6
    rheader = /^h\d$/i,
    //匹配本地方法
    rnative = /^[^{]+\{\s*\[native \w/,
    //快速匹配单个ID,TAG,CLASS
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
    //模糊选择
    rsibling = /[+~]/,

    /*------------------------------奇怪的函数------------------------------*/   

    //匹配1-6个16进制数字
    runescape = /\([\da-f]{1,6}空格?|(空格)|.)/ig,
    //
    funescape = function( _, escaped, escapedWhitespace){
      var high = "0x" + escaped - 0x10000;
      //high是NaN 表达式high !== high才返回true
      //这个return真是吃了屎 让老子理一理
      return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
      //重写后
      //应该是这样
      if( isNaN(high) || escapedWhitespace ){
        return escaped;
      }
      else if(high < 0){
        //fromCharCode()接受一个Unicode值返回字符串
        return String.fromCharCode(high + 0x10000);
      }
      else{
        //>>运算符位右移 64(1000000)>>5 == 2(10)
        //&运算符二进制取与 2(10)&1(01) == 0(00)
        return String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
      }
    },

    //(\0-\x1f或\x7f选一个)或(-(0,1)+数字)或(-)或(非\0-\x1f加\x7f-\uFFFF加字符-)
    rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,    
    //完全不懂干啥用的
    fcssescape = function( ch, asCodePoint){
      if( asCodePoint ){
        //ch是个空字符?
        if( ch === "\0" ){
          //这个return是个问号
          return "\uFFFD";
        }
        //ch+"\"+ch最后一位的Unicode值再转成16位
        return ch.slice(0,-1) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
      } 
      //返回字符串 "\""+ch
      return "\\" + ch;
    }	
```

#### Sizzle主函数

```javascript
//selector:css选择器 context:上下文 results:结果集 seed:筛选集
function Sizzle( selector, context, results, seed){
  var m, i, elem, nid, match, groups, newSelector,
      newContext = context && context.ownerDocument,
      nodeType = context ? context.nodeType : 9;
  results = results || [];
  //节点类型 1:元素Elem 9:文档Doc 11:属性Attr
  if( typeof selector !== "string" || 
     !selector || nodeType !== 1 && 
     nodeType !==9 && nodeType !== 11){
    return results;
  }
  //seed是参数
  if( !seed ){
    if( (context ? context.ownerDocument || 
         context : preferredDoc ) !== document ){
      setDocument( context );
    }
    //上下文不设定就设置为全局
    context = context || document;
  }
  //documentIsHTML = !isXML(document)
  if( documentIsHTML ){
    //节点类型不是属性
    //requickExpr为快速匹配ID/CLASS/TAG选择器的正则
    ///^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/
    //1：ID 2：TAG 3：CLASS
    if( nodeType !== 11 && (match = requickExpr.exec( selector )) ){
      //匹配到#*
      if( m = match[1] ){
        //节点类型为document对象
        if( nodeType === 9 ){
          //
          if( (elem = context.getElementById(m)) ){
            //elem是标签 m是对应标签的ID 相等说明匹配成功
            if( elem.id === m ){
              results.push( elem );
              return results;
            }
            else{
              return results;
            }
          }
        }
        else{
          if( newContext && 
             ( elem = newContext.getElementById( m )) && 
             contains( context, elem ) && elem.id === m ){
            results.push( elem );
            return results;
          }
        }
      }---/* match[1] */
        //匹配到标签div,span等等
        else if( match[2] ){
          push.apply( results, context.getElementsByTagName( selector ) );
          return results;
        }
      //匹配到.*
      else if( (m = match[3]) && support.getElementByClassName && context.getElementByClassName ){
        push.apply( results, context.getElementByClassName( m ) );
        return results;
      }
    }
    if( support.qsa && 
       !compilerCache[ selector + " " ] && 
       (!rbuggQSA || !rbuggyQSA.test( selector )) ){
      if( nodeType !==1 ){
        newContext = context;
        newSelector = selector;
      }
      else if( context.nodeName.toLowerCase() !== "object" ){
        if( (nid = context.getAttribute("id")) ){
          nid = nid.replace( rcessescape, fcssescape );
        }
        else{
          context.setAttribute("id", (nid = expando));
        }
        //tokenize也不知道哪定义的 见上面
        groups = tokenize( selector );
        i = groups.length;
        while( i-- ){
          //toSelector
          group[i] = "#" + nid + " " + toSelector( groups[i] );
        }
        newSelector = groups.join(",");
        //扩展context为下一个选择器?
        newContext = rsibling.test( selector ) && 
          testContext( context.parentNode ) || context;
      }
      if( newSelector ){
        try{
          push.apply( results, newContext.querySelectorAll( newSelector ));
          return results;
        }
        catch( qsaError ){}
        finally{
          if( nid === expando ){
            context.removeAttribute("id");
          }
        }
      }
    }
  }
  return select( selector.replace( rtrim, "$1" ), context, results, seed );
}
```



#### Sizzle补充函数



##### Sizzle.matches

```javascript
Sizzle.matches = function(expr,elements){
  return Sizzle(expr,null,null,elements);
};
```

##### Sizzle.matchesSelector

```javascript
Sizzle.matchesSelector = function(elem,expr){
  //设置document文档
  if((elem.ownerDocument || elem) !== document){
    setDocument(elem);
  }
  //确保属性选择器已经被引用
  expr = expr.replace(rattributeQuotes,"='$1']");
  if(support.matchesSelector && documentIsHTML && 
     !compilerCache[expr + " "] && 
     (!rbuggyMatches || !rubggyMatches.test(expr)) && 
     (!rubggyQSA || !rbuggyQSA.test(expr))){
    try{
      var ret = matches.call(elem,expr);
      if(ret || support.disconnectedMatch || 
         elem.document && elem.document.nodeType !== 11){
        return ret;
      }
    } 
    catch(e){}
  }
  return Sizzle(expr,document,null,[elem]).length > 0;
};
```

##### Sizzle.contains

```javascript
Sizzle.contains = function(context,elem){
  if((context.ownerDocument || context) !== document){
    setDocument(context);
  }
  return contains(context,elem);
}
```

##### Sizzle.attr

```javascript
Sizzle.attr = function(elem,name){
  //这种代码的意思就是是否设置了document
  if(elem.ownerDocument || elem) !== document){
    setDocument(elem);
  }
  var fn = Expr.attrHandle[name.toLowerCase()],
      val = fn && hasOwn.call(Expr.attrHandle,name.toLowerCase()) ? fn(elem,name,!documentIsHTML) : undefined;
  if(val !== undefined){
    return val;
  }
  else if(support.attributes || !documentIsHTML){
    return elem.getAttribute(name);
  }
  else if((val = elem.getAttributeNode(name)) && val.specified){
    return val.value;
  }
  else{
    return null;
  }
```

##### Sizzle.escape

```javascript
Sizzle.escape = function(sel){
  return (sel + "").replace(rcssescape,fcssescape);
};
```

##### Sizzle.error

```javascript
Sizzle.error = function(msg){
  throw new Error("Syntax error,unrecognized expression: " + msg);
};
```

##### Sizzle.uniqueSort

```javascript
Sizzle.uniqueSort = function(results){
  var elem,
      duplicates = [],
      j = 0,
      i = 0;

  hasDuplicate = !support.detechDuplicates;
  sortInput = !support.sortStable && results.slice(0);
  results.sort(sortOrder);

  if(hasDuplicate){
    while(elem = results[i++]){
      if(elem === results[i]){
        j = duplicates.push[i];
      }
    }
    while(j--){
      results.splice(duplicates[j],1);
    }
  }
  sortInput = null;
  return results;
};
```



#### Sizzle内部函数



##### markFunction

```javascript
//标记函数专供Sizzle使用
function markFunction(fn){
  fn[ expando ] = true;
  return fn;
}
```

##### assert

```javascript
//好像是用这个标签元素测试什么东西
//据查是做特征测试 比如是否支持某个API
function assert(fn){
  var el = document.createElement("fieldset");
  try{
    return !!fn(el);
  }catch(e){
    return false
  }finally{
    //删掉
    if(el.parentNode){
      el.parentNode.removeChild(el);
    }
    //兼容IE
    el = null;
  }
}
```

##### addHandle

```javascript
//attrs是一个字符串
function addHandle( attrs, handler){
  var arr = attrs.split("|"),
      i = arr.length;
  while( i-- ){
    Expr.attrHandle[arr[i]] = handler;
  }
}
```

##### siblingCheck

```javascript
//兄弟元素判断?
function siblingCheck( a, b ){
  //只传一个参数 cur,diff都是undefined
  //如果b是六大false(0,"",null,undefined,NaN,false)cur=b 否则cur=a;
  //diff同理 根据短路原则哪false哪赋值
  //正常情况下cur = a , diff = a.sourceIndex - b.sourceIndex
  //sourceIndex:
  var cur = b && a,
      diff = cur && a.nodeType === 1 && b.nodeType ===1 && a.sourceIndex - b.sourceIndex;
  if(diff){
    return diff;
  }
  //如果a,b为兄弟元素则返回-1
  if(cur){
    while( (cur = cur.nextSibling) ){
      if( cur === b ){
        return -1;
      }
    }
  }
  return a ? 1 : -1;
}
```

##### createInputPseudo

```javascript
//创建输入标签的伪类
function createInputPseudo( type ){
  return function( elem ){
    var name = elem.nodeName.toLowerCase();
    return name === "input" && elem.type === type;
  };
}
```

##### createButtonPseudo

```javascript
//创建按钮标签伪类
function createButtonPseudo( type ){
  return function( elem ){
    var name = elem.nodeName.toLowerCase();
    return (name === "input" || name === "button") && elem.type ===type;
  };
}
```

##### createDisabledPseudo

```javascript
//创建有disabled属性标签伪类
function createDisabledPseudo( disabled ){
  return function( elem ){
    //表单元素
    if( "form" in elem ){
      if( elem.parentNode && elem.disabled === false ){
        if( "label" in elem ){
          return elem.parentNode.disbaled === disabled;
        }
        else{
          return elem.disabled === disabled;
        }
      }
    }
    else if( "label" in elem ){
      return elem.disabled === disabled;
    }
    return false;
  };
}
```

##### createPositionalPseudo

```javascript
//...
function createPositionalPseudo( fn ){
  return markFunction( function(argument){
    argument = +argument;
    return markFunction( function(seed,matches){
      var j,
          matchIndexs = fn([],seed.length,argument),
          i = matchIndexs.length;
      while(i--){
        if( seed[j = matchIndex[i]] ){
          seed[j] = !(matches[j] = seed[j]);
        }
      }
    });
  });
}
```

##### testContext

```javascript
//
function testContext( context ){
  return context && typeof context.getElementsByTagName !== "undefined" && context;
}
```

##### toSelector

```javascript
function toSelector(tokens){
  var i = 0,
      len = tokens.length,
      selector = "";
  for(;i < len;i++){
    selector += tokens[i].value;
  }
  return selector;
}
```

##### addCombinator

```javascript
function addCombinator(match,combinator,base){
  var dir = combinator.dir,
      skip = combinator.next,
      key = skip || dir,
      checkNonElements = base && key === "parentNode",
      doneName = done++;
  if(combinator.first){
    return function( elem, context, xml){
      while((elem = elem[dir])){
        if(elem.nodeType === 1 || checkNonElements){
          return matcher(elem,context,xml);
        }
      }
      return false;
    }
  }
  else{
    return function(elem,context,xml){
      var oldCache,uniqueCache,outerCache,
          newCache = [dirruns,doneName];
      //又是xml
      if(xml){
        while((elem = elem[dir])){
          if(elem.nodeType === 1 || checkNonElements){
            if(matcher(elem,context,xml)){
              return true;
            }
          }
        }
      }
      else{
        while((elem = elem[dir])){
          if(elem.nodeType === 1 || checkNonElements){
            outerCache = elem[expando] || (elem[expando] = {});
          }
          //IE<9 不写了
          //...
          if(skip && skip === elem.nodeName.toLowerCase()){
            elem = elem[dir] || elem;
          }
          else if((oldCache = uniqueCache[key]) && 
                 oldCache[0] === dirruns && oldCache[1] === doneName){
                   return (newCache[2] === oldCache[2]);  
                 }
          else{
            uniqueCache[key] = newCache;
            if((newCache[2] = matcher(elem,context,xml))){
              return true;
            }
          }
        }
      }
      return false;
    };
  }
}  
```

##### elementMatcher

```javascript
function elementMatcher(matchers){
  if(matchers.length > 1){
    return function(elem,context,xml){
      var i = matchers.length;
      while(i--){
        if(!matchers[i](elem,context,xml)){
          return false;
        }
      }
      return true;
    }
  }
  else{
    return matchers[0];
  }
}
```

##### multipleContexts

```javascript
function multipleContexts(selector,contexts,results){
  var i = 0,
      len = contexts.length;
  for(;i < len;i++){
    Sizzle(selector,contexts[i],results);
  }
  return results;
}
```

##### condense

```javascript
function condense(unmatched,map,filter,context,xml){
  var elem,
      newUnmatched = [],
      i = 0,
      len = unmatched.length,
      mapped = map != null;
  for(;i < len;i++){
    if((elem = unmatched[i])){
      if(!filter || filter(elem,context,xml)){
        newUnmatched.push(elem);
        if(mapped){
          map.push(i);
        }
      }
    }
  }
  return newUnmatched;
}
```

##### setMatcher

```javascript
function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){
  if(postFilter && !postFilter[expando]){
    postFilter = setMatcher(postFilter);
  }
  if(postFinder && !postFinder[expando]){
    postFinder = setMatcher(postFinder,postSelector);
  }
  return markFunction(function(seed,results,context,xml){
    var temp,i,elem,
        preMap = [],
        postMap = [],
        preexisting = results.length,
        elems = seed || multipleContexts(selector || "*",
                                         context.nodeType ? [context] : context,[]),
        matcherIn = preFilter && (seed || !selector) ? 
        condense(elems,preMap,preFilter,context,xml) : elems,
        //三元运算符用成这样也是无敌了
        matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
    //
    if(matcher){
      matcher(matchIn,matchOut,context,xml);
    }
    //
    if(postFilter){
      temp = condense(matcherOut,postMap);
      postFilter(temp,[],context,xml);
      //
      i = temp.length;
      while(i--){
        if((elem = temp[i])){
          matcherOut[postMap[i]] = !(matchIn[postMap[i]] = elem);
        }
      }
    }
    if(seed){
      if(postFinder || preFilter){
        if(postFinder){
          temp = [];
          i = matcherOut.length;
          while(i--){
            if((elem = matcherOut[i])){
              temp.push((matcherIn[i] = elem));
            }
          }
          postFinder(null,(matcherOut = []),temp,xml);
        }
        i = matcherOut.length;
        while(i--){
          if((elem = matcherOut[i]) && 
            (temp = postFinder ? indexOf(seed,elem) : preMap[i]) > -1){
              seed[temp] = !(results[temp] = elem);
            }
        }
      }
    }
    else{
      if(matcherOut === results){
        matcherOut = condense(matcherOut.splice(preexisting,matcherOut.length));
      }
      else{
        matcherOut = condense(matcherOut);
      }
      if(postFinder){
        postFinder(null,results,matcherOut,xml);
      }
      else{
        push.apply(results,matcherOut);
      }
    }
  });
}
```

##### matcherFromTokens

```javascript
//不写了
```

##### matcherFromGroupMatchers

```javascript
//不写了
```



#### 其他函数



##### unloadHandeler

```javascript
var unloadHandeler = function(){
  setDocument();
};
```

##### disabledAncestor

```javascript
var disabledAncestor = addCombinator(
  function( elem ){
    return elem.disabled === true && ("form" in elem || "label" in elem );
  },
  { dir: "parentNode", next: "legend" }
);
```

##### NodeList转数组

```javascript
try {
  push.apply(
    (arr = slice.call( preferredDoc.childNodes )),
    preferredDoc.childNodes
  );
  arr[ preferredDoc.childNodes.length ].nodeType;
} 
catch( e ){
  push = { apply: arr.length ? 
          function( target, els ){
            push_native.apply( target, slice,.call(els) );
          }:
          //兼容IE9以下
          function( target, els ){
            var j = target.length,
                i = 0;
            while( (target[j++] = els[i++]) ){}
            target.length = j-1;
          }
         };
}
```



 