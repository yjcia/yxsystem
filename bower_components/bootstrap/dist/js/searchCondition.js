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
        })


    }
}