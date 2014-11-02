function bindOnclickEvent(){
    var arr = $("#conditionBtn").children("li");

    arr.each(function(){
        var eachValue = $(this).text();
        $(this).find("a").attr("onclick","changeValue('"+eachValue+"')");
        //console.log($(this).find("a"))
    });


}

function initLineData(){
    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var lineChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                label: "My First dataset",
                fillColor : "rgba(220,220,220,0.2)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : [randomScalingFactor(),randomScalingFactor(),
                    randomScalingFactor(),randomScalingFactor(),
                    randomScalingFactor(),randomScalingFactor(),
                    randomScalingFactor()]
            },
            {
                label: "My Second dataset",
                fillColor : "rgba(151,187,205,0.2)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(151,187,205,1)",
                data : [randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()]
            }
        ]
    }

    var ctx = $("#canvas-line")[0].getContext("2d");
    new Chart(ctx).Line(lineChartData, {responsive : true});
}
function initDoughnutData(){
    var doughnutData = [
        {
            value: 300,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        },
        {
            value: 40,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "Grey"
        },
        {
            value: 120,
            color: "#4D5360",
            highlight: "#616774",
            label: "Dark Grey"
        }
    ];
    //var ctx = document.getElementById("chart-area").getContext("2d");
    var ctx = $("#chart-area1")[0].getContext("2d");
    new Chart(ctx).Doughnut(doughnutData, {responsive : true});

    var ctx = $("#chart-area2")[0].getContext("2d");
    new Chart(ctx).Doughnut(doughnutData, {responsive : true});

    var ctx = $("#chart-area3")[0].getContext("2d");
    new Chart(ctx).Doughnut(doughnutData, {responsive : true});
}

function initChargeTypeBar(){
    $.ajax({
        url:"/getChargeType",
        type:"post",
        data:{},
        success:function(data){

            var liData = "";
            for(var i=0;i<data.length;i++){
                liData += ("<li><a >"+data[i].name+"</li></a >");
            }
            //console.log(liData);
            $('#chargeTypeBar').append(liData);

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
            $('#chargeTypeInForm').append(optionData);

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
            $('#chargeUserInForm').append(optionData);

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

                detailData += ("<tr>" +
                "<td><input type='checkbox'/></td>" +
                "<td>"+data[i].id+"</td>" +
                "<td>"+data[i].username+"</td>" +
                "<td>"+data[i].chargedesc+"</td>"+
                "<td>"+data[i].amount+"</td>" +
                "<td>"+(data[i].type == 0 ? 'Rev':'Cost')+"</td>" +
                "<td>"+data[i].date+"</td>" +
                "<td><button type='button' class='btn btn-info'>Edit</button></td>"+
                "<td><button type='button' class='btn btn-danger'>Remove</button></td>"
                +"</tr>");
            }
            //console.log(liData);
            $('#adminDataTable').append(headerData).append(detailData);

        }
    })
}

$(document).ready(function(){
    bindOnclickEvent();
    initAdminData();
    initChargeTypeBar();
    initUserInForm();
    initChargeTypeInForm();
    initDoughnutData();
    initLineData();

});