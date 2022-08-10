<template>
    <div class="productShieldPage">
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
        </div>
        
        <!--bannner-->
        <div class="banner">
          <img src="@/assets/img/shield/banner1.png" alt="" srcset="">
        </div>

        <!-- 技术发明者介绍 -->
        <div class="technological-invention">
            <div class="title">
                <p>CAC——外周血中带有</p>
                <p>肿瘤特异性染色体位点异常的细胞</p>
                <div class="user-img"><img src="https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/productShield/02.png" alt="" srcset=""></div>
                <p>技术发明者Prof. Ruth Katz</p>
            </div>
            <div class="Top">
                <span></span>
                <p>蝉联美国最佳癌症医院<sup>「1」</sup>美国MD安德森癌症中心前细胞病理学主任、细胞图像诊断实验室主任</p>
                <span></span>
                <p>2015年被评为最具影响力病理学家Top100<sup>「2」</sup></p>
            </div>
            <div class="top1-bg">
                <img src="@/assets/img/shield/top1.png" alt="" srcset="">
            </div>
            <div class="pathologist">
                <img src="@/assets/img/shield/history1.png" alt="" srcset="">
            </div>
            <div class="link-list">
                <p><a href="https://health.usnews.com/health-care/best-hospitals/slidesho">1、https://health.usnews.com/health-care/best-hospitals/slidesho</a></p>
                <p><a href="https://thepathologist.com/the-power-list-2015\">2、https://thepathologist.com/the-power-list-2015</a></p>
                <p><a href="https://mp.weixin.qq.com/s/XfS4mqqcvzlKBFeFV0yTuQ">3、https://mp.weixin.qq.com/s/XfS4mqqcvzlKBFeFV0yTuQ</a></p>
            </div>
            <div class="expert">
                <img src="@/assets/img/shield/list1.png" alt="" srcset="">
            </div>
        </div>

        <!-- CAC介绍 -->
        <div class="CAC-list">
            <div class="list6">
               <img src="@/assets/img/shield/list2.png" alt="" srcset="">
            </div>
            <div class="list7">
                <img src="https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/productShield/07.png" alt="" srcset="">
                <p>针对5-10mm肺部小结节良恶性诊断的</p>
                <p>部分中国多中心数据研究成果</p>
            </div>
            <div class="list8"><img src="https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/productShield/08.png" alt="" srcset=""></div>
            <div class="CAC-text-list">
                <i></i>
                <p>CAC 检测诊断效能<span>明显优于</span>传统肿瘤标志物 ;</p>
                <i></i>
                <p>CAC检测技术结合肺结节患者基本信息 , 综合评估结节风险，<span>显著提升</span>诊断效能 ;</p>
                <i></i>
                <p>外周血中存在≥3个CAC的受试者 , 肺癌风险要比其他受试者高<span>18.5</span>倍。</p>
                <div><a href="https://mp.weixin.qq.com/s/HYZFz2Z88PWgWfGt2j-Qjw">详见：重磅| 国际肺癌研究协会ISALC 液体活检热点会议 循环异常细胞（CAC）在5-10mm肺部小结节中的良恶性诊断效能</a> </div>
            </div>
            <div class="list9">
                <img src="@/assets/img/shield/list3.png" alt="" srcset="">
            </div>
            <div class="list10">
                <img src="https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/productShield/10.png" alt="" srcset="">
                <p>人工智能在肺结节良恶性辅助诊断的</p>
                <p>真实世界研究</p>
                <div class="compare">
                    <p>肺结节良恶性诊断准确率比较：</p>
                    <p>人工智能诊断系统&nbsp;≈&nbsp;呼吸科专家＞梅奥模型</p>
                </div>
            </div>
            <div class="list11">
                <img src="@/assets/img/shield/list4.png" alt="" srcset="">
            </div>
            <div class="list12">
                <img src="@/assets/img/shield/list5.png" alt="" srcset="">
            </div>
            <div class="list13">
                <a href="https://mp.weixin.qq.com/s/guXgATShReVkOJhyYITXxA">详见：基于深度学习的人工智能用于肺结节良恶性鉴别诊断，一项真实世界、多中心的诊断性研究</a> 
            </div>
        </div>
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
    </div>
