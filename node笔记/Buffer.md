# Buffer(缓存)





## Tip



----

- `Buffer`默认加载，不需要`require`引用
- `size`一旦设定不可更改
- `Buffer.allocUnsafeSlow`  
  1.  仅当开发者发现不恰当使用内存导致内存浪费时使用
  2.  该方法不会取内存池
- `Buffer.alloc(size, fill)` vs `Buffer.allocUnsafe(size).fill(fill)`
  1.  `alloc`方法不会使用内存池
  2.  `allocUnsafe`在`size`小于池一半大小时优先使用内存池


- 下列3个API仍然需要通过`require('buffer').*`引入
  1. `SlowBuffer`(二进制数据容器类 直接进行内存申请)
  2. `INSPECT_MAX_BYTES`(限制`bufObject.inspect()`输出的长度)
  3. `kMaxLength`(一次性分配内存上限 2^31-1)

---

 

## Method



### `Buffer.alloc()`

```javascript
//生成长度为10，被0填充的缓存区
const buf1 = Buffer.alloc(10);

//生成长度为10，被0x1填充的缓存区
const buf2 = Buffer.alloc(10,1);
```



---



### `Buffer.allocUnsafe()`

```javascript
//生成长度为10的缓存区
//比alloc()方法速度快 但是会被旧数据填空
//需要通过fill()或者write()格式化
const buf3 = Buffer.allocUnsafe(10);

//相当于alloc(10)
buf3.fill(0);
```



---



### `Buffer.from()`



```javascript
//生成一个缓存区 包含[0x1,0x2,0x3].
const buf4 = Buffer.from([1,2,3]);

//生成一个缓存区 包含test各字符的ASCII编码[0x74,0x65,0x73,0x74].
const buf5 = Buffer.from('test');

//生成指定字符编码的缓存区 [0x74,0xc3,0xa9,0x73,0x74].
const buf6 = Buffer.from('tést','utf8');
```



---



## --zero-fill-buffers



- 该指令可以将新生成缓存区的默认数值设为0

```javascript
//cmd窗口下运行代码
$node --zero-fill-buffers
>Buffer.allocUnsafe(5);
<Buffer 00 00 00 00 00>
```



---



## Encodings



- 数据可以任意转码

```javascript
//node命令行中写入
> const buf = Buffer.from('h','ascii');
> buf.toString('hex');
'68'
> buf.toString('base64');
'aA=='
```



目前支持的转码包括

1. `ascii`
2. `utf8`
3. `utf16le`
4. `ucs2` 依赖`utf16le`
5. `base64`
6. `latin1`
7. `binary`
8. `hex`





