/**
 * Created by Administrator on 2017-06-20.
 */
window.onload=()=>{
   const sider = $('#sider');
   const show = $('#show');
   const span = $('#span');
   const content = $('#content');
   console.log(content)
   console.log(span);
   const data = [
           {
               classify:"vue",
               title:"vue-schart ： vue.js 的图表组件",
               reading:30,
               date:"2017-06-17",
               text:"sChart.js 作为一个小型简单的图表库，没有过多的图表类型，只包含了柱状图、折线图、饼状图和环形图四种基本的图表。" +
               "麻雀虽小，五脏俱全。sChart.js 基本可以满足这四种图表的需求。" +
               "而它的小，体现在它的体积上，代码只有 8kb，如果经过服务器的Gzip压缩，那就更小了，因此不用担心造成项目代码冗余。",
           },
           {    classify:"vue",
               title:"Vue.js 插件开发详解",
               reading:454,
               date:"2017-05-17",
               text:"随着 Vue.js 越来越火，Vue.js 的相关插件也在不断的被贡献出来，数不胜数。" +
               "比如官方推荐的 vue-router、vuex 等，都是非常优秀的插件。但是我们更多的人还只停留在使用的阶段，" +
               "比较少自己开发。所以接下来会通过一个简单的 vue-toast 插件，来了解掌握插件的开发和使用",
           },
           {
               classify:"javaScript",
               title:"sChart.js：一个小型简单的图表库",
               reading:222,
               date:"2017-04-17",
               text:"sChart.js 作为一个小型简单的图表库，没有过多的图表类型，只包含了柱状图、折线图" +
               "、饼状图和环形图四种基本的图表。麻雀虽小，五脏俱全。sChart.js 基本可以满足这四种图表的需求。而它的小，" +
               "体现在它的体积上，代码只有 8kb，如果经过服务器的Gzip压缩，那就更小了，因此不用担心造成项目代码冗余。",
           },
           {
               classify:"javaScript",
               title:"JavaScript 中 闭包 的详解",
               reading:232,
               date:"2017-03-17",
               text:"在 JavaScript 中，闭包是一个让人很难弄懂的概念。ECMAScript 中给闭包的定义是：闭包，" +
               "指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量。"+
               "是不是看完这个定义感觉更加懵逼了？别急，我们来分析一下。",
           },
           {classify:"前端工具",
           title:"提高 webpack 构建 Vue 项目的速度",
           reading:232,
           date:"2017-04-17",
           text:"在项目中，引入了比较多的第三方库，导致项目大，而每次修改，都不会去修改到这些库，构建却都要再打包这些库，浪费了不少时间。所以" +
           "，把这些不常变动的第三方库都提取出来，下次 build 的时候不再构建这些库，这样既可大大缩短构建时间。那么要怎么去实现呢？。",
       },
           {
               classify:"前端工具",
           title:"gulp自动化压缩合并、加版本号解决方案",
           reading:232,
           date:"2017-03-17",
           text:"虽然网上有很多的 gulp 构建文章，但是很多都已经随着 gulp 插件的更新无法运行了。因此，我写了这个比较简单的构建方案。"+
               "如果还不熟悉 gulp 的插件，可以阅读上一篇文章：精通gulp常用插件"+
   " 这个方案主要是为了实现js/css的压缩合并、自动添加版本号和压缩html。",
       },
          {
              classify:"健身计划",
           title:"少食多餐 VS 8小时集中摄入？",
           reading:232,
           date:"2017-02-17",
           text:"除去每天买饭吃饭的事件精力，吃完后会有一点时间难以集中注意力学习，会放松休息，这样的话其实有很多时间偷偷溜走了。"+
           "效果上来说，因为并没有加入有氧，大部分还是力量训练为主，体重方面并没有太大变化，体脂稍有下降但速度缓慢，这是集中摄入的一个月效果。"+
"两种方式各有优缺点吧，对我来说，可能少食多餐是更好的选择，所以接下去的两个月会以少食多餐为主，偶尔进行间歇性禁食。",
       },
          {     classify:"健身计划",
               title:"减脂的一点点思考和心得",
               reading:232,
               date:"2017-01-17",
               text:"如果不认为数学就是简单的加减乘除，不认为懂得了一加一得二就可以证明各大数理，那么减脂也不是简单的节食运动，需要真真正正投入精力学习和实践。"+
              " 我想每个人在这个过程中或多或少都会走弯路，都会产生疑惑，意志力也会起伏，重要的是清晰自己的目标，不断寻找科学有效的方式，再加上一点点坚持，减脂并没有那么难~"+
        "如果有条件，选择一个适合的小伙伴很不错，不过大部分时候这很难，我自己总是一个人，时间计划比较自由好规划，然而也还会有些不便~"+
        "其他事也是一样。",
       }
   ];
   function init(data,node) {
       data.forEach((item)=>{
          div = document.createElement("div");
          div.innerHTML = `<h2>${item.title}</h2><span>发表于:${item.date}</span>
                            <span>分类：${item.classify}</span><span>阅读次数${item.reading}</span>`;
          node.append(div);
       });
   }
   init(data,content);
   let isShow = false;
  show.on('click',()=>{
      if(!isShow){
          sider.css('right','0');
          span.removeClass('glyphicon-list');
          span.addClass("glyphicon-remove");
          isShow = !isShow;
      }else {
          sider.css('right',-sider.width());
          span.removeClass('glyphicon-remove');
          span.addClass("glyphicon-list");
          isShow = !isShow;
      }
  });
};