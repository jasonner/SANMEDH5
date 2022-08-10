<template>
    <div class="feedbackPage">
        <div class="content-list-box">
              <el-carousel  arrow='always' :interval="5000"  @change="onChange" >
                <el-carousel-item>
                    <div class="list">
                        <img src="@/assets/img/userFeedback/user5.jpg" alt="" srcset="" :class="{active:showDetail}">
                        <div>（图文无关）</div>
                        <div class="text-content" v-show="!showDetail">
                          <h3> 陈女士&nbsp;&nbsp; 40岁&nbsp;&nbsp;儿子6岁&nbsp;&nbsp;无吸烟史</h3>
                           <p>“幸好遇到CAC检测，在肺癌早期及时发现，否则后果不堪设想。”</p>
                        </div>
                    </div>
                </el-carousel-item>
                <el-carousel-item>
                    <div class="list">
                        <img src="@/assets/img/userFeedback/user4.jpg" alt="" srcset="" :class="{active:showDetail}">
                         <div>（图文无关）</div>
                        <div class="text-content" v-show="!showDetail">
                            <h3>蔡先生&nbsp;&nbsp; 43岁 &nbsp;&nbsp; 女儿8岁&nbsp;&nbsp; 烟龄5年</h3>
                            <p>"即使99%的肺结节都是良性，我也不能去赌，作为家庭的中流砥柱，中年人没有失手的资格。"</p>
                        </div>
                    </div>
                </el-carousel-item>
                <el-carousel-item>
                   <div class="list">
                        <img src="@/assets/img/userFeedback/user6.jpg" alt="" srcset="" :class="{active:showDetail}">
                        <div>（图文无关）</div>
                        <div class="text-content" v-show="!showDetail">
                           <h3>王女士&nbsp;&nbsp;68岁&nbsp;&nbsp;退休&nbsp;&nbsp; 无吸烟史</h3>
                            <p>“孩子和老伴都说：我的健康是他们最好的礼物。”</p>
                        </div>
                    </div>
                </el-carousel-item>
             </el-carousel>
            
            <div class="lookDetail">
                <button @click="lookDetail()"> 
                    <span v-if="!showDetail">查看详情</span>
                    <span v-if="showDetail">收起详情</span>
                </button>
            </div>

            <div v-if="showDetail">
                <div v-for="(item,index) in listData" :key="index" class="expert-text-list">
                    <div class="content-detail" v-if="index == current">
                        <div>
                            <span></span>
                            <p v-html="item.text1"></p>
                        </div>
                        <div>
                            <span></span>
                            <p v-html="item.text2"></p>
                        </div>
                        <div>
                            <span></span>
                            <p v-html="item.text3"></p>
                        </div>
                        <div>
                            <span></span>
                            <p v-html="item.text4"></p>
                        </div>
                        <div v-if="item.text5">
                            <span></span>
                            <p >{{item.text5}}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <!-- 流程图 -->
        <div class="Detection-flow-chart">
            <img :src="imgSrc" alt="" srcset="">
        </div>

    </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem)
