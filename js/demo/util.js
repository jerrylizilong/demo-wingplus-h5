/*****************************************common begin*****************************************/
function colseModel(id) {
    $("#"+id).hide(500);
    $('#info_table2').show(100);
}

function isCG(){
    return getUrlParams('sdkToken')==null?false:true;
}

//获取当前参数
function getUrlParams(paramName){
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//窗口随着屏幕的大小自适应
function window_size(){
    // var b=$(window).height();
    var h = window.document.documentElement.clientHeight;
    $('#goodsModel').css({overflow:'scroll',height:h});
    $('#them_hidden').css({overflow:'hidden',height:h})
}
//关闭弹出框背景取消固定化
function bg_auto(){
    $('body,html').unbind('touchmove')
}
window_size();
$(window).resize(function(){
    window_size();
});

function hideModal(modalId){
    $('#'+modalId).modal('hide');
}

function showModal(modalId){
    $('#'+modalId).modal('show');
}

function showResult(subject, msg){
    bootbox.alert({
        buttons: {  
           ok: {  
                label: '关闭',  
                className: 'btn-info'  
            }  
        },  
        message: "<p>"+subject+":"+msg+"</p>",
        callback: function() {
            //下面代码需要加，否则关闭弹出框之后无法滚动上一个窗口
            //参考：https://stackoverflow.com/questions/41891012/bootbox-modal-is-not-scrollable-after-a-second-modal-is-opened
            $('.bootbox.modal').on('hidden.bs.modal', function () {
              if($(".modal").hasClass('in')){
                     $('body').addClass('modal-open');
                 }
            })  
        }, 
        title: "测试结果"
    });
    //bootbox.alert("result:"+msg);
}
/*****************************************common end*****************************************/



