var pay = {

    //获取商品成功回调
    prodListSuccessCB: function(productsResult){
        console.log("获取商品成功");
        showResult('获取商品', '获取商品成功');
        if(productsResult && productsResult.code == 200 && productsResult.productList.length > 0){

            var productList = productsResult.productList;
            var  html2="";
            for (var i = 0; i<productsResult.productList.length;i++) {
                var  template=document.getElementById("productsTemplate").innerHTML;
                for(x in productList[i]){
                    template=template.replace(eval("/("+x+")/gi"), productList[i][x]);
                }
                html2+=template;
            }
            document.getElementById("productsHtml").innerHTML=html2;

        }
    },

    //获取商品
    getProducts: function() {
        $("#goodsModel").removeClass("hide");
        $("#goodsModel").show(500);

        // if(wingplus.pay.isPayServiceAvailable()){
            wingplus.pay.getProducts({
                success: this.prodListSuccessCB,
                fail: function(result){
                    console.warn("获取商品失败");
                    if(result){
                        console.warn("Result code", result.code);
                        console.warn("Result msg", result.msg);

                        if(result.code == 4026){
                            showResult('获取商品', '获取商品失败，支付不可用，请检查支付是否已关闭');
                        }else{
                            showResult('获取商品', '获取商品失败');
                        }
                    }else{
                        showResult('获取商品', '获取商品失败');
                    }
                    
                },
                cancel: function(result){
                    console.warn("获取商品取消");
                    if(result){
                        console.warn("Result code:", result.code);
                        console.warn("Result msg:", result.msg);
                    }
                    
                    showResult('获取商品', '获取商品取消');
                }
            });
    },

    //支付
    doPay: function(productId, productName, channel) {
            wingplus.pay.pay({
                channel: channel,
                productId: productId,
                serverId: '3231',
                gameUserId: '32',
                productName: productName,
                success: function (result) {
                    $("#payModel").hide(500);
                    var s = JSON.stringify(result) ? JSON.stringify(result) : "web支付请以发货为准";
                    showResult('商品支付', '支付完成,支付结果:'+s);
                },
                fail: function(result){
                    console.warn("支付失败,结果："+JSON.stringify(result));
                    if(result){
                        console.warn("Result code", result.code);
                        console.warn("Result msg", result.msg);

                        if(result.code == 4026){
                            showResult('商品支付', '支付失败，支付不可用，请检查支付是否已关闭');
                        }else{
                            showResult('商品支付', '支付失败');
                        }
                    }else{
                        showResult('商品支付', '支付失败');
                    }
                    
                },
                cancel: function(result){
                    console.warn("支付取消,结果："+JSON.stringify(result));
                    if(result){
                        console.warn("Result code:", result.code);
                        console.warn("Result msg:", result.msg);
                    }
                    
                    showResult('支付取消', '支付取消');
                }
            });
    },

    showPageAndGetProducts: function(){
        //显示对话框
        $('#wingplus_pay').modal('show');
        this.getProducts();
    },

}