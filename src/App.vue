<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util';
  import header from 'components/header/header.vue';
  const ERR_OK = 0;
  export default{
    data() {
      return {
        seller: {
          //    获取商家的ID地址
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
//        从本地或者商家ID获取数据
      this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, res.data);
//          this.seller = res.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    /*移动端设计高度为二倍，所以高度为40px*/
    line-height 40px
    /*定义1px的边框*/
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        /*激活样式*/
        &.active
          color: rgb(240, 20, 20)
</style>