export default {
   name:'',
   data(){
       return{
           showDetail:false,
           current:0,
           listData:[{
               text1:'2020年中体检，左肺下叶8.5 x 11.1mm混合磨玻璃结节： 肿瘤标志物及真菌、结核等检验结果提示结节为阴性。',
               text2:'2020年底选择丽菲清<sup>®</sup>“肺”常无忧套餐，综合分析结果提示肺部结节恶性风险高，胸外科专家结合经验，建议手术切除治疗。',
               text3:'术后组织病理诊断：小细胞癌，切缘未见癌累及，与“肺”常无忧检测结果一致。',
               text4:'主管医生建议：后续定期随访，无需额外治疗。',
           },{
               text1:'2017年初发现左肺中叶6.3 x 4.5mm磨玻璃结节。',
               text2:'2020年8月随访时结节增长至8.6 x 7.8mm，CT提示肺结节密度增高。',
               text3:'2020年9月选择丽菲清<sup>®</sup>“肺”常无忧套餐，结果提示结节为低风险。',
               text4:'遵医嘱随访至今，结节无进一步变化。',
           },{
               text1:'2019年末，受凉发生咳嗽、咳痰,随后并伴有发热。CT显示右肺上叶8.4 x 7.1mm实性结节，医生考虑肺炎可能，建议先进行抗炎治疗。',
               text2:'经过一个月的抗炎治疗后，症状有减轻但影像无改变。',
               text3:'通过“肺”常无忧套餐进行综合分析，结果提示肺结节恶性风险极高。',
               text4:'2020年5月去医院进行了肺结节切除手术，病理结果为微浸润腺癌，切端阴性，未见淋巴结转移。与“肺”常无忧套餐结果一致。',
               text5:'随访至今，无复发迹象。'
           }],
           imgSrc:''
       }
   },
   mounted(){
       this.getProductDetailList('productD2','h5');//h5端使用者检测流程图
   },
   methods:{
        lookDetail:function(){
            this.showDetail = !this.showDetail
        },
        onChange(index) {
            this.current = index;
            console.log(index)
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
        PreviousStep(){
            this.$refs.nop.prev();
        },
        nextStep(){
            this.$refs.nop.next();
        },

   }
}
</script>
<style >
.el-carousel__container{
    height: 9rem !important;
}
</style>
<style scoped>
.feedbackPage{
    width: 100%;
}
.feedbackPage .content-list-box{
    width: 100%;
    position: relative;
    z-index: 10;
}
.feedbackPage .content-list-box .arror-left{
    position: absolute;
    left: 5%;
    top: 15vh;
    font-size: 45px;
    z-index: 1000;
}
.feedbackPage .content-list-box .arror-right{
    position: absolute;
    right: 5%;
    top: 15vh;
    font-size: 45px;
}
.feedbackPage .list{
    width: 100%;
    margin-top: 55px;
    position: relative;
}
.feedbackPage .list img{
    width: 571px;
    height: 335px;
    background-color: #fff;
    opacity: 0.3;
}
.feedbackPage .list  .active{
    opacity: 1;
}
.feedbackPage .text-content{
    padding: 0 116px;
    box-sizing: border-box;
    text-indent:48px;
    margin-top: 10px;
}
.feedbackPage .text-content p{
    font-size: 4vw;
    font-family: SourceHanSansCN, SourceHanSansCN-Light;
    font-weight: 300;
    text-align: left;
    color: #231815;
    line-height: 1.5;
    letter-spacing: 0px;
}
.feedbackPage .text-content h3{
    font-size: 3.5vw;
    font-family: SourceHanSansCN, SourceHanSansCN-Light;
    text-align: left;
    margin-bottom: 1vw;
}
.feedbackPage .lookDetail button{
    width: 212px;
    height: 90px;
    margin: 0 auto;
    font-size: 34px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    font-weight: 400;
    text-align: center;
    color: #4eb7ba;
    line-height: 90px;
    letter-spacing: 3px;
    border: none;
    border-radius: 20px;
    background-image: linear-gradient(#fff, #b4d3d4);
    margin-top: 41px;
}
.feedbackPage .content-detail{
    padding: 0 4vw;
    box-sizing: border-box;
    /* text-indent:42px; */
} 
.feedbackPage .content-detail p:nth-of-type(1){
    margin-top: 40px;
}
.feedbackPage .content-detail div{
    position: relative;
}
.feedbackPage .content-detail p{
    font-size:3.8vw;
    font-family: SourceHanSansCN, SourceHanSansCN-Light;
    font-weight: 300;
    text-align: left;
    color: #231815;
    line-height: 1.5;
    margin-top: 20px;
    margin-left: 4vw;
}
.content-detail span{
    position: absolute;
    width: 1.5vw;
    height: 1.5vw;
    background: #4eb7ba;
    left: 1vw;
    top: 2vw;
    border-radius: 100%;
}
/* 流程图 */
.Detection-flow-chart{
    width: 100%;
}
.Detection-flow-chart img{
    width: 100%;
    margin-top: 71px;
    padding: 0 5px;
    box-sizing: border-box;
}
</style>