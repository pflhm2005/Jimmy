var app = new Vue({
    el:"#box",
    data:{
        str:"",
        name:"",
        iter:0,
        iter2:null,
        arr:[],
        max:10,
        len:0,
        input_pattern:/[^\x00-\xff]/g,
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
            {src:"images/6.jpg",name:"日丶久生情",str:"新增删除广播功能。",time:"07月05日 15:14"},
            {src:"images/4.jpg",name:"日丶久生情",str:"新增Ctrl+Enter快捷键发送广播。",time:"07月05日 15:14"},
            {src:"images/8.jpg",name:"日丶久生情",str:"新增选择头像功能。",time:"07月05日 15:14"},
            {src:"images/3.jpg",name:"日丶久生情",str:"增加了记录广播时间的功能。",time:"07月05日 15:14"},
            {src:"images/5.jpg",name:"日丶久生情",str:"增加了输入字符检测功能，英文/半角为半个字符，汉字/全角为一个字符。",time:"07月05日 15:14"},
            {src:"images/1.jpg",name:"日丶久生情",str:"仿腾讯微博效果，欢迎大家测试！",time:"07月05日 15:14"},
        ]
    },
    computed: {
        max: function(){
            var len_match = this.str.match(this.input_pattern) ? this.str.match(this.input_pattern).length : 0;
            this.len = len_match + this.str.length;
            return 10-0.5 * this.len;
        },
    },
    filters: {
        filter: function(value){
            return value.toFixed(0);
        },
        filter2: function(value){
            return Math.abs(value.toFixed(0));
        }
    },
    methods: {
        //添加评论
        add: function(){
            if(!this.name||!this.str||this.max<0){
                return ;
            }
            var obj = {};
            obj.src = "images/"+(this.iter+1)+".jpg";
            obj.name = this.name;
            obj.str = this.str;
            obj.time = getTime();
            this.items2.unshift(obj);
            this.name=this.str="";
        },
        //删除评论
        del: function(index){
            this.items2.splice(index,1);
        }
    },
    //ctrl+enter发送评论
    created: function() {
        var _ = this;
        window.onkeydown = function(e){
            if(e.ctrlKey&&e.keyCode === 13){
                _.add();
            }
        };
    }
});
function getTime(){
    var m = new Date().getMonth()+1,
        data_pattern=/\s(\d{2})\s\w*\s(\d{2}:\d{2})/g,
    m = m < 10 ? "0" + m : m;
    var match = data_pattern.exec(Date());
    return m + "月" + match[1] + "日 " + match[2];
}