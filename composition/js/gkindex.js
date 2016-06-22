$(document).ready(function () {
	$(".org-tit:gt(0)").hide();
	$(".aresint:gt(0)").hide();
	$("#AreaList .pd15:gt(0)").hide();
	var ht=$(".viewport").width()*10/36;
	$(".banner,.banner-img li,.banner-img li img").height(ht);
	$(".banner").hover(function(){
		$(".banner-btn").show()
		},function(){
		$(".banner-btn").hide()
		})
	$dragBln = false;
	$(".bnn-main").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $(".prevBtn"),
		btn_next : $(".nextBtn"),
		paging : $(".banner-circle li"),
		counter : function (e) {
			$(".banner-circle li").removeClass("selected").eq(e.current-1).addClass("selected");
		}
	});
	$(".bnn-main").bind("mousedown", function() {
		$dragBln = false;
	})
	$(".bnn-main").bind("dragstart", function() {
		$dragBln = true;
	})
	$(".bnn-main a").click(function() {
		if($dragBln) {
			return false;
		}
	})
	timer = setInterval(function() { $(".nextBtn").click();}, 10000);
	$(".banner").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(function() { $(".nextBtn").click();}, 10000);
	})
	$(".bnn-main").bind("touchstart", function() {
		clearInterval(timer);
	}).bind("touchend", function() {
		timer = setInterval(function() { $(".nextBtn").click();}, 10000);
	})
});