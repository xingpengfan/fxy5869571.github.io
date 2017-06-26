/**
 * Created by Administrator on 2017-06-24.
 */

window.onload = function () {
    class snake{
        constructor(width=20,heigth=20,AI=false){
            this.width = width;//地图宽度
            this.heigth = heigth;//地图高度
            this.snakeArr = [];//保存蛇长度的数组
            this.grid = [];//保存所有td的数组
            this.food = [];//保存食物的数组
            this.direction = 39;
            this.goX = 0;
            this.goY = 0;
            this.timer = null;
            this.speed = 10;
            this.isend = false;
            this.isStop = true;
            this.ai = AI;
            this.init();
        };
        init(){
           let table = document.getElementById("table");
           if(table){
               document.body.removeChild(table);
           }
            let _this = this;
            this.createGrid();
            this.initSnake();
            this.initFood();
            this.main();
            document.onkeydown = _this.bind(_this.ketDown,_this);
        }
        //给函数绑定作用域(修正this)
        bind(fn,context){
        return function(){
            return fn.apply(context,arguments);
           }
        };
        createGrid(){
            let table = document.createElement("table");
            let tbody = document.createElement("tbody");
            for (let i=0;i<this.width;i++){
                let tr = document.createElement("tr");
                this.grid[i] = [];
                for(let j=0;j<this.heigth;j++){
                    let td = document.createElement("td");
                   this.grid[i][j] = tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            table.id = "table";
            document.body.appendChild(table)
       };
        initSnake(){
            this.snakeArr.push([1,3]);
            this.snakeArr.push([1,2]);
            this.snakeArr.push([1,1]);
            this.snakeDaaColor();
            this.grid[this.snakeArr[0][0]][this.snakeArr[0][1]].className = "snake_head"
        };
        snakeDaaColor(){
            if(!this.isend){
                for (let i=0;i<this.snakeArr.length;i++){
                    let x = this.snakeArr[i][0];
                    let y = this.snakeArr[i][1];
                    if(x>0||x<20||y>0||y<20 ){
                        this.grid[x][y].className = "snake";
                    }

                }
            }
        };
        initFood(){
            this.food= this.randomFood();
            console.log(this.food);
            if(this.isself(this.food)){
                this.initFood();
            }
           this.grid[this.food[0]][this.food[1]].className = "food";
        };
        randomFood(initX,initY,endX,endY){
            var initx = initX||0;
            var inity = initY||0;
            var endx = endX||(this.width-1);
            var endy = endY||(this.heigth-1);
            var p=[];
            p[0] = Math.floor(Math.random()*(endx-initx))+initx;
            p[1] = Math.floor(Math.random()*(endy-inity))+inity;
            return p ;
        };
        ketDown(e){
            let event= e ? e:window.event;
            let keyCode =event.keyCode||0;
            if(keyCode===116){
                window.location.reload();
            }
            if(keyCode===32){
                const span = document.getElementById("span")
                if(this.isStop){
                    this.main();
                    this.isStop = !this.isStop;
                    span.innerText ="";
                }else {
                    if(this.timer){clearInterval(this.timer)};
                    this.isStop = !this.isStop
                    span.innerText ="已暂停，重新开始请按空格键";
                }
            }
            if(keyCode>=37&&keyCode<=40){
                this.direction = keyCode;
            }
            return false;
        }
        move(){
                 let startX = this.snakeArr[0][0];
                 let startY = this.snakeArr[0][1];
                 let len = this.snakeArr[this.snakeArr.length-1];
                 let message = "";
                 switch (this.direction){
                     case 37:
                         if(this.goY!=1){this.goY=-1;this.goX=0};	//防止控制蛇往相反反方向走
                         break;
                     case 38:
                         if(this.goX!=1){this.goX=-1;this.goY=0};
                         break;
                     case 39:
                         if(this.goY!=-1){this.goY=1;this.goX=0};
                         break;
                     case 40:
                         if(this.goX!=-1){this.goX=1;this.goY=0};
                 }
                 startX+=this.goX;
                 startY+=this.goY;
                 if(startX===this.food[0]&&startY===this.food[1]){
                     this.snakeArr.push(this.food);
                     setTimeout( ()=> {
                         this.initFood()
                     },100)
                 };
                 if(this.snakeArr.length===4){
                     this.speed=15
                 }else if(this.snakeArr.length===5){
                        this.speed=16
                 }else if(this.snakeArr.length===6){
                     this.speed=17;
                 }
                 this.main();
                 //console.log(this.speed);
                 if(this.iswall(this.snakeArr[0])){
                     this.isend = true;
                     message = "擦，sb你撞墙了";
                 }
                 if(this.isself(this.snakeArr[0])){
                     this.isend = true;
                     message = "擦，sb你撞到自己了";
                 }
                if(this.isend){
                   if(this.timer){ clearInterval(this.timer)};
                   if(confirm(message + "你的分数为"+(this.snakeArr.length-3)*10+"是否重新开始")){
                       new snake();
                   }
                    return;
                }
                 for (let i=this.snakeArr.length-1;i>0;i--){
                     this.snakeArr[i] = this.snakeArr[i-1];
                 }
                 this.snakeArr[0] = [startX,startY];
                 this.snakeDaaColor();
                 this.grid[len[0]][len[1]].className = "notsnake";
                 if(!this.isend){
                     this.grid[startX][startY].className = "snake_head";
                 }
                    if(this.ai){
                        this.snakeAi();
                        document.onkeydowm = null;
                    }
        };
        iswall(arr){
            if(arr instanceof Array){
                if(arr[0]<0||arr[0]>this.width-1||arr[1]<0||arr[1]>this.heigth-1){
                    return true
                }
            }
            return false;
        };
        main(){
            let _this = this;
            if(this.timer){clearInterval(_this.timer)};
            _this.timer = setInterval(_this.bind(_this.move,_this),3000/this.speed);
        };
        isself(header){
            for (let i=1;i<this.snakeArr.length;i++){
                if(header[0]===this.snakeArr[i][0]&&header[1]===this.snakeArr[i][1]){
                    return true
                }
            }
            return false;
        };
        snakeAi(){
            let headerX = this.snakeArr[0][0],//zong坐标
                headerY = this.snakeArr[0][1],//横坐标
                foodX = this.food[0],
                foodY = this.food[1];
            if(headerX<foodX){
                if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerX+1<this.width){
                    this.direction=40;
                }else if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerY+1<this.heigth){
                    this.direction=39;
                }else if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction = 38;
                }else {
                    this.direction = 37;
                }
            }else if(headerX>foodX){
                if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction=38;
                }else if(!this.isself([headerX,headerY-1])&&this.direction!==39&&headerY-1>=0){
                    this.direction=37;
                }else if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerX+1<this.width){
                    this.direction = 40;
                }else if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerY+1<this.heigth){
                    this.direction = 39;
                }
            }else if(headerY<foodY){
                if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerY+1<this.heigth){
                    this.direction=39;
                }else if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerX+1<this.width){
                    this.direction=40;
                }else if(!this.isself([headerX,headerY-1])&&this.direction!==39&&headerY-1>=0){
                    this.direction = 37;
                }else if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction = 38;
                }
            }else if(headerY>foodY){
                if(!this.isself([headerX,headerY-1])&&this.direction!==39&&headerY-1>=0){
                    this.direction=37;
                }else if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction=38;
                }else if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerX+1<this.width){
                    this.direction = 39;
                }else if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerY+1<this.width){
                    this.direction = 40;
                }
            }
            if(headerX===foodX&&headerY===foodY){
                this.findTail();
                document.onkeydowm = null;
            }
        }
        findTail(){
            let headerX = this.snakeArr[0][0],//zong坐标
                headerY = this.snakeArr[0][1],//横坐标
                tailX = this.snakeArr[this.snakeArr.length-1][0],
                tailY = this.snakeArr[this.snakeArr.length-1][1];
            if(headerX<tailX){
                if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerX+1<this.width){
                    this.direction=40;
                }else if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerY+1<this.heigth){
                    this.direction=39;
                }else if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction = 38;
                }else {
                    this.direction = 37;
                }
            }else if(headerX>tailX){
                if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction=38;
                }else if(!this.isself([headerX,headerY-1])&&this.direction!==39&&headerY-1>=0){
                    this.direction=37;
                }else if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerX+1<this.width){
                    this.direction = 40;
                }else if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerY+1<this.heigth){
                    this.direction = 39;
                }
            }else if(headerY<tailY){
                if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerY+1<this.heigth){
                    this.direction=39;
                }else if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerX+1<this.width){
                    this.direction=40;
                }else if(!this.isself([headerX,headerY-1])&&this.direction!==39&&headerY-1>=0){
                    this.direction = 37;
                }else if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction = 38;
                }
            }else if(headerY>tailY){
                if(!this.isself([headerX,headerY-1])&&this.direction!==39&&headerY-1>=0){
                    this.direction=37;
                }else if(!this.isself([headerX-1,headerY])&&this.direction!==40&&headerX-1>=0){
                    this.direction=38;
                }else if(!this.isself([headerX,headerY+1])&&this.direction!==37&&headerX+1<this.width){
                    this.direction = 39;
                }else if(!this.isself([headerX+1,headerY])&&this.direction!==38&&headerY+1<this.width){
                    this.direction = 40;
                }
            }
            if(headerX===tailX&&headerY===tailY){
                this.snakeAi();
                document.onkeydowm = null;
            }
        }
    }
    new snake(20,20,true);
}
