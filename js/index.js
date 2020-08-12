var config = {
    base_link_path: 'https://github.com/EDATRIBE/EDAC/tree/master/',
};
var title_href_config = {
    num_map: {
        Synchronized: 1,
        Completed: 2,
        Incompleted: 3,
    }
};

// 定义初值为All
$(".edac_tab").click(function () {
    $.ajaxSettings.async = false;
    forgetKeyWord();
    var _this = $(this);
    var key = _this.data('key');
    $("#nav_tab").data('key', key);
    render_json_data();
    // forgetKeyWord();
});

function render_json_data() {
    $.ajaxSettings.async = false;
    var keyword = $('#key-word').data('value');
    $.getJSON("json/data.json", function (data) {
        var items = formatData(data);
        var dom = getTableDom(items, keyword);
        $('#catalog').html(dom)
    })
}

function formatData(data) {
    var nav_tab_key = $("#nav_tab").data('key');
    var arr = [];
    if (nav_tab_key === 'All') {
        for (var key in data) {
            var items = data[key];
            arr.push.apply(arr, items);
        }
    } else {
        arr = data[nav_tab_key];
    }

    return arr;
}

function getTableDom(items = [], keyword = '') {
    var dom = '';
    $.each(items, function (index, item) {
        dom += getItemDom(item, keyword);
    });
    return dom;
}

function getItemDom(item, keyword = '') {
    var title_en = item.title_en;
    var title_ro = item.title_ro;
    if (keyword.length !== 0) {
        var pattern = new RegExp(keyword, 'gmi');
        if (!pattern.test(title_en + title_ro)) {
            return '';
        }
        //高亮处理
        title_en = title_en.replace(pattern, function (match) {
            // console.log(match,param,offset,string);
            return '<code>' + match + '</code>';
        });
        title_ro = title_ro.replace(pattern, function (match) {
            // console.log(match,param,offset,string);
            return '<code>' + match + '</code>';
        });
        // // 生成正则表达式
        // var keywordLower = keyword.toLowerCase();
        // var patternLower = new RegExp(keywordLower, 'gm');
        // //高亮处理
        // title_en = title_en.replace(patternLower, '<code style="color:#0f0;background-color:#ff0">' + keywordLower + '</code>');
        // title_ro = title_ro.replace(patternLower, '<code style="color:#0f0;background-color:#ff0">' + keywordLower + '</code>');

        // var keywordUp = keyword.toUpperCase();
        // var patternUp = new RegExp(keywordUp, 'gm');
        // //高亮处理
        // title_en = title_en.replace(patternUp, '<code style="color:#0f0;background-color:#ff0">' + keywordUp + '</code>');
        // title_ro = title_ro.replace(patternUp, '<code style="color:#0f0;background-color:#ff0">' + keywordUp + '</code>');


    }
    var title_href = config.base_link_path + title_href_config.num_map[item.category] + '%20-%20' + item.category + '/' + item.link;
    var dom = '<tr><td><a href="' + title_href + '">' + title_en + '</a>' +
        '</td><td><a href="' + title_href + '">' + title_ro + '</a>' +
        '</td><td>' + item.type +
        '</td><td>' + item.episodes +
        '</td><td><a href="https://anidb.net/anime/' + item.anidb_no + '">link</a>' +
        '</td></tr>';
    return dom;
}

$(function () {
    render_json_data()
});

