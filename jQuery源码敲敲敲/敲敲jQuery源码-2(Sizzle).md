# 敲敲jQuery源码-2(Sizzle)



- ##### Go

```javascript
(function( window ){
  
/*-----------------------------变量声明------------------------------*/
  
  var i,
      support,	//测试兼容性的空对象
      Expr,
      getText,
      isXML,
      tokenize,
      compile,
      select,
      outermostContext,
      sortInput,
      hasDuplicate,
      
      //
      setDocument,
      document,
      docElem = document.documentElement,
      documentIsHTML = !isXML(document), //见414页
      rbuggyQSA,	
      rbuggyMatches,	
      matches,
      contains,	//定义在521页
      
      //
      expando = "Sizzle" + 1 * new Date(),
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      //函数直接写在这里
      createCache = function(){
        var keys = [];
        function cache( key, value ){
          //用key+" "来防止与本地原型属性冲突
          if( key.push(key + " ") > Expr.cacheLength ){
            //保留最近弹入的元素
            delete cache[key.shift()]; 
          }
          return cache[key.shift()] ;
        }
        return cache;
      },
      //判断是否有重复元素
      //595页重写了
      sortOrder = function( a, b ){
        if( a === b ){
          hasDuplicate = true;
        }
        return 0;
      },
      
      //
      hasOwn = ({}).hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      //获取索引
      indexOf = function( list, elem ){
        var i = 0,
            len = list.length;
        for( ; i < len; i++ ){
          if( list[i] === elem ){
            return i;
          }
        }
        return -1;
      },
      booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      
/*---------------------------正则表达式-----------------------------*/
      
      //这个地方为什么要用字符串形式的正则啊...
      //原来是当变量插入 后面不抄了 意思意思
      //改成正则字面量
      
      //匹配空字 制表符 回车符 换行符 换页符
      whitespace = /\x20\t\r\n\f/,
      //?:.是非捕获分组 匹配.或(字符-)或0-160的ASCII字符组
      //这个正则匹配变量名
      identifier = /(?:\.|[\w-]|[^\0-\xa0])+/,
      //匹配属性
      attributes = /"\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + thitespace + "*(?:'((?:\.|[^\'])*)'|"((?:\.|[^\"])*)"|(" + idextifier + "))\) + whitespace + "*\\]"/,
      //伪元素
      pseudos = /.../,
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
      //简易匹配ID,TAG,CLASS
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
      },
      
      //这个函数太TM长了  见420页
      unloadHandeler = function(){
        setDocument();
      }, 
      
      //这个函数在后面
      disabledAncestor = addCombinator(
        function( elem ){
          return elem.disabled === true && ("form" in elem || "label" in elem );
        },
        { dir: "parentNode", next: "legend" }
      );
  //看不懂
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
  
/*------------------------------Sizzle函数------------------------------*/  
 
  function Sizzle( selector, context, results, seed){
    var m, i, elem, nid, match, groups, newSelector,
        newContext = context && context.ownerDocument,
        nodeType = context ? context.nodeType : 9;
    results = results || [];
    //节点类型 1:元素Elem 9:文档Doc 11:属性Attr
    if( typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !==9 && nodeType !== 11){
      return results;
    }
    //seed是参数
    if( !seed ){
      if( (context ? context.ownerDocument || context : preferredDoc ) !== document ){
        setDocument( context );
      }
      //上下文不设定就设置为全局
      context = context || document;
    }
    //documentIsHTML = !isXML(document) = 414页
    if( documentIsHTML ){
      //节点类型不是属性
      //requickExpr为简易匹配ID/CLASS/TAG选择器的正则
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
              if( newContext && ( elem = newContext.getElementById( m )) && contains( context, elem ) && elem.id === m ){
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
      if( support.qsa && !compilerCache[ selector + " " ] && (!rbuggQSA || !rbuggyQSA.test( selector )) ){
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
          //tokenize也不知道哪定义的
          groups = tokenize( selector );
          i = groups.length;
          while( i-- ){
            group[i] = "#" + nid + " " + toSelector( groups[i] );
          }
          newSelector = groups.join(",");
          //扩展context为下一个选择器?
          newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
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
  
/*--------------Sizzle特殊用途的函数--------------*/

  //???
  function markFunction(fn){
    fn[ expando ] = true;
    return fn;
  }
  
  //好像是用这个标签元素测试什么东西
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
  
  //attrs是一个字符串
  function addHandle( attrs, handler){
    var arr = attrs.split("|"),
        i = arr.length;
    while( i-- ){
      Expr.attrHandle[arr[i]] = handler;
    }
  }
  
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
  
  //???
  function createInputPseudo( type ){
    return function( elem ){
      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === type;
    };
  }
  
  //???
  function createButtonPseudo( type ){
    return function( elem ){
      var name = elem.nodeName.toLowerCase();
      return (name === "input" || name === "button") && elem.type ===type;
    };
  }
  
  //
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
  
  //
  function testContext( context ){
    return context && typeof context.getElementsByTagName !== "undefined" && context;
  }
  
  //这个变量用来测试兼容性
  support = Sizzle.support = {};
  
  //判断是不是XML文档 接受一个元素节点
  //!isXML就是判断是不是HTML文档了吧..
  isXML = Sizzle.isXML = function(elem){
    //ownerDocument可以获取#document节点
    //document.ownerDocument === null
    //document.documentElement获得文档结构树
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
  };
  
  
/*------------------------find选择器-------------------------*/
  
  //设置document文档?
  setDocument = Sizzle.setDocument = function(node){
    var hasCompare, subWindow,
        //preferredDoc = window.document
        //node.ownerDocument === #document 就是html页面
        doc = node ? node.ownerDocument || node : preferredDoc;
    if( doc === document || doc.nodeType !== 9 || !doc.documentElement ){
      return document;
    }
    
    //更新全局变量
    document = doc;
    
    //IE9-11
    if(preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow){
      //IE11
      if(subWindow.addEventListener){
        subWindow.addEventListener("unload",unloadHandler,false);
      }
      //IE9-10
      else if(subWindow.attachEvent){
        subWindow.attachEvent("onunload",unloadHandler);
      }
    }
    //IE<8  attributes跟properties有卵区别...
    support.attribute = assert(function(el){
      el.className = "i";
      return !el.getAttribute("className");
    });
    //检测getElementsByTagName("*")是否只返回元素
    support.getElementsByTagName = assert(function(el){
      el.appendChild(document.createComment(""));
      return !el.getElementByTagName("*").length;
    });
    //IE<9
    //测试docuemnt.getElementsByClassName是否返回本地方法
    support.getElementsByClassName = rnative.test(document.getElementsByClassName);
    //IE<10
    support.getById = assert(function(el){
      docElem.appendChild(el).id = expando
      return !document.getElementsByName || !document.getElementsByName(expando).length;
    });
    //ID过滤寻找
    if(support.getById){
      Expr.filter["ID"] = function(id){
        var attrId = id.replace(runescape, funescape);
        return function(elem){
          return elem.getAttribute("id") === attrId;
        };
      };
      Expr.find["ID"] = function(id,context){
        if(typeof context.getElementById !== "undefined" && documentIsHTML){
          var elem = context.getElementById(id);
          return elem ? [elem] : [];
        }
      };
    }
    //兼容IE6-7 getElementById不可靠 使用getAttributeNode方法 不写了
    else{
      
    }
    //find标签
    Expr.find("TAG") = 
      support.getElementsByTagName ? 
      //如果getElementsByTagName方法返回正常
      function(tag,context){
        if(typeof context.getElementsByTagName !== "undefined"){
          return context.getElementsByTagName(tag);
        }
        else if(support.qsa){
          return context.querySelectorAll(Tag);
        }
      } : 
      //否则针对tag穿入通配符进行过滤
      function(tag,context){
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if(tag === "*"){
          //遍历 只需要节点类型1的元素
          while((elem = results[i++])){
            if(elem.nodeType === 1){
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
    };
    //find类
    Expr.find["CLASS"] = support.getElementsByClassName && function(className,context){
      if(typeof context.getElementsByClassName !== "undefined" && documentIsHTML){
        return context.getElementsByClassName(className);
      }
    };
    
    //下面写很多奇怪的兼容 先跳过
    rbuggyMatched = [];
    rbuggyQSA = [];
    
/*------------------------检测包含-------------------------*/  
    
    //检测本地方法compareDocumentPositon
    hasCompare = rnative.test(docElem.compareDocumentPositon);
    
    //测试a是否包含b
    //两个方法有一个就行
    //源码乱 重写一下
    //这是源码
    contains = hasCompare || rnative.test(docElem.contains) ? 
      function(a,b){
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
      	return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16 ));
      } : 
      function(a,b){
        if(b){
          while(( b = b.parentNode )){
            if( b === a ){
              return true;
            } 
          }
        }
        return false;
      };
    
    //重写
    if(hasCompare || rnative.test(docElem.contains)){
      //containd(a,b) a,b分别为两个节点
      contains = function(a,b){
        //a.nodeType === 9代表a是#document
        //此时a.documentElement获得document所有子节点
        var adown = a.nodeType === 9 ? a.documentElement : a,
            //bup是b的父节点 document父节点是null
            bup = b && b.parentNode;
        //b父节点是a 直接返回true
        if(a === bup){
          return true;
        }
        //这TM好麻烦啊
        //首先bup必须是元素节点
        else if(!!(bup && bup.nodeType === 1)){
          //如果adown有contains()方法 直接调用判断包含
          if(adown.contains){
            return !!(adown.contains(bup));
          }
          //否则调用compareDocumentPosition()方法
          //跟100000与运算什么鬼...
          else{
            return !!(a.compareDocumentPosition(bup) & 16);
          }
        }
        else{
          return false;
        }
      }
    }
    //contains与compareDocumentPosition方法都不存在
    else{
      contains = function(a,b){
        if(b){
          //对b不停调用parentNode
          //document.parentNode === null时终止
          while(b = b.parentNode){
            if(b === a){
              return true;
            }
          }
        }
        return false;
      }
    }
    
/*------------------------sort排序-------------------------*/  
    
    //直接重写 好TM长
    if(hasCompare){
      sortOrder = function(a,b){
        if( a === b ){
          hasDuplicate = true;
          return 0;
        }
        
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if(compare){
          return compare;
        }
      }
    }
    
    
    
    
      
  }
  
  

      
})(window);
```





















