$.getJSON("json/download.json", function(data){
    var dom = '';
    $.each(data, function(index, item){
        dom += '<a href="'+item.link+'" target="view_frame"><li><font face="Microsoft Yahei">'+item.number+' 提取码：'+item.key+'</font></li></a>'
    });
    $('.mulu_list').html(dom);
})