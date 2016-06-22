/**
 * Created by Administrator on 2016/3/16.
 */
var $mediaBtn = $('.comps-media');
var $video = $('#video');
$(function () {
    showMedia();
    controlTool();//视频事件
    goNav();
    goTop();
});

function showMedia() {
    $mediaBtn.on('click', function () {
        var $scTop = $('body').scrollTop();
        $('.js-model').css('display', 'block');
        var $srcList = $(this).attr('href');
        /* $video.append('<source src="'+$srcList+'"  type="video/mp4"/>');*/
        $video.attr('src', $srcList);
        $('.fixedBox').animate({'height': "100%"}, 200);
        $(window).on('scroll', function () {
            $(this).scrollTop($scTop);
        });
        return false;
    });
}

function controlTool() {
    var $tool = $('.mediaControl');
    var $openPause = $tool.find('.openPause');
    var $entire = $tool.find('.entireBtn');
    var $timeShow = $tool.find('.timeShow');
    var $timeLine = $tool.find('.timeLine');
    var $cuTime = $timeLine.find('.showCurrentTime');
    var $timeHadShow = $timeLine.find('.hadShow');
    var $slideBtn = $timeLine.find('.slideBtn');
    var $openBtn = $('.mediaShow .openBtn');
    var $totalTime = 0;
    var $currentTime = 0;
    var $closeBtn = $('#close');
    var $fixedBox = $('.fixedBox');
    var $volumeBox = $tool.find('.volumeBox');

    /*关闭弹出视屏窗口*/
    $closeBtn.on('click', function () {
        $fixedBox.css('height', 0);
        $(window).off('scroll');
        $video[0].currentTime = 0;
        $('.popWindow').css('display', 'none');
        $video.attr('src', '');
        $cuTime.html($currentTime).css('left', 0);
        $slideBtn.css('left', 0);
        $openPause.find('.openPauseBtn').addClass('openPauseBg');
        $timeHadShow.width(0);

    });

    /*播放、关闭按钮*/
    $openPause.on('click', $openPause, function () {
        if ($video[0].paused) {
            $video[0].play();
            $(this).find('.openPauseBtn').removeClass('openPauseBg');
        }
        else {
            $video[0].pause();
            $openBtn.css('display', 'block');
            $(this).find('.openPauseBtn').addClass('openPauseBg');
        }
        $('.popWindow').css('display', 'none');
    });

    /*播放大按钮*/
    $openBtn.on('click', function () {
        $video[0].play();
        $openBtn.css('display', 'none');
        $openPause.find('.openPauseBtn').removeClass('openPauseBg');
    });

    /*视屏全屏事件*/
    $entire.on('click', function () {
        if ($video[0].requestFullscreen) {
            $video[0].requestFullscreen();
        } else if ($video[0].mozRequestFullScreen) {
            $video[0].mozRequestFullScreen();
        } else if ($video[0].webkitRequestFullScreen) {
            $video[0].webkitRequestFullScreen();
        }
    });

    /*视屏加载之后获取总时间*/
    $video.on('loadedmetadata', function () {
        $totalTime = $video[0].duration;
    });

    /*视屏播放过程时间轴时间*/
    $video.on('timeupdate', function () {
        var $totWidth = 0, currentWidth = 0, $btnWidth = 0, $sWidth = 0, $tipWidth = 0, $sWidth1 = 0;
        $currentTime = $video[0].currentTime;
        var $minuteCurr=($currentTime/60)>1?parseInt($currentTime/60):0;
        var $secondCurr=parseInt($currentTime)%60;
        var $minuteTot=($totalTime/60)>1?parseInt($totalTime/60):0;
        var $secondTot=parseInt($totalTime)%60;
        $timeShow.html($minuteCurr+':'+$secondCurr + '/' +$minuteTot+':'+$secondTot);
        $totWidth = $timeHadShow.parent().width();
        $btnWidth = $slideBtn.width();
        $tipWidth = $cuTime.width();
        $sWidth = parseInt($totWidth) - parseInt($btnWidth);
        $sWidth1 = parseInt($totWidth) - parseInt($tipWidth);
        $timeHadShow.width(($currentTime / $totalTime) * 100 + '%');
        $cuTime.html($minuteCurr+':'+$secondCurr).css('left', (($currentTime * $sWidth1) / ($totalTime * $totWidth)) * 100 + '%');
        $slideBtn.css('left', (($currentTime * $sWidth) / ($totalTime * $totWidth)) * 100 + '%');
    });

   /*时间轴滑块事件*/
    var timeDrag = false;   /* Drag status */
    $timeHadShow.parent().mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
        $(document).on('mousemove',function(e) {
            if(timeDrag) {
                updatebar(e.pageX);
            }
        });
    });
    $(document).mouseup(function(e) {
        if(timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
        $(document).off('mousemove');
    });


//update Progress Bar control
    var updatebar = function(x) {
        var progress =$timeHadShow.parent();
        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / (progress.width()- $slideBtn.width());
        //Check within range
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }

        //Update progress bar and video currenttime
        $timeHadShow.css('width', percentage+'%');
        $slideBtn.css('left', percentage+'%');
        $video[0].currentTime = $totalTime * percentage / 100;
        $cuTime.html($video[0].currentTime).css('left',percentage+'%')
    };

    /*视频播放结束触发事件*/
    $video.on('ended', function () {
        $video[0].pause();
        $openPause.find('.openPauseBtn').addClass('openPauseBg');
        $('.popWindow').css('display', 'block');
    });

    /*设置视频音量*/
    var $volLine = $volumeBox.find('.currentVolume');
    var $volBtn = $volumeBox.find('.volumeBtn');
    var $currVolume = $video[0].volume;
    var $volumeStatic = $volumeBox.find('.volumeStatic');
    $volLine.width($currVolume * 100 + '%');
    $volBtn.css('left', $currVolume * 100 + '%');
    $('.maxVolume').on('mousedown', function (e) {
        var position = e.pageX - $(this).offset().left;
        var percentage = 100 * position / $('.maxVolume').width();
        $volLine.css('width', percentage + '%');
        $video[0].volume = percentage / 100;
        $volBtn.css('left', percentage + '%');
        $video[0].muted=false;
        $volumeStatic.text('');
    });
    $volumeStatic.click(function() {
        $video[0].muted = !$video[0].muted;
        $volLine.css('width',0);
        $volBtn.css('left',0);
        $(this).text('/');
    });
}


/*导航跳转*/
function goNav() {
    $('.comps-type-item a').on('click', function () {
        var $objId = $(this).attr('href');
        var $he = $($objId).offset().top;
        $('html,body').animate({scrollTop: $he - 100}, 800);
        return false;
    });
}

/*返回顶部*/
var $goTop = $('.goTop');
$(window).on('resize',function(){
    if($(window).width()<1400){
        $goTop.css('right', '10px');
    }

});
function goTop() {
    $goTop.on('click', function () {
        $('html,body').animate({scrollTop: 0}, 800);
    });
}


