<template>
    <div class="ImproveUserInformationPage">
        <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
            <p style="color:#fff">完善个人信息</p>   
        </header>
        
        <!-- 患者信息 -->
        <div class="Patient-information">
            <h4><span></span>患者信息<span></span></h4>
            <div class="list-information">
                <label for="patientName">患者姓名</label>
                <input type="text"  maxlength="10" id="patientName" v-model="userMsg.hzusername" placeholder="请输入姓名">
            </div>
            <div class="list-information">
                <label for="patientTel">患者手机号</label>
                <input type="text"  maxlength="11" id="patientTel" v-model="userMsg.hzmobile" placeholder="请输入手机号">
            </div>

            <!-- 收件人信息 -->
            <div class="addressee-information">
                <h4><span></span>收件人信息<span></span></h4>
                <div class="list-information">
                    <label for="addresseeName">姓名</label>
                    <input type="text"  maxlength="10" v-model="userMsg.sjrusername" placeholder="请输入姓名">
                </div>
                <!-- <div class="list-information">
                    <label for="addresseeName">省/市/区</label>
                    <input type="text" v-model="cities"  placeholder="请输入地区">
                </div> -->
                <div class="list-information">
                    <label for="addresseeName">地址</label>
                    <input type="text" v-model="userMsg.sjrarea" placeholder="请输入地址">
                </div>
                <div class="list-information">
                    <label for="addresseeName">手机号</label>
                    <input type="text" maxlength="11" v-model="userMsg.sjrmobile" placeholder="请输入手机号">
                </div>
            </div>
            <div class="login-btn">
                <button @click="submintBtn()">提交</button>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import { Notify } from 'vant';
export default {
    data(){
        return{
            userMsg:{
                mobile:'',
                hzusername:'',
                hzmobile:'',
                hzaddress:'',
                sjrusername:'',
                sjrarea:'',
                sjrmobile:'',
                orderkey:'' 
            },
            cities:''
        }
    },
    mounted(){
        var query=this.$route.query;
        if(query.orderkey){
            this.userMsg.orderkey = query.orderkey;
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        //提交信息
        submintBtn(){
            let that = this;
            that.userMsg.mobile = localStorage.getItem('tel');
            if(that.userMsg.mobile && that.userMsg.mobile !=''){
                if(that.userMsg.hzusername ==''){
                    Notify({ type: 'warning', message: '请输入患者姓名' });
                    return
                }else if(that.userMsg.hzmobile ==''){
                    Notify({ type: 'warning', message: '请输入患者手机号' });
                    return
                }else if(!that.PhoneVerify(that.userMsg.hzmobile)){
                    Notify({ type: 'warning', message: '请输入正确的手机号' });
                    return
                }else if(that.userMsg.sjrusername ==''){
                    Notify({ type: 'warning', message: '请输入收件人姓名' });
                    return
                }else if(that.userMsg.sjrarea ==''){
                    Notify({ type: 'warning', message: '请输入收件人地址' });
                    return
                }else if(that.userMsg.sjrmobile ==''){
                    Notify({ type: 'warning', message: '请输入收件人手机号' });
                    return
                }else if(!that.PhoneVerify(that.userMsg.sjrmobile)){
                    Notify({ type: 'warning', message: '请输入正确的手机号' });
                    return
                }else{
                    that.axios.post('updateorderinfo',qs.stringify(that.userMsg))
                    .then(function (res) {
                        console.log(res.data.data);
                        if(res.status == 200 ){
                            window.alert = function (name) {
                                var iframe = document.createElement("IFRAME");
                                iframe.style.display = "none";
                                iframe.setAttribute("src", "data:text/plain,");
                                document.documentElement.appendChild(iframe);
                                window.frames[0].window.alert(name);
                                iframe.parentNode.removeChild(iframe);
                            };
                            alert("提交成功!");
                            that.$router.go(-1);
                        }else{
                            that.$message({
                            message: '服务异常请稍后重试！',
                            type: 'warning'
                            });
                        }
                    });
                }
            }else{  
                 Dialog.confirm({
                    title: '提示',
                    message: '需要您进行登录',
                }).then(() => {
                    this.$router.push({path:'/login',query:{path:'improve'}});
                }).catch(() => {
                });
            }
        },
        //手机号检验
        PhoneVerify(str){
            var reg = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/;
            if (reg.test(str)) {
                return  true;
            }else{
                return false;
            }
        },
    }
}
</script>
<style >
.ImproveUserInformationPage header{
    width: 100%;
    height: 115px;
    background: #4eb7ba;
    line-height: 115px;
    color: #fff;
    text-align: center;
    
}
.ImproveUserInformationPage header p{
    font-size: 46px;
}
.ImproveUserInformationPage header span{
    float: left;
    font-size: 60px;
    margin-top: 25px;
    font-weight: 900;
    margin-left: 30px;
}

/* 患者信息 */
.ImproveUserInformationPage .Patient-information{
    width: 100%;
}
.ImproveUserInformationPage  .Patient-information h4{
    font-size: 34px;
    color: #4eb7ba;
}
.ImproveUserInformationPage  .Patient-information h4:nth-of-type(1){
    margin-top: 49px;
}
.ImproveUserInformationPage  .addressee-information h4:nth-of-type(1){
    margin-top: 100px;
}
.ImproveUserInformationPage  .Patient-information h4 span{
    width: 10px;
    height: 10px;
    border-radius: 100%;
    display: inline-block;
    background: #4eb7ba;
    margin-bottom: 10px;
}
.ImproveUserInformationPage .Patient-information h4 span:nth-of-type(1){
    margin-right: 10px;
}
.ImproveUserInformationPage .Patient-information h4 span:nth-of-type(2){
    margin-left: 10px;
}
.ImproveUserInformationPage .Patient-information .list-information {
    text-align: right;
    padding-right: 60px;
    box-sizing: border-box;
}
.ImproveUserInformationPage .Patient-information .list-information{
    font-size: 30px;
    color: #221e1f;
}
.ImproveUserInformationPage .Patient-information .list-information input{
    width: 450px;
    height: 72px;
    border: 0.03rem solid #221e1f;
    border-radius: 40px;
    padding-left: 46px;
    margin-top: 34px;
    margin-left: 10px;
    font-size: 30px;
}
.ImproveUserInformationPage .login-btn button{
    width: 288px;
    height: 90px;
    text-align: center;
    font-size: 34px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 0.1rem solid #ffffff;
    border-radius: 90px;
    box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999;
    margin-top: 0.773333rem;
    font-size: 36px;
    margin-top: 100px;
}
</style>