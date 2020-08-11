function render_json_data(keyword = ''){
    $.ajaxSettings.async = false;
    $.getJSON("json/data.json", function(data){
        var dom = '';
        $.each(data, function(index, item){
            // dom += '<li><font face="Microsoft Yahei">['+item.number+'] '+item.title+'</font></li>'
            dom += getItem(item, keyword)
        });
        $('.mulu_list').html(dom);
    });
}

function getItem(item, keyword = '') {
    var number = item.number;
    var title = item.title;
    if (keyword.length !== 0) {
        var pattern = new RegExp(keyword, 'gmi');
        if(!pattern.test(number+title)){
            return '';
        }
        // 生成正则表达式
        var keywordLower = keyword.toLowerCase();
        var patternLower = new RegExp(keywordLower, 'gm');
        //高亮处理
        number = number.replace(patternLower, '<label style="color:#0f0;background-color:#ff0">' + keywordLower + '</label>');
        title = title.replace(patternLower, '<label style="color:#0f0;background-color:#ff0">' + keywordLower + '</label>');

        var keywordUp = keyword.toUpperCase();
        var patternUp = new RegExp(keywordUp, 'gm');
        //高亮处理
        number = number.replace(patternUp, '<label style="color:#0f0;background-color:#ff0">' + keywordUp + '</label>');
        title = title.replace(patternUp, '<label style="color:#0f0;background-color:#ff0">' + keywordUp + '</label>');


    }
    return '<li><font face="Microsoft Yahei">[' + number + '] ' + title + '</font></li>';
}

function init()
{
    render_json_data();
}

$(function () {
    init();
});
