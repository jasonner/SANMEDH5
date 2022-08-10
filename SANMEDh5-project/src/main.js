import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible'
import './util/rem'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import animated from "animate.css"
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.use(animated)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
// import 'lib-flexible/flexible'

Vue.use(ElementUI);
Vue.use(VueRouter,)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://cac.sanmedgene.com/forhoo/'  //关键代码
// 是否允许跨域携带cookie信息
// axios.defaults.withCredentials = true;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

window.alert = function(name){
  var iframe = document.createElement("IFRAME");
  iframe.style.display="none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode.removeChild(iframe);
};
window.confirm = function (message) {
  var iframe = document.createElement("IFRAME");
  iframe.style.display = "none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  var alertFrame = window.frames[0];
  var result = alertFrame.window.confirm(message);
  iframe.parentNode.removeChild(iframe);
  return result;
};
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
