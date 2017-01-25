<template>
    <div id="container">    
      <!--头部-->
      <header v-if="index_head" v-show="!scroll">
        <img src="../images/index_head.png">
        <div class="btn">
          <a href="javascript:;" class="close" @click="index_head=false">关闭</a>
          <a href="javascript:;" class="open">打开</a>
        </div>
      </header>
      <!--搜索栏-->
      <div id="sear" :class="{on:scroll||mask2}">
        <!--logo-->
        <a href="#" 
        :class="{on:scroll||mask2}"
        class="logo">
          <img src="../images/header_logo.png" alt="">
        </a>
        <!--地点-->
        <span class="adr"
         @click="mask=true" 
         :class="{on:scroll||mask2}">深圳市</span>
        <!--搜索栏-->
        <span class="sear-arrow glyphicon glyphicon-menu-left" 
        @click="mask2=false"
        v-show="mask2"></span>
        <div class="search" :class="{on:mask2}">
          <span class="glyphicon glyphicon-search"></span>
          <input type="text" 
                  placeholder="搜索你想要找的商品" 
                  @click="mask2=true">
        </div>
        <!--搜索按钮-->
        <a href="#" class="sear_btn2" :class="{on:mask2}">搜索</a>
        <!--搜索下拉菜单-->
        <div class="sear-tag" v-show="mask2">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
        </div>
        <!--搜索的遮盖层-->
        <div class="sear_btn" v-show="!mask2">
          <!--分类-->
          <a href="#">
            <span class="glyphicon glyphicon-gift"></span>
            <span class="text">分类</span>
          </a>
          <!--购物车-->
          <a href="#">
            <span class="glyphicon glyphicon-shopping-cart"></span>
            <span class="text">购物车</span>
          </a>
        </div>
      </div>
      <div id="sear_mask" v-show="mask2" @click="mask2=false"></div>
      <!--轮播图-->
      <div id="adv">
        <div class="pic" :style="slide">
          <template v-for="(item,index) in slide_pic">
            <a href="#">
              <img :src="item.src" :style="pic(index)">
            </a>
          </template>
        </div>
        <div class="btn">
          <span v-for="(item,index) in slide_pic" 
                :class="{on:iter_slide==index}"
                @click="iter_slide=index">
          </span>
        </div>
      </div>
      <!--导航栏-->
      <nav>
        <template>  
          <a href="" v-for="item in nav">
            <span class="pic"><img :src="item.src"></span>
            <span class="text">{{item.text}}</span>
          </a>
        </template>
      </nav>
      <!--导航栏底部-->
      <div id="nav-foot">
        <a href="#">
          <img src="../images/nav-foot.png" alt="">
        </a>
      </div>
      <!--剁手价-->
      <div id="hand">
        <!--头部-->
        <div class="hand-top">
          <!--标题-->
          <div class="hand-title">
            <h3>今日剁手价</h3>
          </div>
          <!--倒计时-->
          <div class="hand-time">
            <span class="text">还剩</span>
            <span class="num hour">{{(time)|filter_hour}}</span>
            <span class="dot"></span>
            <span class="num min">{{time|filter_min}}</span>
            <span class="dot"></span>
            <span class="num sec">{{time|filter_sec}}</span>
          </div>
          <!--更多-->
          <a href="#" class="hand-more">
            <span>特价疯抢</span>
            <span class="glyphicon glyphicon-menu-right"></span>
          </a>
        </div>
        <!--剁手价内容-->
        <div class="hand-content">
          <div class="hand-product">
            <a href="">
              <!--商品图片-->
              <div class="pic">
                <img src="../images/hand-01.jpg">
              </div>
              <!--商品介绍-->
              <h3>百草味 年货坚果干果礼盒 喜团圆大礼包 1430g/盒</h3>
              <!--商品价格-->
              <div class="price-box">
                <span class="price">￥95</span>
                <div class="old-price">
                  <span>参考价</span>
                  <del>￥226.8</del>
                </div>
              </div>
            </a>
          </div>
          <div class="hand-product">
            <a href="">
              <!--商品图片-->
              <div class="pic">
                <img src="../images/hand-01.jpg">
              </div>
              <!--商品介绍-->
              <h3>百草味 年货坚果干果礼盒 喜团圆大礼包 1430g/盒</h3>
              <!--商品价格-->
              <div class="price-box">
                <span class="price">￥95</span>
                <div class="old-price">
                  <span>参考价</span>
                  <del>￥226.8</del>
                </div>
              </div>
            </a>
          </div>
          <div class="hand-product">
            <a href="">
              <!--商品图片-->
              <div class="pic">
                <img src="../images/hand-01.jpg">
              </div>
              <!--商品介绍-->
              <h3>百草味 年货坚果干果礼盒 喜团圆大礼包 1430g/盒</h3>
              <!--商品价格-->
              <div class="price-box">
                <span class="price">￥95</span>
                <div class="old-price">
                  <span>参考价</span>
                  <del>￥226.8</del>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <!--剁手价底部-->
      <div id="hand-foot">
        <a href="#">
          <img src="../images/hand-foot-01.jpg">
        </a>
        <a href="#">
          <img src="../images/hand-foot-02.jpg">
        </a>
        <a href="#">
          <img src="../images/hand-foot-03.jpg">
        </a>
      </div>
      <!--秒杀-->
      <div id="seckill">
        <!--秒杀左边-->
        <a href="#" class="seckill-left">
          <!--倒计时-->
          <div>
            <span class="text">还剩</span>
            <span class="num">{{time|filter_hour}}</span>
            <span class="dot"></span>
            <span class="num">{{time|filter_min}}</span>
            <span class="dot"></span>
            <span class="num">{{time|filter_sec}}</span>
          </div>
          <img src="../images/seckill-01.jpg">
        </a>
        <!--秒杀右边-->
        <div class="seckill-right">
          <a href="">
            <img src="../images/seckill-02.jpg">
          </a>
          <!--秒杀右下-->
          <div>
            <a href="">
              <img src="../images/seckill-03.jpg">
            </a>
            <a href="">
              <img src="../images/seckill-04.jpg">
            </a>
          </div>
        </div>
      </div>
      <!--秒杀底部-->
      <div id="seckill-foot">
        <a href="">
          <img src="../images/seckill-foot-01.jpg">
        </a>
        <a href="">
          <img src="../images/seckill-foot-02.jpg">
        </a>
        <a href="">
          <img src="../images/seckill-foot-03.jpg">
        </a>
      </div>
      <!--地区选择及遮盖层-->
      <!--捕获模式完美解决-->
      <div id="mask" v-show="mask" @click.capture="mask=false">
        <div class="address" @click="mask=true">
          <div class="adr-close"></div>
          <div class="adr-text">请确认您的收货区域</div>
          <div class="adr-select">
            <div class="sel-content">
              <div class="sel-title">
                <span class="icon1"></span>
                <span class="sel-text">当前区域:</span>
                <span class="sel-main">深圳市</span>
                <span class="icon2"></span>
              </div>
              <div class="sel-more">
                
              </div>
            </div>
          </div>
          <div class="adr-submit">
            <a href="javascript:;">确认</a>
          </div>
        </div>
      </div>
    </div> 
