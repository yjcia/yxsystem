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
                $("#amountForAdd").val(),
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

function batchTransfer() {
    var selectIds = new Array();
    $("#adminDataTable tr").each(function (index) {
        if (index != 0 && $(this).find("#r_select").find("#selectCharge")[0].checked) {
            var id = $(this).find("#r_id").text();
            selectIds.push(id);
            $(this).remove();
        }

    });


}

function batchExport() {
    var selectIds = "";
    $("#adminDataTable tr").each(function (index) {
        if (index != 0 && $(this).find("#r_select").find("#selectCharge")[0].checked) {
            var id = $(this).find("#r_id").text();
            selectIds += (id + ",");
            //$(this).remove();
        }

    });
    if (selectIds != "") {
        $.ajax({
            url: "/batchExportCharge",
            type: "post",
            dataType: "json",

            data: {
                conditionData: selectIds
            },
            success: function (data) {
                window.location.href = "/download?file=" + data;

            }
        });
    }
}

function importCharge() {

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

function adminQueryCharge() {


    $.ajax({
        url: "/searchChargeForIndex",
        type: "post",
        dataType: "json",
        async: true,
        data: {
            userId : $("#searchChargeUserInAdmin").val(),
            chargeCate : $("#searchChargeDescInAdmin").val(),
            amountFrom : $("#searchAmountFromInAdmin").val(),
            amountTo : $("#searchAmountToInAdmin").val(),
            dateFrom : $("#searchDateFromInAdmin").val(),
            dateTo : $("#searchDateToInAdmin").val()
        },
        success: function (data) {
            //console.log("data -->" + data);

            $("#adminDataTable").empty();
                var headerData = "<tr>" +
                    "<th></th><th>Id</th>" +
                    "<th>User</th>" +
                    "<th>Charge Desc</th>" +
                    "<th>Amount</th>" +
                    "<th>Type</th>" +
                    "<th>Date</th>" +
                    "<th colspan='2'>Operation</th>" +
                    "</tr>"
                var detailData = "";
                for(var i=0;i<data.length;i++){
                    var trStyle = data[i].type == 1 ? " class='danger'" :" class='success'";
                    detailData += ("<tr" + trStyle + ">" +
                    "<td id='r_select'><input type='checkbox' id='selectCharge'/></td>" +
                    "<td id='r_id'>"+data[i].id+"</td>" +
                    "<td style='display:none;' id='r_uid'>"+data[i].u_id+"</td>" +
                    "<td id='r_username'>"+data[i].username+"</td>" +
                    "<td id='r_desc'>" + data[i].name + "</td>" +
                    "<td style='display:none;' id='r_desc_id'>"+data[i].charge_cate+"</td>"+
                    "<td id='r_amount'>"+data[i].amount+"</td>" +
                    "<td id='r_type'>"+(data[i].type == 0 ? 'Rev':'Cost')+"</td>" +
                    "<td style='display:none;' id='r_typeid'>"+data[i].type +"</td>" +
                    "<td id='r_date'>"+data[i].date+"</td>" +
                    "<td><button type='button' class='btn btn-info' id='etdButton' onclick='editCharge($(this).parent().parent())'>" +
                    "Edit</button></td>"+
                    "<td><button type='button' class='btn btn-danger' onclick='deleteCharge($(this).parent().parent())'>" +
                    "Remove</button></td>"
                    +"</tr>");
                $("#adminDataTable").empty();
                $("#adminDataTable").append(headerData).append(detailData);
                //changeValue("ID", "id");
                $("#searchChargeAdminForm")[0].reset();
            }

        }
    });
}

