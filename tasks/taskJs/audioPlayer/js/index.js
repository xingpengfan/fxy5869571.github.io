$(function () {
	var playStatus = {
		trackLen:playlist.result.tracks.length,
		trackIndex:0,
        currentTime:0,
		totalTime:0,
		playStatus:true
	}
	//播放函数
	var playControls = {
		trackInfo: function (args) {
			var tracks = playlist.result.tracks[playStatus.trackIndex];
			args = args || {
				name: tracks.name,
				artist:tracks.artists[0].name,
					album:tracks.album.name,
				albumPic:tracks.album.picUrl+'param=270y270',
				total:tracks.duration,
				src:tracks.mp3Url
				};
			$('.name').text(args.name);
			$('.artist').text(args.artist);
			$('.album').text(args.album);
			$('.imgs').css('background','url('+args.albumPic+')');
            $('.right').text(timeConvert(args.total / 1000));
			playStatus.totalTime = Math.floor(args.total/1000);
			$('#audio source').attr('src',args.src);
        },
        playStatus: function(){
            $('#123').attr('class', 'glyphicon glyphicon-' + (playStatus.playStatus?'pause':'play'));

            if(playStatus.playStatus){
                $('#audio')[0].play();
            }else{
                $('#audio')[0].pause();
            }
        },
        playTime: function(){
            $('.left').text(timeConvert(playStatus.currentTime));
            $('.time').css('width', playStatus.currentTime / playStatus.totalTime * 100 + '%');
        }

    };
    var timeConvert = function(timestamp){
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if(seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    };

    var init = function(){
        playControls.trackInfo();
        playControls.playStatus();
        $('#123').click(function(){
            playStatus.playStatus = !playStatus.playStatus;
            playControls.playStatus();
        });
        //回到第一首
        $('#frist').click(function () {
            if(playStatus.trackIndex-1<0){
                alert("这是第一首")
            }else {
                playStatus.trackIndex=0;
            }
            $('#audio').remove();
            $('.container').append('<audio id="audio"><source src=""></audio>');
            playControls.trackInfo();
            playControls.playStatus();
        });
        //上一首
        $('#hasNext').click(function () {
			if(playStatus.trackIndex-1<0){
				alert("这是第一首")
			}else {
				playStatus.trackIndex--;
			}
            $('#audio').remove();
            $('.container').append('<audio id="audio"><source src=""></audio>');
            playControls.trackInfo();
            playControls.playStatus();
        });
        //下一首
        $('#backTop').click(function () {
            if(playStatus.trackIndex>playStatus.trackLen-1){
                alert("这是最后一首了");
            }else {
                playStatus.trackIndex++
            }
            $('#audio').remove();
            $('.container').append('<audio id="audio"><source src=""></audio>');
            playControls.trackInfo();
            playControls.playStatus();
        });
        //最后一首
        $('#last').click(function () {
            if(playStatus.trackIndex>playStatus.trackLen){
                alert("这是最后一首")
            }else {
                playStatus.trackIndex=playStatus.trackLen-1;
            }
            $('#audio').remove();
            $('.container').append('<audio id="audio"><source src=""></audio>');
            playControls.trackInfo();
            playControls.playStatus();
        });
        setInterval(function(){
            playStatus.currentTime = $('#audio')[0].currentTime;
            playControls.playTime();

            if(playStatus.currentTime >= playStatus.totalTime){
                $('#hasNext').click();
            }
        }, 300);

    }
    init();
    $('#audio')[0].play();
});