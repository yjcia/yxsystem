function changeValue(newValue){
    //console.log("new :"+newValue);
    $("#conType").text(newValue).append(" <span class='caret'></span>");
    $("#searchCondition").attr("placeholder","Please Enter "+newValue);

}