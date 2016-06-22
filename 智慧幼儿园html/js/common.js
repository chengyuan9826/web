$(function(){
	 $(".hv-area").hover(function ()
    {
		$(".hv-area").removeClass("cover").end();
		$(this).addClass("cover")
        $(this).find(".sld-area").stop().slideDown("fast");
    },function(){
		$(this).find(".sld-area").stop().hide();	
		$(this).removeClass("cover")
	});	
	$(".ck-sld ul li").click(function(){
		var txt=$(this).text();
		$(this).parent("ul").prev("span").text(txt).end().hide();;	
	});
	//step
	$(".next-step").click(function(){
		$(this).parents(".step-det").hide().next(".step-det").show();	
		$(".step li.gn").next().addClass("gn");
	});
	//tab
	
	$(".yzhv").hover(function(){
		$(this).parent("ul").addClass("gn").removeClass("pk");
		$(".yzd-main").fadeIn();	
		$(".jsd-main").hide();
		$(".subbanner.pink").hide();
		$(".subbanner.green").show();
	});
	$(".jshv").hover(function(){
		$(this).parent("ul").removeClass("gn").addClass("pk");
		$(".yzd-main").hide();	
		$(".jsd-main").show();
		$(".subbanner.pink").fadeIn();
		$(".subbanner.green").hide();
	});
});

/*update by chengyuan 2016-5-24*/
$(function(){
  /*幼儿园规模选择*/
  $('.ent-number').find('label').on('click',function(){
    var radio=$(this).next('input[type=radio]');
    if(!radio.is(':checked')){
        radio.attr('checked',true).siblings('input[type=radio]').attr('checked',false);
        $(this).addClass('active').siblings('label').removeClass('active');
    }
});
});

