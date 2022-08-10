<template>
    <div class="productDetailPage" ref="reList">
        <div class="header-bg"></div>
        <div class="header-box">
            <div class="content-list">
                <div class="left">
                    <router-link :to="{path:'/index'}"><img src="@/assets/img/page1/logo.png" alt="" srcset=""></router-link>
                </div>
                <div class="right" @click="indexListChange()">
                    <img src="@/assets/img/page2/icon-list.jpg" alt="" srcset="">
                    <div class="index-list" v-if="indexShow">
                        <p><router-link :to="{path:'/index'}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
                        <p><router-link :to="{path:'/shield'}">技术详情</router-link></p>
                        <p> <router-link :to="{path:'/manual'}">健康讲堂</router-link></p>
                        <p @click="goUserPage()">个人中心</p> 
                        <p @click="callUs()">联系我们</p>
                    </div>
                </div>
            </div>
            <div class="content-list headerFiexd" v-if="headerFixed">
                <div class="left">
                    <router-link :to="{path:'/index'}"><img src="@/assets/img/page1/logo.png" alt="" srcset=""></router-link>
                </div>
                <div class="right" @click="indexListChange()">
                    <img src="@/assets/img/page2/icon-list.jpg" alt="" srcset="">
                    <div class="index-list" v-if="indexShow">
                        <p><router-link :to="{path:'/index'}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
                        <p><router-link :to="{path:'/shield'}">技术详情</router-link></p>
                        <p> <router-link :to="{path:'/manual'}">健康讲堂</router-link></p>
                        <p @click="goUserPage()">个人中心</p> 
                        <p @click="callUs()">联系我们</p>
                    </div>
                </div>
            </div>
            <div class="text-content">
                <h5>“ 肺 ”常无忧——肺结节全病程管理方案</h5>
                <!-- <p>让5-30mm肺结节人群:一劳永逸,无后顾之忧</p> -->
            </div>
        </div>

        <!-- 详情内容 -->
        <div class="Details-content">
            <div class="list-content">
                <div class="left">
                    <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                    <h6>准确</h6>
                </div>
                <div class="right">
                    <p>全国13家三甲医院，1737例研究数据验证:</p>
                    <p>早期肺癌综合分析准确率<span class="textColor">90%*</span></p>
                    <!-- <div class="tip">*研究数据，待发表</div> -->
                </div>
            </div>

            <div class="list-content">
                <div class="left" style="padding-top: 3px;box-sizing: border-box;">
                    <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                    <h6>权威</h6>
                </div>
                <div class="right">
                    <p style="position:relative;">丽菲清<sup>®️</sup>(CAC检测)是“中国肺癌防治联盟</p>
                    <p>百万工程”肺癌早诊三剑客之一</p>
                </div>
            </div>

            <div class="list-content">
                <div class="left">
                    <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                    <h6>专业</h6>
                </div>
                <div class="right">
                    <p>三甲医院专家团队<span class="textColor">(副主任医师及以上)</span></p>
                    <p>提供解读报告</p>
                </div>
            </div>

            <div class="list-content">
                <div class="left">
                    <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                    <h6>便捷</h6>
                </div>
                <div class="right">
                    <p>执证护士上门采血(无需空腹)，仅需<span class="textColor">10分钟</span><br/><span class="textColor">7天**</span>即可拿到检测结果，全程顺丰物流</p>
                    <!-- <div class="tip">*自实验室确认样本合格之日计算</div> -->
                </div>
            </div>

            <div class="list-content">
                <div class="left" style="padding-top:0px">
                    <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                    <h6>无忧</h6>
                </div>
                <div class="right">
                    <p>专属健管师<span class="textColor">1对1服务</span>，全流程跟进，后顾无忧</p>
                </div>
            </div>
            <div class="family-box"></div>
            <div class="purchase-btn">
                <!-- 微信环境支付 -->
                <form method="post" action="/forhoo/pay" ref="formWx" @submit.prevent="payWx" v-if="wxPayShow">
                    <input type="text" name="mobile" style="display:none" v-model="mobile" />
                    <input type="hidden" name="paytype" value="wxpay.comm.jspay" />
                    <button type="submit" :disabled="payDisabled"><img src="@/assets/img/index/payBtnNew.png" alt="" srcset=""></button>
                    <div class="tip-box">
                        <p class="pay-tip">* &nbsp;&nbsp;&nbsp;:&nbsp;中国多中心研究数据</p>
                        <p class="pay-tip">**&nbsp;&nbsp;:&nbsp;自实验室确认样本合格之日计算</p>
                    </div>
                </form>
                <!-- 浏览器环境支付 -->
                <form method="post" action="/forhoo/minipay" ref="formBrowser" @submit.prevent="payWx"  v-if="!wxPayShow">
                    <input type="text" name="mobile" style="display:none" v-model="mobile" />
                    <input type="hidden" name="paytype" value="comm.mini.url" />
                    <button type="submit" :disabled="payDisabled"><img src="@/assets/img/index/payBtnNew.png" alt="" srcset=""></button>
                    <div class="tip-box">
                        <p class="pay-tip">*&nbsp;&nbsp;&nbsp; :&nbsp;中国多中心研究数据</p>
                        <p class="pay-tip">**&nbsp;&nbsp;:&nbsp;自实验室确认样本合格之日计算</p>
                    </div>    
                </form>
            </div>
        </div>

        <!-- 问题列表 -->
        <div class="problem-list-box">
            <div :class="{active:listChange=='1'}" @click="listChange='1'">套餐内容详情</div>
            <div :class="{active:listChange=='2'}" @click="listChange='2'">“TA”的故事</div>
            <div :class="{active:listChange=='3'}" @click="listChange='3'">常见问题</div>
        </div>
        <div class="problem-list-box selectFixed"  v-if="Fixed">
            <div :class="{active:listChange=='1'}" @click="listChange='1'">套餐内容详情</div>
            <div :class="{active:listChange=='2'}" @click="listChange='2'">“TA”的故事</div>
            <div :class="{active:listChange=='3'}" @click="listChange='3'">常见问题</div>
        </div>
        <!-- 套餐内容详情 -->
        <img class="productCt1" id="productCt1" v-show="listChange=='1'" :src="imgSrc" alt="" srcset="">
        <!-- 使用者反馈 -->
        <UseFeedback v-show="listChange=='2'"></UseFeedback>
        <!-- 常见问题 -->
        <commonProblem v-show="listChange=='3'"></commonProblem>        
        <!-- 结尾 -->
        <Footer></Footer>
        <img @click="payWx()" class="payBTN" src="@/assets/img/index/payBtn.png" alt="" srcset="">
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
import Footer from '@/components/footer.vue'
import PackageContent from '@/components/PackageContent.vue'
import UseFeedback from '@/components/UseFeedback.vue'
import commonProblem from '@/components/commonProblem.vue'
import { Dialog } from 'vant';
import { Notify } from 'vant';
import { Loading } from 'vant';
import Vue from 'vue';
Vue.use(Loading);
export default {
    data(){
        return{ 
            listChange:'1',
            payDisabled:false,
            indexShow:false,
            Fixed:false,
            headerFixed:false,
            mobile:'',
            wxPayShow:true,
            callUsShow:false,
            msgList:{
                name:'',
                tel:'',
                msg:''
            },
            imgSrc:'',
            target:'',
            loadingShow:false
        }
    },
    components:{
        commonProblem,
        Footer,
        UseFeedback,
        PackageContent
    },
    mounted(){
        let that  = this;
        let mobile = localStorage.getItem('tel');
        if(mobile){
            this.mobile = mobile;
        };
        this.getProductDetailList('productD1','h5');//h5端套餐内容
        var query=this.$route.query;
        that.listChange = query.listChange;
        if(query.listChange){
            window.scrollTo(0,query.scrollTo);
        }
        window.addEventListener("scroll", this.showIcon);
        if(that.isWeiXin()){
            that.wxPayShow = true;
        }else{
            that.wxPayShow = false;
            console.log("不是来自微信内置浏览器")
        } 
        
    },
    methods:{
        showIcon() {
            if (document.documentElement.scrollTop> 100 || document.body.scrollTop>100) {            
                this.headerFixed = true
            } else {
                this.headerFixed = false 
            };
            if (document.documentElement.scrollTop>850 || document.body.scrollTop>850) {            
                this.Fixed = true
            } else {
                this.Fixed = false 
            }
        },
        indexListChange(){
            this.indexShow = !this.indexShow;
        },
        getProductDetailList(pagename,browsertype){
            let that = this;
            that.axios.get('photolist',{
            params: {
                pagename: pagename,
                browsertype:browsertype
            }
            })
            .then(function (res) {
                console.log(res.data);
                if(res.status == 200 ){
                    if(res.data.data && res.data.data.length>0){
                        that.imgSrc = res.data.data.pop().photourl;
                    };
                   
                }
            }) 
        },
        payWx(){
            let that  = this;
            let mobile = localStorage.getItem('tel');
            if(mobile){
                that.loadingShow = true;
                that.mobile = mobile;
                if(that.isWeiXin()){
                    localStorage.setItem('payState',true);
                    that.$refs.formWx.submit();
                }else{
                    localStorage.setItem('payState',true);
                    that.$refs.formBrowser.submit();
                    console.log("不是来自微信内置浏览器")
                } 
            }else{
                Dialog.confirm({
                    title: '提示',
                    message: '需要您进行登录',
                }).then(() => {
                    this.$router.push({path:'/login',query:{path:'productDetail'}});
                }).catch(() => {
                });
            }
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
        goOrderPage(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            if(mobile && mobile!=''){
                that.mobile = mobile;
                this.$router.push({path:'/orderList'});
                return
            }else{
                Dialog.confirm({
                    title: '提示',
                    message: '需要您进行登录',
                }).then(() => {
                    this.$router.push({path:'/login',query:{path:'productDetail'}});
                }).catch(() => {
                });
            }
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
                    this.$router.push({path:'/login',query:{path:'productDetail'}});
                }).catch(() => {
                });
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
    }
}
</script>
<style scoped>
.productDetailPage{
    width: 100%;
}
.productDetailPage .header-bg{
    width: 100%;
    height: 18px;
    background: #e3edd3;
}
.productDetailPage .header-box{
    width: 100%;
    height: 382px;
    background: url('../assets/img/page2/header-bg.png') center no-repeat;
    background-size: 100% 100%;
}
.productDetailPage .content-list{
    width: 100%;
    display: flex;
}
.productDetailPage .headerFiexd{
    position: fixed;
    top: 0;
    left: 0;
    background:#fff;
    z-index: 990;
    line-height: 1.5;
}
.productDetailPage .header-box div{
    flex: 1;
}
.productDetailPage .header-box .left{
    text-align: left;
}
.productDetailPage .header-box .right{
    text-align: right;
    position: relative;
}
.productDetailPage .header-box .index-list{
    width: 180px;
    position: absolute;
    right: 0;
    top: 134px;
    background: #f8f8f8;
    z-index: 100;
    box-shadow: 10px 10px 10px #dfdfdf;
    box-shadow: -10px 10px 10px #dfdfdf;
}
.productDetailPage .header-box .index-list p{
    height: 66px;
    font-size: 32px;
    border-top: 1px solid #989898;
    text-align: center;
    line-height: 66px;
}
.productDetailPage .header-box .left img{
    width: 131px;
    height: 55px;
    margin-top: 70px;
    margin-left: 30px;
}
.productDetailPage .header-box .right img{
    width: 47px;
    height: 48px;
    margin-top: 85px;
    margin-right: 37px;
}
.productDetailPage .header-box .text-content h5{
    font-size: 35px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 700;
    text-align: center;
    color: #4eb7ba;
    margin-top: 124px;
}
.productDetailPage .header-box .text-content p{
    font-size: 30px;
    font-weight: 500;
    color: #4eb7ba;
    padding: 0;
    margin: 0;
    text-align: center;
    margin-top: 15px;
    letter-spacing: 3px;
}


