<template>
    <div class="loginPage">
        <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
             <p>个人中心</p>   
        </header>
        <!-- logo -->
        <div class="logo-box">
            <img src="@/assets/img/page1/logo.png?v=1" alt="" srcset="">
        </div>
        
        <!-- 登录信息 -->
        <div class="login-information">
            <el-input
                placeholder="请输入姓名"
                v-model="name"
                :maxlength='12'
                class="name"
                >
            </el-input>
            <el-input
                placeholder="请输入手机号"
                v-model="tel"
                :maxlength='11'
                class="tel"
            >
            </el-input>
            <div class="Verification-Code-box">
                <el-input
                    placeholder="请输入验证码"
                    v-model="Code"
                    :maxlength='4'
                    class="Verification-Code"
                >
                </el-input>
                <button @click="getCodeChange()">{{getCode}}</button>
            </div>
            <!-- 隐私条款 -->
            <div class="Privacy-Policy">
                <input type="checkbox" name="" id="" :checked="selectChecked" @click="selectChecked= !selectChecked">
                阅读并同意 <router-link to="userAgreement">《用户协议》</router-link>和<router-link to="privacyPolicy">《隐私政策》</router-link>
            </div>
            <div class="login-btn">
                <button @click="login()">登录</button>
            </div>
        </div>
        <div class="model-box" v-if="loadingShow"></div>
        <van-loading class="loading-box" v-if="loadingShow" type="spinner" />
    </div>
