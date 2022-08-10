<template>
    <div class="manualPage">
        <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
            <p style="color:#fff">健康讲堂</p>   
        </header>
        <div class="list" v-for="item in tableData" :key="item.id">
            <div class="left"  @click="lookPDF(item)">
                <img :src="item.poster"  v-if="!item.type" alt="" srcset="">
                <video class="video-show" :src="item.poster" v-if="!item.type"></video>
                <img :src="item.poster"  v-if="!item.type" alt="" srcset="">
                <h4 v-if="item.type">{{item.title}}</h4>
                <div class="arr"  v-if="!item.type"><span></span></div>
            </div>
            <div class="right">
                <button @click="lookPDF(item)" v-if="item.type">查看资料</button>
                <h4 v-if="!item.type">{{item.title}}</h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'manual',
    data(){
        return{
            tableData:[]
        }
    },
    mounted(){
        this.getInitList();
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },

        getInitList(){
            let that = this;
            that.axios.get('/huanjiaolist')
            .then(function (res) {
                if(res.status == 200){
                    if(res.data && res.data.data){
                        res.data.data.forEach(element => {
                            if(element.url.indexOf('.pdf') !=-1){
                                element.type = true;
                            }else{
                                element.type = false;
                            }
                        });
                        that.tableData = res.data.data;
                        console.log(that.tableData)
                    }else{
                    that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message({
                        message: '服务异常请稍后重试！',
                        type: 'warning'
                    });
                }
            })
        },
        
        //查看科普知识
        lookPDF(row){
            console.log(row);
            window.location.href = row.url;
        },
    }
}
</script>
<style scoped>
.manualPage{
    width: 100%;
    overflow:scroll;
    height: 100%;
    background: url('../assets/img/page3/QS-bg.png') center no-repeat;
    background-size: 100% 100%;
    background-color: #e4f2f2;
    padding-bottom: 100px;
}
.manualPage header{
    width: 100%;
    height: 115px;
    background: #4eb7ba;
    line-height: 115px;
    color: #fff;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}
.manualPage header p{
    font-size: 46px;
    padding-right: 60px;
    box-sizing: border-box;
}
.manualPage header span{
    float: left;
    font-size: 60px;
    margin-top: 28px;
    font-weight: 900;
    margin-left: 30px;
}
.manualPage .list h4{
    font-size: 30px;
    color: #221e1f;
    margin-top: 20px;
}
.manualPage .list p{
    font-size: 26px;
    color: #221e1f;
    margin-top: 40px;
}
.manualPage .list:nth-of-type(1){
    margin-top: 245px;
}
.manualPage .list{
    display:grid;
    grid-template-columns: 60% 40%;
    width: 100%;
    padding: 0px 30px;
    box-sizing: border-box;
    margin-top: 100px;
   
}
.manualPage .list div{
    flex: 1;
    text-align: center;
   
}
.manualPage .list .left{
    vertical-align: middle;
    text-align: left;
    position: relative;
}
.manualPage .list .left h4{
    width: 100%;
    height: 18vw;
    line-height: 1.5;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    color: #6e6e6e;
    -webkit-box-orient: vertical;
}
.manualPage .list .right h4{
    font-size: 28px;
    color: #6e6e6e;
    text-align: left;
}
.manualPage .list .left img{
    width: 80%;
}
.manualPage .list div{
    flex: 1;
}
.manualPage .list .right button{
    width: 207px;
    height: 60px;
    line-height: 50px;
    text-align: center;
    font-size: 28px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 2px;
    background: #4eb7ba;
    border: 5px solid #f6fffe;
    border: 5px solid #ffffff;
    border-radius: 20px;
    box-shadow: 5px 5px 9px 1px #012e1b; 
    margin-top: 40px;
}
.manualPage .list .left .arr{
    width: 15vw;
    height: 15vw;
    border-radius: 100%;
    position: absolute;
    top: 3vw;
    left: 10vw;
    border: 10px solid #fff;
}
.manualPage .list .left .arr span{
    position: absolute;
    top: 5vw;
    left: 3vw;
    width: 0;
    height: 0;
    border-left: 6vw solid transparent;
    border-right: 6vw solid transparent;
    border-bottom: 6vw solid #fff;
    transform: rotate(90deg);
}
.video-show{
    width: 37vw;
    height: 30vw;
    margin-top: -3vw;
}
</style>