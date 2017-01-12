var app = new Vue({
    el:"#box",
    data:{
        str:"",
        name:"",
        iter:0,
        iter2:null,
        arr:[],
        pattern:/\s(\d{2})\s\w*\s(\d{2}:\d{2})/g,
        items : [
            {src:"images/1.jpg"},         
            {src:"images/2.jpg"},
            {src:"images/3.jpg"},
            {src:"images/4.jpg"},
            {src:"images/5.jpg"},
            {src:"images/6.jpg"},
            {src:"images/7.jpg"},
            {src:"images/8.jpg"}
        ],
        items2:[
            {src:"images/1.jpg",name:"日丶久生情",str:"新增删除广播功能。"},
            {src:"images/1.jpg",name:"日丶久生情",str:"新增Ctrl+Enter快捷键发送广播。"},
            {src:"images/1.jpg",name:"日丶久生情",str:"新增选择头像功能。"},
            {src:"images/1.jpg",name:"日丶久生情",str:"增加了记录广播时间的功能。"},
            {src:"images/1.jpg",name:"日丶久生情",str:"增加了输入字符检测功能，英文/半角为半个字符，汉字/全角为一个字符。"},
            {src:"images/1.jpg",name:"日丶久生情",str:"仿腾讯微博效果，欢迎大家测试！"},
        ]
    },
    computed: {
        max: function(){
            return 10-this.str.length;
        },
        time: function(){
            var m = new Date().getMonth()+1;
            m = m < 10 ? "0" + m : m;
            var match = this.pattern.exec(Date());
            return m + "月" + match[1] + "日 " + match[2];
        }
    },
    methods: {
        count: function(e){
            //bug
            this.str = this.str.length<10?this.str:this.str.substr(0,9);
        },
        //添加评论
        add: function(){
            var obj = {};
            obj.src = "images/"+(this.iter+1)+".jpg";
            obj.name = this.name;
            obj.str = this.str;
            this.items2.unshift(obj);
            this.name=this.str="";
        },
        //删除评论
        del: function(index){
            this.items2.splice(index,1);
        }
    }
});