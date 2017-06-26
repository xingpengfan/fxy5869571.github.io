/**
 * Created by Administrator on 2017-06-22.
 */
window.onload = function () {
    const chess = document.getElementById("gobang");
    const content=chess.getContext('2d');
    const result = document.getElementById("result")
    content.strokeStyle = "#000";
    const chessBox = [];
    for (var i=0;i<15;i++){
        chessBox[i] = [];
        for (var j=0;j<15;j++){
            chessBox[i][j]=0;
        }
    }
    var me = true;
    var wins = [];
    var count = [];
    var myWin = [];
    var computerWin = [];
    var over = false;
    for (var i=0;i<15;i++){
        wins[i]=[];
        for (var j=0;j<15;j++){
            wins[i][j]=[];
        }
    }
    for (var i=0;i<15;i++){
        for (var j=0;j<11;j++){
            for (var k=0;k<5;k++){
                wins[i][j+k][count] = true;
            }
            count++
        }
    }
    for (var i=0;i<15;i++){
        for (var j=0;j<11;j++){
            for (var k=0;k<5;k++){
                wins[j+k][i][count] = true;
            }
            count++
        }
    }
    for (var i=0;i<11;i++){
        for (var j=0;j<11;j++){
            for (var k=0;k<5;k++){
                wins[i+k][j+k][count] = true;
            }
            count++
        }
    }
    for (var i=0;i<11;i++){
        for (var j=14;j>3;j--){
            for (var k=0;k<5;k++){
                wins[i+k][j-k][count] = true;
            }
            count++
        }
    }
    for (var k=0;k<count;k++){
        myWin[k] = 0;
        computerWin[k] = 0;
    }
    init();
    chess.onclick = function (e) {
        if(over){
            return;
        }
        if(!me) {
            return;
        }
            var x = e.offsetX;
            var y = e.offsetY;
            var i = Math.floor(x/30);
            var j = Math.floor(y/30);
            if(chessBox[i][j]===0){
                oneStep(i,j,me);
                    chessBox[i][j]=1;
                for (var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        myWin[k]++;
                        computerWin[k]= 6;
                        if(myWin[k]===5){
                            result.innerText = "我赢了"
                            over = true;
                        }
                    }
                }if(!over) {
                    me = !me;
                    computerAi();
                }
            }
        }

function init() {
    for (var i=0;i<15;i++){
        content.moveTo(15,15+i*30);
        content.lineTo(435,15+i*30);
        content.stroke();
        content.moveTo(15+i*30,15);
        content.lineTo(15+i*30,435);
        content.stroke();
    }
}
function oneStep(i,j,me) {
    content.beginPath();
    content.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    content.closePath();
    var gradient = content.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
   if(me){
       gradient.addColorStop(0,"#0a0a0a");
       gradient.addColorStop(1,"#636766");
   }else {
       gradient.addColorStop(0,"#d1d1d1");
       gradient.addColorStop(1,"#f9f9f9");
   }
    content.fillStyle = gradient;
    content.fill();
}
function computerAi() {
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0;
    var v = 0;
    for (var i=0;i<15;i++){
        myScore[i] = [];
        computerScore[i] = [];
       for (var j=0;j<15;j++){
           myScore[i][j] = 0;
           computerScore[i][j] = 0;
       }
    };
    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){
            if(chessBox[i][j]===0){
                for (var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(myWin[k]===1){
                            myScore[i][j]+=200;
                        }else if(myWin[k]===2){
                            myScore[i][j]+=400;
                        }else if(myWin[k]===3){
                            myScore[i][j]+=2000;
                        }else if(myWin[k]===4){
                            myScore[i][j]+=10000;
                        }
                        if(computerWin[k]===1){
                            computerScore[i][j]+=220;
                        }else if(computerWin[k]===2){
                            computerScore[i][j]+=420;
                        }else if(computerWin[k]===3){
                            computerScore[i][j]+=2100;
                        }else if(computerWin[k]===4){
                            computerScore[i][j]+=2000000;
                        }
                    }
                }
                if(myScore[i][j]>max){
                    max = myScore[i][j];
                    u=i;
                    v = j;
                }else if(myScore[i][j]===max){
                    if(computerScore[i][j]>computerScore[u][v]){
                        u=i;
                        v = j;
                    }
                }
                if(computerScore[i][j]>max){
                    max = computerScore[i][j];
                    u=i;
                    v = j;
                }else if(computerScore[i][j]===max){
                    if(myScore[i][j]>myScore[u][v]){
                        u=i;
                        v = j;
                    }
                }
            }
        }
    };
    oneStep(u,v,false);
    chessBox[u][v] = 2;
    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k] = 6;
            if(computerWin[k]===5){
                over = true;
                result.innerText = "计算机赢了"
            }
        }
    }
    if(!over){
        me = !me;
    }
}
}


