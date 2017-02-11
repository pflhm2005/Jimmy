new Vue({
    el:"#container",
    data:{
      index_head:true,
      mask:false,
      mask2:false,
      slide_pic:[],
      nav:[],
      iter_slide:0,
      pic: function(index){
      return "transform:translateX("+(414*index)+"px)";
      },
      now:parseInt(Date.now()/1000),
      scroll:false,
    },
    computed: {
        slide(){
        return "transform:translateX("+(-414*this.iter_slide)+"px)";
        },
        time(){
            var today=new Date(),last;
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            last = parseInt((86400000+today.getTime())/1000)-this.now;
            return last;
        }
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
        setInterval(()=>{this.now++;},1000);
        this.$http.get("http://localhost:9000/json/yhd/index").then((result)=>{
            var data = result.data;
            this.slide_pic = data[0];
            this.nav = data[1];
        });
    },
    mounted() {
        //我靠 监听个毛事件啊
        setInterval(()=>{
            this.scroll = window.pageYOffset === 0 ? false : true;
        },100);
    }
});