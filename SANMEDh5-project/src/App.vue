<template>
  <div id="app">
    <keep-alive>   
        <router-view v-if="$route.meta.keepAlive" class="ui-view"  transition-mode="out-in"></router-view>
    </keep-alive>  
    <!-- 非缓存组件跳转页面 -->
    <router-view v-if="!$route.meta.keepAlive" class="ui-view"  transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted(){
      if (!this._isMobile()) {
        window.location.href = 'https://cac.sanmedgene.com/SANMEDPC/index.html#/index';
      }
    },
    methods:{
       _isMobile(){
          let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          return flag;
      },
    },
  }
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: SourceHanSansCN, SourceHanSansCN-Normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #303030;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

body,p,h1,h2,h3,h4,h5,h6,div,dd,dt,dl,form,kbd,table,ul,li,marquee,hr,blockquote,ol,pre,fieldset,legend,button,input,textarea,th,td{font-size:12px; margin:0; padding:0; font-family: SourceHanSansCN, SourceHanSansCN-Normal, Tahoma, Verdana,  Helvetica, sans-serif; color: #6e6e6e;}
address,cite,dfn,em,var{font-style:normal;}
button,input,select,textarea{font-size:100%; cursor:pointer}
input{ cursor:pointer}
table{border-collapse:collapse;border-spacing:0;}
small{font-size:12px;}
ul,ol{list-style:none;}
img{border:0;}
ul{list-style:none;}
.clear{ clear:both;}
a{text-decoration: none; color: #6e6e6e; }
a:hover{ color:#000; text-decoration:none}
input[type="submit"],input[type="reset"],input[type="button"],input[type="text"], button { -webkit-appearance: none;border-radius: 0; } 
input,textarea,select,a:focus {
    outline: none;
}
.clearfix:after { visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */  
}
.van-dialog{
  width: 8.266667rem !important;
}
.van-button{
  font-size: 24px;
}
.van-dialog__confirm, .van-dialog__confirm:active {
  color:blue !important;
  height: 80px !important;
}
.van-dialog__header{
  line-height: 45px !important;
  font-size: 30px !important;
}
.van-dialog__content{
  margin-top: 4vw;
}
.van-dialog__message{
  font-size: 28px !important;
  line-height: 50px !important;
}
.van-button__text{
  font-size: 28px !important;
}
.van-dialog__footer{
  line-height: 80px !important;
}
.van-dialog__cancel, .van-dialog__confirm{
  height: 80px !important;
}
.van-notify {
  font-size: 28px !important;
  line-height: 45px;
}
</style>
