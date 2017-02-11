new Vue({
    el:"#container",
    data:{
        iter:null,
        iter_slide:0,
        scroll:false,
        times:[],
        ends:[],
        stage:[],
        products:[],
        now: new Date().getHours()*3600 + new Date().getMinutes()*60 + new Date().getSeconds(),
    },
    computed:{
        slide(){
            return "transform:translateX("+(-75*this.iter_slide)+"px)";
        },
        clock(){
            return this.stage[this.iter] - this.now;
        }
    },
    methods:{
        setPercentage(){
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
        getRandom:num=>Math.floor(Math.random()*num),
        replace(num){
            this.times.splice(this.iter,1,{p:"正在进行"});
            var count = this.iter;
            while(count--){
                this.times.splice(count,1,this.ends[count]);
            }
            this.setPercentage();
        },
        fresh(){
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
        test(){
            if(this.now === 86400){
                this.now = 0;
                this.fresh();
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
        filter_hour(value){
            var hour = parseInt(value/3600);
            return hour < 10 ? "0"+ hour : hour;
        },
        filter_min(value){
            var min = parseInt((value/60)%60);
            return min < 10 ? "0"+ min : min;
        },
        filter_sec(value){
            var sec = parseInt(value%60);
            return sec < 10 ? "0"+ sec : sec;
        }
    },
    created () {
        setInterval(()=>this.now++,1000);
         this.$http.get("http://localhost:9000/json/yhd/seckill").then((result)=>{
            var data = result.data;
            this.times = data[0];
            this.ends = data[1];
            this.stage = data[2];
            this.products = data[3];
        });
    },
    mounted() {
        setInterval(()=>{
            this.test();
            this.scroll = window.pageYOffset > 176.6 ? true : false;
        },100);
    }
});