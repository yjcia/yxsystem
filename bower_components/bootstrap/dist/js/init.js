function bindOnclickEvent(){
    var arr = $("#conditionBtn").children("li");

    arr.each(function(){
        var eachValue = $(this).text();
        var currentId = $(this).attr("id");
        $(this).find("a").attr("onclick", "changeValue('" + eachValue + "','" + currentId + "')");
        //console.log($(this).find("a"))
    });


}

function initLineData(){

    $.ajax({
        url:"/sumAmountByMonth",
        type:"post",
        data:{},
        success:function(lineData){
            var lineChartData = {
                labels : ["January","February","March","April","May","June","July",
                    "August","September","October","November","December"],
                datasets : [

                    {

                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data :lineData[0]

                    },
                    {

                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data :lineData[1]

                    }
                ]
            }

            var ctx = $("#canvas-line")[0].getContext("2d");
            new Chart(ctx).Line(lineChartData, {responsive : true});
        }
    });

}
function initDoughnutData(){
    $.ajax({
        url:"/sumAmountByTypeYear",
        type:"post",
        data:{},
        success:function(data){
            var revData = (data[0] == null ? 0 : data[0]);
            var costData = (data[1] == null ? 0 : data[1]);
            var revCostData = [
                {
                    value: revData,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Revenue"
                },
                {
                    value: costData,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Cost"
                },

            ];
            var ctx = $("#chart-area1")[0].getContext("2d");
            new Chart(ctx).Doughnut(revCostData, {responsive : true});

        }
    });

    $.ajax({
        url:"/sumAmountByUserYear",
        type:"post",
        data:{},
        success:function(data){
            var revData = (data[0].sumamount == null ? 0 : data[0].sumamount);
            var costData = (data[1].sumamount == null ? 0 : data[1].sumamount);
            var revCostData = [
                {
                    value: revData,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: data[0].username
                },
                {
                    value:costData,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: data[1].username
                },

            ];
            var ctx = $("#chart-area2")[0].getContext("2d");
            new Chart(ctx).Doughnut(revCostData, {responsive : true});

        }
    });

    $.ajax({
        url:"/sumAmountByCateYear",
        type:"post",
        data:{},
        success:function(cateBarData){
            var barChartData = {
                labels : ["Food","Clothes","Water","Gas","Telcome","Transport","Others"],
                datasets : [
                    {
                        fillColor : "rgba(151,187,205,0.5)",
                        strokeColor : "rgba(151,187,205,0.8)",
                        highlightFill : "rgba(151,187,205,0.75)",
                        highlightStroke : "rgba(151,187,205,1)",
                        data : cateBarData
                    }
                ]

            }
            var ctx = $("#bar-area")[0].getContext("2d");
            new Chart(ctx).Bar(barChartData, {responsive : true});

        }
    });


}

