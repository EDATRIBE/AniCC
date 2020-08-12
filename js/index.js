// 定义初值为All
var edac_nav_tab = 'Synchronized'
$(".edac_tab").click(function () {
    $.ajaxSettings.async = false;
    var _this = $(this);
    edac_nav_tab = _this.data('key')
    render_json_data()
})

function render_json_data(keyword = '') {
    $.ajaxSettings.async = false;
    $.getJSON("json/data.json", function (data) {
        var dom = ''
        $.each(data[edac_nav_tab], function (index, item) {
            if (edac_nav_tab == 'Synchronized') { var num = '1' }
            else if (edac_nav_tab == 'Completed') { var num = '2' }
            else if (edac_nav_tab == 'Incompleted') { var num = '3' }
            dom += '<tr><td><a href="https://github.com/EDATRIBE/EDAC/tree/master/' + num + '%20-%20' + edac_nav_tab + '/' + item.link + '">' + item.title_en + '</a>' +
                '</td><td><a href="https://github.com/EDATRIBE/EDAC/tree/master/' + num + '%20-%20' + edac_nav_tab + '/' + item.link + '">' + item.title_ro + '</a>' +
                '</td><td>' + item.type +
                '</td><td>' + item.episodes +
                '</td><td><a href="https://anidb.net/anime/' + item.anidb_no + '">link</a>' +
                '</td></tr>'
        })
        dom = '<tr><th>English Title</th><th>Romaji Title</th><th>Type</th><th>Ep</th><th>DB</th></tr>' + dom
        blank = ''
        $('#catalog').html(dom)
    })
}
$(function () {
    render_json_data()
})

