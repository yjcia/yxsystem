/**
 * Created by yanjun on 11/1/14.
 */
function addCharge(){

    $.ajax({
        url:"/addCharge",
        type:"post",
        dataType: "json",
        async: true,
        data:{
            insertData:[
                $("#chargeUserInForm").val(),
                $("#chargeTypeInForm").val(),
                $("#amount").val(),
                $("#chargeType").val(),
                $("#date").val()
            ]
        },
        success:function(data){


        }
    })
}
