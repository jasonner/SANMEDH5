<template>
    <div class="orderPage">
         <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
            <p style="color:#fff">订单详情</p>   
        </header>
        <!-- 新增地址 -->
        <div class="content-list">
            <div class="icon-left">
                <img src="https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/icon-attr.png" alt="" srcset="">
            </div>
            <div class="text-right" v-for="(item,index) in userMsgList" :key="index">
                <div>
                    <div class="name">姓名:{{item.sjrusername}}</div>
                    <div class="tel">手机号:{{item.mobile}}</div>
                    <div class="address">地址:{{item.sjrarea}}</div>
                </div>
                <div class="addBtn">
                    <button @click="addNewAttr()" v-if="item.sjrarea">修改收货地址</button>
                    <button @click="addNewAttr()" v-else>添加收货地址</button>
                </div>
            </div>
        </div>
        <!-- 订单信息 -->
        <div class="order-list" v-for="(item,index) in userMsgList" :key="index">
             <div class="left">
                <p>订单号:{{item.orderid}}</p>
                <p>购买套餐:丽菲清®（CAC检测）</p>
                <p v-if="item.status ===0">支付状态:待付款</p>
                <p v-if="item.status ===1">支付状态:付款成功</p>
                <p v-if="item.status ===2">支付状态:付款失败</p>
                <p v-if="item.status ===3">支付状态:寄出</p>
                <p v-if="item.status ===4">支付状态:上门</p>
                <p v-if="item.status ===5">支付状态:等待报告</p>
                <p v-if="item.status ===6">支付状态:退款</p>
                <p v-if="item.status ===4910">支付状态:订单已撤销或已退款</p>
                <p>购买金额:￥{{item.amount}}</p>
                <p>购买时间:{{item.inserttime}}</p>
            </div>
            <div class="right">
                <p>￥{{item.amount}}</p>
            </div>
        </div>
        <!-- 购买按钮 -->
        <div class="submitbtn" v-for="item in userMsgList" :key="item.id">
            <button @click="placeOrder()"  v-if="item.status ===1">退款</button>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            userMsgList:[],
            orderkey:''
        }
    },
    mounted(){
        this.getMyorders();
        var query=this.$route.query;
        this.orderkey = query.orderkey;
    },
    methods:{
         //返回上一页
        goBack(){
            this.$router.go(-1);
        },
        //获取订单列表
        getMyorders(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            if(mobile){
                that.axios.get('myorders?mobile='+mobile)
                .then(function (res) {
                    if(res.status == 200 ){
                        res.data.data.forEach(element => {
                            if(element.orderkey == that.orderkey){
                                that.userMsgList.push(element);
                                return
                            }else{
                                return
                            }   
                        });
                    }else{
                        that.$message({
                        message: '服务异常请稍后重试！',
                        type: 'warning'
                        });
                    }
                });
            }else{
                that.$router.push('/login?orderkey='+that.orderkey);
            }
            
        },
        //添加新地址
        addNewAttr(){
            this.$router.push('/improve?orderkey='+this.orderkey);
        },
        //退款
        placeOrder(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            let promise = {
                'mobile':mobile,
                'orderkey':that.orderkey
            }
            that.axios.post('refundorder',qs.stringify(promise))
            .then(function (res) {
                if(res.status == 200 ){
                 console.log('退款成功');
                  that.$alert('您的退款申请已提交后台，工作人员审核通过后，退款将于7个工作日内原路返回。如有问题，请联系：XXXXXX', '', {
                        confirmButtonText: '确定',
                        callback: action => {
                            that.$router.push('/orderList');
                        }
                    });
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
        },
    }
}
</script>
<style scoped>
.orderPage .content-list{
    width: 92%;
    margin: 0 auto;
    background: #e8f4f5;
    border-radius: 40px;
    margin-top: 45px;
    padding: 37px 34px;
    box-sizing: border-box;
}
.orderPage .content-list .icon-left img{
    float: left;
    width: 58px;
    margin-top: 72px;
    margin-right: 42px;
}
.orderPage .content-list  .text-right .name{
    font-size: 34px;
    color: #4eb7ba;
    text-align: left;
}
.orderPage .content-list  .text-right .tel{
    font-size: 30px;
    color: #221e1f;
    margin-top: 22px;
    text-align: left;
}
.orderPage .content-list  .text-right .address{
    font-size: 30px;
    color: #221e1f;
    margin-top: 22px;
    text-align: left;
}
.orderPage .content-list .addBtn button,.submitbtn button{
    min-width: 3.84rem;
    padding: 0 20px;
    box-sizing: border-box;
    height: 1.2rem;
    text-align: center;
    font-size: 30px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 0.1rem solid #ffffff;
    border-radius: 1.2rem;
    box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999;
    font-size: 0.48rem;
    margin-top: 40px;
}
.orderPage  header{
    width: 100%;
    height: 115px;
    background: #4eb7ba;
    line-height: 115px;
    color: #fff;
    text-align: center;
    
}
.orderPage header p{
    font-size: 46px;
    padding-right: 60px;
    box-sizing: border-box;
}
.orderPage header span{
    float: left;
    font-size: 60px;
    margin-top: 25px;
    font-weight: 900;
    margin-left: 30px;
}

/* order-list */
.orderPage .order-list{
    width: 92%;
    margin: 0 auto;
    background: #e8f4f5;
    border-radius: 40px;
    margin-top: 45px;
    padding: 37px 34px;
    box-sizing: border-box;
    display: flex;
}
.orderPage .order-list .left{
    text-align: left;
    flex: 1;
}
.orderPage .order-list .left p{
    color: #221e1f;
    line-height: 1.5;
    font-size: 28px;
}
.orderPage .order-list .right{
    text-align: right;
    padding-right: 10%;
    box-sizing: border-box;
}
.orderPage .order-list .right button{
    padding: 10px 40px;
    text-align: center;
    font-size: 24px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #108492;
    border-radius: 1.2rem;
    border: none;
}
.orderPage .order-list .right p{
    font-size: 30px;
    color: #128492;
    margin-top: 40px;

}
.orderPage .order-list .msg{
    font-size: 30px;
    color: #128492;
}
.orderPage .order-list .msg span{
    line-height: 30px;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #008086;
    border-radius: 100%;
}
.orderPage .order-list .msgCode{
    font-size: 24px;
    color: #707070;
    text-align: left;
    margin-top: 24px;
}   
.orderPage .order-list .msgMoney{
    font-size: 24px;
    color: #707070;
    text-align: left;
    margin-top: 24px;
    display: flex;
} 
.orderPage .order-list .msgMoney div{
    flex: auto;
}
.orderPage .order-list .msgMoney div:nth-of-type(2){
   text-align: center;
   font-size: 28px;
   color: #128492;
}
</style>