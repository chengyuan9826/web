/**
 * Created by Administrator on 2016/8/2.
 */
$(function(){
    downList($('.hd-button .name'));
});
function  downList(btn){
    btn.on('click',function(){
        var shadow=$('.shadow');
        var _this=$(this);
        if($(this).hasClass('active')){
            $(this).removeClass('active').next().hide();
            shadow.hide();
        }
        else{
            $(this).addClass('active').next().show();
            shadow.show();
            shadow.on('click',function(){
                _this.removeClass('active').next().hide();
                $(this).hide();
            });
           new SelectItem($('.down-list').eq(0));
           new SelectItem($('.down-list').eq(1));
        }
    });

}
/*高亮显示下拉菜单中选中的值*/
function SelectItem(list){
    this.name='';
    this.list=$(list);
    this.showLight();
    this.cancel($('.down-btn .cancel'));
    this.sure($('.down-btn .sure'));
}
SelectItem.prototype.showLight=function(){
    this.list.find('li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
};
SelectItem.prototype.cancel=function(btn){
    btn.on('click',function(){
        $('.shadow').hide();
        $('.down-box').hide().prev('.name').removeClass('active');
    })
};
SelectItem.prototype.sure=function(btn){
    var _this=this;
    btn.on('click',function(){
        _this.name=_this.list.find('.active').text();
        if( _this.name!=''&& _this.name!=null){
            $('.shadow').hide();
            $('.down-box').hide().prev('.name').removeClass('active');
        }
    });

};