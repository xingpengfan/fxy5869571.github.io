<template>
  <div class="header">
    <div class="header-content">
      <div class="avatar">
        <img :src="seller.avatar" width="80" height="80">
      </div>
      <div class="content">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <span class="follow">关注：{{seller.follow}}</span>
          <span class="note">帖子：{{seller.note}}</span>
        </div>
        <div class="button-wrapper">
          <span class="button border-1px">改变建阳</span>
          <span class="button2" @click="sign">{{resignin}}</span>
        </div>
      </div>
    </div>
    <div class="background">
      <img :src="seller.price" width="100%" height="100%">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        signin: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      resignin: function () {
        if (!this.signin) {
          return '签到';
        }
        return '已签到';
      }
    },
    methods: {
      sign: function () {
        this.signin = true;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    overflow: hidden
    width: 100%
    color: #fff
    background: rgba(7, 17, 27, 0.4)
    .header-content
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        .img
          border-radius: 2px
      .content
        display: inline-block
        vertical-align: top
        margin-left: 8px
      .title
        font-size: 16px
        font-weight: 700
        margin-bottom: 4px
      .desc
        display: inline-block
        vertical-align: top
        margin-bottom: 4px
        .follow
          display: inline-block
          vertical-align: top
          font-size: 10px
        .note
          display: inline-block
          vertical-align: top
          margin-left: 4px
          font-size: 10px
      .button-wrapper
        display: block
        vertical-align: top
        .button
          display: inline-block
          vertical-align: top
          padding: 4px 12px
          font-size: 5px
          line-height: 10px
          border-1px(rgba(7,17,27,0.1))
          text-align: center
          background: rgba(0, 0, 0, 0.2)
        .button2
          display: inline-block
          vertical-align: top
          margin-left: 8px
          padding: 4px 12px
          font-size: 10px
          line-height: 10px
          text-align: center
          background: rgba(0, 0, 0, 0.2)
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
</style>
