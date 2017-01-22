var items=[
{"shop":"生如海洋 men sho","src":"images/1.png","tip":"夏日拖鞋潮男韩版潮流男士一字拖防滑凉鞋夏天个性沙滩潮拖凉拖男",
"srcTip1":"images/a.png","srcTip2":"images/b.png","srctip3":"images/c.png",
"type":"颜色分类：028黑蜂窝","size":"尺码：41","prev_price":"79.00","price":"49.00","extra":"卖家促销"},
{"shop":"nixu服饰旗舰店","src":"images/2.png","tip":"韩版中长款纯色休闲青年风衣英伦秋冬男毛呢料宽松外套时尚大衣",
"srcTip1":"images/a.png","srcTip2":"images/b.png","srctip3":"images/c.png",
"type":"颜色：卡其色有纽扣","size":"尺码：L","prev_price":"416.00","price":"208.00","extra":"卖家促销"},
{"shop":"李宁官方网店","src":"images/3.png","tip":"李宁2016新款男子篮球鞋音速3高帮反弹篮球场地鞋ABAL031",
"srcTip1":"images/a.png","srcTip2":"images/b.png","srctip3":"images/c.png",
"type":"颜色分类：荧光果粉/木梅红","size":"鞋码：42","prev_price":"539.00","price":"339.00","extra":"卖家促销"},
{"shop":"adidas官方旗舰店","src":"images/4.png","tip":"adidas 阿迪达斯 篮球 男子 篮球鞋 Regulate",
"srcTip1":"images/a.png","srcTip2":"images/b.png","srctip3":"images/c.png",
"type":"颜色分类：银金属/深藏青蓝/红色","size":"鞋码：43.5","prev_price":"","price":"419.00","extra":""},
{"shop":"NIKE官方旗舰店","src":"images/5.png","tip":"Nike 耐克官方 ZOOM KOBE VENOMENON 5 EP 男子篮球鞋",
"srcTip1":"images/a.png","srcTip2":"images/b.png","srctip3":"images/c.png",
"type":"颜色分类：氯蓝/鲜红橙/煤黑/白/冷灰黑","size":"鞋码：42.5","prev_price":"","price":"949.00","extra":""},
{"shop":"zsuo走索旗舰店","src":"images/6.png","tip":"aSuo/走索男鞋马丁靴男秋冬户外靴子沙漠靴男军靴皮靴情侣款潮",
"srcTip1":"images/a.png","srcTip2":"images/b.png","srctip3":"images/c.png",
"type":"颜色分类：ZS988H黑色","size":"尺码：42","prev_price":"452.00","price":"339.00","extra":"卖家促销"},
{"shop":"张君雅小妹妹旗舰","src":"images/7.png","tip":"台湾进口零食张君雅小妹妹12包零食组合甜甜圈捏脆面点心面礼包",
"srcTip1":"images/a.png","srcTip2":"images/b.png","srctip3":"images/c.png",
"type":"口味：12包零食组合","size":"","prev_price":"79.00","price":"39.00","extra":"卖家促销"}
];

var app = new Vue({
    el:"#app",
    data:{
        tab:1,              //分类hover
        count:[],           //商品数量
        checked:[],         //是否选中
        arr:[],             //选中商品价格
        del_iter:[],        //删除与撤销删除商品
        new_price:[],       //每个商品的价格
        checkedAll:false,   //全选按钮
        take:0,             //已选中商品数量
        sale:[],            //折扣率
        tip_iter:[],        //是否是降价商品
    },
    computed:{
        //计算总价
        totalPrice: function(){
            for(var i=0,all = 0;i<this.take;i++){
                all += this.arr[i];
            }
            return all.toFixed(2);
        },
        //计算剩余商品数量
        all_content: function(){
            for(var i=0,all = 7;i<this.del_iter.length;i++){
                if(!this.del_iter[i]){
                    all--;
                }
            }
            return all;
        },
        //降价商品数量
        sale_content: function(){
            for(var i=0,sale=0,len=this.tip_iter.length;i<len;i++){
                if(!this.tip_iter[i]){
                    sale++;
                }
            }
            return sale;
        }
    },
    methods: {
        //折扣信息hover
        tip: function(index,iter){
            this.$set(this.tip_iter,index,iter);
        },
        //加减按钮
        btn: function(index,iter){
            if(iter){
                this.$set(this.count,index,++this.count[index]);
            }
            else if(this.count[index]!==0){
                this.$set(this.count,index,--this.count[index]);
            }
            this.new_price[index][0] = this.price(index);
            this.countAll();
        },
        //计算价格
        price: function(index){
            return (items[index].price*this.count[index]).toFixed(2);
        },
        //多选框
        check: function(index){
            this.$set(this.checked,index,!this.checked[index]);
            this.new_price[index][1] = this.checked[index] ? true : false;
            this.countAll();
        },
        //全选
        checkAll: function(checked){
            this.checkedAll = checked;
            for(var i=0,len = this.count.length;i<len;i++){
                this.checked[i] = checked;
                this.new_price[i][1] = checked;
            }
            this.countAll();
        },
        //手动输入数量
        key: function(index){   
            this.new_price[index][0] = this.price(index);
            this.countAll();
        },
        //删除并重置商品选项
        del: function(index){
            this.$set(this.del_iter,index,false);
            this.new_price[index][0] = items[index].price;
            this.count[index] = 1;
            //如果删除时被选中 做进一步格式化
            if(this.checked[index]){
                this.$set(this.checked,index,false);
                this.new_price[index][1] = false;
                this.countAll();
            }
            if(items[index].extra){
                this.$set(this.tip_iter,index,true);
            }
        },
        cancel: function(index){
            this.$set(this.del_iter,index,true);
            if(items[index].extra){
                this.$set(this.tip_iter,index,false);
            }
        },
        //更新选中商品数组和数量
        //不可返回数据更新视图 否则就僵硬了
        countAll: function(){
            var len = 0,total=0;
            this.arr=[];
            for(var i=0;i<this.count.length;i++){
                if(this.new_price[i][1]){
                    len++;
                    this.arr.push(parseInt(this.new_price[i][0]));
                }
            }
            for(i =0;i<len;i++){
                total += this.arr[i];
            }
            this.take = len;
        }
    },
    //初始化
    created: function(){
        for(var item in items){
            this.new_price.push([items[item].price,false]);
            this.count.push(1);
            this.checked.push(false);
            this.del_iter.push(true);
            this.sale.push(10*(items[item].price/items[item].prev_price).toFixed(2));
            this.tip_iter.push(!items[item].extra);
        }
    }
});

//搜索框对应效果
var sear = new Vue({
    el:"#sear",
    data:{
        content:[],
        input:"",
        match:[],
        iter:null,
    },
    methods: {
        //显示搜索匹配内容
        showTag: function(){
            for(var i=0,arr = [];i<this.content.length;i++){
                if(this.content[i].indexOf(this.input) === 0 && this.input){
                    arr.push(this.content[i]);
                }
            }
            this.match = arr;
        },
        //点击匹配字符
        search: function(index){
            this.input = this.match[index];
            this.match = [];
        },
    },
    //初始化匹配库
    created: function(){
        for(var item in items){
            this.content.push(items[item].tip);
        }
    }
});