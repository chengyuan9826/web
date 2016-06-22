$(function (){	

	var t = 0;//scrollTop初始值
	
	$(window).scroll( function(){
		t = $(window).scrollTop();	
		if(t>100){
			$(".go-top").show();	
		}else{
			$(".go-top").hide();	
		}
	});
	$(".go-top").click(function(){
		var move = setInterval(function(){
			t-=100;
			$(window).scrollTop(t);		
			if(t <0){
				clearInterval(move)
			};
		},25);
		
	});
	//ck
	$(".lct-guide ul li").click(function(){
		$(this).addClass("current").siblings().removeClass("current");	
	});
	//slide nav
	$(window).click(function(){
		$(".sld-nav").hide();
	});
	$(".nav-btn").click(function(){
		$(".sld-nav").toggle();	
		return false;
	});
	//fixed
	
	if($("body").height() < $(window).height()){
		$(".foot").addClass("fed")	
	}else{
		$(".foot").removeClass("fed")	
	}
	//tab
	 $(".tab-tit li").click(function ()
    {
        $(this).addClass("current").siblings().removeClass("current");
        $(this).parent("ul").next(".tab-cont").find(".tab-mod:eq(" + $(this).index() + ")").show().siblings().hide();
    });
	
	var w=$("body").width();
	$(".slide,slide ul,.slide ul li,.slide ul li img").height(w*3/8);
	$(".slide ul li,.slide ul li img").width(w);
	$(".tab-tit li").width(w/3);
	//banner
    var sWidth = $(".slide").width();
    var len = $(".slide ul li").length;
    var index = 0;
    var picTimer;

    var btn = "<div class='btn'>";
    for (var i = 0; i < len; i++) {
        btn += "<span></span>";
    }
    $(".slide").append(btn);

    $(".slide .btn span").mouseover(function ()
    {
        index = $(".slide .btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseover");
    $(".slide ul").css("width", sWidth * (len));

    $(".slide").hover(function ()
    {
        clearInterval(picTimer);
    }, function ()
    {
        picTimer = setInterval(function ()
        {
            showPics(index);
            index++;
            if (index == len) { index = 0; }
        }, 5000);
    }).trigger("mouseleave");

    function showPics(index)
    {
        var nowLeft = -index * sWidth;
        $(".slide ul").stop(true, false).animate({ "left": nowLeft }, 200);
        $(".slide .btn span").removeClass("on").eq(index).addClass("on");
    };
	$(".close-btn").click(function(){
		$(".pop").hide();
	});
  });
  
