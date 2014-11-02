function test(){
    $.ajax({
        url:"/test",
        type:"post",
        data:{},
        success:function(data){
            console.log(data.data1);
            var tableHeader = "<tr><td>Id</td>" +
                "<td>Name</td>" +
                "<td>Amount</td>" +
                "</tr>"
            var tableData = "";
            for(var i=0;i<data.data1.length;i++){
                tableData += ("<tr>" +
                "<td>"+data.data1[i].id+"</td>" +
                "<td>"+data.data1[i].name+"</td>" +
                "<td>"+data.data1[i].amount+"</td>" +
                "</tr>");
            }

            $('#dataTable').empty();
            $('#dataTable').append(tableHeader).append(tableData);

        }
    })
}