<template>
    <div class="orderPage">
        <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
            <p style="color:#fff">订单查询</p>   
        </header>
        <!-- 订单 -->
        <div class ="order-list" v-for="item in userMsgList" :key="item.id">
            <div class="left"  @click="goOrderDetail(item.orderkey)">
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
                <p v-if="item.status ===999">支付状态:已生成报告</p>
                <p v-if="item.status ===10000">支付状态:已退款</p>
                <p v-if="item.baogaourl && item.baogaourl !=null"><a :href="item.baogaourl" style="color:blue">查看报告</a></p>
            </div>
            <div class="right">
                <p>￥{{item.amount}}</p>
                <button v-if="item.status ===0" @click="goPay()">支付</button>
            </div>
        </div>   
    </div>
</template>
<script>
export default {
    data(){
        return{
            userMsgList:[]
        }
    },
    mounted(){
        this.getMyorders();
    },
    methods:{
        goBack(){
            this.$router.push('/index');
        },
        //获取订单列表
        getMyorders(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            that.axios.get('myorders?mobile='+mobile)
            .then(function (res) {
                console.log(res.data)
                if(res.status == 200 ){
                    that.userMsgList=res.data.data;
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
        },

        //去支付
        goPay(){
            this.$router.push('/productDetail');
        },
        //订单详情
        goOrderDetail(orderkey){
            this.$router.push({path:'/harvestAddress',query:{orderkey:orderkey}});
        }
    }   
}
</script>
<style scoped>
.orderPage{
    width: 100%;
    height: 100%;
    background: #fafcfc;
}
.orderPage header{
    width: 100%;
    height: 115px;
    background: #4eb7ba;
    line-height: 115px;
    color: #fff;
    text-align: center;
    
}
.orderPage header p{
    font-size: 46px;
    margin-left: 28vw;
    float: left;

}
.orderPage header span{
    float: left;
    font-size: 60px;
    margin-top: 25px;
    font-weight: 900;
    margin-left: 30px;
}
.order-list{
    width: 90%;
    margin: 0 auto;
    background: #f1f1f1;
    border-radius: 20px;
    min-height: 4rem;
    padding: 25px;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
}

.order-list .left{
    flex: auto;
    width: 70%;
    text-align: left;
    
}
.order-list div p{
    font-size: 30px;
    color: #221e1f;
}
.order-list .left p:nth-of-type(1){
    width: 90%;
    margin-top: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
   
}
.order-list .left p:nth-of-type(2){
    margin-top: 25px;
}
.order-list .left p:nth-of-type(3){
    margin-top: 25px;
}
.order-list .left p{
    margin-top: 25px;
}
.order-list .right {
   flex: auto;
   width: 30%;
}
.order-list .right p{
    margin-top: 45px;
    font-size: 37px;
    color: #4eb7ba;
}
.order-list .right button{
    font-size: 28px;
    color: #fff;
    padding: 10px 40px;
    background: #4eb7ba;
    border-radius: 40px;
    border: none; 
    margin-top: 20px;
}
</style>