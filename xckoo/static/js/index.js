//该组件实现多个a标签hover事件 添加与移除类on
//接受内部文本，标签，链接,索引与默认项
//并提供一个内部分发标签
//其中索引为必选项 未提供链接数据a标签失效
Vue.component("aTab",{
    props:["msg","index","url","tab_default"],
    template:"<a :href='url'\
                :class='{on:tab_default==index||tab==index}'\
                @mouseenter='tab=index'\
                @mouseleave='tab=-1'>\
                {{msg}}\
                <slot></slot>\
             </a>",
    data(){
        return {
            tab:null,
        };
    }
});

new Vue({
    el:"#tip",
    data:{
        tips:[],
        scroll:null,
    },
    methods:{
        //跳转
        scrolling_index:function(index){
            switch(index){
                case 0:window.scrollTo(0,0);
                break;
                case 1:window.scrollTo(0,850);
                break;
                case 2:window.scrollTo(0,1400);
                break;
                case 3:window.scrollTo(0,1800);
                break;
                case 4:window.scrollTo(0,2000);
                break;
            }
        }
    },
    //请求右下角tips
    created(){
        this.$http.get("http://localhost:9000/json/index/tips").then((result)=>{
            this.tips = result.data;
        });
    }
})

//头部挂载
new Vue({
    el:"#header",
    data:{
        //头部导航栏
        //需要链接、名字
        navs:[
            {"url":"#","name":"首页"},
            {"url":"#","name":"关于我们"},
            {"url":"#","name":"精品手游"},
            {"url":"#","name":"咨询中心"},
            {"url":"#","name":"人才招聘"},
            {"url":"#","name":"联系我们"},
            ],
        tab_default:0,
    }
});

//首页挂载
new Vue({
    el:"#index",
    data:{
        //轮播图箭头显示
        arrow:false,
        slider:0,
        timer:null,
        //轮播图
        //包含图片路径
        slide:[],
        //精品手游
        //包含链接、图片路径、游戏名字
        games:[],
        //合作伙伴
        //包含链接、图片路径
        partners:[],
    },
    methods:{
        //点击两端箭头
        slidePic:function(iter){
            iter ? 
            this.slider = this.slider === this.slide.length-1 ? 0 : this.slider + 1 :
            this.slider = this.slider === 0 ? this.slide.length-1 : this.slider - 1;
        },
        //鼠标移入事件
        slideMouse:function(iter){
            if(iter){
                clearInterval(this.timer);
            }
            else{
                this.timer = setInterval(()=>{this.slidePic(true);},2000);
                this.arrow = false;
            }
        },
        //箭头显示
        arrowToggle:function(){
            this.arrow = 
            (event.clientX > 175 && event.clientX < 400|| 
            event.clientX > 950 && event.clientX < 1174.5) ? 
            true : false;
        },
        
    },
    created(){
        //请求服务器并返回json文件
        this.$http.get("http://localhost:9000/json/index/slide").then((result)=>{
            this.slide = result.data;
        });
        this.$http.get("http://localhost:9000/json/index/games").then((result)=>{
            this.games = result.data;
        });
        this.$http.get("http://localhost:9000/json/index/partner").then((result)=>{
            this.partners = result.data;
        });
        //轮播
        this.timer = setInterval(()=>{
            this.slidePic(true);
        },3000);
    }
});