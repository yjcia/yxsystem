function changeValue(newValue, currentId) {

    $("#conType").text(newValue).append(" <span class='caret'></span>");
    $("#searchCondition").attr("placeholder","Please Enter "+newValue);
    if (currentId.toString() == "id") {

    } else if (currentId.toString() == "charge_cate") {
        //console.log("click id :"+currentId.toString());
        $("#queryConditionDiv").empty();
        $.ajax({
            url: "/getChargeType",
            type: "post",
            data: {},
            success: function (data) {
                var optionData = "";
                for (var i = 0; i < data.length; i++) {
                    optionData += ("<option value=" + data[i].id + "><a >" + data[i].name + "</a></option>");
                }
                //console.log(optionData);
                $("#queryConditionDiv").append(
                    $("#queryConditionDiv").append(
                        "<select class='form-control' placeholder='Enter Category' " +
                        "id='chargeDescForCondition'>" + optionData + "</select>"));
            }
        });
    } else if (currentId.toString() == "amount") {
        $("#queryConditionDiv").empty();
        var amountRangeFrom = "<input type='number' class='form-control' id='amountFrom' " +
            "placeholder='Enter Amount From'>";
        var rangeSplit = " - ";
        var amountRangeTo = "<input type='number' class='form-control' id='amountTo' " +
            "placeholder='Enter Amount To'>";
        $("#queryConditionDiv").append(amountRangeFrom + rangeSplit + amountRangeTo);
    } else if (currentId.toString() == "date") {
        $("#queryConditionDiv").empty();
        var dateRangeFrom = "<div id = 'queryDateFrom' class='input-append date form_date ' data-date=''>"
            + "<input class='form-control' size='16' type='text' value='' id='dateFrom'"
            + "placeholder='Enter Date From'><span class='add-on'><i class='icon-th'></i></span></div>";
        //var rangeSplit = " - ";
        //var dateRangeTo = "<div id = 'queryDateTo' class='input-append date form_date ' data-date=''>"
        //+"<input class='form-control' size='16' type='text' value='' id='dateTo'"
        //+"placeholder='Enter Date To'><span class='add-on'><i class='icon-th'></i></span></div>";
        $("#queryConditionDiv").append(dateRangeFrom);
    }
}
