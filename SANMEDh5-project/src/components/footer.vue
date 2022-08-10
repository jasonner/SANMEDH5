<template>
    <div class="join-subscription-box">
        <div class="join-subscription">
           <a href="http://www.mhn24.com/">友情链接&nbsp;:&nbsp;&nbsp; <img src="@/assets/img/userFeedback/logo.png" alt="" srcset=""> 中国肺癌防治联盟官网</a>
        </div>
    </div>
</template>
<script>
export default {
    name:'',
}
</script>
<style scoped>
     /* 友情链接 */
    .join-subscription-box{
        width: 100%;
        margin-top: 100px;
    }
    .join-subscription{
        width: 100%;
        height: 12vw;
        background: #cce1de;
        text-align: center;
        cursor: pointer;
        line-height: 12vw;
        font-size: 3.5vw;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
    }
    .join-subscription a{
        height: 24px;
        opacity: 1;
        font-size: 4.5vw;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: left;
        color: #6e6e6e;
    }
     .join-subscription a img{
        width: 7vw;
        vertical-align: middle;
        display: inline-block;
        object-fit: fill;
     }
</style>