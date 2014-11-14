/**
 * Created by yanjun on 11/1/14.
 */
function resetAddForm(){
    $("#addForm")[0].reset();
}

function editCharge(obj){
    $("#editChargeModal").modal("show");
    console.log(obj.find("#r_desc_id").text());
    $("#editId").val(obj.find("#r_id").text());
    $("#editChargeUserInForm").val(obj.find("#r_uid").text());
    $("#editChargeDescInForm").val(obj.find("#r_desc_id").text());
    $("#editAmount").val(obj.find("#r_amount").text());
    $("#editChargeType").val(obj.find("#r_typeid").text());
    $("#editDate").val(obj.find("#r_date").text());


}
function addCharge(){
    $.ajax({
        url:"/addCharge",
        type:"post",
        dataType: "json",
        async: true,
        data:{
            insertData:[
                $("#chargeUserInForm").val(),
                $("#chargeDescInForm").val(),
                $("#amount").val(),
                $("#chargeType").val(),
                $("#date").val()
            ]
        },
        success:function(data){
            //console.log("data -->" + data);
            if("1" == data){
                //console.log("add success");
                $('#addChargeModal').modal('toggle');
                window.location.reload();
            }

        }
    });
}
function deleteCharge(obj){
    obj.remove();
    $.ajax({
        url:"/deleteCharge",
        type:"post",
        dataType: "json",
        async: true,
        data:{
            conditionData:[
                obj.find("#r_id").text()
            ]
        },
        success:function(data){
            //console.log("data -->" + data);
            if("1" == data){
                //console.log("add success");

            }

        }
    });
}

function batchDelete(){
    var selectIds = new Array();
    $("#adminDataTable tr").each(function(index){
        if(index != 0 && $(this).find("#r_select").find("#selectCharge")[0].checked){
            var id = $(this).find("#r_id").text();
            selectIds.push(id);
            $(this).remove();
        }

    });
    console.log(selectIds);
    $.ajax({
        url:"/batchDeleteCharge",
        type:"post",
        dataType: "json",
        async: true,
        data:{
            conditionData:selectIds
        },
        success:function(data){
            //console.log("data -->" + data);
            if("1" == data){
                //console.log("add success");

            }

        }
    });

}
function updateCharge(){
    $.ajax({
        url:"/updateCharge",
        type:"post",
        dataType: "json",
        async: true,
        data:{
            updateData:[
                $("#editChargeUserInForm").val(),
                $("#editChargeDescInForm").val(),
                $("#editAmount").val(),
                $("#editChargeType").val(),
                $("#editDate").val()
            ],
            conditionData:[
                $("#editId").val()
            ]
        },
        success:function(data){
            //console.log("data -->" + data);
            if("1" == data){
                //console.log("add success");
                $('#editChargeModal').modal('toggle');
                window.location.reload();
            }

        }
    });

}

function doSearch() {
    $.ajax({
        url: "/searchCharge",
        type: "post",
        dataType: "json",
        async: true,
        data: {
            searchData: [],
            conditionData: []
        },
        success: function (data) {
            //console.log("data -->" + data);
            if ("1" == data) {

            }

        }
    });
}

function changeSearchCondition() {

}
