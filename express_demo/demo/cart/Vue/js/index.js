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
        items:[]    
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
            return (this.items[index].price*this.count[index]).toFixed(2);
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
            this.new_price[index][0] = this.items[index].price;
            this.count[index] = 1;
            //如果删除时被选中 做进一步格式化
            if(this.checked[index]){
                this.$set(this.checked,index,false);
                this.new_price[index][1] = false;
                this.countAll();
            }
            if(this.items[index].extra){
                this.$set(this.tip_iter,index,true);
            }
        },
        cancel: function(index){
            this.$set(this.del_iter,index,true);
            if(this.items[index].extra){
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
        this.$http.get("http://localhost:9000/json/cart").then((result)=>{
            this.items = result.data;
            for(var item in this.items){
                this.new_price.push([this.items[item].price,false]);
                this.count.push(1);
                this.checked.push(false);
                this.del_iter.push(true);
                this.sale.push(10*(this.items[item].price/this.items[item].prev_price).toFixed(2));
                this.tip_iter.push(!this.items[item].extra);
            }
        });
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
        for(var item in this.items){
            this.content.push(this.items[item].tip);
        }
    }
});
