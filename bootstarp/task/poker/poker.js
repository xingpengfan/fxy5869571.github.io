/**
 * Created by Administrator on 2017-06-15.
 */
window.onload = ()=> {
    //公共牌
    const pck = document.getElementById("common");
    //玩家二
    const fan = document.getElementById("fan");
    //玩家一
    const xing = document.getElementById("xing");
    //玩家二dom
    const mediv = document.getElementById("me");
    //玩家一dom
    const hediv = document.getElementById("he");
    const mewin = document.getElementById("mewin");
    const hewin = document.getElementById("hewin");
    //发牌按钮
    const btn = document.getElementById("123");
    //开牌按钮
    const btn2 = document.getElementById("456");
    //重发按钮
    const reset = document.getElementById("reset");
    //dom对象数组，用于重置所有牌
    const All = [pck,fan,xing,mediv,hediv];
    //扑克对象
    const poker = {
        //红桃
        hearts: {
            status: 0,
            title: "♥",
            color: "#ff0000"
        },
        //方块
        block: {
            status: 1,
            title: "♦",
            color: "red"
        },
        //黑桃
        spade: {
            status: 2,
            title: "♠",
            color: "#000"
        },
        //梅花
        clud: {
            status: 3,
            title: "♣",
            color: "#000"
        }
    };
    //玩家二对象
    const me = {
        //德州扑克等级，等级越高牌面越大
        level:0,
        //用于存储最大的五张牌
        list:[],
        //用于存储五张牌对应的花色
        sortimg:[],
        //判定是否赢了
        isWin:false
    };
    //玩家一对象
    const he = {
        level:0,
        list:[],
        sortimg:[],
        isWin:false
    };
    //变量用于记录鼠标点击次数
    let i = 0;
    //用于储存52张牌扑克数组
    let datas = [];
    for (let i=0;i<52;i++){
        datas.push(i);
    }
    //初始化扑克牌
    function init() {
        //判定花色
        function selectimg(data, div) {
            if (Math.floor(data / 13) === poker.hearts.status) {
                span = document.createElement("span")
                span.innerHTML = poker.hearts.title;
                div.style.color = poker.hearts.color;
                div.appendChild(span);
            } else if (Math.floor(data / 13) === poker.block.status) {
                span = document.createElement("span")
                span.innerHTML = poker.block.title;
                div.style.color = poker.block.color;
                div.appendChild(span);
            } else if (Math.floor(data / 13) === poker.spade.status) {
                span = document.createElement("span")
                span.innerHTML = poker.spade.title;
                div.style.color = poker.spade.color;
                div.appendChild(span);
            } else if (Math.floor(data / 13) === poker.clud.status) {
                span = document.createElement("span");
                span.innerHTML = poker.clud.title;
                div.style.color = poker.clud.color;
                div.appendChild(span);
            }
        }
        //判定牌面
        function selectNum(x, div) {
            switch (x % 13) {
                case 2:
                    span = document.createElement("span");
                    span.innerHTML = "2";
                    div.appendChild(span);
                    break;
                case 3:
                    span = document.createElement("span");
                    span.innerHTML = "3";
                    div.appendChild(span);
                    break;
                case 4:
                    span = document.createElement("span");
                    span.innerHTML = "4";
                    div.appendChild(span);
                    break;
                case 5:
                    span = document.createElement("span");
                    span.innerHTML = "5";
                    div.appendChild(span);
                    break;
                case 6:
                    span = document.createElement("span");
                    span.innerHTML = "6";
                    div.appendChild(span);
                    break;
                case 7:
                    span = document.createElement("span");
                    span.innerHTML = "7";
                    div.appendChild(span);
                    break;
                case 8:
                    span = document.createElement("span");
                    span.innerHTML = "8";
                    div.appendChild(span);
                    break;
                case 9:
                    span = document.createElement("span");
                    span.innerHTML = "9";
                    div.appendChild(span);
                    break;
                case 10:
                    span = document.createElement("span");
                    span.innerHTML = "10";
                    div.appendChild(span);
                    break;
                case 11:
                    span = document.createElement("span");
                    span.innerHTML = "J";
                    div.appendChild(span);
                    break;
                case 12:
                    span = document.createElement("span");
                    span.innerHTML = "Q";
                    div.appendChild(span);
                    break;
                case 0:
                    span = document.createElement("span");
                    span.innerHTML = "K";
                    div.appendChild(span);
                    break;
                case 1:
                    span = document.createElement("span");
                    span.innerHTML = "A";
                    div.appendChild(span);
                    break;
            }
        }
        //往桌面添加一张牌
        function addPoker(data, i) {
            if (datas.length > 0) {
                div = document.createElement("div");
                div.className = "poker";
                selectimg(data, div);
                selectNum(data, div);
                if (i % 2 === 0 && i < 5) {
                    fan.appendChild(div);
                } else if (i % 2 === 1 && i < 5) {
                    xing.appendChild(div);
                } else if (i = 5 && i < 10) {
                    pck.appendChild(div);
                }
            }
        }
        //发牌按钮点击事件
        btn.onclick = () => {
            i++;
            addPoker(datas.splice((datas.length) * Math.random(), 1), i);
            //console.log(i);
        }
    };
    init();
    //获取桌面玩家的所有花色
      function addImg(node,common) {
          let list = [];
          let num = [];
          for (let i = 0; i < node.children.length; i++) {
              let item = (node.children[i].firstChild.innerText);
              list.push(item);
          }
          for (let i = 0; i < common.children.length; i++) {
              let item = (common.children[i].firstChild.innerText);
              list.push(item);
          }
          return list;
      };
      //获取桌面玩家的牌面
      function addNum(node,common) {
        let list = [];
        let num = [];
        for (let i = 0; i < node.children.length; i++) {
            let item = (node.children[i].lastChild.innerText);
            list.push(item);
        }
        for (let i = 0; i < common.children.length; i++) {
            let item = (common.children[i].lastChild.innerText);
            list.push(item);
        }
        return list;
    };
      //判定牌面
    function selectNum(x, div) {
        switch (x % 13) {
            case 2:
                span = document.createElement("span");
                span.innerHTML = "2";
                div.appendChild(span);
                break;
            case 3:
                span = document.createElement("span");
                span.innerHTML = "3";
                div.appendChild(span);
                break;
            case 4:
                span = document.createElement("span");
                span.innerHTML = "4";
                div.appendChild(span);
                break;
            case 5:
                span = document.createElement("span");
                span.innerHTML = "5";
                div.appendChild(span);
                break;
            case 6:
                span = document.createElement("span");
                span.innerHTML = "6";
                div.appendChild(span);
                break;
            case 7:
                span = document.createElement("span");
                span.innerHTML = "7";
                div.appendChild(span);
                break;
            case 8:
                span = document.createElement("span");
                span.innerHTML = "8";
                div.appendChild(span);
                break;
            case 9:
                span = document.createElement("span");
                span.innerHTML = "9";
                div.appendChild(span);
                break;
            case 10:
                span = document.createElement("span");
                span.innerHTML = "10";
                div.appendChild(span);
                break;
            case 11:
                span = document.createElement("span");
                span.innerHTML = "J";
                div.appendChild(span);
                break;
            case 12:
                span = document.createElement("span");
                span.innerHTML = "Q";
                div.appendChild(span);
                break;
            case 0:
                span = document.createElement("span");
                span.innerHTML = "K";
                div.appendChild(span);
                break;
            case 1:
                span = document.createElement("span");
                span.innerHTML = "A";
                div.appendChild(span);
                break;
        }
    }
    //添加一张牌
    function addPoker(people,peopleDiv) {
           // selectimg(data, div);
            for (let i=0;i<people.list.length;i++){
                div = document.createElement("div");
                div.className = "poker";
                addColor(people.sortimg[i], div);
                selectNum(people.list[i], div);
                peopleDiv.appendChild(div);
            }
    }
    //移除所有牌
    function removePoker(node) {
        Array.from(node.children).forEach((item)=>{
            node.removeChild(item);
        });
    }
    //计算每张牌或花色的数量并保存为对象，key为牌面或花色，值为对应的数量
    function computes(img) {
        let imgs = {};
        for (let i=0;i<img.length;i++){
            switch (img[i]){
                case "K":
                    img[i]="13";
                    break;
                case "A":
                    img[i]="14";
                    break;
                case "J":
                    img[i]="11";
                    break;
                case "Q":
                    img[i]="12";
                    break;
            };
                    if(imgs.hasOwnProperty(img[i])){
                         imgs[img[i]]=imgs[img[i]]+1;
                    }else {
                        imgs[img[i]]=1;
            }
        }
        Object.keys(imgs).sort((a,b)=>{
            return a-b;
        });
       return imgs;
    };
    //计算等级
    function computeslevel(people) {
        let arr = Object.keys(people.num);
        //同花顺
        if(isStraight(people)){
            for (let key in people.img){
                if(people.img[key]>=5){
                    return people.level = 8;
                }else {
                    people.list = [];
                }
            }
        };
        //炸弹
        for (let key in people.num){
            if(people.num[key]===4){
                for (let i=0;i<4;i++){
                    people.list.push(key);
                }
                delete people.num[key];
                people.list.push(Object.keys(people.num)[Object.keys(people.num).length-1]);
                return people.level = 7;
            }
        };
        //葫芦
       if(arr.length===4||arr.length===3){
           for (let key in people.num){
               if(people.num[key]===3){
                   people.list.unshift(key);
                   people.list.unshift(key);
                   people.list.unshift(key);
                   delete people.num[key];
                   return people.level = 6;
               }
               if(people.num[key]===2){
                   people.list.push(key);
                   people.list.push(key);
               }
           };
       }
        //同花
        for (let key in people.img){
            if(people.img[key]>=5){
                for (let i=0;i<5;i++){
                    people.sortimg.push(key);
                }
                return people.level = 5;
            }
        };
        //顺子
        if(isStraight(people)){
            return people.level = 4;
        };
        //三条
            if(arr.length===5){
                for (let key in people.num){
                    if(people.num[key]===3){
                        for (let key in people.num){
                            if(people.num[key]===3){
                                people.list.unshift(key);
                                people.list.unshift(key);
                                people.list.unshift(key);
                                delete people.num[key];
                            }
                        }
                        people.list.push(Object.keys(people.num)[Object.keys(people.num).length-2]);
                        people.list.push(Object.keys(people.num)[Object.keys(people.num).length-1]);
                        return people.level = 3;
                }
            }
        };
        //两对
        if(arr.length===5||arr.length===4){
            for (let key in people.num){
                if(people.num[key]!==3&&people.num[key]!==4){
                    for (let key in people.num){
                        if(people.num[key]===2){
                            people.list.unshift(key);
                            people.list.unshift(key);
                            delete people.num[key];
                        }
                    }

                        people.list.push(Object.keys(people.num)[Object.keys(people.num).length-1]);
                    return people.level = 2;
                }
            }
        };
        //一对
        if(arr.length===6){
            for (let key in people.num){
               if(people.num[key]===2){
                   people.list.unshift(key);
                   people.list.unshift(key);
                   delete people.num[key];
               }
            }
            for (let i=2;i<Object.keys(people.num).length;i++){
                people.list.push(Object.keys(people.num)[i]);
            }
            return people.level = 1;
        };
        //单张
             if(arr.length===7){
            for (let i=2;i<arr.length;i++){
                people.list.unshift(arr[i]);
            }
                 return people.level = 0;
        };
    };
    //是否是顺子；
    function isStraight(people) {
        let arr = Object.keys(people.num);
            if(arr[3]===5&&arr[arr.length-1]===14){
            for (let i=0;i<4;i++) {
                people.list.push(arr[i]);
            }
            people.list.push(arr[arr.length-1]);
            return true;
        }
            else  if(arr.length===5&&arr[4]-arr[0]=== 4 ){
                for (let i=0;i<5;i++) {
                   people.list.push(arr[i]);
                }
                return true;
            }
            else if(arr.length===6&&arr[5]-arr[1]===4){
                        for (let i=1;i<6;i++) {
                            people.list.push(arr[i]);
                        }
                        return true;
            }
            else if(arr.length===6&&arr[4]-arr[0]===4){
                for (let i=0;i<5;i++) {
                    people.list.push(arr[i]);
                }
                return true;
            }
            else if(arr.length===7&&arr[5]-arr[1]=== 4){
                        for (let i=1;i<6;i++) {
                            people.list.push(arr[i]);
                        }
                        return true;
            }
            else if(arr.length===7&&arr[4]-arr[0]=== 4){
                for (let i=0;i<5;i++) {
                    people.list.push(arr[i]);
                }
                     return true;
                }
            else if(arr.length===7&&arr[6]-arr[2]=== 4){
                    for (let i=2;i<7;i++) {
                        people.list.push(arr[i]);
                    }
                    return true;
                }
            else {
                    return false;
            }
        };
    //牌面的大小比较
    function pokerSize(me,he) {
        if(me.level===8||me.level===4){
            if(me.list[4]>he.list[4]){
                me.isWin = true;
            }else {
                he.isWin = true;
            }
        }else if(me.level===7||me.level===6||me.level===3){
            if(me.list[0]>he.list[0]){
                me.isWin = true;
            }else {
                he.isWin = true;
            }
        }else if(me.level===2){
            if(me.list[0]>he.list[0]){
                me.isWin = true;
            }else if(me.list[0]===he.list[0]&&me.list[2]>he.list[2]){
                me.isWin = true;
            }else if(me.list[0]===he.list[0]&&me.list[2]===he.list[2]&&me.list[4]>he.list[4]){
                me.isWin = true;
            }else {
                he.isWin = true;
            }
        }
        else if(me.level===1){
            if(me.list[0]>he.list[0]){
                me.isWin = true;
            }else if(me.list[0]===he.list[0]&&me.list[4]>he.list[4]){
                me.isWin = true;
            }else if(me.list[0]===he.list[0]&&me.list[4]===he.list[4]&&me.list[3]>he.list[3]){
                me.isWin = true;
            }else if(me.list[0]===he.list[0]&&
                me.list[4]===he.list[4]&&
                me.list[3]===he.list[3]&&
                me.list[2]>he.list[2]){
                me.isWin = true;
            }else {
                he.isWin = true;
            }
        }
        else if(me.level===0){
            if(me.list[0]>he.list[0]){
                me.isWin = true;
            }else if(me.list[0]===he.list[0]&&me.list[1]>he.list[1]){
                me.isWin = true;
            }else if(
                me.list[0]===he.list[0]&&
                me.list[1]===he.list[1]&&
                me.list[2]>he.list[2]){
                me.isWin = true;
            }else if(
                me.list[0]===he.list[0]&&
                me.list[1]===he.list[1]&&
                me.list[2]===he.list[2]&&
                me.list[3]>he.list[3]){
                me.isWin = true;
            }
            else if(
                me.list[0]===he.list[0]&&
                me.list[1]===he.list[1]&&
                me.list[2]===he.list[2]&&
                me.list[3]===he.list[3]&&
                me.list[4]>he.list[4]){
                me.isWin = true;
            }else {
                he.isWin = true;
            }
        }
    };
    //拿到牌面所相对应的花色
    function getColor(people) {
     for (let i=0;i<people.list.length;i++){
         for (let j=0;j<people.nums.length;j++){
             if(people.list[i]===people.nums[j]){
                 people.sortimg.push(people.imgs[j]);
                 people.nums.splice(j,1);
                 people.imgs.splice(j,1)
             }
         }
     }
    };
    function getnum(people) {
        for (let i=0;i<people.sortimg.length;i++){
            for (let j=0;j<people.imgs.length;j++){
                if(people.list[i]===people.imgs[j]){
                    people.list.push(people.nums[j]);
                    people.imgs.splice(j,1);
                    people.nums.splice(j,1);
                }
            }
        }
    };
    //给结果牌面添加对应的花色
    function addColor(img,div) {
        if(img===poker.hearts.title||img===poker.block.title){
            span = document.createElement("span");
            span.innerText = img;
            div.style.color = "red";
        }else {
            span = document.createElement("span");
            span.innerText = img;
            div.style.color = "#000";
        }
        div.appendChild(span);
    }
    btn2.onclick = ()=>{
        //储存玩家二牌面的所有花色
        me.imgs = addImg(fan,pck);
        //储存玩家二牌面的所有数值
        me.nums = addNum(fan,pck);
        he.imgs = addImg(xing,pck);
        he.nums = addNum(xing,pck);
        me.img = computes(me.imgs);
        me.num = computes(me.nums);
        he.img = computes(he.imgs);
        he.num = computes(he.nums);
        computeslevel(me);
        computeslevel(he);
        if(me.level===5){
            getnum(me);
            getnum(he);
        }else {
            getColor(me);
            getColor(he);
        }
        if(me.level>he.level){
            me.isWin = true;
            mewin.style.display = "block";
        }else if(me.level<he.level){
            he.isWin = true;
            hewin.style.display = "block";
        }else {
            pokerSize(me,he);
            if(me.isWin){
                mewin.style.display = "block";
            }else {
                hewin.style.display = "block";
            }
        }
        console.log(he);
        console.log(me);
        addPoker(me,mediv);
        addPoker(he,hediv);
    };
    reset.onclick = ()=>{
        All.forEach((item)=>{
            removePoker(item);
        });
        i=0;
        me.list =[];
        he.list = [];
        me.sortimg = [];
        he.sortimg = [];
        datas = [];
        for (let i=0;i<52;i++){
            datas.push(i);
        }
        mewin.style.display = "none";
        hewin.style.display = "none";

    };
}