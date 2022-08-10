<template>
    <div class="resultPage">
        <div class="resultPage-box">
            <header>
                <p>发现肺结节，担心是肺癌？</p>   
            </header>
            <div class="result-type">
                测试结果：
            </div>
            <div class="title" v-for="item in resultArr" :key="item.index">
                <button>{{item.type}}</button>
            </div>
            <div class="type-box">
                <img src="@/assets/img/result/type1.png"  v-if="type==1 || type==2" alt="" srcset="">
                <img src="@/assets/img/result/type2.png"  v-if="type==3 " alt="" srcset="">
                <img src="@/assets/img/result/type3.png"  v-if="type==5 || type==4" alt="" srcset=""> 
            </div>
            <div class="content-list" v-for="item in resultArr" :key="item.index">
                <div class="title">{{item.title}}</div>
                <p>{{item.tip}}</p>
                <p v-html="item.content"></p>
            </div>

            <div class="reference-box">
                <div class="reference-title">参考文献：</div>
                <p>1、根据中国肺结节专家共识指南，建议将我国肺癌高危人群定义为年龄≥40岁且具有以下任一危险因素者：（1）吸烟≥ 20包年（或400年支），或曾经吸烟≥20包年（或400 年支），戒烟时间 &lt;15 年；（2）有环境或高危职业暴露史（如石棉、铍、铀、氡等接触者（3）合并慢阻 肺、弥漫性肺纤维化或既往有肺结核病史者；（4）既往罹患恶性肿瘤或有肺癌家族史者。</p>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            resultArr:[],
            resultArr1:[{
                type:'潜在风险型',
                // title:'亚型一：微小结节，定期随访',
                // tip:'您的肺结节属于微小结节。',
                content:'您的肺结节属于微小结节，根据《肺结节诊治中国专家共识（2018年版）》：结节直径≤4 mm者，且存在肺癌危险因素，应在12个月重新评估，如果没有变化则转为常规年度检查。请遵医嘱定期随访，密切关注结节变化；如结节直径>5mm，应遵医嘱缩短CT随访周期，及时完善相关检查。如有任何问题，可随时联系网站专业人员，为您提供帮助和指导。'
            }],

            resultArr2:[{
                type:'潜在风险型',
                // title:'亚型二：无高危因素',
                // tip:'您的肺结节属于小结节。',
                content:'您的肺结节属于小结节，虽然您并无《肺结节诊治中国专家共识（2018年版）》上常见的肺癌高危因素，但仍存在癌变风险。建议积极随访并及时完善相关检查。如有任何问题，可随时联系网站专业人员，为您提供帮助和指导。'
            }],

            resultArr3:[{//小于40岁
                type:'小结节，存在肺癌高风险因素',
                title:'作为正在改变世界的逐梦人',
                // tip:'您的肺结节属于小结节。',
                content:'建议您及时就诊并进一步完善相关检查，密切关注结节变化，避免延误诊断或过度治疗。请联系专属健管师，为您提供丽菲清<sup>®</sup>检测肺结节智能管理方案。用科技消除隐患，将健康掌握在自己手中，尽享精彩人生！'
            }],

            resultArr4:[{//40-60岁
                type:'小结节，存在肺癌高风险因素',
                title:'身为社会的中流砥柱、家中的主心骨，您的健康就是全家幸福安心的保障。',
                // tip:'您的肺结节属于小结节。',
                content:'建议您及时就诊并进一步完善相关检查，密切关注结节变化，避免延误诊断或过度治疗。请联系专属健管师，为您提供丽菲清<sup>®</sup>检测肺结节智能管理方案。用科技控制风险，将健康掌握在自己手中，护航全家安心！'
            }],

            resultArr5:[{//60岁以上
                type:'小结节，存在肺癌高风险因素',
                title:'家有一老如有一宝，您的身体健康，牵动着全家的心',
                // tip:'家有一老如有一宝，您的身体健康，牵动着全家的心。',
                content:'建议您及时就诊并进一步完善相关检查，密切关注结节变化，避免延误诊断或过度治疗。请联系专属健管师，为您提供丽菲清<sup>®</sup>检测肺结节智能管理方案。用科技消除焦虑，将健康掌握手中，使您安心全家放心！'
            }],
            type:''
        }
    },
    mounted(){
        var query=this.$route.query;
        let key = query.id;
        let that  = this;
        this.type = query.id;
        switch (key) {
            case '1':
                that.resultArr = that.resultArr1; 
                that.resurtSubmit(that.resultArr);  
                break;
            case '2':
                that.resultArr = that.resultArr2;
                that.resurtSubmit(that.resultArr);
                break;
            case '3':
                that.resultArr = that.resultArr3;
                that.resurtSubmit(that.resultArr);
                break;
            case '4':
                that.resultArr = that.resultArr4;
                that.resurtSubmit(that.resultArr);
                break;
            case '5':
                that.resultArr = that.resultArr5;
                that.resurtSubmit(that.resultArr);
                break;
            default:
                break;
        };
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        //上传提交结果
        resurtSubmit(row){
            console.log(row);
            let that  = this;
            let mobile = localStorage.getItem('tel');
            var promise = {}
            row.forEach(element => {
                promise = {
                    mobile:mobile,
                    leixing:element.type,
                    result:element.content,
                    q1:element.title,
                    q2:element.tip,
                    q3:'',
                    q4:'',
                };
            });
            that.axios.post('zicepost', qs.stringify(promise))
            .then(function (res) {
                console.log(res);
                if(res.status == 200 ){
                    if(res.data && res.data.data){
                        console.log('提交成功!');
                    }
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
.resultPage{
    width: 100%;
    height: 100%;
    padding: 18px;
    box-sizing: border-box;
}
.resultPage header{
    width: 100%;
    height: 114px;
    background: #4eb7ba;
    line-height: 114px;
    color: #fff;
    text-align: center;
    
}
.resultPage header p{
    font-size: 45px;
    text-align: center;
    box-sizing: border-box;
    color: #fff;
}
.resultPage header span{
    float: left;
    font-size: 42px;
    margin-top: 18px;
    font-weight: 900;
    margin-left: 30px;
}
.resultPage-box{
    min-height: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    background: url('../assets/img/page3/QS-bg.png') center no-repeat;
    background-size: 100% 100%;
    background-color: #e4f2f2;
    padding-bottom: 20px;
}
.resultPage .result-type{
    font-size: 36px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #ffffff;
    height: 80px;
    line-height: 80px;
    background-image: linear-gradient(to right, #4eb7ba , #fff);
    padding-left: 27px;
    box-sizing: border-box;
    margin-top: 48px;
}
.resultPage  .title button{
    min-width: 563px;
    height: 108px;
    padding: 0 20px;
    box-sizing: border-box;
    text-align: center;
    font-size: 45px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 10px solid #ffffff;
    border-radius: 90px;
    box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999;
    margin-top: 59px;
}
.resultPage .content-list{
    font-weight: 400;
    text-align: left;
    color: #221e1f;
    line-height: 54px;
    letter-spacing: -1px;
    padding: 0 27px;
    box-sizing: border-box;
    margin-top: 40px;
}
.resultPage .content-list .title{
    font-size: 36px;
    font-weight: 700;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    text-indent: 48px;
    color: #221e1f;
}
.resultPage .content-list p{
    text-indent: 48px;
    font-size: 34px;
    color: #221e1f;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    margin-top: 30px;
}
.resultPage .reference-box{
    text-align: left;
    padding: 0 26px;
    box-sizing: border-box;
    margin-top: 141px;
}
.resultPage .reference-box p, .resultPage .reference-box div{
    font-size: 20px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    font-weight: 400;
    color: #6e6e6e;
}
.resultPage .type-box{
    width: 48%;
    margin: 0 auto;
    text-align: center;
    margin-top: 42px;
    position: relative;
}
.resultPage .type-box img{
    width: 100%;
}
.resultPage .type-box .type1{
    position: absolute;
    top: 10vw;
    left: 12vw;
    width: 0;
    height: 0;
    border-left: 2.3vw solid transparent;
    border-right: 2.3vw solid transparent;
    border-bottom: 2.3vw solid #e4f3f3;
    transform: rotate(-38deg);
}
.resultPage .type-box .type2{
    position: absolute;
    top: 10vw;
    left: 29vw;
    width: 0;
    height: 0;
    border-left: 2.3vw solid transparent;
    border-right: 2.3vw solid transparent;
    border-bottom: 2.3vw solid #e4f3f3;
    transform: rotate(40deg); 
}
.resultPage .type-box .type3{
    position: absolute;
    top: 17vw;
    left: 34vw;
    width: 0;
    height: 0;
    border-left: 2.3vw solid transparent;
    border-right: 2.3vw solid transparent;
    border-bottom: 2.3vw solid #e4f3f3;
    transform: rotate(69deg);
}
</style>