function initChargeTypeBar(){
    $.ajax({
        url:"/getChargeType",
        type:"post",
        data:{},
        success:function(data){

            var liData = "";

            for(var i=0;i<data.length;i++){
                // var url = "localhost:3000/show?chargeType="+data[i].id;
                liData += ("<li><a onclick='showByChargeType(" + data[i].id + ")'>" + data[i].name + "</li></a >");
            }
            //console.log(liData);
            $('#chargeTypeBar').append(liData);

        }
    })
}
function showByChargeType(chargeTypeParam) {
    $.ajax({
        url: "/getChargeInfoByChargeType",
        type: "post",
        data: {
            chargeType: chargeTypeParam
        },
        success: function (data) {
            $('#dataTable').empty();
            var headerData = "<tr>" +
                "<th></th><th>Id</th>" +
                "<th>User</th>" +
                "<th>Charge Desc</th>" +
                "<th>Amount</th>" +
                "<th>Type</th>" +
                "<th>Date</th>" +
                "</tr>"
            var detailData = "";
            for (var i = 0; i < data.length; i++) {
                var trStyle = data[i].type == 1 ? " class='danger'" : " class='success'";
                detailData += ("<tr" + trStyle + ">" +
                "<td id='r_select'><input type='checkbox' id='selectCharge'/></td>" +
                "<td id='r_id'>" + data[i].id + "</td>" +
                "<td style='display:none;' id='r_uid'>" + data[i].u_id + "</td>" +
                "<td id='r_username'>" + data[i].username + "</td>" +
                "<td id='r_desc'>" + data[i].name + "</td>" +
                "<td style='display:none;' id='r_desc_id'>" + data[i].charge_cate + "</td>" +
                "<td id='r_amount'>" + data[i].amount + "</td>" +
                "<td id='r_type'>" + (data[i].type == 0 ? 'Rev' : 'Cost') + "</td>" +
                "<td style='display:none;' id='r_typeid'>" + data[i].type + "</td>" +
                "<td id='r_date'>" + data[i].date + "</td>" + +"</tr>");
            }
            //console.log(liData);
            $('#dataTable').append(headerData).append(detailData);

        }
    })
}
function initChargeTypeInForm(){
    $.ajax({
        url:"/getChargeType",
        type:"post",
        data:{},
        success:function(data){
            var optionData = "";
            for(var i=0;i<data.length;i++){

                optionData += ("<option value="+data[i].id+"><a >"+data[i].name+"</a></option>");
            }
            //console.log(optionData);
            $('#chargeDescInForm').append(optionData);
            $('#editChargeDescInForm').append(optionData);
            $('#searchChargeDescInForm').append(optionData);
            $('#searchChargeDescInAdmin').append(optionData)
        }
    })
}
function initUserInForm(){
    $.ajax({
        url:"/getUserInForm",
        type:"post",
        data:{},
        success:function(data){
            var optionData = "";
            for(var i=0;i<data.length;i++){

                optionData += ("<option value="+data[i].id+"><a >"+data[i].username+"</a></option>");
            }
            //console.log(optionData);
            $("#chargeUserInForm").append(optionData);
            $("#editChargeUserInForm").append(optionData);
            $("#searchChargeUserInForm").append(optionData);
            $("#searchChargeUserInAdmin").append(optionData);
        }
    })
}
function initAdminData(){
    $.ajax({
        url:"/getAllChargeInfo",
        type:"post",
        data:{},
        success:function(data){
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
            }
            //console.log(liData);
            $('#adminDataTable').append(headerData).append(detailData);

        }
    })
}

function initShowData() {
    $.ajax({
        url: "/getAllChargeInfo",
        type: "post",
        data: {},
        success: function (data) {

            var headerData = "<tr>" +
                "<th></th><th>Id</th>" +
                "<th>User</th>" +
                "<th>Charge Desc</th>" +
                "<th>Amount</th>" +
                "<th>Type</th>" +
                "<th>Date</th>" +
                "<th></th>"+
                "<th></th>"+
                "</tr>";
            var detailData = "";

            for (var i = 0; i < data.length; i++) {
                var trStyle = data[i].type == 1 ? " class='danger'" : " class='success'";
                detailData += ("<tr" + trStyle + ">" +
                "<td id='r_select'><input type='checkbox' id='selectCharge'/></td>" +
                "<td id='r_id'>" + data[i].id + "</td>" +
                "<td style='display:none;' id='r_uid'>" + data[i].u_id + "</td>" +
                "<td id='r_username'>" + data[i].username + "</td>" +
                "<td id='r_desc'>" + data[i].name + "</td>" +
                "<td style='display:none;' id='r_desc_id'>" + data[i].charge_cate + "</td>" +
                "<td id='r_amount'>" + data[i].amount + "</td>" +
                "<td id='r_type'>" + (data[i].type == 0 ? 'Rev' : 'Cost') + "</td>" +
                "<td style='display:none;' id='r_typeid'>" + data[i].type + "</td>" +
                "<td id='r_date'>" + data[i].date + "</td>" +
                "<td id='lineDetail'>" +
                    "<span id= 'lineDetailSpan' onclick = 'showLineDetail(this)' style= 'cursor:pointer' " +
                    "class='glyphicon glyphicon-chevron-down'></span>" +
                "</td>"+
                "<td id='editCommont'>" +
                //"<button type='button' class='btn btn-info' data-toggle='modal' id= 'editCommontBtn' " +
                //"data-target='#editerModal' </button></td>"+
                "<span class='glyphicon glyphicon-comment' style = 'cursor: pointer' onclick='showCommentWindow(this)'></span></td>"+
                "<tr id = '" + ("extLine_"+ data[i].id) +"' style='display:none;'>" +
                "<td colspan='8' style='height: 100px'><div id="+"extDiv_" + data[i].id +">" +
                "</div></td></tr>");



            }
            //console.log(liData);
            $('#dataTable').append(headerData).append(detailData);

        }
    })
};
function showCommentWindow(obj){
    $('#editerModal').modal('show');
    var currentLine = $(obj).parent().parent();
    var currentCid = currentLine.find("#r_id").text();
    var currentUid = currentLine.find("#r_uid").text();
    $('#editorCid').val(currentCid);
    $('#editorUid').val(currentUid);

}
function showLineDetail(obj){
    controlExtLine(obj,0);
};

