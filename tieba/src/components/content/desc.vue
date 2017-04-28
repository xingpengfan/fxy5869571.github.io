<template>
  <div class="desc-wrapper" v-show="isShow">
    <div class="header border-1px">
      <span class="el-icon-arrow-left" @click="hiddenDesc"></span>
      <span class="title">建阳吧</span>
      <span class="host">楼主</span>
      <span class="el-icon-menu"></span>
    </div>
    <div class="host-wrapper  border-1px">
      <h1 class="title">{{desclist.title}}</h1>
      <div class="inline" >
        <span class="icon">
        <img :src="desclist.icon" width="28" height="28">
      </span>
        <span class="username">{{desclist.username}}</span>
        <el-button type="text" size="mini" class="button">+关注</el-button>
      </div>
      <span class="text">{{desclist.text}}</span>
      <span class="hostname">楼主</span>
      <span class="time">{{desclist.Time}}</span>
    </div>
    <div class="content-wrapper" ref="content-wrapper">
      <ul v-show="desclist.ratings && desclist.ratings.length">
        <li class="contents border-1px" v-for="(rating,index) in desclist.ratings">
        <div class="inline">
          <span class="icon">
            <img :src="rating.icons" width="20" height="20">
          </span>
          <span class="name">{{rating.name}}</span>
        </div>
          <span class="content">{{rating.content}}</span>
          <span class="num">第{{index+1}}楼</span>
          <span class="time">{{rating.time}}</span>
          <span class="el-icon-more" @click="dialogVisible = true"></span>
        </li>
      </ul>
    </div>
    <el-dialog  v-model="dialogVisible" size="tiny"  class="dialog">
      <span @click="dialogVisible = false" class="read border-1px">回复楼层</span>
      <span @click="dialogVisible = false" class="read border-1px">收藏</span>
      <span @click="dialogVisible = false" class="read border-1px">举报</span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default {
    props: {
      desclist: {
        type: Object
      }
    },
    data() {
      return {
        isShow: false,
        dialogVisible: false
      };
    },
    methods: {
      show() {
        this.isShow = true;
      },
      hiddenDesc() {
        this.isShow = false;
      },
      _creascroll() {
        this.descScroll = new BScroll(this.$refs.contentWrapper, {
          click: true
        });
        console.log(this.contentWrapper);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .desc-wrapper
    position: fixed
    padding: 10px 0
    left: 0
    top: 0
    bottom: 0
    z-index: 30
    width: 100%
    background: #fff
    .header
      position: relative
      background: #fff
      padding-bottom: 10px
      color: rgb(7,17,27)
      border-1px(rgba(7,17,27,0.1))
      .el-icon-arrow-left
        font-size: 16px
        padding: 0 5px 0 10px
        border-right: 1px solid rgba(7,17,27,0.1)
      .title
        font-size: 12px
        line-height: 16px
      .host
        position: absolute
        top: 1px
        right: 40px
        font-size: 12px
        line-height: 16px
      .el-icon-menu
        position: absolute
        top: 0
        right: 10px
        font-size: 12px
        line-height: 16px
        color: rgb(147,153,159)
    .host-wrapper
      padding: 10px 10px 18px 10px
      position: relative
      border-1px(rgba(7,17,27,0.1))
      border
      .title
        font-size: 14px
        line-height: 20px
        font-weight: 400
      .inline
        margin-bottom: 7px
        .icon
          display: inline-block
          vertical-align: top
          img
            border-radius: 50%
        .username
          display: inline-block
          vertical-align: top
          font-size: 10px
          margin: 9px 0 0 2px
        .button
          position: absolute
          right: 12px
      .text
        display: block
        font-size: 12px
        line-height: 20px
        color: rgb(7,17,27)
      .hostname
        font-size: 10px
        color: rgb(147,153,159)
      .time
        font-size: 10px
        color: rgb(147,153,159)
    .content-wrapper
      top: 202px
      bottom: 0
      width: 100%
      overflow: hidden
      ul
        margin: 0
        padding: 0
        .contents
          padding: 15px 0
          border-1px(rgba(7,17,27,0.1))
          position: relative
          .inline
            margin-left: 15px
            .icon
              display: inline-block
              vertical-align: top
              img
                border-radius: 50%
            .name
              display: inline-block
              vertical-align: top
              margin: 2px 0 0 5px
              font-size: 12px
              line-height: 12px
              color: rgb(7,17,27)
          .content
            display: block
            margin: 8px 10px 8px 40px
            line-height: 25px
            font-size: 14px
            color: rgb(7,17,27)

          .num
            margin-left: 42px
            font-size: 12px
            color: rgb(147,153,159)
          .time
            margin-left: 5px
            font-size: 12px
            color: rgb(147,153,159)
          .el-icon-more
            position: absolute
            right: 15px
            font-size: 10px
            margin-top: 5px
            padding: 5px
            color: rgb(147,153,159)
    .dialog
      .read
        padding: 20px 0
        display: block
        border-1px(rgba(7,17,27,0.1))
</style>
