<template>
    <div class="indexPage">
        <div class="header-list">
            <h1>
                <img src="https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/page1/logo.png" alt="" srcset="">
            </h1>
            <div class="menu-list">
                <p><router-link :to="{path:'/shield'}">技术详情</router-link></p>
                <p><router-link :to="{path:'/manual'}">健康讲堂</router-link></p>
                <p @click="goUserPage()">个人中心</p> 
                <p @click="callUs()">联系我们</p>
            </div>
        </div>

        <!-- 轮播图 -->
        <div class="header-swiper">
            <el-carousel height="13.5rem"  class="container" arrow='always' :interval="5000">
                <el-carousel-item v-for="item in listData.h5bannerlist" :key="item.index">
                    <img class="list-img" :src="item.bannerurl" alt="" srcset="" @click="goPage(item.index)">
                </el-carousel-item>
            </el-carousel> 
        </div>

        <!-- 检查 -->
        <div class="inspect-box">
            <div class="inspect">
                <div class="list" @click="testingChange()">
                   <div class="ziceImg-box">
                        <img src="@/assets/img/index/title1.png?v=1209" class="transition-box" alt="" srcset="">
                        <img  class="circle" src="@/assets/img/index/iconPoirt.png" alt="" srcset="">
                        <img  class="finger" src="@/assets/img/index/poirt.png" alt="" srcset="">
                    </div> 
                </div>
            </div>
        </div>

        <!-- 视频 -->
        <div class="video-box">
            <div class="title-img-box"><img src="@/assets/img/index/title2.png?v=1209" alt="" srcset=""></div>
            <el-carousel height="5rem"  @change="videoChange" class="container" :autoplay="false" arrow='always'>
                <el-carousel-item >
                    <video-player class="video-player vjs-custom-skin" 
                        ref="videoPlayer1" 
                        :playsinline="true" 
                        :options="playerOptions1"
                        :src="listData.video"
                        id="video-player"
                    >
                    </video-player>
                </el-carousel-item>
                <el-carousel-item>
                    <video-player class="video-player vjs-custom-skin" 
                        ref="videoPlayer2" 
                        :playsinline="true" 
                        :options="playerOptions2"
                        :src="listData.video"
                        id="video-player"
                    >
                    </video-player>
                </el-carousel-item>
            </el-carousel> 
        </div>

        <!-- 专家推荐 -->
        <div class="expert-recommendation-box">
            <div class="expert-recommendation">
                <div class="title-img-box"><img src="@/assets/img/index/title3.png?v=1209" alt="" srcset=""></div>
                <el-carousel @change="swiperChange"  :interval="5000" type="card" indicator-position="none"  :autoplay="true">
                    <el-carousel-item v-for="item in swiperArr" :key="item.index">
                        <div class="content-box">
                            <div class="list listImg1">
                                <img :src="item.url" alt="" srcset="">
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="bg-left"></div>
                <div class="bg-right"></div>
            </div>
            <div v-for="(item,index) in textContent" :key="index" class="expert-text-list">
                <div class="text-content" v-if="index == selectIndex">
                    <h6 style="margin-bottom:4vw"><span></span><em v-html="item.name" style="color:#6e6e6e"></em><span></span></h6>
                    <p v-if="item.title0">{{item.title0}}</p>
                    <p>
                        {{item.title1}}
                    </p>
                    <p>
                        {{item.title2}}
                    </p>
                    <p>
                        {{item.title3}}
                    </p>
                    <p v-if="item.title4">
                        {{item.title4}}
                    </p>
                    <p style="text-align:left;margin-top:4vw">
                        {{item.content}}
                    </p>
                </div>
            </div>
        </div>

        <!-- CAC检测技术 -->
        <div class="cac-testing-box">
                <div class="cac-testing">
                    <!-- <h4><span></span> CAC检测国际前沿肺癌早诊技术<span></span></h4>
                    <p>让生命科技富有温度，让美好改变提前发生</p> -->
                    <div class="title-img-box"><img src="@/assets/img/index/title4.png?v=1209" alt="" srcset=""></div>
                    <div class="content">
                        <img class="bg1" v-for="item in listData.footer" :key="item.id" :src="item.bannerurl" alt="" srcset="">  
                        <div class="wrapper">
                            <!-- <img  class="circle" src="@/assets/img/index/iconPoirt.png" alt="" srcset="">
                            <img class="finger" src="@/assets/img/index/poirt.png" alt="" srcset=""> -->
                        </div> 
                        <div class="wrapper1">
                            <!-- <img  class="circle" src="@/assets/img/index/iconPoirt.png" alt="" srcset="">
                            <img  class="finger" src="@/assets/img/index/poirt.png" alt="" srcset=""> -->
                        </div>
                        <div class="click1" @click="goPageProductDetail('1')"></div>
                        <div class="click2" @click="goPageProductDetailS('1')"></div>
                        <div class="click3" @click="goPageProductDetail('2')"></div>
                        <div class="click4" @click="goPageShield()"></div>
                </div>
            </div> 
        </div>
         <!-- 微信环境支付 -->
        <form method="post" action="/forhoo/pay" ref="formWx" @submit.prevent="payWx" v-if="wxPayShow">
            <input type="text" name="mobile" style="display:none" v-model="mobile" />
            <input type="hidden" name="paytype" value="wxpay.comm.jspay" />
            <button type="submit" style="visibility:hidden">点击购买</button>
        </form>
        <!-- 浏览器环境支付 -->
        <form method="post" action="/forhoo/minipay" ref="formBrowser" @submit.prevent="payWx"  v-if="!wxPayShow">
            <input type="text" name="mobile" style="display:none" v-model="mobile" />
            <input type="hidden" name="paytype" value="comm.mini.url" />
            <button type="submit" style="visibility:hidden">点击购买</button>
        </form>
        <img @click="payWx()" class="payBTN" src="@/assets/img/index/payBtn.png?v=1" alt="" srcset="">
        <!-- 结尾 -->
        <Footer></Footer>
        <div class="maskModle" v-if="callUsShow"></div>
        <!-- 联系我们弹窗 -->
        <div class="call-us-box" v-if="callUsShow">
            <div class="call-us-list">
                <div class="list"><span>您的称呼:</span><input v-model="msgList.name" maxlength="10" type="text" /></div>
                <div class="list"><span>联系方式</span><input v-model="msgList.tel" placeholder="(手机或邮箱均可):"  type="text" /></div>
                <div class="list"><span>意见反馈:</span><textarea v-model="msgList.msg" maxlength="200" name="" id=""  rows="4"></textarea></div>
                <p class="health-manager-title">或您可直接添加健管师进行实时沟通</p>
                <div class="health-manager">
                    <div class="health-manager-left">
                        <img src="@/assets/img/index/eqCode.jpg" alt="" srcset="">
                    </div>
                    <div class="health-manager-right">
                            <p>联系健管师</p>
                            <p>孙老师 &nbsp;&nbsp; &nbsp;<a href="tel:13232218811">13232218811</a></p>
                    </div>
                </div>
                <div class="cross" @click="closeCallUsChange()">
                    <van-icon name="cross" />
                </div>
            </div>
            <div class="submit-list">
                <button @click="msgSubmit()">提交</button>
            </div>
        </div>
         <div class="model-box" v-if="loadingShow"></div>
        <van-loading class="loading-box" v-if="loadingShow" type="spinner" />
    </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import Footer from '@/components/footer.vue'