function editDetailCommont(obj){
    //controlExtLine(obj,1);

};

function controlExtLine(obj,isEdit){
    //alert(isEdit == 1);
    var currentLine = $(obj).parent().parent();
    var currentRid = currentLine.find("#r_id").text();
    var extLine = $(obj).parent().parent().parent().find(("#extLine_"+currentRid));
    var extDiv =  extLine.find("#extDiv_"+currentRid);
    var upOrDown = currentLine.find("#lineDetail").find("#lineDetailSpan").attr("class");
    var lineDetailSpan = currentLine.find("#lineDetail").find("#lineDetailSpan");
    if(upOrDown == "glyphicon glyphicon-chevron-down"){
        lineDetailSpan.attr("class","glyphicon glyphicon-chevron-up");
        extLine.attr("style","display:true;");
        extDiv.attr("style","height:100px;overflow:auto");
        //style = 'position:relative ; float:left ; overflow:auto'
        //extDiv.append("<span class='glyphicon glyphicon-user'></span> : ");

        $.ajax({
            url:"/getCommentById",
            type:"post",
            data:{
                cid:currentRid
            },
            success:function(data){
                var optionData = "";
                for(var i=0;i<data.length;i++){
                    extDiv.append("<span class='glyphicon glyphicon-user'></span> ")
                        .append(data[i].username)
                        .append(" : ")
                        .append(data[i].text)
                        .append("<br/>")

                }

            }
        })

    }
    else{
        lineDetailSpan.attr("class","glyphicon glyphicon-chevron-down");
        extLine.attr("style","display:none;");
        extLine.empty();
        extLine.append("<td colspan='8' style='height: 100px'><div id="+"extDiv_" + currentRid +">" +
        "</div></td>");
    }
};

function initToolbarBootstrapBindings() {
        var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
        $.each(fonts, function (idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+
            fontName + '</a></li>'));
        });
        $('a[title]').tooltip({container:'body'});
        $('.dropdown-menu input').click(function() {return false;})
            .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
            .keydown('esc', function () {this.value='';$(this).change();});

        $('[data-role=magic-overlay]').each(function () {
            var overlay = $(this), target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).
                width(target.outerWidth()).height(target.outerHeight());
        });



    $('#editor').wysiwyg();
    //window.prettyPrint && prettyPrint();
};


$(document).ready(function(){

    bindOnclickEvent();
    initAdminData();
    initShowData();
    initChargeTypeBar();
    initUserInForm();
    initChargeTypeInForm();
    initDoughnutData();
    initLineData();
    initToolbarBootstrapBindings();
});