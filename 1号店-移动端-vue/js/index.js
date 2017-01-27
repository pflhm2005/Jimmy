new Vue({
    el:"#container",
    data:{
      index_head:true,
      mask:false,
      mask2:false,
      slide_pic:[
        {src:"images/lb01.jpg"},
        {src:"images/lb02.jpg"},
        {src:"images/lb03.jpg"},
        {src:"images/lb04.jpg"},
      ],
      nav:[
        {src:"images/nav1.png",text:"一号团"},
        {src:"images/nav2.png",text:"充值中心"},
        {src:"images/nav3.png",text:"小区雷购"},
        {src:"images/nav4.png",text:"活色生鲜"},
        {src:"images/nav5.png",text:"进口美食"},
        {src:"images/nav6.png",text:"1号闪购"},
        {src:"images/nav7.png",text:"1号商城"},
        {src:"images/nav8.png",text:"年货大赏"},
        {src:"images/nav9.png",text:"新品试用"},
        {src:"images/nav10.png",text:"我的1号店"},
      ],
      iter_slide:0,
      pic: function(index){
      return "transform:translateX("+(414*index)+"px)";
      },
      now:parseInt(Date.now()/1000),
      scroll:false,
    },
    computed: {
        slide: function(){
        return "transform:translateX("+(-414*this.iter_slide)+"px)";
        },
        time: function(){
            var today=new Date(),last;
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            last = parseInt((86400000+today.getTime())/1000)-this.now;
            return last;
        }
    },
    methods: {
        
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
        _.now++;
        },1000)
    },
    mounted() {
        var _ = this;
        //我靠 监听个毛事件啊
        setInterval(function(){
        _.scroll = window.pageYOffset === 0 ? false : true;
        },100);
    }
})