import { Dialog } from 'vant';
import qs from 'qs'
import { Notify } from 'vant';
import { Loading } from 'vant';
import Vue from 'vue';
Vue.use(Loading);
export default {
    name:'index',
    data(){
        return{
            listData:[],
            wxPayShow:true,
            mobile:'',
            loadingShow:false,
            swiperArr:[ 
                {url: require("@/assets/img/page1/user1.png"),index:0},
                {url: require("@/assets/img/page1/user2.png"),index:1},
                {url: require("@/assets/img/page1/user3.png"),index:2},
            ],
            playerOptions1: {
                //playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                autoplay: false, // 如果为true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 是否视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'en-US',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4", // 类型
                src: 'https://oss.sxyweb.com.cn/2021/wj/SANMED/IMG_1838.MP4' // url地址
                }],
                poster: require("@/assets/img/index/video2.png"), // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    remainingTimeDisplay: true, // 是否显示剩余时间功能
                    fullscreenToggle: true // 是否显示全屏按钮
                }
            },
             playerOptions2: {
                //playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                autoplay: false, // 如果为true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 是否视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'en-US',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4", // 类型
                src: 'https://oss.sxyweb.com.cn/2021/wj/SANMED/IMG_1566.mp4' // url地址
                }],
                poster: require("@/assets/img/index/video1.png"), // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    remainingTimeDisplay: true, // 是否显示剩余时间功能
                    fullscreenToggle: true // 是否显示全屏按钮
                }
            },
            selectIndex:0,
            textContent:[
                {
                    key:'0',
                    name:'白春学&nbsp; &nbsp;教授',
                    title0:'复旦大学附属中山医院  呼吸科  主任医师',
                    title1:'中国肺癌防治联盟主席',
                    title2:'国际智能健康联盟主席',
                    title3:'上海呼吸病研究所所长',
                    title4:'复旦大学呼吸病研究所所长',
                    content:'“由我们中山医院牵头进行的中国多中心临床研究显示：CAC检测针对IA期肺癌准确率近80%，联合人工智能影像判读（CT A.I.）准确率能达到90%以上，可作为肺癌早诊的有效补充手段，从而提高中国肺癌治疗的五年生存率，甚至十年生存率。”',
                },
                {
                    key:'1',
                    name:'王悦虹&nbsp; &nbsp;教授',
                    title1:'浙江大学医学院附属第一医院 呼吸科 主任医师',
                    title2:'美国MD Anderson癌症中心访问学者',
                    title3:'中国医师协会呼吸医师分会肺癌工作组委员',
                    content:'“CAC检测结合人工智能影像判读（CT A.I.）总体诊断效能针对10mm以下结节，准确率能够达到90%以上，可以帮助临床有效鉴别肺结节良恶性，及早确诊避免延误治疗，挽救患者生命。”'
                },
                 {
                    key:'2',
                    name:'刘红&nbsp; &nbsp;教授',
                    title1:'郑州大学第一附属医院 呼吸与危重症医学二科 主任医师',
                    title2:'中国医师协会呼吸病学分会肺癌学组委员',
                    title3:'中华医学会河南省呼吸病学分会委员',
                    content:'“肺结节的规范诊治极具挑战性，需要影像、活检等多维度信息，综合评估患者的肺结节恶性概率。传统诊疗手段+新技术辅助肺结节良恶性准确鉴别（如：CAC检测、CT A.I.等），为临床提供有效的决策参考，有其积极且深远的应用价值。”'
                },

            ],
            callUsShow:false,
            msgList:{
                name:'',
                tel:'',
                msg:''
            }
        }
    },
    components: {
        videoPlayer,
        Footer
    },
    mounted(){
        if (this._isMobile()) {
            window.location.href = 'https://cac.sanmedgene.com/SANMEDH5/index.html#/index';
        } else {
            window.location.href = 'https://cac.sanmedgene.com/SANMEDPC/index.html#/index';
        };
        // this.$refs.videoPlayer.player.pause() // 暂停
        // this.$refs.videoPlayer.player.src(src) // 重置进度条复制代码
        this.getInitList();
        let that  = this;
        let mobile = localStorage.getItem('tel');
        window.scrollTo(0,0);
        if(mobile){
            this.mobile = mobile;
        };
        if(that.isWeiXin()){
            that.wxPayShow = true;
        }else{
            that.wxPayShow = false;
            console.log("不是来自微信内置浏览器")
        } 
    },
    methods:{
        _isMobile(){
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },

        //获取列表
        getInitList(){
            let that = this;
            that.loadingShow = true;
            that.axios.get('gethomecontent')
            .then(function (res) {
            if(res.status == 200 ){
                if(res.data){
                    that.listData = res.data;
                    that.playerOptions2['sources'][0]['src'] = res.data.video;
                }else{
                    that.$message.error(res.data.msg);
                }
                that.loadingShow = false;
            }else{
                that.$message({
                message: '服务异常请稍后重试！',
                type: 'warning'
                });
            }
            })
        },
        //视频切换
        videoChange(item){
            this.$refs.videoPlayer1.player.pause() // 暂停
            this.$refs.videoPlayer2.player.pause() // 暂停
        },
        //获取专家下标
        swiperChange(item){
            this.selectIndex = item;
        },
        onSwiper(swiper) {
            console.log(swiper);
        },
        onSlideChange() {
            console.log('slide change');
        },
        //轮播图跳转详情页
        goPage(){
            this.$router.push({path:'/productDetail',query:{scrollTo:1480,listChange:'1'}});
        },

        testingChange(){
            this.$router.push({path:'/question'});
        },
        goPageProductDetail(listChange){
            this.$router.push({path:'/productDetail',query:{scrollTo:1480,listChange:listChange}});
        },
        goPageProductDetailS(listChange){
            this.$router.push({path:'/productDetail',query:{scrollTo:1880,listChange:listChange}});
        },
        goPageShield(){
           this.$router.push({path:'/shield'});
        },
        goUserPage(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            if(mobile && mobile!=''){
                that.mobile = mobile;
                this.$router.push({path:'/user'});
                return
            }else{
                Dialog.confirm({
                    title: '提示',
                    message: '需要您进行登录',
                }).then(() => {
                    this.$router.push({path:'/login',query:{path:'index'}});
                }).catch(() => {
                });
            }
        },
        //支付
        payWx(){
            this.$router.push({path:'/productDetail',query:{scrollTo:1480,listChange:'1'}});
        },  
        //判断是否微信登陆
        isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },

        //联系我们弹窗
        callUs(){
            this.callUsShow = true;
        },

        //关闭联系我们弹窗
        closeCallUsChange(){
            this.callUsShow = false;
        },

        //提交留言
        msgSubmit(){
            if(this.msgList.name == ''){
                Notify({ type: 'warning', message: '请输入您的姓名' });
            }else if(this.msgList.tel == ''){
                Notify({ type: 'warning', message: '请输入您的联系方式' });
            }else if(this.msgList.msg == ''){
                Notify({ type: 'warning', message: '留言不能为空' });
            }else{
                let that = this;
                let promise = {
                    username:that.msgList.name,
                    mobile:that.msgList.tel,
                    msg:that.msgList.msg
                };
                that.axios.post('postmsg', qs.stringify(promise))
                .then(function (res) {
                    console.log(res);
                    if(res.status == 200 ){
                        if(res.data && res.data.s){
                            that.callUsShow = false;
                        }else{
                            that.$message.error(res.data.msg);
                        }
                    }else{
                        that.$message({
                        message: '服务异常请稍后重试！',
                        type: 'warning'
                        });
                    }
                });
            }   
        },

        //手机号检验
        PhoneVerify(str){
            var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (reg.test(str)) {
                return  true;
            }else{
                return false;
            }
        },
    }
}
</script>
<style>
    .header-swiper .el-carousel{
        height: 13.5rem;
    }
    .indexPage .expert-recommendation-box .el-carousel{
        height: 4rem;
    }
    .indexPage .video-box .el-carousel{
        height: 4.5rem;
    }
    .indexPage{
       width: 100%;
       height: auto;
       overflow: hidden;
    }
    .indexPage .header-list h1 {
         text-align: left;
    }
    .indexPage .header-list h1 img{
        width: 262px;
        height: 110px;
        text-align: left;
        margin-top: 55px;
        margin-left: 31px;
    }
    .indexPage .header-list .menu-list{
        display: flex;
        width: 100%;
        margin-top:45px;
    }
    .indexPage .header-list .menu-list p{
        flex: 1;
        text-align: center;
        width: 100%;
        font-size: 32px;
        color: #6e6e6e;
        border-right: 1px solid #dfdfdf;
        margin: 0;
        padding: 0;
    }

    /* 轮播 */
    .indexPage .header-swiper{
        width: 100%;
        height: 13.5rem;
        margin-top: 90px;
    }
    .indexPage .header-swiper .list-img{
        width: 100%;
    }
    .indexPage .header-swiper .el-carousel__indicators--horizontal{
        bottom: 40px;
    }
    .indexPage .header-swiper .el-carousel__indicator--horizontal .el-carousel__button{
       width: 30px;
       height: 30px;
       border-radius: 100%;
       background: #008086;
    }
    .indexPage .header-swiper .el-carousel__arrow{
        height: 1rem;
        width: 1rem;
    }

    /* 检测 */
    .indexPage .inspect-box{
        width: 100%;
        height: auto;

    }
    .indexPage .inspect-box .ziceImg-box{
        width: 97%;
        margin: 0 auto;
        margin-top: 18px;
        position: relative;
    }
    .indexPage .inspect-box .ziceImg-box .circle{
        width: 8vw;
        position: absolute;
        left: 45%;
        top: 65%;
        animation: circleHide 2s ease infinite both;
    }
    .indexPage .inspect-box .ziceImg-box .finger{
        width: 8vw;
        position: absolute;
        left: 45.5%;
        top: 78%;
        animation: fingerHandle 2s ease infinite both;
    }
    .indexPage .inspect-box img{
        width: 100%;
        margin: 0 auto;
    }
    .indexPage .inspect-box h6{
        font-size: 34px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: center;
        color: #4eb7ba;
        font-weight: 800;
    }
    .indexPage .inspect-box h6 span{
        width: 1.8rem;
        height: 0.026667rem;
        background: #4eb7ba;
        display: inline-block;
        margin-bottom: 0.066667rem;
    }
    .indexPage .inspect-box .title{
        opacity: 0.7;
        font-size: 23px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: center;
        color: #282828;
        margin-top: 17px;
    }
    .indexPage .inspect-box .inspect{
         position: relative;
    }
    .indexPage .inspect-box .inspect .list{
        width: 100%;
        display: flex;
       
    }
    .indexPage .inspect-box .inspect .list p{
        flex: 1;
        position: absolute;
        font-size: 12px;
    }
    .indexPage .inspect-box .inspect .list .p1{
        left: 10%;
        top: 194px;
    }
    .indexPage .inspect-box .inspect .list .p2{
        left: 40%;
        top: 194px;
    }
    .indexPage .inspect-box .inspect .list .p3{
        right: 5%;
        top: 184px;
    }

    /* 视频 */
    .indexPage .video-box{
        width: 100%;
        height: auto;
        margin-top: 45px;
    }
    .indexPage .video-box h4{
        font-size: 21px;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        text-align: center;
        color: #4eb7ba;
        margin-top: 54px;
        margin-bottom: 40px;
    }
    .indexPage .video-box h4 span{
        width:210px;
        height:2px;
        background: #4eb7ba;
        display: inline-block;
        margin-bottom:5px;
    }
    .indexPage .video-box h4 span:nth-of-type(1){
        margin-right: 23px;
    }
    .indexPage .video-box h4 span:nth-of-type(2){
        margin-left: 23px;
    }
    .indexPage  .video-box .video-player{
        width: 88.8%;
        margin: 0 auto;
        background: #ebf4f3;
        margin-top: 40px;
    }
    .indexPage  .video-box .video-player .video-js{
        background: none;
    }
    .indexPage  .video-box .video-player .video-js .vjs-big-play-button{
        font-size: 4em;
        line-height: 1.5em;
        height: 1.5em;
        width: 1.5em;
        position: absolute;
        top: 40%;
        left: 45%;
        padding: 0;
        cursor: pointer;
        border-radius: 100%;
        box-sizing: border-box;
    }
    .indexPage .video-box .el-carousel__arrow{
        height: 1rem;
        width: 1rem;
    }
    /* 专家推荐 */
    .indexPage  .expert-recommendation-box{
        width: 100%;
        height: auto;
        margin-top:45px;
    }
    .indexPage  .expert-recommendation-box h4{
        font-size: 21px;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        text-align: center;
        color: #4eb7ba;
        margin-top: 54px;
    }
    .indexPage  .expert-recommendation-box h4 span{
        width:210px;
        height:2px;
        background: #4eb7ba;
        display: inline-block;
        margin-bottom:5px;
    }
    .indexPage  .expert-recommendation-box h4 span:nth-of-type(1){
        margin-right: 23px;
    }
    .indexPage  .expert-recommendation-box h4 span:nth-of-type(2){
        margin-left: 23px;
    }
    .indexPage  .expert-recommendation-box .list{
        margin-top: 16px;
    }
    .indexPage  .expert-recommendation-box .list img{
        width: 135px;
        height: 161px;
        margin-top: 10px;
        margin-left: -10px;
    }
    .indexPage .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active{
        border-radius: 100%;
        width: 232px;
        height: 232px;
        transform: translateX(3.5rem) scale(1) !important;
        margin-top: 20px;
        background: #e2f0d2;
    }
    .indexPage .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active img{
        width: 171px;
        height: 209px;
    }
    .indexPage .expert-recommendation-box .expert-recommendation {
        position: relative;
    }
    .indexPage .expert-recommendation .bg-left{
        width: 174px;
        height: 171px;
        background: url('https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/page1/swiperLeft.png');
        background-size: 100% 100%;
        /* background-position: 12px -140px; */
        position: absolute;
        left:80px;
        top:1rem;
        z-index: 0;
    }
    .indexPage .expert-recommendation .bg-right{
        width: 174px;
        height: 171px;
        background: url('https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/page1/swiperRight.png') ;
        background-size: 100% 100%;
        position: absolute;
        right:70px;
        top:1rem;
        z-index: 0;
    }
    .indexPage .expert-recommendation-box  .el-carousel__arrow--left{
        display: none !important;
    }
    .indexPage .expert-recommendation-box  .el-carousel__arrow--left i{
        display: none;
    }

    .indexPage .expert-recommendation-box  .el-carousel__arrow--right{
        display: none !important;
      
    }
    .indexPage .expert-recommendation-box  .el-carousel__arrow--right i{
        display: none;
    }
    .indexPage .expert-recommendation-box .expert-text-list{
        text-align: center;
        padding: 0 46px;
        box-sizing: border-box;
    }
    .indexPage .expert-recommendation-box .expert-text-list h6{
        text-align: center;
        font-size: 4vw;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        color: #282828;
       
    }
    .indexPage .expert-recommendation-box .expert-text-list span{
        width:160px;
        height:2px;
        background: #a9aaab;
        display: inline-block;
        margin: 0 10px;
        margin-bottom:5px;
    }
    .indexPage .expert-recommendation-box .expert-text-list p{
        font-size: 3.5vw;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: justifyLeft;
        color: #6e6e6e;
        line-height: 1.5;
    }
    
    /* CBA技术检测 */
    .indexPage .cac-testing-box{
        width: 100%;
        height: auto;
        position: relative;
        margin-top: 40px;
    }
    .indexPage .cac-testing-box img{
        width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
    }
     .indexPage  .cac-testing-box h4{
        font-size: 21px;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        text-align: center;
        color: #4eb7ba;
        margin-top: 54px;
    }
    .indexPage  .cac-testing-box h4 span{
        width:100px;
        height:4px;
        background: #4eb7ba;
        display: inline-block;
        margin-bottom:5px;
    }
    .indexPage  .cac-testing-box h4 span:nth-of-type(1){
        margin-right: 23px;
    }
    .indexPage .cac-testing-box h4 span:nth-of-type(2){
        margin-left: 23px;
    }
    .indexPage .cac-testing-box .bg1{
        display: block;
        width: 100%;
        margin: 0 auto;
        margin-top: 53px;
    }
    
    .indexPage .cac-testing-box .postList{
        position: absolute;
    }
    .indexPage .cac-testing-box .postList h3{
        font-size: 19px;
        font-family: SourceHanSansCN, SourceHanSansCN-Medium;
        font-weight: 700;
        color: #008086;
     }
     .indexPage .cac-testing-box .postList p{
        font-size: 0.2rem;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: justifyRight;
        color: #282828;
        line-height: 26px;
     }
    .indexPage .cac-testing-box .postList button{
        font-size: 10px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: left;
        color: #ffffff;
        line-height: 16px;
        background: #abc0d3;
        border-radius: 4px;
        padding: 10px;
        border: none;
        box-sizing: border-box;
    }
    .indexPage .cac-testing-box .pos1{
        left: 28px;
        top: 5.73rem;
        text-align: right;
    }
    .indexPage .cac-testing-box .pos2{
        right: 0px;
        top: 7.2rem;
        text-align: left;
    }
    .indexPage .cac-testing-box .pos3{
        left: 0px;
        top: 11.5rem;
        text-align: right;
    }
     .indexPage .cac-testing-box .pos4{
        right: 20px;
        top: 13rem;
        text-align: left;
    }
    .indexPage .cac-testing-box .wrapper {
        position: absolute;
        top: 76%;
        left: 4%;
        overflow: hidden;
        width: 500px;
        height: 500px;
        margin: 0 auto;
        z-index: 1000;
        animation: wrapperHandle 20s ease infinite both;
    }

    .indexPage .cac-testing-box .wrapper1 {
        position: absolute;
        top: 15%;
        left: 30%;
        overflow: hidden;
        width: 500px;
        height: 500px;
        margin: 0 auto;
        z-index: 1000;
        animation: wrapperHandle 10s ease infinite both;
    }
    
    .indexPage .cac-testing-box .finger {
        width: 8vw;
        margin: 16vh auto;
        animation: fingerHandle 2s ease infinite both;
    }
    .indexPage .cac-testing-box .circle {
        width: 8vw;
        margin-top: 10vh;
        animation: circleHide 2s ease infinite both;
    }
    .indexPage .cac-testing-box  .finger{
        margin-left: 30vw;
        margin-top: 1vh;
    }
    @keyframes fingerHandle {
        0% {
            opacity: 1;
            transform: scale3d(1.2, 1.2, 1.2);
        }
        70% {
            opacity: 1;
            transform: scale3d(1.5, 1.5, 1.5);
        }
        100% {
            opacity: 1;
            transform: scale3d(1.2, 1.2, 1.2);
        }
    }   
    @keyframes circleHide {
        0% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
        70% {
            opacity: 0;
            transform: scale3d(0, 0, 0);
        }
        100% {
            opacity: 1;
            transform: scale3d(1.5, 1.5, 1.5);
        }
    }

    .indexPage .cac-testing-box .click1{
        width: 200px;
        height: 100px;
        position: absolute;
        right: 13.5%;
        top: 40%;
        z-index: 1000;
    }
    .indexPage .cac-testing-box .click2{
        width: 200px;
        height: 100px;
        position: absolute;
        right: 10%;
        top: 76%;
        z-index: 1000;
    }
     .indexPage .cac-testing-box .click3{
        width: 210px;
        height: 100px;
        z-index: 1000;
        position: absolute;
        left: 10%;
        top: 28%;
    }
     .indexPage .cac-testing-box .click4{
        width: 210px;
        height: 100px;
        z-index: 1000;
        position: absolute;
        left: 12%;
        top: 67%;
    }
    /* 友情链接 */
    /* .indexPage .join-subscription-box{
        width: 100%;
        margin-top: 100px;
    }
    .indexPage .join-subscription{
        width: 100%;
        height: 63px;
        background: #cce1de;
        text-align: center;
        cursor: pointer;
        line-height: 63px;
    }
    .indexPage .join-subscription a{
        height: 12px;
        opacity: 1;
        font-size: 11px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: left;
        color: #282828;
    } */
    .indexPage .payBTN{
        width: 80px;
        position: fixed;
        right: 0;
        bottom: 10%;
        z-index: 888;
    }
    .indexPage .title-img-box{
        width: 97%;
        margin: 0 auto;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 2vw;
    }
    .indexPage .title-img-box img{
        width: 100%;
        object-fit: fill;
    }
    .indexPage .title-img-box4{
        width: 93.6%;
        margin: 0 auto;
        text-align: center;
    }
    .indexPage .title-img-box4 img{
        width: 100%;
        object-fit: fill;
    }
    .indexPage .maskModle{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        z-index: 1005;
    }
    .indexPage .call-us-box{
        width: 86%;
        position: fixed;
        top: 10%;
        left: 7vw;
        background: #fff;
        z-index: 1006;
        border-radius: 40px;
        padding-bottom: 32px;
        box-sizing: border-box;
    }
    .indexPage .call-us-list{
        width: 100%;
        background: #e3f3fc;
        text-align: left;
        padding-top: 62px;
        box-sizing: border-box;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        padding-bottom: 20px;
        position: relative;
    }
    .indexPage .call-us-list .cross{
        position: absolute;
        right: 3vw;
        top: 3vw;
        line-height: 1;
        color: #fff;
        background: #999;
        border-radius: 100%;
        font-size: 28px;
    }
    .indexPage .call-us-list .list:nth-of-type(1){
        margin-top: 0;
    }
    .indexPage .call-us-list .list{
        position: relative;
        padding: 0 30px;
        box-sizing: border-box;
        margin-top: 42px;
    }
    .indexPage .call-us-list .list input{
        width:100%;
        height: 96px;
        border-radius: 40px;
        border:1pt solid #d3d8d8;
        padding-left: 5vw;
        box-sizing: border-box;
        font-size: 28px;
        color: #4eb7ba;
    }
    .indexPage .call-us-list .list span{
        font-size: 28px;
        color: #4eb7ba;
        position: absolute;
        left: 10vw;
        top: 2vh;
    }
    .indexPage .call-us-list .list textarea{
        border-radius: 40px;
        padding:10vw 3vw;
        width: 100%;
        resize: none;
        font-size: 28px;
        box-sizing: border-box;
        border:1pt solid #d3d8d8;
    }
    .indexPage .call-us-box .health-manager{
        display: flex;
        margin-top: 10px;
    }
    .indexPage .call-us-box .health-manager div{
        flex: 1;
        text-align: left;
    }
    .indexPage .call-us-box .health-manager div:nth-of-type(1) img{
        width: 232px;
        margin-left: 36px;
    }
    .indexPage .call-us-box .health-manager-right p,.indexPage .call-us-box .health-manager-right p a{
        font-size: 28px;
        color: #4eb7ba;
        margin-top: 50px;
        margin-left: -3vw;
        font-weight: 700;
    }
    .indexPage .call-us-box .submit-list button{
        padding: 13px 40px;
        border: 2pt solid #d3d8d8;
        border-radius: 40px;
        background: #fff;
        margin-top: 20px;
        box-sizing: border-box;
        font-size: 28px;
        color: #4eb7ba;
    }
    .indexPage .call-us-box  input::-webkit-input-placeholder , .loginPage .login-information .tel input::-webkit-input-placeholder{
        color: rgb(78, 183, 186);
    }
    .indexPage .call-us-box  input::-moz-input-placeholder, .loginPage .login-information .tel input::-moz-input-placeholder{
        color: rgb(78, 183, 186)
    }
    .indexPage .call-us-box  input::-ms-input-placeholder, .loginPage .login-information .tel input::-ms-input-placeholder {
        color: rgb(78, 183, 186)
    }
    .indexPage .health-manager-title{
        color: rgb(78, 183, 186);
        font-size:28px;
        margin-left: 4vw;
        margin-top: 2vw;
        text-align: center;
    }
</style>
<style>
.indexPage .model-box{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}
.indexPage .loading-box{
    width: 100%;
    position: fixed;
    top: 45%;
    left: 0;
    font-size: 10vw;
    z-index: 1000;
}
.indexPage .loading-box .van-loading__spinner{
    height: 10vw;
}
.indexPage .loading-box  .van-loading__spinner--spinner i::before{
    width: 1vw;
}
</style>