/* 详情内容 */
.productDetailPage .Details-content{
    width: 100%;
    position: relative;
}
.productDetailPage .Details-content .list-content{
    width: 100%;
    display: flex;
    margin-top: 45px;
}
.productDetailPage .Details-content .list-content .left {
    flex: 1;
    text-align: left;
    box-sizing: border-box;
}
.productDetailPage .Details-content .list-content .right{
    flex: 3;
    text-align: left;
    padding-right: 45px;
    box-sizing: border-box;
}
.productDetailPage .Details-content .list-content .left img{
    float: left;
    margin-left: 23px;
    width: 27px;
    margin-top: 10px;
}
.productDetailPage .Details-content .list-content .left h6{
    font-size: 30px;
    color: #4eb7b9;
    margin-left: 10px;
    float: left;
}
.productDetailPage .Details-content .list-content .right p{
    font-size: 26px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #282828;
    margin: 0;
    line-height: 1.5;
}
.productDetailPage .Details-content .list-content .right .tip{
    font-size: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN-Light;
    font-weight: 300;
    text-align: left;
    color: #231815;
    line-height: 1.5;
}
.productDetailPage .Details-content .list-content .textColor{
    color: #4eb7ba;
    font-weight: 700;
}
.productDetailPage .Details-content .family-box{
    margin-top: -181px;
    float: right;
    width: 453px;
    height: 528px;
    background: url('../assets/img/page2/family.png') center no-repeat;
    background-size: 100% 100%; 
}
.productDetailPage .Details-content .purchase-btn button{
    width: 180px;
    line-height: 1;
    text-align: center;
    font-size: 28px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 2px;
    border: none;
    margin-top: 38px;
    background: url('../assets/img/index/payBtnNew.png') center no-repeat;
    background-size: 100% 100%;
}
.productDetailPage .Details-content .purchase-btn button img{
    width: 100%;
}
.productDetailPage .Details-content .purchase-btn{
    position: relative;
}
.productDetailPage .Details-content .purchase-btn .pay-tip{
    text-align: left;
    font-size: 3vw;
    line-height: 1;
    margin-left: 5vw;
    padding: 0;
    position: absolute;
    top: 5vw;
    left: 0;
}
.productDetailPage .Details-content .purchase-btn .pay-tip:nth-of-type(2){
    top: 10vw;
}
/* 问题列表 */
.problem-list-box{
    width: 100%;
    height: 102px;
    background: #4eb7ba;
    display: flex;
    line-height: 102px;
}
.productDetailPage .selectFixed{
    position: fixed;
    z-index: 900;
    top: 130px;
    left: 0;
}
.productDetailPage .tip-box{
    margin-top: 2vw;
    position: relative;
    width: 100%;
}
.problem-list-box div{
    flex: 1;
    font-size: 30px;
    height: 90px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    font-weight: 400;
    text-align: center;
    color: #4eb7ba;
    background-image: linear-gradient(#fff, #e4f0e2);
    margin: 0 0.2vw;
}
.problem-list-box .active{
    background-image: linear-gradient(#fff, #4eb7ba);
    color: #fff;
}
.productDetailPage  .payBTN{
    width: 80px;
    position: fixed;
    right: 0;
    bottom: 10%;
    z-index: 888;
}
.productDetailPage .call-us-box{
    width: 86%;
    position: fixed;
    top: 10%;
    left: 7vw;
    background: #fff;
    z-index: 889;
    border-radius: 40px;
    padding-bottom: 32px;
    box-sizing: border-box;
}
.productDetailPage .call-us-list{
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
.productDetailPage .maskModle{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 991;
}
.productDetailPage .call-us-box{
    width: 86%;
    position: fixed;
    top: 10%;
    left: 7vw;
    background: #fff;
    z-index: 992;
    border-radius: 40px;
    padding-bottom: 32px;
    box-sizing: border-box;
}
.productDetailPage .call-us-list{
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
.productDetailPage .call-us-list .cross{
    position: absolute;
    right: 3vw;
    top: 3vw;
    line-height: 1;
    color: #fff;
    background: #999;
    border-radius: 100%;
    font-size: 28px;
}
.productDetailPage .call-us-list .list:nth-of-type(1){
    margin-top: 0;
}
.productDetailPage .call-us-list .list{
    position: relative;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 42px;
}
.productDetailPage .call-us-list .list input{
    width:100%;
    height: 96px;
    border-radius: 40px;
    border:1pt solid #d3d8d8;
    padding-left: 22vw;
    box-sizing: border-box;
    font-size: 28px;
    color: #999;
}
.productDetailPage .call-us-list .list span{
    font-size: 28px;
    color: #4eb7ba;
    position: absolute;
    left: 10vw;
    top: 2vh;
}
.productDetailPage .call-us-list .list textarea{
    border-radius: 40px;
    padding:10vw 3vw;
    width: 100%;
    resize: none;
    font-size: 28px;
    box-sizing: border-box;
    border:1pt solid #d3d8d8;
}
.productDetailPage .call-us-box .health-manager{
    display: flex;
    margin-top: 10px;
}
.productDetailPage .call-us-box .health-manager div{
    flex: 1;
    text-align: left;
}
.productDetailPage .call-us-box .health-manager div:nth-of-type(1) img{
    width: 232px;
    margin-left: 36px;
}
.productDetailPage .call-us-box .health-manager-right p, .productDetailPage .call-us-box .health-manager-right p a{
    font-size: 30px;
    color: #4eb7ba;
    margin-top: 50px;
    margin-left: -3vw;
    font-weight: 700;
}
.productDetailPage .call-us-box .submit-list button{
    padding: 13px 40px;
    border: 2pt solid #d3d8d8;
    border-radius: 40px;
    background: #fff;
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 28px;
    color: #4eb7ba ;
}
.productDetailPage .call-us-box  input::-webkit-input-placeholder , .loginPage .login-information .tel input::-webkit-input-placeholder{
    color: rgb(78, 183, 186);
}
.productDetailPage .call-us-box  input::-moz-input-placeholder, .loginPage .login-information .tel input::-moz-input-placeholder{
    color: rgb(78, 183, 186)
}
.productDetailPage.call-us-box  input::-ms-input-placeholder, .loginPage .login-information .tel input::-ms-input-placeholder {
    color: rgb(78, 183, 186)
}
.productDetailPage .health-manager-title{
    color: rgb(78, 183, 186);
    font-size:28px;
    text-align: center;
    margin-top: 2vw;
}
.productCt1{
    width: 100%;
}

</style>
<style>
.productDetailPage .model-box{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}
.productDetailPage .loading-box{
    width: 100%;
    position: fixed;
    top: 45%;
    left: 0;
    font-size: 10vw;
    z-index: 1000;
}
.productDetailPage .loading-box .van-loading__spinner{
    height: 10vw;
}
.productDetailPage .loading-box  .van-loading__spinner--spinner i::before{
    width: 1vw;
}
</style>