</template>
<script>
import qs from 'qs'
import { Notify } from 'vant';
import { Loading } from 'vant';
import Vue from 'vue';
Vue.use(Loading);
export default {
    data(){
        return{
            name:'',
            tel:'',
            Code:'',
            codeNum:'',
            getCode:'获取验证码',
            tim1Flag:true,
            timer1:null,
            path:'',
            selectChecked:false,
            loadingShow:false
        }
    },
    mounted(){
         let that  = this;
        var query=this.$route.query;
        if(query.path){
            that.path = query.path;
        }else{
            that.$router.push({path:'/index'});
        }
    },
    methods:{
        //返回上一页
        goBack(){
            console.log('返回上一页');
            this.$router.go(-1);
        },

        //发送短信验证码
        getCodeChange(){
            let that = this;
            if(that.tim1Flag){
                if(that.tel == ''){
                    Notify({ type: 'warning', message: '请输入手机号' });
                    return
                }else{
                    var num = 60;
                    var timer1 = setInterval(() => {
                        num --;
                        if(num <= 0){
                            clearInterval(timer1);
                            that.getCode = '重新获取验证码';
                            that.tim1Flag = true;
                        }else{
                            that.tim1Flag = false;
                            that.getCode = num+'s';
                        }
                    }, 1000);
                    that.codeNum = Math.floor(Math.random()*(9999-1))+1;
                    let promise = {
                        mobile: that.tel,
                        code:that.codeNum
                    };
                    that.axios.post('sendsms', qs.stringify(promise))
                    .then(function (res) {
                        console.log(res);
                        if(res.status == 200 ){
                            if(res.data && res.data.s){
                                console.log('短信验证码已发送');
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
                };
            };
        },

        //登录
        login(){
            let that  = this;
            if(!that.selectChecked){
                Notify({ type: 'warning', message: '请勾选阅读协议' });
                return
            }else if(that.name ==''){
                Notify({ type: 'warning', message: '请输入姓名' });
                return
            }else if(that.tel ==''){
                Notify({ type: 'warning', message: '请输入手机号' });
                return
            }else if(!that.PhoneVerify(that.tel)){
                Notify({ type: 'warning', message: '请输入正确的手机号' });
                return
            }else if(that.codeNum == ''){
                Notify({ type: 'warning', message: '请获取短信验证码' });
                return
            }else if(that.Code == ''){
                Notify({ type: 'warning', message: '请输入短信验证码' });
                return
            }else if(that.Code == that.codeNum  && that.codeNum !=''){
                let promise = {
                    username:that.name.trim(),
                    mobile:that.tel.trim(),
                };
                that.loadingShow = true;
                that.axios.post('login', qs.stringify(promise))
                .then(function (res) {
                    console.log(res);
                    if(res.status == 200 ){
                        if(res.data && res.data.s){
                            localStorage.setItem('tel',that.tel);
                            that.$router.push({path:'/productDetail'});

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
                });
            }else{
                Notify({ type: 'warning', message: '请输入正确的验证码' });
                return
            }
        },

        //手机号检验
        PhoneVerify(str){
             var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if (reg.test(str)) {
                return  true;
            }else{
                return false;
            }
        },

    },

    beforeDestroy() {
        clearInterval(this.timer1);        
        this.timer1 = null;
    },
}
</script>
<style >
.loginPage{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.loginPage header{
    width: 100%;
    height: 115px;
    background: #4eb7ba;
    line-height: 115px;
    color: #fff;
    text-align: center;
    
}
.loginPage header p{
    font-size: 46px;
    padding-right: 60px;
    box-sizing: border-box;
    color: #fff;
}
.loginPage header span{
    float: left;
    font-size: 60px;
    margin-top: 25px;
    font-weight: 900;
    margin-left: 30px;
}

/* logo */
.loginPage .logo-box {
    width: 100%;
    height: auto;
}
.loginPage .logo-box img{
    width: 377px;
    height: 159px;
    margin-top: 65px;
}

/* 登录信息 */
.loginPage .login-information{
    width: 100%;
    margin-top: 109px;
    
}
.loginPage .login-information .name,.loginPage .login-information .tel{
    width: 87.3%;
    height: 92px;
}
.loginPage .login-information .name input,.loginPage .login-information .tel input{
    width: 100%;
    height: 80px;
    border: 4px solid rgb(78, 183, 186);
    border-radius: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 30px;
}
.loginPage .login-information .name input::-webkit-input-placeholder , .loginPage .login-information .tel input::-webkit-input-placeholder{
    color: rgb(78, 183, 186);
}
.loginPage .login-information .name input::-moz-input-placeholder, .loginPage .login-information .tel input::-moz-input-placeholder{
    color: rgb(78, 183, 186)
}
.loginPage .login-information .name input::-ms-input-placeholder, .loginPage .login-information .tel input::-ms-input-placeholder {
    color: rgb(78, 183, 186)
}
.loginPage .login-information .tel{
    margin-top: 60px;
}
.loginPage .login-information .Verification-Code-box{
    margin-top: 60px;
    height: 80px;
    width: 100%;
}
.loginPage .login-information .Verification-Code{
    width: 405px;
    height: 80px;
    float: left;
    margin-left: 48px;
    height: auto;
}   
.loginPage .login-information .Verification-Code input{
    width: 100%;
    height: 80px;
    border: 4px solid rgb(78, 183, 186);
    border-radius: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 30px;
}
.loginPage .login-information .Verification-Code input::-webkit-input-placeholder{
    color: rgb(78, 183, 186)
}
.loginPage .login-information .Verification-Code input::-ms-input-placeholder{
    color: rgb(78, 183, 186)
}
.loginPage .login-information .Verification-Code input::-moz-input-placeholder{
    color: rgb(78, 183, 186)
}
.loginPage .login-information .Verification-Code-box button{
    min-width: 31.4%;
    padding: 0 40px;
    height: 80px;
    font-size: 26px;
    color: #fff;
    background: rgb(78, 183, 186);
    border-radius: 40px;
    border: none;
    box-sizing: border-box;
}
.loginPage  .login-btn button{
    width: 288px;
    height: 90px;
    text-align: center;
    font-size: 0.373333rem;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: rgb(78, 183, 186);
    border: 0.08rem solid #ffffff;
    border-radius: 90px;
    box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999;
    margin-top: 0.773333rem;
    font-size: 36px;
    margin-top: 100px;
}
.loginPage  .Privacy-Policy{
    margin-top: 100px;
}
.loginPage  .Privacy-Policy {
    font-size: 28px;
}
.loginPage  .Privacy-Policy input{
    vertical-align: middle;
    border: 1px solid #4eb7ba;
}
.loginPage  .Privacy-Policy a{
    color: blue;
    font-size: 28px;
}
.model-box{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}
.loginPage .loading-box{
    width: 100%;
    position: absolute;
    top: 45%;
    left: 0;
    font-size: 10vw;
    z-index: 1000;
}
.loginPage .loading-box .van-loading__spinner{
    height: 10vw;
}
.loginPage .loading-box  .van-loading__spinner--spinner i::before{
    width: 1vw;
}
</style>