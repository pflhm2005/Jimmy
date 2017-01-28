new Vue({
    el:"#container",
    data:{
        iter:null,
        iter_slide:0,
        scroll:false,
        times:[
            {time:"00:00",p:""},
            {time:"10:00",p:""},
            {time:"13:00",p:""},
            {time:"17:00",p:""},
            {time:"21:00",p:""},
        ],
        ends:[
            {time:"00:00",p:"已开抢"},
            {time:"10:00",p:"已开抢"},
            {time:"13:00",p:"已开抢"},
            {time:"17:00",p:"已开抢"},
            {time:"21:00",p:"已开抢"},
        ],
        stage:[86400,36000,46800,61200,75600],
        products:[
            {
                title:"金枪不倒",
                product:[
                {src:"seckill_images/product1-01.jpg",info:"【顺丰包邮】纤一美酵素梅1盒 吃了变A4腰 买4送1",
                price_01:"49",price_02:".9",price_old:"¥249",percentage:""},
                {src:"seckill_images/product1-02.jpg",info:"【顺丰包邮】勃动力 鹿鞭牦牛鞭驴鞭60片 金枪不倒",
                price_01:"49",price_02:".0",price_old:"¥228",percentage:""},
                {src:"seckill_images/product1-03.jpg",info:"瑞霖 十年陈酿手工黄酒 12度 500ml",
                price_01:"10",price_02:".9",price_old:"¥28",percentage:""},
                {src:"seckill_images/product1-04.jpg",info:"曲慕QuMu 保暖背心女加绒加厚冬款可外穿抹胸款QM7852-2",
                price_01:"22",price_02:".9",price_old:"¥399",percentage:""},]
            },
            {
                title:"15.9元2包",
                product:[
                {src:"seckill_images/product2-01.jpg",info:"居香宜 可爱卡通夜光开关贴 客厅开关 保护框 买二送一",
                price_01:"9",price_02:".9",price_old:"¥39.9",percentage:""},
                {src:"seckill_images/product2-02.jpg",info:"【买2件减2元】豆萁韩式青花瓷印花中空不锈钢筷子10双装",
                price_01:"9",price_02:".0",price_old:"¥30",percentage:""},
                {src:"seckill_images/product2-03.jpg",info:"卡朗尼超轻防紫外线防疲劳男女老花镜",
                price_01:"28",price_02:".0",price_old:"¥51",percentage:""},
                {src:"seckill_images/product2-04.jpg",info:"楼兰蜜语 新疆玫瑰红无核葡萄干225g*2包",
                price_01:"15",price_02:".9",price_old:"¥88",percentage:""},]
            },
            {
                title:"9.9元包邮",
                product:[
                {src:"seckill_images/product3-01.jpg",info:"金普威 不锈钢清洁膏500g 除垢去污 光亮如新 保养不锈钢",
                price_01:"12",price_02:".2",price_old:"¥30",percentage:""},
                {src:"seckill_images/product3-02.jpg",info:"达利园 蛋黄派原味注心派250g*2 早餐面包点心糕点休闲零食 20枚",
                price_01:"9",price_02:".9",price_old:"¥19.8",percentage:""},
                {src:"seckill_images/product3-03.jpg",info:"可拆洗 淋浴头 节水增压淋浴 花洒喷头6CM",
                price_01:"9",price_02:".9",price_old:"¥42",percentage:""},
                {src:"seckill_images/product3-04.jpg",info:"福存家居FORCUNJIAJU 沙发垫坐垫布艺欧式现代沙发巾套罩蕾丝裙边",
                price_01:"21",price_02:".75",price_old:"¥125",percentage:""},]
            },
            {
                title:"9.9元包邮",
                product:[
                {src:"seckill_images/product4-01.jpg",info:"Luminarc 乐美雅 鸭嘴壶1.3L水具套装7件套 L6992",
                price_01:"19",price_02:".8",price_old:"¥99",percentage:""},
                {src:"seckill_images/product4-02.jpg",info:"【6双礼盒装】【第二盒9.9 】【纯棉保暖防臭】男女情侣款中筒袜休闲棉袜",
                price_01:"19",price_02:".9",price_old:"¥49.9",percentage:""},
                {src:"seckill_images/product4-03.jpg",info:"奔麦 儿童宝宝盆 婴儿洗澡脸盆面盆 奶牛款洗脚足浴盆家用【买两个送水勺】",
                price_01:"9",price_02:".9",price_old:"¥42",percentage:""},
                {src:"seckill_images/product4-04.jpg",info:"【买二送一】厨房吸油卫生纸 断式卷纸2卷装 吸油去污/干湿两用",
                price_01:"12",price_02:".9",price_old:"¥49",percentage:""},]
            },
            {
                title:"9.9元包邮",
                product:[
                {src:"seckill_images/product5-01.jpg",info:"蓝月亮竹浆本色纸巾母婴适用家用抽纸餐巾纸3层*130抽*12包",
                price_01:"29",price_02:".9",price_old:"¥68.9",percentage:""},
                {src:"seckill_images/product5-02.jpg",info:"【无效退款】男士延时喷剂不麻木印度持久神油男性保健延迟高潮成人性保健用品",
                price_01:"38",price_02:".0",price_old:"¥88",percentage:""},
                {src:"seckill_images/product5-03.jpg",info:"金普威 点断式垃圾袋5卷装 加厚大号45x55cm 滴水不漏 沉重9KG",
                price_01:"9",price_02:".8",price_old:"¥20",percentage:""},
                {src:"seckill_images/product5-04.jpg",info:"【2条装】柔软长毛耐用大浴巾",
                price_01:"35",price_02:".0",price_old:"¥88",percentage:""},]
            },
        ],
        now: new Date().getHours()*3600 + new Date().getMinutes()*60 + new Date().getSeconds(),
    },
    computed:{
        slide: function(){
            return "transform:translateX("+(-75*this.iter_slide)+"px)";
        },
        clock: function(){
            return this.stage[this.iter] - this.now;
        }
    },
    methods:{
        setPercentage: function(){
            var count = this.iter + 1;
            while(count--){
                if(!this.products[count].product[0].percentage){
                    var len = 4;
                    while(len--){
                        this.$set(this.products[count].product[len],"percentage",this.getRandom(100)+"%");
                    }
                }
            }
        },
        getRandom: function(num){
            return Math.floor(Math.random()*num);
        },
        replace: function(num){
            this.times.splice(this.iter,1,{p:"正在进行"});
            var count = this.iter;
            while(count--){
                this.times.splice(count,1,this.ends[count]);
            }
            this.setPercentage();
        },
        fresh: function(){
            var count  = this.times.length-1;
            while(count--){
                if(count === 1){
                    continue;
                }
                var len = 4;
                while(len--){
                    this.$set(this.products[count].product[len],"percentage","");
                }
            }
        },
        test: function(){
            if(this.now === 86400){
                this.now = 0;
                var _ = this;
                setTimeout(function(){_.fresh();},0)
            }
            if(this.now < 36000){
                if(this.iter === 1){
                    return;
                }
                this.iter_slide = this.iter = 1;
            }
            else if(this.now < 46800){
                if(this.iter === 2){
                    return;
                }
                this.iter_slide = this.iter = 2;
            }
            else if(this.now < 61200){
                if(this.iter === 3){
                    return;
                }
                this.iter_slide = this.iter = 3;
            }
            else if(this.now < 75600){
                if(this.iter === 4){
                    return;
                }
                this.iter_slide = this.iter = 4;
            }
            else if(this.now < 86400){
                if(this.iter === 0){
                    return;
                }
                this.iter_slide = this.iter = 0;
            }
            this.replace();
        },
    },
    filters:{
        filter_hour: function(value){
            var hour = parseInt(value/3600);
            return hour < 10 ? "0"+hour : hour;
        },
        filter_min: function(value){
            var min = parseInt((value/60)%60);
            return min < 10 ? "0"+min : min;
        },
        filter_sec: function(value){
            var sec = parseInt(value%60);
            return sec < 10 ? "0"+sec : sec;
        }
    },
    created () {
        var _ = this;
        setInterval(function(){
            _.now++;},1000)
    },
    mounted() {
        var _ = this;
        setInterval(function(){
            _.test();
            _.scroll = window.pageYOffset > 176.6 ? true : false;
        },100);
    }
})