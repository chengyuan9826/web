/**
 * Created by Administrator on 2016/6/8.
 */
$(function(){
    var car= $('.energy-carousel');
    new Carousel({ carouse:car[0],
          nextBtn:$('.energy-next'),
          prevBtn:$('.energy-prev'),
          iconBox:$('.energy-icon'),
          autoPlay:false
        });
    new Carousel({
        carouse:$('.practise-carouse')[0],
        nextBtn:$('.next-btn'),
        autoPlay:false
    });
    goToLink();
    sideShow();
    goLink();
    closeBox();
    /*头部下拉*/
    var nav=$('.pro_dh');
    nav.on('mouseenter',function(){
        $(this).find('.ss').stop().slideDown(100);
    });
    nav.on('mouseleave',function(){
        $(this).find('.ss').stop().slideUp(100);
    });
    video();
    showVideo();
    closeVideo();
});

var videoPop=$('.popup');
function showVideo(){
    var videoWrap=$('.classroom-con');
    var $video=videoPop.find('#popup-video');
    videoWrap.on('click',function(){
        var $href=$(this).attr('href');
        $video.attr('src',$href);
        var scrollTop=$(window).scrollTop();
       /* $('#popup-object').find('param[name=FileName]').attr('value',$href);*/
        var $objSrc=$href?$href.split('.')[0]:$href;
        $('#objectSrc').attr('value',$objSrc+'1.mov');
        $(window).on('scroll', function () {
            $(this).scrollTop(scrollTop);
        });
        videoPop.show();
        return false;
    });
}
function closeVideo(){
    var closeBtn=$('.close-btn');
    closeBtn.on('click',function(){
        videoPop.find('#popup-video').attr('src','');
        $('#objectSrc').attr('value','');
        videoPop.hide();
        $(window).off('scroll');
    });
}
function sideShow(){
    $(window).scroll(function(){
      if($(window).scrollTop()>=600){
          $('.global-contact').css('display','block');
          $('.global-side').css({top:'30%'},1000);
        }
       else if($(window).scrollTop()<600){
           $('.global-side').css({top:'60%'},1000);
          $('.global-contact').css('display','none');
      }
    });
}
function closeBox(){
    $('.g-icon').on('click',function(){
        $('.global-contact').animate({'left':'50px'}).find('.g-show').show();
    });
    $('.g-close').on('click',function(){
        $('.g-show').hide();
        $('.global-contact').animate({'left':'-70px'});
    });
}
function goLink(){
   $('.g-nav a').on('click',function(){
       var id=$(this).attr('href');
       var top=$(id).offset().top;
       $('body,html'). animate({'scrollTop' :top}, 500);
       return false;
   });
}
function goToLink(){
    $('.js-line').find('a').on('click',function(){
        var objId=$(this).attr('href');
        var id=$(objId).index();
        $(objId).show().siblings().hide();
        $(this).parent('li').siblings('li').find('a').removeClass('active');
        $(this).addClass('active').parent('li').siblings('li').find('a').removeClass('active');
        iconMove(id);
        return false;
    });
}
function iconMove(id){
    $('.line-icon').animate({top:(id*107+51)+'px'});
}
function video(){
    var $video1=$('#video1');
    var $video2=$('#video2');
    $video1.on('play',function(){
        if(!$video2[0].paused){
            $video2[0].pause();
        }
    });
    $video2.on('play',function(){
        if(!$video1[0].paused){
            $video1[0].pause();
        }
    });
}

/*页面轮播*/
function Carousel(objPri){
    this.obj=objPri.carouse;
    this.nextBtn=objPri.nextBtn;
    this.prevBtn=objPri.prevBtn;
    this.iconBox=objPri.iconBox;
    this.autoPlay=objPri.autoPlay;
    this.carIndex=0;
    this.items=this.obj.children;
    this.len=this.items.length;
    this.itemsWidth=this.items[0].offsetWidth;
    this.width=this.itemsWidth*this.len;
    this.timer=null;
    $(this.obj).width(this.width+'px');
    this.nextBtn && this.next();
    this.prevBtn && this.prev();
    this.autoPlay && this.slideTimer();
    this.stop();
    this.start();
    this.iconBox && this.iconChange();
    this.iconBox && this.iconClick();
}
Carousel.prototype.slideTimer=function(){
    var _this=this;
    clearInterval(_this.timer);
    this.timer=setInterval(function(){
        _this.slide();
        _this.iconBox && _this.iconChange();
    },3000);
};
Carousel.prototype.next=function(){
    var _this=this;
    _this.nextBtn.on('click',function(){
        clearInterval(_this.timer);
        if(_this.carIndex==_this.len-1){
            _this.carIndex=0;
        }
        else{
            _this.carIndex+=1;
        }
        $(_this.obj).stop().animate({left:-_this.carIndex*_this.itemsWidth+'px'},1000);
        _this.autoPlay && _this.slideTimer();
        _this.iconBox && _this.iconChange();
    });
};
Carousel.prototype.prev=function(){
    var _this=this;
    _this.prevBtn.on('click',function(){
        clearInterval(_this.timer);
        if(_this.carIndex==0){
            _this.carIndex=_this.len-1;
        }
        else{
            _this.carIndex--;
        }
        $(_this.obj).stop().animate({left:-_this.carIndex*_this.itemsWidth+'px'},1000);
        _this.autoPlay &&  _this.slideTimer();
        _this.iconBox && _this.iconChange();
    });
};
Carousel.prototype.slide=function(){
     if(this.carIndex<0){
         this.carIndex=0;
     }
     else if(this.carIndex>=this.len-1){
         this.carIndex=0;
     }
     else{
         this.carIndex++;
     }
    $(this.obj).stop().animate({left:-this.carIndex*this.itemsWidth+'px'},1000);
 };
Carousel.prototype.stop=function(){
    var _this=this;
    this.obj.onmouseover=function(){
        clearInterval(_this.timer);
    }
};
Carousel.prototype.start=function(){
    var _this=this;
    this.obj.onmouseout=function(){
        _this.autoPlay && _this.slideTimer();
    }
};
Carousel.prototype.iconChange=function(){
   this.iconBox.children('li').eq(this.carIndex).addClass('active').siblings('li').removeClass('active');
};
Carousel.prototype.iconClick=function(){
    var _this=this;
    this.iconBox.children('li').on('click',function(){
        clearInterval(_this.timer);
        var index=$(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        _this.carIndex=index-1;
        _this.slide();
        _this.autoPlay && _this.slideTimer();
    });
    return false;
};