</template>

<script>
export default  {
  data () {
    return {
      index_head:true,
      mask:false,
      mask2:false,
      slide_pic:[
        {src:require("../images/lb01.jpg")},
        {src:require("../images/lb02.jpg")},
        {src:require("../images/lb03.jpg")},
        {src:require("../images/lb04.jpg")},
      ],
      nav:[
        {src:require("../images/nav1.png"),text:"一号团"},
        {src:require("../images/nav2.png"),text:"充值中心"},
        {src:require("../images/nav3.png"),text:"小区雷购"},
        {src:require("../images/nav4.png"),text:"活色生鲜"},
        {src:require("../images/nav5.png"),text:"进口美食"},
        {src:require("../images/nav6.png"),text:"1号闪购"},
        {src:require("../images/nav7.png"),text:"1号商城"},
        {src:require("../images/nav8.png"),text:"年货大赏"},
        {src:require("../images/nav9.png"),text:"新品试用"},
        {src:require("../images/nav10.png"),text:"我的1号店"},
      ],
      iter_slide:0,
      pic: function(index){
      return "transform:translateX("+(414*index)+"px)";
      },
      now:parseInt(Date.now()/1000),
      scroll:false,
    }
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
    //我靠 监听个毛啊
    setInterval(function(){
      _.scroll = window.pageYOffset === 0 ? false : true;
    },100);
  }
}
</script>

<style src="../less/index.less" lang="less"></style>