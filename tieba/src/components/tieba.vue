<template>
  <div class="tieba-wrapper">
      <v_header :seller="seller"></v_header>
        <div class="user-wrapper" ref="wrapper">
          <ul>
            <li v-for="list in notes" class="tieba border-1px" @click="showDesc(list,$event)">
              <div class="user">
                <span class="icon"><img :src="list.icon" width="24" height="24"></span>
                <span class="username">{{list.username}}</span>
                <h1 class="title">{{list.title}}</h1>
                <p class="text">{{list.text}}</p>
                <span class="time">{{list.Time}}</span>
                <span class="reading">阅读 {{list.reading}}</span>
                <span class="rating">回复{{list.ratings.length}}</span>
              </div>
            </li>
          </ul>
        </div>
    <v_desc :desclist="desclist"  ref="desc"></v_desc>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../components/header/header';
  import split from '../components/split/split.vue';
  import BScroll from 'better-scroll';
  import desc from '../components/content/desc.vue';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {},
        note: {},
        notes: {},
        desclist: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      });
      this.$http.get('/api/notes').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.notes = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll() {
          this.noteScroll = new BScroll(this.$refs.wrapper, {
            click: true
          });
      },
    showDesc(list, event) {
        if (!event._constructed) {
          return;
        }
        this.desclist = list;
        this.$refs.desc.show();
    }
  },
    components: {
      v_header: header,
      split,
      v_desc: desc
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../src/common/stylus/mixin.styl"
      .user-wrapper
        position: absolute
        top: 124px
        bottom: 1px
        overflow: hidden
        width: 100%
        ul
          margin: 0
          padding: 0 8px
          .tieba
            position: relative
            padding: 8px
            border-1px(rgba(7, 17, 27, 0.1))
            .user
              .icon
                display: inline-block
                vertical-align: top
                img
                  border-radius: 50%
              .username
                display: inline-block
                vertical-align: top
                margin: 6px
                font-size: 12px
                color: rgb(147, 153, 159)
              .title
                margin-left: 24px
                font-size: 12px
                line-height: 12px
                margin: 5px
                color: rgb(7, 17, 27)
              .text
                margin-left: 10px
                font-size: 12px
                line-height: 20px
                margin: 10px 5px
                padding-bottom: 8px
                color: rgb(147, 153, 159)
              .time
                position: absolute
                bottom: 5px
                margin-left: 7px
                font-size: 10px
                line-height: 10px
                color: rgb(147, 153, 159)
              .reading
                position: absolute
                bottom: 5px
                right: 45px
                font-size: 7px
                color: rgb(147,153,159)
              .rating
                position: absolute
                bottom: 5px
                right: 10px
                font-size: 7px
                color: rgb(147,153,159)
</style>
