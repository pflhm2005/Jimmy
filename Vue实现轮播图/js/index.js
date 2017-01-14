var app = new Vue({
    el:"#slide",
    data:{
        iter:1,
        iter2:false,
        items:[
            {src:"images/5.jpg"},
            {src:"images/6.jpg"},
            {src:"images/10.jpg"},
            {src:"images/12.jpg"},
            {src:"images/13.jpg"}
        ]
    },
    methods:{
        btn: function(bool){
            if(bool){
                this.iter = this.iter === 5 ? 1 : ++this.iter;
            }
            else{
                this.iter = this.iter === 1 ? 5 : --this.iter;
            }
        }
    },
    created: function(){
        var _ = this;
        setInterval(function(){
            if(!_.iter2){
                _.btn(true);
            }
        },2000);
    }
})