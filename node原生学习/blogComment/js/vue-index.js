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
        items : [],
        items2:[]
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
        window.onkeydown = ()=>{
            if(event.ctrlKey && event.keyCode === 13){
                this.add();
            }
        };
        createXhr({
            type:"GET",
            url:"http://localhost:9000?blog=blog_text.json",
            fn:(data)=>{
                this.items = JSON.parse(data)[0];
                this.items2 = JSON.parse(data)[1];
            }
        });
    }
});

function getTime(){
    var m = new Date().getMonth()+1,
        data_pattern=/\s(\d{2})\s\w*\s(\d{2}:\d{2})/g,
    m = m < 10 ? "0" + m : m;
    var match = data_pattern.exec(Date());
    return m + "月" + match[1] + "日 " + match[2];
}

function createXhr(obj){
    var xhr = new XMLHttpRequest();
    obj.async = obj.async || true;
    xhr.open(obj.type,obj.url,obj.async);
    if(obj.type === "GET"){
        xhr.send(null);
    }
    if(obj.type === "POST"){
        if(!obj.data){
            obj.data = null;
        }
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(obj.data);
    }
    xhr.onreadystatechange = ()=>{
        if(xhr.status === 200 && xhr.readyState === 4){
            obj.fn(xhr.responseText);
        }
    }
}