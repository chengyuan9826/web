
$(function(){

    /*关闭弹出框*/
    $('.cancel').on('click',function(){
        $('.select-contact').hide();
        $(window).off('scroll');
    });

    /*显示弹出框*/
    $('.share').on('click',function(){
        $('.select-contact').show();
        var list=$('input');
        setHe();
        setRadioId(list);
        setClickStyle();
        showSelect();
        var sTop = $('body').scrollTop();
        $(window).on('scroll', function () {
            $(this).scrollTop(sTop);
        });
    });

});
/*显示弹出框*/

function setHe(){
    var hd=$('#contact-static');
    var con=$('#contact-list');
    var tHeight=$(window).height();
    $('.contact-wrap').height(tHeight);
    var hdHeight=hd.height();
    con.css('margin-top',hdHeight+'px');
}
/*显示已选中的联系人头像*/
function showSelect(){
    var content= $('.select-con');
    var selectList=$('input[type=checkbox]:checked');
    var txt='';
    content.html('');
    $.each(selectList,function(id,val){
        txt=$(val).parents('li').find('.contact-hd').html();
        content.append('<li>'+txt+'</li>');
    });
    setHe();
}

/*设置选中的checkedBox样式*/
function setClickStyle() {
    $('input[type=checkbox]').on('click', function () {
        if ($(this).is(':checked')) {
            $(this).siblings('label').addClass('active');
        }
        else{
            $(this).siblings('label').removeClass('active');
        }
        showSelect();
    });
}
/*给页面中的checkedBox添加id属性，以及给label添加for属性*/
function setRadioId(obj) {
    var arr = randomNum(obj.length);
    $.each(obj, function (index, val) {
        $(val).attr('id', 'checkBox' + arr[index]);
        $(val).siblings('label').attr('for', 'checkBox' + arr[index]);
    });
}

/*生成不重复随机数*/
function randomNum(len) {
    var idList = [];
    for (var i = 0; i < len; i++) {
        idList[i] = parseInt(Math.random() * len);
        for (var j = 0; j < i; j++) {
            if (idList[i] == idList[j]) {
                i--;
                break;
            }
        }
    }
    return idList;
}
