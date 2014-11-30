/**
 * Created by yanjun on 11/19/14.
 */
function indexQueryCharge(){

    $.ajax({
        url: "/searchChargeForIndex",
        type: "post",
        dataType: "json",
        async: true,
        data: {
            userId : $("#searchChargeUserInForm").val(),
            chargeCate : $("#searchChargeDescInForm").val(),
            amountFrom : $("#searchAmountFrom").val(),
            amountTo : $("#searchAmountTo").val(),
            dateFrom : $("#searchDateFromInForm").val(),
            dateTo : $("#searchDateToInForm").val()
        },
        success: function (data) {
            //console.log("data -->" + data);

            $("#dataTable").empty();
            var headerData = "<tr>" +
                "<th></th><th>Id</th>" +
                "<th>User</th>" +
                "<th>Charge Desc</th>" +
                "<th>Amount</th>" +
                "<th>Type</th>" +
                "<th>Date</th>"

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
                "</tr>");
                $("#dataTable").empty();
                $("#dataTable").append(headerData).append(detailData);
                //changeValue("ID", "id");
                $("#searchChargeIndexForm")[0].reset();
            }

        }
    });
};

function submitComment(){

    var commentValue = $("#editor").html().trim();
    var cid = $("#editorCid").val();
    var uid = $("#editorUid").val();
    $.ajax({
        url: "/submitComment",
        type: "post",
        dataType: "json",
        async: true,
        data: {
            insertData:[uid,cid,commentValue]
        },
        success: function (data) {
            //console.log("data -->" + data);

        }
    });

}
