/**
 * Created by Administrator on 2017-06-09.
 */
    function backTop(node) {
    let times = null;
    const clientHeight =document.documentElement.clientHeight;
    let isTop = true;
    window.onscroll = function () {
        if(!isTop){
            clearInterval(times);
        }
        isTop = false;
        if(document.body.scrollTop>=clientHeight){
            node.style.display = "block"
        }else {
            node.style.display = "none"
        }
    }
    node.onclick = function () {
        times = setInterval(function () {
            document.body.scrollTop -=200;
            if (document.body.scrollTop===0){
                clearInterval(times);
            }
            isTop = true;
        },50)
    }

}

