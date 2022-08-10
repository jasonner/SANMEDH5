<template>
  <div class="userPage">
    <div class="header-box">
      <div>
        <img src="@/assets/img/page3/icon-test-4.png" alt="" srcset="" />
      </div>
      <div>{{ mobile }}</div>
      <div>
        <router-link :to="{ path: '/improve' }">完善个人信息</router-link>
      </div>
    </div>

    <!-- 信息列表 -->
    <div class="Information-list">
      <!-- <div class="list">
        <div>查看个人信息</div>
        <div><span class="el-icon-arrow-right"></span></div>
      </div> -->
      <div class="list">
        <div>我的订单</div>
        <div @click="lookOrder()">
          查看全部订单<span class="el-icon-arrow-right"></span>
        </div>
      </div>
      <div class="list" @click="lookReport()">
        <div>查看报告</div>
        <div><span class="el-icon-arrow-right"></span></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      mobile: "",
    };
  },
  mounted() {
    this.mobile = localStorage.getItem("tel");
  },
  methods: {
    //获取订单列表
    getMyorders(){
        let that = this;
        let mobile = localStorage.getItem('tel');
        let payState = localStorage.getItem('payState');
        if(payState){
          let promise = {
              mobile:mobile
          }
          that.axios.post('querylastorder',qs.stringify(promise))
          .then(function (res) {
            console.log(res);
              if(res.status == 200 ){
                if(res.data.data.paystatus == '1'){//支付成功
                  that.$router.push('/orderList');
                }else{
                  setTimeout(() => {
                    that.getMyorders();    
                  }, 3000);
                }
              }else{
                  that.$message({
                  message: '服务异常请稍后重试！',
                  type: 'warning'
                  });
              }
          });
        }else{
          this.$router.push("/orderList");
        }
    },
    lookReport() {
      this.$router.push("/reportQuery");
    },
    lookOrder() {
      this.getMyorders();
    },
  },
};
</script>
<style scoped>
.userPage .header-box {
  width: 100%;
  height: 391px;
  opacity: 1;
  background: linear-gradient(123deg, #128492 0%, #204685 100%);
  text-align: center;
}
.userPage .header-box img {
  width: 157px;
  height: 157px;
  margin-top: 78px;
}
.userPage .header-box div:nth-of-type(2) {
  font-size: 28px;
  font-family: SourceHanSansCN, SourceHanSansCN-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  margin-top: 34px;
}
.userPage .header-box div:nth-of-type(3) a {
  font-size: 20px;
  font-family: SourceHanSansCN, SourceHanSansCN-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
}
/* 信息列表 */
.userPage .Information-list {
  width: 100%;
  padding: 0 44px;
  box-sizing: border-box;
  margin-top: 58px;
}
.userPage .Information-list .list {
  width: 100%;
  height: 82px;
  line-height: 82px;
  display: flex;
  border-bottom: 1px solid #909191;
}
.userPage .Information-list .list div {
  flex: 1;
}
.userPage .Information-list .list div:nth-of-type(1) {
  text-align: left;
  font-size: 35px;
  color: #4eb7ba;
}
.userPage .Information-list .list div:nth-of-type(2) {
  text-align: right;
  font-size: 26px;
  color: #707070;
}
.userPage .Information-list .list div:nth-of-type(2) span {
  font-size: 26px;
  font-weight: 700;
}

.userPage .Information-list .list:nth-last-of-type(1) {
  border-bottom: none;
}
</style>