</template>
<script>
import Footer from '@/components/footer.vue'
import { Dialog } from 'vant';
import { Notify } from 'vant';
export default {
    data(){
        return{
            listChange:'2',
            indexShow:false,
            callUsShow:false,
            msgList:{
                name:'',
                tel:'',
                msg:''
            }
        }
    },
    components:{
        Footer,
    },
    mounted(){
    },
    methods:{
        indexListChange(){
            this.indexShow = !this.indexShow;
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
                    this.$router.push({path:'/login'});
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
                    this.$router.push({path:'/login'});
                }).catch(() => {
                });
            }
        },
         //支付
        payWx(){
            let that  = this;
            if(this.mobile){
                that.$router.push('/productDetail');
            }else{
                Dialog.confirm({
                    title: '提示',
                    message: '需要您进行登录',
                }).then(() => {
                    this.$router.push({path:'/login'});
                }).catch(() => {
                });
            }
        },  
        //联系我们弹窗
        callUs(){
            console.log('1111')
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
.productShieldPage{
    width: 100%;
}
.productShieldPage .header-bg{
    width: 100%;
    height: 18px;
    background: #e3edd3;
}
.productShieldPage .header-box{
    width: 100%;
    height: 167px;
   background: #fff;
}
.productShieldPage .content-list{
    width: 100%;
    display: flex;
}
.productShieldPage .header-box div{
    flex: 1;
}
.productDetailPage .header-box .left{
    text-align: left;
}
.productShieldPage .header-box .right{
    text-align: right;
    position: relative;
}
.productShieldPage .header-box .index-list{
    width: 180px;
    position: absolute;
    right: 0;
    top: 134px;
    background: #f8f8f8;
    z-index: 100;
    box-shadow: 10px 10px 10px #dfdfdf;
    box-shadow: -10px 10px 10px #dfdfdf;
}
.productShieldPage .header-box .index-list p{
    height: 66px;
    font-size: 32px;
    border-top: 1px solid #989898;
    text-align: center;
    line-height: 66px;
}
.productShieldPage .header-box .left img{
    width: 131px;
    height: 55px;
    margin-top: 70px;
    margin-left: -20vw;
}
.productShieldPage .header-box .right img{
    width: 60px;
    height: 60px;
    margin-top: 65px;
    margin-right: 37px;
}
/* banner */
.productShieldPage .banner{
    width: 100%;
    height: 240px;
}

.productShieldPage .banner img{
    width: 100%;
    object-fit: fill;
}
/* 技术发明者介绍 */
.productShieldPage .technological-invention{
    width: 100%;
    height: auto;
}
.productShieldPage .technological-invention .title{
    margin-top: 39px;
}
.productShieldPage .technological-invention .title p{
    font-size: 28px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 36px;
}
.productShieldPage .technological-invention .user-img img{
    width: 241px;
    height: 241px;
    margin-top: 43px;
}
.productShieldPage .top1-bg{
    width: 100%;
    text-align: center;
    margin-top: 45px;
}
.productShieldPage .top1-bg img{
    width: 90%;
    object-fit: fill;
}
.productShieldPage .technological-invention .Top{
    margin-top: 27px;
}
.productShieldPage .technological-invention .Top p{
    padding: 0 44px;
    font-size: 25px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #282828;
    line-height: 47px;
    box-sizing: border-box;
}
.productShieldPage .technological-invention .Top  span{
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: #008086;
    float: left;
    margin-top: 28px;
    margin-left: 25px;
}
.productShieldPage .technological-invention .pathologist{
    width: 100%;
    margin-top: 40px;
    text-align: center;
}
.productShieldPage .technological-invention .pathologist img{
    width: 90%;
}
.productShieldPage .technological-invention .clinical-research{
    width: 100%;
    margin-top: 49px;
    text-align: center;
}
.productShieldPage .technological-invention .clinical-research img{
    width: 100%;
}
.productShieldPage .technological-invention .expert{
    width: 100%;
    margin-top: 49px;
    text-align: center;
}
.productShieldPage .technological-invention .expert img{
    width: 100%;
}
.productShieldPage .technological-invention .link-list{
    text-align: left;
    padding: 0 25px;
    box-sizing: border-box;
    margin-top: -120px;
}
/* CAC介绍 */
.productShieldPage .CAC-list{
    width: 100%;
    text-align: center;
}
.productShieldPage .CAC-list img{
    width: 90%;
}
.productShieldPage .CAC-list .list6{
    width: 100%;
    height: 240px;
    box-sizing: border-box;
    margin-top: 27px;
}
.productShieldPage .CAC-list .list6 img{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.productShieldPage .CAC-list .list6 p{
    font-size: 28px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #ffffff;
    line-height: 46px;
    text-shadow: 10px 10px 7px 1px #084059; 
    margin-left: 30px;
}
.productShieldPage .CAC-list .list7{
    margin-top: 37px;
}
.productShieldPage .CAC-list .list7 p{
    font-size: 36px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 39px;
}
.productShieldPage .CAC-list .list7 p:nth-of-type(1){
     margin-top: 37px;
}
.productShieldPage .CAC-list .list8{
    margin-top: 47px;
}
.productShieldPage  .CAC-text-list{
    padding: 0 27px;
    box-sizing: border-box;
    text-align: left;
}
.productShieldPage  .CAC-text-list p{
    font-size: 25px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #000000;
    line-height: 2;
    padding: 0 22px;
    box-sizing:border-box;
}
.productShieldPage  .CAC-text-list {
    width: 100%;
    margin-top: 43px;
}
.productShieldPage  .CAC-text-list i{
    width: 10px;
    height: 10px;
    background: #008086;
    border-radius: 100%;
    float: left;
    margin-top: 20px;
    margin-right: 10px;
}
.productShieldPage  .CAC-text-list p span{
    color: #4eb7ba;
}
.productShieldPage  .CAC-text-list div{
    font-weight: Normal;
    text-align: left;
    color: #000000;
    line-height: 40px;
    margin-top: 25px;
    padding: 0 22px;
    box-sizing: border-box;
}
.productShieldPage  .CAC-text-list div a{
    font-size: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
}
.productShieldPage  .list9{
    width: 100%;
    margin-top: 72px;
}
.productShieldPage  .list9 img{
    width: 100%;
    object-fit: fill;
}
.productShieldPage  .list10{
    margin-top: 62px;
}
.productShieldPage  .list10 p:nth-of-type(1){
    margin-top: 42px;
}
.productShieldPage  .list10 p{
    font-size: 34px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 48px;
    letter-spacing: -1px;
}
.productShieldPage  .list10 .compare{
    margin-top: 71px;
}
.productShieldPage  .list10 .compare p{
    font-size: 4vw;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 2;
}
.productShieldPage  .list10 .compare p:nth-of-type(2){
    color: #000;
}
.productShieldPage  .list11{
    margin-top: 62px;
}
.productShieldPage .CAC-list  .list11 p{
    font-size: 12px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #231815;
    margin-top: 49px;
    padding: 28px;
    box-sizing: border-box;
}
.productShieldPage .CAC-list  .judge{
    height: 296px;
    width: 90%;
    margin: 0 auto;
    border-top: 3px dashed #4eb7ba;
    margin-top: 89px;
    padding-top: 68px;
    box-sizing: border-box;
}
.productShieldPage .CAC-list  .judge p{
    font-size: 28px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 48px;
    letter-spacing: -1px;
}
.productShieldPage .CAC-list  .judge div{
    font-size: 16px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #282828;
    letter-spacing: -1px;
    margin-top: 46px;
}
.productShieldPage .CAC-list  .list12{
    margin: 92px 0;
}
.payBTN{
    width: 80px;
    position: fixed;
    right: 0;
    bottom: 10%;
}
.list13{
    text-align: left;
    padding: 0 30px;
}
.productShieldPage .call-us-box{
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
.productShieldPage .call-us-list{
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
.productShieldPage .maskModle{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 1005;
}
.productShieldPage .call-us-box{
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
.productShieldPage .call-us-list{
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
.productShieldPage .call-us-list .cross{
    position: absolute;
    right: 3vw;
    top: 3vw;
    line-height: 1;
    color: #fff;
    background: #999;
    border-radius: 100%;
    font-size: 28px;
}
.productShieldPage .call-us-list .list:nth-of-type(1){
    margin-top: 0;
}
.productShieldPage .call-us-list .list{
    position: relative;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 42px;
}
.productShieldPage .call-us-list .list input{
    width:100%;
    height: 96px;
    border-radius: 40px;
    border:1pt solid #d3d8d8;
    padding-left: 22vw;
    box-sizing: border-box;
    font-size: 28px;
    color: #999;
}
.productShieldPage .call-us-list .list span{
    font-size: 28px;
    color: #4eb7ba;
    position: absolute;
    left: 10vw;
    top: 2vh;
}
.productShieldPage .call-us-list .list textarea{
    border-radius: 40px;
    padding:10vw 3vw;
    width: 100%;
    resize: none;
    font-size: 28px;
    box-sizing: border-box;
    border:1pt solid #d3d8d8;
}
.productShieldPage .call-us-box .health-manager{
    display: flex;
    margin-top: 10px;
}
.productShieldPage .call-us-box .health-manager div{
    flex: 1;
    text-align: left;
}
.productShieldPage .call-us-box .health-manager div:nth-of-type(1) img{
    width: 232px;
    margin-left: 36px;
}
.productShieldPage .call-us-box .health-manager-right p, .productShieldPage .call-us-box .health-manager-right p a{
    font-size: 30px;
    color: #4eb7ba;
    margin-top: 50px;
    margin-left: -3vw;
    font-weight: 700;
}
.productShieldPage .call-us-box .submit-list button{
    padding: 13px 40px;
    border: 2pt solid #d3d8d8;
    border-radius: 40px;
    background: #fff;
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 28px;
    color: #4eb7ba;
}
.productShieldPage  .call-us-box  input::-webkit-input-placeholder , .loginPage .login-information .tel input::-webkit-input-placeholder{
    color: rgb(78, 183, 186);
}
.productShieldPage  .call-us-box  input::-moz-input-placeholder, .loginPage .login-information .tel input::-moz-input-placeholder{
    color: rgb(78, 183, 186)
}
.productShieldPage  .call-us-box  input::-ms-input-placeholder, .loginPage .login-information .tel input::-ms-input-placeholder {
    color: rgb(78, 183, 186)
}
.productShieldPage  .health-manager-title{
    color: rgb(78, 183, 186);
    font-size:28px;
    margin-top: 2vw;
    text-align: center;
}
</style>